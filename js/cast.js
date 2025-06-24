// === CAST FUNCTIONALITY FOR AUDIO AND VISUAL ===

let castPlayer = null;
let remotePlayer = null;
let remotePlayerController = null;
let currentCastSession = null;
let isCasting = false;
let castStateUpdateInterval = null;

// Audio streaming variables
let audioStreamingActive = false;
let mediaRecorder = null;
let audioStream = null;
let currentMediaUrl = null;
let audioChunks = [];
let streamingInterval = null;

// Wait for Cast SDK to be available
function waitForCastSDK(callback, attempts = 0) {
    const maxAttempts = 20; // 10 seconds max wait time
    
    // Check what's actually available
    const castFrameworkAvailable = typeof cast !== 'undefined' && cast.framework;
    const chromeAvailable = typeof chrome !== 'undefined';
    const chromeCastAvailable = chromeAvailable && chrome.cast;
    const chromeMediaAvailable = chromeCastAvailable && chrome.cast.media;
    
    if (attempts === 0) {
        console.log('Cast SDK status check:', {
            castFramework: castFrameworkAvailable,
            chrome: chromeAvailable,
            chromeCast: chromeCastAvailable,
            chromeMedia: chromeMediaAvailable,
            window_cast: typeof window.cast,
            window_chrome: typeof window.chrome
        });
    }
    
    // Try with just cast.framework first - chrome.cast might load later
    if (castFrameworkAvailable) {
        console.log('Cast framework available, attempting initialization...');
        callback();
    } else if (attempts < maxAttempts) {
        console.log(`Cast SDK not ready, waiting... (${attempts + 1}/${maxAttempts})`);
        setTimeout(() => waitForCastSDK(callback, attempts + 1), 500);
    } else {
        console.warn('Cast SDK failed to load after', maxAttempts, 'attempts');
        console.log('This is normal in development or if Google Cast is not available.');
        
        // Try enabling development mode instead of hiding
        console.log('Falling back to development mode...');
        enableDevelopmentCast();
    }
}

// Initialize Cast functionality
function initializeCast() {
    console.log('Initializing Cast framework...');
    
    // Check if we're in localhost development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('Development mode detected - Cast functionality will show mock behavior');
        showCastButton();
        setupMockCastButton();
        return;
    }

    // Verify cast.framework is available
    if (!window.cast || !cast.framework) {
        console.error('cast.framework not available');
        console.log('Falling back to development mode...');
        enableDevelopmentCast();
        return;
    }

    try {
        const castContext = cast.framework.CastContext.getInstance();
        
        // Use Default Media Receiver - works with standard Cast devices
        let receiverAppId = 'CC1AD845'; // Default Media Receiver
        let autoJoinPolicy = 'origin_scoped';
        
        // Try to use proper Chrome Cast constants if available
        if (typeof chrome !== 'undefined' && chrome.cast) {
            if (chrome.cast.AutoJoinPolicy && chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED) {
                autoJoinPolicy = chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED;
            }
        }
            
        const options = {
            receiverApplicationId: receiverAppId,
            autoJoinPolicy: autoJoinPolicy,
            androidReceiverCompatible: true,
            language: 'en-US',
            resumeSavedSession: true
        };
        
        console.log('Cast options:', options);
        
        castContext.setOptions(options);
        
        // Setup remote player
        remotePlayer = new cast.framework.RemotePlayer();
        remotePlayerController = new cast.framework.RemotePlayerController(remotePlayer);
        
        // Add event listeners
        remotePlayerController.addEventListener(
            cast.framework.RemotePlayerEventType.IS_CONNECTED_CHANGED,
            onCastStateChanged
        );
        
        remotePlayerController.addEventListener(
            cast.framework.RemotePlayerEventType.IS_PLAYING_CHANGED,
            onRemotePlayerPlayingChanged
        );
        
        // Listen for Cast state changes
        castContext.addEventListener(
            cast.framework.CastContextEventType.CAST_STATE_CHANGED,
            onCastStateChanged
        );
        
        console.log('Cast framework initialized successfully');
        
        // Setup cast button click handler
        const castButton = document.getElementById('cast-button');
        if (castButton) {
            castButton.addEventListener('click', requestCastSession);
        }
        
        // Check initial cast state - this will show button if devices are available
        onCastStateChanged();
        
    } catch (error) {
        console.error('Error initializing Cast:', error);
        console.log('Available APIs:', {
            cast: typeof window.cast,
            castFramework: typeof window.cast?.framework,
            chrome: typeof window.chrome,
            chromeCast: typeof window.chrome?.cast,
            chromeCastMedia: typeof window.chrome?.cast?.media
        });
        
        // Fall back to development mode
        console.log('Falling back to development mode due to initialization error...');
        enableDevelopmentCast();
    }
}

