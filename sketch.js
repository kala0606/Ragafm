// === GLOBAL STATE AND INSTANCES ===

// Audio
let melodySampler, stringSampler, kotoSampler, chordSampler, chordSamplerC, drumSampler, hiHatSampler, tablaPlayers;
let reverb, delay, lowPassFilter, hiHatDelay, hiHatReverb;
let meter;
let isPlaying = false;
let bpm = 120;
let beatDuration;
let playbackLoopTimeout;
let a = 0; // Perlin noise seed
let currentMode = 'ambient'; // 'ambient' or 'rhythm' or 'interaction'

// Raga & Compositions
let ragaData;
const allRagas = {};
let currentRaga;
let currentSequence = [];
let currentDrumPattern = {};
let currentTablaPattern = {};
let currentTimeSignature = { beats: 4, subdivision: 4 };
let currentBeat = 0;
let barCounter = 0;
let barsUntilRefresh = 4;
let nextChordInterval;
let barsSinceChord = 0;
let drumState = { event: null, duration: 0, barsUntilChange: 8, fillPattern: [] };
let tihaiActive = false, currentTihaiPattern = [], tihaiCounter = 0, tihaiRepetition = 0;
let fastRhythmEvent = false, currentFastRhythm = null, fastRhythmCounter = 0, fastRhythmSubCounter = 0;
let isJhala = false, jhalaCounter = 0, jhalaDurationBeats, jhalaProbability = 0.01, jhalaPattern = [0, 1];


// Visuals
let grid = [];
let gridCols;
let cellSize;
let noteCells = {};
let textCanvas;
let backgroundShader;
let shaderTime = 0;
let hindiFont;
let currentColorPalette = [];
let currentPlayingNote = null;
let currentAmplitude = 0;


// System
let wakeLock = null;
let assetsLoaded = false;


// === P5.JS LIFECYCLE ===

function preload() {
  // Load non-audio assets here
  ragaData = loadJSON('ragadata.json');
  backgroundShader = loadShader('background.vert', 'background.frag');
  hindiFont = loadFont('fonts/ome_bhatkhande_hindi.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  
  // Initialize text canvas
  textCanvas = createGraphics(windowWidth, windowHeight);
  textCanvas.textFont(hindiFont);

  // Initialize Audio
  // Tone.setContext(getAudioContext());

  reverb = new Tone.Reverb({ decay: 4, wet: 0.7 });
  delay = new Tone.FeedbackDelay({ delayTime: "8n", feedback: 0.5, wet: 0.5 });
  hiHatDelay = new Tone.FeedbackDelay({ delayTime: "16n", feedback: 0.3, wet: 0 });
  hiHatReverb = new Tone.Reverb({ decay: 1.5, wet: 0 });
  lowPassFilter = new Tone.Filter({ frequency: 2000, type: 'lowpass', Q: 1 });
  meter = new Tone.Meter();
  Tone.getDestination().connect(meter);

  let samplersLoaded = 0;
  const totalSamplers = 6;

  function onSamplerLoad() {
    samplersLoaded++;
    if (samplersLoaded === totalSamplers) {
      console.log("All samplers loaded.");
      assetsLoaded = true;
      // Now that everything is loaded, process raga data and populate the UI
      processRagaData();
    }
  }

  melodySampler = new Tone.Sampler(rhodesSamplesMap, { onload: onSamplerLoad, release: 1, baseUrl: "./" }).chain(lowPassFilter, delay, reverb, Tone.Destination);
  stringSampler = new Tone.Sampler(stringSamplesMap, { onload: onSamplerLoad, release: 4, baseUrl: "./" }).chain(lowPassFilter, delay, reverb, Tone.Destination);
  kotoSampler = new Tone.Sampler(samplesMap, { onload: onSamplerLoad, release: 1, baseUrl: "./" }).chain(lowPassFilter, delay, reverb, Tone.Destination);
  chordSampler = new Tone.Sampler(rhodesSamplesMap, { onload: onSamplerLoad, release: 4, baseUrl: "./" }).chain(lowPassFilter, delay, reverb, Tone.Destination);
  chordSamplerC = new Tone.Sampler(celloSamplesMap, { onload: onSamplerLoad, release: 4, baseUrl: "./" }).chain(lowPassFilter, delay, reverb, Tone.Destination);
  drumSampler = new Tone.Sampler(drumSamples, { onload: onSamplerLoad, baseUrl: "./" }).toDestination();
  tablaPlayers = new Tone.Players(tablaSamples, { onload: onSamplerLoad, baseUrl: "./" }).toDestination();
  
  // Note: hiHatSampler is not counted in totalSamplers as it loads quickly, but for safety, you could include it.
  hiHatSampler = new Tone.Sampler(hiHatSamples, { baseUrl: "./" }).chain(hiHatDelay, hiHatReverb, Tone.Destination);

  // Set initial volumes
  melodySampler.volume.value = -3;
  stringSampler.volume.value = -6;
  kotoSampler.volume.value = -10;
  chordSampler.volume.value = -14;
  chordSamplerC.volume.value = -1;
  drumSampler.volume.value = -16;
  hiHatSampler.volume.value = -14;
  tablaPlayers.volume.value = -2;

  // Setup UI listeners
  const modeToggleButton = document.getElementById('mode-toggle');
  if (modeToggleButton) {
    // Add click listeners to individual mode text spans for direct selection
    const modeTexts = modeToggleButton.querySelectorAll('.mode-text');
    modeTexts.forEach((modeText, index) => {
      modeText.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event bubbling
        const targetMode = ['ambient', 'rhythm', 'interaction'][index];
        console.log(`Direct mode selection: ${targetMode}`);
        setMode(targetMode);
      });
    });
    
    // Fallback: if clicking on the button area (not on text), cycle through modes
    modeToggleButton.addEventListener('click', (e) => {
      // Only cycle if the click wasn't on a mode text span
      if (!e.target.classList.contains('mode-text')) {
        console.log('Mode toggle area clicked - cycling mode');
        toggleMode();
      }
    });
  }

  const startStopButton = document.getElementById('start-stop-button');
  if (startStopButton) {
      startStopButton.addEventListener('click', togglePlayback);
  }

  const backButton = select('#back-button');
  backButton.mousePressed(goToWelcomeScreen);
  
}

