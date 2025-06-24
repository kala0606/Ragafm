// === CAST FUNCTIONALITY FOR AUDIO AND VISUAL ===

let castPlayer = null;
let remotePlayer = null;
let remotePlayerController = null;
let currentCastSession = null;
let isCasting = false;
let castStateUpdateInterval = null;

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
                
                // Stop state updates
                stopStateUpdates();
                
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
            
            // Instead of loading HTML, create a minimal audio representation
            // This avoids the Shaka Player issue while showing our metadata
            const silentAudio = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+L3vmAVBjih1vP5gzsNSIfT7+WmWxEOZLnqzJpMFhBQn+X+t2EtC2uS2fXKdCQKNmvB7+isSxoRVqKo3ZRLHx1inJ/y7n88DGFZzflSHB1itBjlp0wcACFqMkjXyYYADAVCBZEGZgQKGpT%2F'; // Tiny silent WAV
            console.log('Loading Cast display for Raga.fm');
            
            // Create media info for display
            const mediaInfo = new chrome.cast.media.MediaInfo(silentAudio, 'audio/wav');
            mediaInfo.streamType = chrome.cast.media.StreamType.LIVE; // Live stream so it doesn't auto-end
            mediaInfo.metadata = new chrome.cast.media.MusicTrackMediaMetadata();
            
            // Set metadata to show our app info
            if (typeof currentRaga !== 'undefined' && currentRaga) {
                mediaInfo.metadata.title = `Raga ${currentRaga.name}`;
                mediaInfo.metadata.artist = 'Raga.fm - Generative Indian Classical Music';
                mediaInfo.metadata.albumName = `${currentRaga.mood} - ${typeof currentMode !== 'undefined' ? currentMode.charAt(0).toUpperCase() + currentMode.slice(1) : 'Ambient'} Mode`;
                
                // Add images if available
                if (currentRaga.colorScheme) {
                    mediaInfo.metadata.images = [{
                        url: `${window.location.origin}/logo.svg`,
                        width: 512,
                        height: 512
                    }];
                }
            } else {
                mediaInfo.metadata.title = 'Raga.fm';
                mediaInfo.metadata.artist = 'Generative Indian Classical Music';
                mediaInfo.metadata.albumName = 'Loading...';
            }
            
            const request = new chrome.cast.media.LoadRequest(mediaInfo);
            request.autoplay = false; // Don't auto-play the placeholder audio
            
            currentCastSession.loadMedia(request).then(
                function() {
                    console.log('Cast display loaded successfully');
                    resolve();
                },
                function(error) {
                    console.error('Error loading cast display:', error);
                    reject(error);
                }
            );
            
        } catch (error) {
            console.error('Error in loadReceiverWithState:', error);
            reject(error);
        }
    });
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
    }, 5000); // Update every 5 seconds to avoid spam
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
    if (!currentCastSession) {
        console.warn('No cast session available for sending message:', message);
        return;
    }
    
    try {
        console.log('Sending custom message:', message.type, message);
        currentCastSession.sendMessage('urn:x-cast:raga-fm', message).then(
            function() {
                console.log('Custom message sent successfully:', message.type);
            },
            function(error) {
                // Custom messages aren't supported by Default Media Receiver - this is expected
                console.log('Custom message not supported (expected with Default Media Receiver):', message.type);
            }
        );
    } catch (error) {
        console.error('Error in sendCustomMessage:', error);
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
        sendCustomMessage({
            type: 'RAGA_CHANGE',
            raga: raga
        });
    }
}

// Notify cast when mode changes
function notifyCastModeChange(mode) {
    if (isCasting && currentCastSession) {
        sendCustomMessage({
            type: 'MODE_CHANGE',
            mode: mode
        });
    }
}

// Notify cast when playback state changes
function notifyCastPlaybackChange(playing) {
    if (isCasting && currentCastSession) {
        sendCustomMessage({
            type: 'PLAYBACK_STATE',
            playing: playing
        });
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