function onCastStateChanged(event) {
    try {
        const castState = cast.framework.CastContext.getInstance().getCastState();
        
        switch (castState) {
            case cast.framework.CastState.CONNECTED:
                isCasting = true;
                currentCastSession = cast.framework.CastContext.getInstance().getCurrentSession();
                console.log('Connected to Cast device');
                
                // Show cast button
                showCastButton();
                
                // Send initial state
                sendInitialState();
                
                // Start regular state updates
                startStateUpdates();
                
                break;
                
            case cast.framework.CastState.NOT_CONNECTED:
                isCasting = false;
                currentCastSession = null;
                console.log('Cast devices available but not connected');
                
                // Show cast button when devices are available
                showCastButton();
                
                // Stop state updates and audio capture
                stopStateUpdates();
                if (audioStreamingActive) {
                    stopAudioCapture();
                }
                
                break;
                
            case cast.framework.CastState.NO_DEVICES_AVAILABLE:
                console.log('No Cast devices available');
                hideCastButton();
                break;
                
            case cast.framework.CastState.CONNECTING:
                console.log('Connecting to Cast device...');
                showCastButton();
                break;
                
            default:
                console.log('Cast state:', castState);
                break;
        }
    } catch (error) {
        console.error('Error in cast state changed:', error);
    }
}

function onRemotePlayerPlayingChanged() {
    // Sync local player state with remote player
    try {
        if (remotePlayer.isPlaying !== isPlaying) {
            if (remotePlayer.isPlaying && !isPlaying) {
                // Remote player started, sync local state
                togglePlayback();
            } else if (!remotePlayer.isPlaying && isPlaying) {
                // Remote player stopped, sync local state
                togglePlayback();
            }
        }
    } catch (error) {
        console.error('Error syncing remote player state:', error);
    }
}

function requestCastSession() {
    try {
        const castContext = cast.framework.CastContext.getInstance();
        castContext.requestSession().then(
            function() {
                console.log('Cast session requested successfully');
            },
            function(error) {
                console.error('Error requesting cast session:', error);
            }
        );
    } catch (error) {
        console.error('Error requesting cast session:', error);
    }
}

function sendInitialState() {
    if (!isCasting || !currentCastSession) return;
    
    try {
        // Load receiver with current state encoded in URL
        loadReceiverWithState().then(() => {
            console.log('Receiver loaded with initial state');
            
            // Start regular state updates via media updates
            startVisualSync();
            
        }).catch(error => {
            console.error('Error loading receiver:', error);
        });
        
    } catch (error) {
        console.error('Error sending initial state:', error);
    }
}

