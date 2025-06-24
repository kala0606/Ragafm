# Raga.fm Cast Setup Guide

## Overview
Raga.fm now supports casting both audio and visual content to Cast-enabled devices (Chromecast, smart TVs, etc.). The cast functionality synchronizes the complete musical experience including visuals, ragas, modes, and interactive elements.

## Files Overview

### Sender (Main App)
- `index.html` - Main application with Cast SDK integration
- `js/cast.js` - Cast sender functionality for audio/visual state management
- `js/audio.js` - Enhanced with cast notifications
- `js/ui.js` - Enhanced with raga change notifications
- `sketch.js` - Enhanced with mode change notifications
- `style.css` - Includes cast button styling

### Receiver
- `receiver.html` - Cast receiver app that displays synced audio/visual content

## Features

### Audio/Visual Sync
- Real-time synchronization of shader time and amplitude
- Complete raga state including notes, color schemes, and musical parameters
- Mode synchronization (Ambient, Rhythm, Interaction)
- Interactive grid state for interaction mode

### Cast Controls
- Cast button appears when Cast devices are available
- Automatic session management
- Bi-directional playback control sync
- Graceful fallback if Cast framework unavailable

### Visual Elements on Receiver
- Complete shader background rendering with raga color schemes
- Grid visualization for interaction mode
- Real-time note highlighting and cell animations
- Status indicators showing connection and raga information

## Usage

### For Users
1. Ensure you have a Cast-enabled device on the same network
2. Open Raga.fm in a supported browser (Chrome recommended)
3. When Cast devices are available, a 📺 button will appear in the top-right corner
4. Click the cast button to select your device
5. The complete Raga.fm experience will appear on your Cast device
6. Control playback from either the sender device or Cast device

### Browser Compatibility
- Chrome/Chromium browsers (recommended)
- Edge (with Cast extension)
- Other browsers may require Cast extension installation

## Technical Details

### Cast Message Types
- `STATE_UPDATE` - Complete audio/visual state sync (100ms intervals when playing)
- `RAGA_CHANGE` - Raga selection updates
- `MODE_CHANGE` - Mode switching (Ambient/Rhythm/Interaction)
- `PLAYBACK_STATE` - Play/pause synchronization

### State Synchronization
The sender broadcasts the following state:
```javascript
{
    // Audio state
    bpm: number,
    currentBeat: number,
    barCounter: number,
    currentSequence: array,
    isPlaying: boolean,
    
    // Visual state
    shaderTime: number,
    currentAmplitude: number,
    currentPlayingNote: string,
    currentMode: string,
    
    // Grid state (interaction mode)
    grid: array,
    
    // Sync timestamp
    timestamp: number
}
```

### Receiver Limitations
- Simplified audio samplers (receiver focuses on visual experience)
- Basic grid rendering (sufficient for visual feedback)
- Dependent on sender for complete audio generation

## Deployment Notes

### Local Development
- Receiver requires HTTPS for Cast framework
- Use `python -m http.server 8000` with HTTPS proxy
- Or deploy to HTTPS hosting (Netlify, Vercel, etc.)

### Production Deployment
- Both sender and receiver must be served over HTTPS
- Receiver URL must be accessible from Cast devices
- Consider CDN for global performance

### Firewall Considerations
- Cast devices need access to receiver URL
- No special ports required (standard HTTPS/443)

## Troubleshooting

### Cast Button Not Appearing
- Ensure Cast devices are on same network
- Check browser Cast extension is installed/enabled
- Verify HTTPS deployment for production

### Sync Issues
- Check network latency between devices
- Verify both sender and receiver are on same domain
- Monitor browser console for Cast framework errors

### Audio/Visual Desync
- Normal latency: ~100-200ms acceptable
- Check `sendCurrentState()` interval frequency
- Verify receiver is processing STATE_UPDATE messages

## Future Enhancements
- Multi-room audio sync
- Enhanced receiver audio capabilities
- Voice control integration
- Mobile sender app optimization 