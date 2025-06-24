// === CAST FUNCTIONALITY FOR AUDIO AND VISUAL ===

let castPlayer = null;
let remotePlayer = null;
let remotePlayerController = null;
let currentCastSession = null;
let isCasting = false;
let castStateUpdateInterval = null;

// Wait for Cast SDK to be available
function waitForCastSDK(callback, attempts = 0) {
    const maxAttempts = 10; // 5 seconds max wait time
    
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
            chromeMedia: chromeMediaAvailable
        });
    }
    
    if (castFrameworkAvailable) {
        console.log('Cast framework detected, initializing...');
        callback();
    } else if (attempts < maxAttempts) {
        console.log(`Cast SDK not ready, waiting... (${attempts + 1}/${maxAttempts})`);
        setTimeout(() => waitForCastSDK(callback, attempts + 1), 500);
    } else {
        console.warn('Cast SDK failed to load. This is normal in development or if Google Cast extension is not installed.');
        console.log('Cast functionality will be disabled.');
        // Hide cast button since Cast won't work
        hideCastButton();
    }
}

// Initialize Cast functionality
function initializeCast() {
    try {
        const castContext = cast.framework.CastContext.getInstance();
        
        // Use Styled Media Receiver which supports custom messages
        let receiverAppId = '07AEE832'; // Styled Media Receiver supports custom messages
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
        // Start with a simple media load, then send custom messages
        loadBasicMedia().then(() => {
            console.log('Basic media loaded, sending custom state...');
            
            // Wait a moment for receiver to initialize
            setTimeout(() => {
                // Send current raga
                if (typeof currentRaga !== 'undefined' && currentRaga) {
                    sendCustomMessage({
                        type: 'RAGA_CHANGE',
                        raga: currentRaga
                    });
                }
                
                // Send current mode
                sendCustomMessage({
                    type: 'MODE_CHANGE',
                    mode: typeof currentMode !== 'undefined' ? currentMode : 'ambient'
                });
                
                // Send playback state
                sendCustomMessage({
                    type: 'PLAYBACK_STATE',
                    playing: typeof isPlaying !== 'undefined' ? isPlaying : false
                });
                
                // Send initial visual/audio state
                sendCurrentState();
            }, 1000);
            
        }).catch(error => {
            console.error('Error loading media:', error);
            // Try sending messages anyway
            setTimeout(() => {
                sendCurrentState();
            }, 2000);
        });
        
    } catch (error) {
        console.error('Error sending initial state:', error);
    }
}

function loadBasicMedia() {
    return new Promise((resolve, reject) => {
        try {
            // Create a simple media load to initialize the receiver
            const mediaUrl = `${window.location.origin}/receiver.html`;
            console.log('Loading media from:', mediaUrl);
            
            // Create media info
            const mediaInfo = new chrome.cast.media.MediaInfo(mediaUrl, 'text/html');
            mediaInfo.metadata = new chrome.cast.media.GenericMediaMetadata();
            mediaInfo.metadata.title = 'Raga.fm Experience';
            mediaInfo.metadata.subtitle = 'Generative Indian Classical Music';
            
            const request = new chrome.cast.media.LoadRequest(mediaInfo);
            
            currentCastSession.loadMedia(request).then(
                function() {
                    console.log('Media loaded successfully');
                    resolve();
                },
                function(error) {
                    console.error('Error loading media:', error);
                    reject(error);
                }
            );
            
        } catch (error) {
            console.error('Error in loadBasicMedia:', error);
            reject(error);
        }
    });
}

function sendCurrentState() {
    if (!isCasting || !currentCastSession) return;
    
    try {
        const state = {
            // Audio state
            bpm: bpm || 120,
            currentBeat: currentBeat || 0,
            barCounter: barCounter || 0,
            currentSequence: currentSequence || [],
            isPlaying: isPlaying || false,
            
            // Visual state
            shaderTime: typeof shaderTime !== 'undefined' ? shaderTime : 0,
            currentAmplitude: typeof currentAmplitude !== 'undefined' ? currentAmplitude : 0,
            currentPlayingNote: currentPlayingNote || null,
            currentMode: currentMode || 'ambient',
            
            // Grid state for interaction mode
            grid: currentMode === 'interaction' ? getGridState() : null,
            
            // Timestamp for sync
            timestamp: Date.now()
        };
        
        sendCustomMessage({
            type: 'STATE_UPDATE',
            state: state
        });
        
    } catch (error) {
        console.error('Error sending current state:', error);
    }
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
                console.error('Error sending custom message:', message.type, error);
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
function enableDevelopmentCast() {
    console.log('Enabling development cast mode (no actual casting)');
    
    // Show cast button for testing UI
    showCastButton();
    
    // Add click handler for development
    const castButton = document.getElementById('cast-button');
    if (castButton) {
        castButton.addEventListener('click', () => {
            console.log('Development cast button clicked');
            alert('Cast functionality is not available in development mode.\n\nTo test casting:\n1. Deploy to HTTPS server\n2. Install Google Cast extension\n3. Ensure Cast devices are on network');
        });
    }
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