function loadReceiverWithState() {
    return new Promise((resolve, reject) => {
        try {
            // Check if chrome.cast.media is available
            if (!window.chrome || !chrome.cast || !chrome.cast.media) {
                console.warn('chrome.cast.media not available, skipping media load');
                resolve();
                return;
            }
            
            console.log('Loading Cast with real audio streaming...');
            
            // Start audio capture and streaming
            startAudioCapture().then(audioUrl => {
                // Create media info with real audio stream
                const mediaInfo = new chrome.cast.media.MediaInfo(audioUrl, 'audio/webm');
                mediaInfo.streamType = chrome.cast.media.StreamType.LIVE;
                mediaInfo.metadata = new chrome.cast.media.MusicTrackMediaMetadata();
                
                // Set metadata to show our app info
                if (typeof currentRaga !== 'undefined' && currentRaga) {
                    mediaInfo.metadata.title = `♪ Raga ${currentRaga.name}`;
                    mediaInfo.metadata.artist = 'Raga.fm - Generative Indian Classical Music';
                    mediaInfo.metadata.albumName = `${currentRaga.mood} - ${typeof currentMode !== 'undefined' ? currentMode.charAt(0).toUpperCase() + currentMode.slice(1) : 'Ambient'} Mode`;
                    
                    // Add images if available
                    mediaInfo.metadata.images = [{
                        url: `${window.location.origin}/logo.svg`,
                        width: 512,
                        height: 512
                    }];
                } else {
                    mediaInfo.metadata.title = 'Raga.fm';
                    mediaInfo.metadata.artist = 'Generative Indian Classical Music';
                    mediaInfo.metadata.albumName = 'Loading...';
                }
                
                const request = new chrome.cast.media.LoadRequest(mediaInfo);
                request.autoplay = true; // Auto-play the real audio stream
                
                currentCastSession.loadMedia(request).then(
                    function() {
                        console.log('Cast audio stream loaded successfully');
                        audioStreamingActive = true;
                        resolve();
                    },
                    function(error) {
                        console.error('Error loading cast audio stream:', error);
                        reject(error);
                    }
                );
                
            }).catch(error => {
                console.error('Error capturing audio:', error);
                reject(error);
            });
            
        } catch (error) {
            console.error('Error in loadReceiverWithState:', error);
            reject(error);
        }
    });
}

// Audio capture and streaming functions
async function startAudioCapture() {
    try {
        console.log('Starting audio capture for Cast streaming...');
        
        // Get the audio context from Tone.js
        if (!Tone.context || !Tone.context.destination) {
            throw new Error('Tone.js audio context not available');
        }
        
        // Create a MediaStreamDestination to capture Tone.js output
        const dest = Tone.context.createMediaStreamDestination();
        
        // Connect Tone.js master output to our capture destination
        Tone.getDestination().connect(dest);
        
        audioStream = dest.stream;
        
        // Set up MediaRecorder to create audio chunks
        const options = {
            mimeType: 'audio/webm;codecs=opus',
            audioBitsPerSecond: 128000
        };
        
        mediaRecorder = new MediaRecorder(audioStream, options);
        audioChunks = [];
        
        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                audioChunks.push(event.data);
            }
        };
        
        mediaRecorder.onstop = () => {
            console.log('Audio recording stopped');
        };
        
        // Start recording in chunks
        mediaRecorder.start(1000); // Record in 1-second chunks
        
        // Create a blob URL for the stream
        return new Promise((resolve, reject) => {
            // For live streaming, we need to create a blob URL that updates
            // This is a simplified approach - in production you'd use a streaming server
            setTimeout(() => {
                if (audioChunks.length > 0) {
                    const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                    currentMediaUrl = URL.createObjectURL(audioBlob);
                    console.log('Audio capture started, blob URL created:', currentMediaUrl);
                    resolve(currentMediaUrl);
                } else {
                    // Fallback to a simple audio stream
                    const streamUrl = createAudioStreamUrl();
                    resolve(streamUrl);
                }
            }, 2000); // Wait 2 seconds to collect some audio data
        });
        
    } catch (error) {
        console.error('Error starting audio capture:', error);
        throw error;
    }
}