function draw() {
    if (!assetsLoaded) {
      background(0);
      // Optional: Add a "Loading..." text
      return;
    }

    if (meter) {
        let level_dB = meter.getValue();
        currentAmplitude = map(level_dB, -48, 0, 0, 1, true);
        shaderTime += currentAmplitude * 0.009;
    }

    if(currentRaga && backgroundShader) {
        drawGrid();

        ortho(-width / 2, width / 2, height / 2, -height / 2, 0, 1000);
        
        shader(backgroundShader);
        
        backgroundShader.setUniform('iResolution', [width, height]);
        backgroundShader.setUniform('iTime', shaderTime);
        
        const scheme = currentRaga.colorScheme;
        let c;
        c = color(scheme.background);
        backgroundShader.setUniform('u_color_background', [red(c) / 255.0, green(c) / 255.0, blue(c) / 255.0]);
        c = color(scheme.primary);
        backgroundShader.setUniform('u_color_primary', [red(c) / 255.0, green(c) / 255.0, blue(c) / 255.0]);
        c = color(scheme.secondary);
        backgroundShader.setUniform('u_color_secondary', [red(c) / 255.0, green(c) / 255.0, blue(c) / 255.0]);
        c = color(scheme.accent);
        backgroundShader.setUniform('u_color_accent', [red(c) / 255.0, green(c) / 255.0, blue(c) / 255.0]);

        noStroke();
        rect(-width/2,-height/2, width, height);

        image(textCanvas, -width / 2, height / 2, width, -height);

    } else {
        background(0);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    
    textCanvas.resizeCanvas(windowWidth, windowHeight);
    textCanvas.textFont(hindiFont);

    createGrid();
}

function setMode(targetMode) {
    if (currentMode === targetMode) {
        return; // Already in this mode, no change needed
    }
    
    const modeToggleButton = document.getElementById('mode-toggle');
    
    // Stop any cell loops when leaving interaction mode
    if (currentMode === 'interaction' && typeof stopAllCellLoops === 'function') {
        stopAllCellLoops();
    }
    
    // Remove all mode classes
    modeToggleButton.classList.remove('rhythm-active', 'interaction-active');
    
    // Set the new mode
    currentMode = targetMode;
    
    // Apply the appropriate class and setup
    if (currentMode === 'rhythm') {
        modeToggleButton.classList.add('rhythm-active');
        
        // Clear patterns when switching TO rhythm mode
        currentDrumPattern = {};
        currentTablaPattern = {};
        
    } else if (currentMode === 'interaction') {
        modeToggleButton.classList.add('interaction-active');
        
        // Clear drum patterns when switching TO interaction mode
        currentDrumPattern = {};
        currentTablaPattern = {};
        
    } else { // ambient mode
        // Clear patterns when switching TO ambient mode
        currentDrumPattern = {};
        currentTablaPattern = {};
    }

    // Setup interactions for the new mode
    if (typeof setupCellInteractions === 'function') {
        setupCellInteractions();
    }

    // Track mode change with Microsoft Clarity
    if (typeof clarity === 'function') {
        clarity('set', 'playback_mode', currentMode);
        clarity('event', 'Mode Changed');
    }

    // If we are already playing, apply the new mode's parameters immediately
    if (isPlaying) {
        clearTimeout(playbackLoopTimeout); // Stop the old loop
        resetPlaybackState();
        updatePlaybackParameters(); // This will handle the BPM and drum changes
        playbackLoop(); // Start a new loop with the new parameters
    }
}

// Keep toggleMode for backward compatibility, but now it just cycles through modes
function toggleMode() {
    const modes = ['ambient', 'rhythm', 'interaction'];
    const currentIndex = modes.indexOf(currentMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setMode(modes[nextIndex]);
}

function resetPlaybackState() {
    console.log("--- Resetting beat and bar counters ---");
    currentBeat = 0;
    barCounter = 0;
    barsSinceChord = 0;
    
    // Reset special rhythmic states to avoid them carrying over
    tihaiActive = false;
    tihaiCounter = 0;
    tihaiRepetition = 0;

    isJhala = false;
    jhalaCounter = 0;

    fastRhythmEvent = false;
    fastRhythmCounter = 0;
    fastRhythmSubCounter = 0;

    // Reset drum event state machine
    drumState.event = null;
    drumState.duration = 0;
    drumState.barsUntilChange = 8;
}
