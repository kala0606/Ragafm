// === GLOBAL STATE AND INSTANCES ===

// Audio
let melodySampler, stringSampler, kotoSampler, chordSampler, drumSampler, hiHatSampler, tablaSampler;
let reverb, delay, lowPassFilter, hiHatDelay, hiHatReverb;
let meter;
let isPlaying = false;
let bpm = 120;
let beatDuration;
let playbackLoopTimeout;
let a = 0; // Perlin noise seed
let currentMode = 'ambient'; // 'ambient' or 'rhythm'

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

  reverb = new Tone.Reverb({ decay: 4, wet: 0.3 });
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
  stringSampler = new Tone.Sampler(stringSamplesMap, { onload: onSamplerLoad, release: 1, baseUrl: "./" }).chain(lowPassFilter, delay, reverb, Tone.Destination);
  kotoSampler = new Tone.Sampler(samplesMap, { onload: onSamplerLoad, release: 1, baseUrl: "./" }).chain(lowPassFilter, delay, reverb, Tone.Destination);
  chordSampler = new Tone.Sampler(celloSamplesMap, { onload: onSamplerLoad, release: 4, baseUrl: "./" }).chain(lowPassFilter, delay, reverb, Tone.Destination);
  drumSampler = new Tone.Sampler(drumSamples, { onload: onSamplerLoad, baseUrl: "./" }).toDestination();
  tablaSampler = new Tone.Sampler(tablaSamples, { onload: onSamplerLoad, baseUrl: "./" }).toDestination();
  
  // Note: hiHatSampler is not counted in totalSamplers as it loads quickly, but for safety, you could include it.
  hiHatSampler = new Tone.Sampler(hiHatSamples, { baseUrl: "./" }).chain(hiHatDelay, hiHatReverb, Tone.Destination);

  // Set initial volumes
  melodySampler.volume.value = -6;
  stringSampler.volume.value = -6;
  kotoSampler.volume.value = -10;
  chordSampler.volume.value = -7;
  drumSampler.volume.value = -16;
  hiHatSampler.volume.value = -14;
  tablaSampler.volume.value = -8;

  // Setup UI listeners
  const modeToggleButton = document.getElementById('mode-toggle');
  if (modeToggleButton) {
    modeToggleButton.addEventListener('click', toggleMode);
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
        shaderTime += currentAmplitude * 0.05;
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

function toggleMode() {
    const modeToggleButton = document.getElementById('mode-toggle');

    if (currentMode === 'ambient') {
        currentMode = 'rhythm';
        modeToggleButton.classList.add('rhythm-active');
    } else {
        currentMode = 'ambient';
        modeToggleButton.classList.remove('rhythm-active');
        currentDrumPattern = {}; // Clear pattern when switching TO ambient mode
        currentTablaPattern = {}; // Clear pattern when switching TO ambient mode
    }

    // If we are already playing, apply the new mode's parameters immediately
    if (isPlaying) {
        clearTimeout(playbackLoopTimeout); // Stop the old loop
        resetPlaybackState();
        updatePlaybackParameters(); // This will handle the BPM and drum changes
        playbackLoop(); // Start a new loop with the new parameters
    }
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