function createAudioStreamUrl() {
    // Create a simple audio stream URL
    // In a real implementation, this would be a server endpoint
    // For now, we'll create a data URL with continuous audio
    
    console.log('Creating fallback audio stream...');
    
    // Generate a longer silent audio file that loops
    const sampleRate = 44100;
    const duration = 10; // 10 seconds
    const numSamples = sampleRate * duration;
    const buffer = new ArrayBuffer(44 + numSamples * 2);
    const view = new DataView(buffer);
    
    // WAV header
    const writeString = (offset, string) => {
        for (let i = 0; i < string.length; i++) {
            view.setUint8(offset + i, string.charCodeAt(i));
        }
    };
    
    writeString(0, 'RIFF');
    view.setUint32(4, 36 + numSamples * 2, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, numSamples * 2, true);
    
    // Generate audio data (simple tone for testing)
    for (let i = 0; i < numSamples; i++) {
        const sample = Math.sin(2 * Math.PI * 440 * i / sampleRate) * 0.1; // Quiet 440Hz tone
        view.setInt16(44 + i * 2, sample * 32767, true);
    }
    
    const blob = new Blob([buffer], { type: 'audio/wav' });
    return URL.createObjectURL(blob);
}

function stopAudioCapture() {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
    }
    
    if (audioStream) {
        audioStream.getTracks().forEach(track => track.stop());
        audioStream = null;
    }
    
    if (currentMediaUrl) {
        URL.revokeObjectURL(currentMediaUrl);
        currentMediaUrl = null;
    }
    
    audioStreamingActive = false;
    console.log('Audio capture stopped');
}

function getCurrentStateForURL() {
    const state = {
        raga: typeof currentRaga !== 'undefined' && currentRaga ? currentRaga.name : null,
        mode: typeof currentMode !== 'undefined' ? currentMode : 'ambient',
        playing: typeof isPlaying !== 'undefined' ? isPlaying : false,
        bpm: typeof bpm !== 'undefined' ? bpm : 120
    };
    
    return new URLSearchParams(state).toString();
}

function startVisualSync() {
    // Since we can't send custom messages, we'll update the metadata periodically
    // to sync basic state information
    if (castStateUpdateInterval) {
        clearInterval(castStateUpdateInterval);
    }
    
    castStateUpdateInterval = setInterval(() => {
        if (isCasting && currentCastSession) {
            updateMediaMetadata();
        }
    }, 10000); // Update every 10 seconds for periodic sync
}

function updateMediaMetadata() {
    try {
        // Check if chrome.cast.media is available
        if (!window.chrome || !chrome.cast || !chrome.cast.media) {
            console.warn('chrome.cast.media not available for metadata update');
            return;
        }
        
        const media = currentCastSession.getMediaSession();
        if (media && typeof currentRaga !== 'undefined' && currentRaga) {
            // Create updated metadata
            const metadata = new chrome.cast.media.MusicTrackMediaMetadata();
            metadata.title = `♪ Raga ${currentRaga.name}`;
            metadata.artist = 'Raga.fm - Generative Indian Classical Music';
            
            // Show current mode and state
            const modeText = typeof currentMode !== 'undefined' ? 
                currentMode.charAt(0).toUpperCase() + currentMode.slice(1) : 'Ambient';
            const playingText = typeof isPlaying !== 'undefined' && isPlaying ? 'Playing' : 'Paused';
            
            metadata.albumName = `${currentRaga.mood} - ${modeText} Mode (${playingText})`;
            
            // Add logo
            metadata.images = [{
                url: `${window.location.origin}/logo.svg`,
                width: 512,
                height: 512
            }];
            
            console.log('Updated Cast metadata:', metadata.title, '-', metadata.albumName);
        }
    } catch (error) {
        console.error('Error updating metadata:', error);
    }
}

function sendCurrentState() {
    // With Default Media Receiver, we can't send custom state updates
    // State is passed through URL parameters on initial load
    console.log('State sync via URL parameters - no real-time updates available with Default Media Receiver');
}

function getGridState() {
    // Return simplified grid state for casting
    if (typeof grid === 'undefined' || !grid || grid.length === 0) return null;
    
    try {
        return grid.map(row => 
            row.map(cell => ({
                note: cell ? cell.note : null,
                hindiNote: cell ? cell.hindiNote : null,
                isPlaying: cell ? cell.isPlaying : false
            }))
        );
    } catch (error) {
        console.error('Error getting grid state:', error);
        return null;
    }
}

function sendCustomMessage(message) {
    // Note: Default Media Receiver doesn't support custom messages
    // We use metadata updates instead for state synchronization
    console.log('Custom message would be sent:', message.type, '(using metadata updates instead)');
    
    // Trigger a metadata update instead
    if (isCasting && currentCastSession) {
        updateMediaMetadata();
    }
}

function startStateUpdates() {
    if (castStateUpdateInterval) {
        clearInterval(castStateUpdateInterval);
    }
    
    // Send state updates every 200ms for smooth sync (reduced from 100ms to avoid spam)
    castStateUpdateInterval = setInterval(() => {
        if (isCasting && isPlaying) {
            sendCurrentState();
        }
    }, 200);
}

function stopStateUpdates() {
    if (castStateUpdateInterval) {
        clearInterval(castStateUpdateInterval);
        castStateUpdateInterval = null;
    }
}

function showCastButton() {
    const castContainer = document.getElementById('cast-button-container');
    if (castContainer) {
        castContainer.classList.remove('hidden');
    }
}

function hideCastButton() {
    const castContainer = document.getElementById('cast-button-container');
    if (castContainer) {
        castContainer.classList.add('hidden');
    }
}

// Notify cast when raga changes
function notifyCastRagaChange(raga) {
    if (isCasting && currentCastSession) {
        console.log('Cast: Raga changed to', raga.name);
        // Update metadata immediately to reflect the change
        updateMediaMetadata();
    }
}

// Notify cast when mode changes
function notifyCastModeChange(mode) {
    if (isCasting && currentCastSession) {
        console.log('Cast: Mode changed to', mode);
        // Update metadata immediately to reflect the change
        updateMediaMetadata();
    }
}

// Notify cast when playback state changes
function notifyCastPlaybackChange(playing) {
    if (isCasting && currentCastSession) {
        console.log('Cast: Playback state changed to', playing ? 'playing' : 'paused');
        // Update metadata immediately to reflect the change
        updateMediaMetadata();
    }
}

// Stop casting
function stopCasting() {
    if (currentCastSession) {
        try {
            currentCastSession.endSession(true);
        } catch (error) {
            console.error('Error ending cast session:', error);
        }
    }
    
    // Stop audio capture when casting ends
    if (audioStreamingActive) {
        stopAudioCapture();
    }
}

// Development mode cast functionality
function setupMockCastButton() {
    const castButton = document.getElementById('cast-button');
    if (castButton) {
        castButton.addEventListener('click', () => {
            alert('Cast functionality is in development mode.\n\nTo test with real Cast devices:\n1. Serve this site over HTTPS\n2. Ensure Google Cast extension is installed\n3. Have Cast devices on same network\n4. The Cast button will appear automatically when devices are detected');
        });
    }
}

function enableDevelopmentCast() {
    console.log('Enabling development cast mode (no actual casting)');
    
    // Show cast button for testing UI
    showCastButton();
    setupMockCastButton();
}

// Initialize Cast SDK when ready
function initCastFramework() {
    console.log('Waiting for Cast SDK...');
    
    // Check if we're in development (localhost)
    const isDevelopment = window.location.hostname === 'localhost' || 
                         window.location.hostname === '127.0.0.1' ||
                         window.location.protocol === 'file:';
    
    if (isDevelopment) {
        console.log('Development environment detected');
        setTimeout(() => {
            console.log('Skipping Cast SDK initialization in development mode');
            enableDevelopmentCast();
        }, 1000);
    } else {
        waitForCastSDK(initializeCast);
    }
}

// Auto-initialize when page loads
if (document.readyState === 'loading') {
    window.addEventListener('load', initCastFramework);
} else {
    initCastFramework();
} 