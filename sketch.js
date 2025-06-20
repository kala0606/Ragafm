const samplesMap = {
    "D3": "samples/Sustain/Front_D3_Sustain2.flac",
    "D#3": "samples/Sustain/Front_Ds3_Sustain2.flac",
    "E3": "samples/Sustain/Front_E3_Sustain2.flac",
    "F3": "samples/Sustain/Front_F3_Sustain2.flac",
    "F#3": "samples/Sustain/Front_Fs3_Sustain2.flac",
    "G3": "samples/Sustain/Front_G3_Sustain2.flac",
    "G#3": "samples/Sustain/Front_Gs3_Sustain2.flac",
    "A3": "samples/Sustain/Front_A3_Sustain2.flac",
    "A#3": "samples/Sustain/Front_As3_Sustain2.flac",
    "B3": "samples/Sustain/Front_B3_Sustain2.flac",
    "C4": "samples/Sustain/Front_C4_Sustain2.flac",
    "C#4": "samples/Sustain/Front_Cs4_Sustain2.flac",
    "D4": "samples/Sustain/Front_D4_Sustain2.flac",
    "D#4": "samples/Sustain/Front_Ds4_Sustain2.flac",
    "E4": "samples/Sustain/Front_E4_Sustain2.flac",
    "F4": "samples/Sustain/Front_F4_Sustain2.flac",
    "F#4": "samples/Sustain/Front_Fs4_Sustain2.flac",
    "G4": "samples/Sustain/Front_G4_Sustain2.flac",
    "G#4": "samples/Sustain/Front_Gs4_Sustain2.flac",
    "A4": "samples/Sustain/Front_A4_Sustain2.flac",
    "A#4": "samples/Sustain/Front_As4_Sustain2.flac",
    "B4": "samples/Sustain/Front_B4_Sustain2.flac",
    "C5": "samples/Sustain/Front_C5_Sustain2.flac",
    "C#5": "samples/Sustain/Front_Cs5_Sustain2.flac",
    "D5": "samples/Sustain/Front_D5_Sustain2.flac",
    "D#5": "samples/Sustain/Front_Ds5_Sustain2.flac",
    "E5": "samples/Sustain/Front_E5_Sustain2.flac",
    "F5": "samples/Sustain/Front_F5_Sustain2.flac",
    "F#5": "samples/Sustain/Front_Fs5_Sustain2.flac",
    "G5": "samples/Sustain/Front_G5_Sustain2.flac",
    "G#5": "samples/Sustain/Front_Gs5_Sustain2.flac",
    "A5": "samples/Sustain/Front_A5_Sustain2.flac",
    "A#5": "samples/Sustain/Front_As5_Sustain2.flac",
    "B5": "samples/Sustain/Front_B5_Sustain2.flac",
    "C6": "samples/Sustain/Front_C6_Sustain2.flac"
};

const rhodesSamplesMap = {
    "F1": "samples/jRhodes3d-mono/A_029__F1_1.flac",
    "B1": "samples/jRhodes3d-mono/A_035__B1_1.flac",
    "E2": "samples/jRhodes3d-mono/A_040__E2_1.flac",
    "A2": "samples/jRhodes3d-mono/A_045__A2_1.flac",
    "D3": "samples/jRhodes3d-mono/A_050__D3_1.flac",
    "G3": "samples/jRhodes3d-mono/A_055__G3_1.flac",
    "B3": "samples/jRhodes3d-mono/A_059__B3_1.flac",
    "D4": "samples/jRhodes3d-mono/A_062__D4_1.flac",
    "F4": "samples/jRhodes3d-mono/A_065__F4_1.flac",
    "B4": "samples/jRhodes3d-mono/A_071__B4_1.flac",
    "E5": "samples/jRhodes3d-mono/A_076__E5_1.flac",
    "A5": "samples/jRhodes3d-mono/A_081__A5_2.flac", // Using _2 as _1 is missing
    "D6": "samples/jRhodes3d-mono/A_086__D6_2.flac", // Using _2 as _1 is missing
    "G6": "samples/jRhodes3d-mono/A_091__G6_2.flac", // Using _2 as _1 is missing
    "C7": "samples/jRhodes3d-mono/A_096__C7_2.flac"  // Using _2 as _1 is missing
};

const stringSamplesMap = {
    "F#3": "samples/Strings1/fs3_Pick1.flac",
    "G3": "samples/Strings1/g3_Pick1.flac",
    "G#3": "samples/Strings1/gs3_Pick1.flac",
    "A3": "samples/Strings1/a3_Pick1.flac",
    "A#3": "samples/Strings1/as3_Pick1.flac",
    "B3": "samples/Strings1/b3_Pick1.flac",
    "C4": "samples/Strings1/c4_Pick1.flac",
    "C#4": "samples/Strings1/cs4_Pick1.flac",
    "D4": "samples/Strings1/d4_Pick1.flac",
    "D#4": "samples/Strings1/ds4_Pick1.flac",
    "E4": "samples/Strings1/e4_Pick1.flac",
    "F4": "samples/Strings1/f4_Pick1.flac",
    "F#4": "samples/Strings1/fs4_Pick1.flac",
    "G4": "samples/Strings1/g4_Pick1.flac",
    "G#4": "samples/Strings1/gs4_Pick1.flac",
    "A4": "samples/Strings1/a4_Pick1.flac",
    "A#4": "samples/Strings1/as4_Pick1.flac",
    "B4": "samples/Strings1/b4_Pick1.flac",
    "C5": "samples/Strings1/c5_Pick1.flac",
    "C#5": "samples/Strings1/cs5_Pick1.flac",
    "D5": "samples/Strings1/d5_Pick1.flac",
    "D#5": "samples/Strings1/ds5_Pick1.flac",
    "E5": "samples/Strings1/e5_Pick1.flac",
    "F5": "samples/Strings1/f5_Pick1.flac",
    "F#5": "samples/Strings1/fs5_Pick1.flac",
    "G5": "samples/Strings1/g5_Pick1.flac",
    "G#5": "samples/Strings1/gs5_Pick1.flac",
    "A#5": "samples/Strings1/as5_Pick1.flac",
    "B5": "samples/Strings1/b5_Pick1.flac",
};

const celloSamplesMap = {
    "A1": "samples/cello/A1_mp_g.wav",
    "C2": "samples/cello/C2_mp_g.wav",
    "D#2": "samples/cello/Eb2_mp_g.wav", // Assuming Eb is D#
    "F#2": "samples/cello/Gb2_mp_g.wav", // Assuming Gb is F#
    "A2": "samples/cello/A2_mp_g.wav",
    "C3": "samples/cello/C3_mp_g.wav",
    "D#3": "samples/cello/Eb3_mp_g.wav",
    "F#3": "samples/cello/Gb3_mp_g.wav",
    "A3": "samples/cello/A3_mp_g.wav",
    "C4": "samples/cello/C4_mp_g.wav",
    "D#4": "samples/cello/Eb4_mp_g.wav",
    "F#4": "samples/cello/Gb4_mp_g.wav",
    "A4": "samples/cello/A4_mp_g.wav"
};

let melodySampler, stringSampler, kotoSampler, chordSampler;
let reverb, delay, lowPassFilter;
let meter;
let currentAmplitude = 0;

// === RAGA DATA ===
let ragaData;
const allRagas = {};
let currentRaga; // Will be set after data is loaded and a selection is made.

// === VISUALS ===
// Grid for notes
let grid = [];
let gridCols;
let cellSize;
let noteCells = {}; // To quickly find all cells of a given note

// Graphics layer for text
let textCanvas;

// Shader
let backgroundShader;
let shaderTime = 0; // for audio-reactive shader time

// Font
let hindiFont;

// Color Palette
let currentColorPalette = [];
const PALETTE_SIZE = 256; // Number of colors to generate for the palette

// Hindi Note Letters
let currentPlayingNote = null;

function parseSargamToMidi(sargamString, isAvroha = false) {
    if (!sargamString) return [];

    const sargamMap = {
        'S': 0, 'r': 1, 'R': 2, 'g': 3, 'G': 4, 'm': 5, 'M': 6, "M'": 6,
        'P': 7, 'd': 8, 'D': 9, 'n': 10, 'N': 11
    };

    const notes = sargamString.replace(/,/g, '').trim().split(/\s+/).filter(Boolean);
    const midiNotes = [];
    if (notes.length === 0) return [];

    // Determine starting octave
    let octave = 4; // Middle C is in octave 4 for MIDI
    if (notes[0].includes("'")) {
        octave = 5;
    } else if (notes[0].includes('.')) {
        octave = 3;
    }

    let lastPitchClass = -1;

    for (const note of notes) {
        let noteName = note.replace(/[.']/g, '');
        if (noteName === "M'") noteName = 'M';
        const pitchClass = sargamMap[noteName];

        if (pitchClass === undefined) continue;

        // Contextual octave switching, overridden by explicit markers.
        if (lastPitchClass !== -1) {
            if (isAvroha) {
                if (pitchClass > lastPitchClass && !note.includes("'")) octave--;
            } else {
                if (pitchClass < lastPitchClass && !note.includes('.')) octave++;
            }
        }
        
        // Explicit markers always set the octave.
        if (note.includes("'")) octave = 5;
        if (note.includes('.')) octave = 3;

        // MIDI note is pitch class + 12 * (octave + 1)
        midiNotes.push(pitchClass + 12 * (octave + 1));
        lastPitchClass = pitchClass;
    }
    return midiNotes;
}

function processRagaData() {
    const sargamToMidiOffset = {
        'S': 0, 'r': 1, 'R': 2, 'g': 3, 'G': 4, 'm': 5, 'M': 6, "M'": 6,
        'P': 7, 'd': 8, 'D': 9, 'n': 10, 'N': 11
    };

    ragaData.raga_suggestions.forEach(timeSlot => {
        timeSlot.moods.forEach(mood => {
            mood.ragas.forEach(raga => {
                const pakadPhrases = raga.pakad.split(',')
                    .map(phrase => parseSargamToMidi(phrase.trim()))
                    .filter(phrase => phrase.length > 0);

                const vadiNoteName = raga.vadi.split(' ')[0].replace(/[.']/g, '');
                const samvadiNoteName = raga.samvadi.split(' ')[0].replace(/[.']/g, '');

                const processedRaga = {
                    ...raga,
                    aaroh: parseSargamToMidi(raga.aroha, false),
                    avroh: parseSargamToMidi(raga.avroha, true),
                    pakad: pakadPhrases,
                    vadi: 60 + (sargamToMidiOffset[vadiNoteName] || 0),
                    samavadi: 60 + (sargamToMidiOffset[samvadiNoteName] || 0),
                    colorScheme: mood.color_scheme,
                    mood: mood.name,
                    time_slot: timeSlot.time_slot
                };
                allRagas[raga.name] = processedRaga;
            });
        });
    });

    console.log("All Ragas Processed and ready.");
    
    // The application will now wait for the user to select a raga from the welcome screen.
    // All initialization logic is handled by the startExperience() function.
    populateWelcomeScreen();
}

function preload() {
  // Load the raga data first, and process it in the callback.
  ragaData = loadJSON('ragadata.json', processRagaData);

  // Initialize effects
  reverb = new Tone.Reverb({
    decay: 4,
    wet: 0.3
  });

  delay = new Tone.FeedbackDelay({
    delayTime: "8n",
    feedback: 0.5,
    wet: 0.5
  });

  lowPassFilter = new Tone.Filter({
    frequency: 2000,
    type: 'lowpass',
    Q: 1
  });

  // Set up the audio chain: Sampler -> Filter -> Delay -> Reverb -> Master Output
  melodySampler = new Tone.Sampler(rhodesSamplesMap, {
    release: 1,
    baseUrl: "./"
  }).chain(lowPassFilter, delay, reverb, Tone.Destination);

  stringSampler = new Tone.Sampler(stringSamplesMap, {
    release: 1,
    baseUrl: "./"
  }).chain(lowPassFilter, delay, reverb, Tone.Destination);

  kotoSampler = new Tone.Sampler(samplesMap, {
    release: 1,
    baseUrl: "./"
  }).chain(lowPassFilter, delay, reverb, Tone.Destination);

  chordSampler = new Tone.Sampler(celloSamplesMap, {
    release: 4,
    baseUrl: "./"
  }).chain(lowPassFilter, delay, reverb, Tone.Destination);

  // === MIXER VOLUMES (in Decibels) ===
  // Adjust these values to set the volume for each instrument.
  // 0 is the original volume, negative values are quieter.
  melodySampler.volume.value = -10;  // Rhodes
  stringSampler.volume.value = -6;  // Strings
  kotoSampler.volume.value = -10;    // Koto
  chordSampler.volume.value = -10;   // Cello

  // Set up the meter to measure the master output
  meter = new Tone.Meter();
  Tone.getDestination().connect(meter);

  // Load the background shader
  backgroundShader = loadShader('background.vert', 'background.frag');

  // Load the font for WebGL
  hindiFont = loadFont('fonts/ome_bhatkhande_hindi.ttf');
}

// === GLOBALS ===
// playback control
let isPlaying = false;

// Tempo & timing
let bpm = 120;             // beats per minute
let beatDuration;          // ms per beat (60000/bpm)
let dynamicInterval;       // setInterval reference
let a = 0;                 // Perlin‑noise seed for tempo variation
let intensityLevel = 3; // Default to variable

// Time signature
let currentTimeSignature = { beats: 4, subdivision: 4 };
let currentBeat = 0;       // counts subdivisions since last bar

// Raga Bhairav definitions (MIDI note numbers) - These are now obsolete
// Arohana : Sa Re♭ Ga Ma Pa Dha♭ Ni Sa'
// let aaroh = [60, 61, 64, 65, 67, 68, 71, 72];

// Avarohana : Sa' Ni Dha♭ Pa Ma Ga Re♭ Sa
// let avroh = [72, 71, 68, 67, 65, 64, 61, 60];

// Pakad : Ga Ma Dha Dha Pa  |  Ga Ma Re♭ Re♭ Sa
// let pakad = [
//  [64, 65, 68, 68, 67],
//  [64, 65, 61, 61, 60],
// ];

// Principal notes
// let vadi     = 68; // Dha♭
// let samavadi = 61; // Re♭


// Melody state
let currentSequence = [];
let barCounter = 0;       // bars since last refresh
let barsUntilRefresh = 4; // regenerate after this many bars

// Alternate meters
let timeSignatures = [
  { beats: 1, subdivision: 4 },
  { beats: 2, subdivision: 4 },
  { beats: 3, subdivision: 4 },
  { beats: 4, subdivision: 4 },
  { beats: 7, subdivision: 8 },
];

// Tihai (cadence) patterns
let tihaiPatterns = [
  [1,1,2,2,1,1,2,2,1,1,2,2],
  [3,3,4,4,3,3,4,4,3,3,4,4],
];
let currentTihaiPattern = [];
let tihaiCounter = 0;
let tihaiRepetition = 0;
let tihaiActive = false;

// Fast‑rhythm (layakari)
let fastRhythmPatterns = [
  { pattern: [0,1,0,1], noteOffset: [0,2], length: 4 },
  { pattern: [0,2,0,2], noteOffset: [0,4], length: 4 },
  { pattern: [1,3,1,3], noteOffset: [2,5], length: 4 },
];
let fastRhythmEvent = false;
let currentFastRhythm = null;
let fastRhythmCounter = 0;
let fastRhythmSubCounter = 0;

// Jhala (rapid section)
let isJhala = false;
let jhalaCounter = 0;
let jhalaDurationBeats;
const jhalaProbability = 0.01;
let jhalaPattern = [0,1];

// Chord scheduling
let chordIntervals = [1, 2, 4];
let nextChordInterval;
let barsSinceChord = 0;

// === SETUP ===
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
    
  // Create a separate 2D graphics buffer for the text
  textCanvas = createGraphics(windowWidth, windowHeight);
  textCanvas.textFont(hindiFont);

  // --- New Slider Logic ---
  const intensitySlider = document.getElementById('intensity-slider');
  if (intensitySlider) {
    // This listener provides smooth visual feedback during the drag
    intensitySlider.addEventListener('input', () => {
        updateSliderTooltip(parseFloat(intensitySlider.value));
    });

    // This listener snaps the value and updates the music on release
    intensitySlider.addEventListener('change', () => {
        const snappedValue = Math.round(parseFloat(intensitySlider.value));
        intensitySlider.value = snappedValue;
        intensityLevel = snappedValue;
        updateBPM();
        updateSliderTooltip(snappedValue);
    });
  }

  // Using a standard event listener is more robust and avoids double-firing issues.
  const startStopButton = document.getElementById('start-stop-button');
  if (startStopButton) {
      startStopButton.addEventListener('click', togglePlayback);
  }

  const backButton = select('#back-button');
  backButton.mousePressed(goToWelcomeScreen);
  
  // The rest of the setup is now deferred until a raga is selected.
  // We need to call this once at the start to position the tooltip correctly.
  updateSliderTooltip();
}

function draw() {
    // Get the amplitude from the master output and update shader time
    if (meter) {
        let level_dB = meter.getValue();
        // Map the decibel level to a linear amplitude (0-1)
        currentAmplitude = map(level_dB, -48, 0, 0, 1, true);
        // Advance our custom time variable based on the amplitude
        shaderTime += currentAmplitude * 0.05; // Adjust multiplier for desired speed
    }

    if(currentRaga && backgroundShader) {
        // Update the off-screen text grid first
        drawGrid();

        // Set an orthographic projection. This forces a 2D-like view,
        // solving the coordinate and positioning issues in WebGL mode.
        ortho(-width / 2, width / 2, height / 2, -height / 2, 0, 1000);
        
        // Apply the shader
        shader(backgroundShader);
        
        // Set shader uniforms
        backgroundShader.setUniform('iResolution', [width, height]);
        backgroundShader.setUniform('iTime', shaderTime); // Use our custom audio-reactive time
        
        // Pass the raga's color scheme to the shader
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

        // This rectangle acts as a canvas for our shader.
        noStroke();
        rect(-width/2,-height/2, width, height);

        // Draw the text canvas on top. A negative height flips the image,
        // correcting for the inverted Y-axis in WebGL textures.
        image(textCanvas, -width / 2, height / 2, width, -height);

    } else {
        background(0);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    
    // Resize the text canvas as well
    textCanvas.resizeCanvas(windowWidth, windowHeight);
    textCanvas.textFont(hindiFont);

    createGrid();
    updateSliderTooltip();
}

function drawSheenGrid() {
    textCanvas.push();
    textCanvas.stroke(0, 0, 0, 100); // Thin black lines with some transparency
    textCanvas.strokeWeight(1);
    
    const spacing = 3;

    // Vertical lines
    for (let x = 0; x < textCanvas.width; x += spacing) {
        textCanvas.line(x, 0, x, textCanvas.height);
    }

    // Horizontal lines
    for (let y = 0; y < textCanvas.height; y += spacing) {
        textCanvas.line(0, y, textCanvas.width, y);
    }
    textCanvas.pop();
}

function togglePlayback() {
  // Use the async nature of Tone.start()
  Tone.start().then(() => {
    isPlaying = !isPlaying;

    const startStopButton = document.getElementById('start-stop-button');
    if (isPlaying) {
        startStopButton.classList.add('playing');
    } else {
        startStopButton.classList.remove('playing');
    }

    if (isPlaying) {
        setDynamicInterval();
        console.log("Playback started/resumed");
    } else {
        clearInterval(dynamicInterval);
        if (melodySampler) {
          melodySampler.releaseAll();
        }
        if (stringSampler) {
          stringSampler.releaseAll();
        }
        if (kotoSampler) {
          kotoSampler.releaseAll();
        }
        if (chordSampler) {
            chordSampler.releaseAll();
        }
        console.log("Playback stopped");
    }
  });
}

// Pick how many bars until the next chord
function chooseNextChordInterval() {
  nextChordInterval = random([1, 2, 1]);
  barsSinceChord = 0;
  console.log("→ Chords every", nextChordInterval, "bars");
}

// === TEMPO ===
function updateBPM() {
  // map Perlin noise to a BPM between 10 and 180
  // let intensity = map(noise(a * 0.01), 0, 1, 1, 5);
  // bpm = map(intensity, 1, 5, 10, 120);
  //let bpm = map(noise(a * 0.009), 0, 1, 10, 160);

  const noiseVal = noise(a * 0.009);

  switch (String(intensityLevel)) {
    case '0': // 1
      bpm = map(noiseVal, 0, 1, 15, 30);
      break;
    case '1': // 2
      bpm = map(noiseVal, 0, 1, 50, 75);
      break;
    case '2': // 3
      bpm = map(noiseVal, 0, 1, 90, 120);
      break;
    case '3': // V
      bpm = map(noiseVal, 0, 1, 10, 120);
      break;
    default:
      bpm = map(noiseVal, 0, 1, 10, 120);
  }

  beatDuration = 60000 / bpm;
  if (dynamicInterval) setDynamicInterval();
}

function updateEffects() {
  // Modulate reverb wetness
  let reverbWet = map(noise(a * 0.05), 0, 1, 0.2, 0.7);
  if (reverb && reverb.wet) {
    reverb.wet.rampTo(reverbWet, 0.1);
  }

  // Modulate delay feedback
  let delayFeedback = map(noise(a * 0.05 + 1000), 0, 1, 0.25, 0.75);
  if (delay && delay.feedback) {
    delay.feedback.rampTo(delayFeedback, 0.1);
  }

  // Modulate delay wetness
  let delayWet = map(noise(a * 0.05 + 2000), 0, 1, 0, 0.5);
  if (delay && delay.wet) {
    delay.wet.rampTo(delayWet, 0.1);
  }

  // Modulate low-pass filter frequency
  let filterFreq = map(noise(a * 0.05 + 3000), 0, 1, 800, 5000);
  if (lowPassFilter && lowPassFilter.frequency) {
    lowPassFilter.frequency.rampTo(filterFreq, 0.1);
  }
}

function setDynamicInterval() {
  if (!isPlaying) return;
  clearInterval(dynamicInterval);
  let interval = beatDuration / currentTimeSignature.subdivision;
  dynamicInterval = setInterval(playBeat, interval);
}

// === SEQUENCE GENERATION ===
function generateSequence() {
  currentSequence = [];
  tihaiActive = false;
  tihaiCounter = 0;
  tihaiRepetition = 0;
  fastRhythmEvent = false;
  currentFastRhythm = null;
  fastRhythmCounter = 0;
  fastRhythmSubCounter = 0;

  let fastRhythmChance = 0.1;
  let tihaiChance = 0.25;

  let totalSlots = currentTimeSignature.beats * currentTimeSignature.subdivision;
  for (let i = 0; i < totalSlots; i++) {
    let note, r = random();
    // let note;
    // let r = noise(frameCount/100);

    // maybe start fast‑rhythm
    if (!fastRhythmEvent && r < fastRhythmChance && !tihaiActive) {
      fastRhythmEvent = true;
      currentFastRhythm = random(fastRhythmPatterns);
      fastRhythmCounter = 0;
      fastRhythmSubCounter = 0;
      console.log("→ Fast rhythm:", currentFastRhythm);
    }

    // fast‑rhythm playback
    if (fastRhythmEvent &&
        fastRhythmCounter < currentFastRhythm.length * 2) {
      let idx = fastRhythmSubCounter % currentFastRhythm.pattern.length;
      let noteIdx = currentFastRhythm.pattern[idx];
      let offIdx = idx % currentFastRhythm.noteOffset.length;
      note = currentRaga.aaroh[(noteIdx + currentFastRhythm.noteOffset[offIdx]) % currentRaga.aaroh.length];
      currentSequence.push(note + getRandomOctaveShift(note));
      fastRhythmSubCounter++;
      continue;
    } else {
      fastRhythmEvent = false;
    }

    // melodic choices
    if (r > 0.7) {
        note = random(currentRaga.aaroh);
    } else if (r > 0.4) {
        note = random(currentRaga.avroh);
    } else {
        if (currentRaga.pakad && currentRaga.pakad.length > 0) {
            let phrase = random(currentRaga.pakad);
            currentSequence.push(...phrase);
        } else {
            // Fallback if no valid pakad phrases exist
            note = random(currentRaga.aaroh);
        }
    }

    if (note != null) {
      note += getRandomOctaveShift(note);
      currentSequence.push(note);
    }

    if (r > 0.8) currentSequence.push(currentRaga.vadi);
    if (r > 0.9) currentSequence.push(currentRaga.samavadi);
    //if (r > 0.5) currentSequence.push(null);
  }

  // maybe schedule a tihai
  if (!fastRhythmEvent && random() < tihaiChance) {
    tihaiActive = true;
    currentTihaiPattern = random(tihaiPatterns);
    console.log("→ Tihai pattern:", currentTihaiPattern);
  }
}

function getRandomOctaveShift(baseNote) {
  // Returns an octave shift in semitones (-12, 0, or 12)
  // that won't push the note outside of C2 (36) to C6 (84).
  const MIN_NOTE = 36;
  const MAX_NOTE = 84;

  // Heavily weighted towards no shift.
  let opts = [0, -12, 12];
  let w = [0.8, 0.1, 0.1];
  let r = random(), cum = 0;

  if (baseNote === null || baseNote === undefined) return 0;

  for (let i = 0; i < opts.length; i++) {
    cum += w[i];
    if (r < cum) {
      const shift = opts[i];
      const shiftedNote = baseNote + shift;
      if (shiftedNote >= MIN_NOTE && shiftedNote <= MAX_NOTE) {
        return shift;
      }
      return 0; // Default to no shift if the random choice is out of bounds
    }
  }
  return 0;
}

// === PLAYBACK ===
function playBeat() {
  a += 1;
  updateBPM();
  updateEffects();

  if (!isPlaying) return;

  // choose the note for this subdivision
  let note, velocity = int(map(noise(a/10),0,1,50,127));
  let slotCount = currentTimeSignature.beats * currentTimeSignature.subdivision;
  let actualDur = beatDuration / currentTimeSignature.subdivision;

  // Jhala start?
  if (!isJhala && random() < jhalaProbability) {
    isJhala = true;
    jhalaCounter = 0;
    jhalaDurationBeats = int(random([4,16, 8])) * currentTimeSignature.subdivision;
    console.log("→ Jhala for", jhalaDurationBeats, "slots");
  }

  // decide note based on section
  if (isJhala) {
    // alternate steps in jhalaPattern
    let idx = currentBeat % currentSequence.length;
    let step = jhalaCounter % jhalaPattern.length;
    if (step === 0 && currentSequence[idx] != null) {
      note = currentSequence[idx];
    } else {
      let opts = currentSequence.filter(n=>n!=null && n!==currentSequence[idx]);
      note = opts.length? random(opts) : currentSequence[idx];
    }
    actualDur = beatDuration / (currentTimeSignature.subdivision * 2);
    jhalaCounter++;
    if (jhalaCounter >= jhalaDurationBeats) {
      isJhala = false;
      console.log("→ Jhala ended.");
    }

  } else if (fastRhythmEvent && fastRhythmCounter < currentFastRhythm.length*2) {
    // continue fast rhythm
    let idx = fastRhythmSubCounter % currentFastRhythm.pattern.length;
    let noteIdx = currentFastRhythm.pattern[idx];
    let offIdx = idx % currentFastRhythm.noteOffset.length;
    note = currentRaga.aaroh[(noteIdx + currentFastRhythm.noteOffset[offIdx]) % currentRaga.aaroh.length];
    actualDur = beatDuration / 2;
    fastRhythmSubCounter++;
    if (fastRhythmSubCounter % (currentTimeSignature.subdivision/2) === 0) {
      fastRhythmCounter++;
    }

  } else if (tihaiActive) {
    if (tihaiRepetition >= 3) {
      // Tihai has finished.
      console.log("→ Tihai ended, refreshing composition.");
      refreshComposition();
      note = currentSequence[0];
      tihaiActive = false;
      currentBeat = 0;
      barCounter = 0;
      barsSinceChord = 0;
    } else {
      // Tihai is in progress.
      note = currentRaga.aaroh[currentTihaiPattern[tihaiCounter]];
      tihaiCounter++;

      if (tihaiCounter >= currentTihaiPattern.length) {
        tihaiCounter = 0;
        tihaiRepetition++;
      }
    }
  } else {
    // default sequence
    if (currentSequence.length > 0) {
      note = currentSequence[currentBeat % currentSequence.length];
    }
  }

  currentPlayingNote = note;

  // send the note
  if (note != null) {
    const noteName = midiNoteToName(note);
    const durationMs = (actualDur / 4);
    const duration = durationMs / 1000;
    const normalizedVelocity = velocity / 127;

    lightUpNote(note, durationMs);

    // Always play cello for the melodic line
    chordSampler.triggerAttackRelease(noteName, "1n", undefined, normalizedVelocity);

    if (fastRhythmEvent) {
      kotoSampler.triggerAttackRelease(noteName, duration, undefined, normalizedVelocity);
    } else {
      melodySampler.triggerAttackRelease(noteName, duration, undefined, normalizedVelocity);
      if (!isJhala) {
        stringSampler.triggerAttackRelease(noteName, duration, undefined, normalizedVelocity);
      }
    }
  }

  // ——— BAR & CHORD LOGIC ———
  currentBeat++;
  if (currentBeat >= slotCount) {
    // bar rollover
    currentBeat = 0;
    barCounter++;
    barsSinceChord++;
    //console.log(`↻ Bar #${barCounter} (since chord: ${barsSinceChord}/${nextChordInterval})`);

    // chord time?
    if (barsSinceChord >= nextChordInterval) {
      // pick root: first note of seq or fallback to vadi
      let root = currentSequence[0] != null ? currentSequence[0] : currentRaga.vadi;
      console.log("▶ Triggering chord at bar", barCounter,
                  "root:", midiNoteToName(root));
      playChord(root, velocity);
      barsSinceChord = 0;
      chooseNextChordInterval();
    }

    // refresh melody?
    if (barCounter >= barsUntilRefresh) {
      barCounter = 0;
      refreshComposition();
    }
    // maybe shift meter
    if (random() > 0.8) updateTimeSignature();
  }
}

// === HELPERS ===
function midiNoteToName(num) {
  const names = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
  let octave = Math.floor(num/12)-1;
  return names[num%12] + octave;
}

function midiToHindi(num) {
  if (num === null) return "";

  // This map translates MIDI pitch class to the character expected by the Omenad font.
  const noteChars = {
    0: 's', 1: 'R', 2: 'r', 3: 'G', 4: 'g', 5: 'm', 6: 'M', 7: 'p', 8: 'D', 9: 'd', 10: 'N', 11: 'n'
  };

  const pitchClass = num % 12;
  let noteName = noteChars[pitchClass];
  if (noteName === undefined) return "?"; // Should not happen

  return noteName;
}

function updateTimeSignature() {
  currentTimeSignature = random(timeSignatures);
  setDynamicInterval();
}

function playChord(rootNote, velocity) {
  let chord = generateChord(rootNote);
  const chordNoteNames = chord.map(midiNoteToName);
  const durationMs = (beatDuration / (2 * currentTimeSignature.subdivision));
  const duration = durationMs / 1000;
  const normalizedVelocity = velocity / 127;
  
  chord.forEach(note => {
      lightUpNote(note, durationMs);
  });

  melodySampler.triggerAttackRelease(chordNoteNames, "1n", undefined, normalizedVelocity);
}

function generateChord(rootNote) {
  // Force chords to be based in a lower octave (e.g., C3) to avoid being too high.
  // The original `base` could be high if the rootNote was high.
  let base = 48; // MIDI for C3
  // If the rootNote is very low, we can start from C2.
  if (rootNote < 48) base = 36; // MIDI for C2

  let candidates = currentRaga.aaroh.map(n=>base+(n%12))
                       .filter(n=>n>=36 && n<=84);
  let chord = [];
  if (candidates.length >= 3) {
    let count = random([2,3,5]);
    while (chord.length < count && candidates.length) {
      let i = floor(random(candidates.length));
      chord.push(candidates.splice(i,1)[0]);
    }
  } else if (candidates.length) {
    chord.push(candidates[0]);
  }
  return chord.sort((a,b)=>a-b);
}

function generateRagaPalette() {
  if (!currentRaga) return;

  const scheme = currentRaga.colorScheme;
  // Define the order of colors for the gradient
  const clr1 = [
    color(scheme.background),
    color(scheme.secondary),
    color(scheme.primary),
    color(scheme.accent),
    color(scheme.text),
  ];
  
  const baseColors = clr1.filter(c => c instanceof p5.Color);
  let clr1Len = baseColors.length;
  if (clr1Len < 2) {
      currentColorPalette = baseColors;
      return;
  }

  currentColorPalette = [];
  let colorIndex = 0;
  let transitions = clr1Len - 1;

  for (let i = 0; i < transitions; i++) {
    let _c1 = baseColors[i];
    let _c2 = baseColors[i+1];
    // Calculate how many steps for this segment
    let steps = (i === transitions - 1) ? PALETTE_SIZE - colorIndex : Math.floor(PALETTE_SIZE / transitions);
    
    for (let j = 0; j < steps; j++) {
      if (colorIndex >= PALETTE_SIZE) break;
      let amt = j / (steps - 1);
      currentColorPalette[colorIndex] = lerpColor(_c1, _c2, amt);
      colorIndex++;
    }
  }
  
  // Ensure the palette is full
  while (currentColorPalette.length < PALETTE_SIZE) {
    currentColorPalette.push(baseColors[clr1Len-1]);
  }
}

function refreshComposition() {
  console.log("↻ Refreshing sequence…");
  generateSequence();
  barsUntilRefresh = int(random([4,8,16]));
}


// === VISUALS ===

const defaultColorScheme = {
    background: '#000000',
    primary: '#36454F',
    secondary: '#E6E6FA',
    accent: '#6A5ACD',
    text: '#F8F8FF'
};

function createGrid() {
    grid = [];
    noteCells = {};
    if (!currentRaga) return;

    // Collect all possible notes from the raga definition
    const allNotes = [
        ...currentRaga.aaroh,
        ...currentRaga.avroh,
        ...currentRaga.pakad.flat(),
        currentRaga.vadi,
        currentRaga.samavadi
    ].filter(note => note !== null && note !== undefined);

    if (allNotes.length === 0) {
        console.warn("No scale notes found for raga:", currentRaga.name);
        return;
    }
    
    // Use only unique pitch classes, mapped to a single octave for visualization
    const pitchClasses = [...new Set(allNotes.map(n => n % 12))];
    const visualNotes = pitchClasses.map(pc => 60 + pc); // Map to middle octave (C4=60)

    // --- Grid Layout Calculation with Scaling ---
    const textScale = 0.75; // Scale the grid to 90% of the screen
    const gridWidth = width * textScale;
    const gridHeight = height * textScale;
    
    const initialXOffset = (width - gridWidth) / 2;
    const initialYOffset = (height - gridHeight) / 2;

    // Dynamically calculate columns and rows based on scaled dimensions
    gridCols = window.innerWidth > 768 ? 12 : 6;
    cellSize = gridWidth / gridCols;
    const rows = floor(gridHeight / cellSize);
    
    // Center the final grid vertically within the scaled area
    const finalGridHeight = rows * cellSize;
    const finalYOffset = initialYOffset + (gridHeight - finalGridHeight) / 2;


    for (let y = 0; y < rows; y++) {
        let row = [];
        for (let x = 0; x < gridCols; x++) {
            // Select a random note from the single-octave visual set
            const noteIndex = floor(random(visualNotes.length));
            const midiNote = visualNotes[noteIndex];
            
            const cell = {
                x: initialXOffset + x * cellSize + cellSize / 2,
                y: finalYOffset + y * cellSize + cellSize / 2,
                midiNote: midiNote,
                litAmount: 0, // for smooth blinking (0 to 1)
            };
            row.push(cell);
            
            // Map pitch class to the cell for octave-independent lighting
            const pitchClass = midiNote % 12;
            if (!noteCells[pitchClass]) {
                noteCells[pitchClass] = [];
            }
            noteCells[pitchClass].push(cell);
        }
        grid.push(row);
    }
    console.log(`Created grid (${gridCols}x${rows}) for raga`, currentRaga.name);
}

function drawGrid() {
    if (!currentRaga || grid.length === 0) return;

    // Clear the text canvas before drawing
    textCanvas.clear();

    // Draw the sheen grid on the text canvas, underneath the notes
    drawSheenGrid();
    
    const scheme = currentRaga.colorScheme;
    const accentColor = color(scheme.accent);
    const textColor = color(255); // Use white for notes

    textCanvas.textAlign(CENTER, CENTER);

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            const cell = grid[y][x];
            const hindiText = midiToHindi(cell.midiNote);
            
            // Fade out the lit amount
            if (cell.litAmount > 0) {
                cell.litAmount = max(0, cell.litAmount - 0.1); 
            }

            // Apply glow effect via shadow
            if (cell.litAmount > 0) {
                const glowColor = color(accentColor);
                glowColor.setAlpha(cell.litAmount * 150);
                textCanvas.drawingContext.shadowBlur = 20 * cell.litAmount;
                textCanvas.drawingContext.shadowColor = glowColor;
            }

            // Draw the note text
            // Text size grows and alpha increases when lit
            const baseSize = cellSize * noise(cell.x/100, cell.y/100, shaderTime/100.0);
            const size = baseSize + (baseSize * noise(cell.x/100, cell.y/100, shaderTime/100.0) * cell.litAmount);
            textColor.setAlpha(map(cell.litAmount, 0, 1, 150, 255));
            textCanvas.fill(textColor);
            textCanvas.noStroke();
            textCanvas.textSize(size);
            textCanvas.text(hindiText, cell.x, cell.y-size/2);

            // Reset shadow for the next cell to avoid affecting other elements.
            textCanvas.drawingContext.shadowBlur = 0;
        }
    }
}

function getSuggestionsForCurrentTime() {
    if (!ragaData || !ragaData.raga_suggestions) {
        console.error("Raga data not loaded or is invalid.");
        return null;
    }

    const currentHour = new Date().getHours();

    for (const slot of ragaData.raga_suggestions) {
        const timeParts = slot.time_slot.split('-').map(s => s.trim());
        const startTimeString = timeParts[0];
        const endTimeString = timeParts[1];

        let startTime = parseInt(startTimeString.split(':')[0]);
        if (startTimeString.toLowerCase().includes('pm') && startTime !== 12) {
            startTime += 12;
        }
        if (startTimeString.toLowerCase().includes('am') && startTime === 12) { // 12 AM is hour 0
            startTime = 0;
        }

        let endTime = parseInt(endTimeString.split(':')[0]);
        if (endTimeString.toLowerCase().includes('pm') && endTime !== 12) {
            endTime += 12;
        }
        if (endTimeString.toLowerCase().includes('am') && endTime === 12) {
             // To handle slots ending at midnight, we treat it as the 24th hour of the day
            endTime = 24;
        }
        
        // Handle overnight slots (e.g., "10:00 PM - 04:00 AM")
        if (endTime <= startTime) { 
            // If current time is past start time OR before end time, it's a match
            if (currentHour >= startTime || currentHour < endTime) {
                return slot;
            }
        } else {
             // Normal daytime slot (e.g., "06:00 AM - 10:00 AM")
            if (currentHour >= startTime && currentHour < endTime) {
                return slot;
            }
        }
    }

    return null; // Return null if no matching slot is found
}

function lightUpNote(noteNumber, durationMs) {
    if (noteNumber === null) return;

    // Using pitch class to light up all octaves of a note
    const pitchClass = noteNumber % 12;
    
    if (noteCells[pitchClass]) {
        const cellsToLight = noteCells[pitchClass];
        cellsToLight.forEach(cell => {
            cell.litAmount = 1.0; // Start blink at full intensity
        });
    }
}

function selectRaga(ragaName) {
  if (allRagas[ragaName] && (!currentRaga || currentRaga.name !== ragaName)) {
    // This function can be repurposed for manual selection later if needed.
    // For now, startExperience handles the initial selection.
    startExperience(ragaName);
  }
}

function populateWelcomeScreen() {
    const timeSlot = getSuggestionsForCurrentTime();
    const container = select('#raga-suggestions');
    const welcomeTitle = select('.welcome-container h1');
    const welcomeSubtitle = select('.welcome-subtitle');

    if (!timeSlot || timeSlot.moods.length === 0) {
        welcomeTitle.html('Welcome');
        welcomeSubtitle.html('Could not find specific Raga suggestions for the current time. Please enjoy a default selection.');
        // Maybe start with a default raga like Bhairav automatically
        startExperience('Bhairav'); 
        return;
    }

    welcomeSubtitle.html(`Based on the time of day (${timeSlot.time_slot}), here are some suggested Ragas for you.`);

    let content = '';
    timeSlot.moods.forEach(mood => {
        content += `<div class="mood-section">`;
        content += `<h2 class="mood-title" style="color: ${mood.color_scheme.accent}">${mood.name}</h2>`;
        content += `<div class="raga-cards-container">`;
        mood.ragas.forEach(raga => {
            content += `
                <div class="raga-card" data-raga-name="${raga.name}">
                    <h3>${raga.name}</h3>
                    <p>${raga.description}</p>
                </div>
            `;
        });
        content += `</div></div>`;
    });
    container.html(content);

    // Add event listeners to the newly created cards.
    // We must access the underlying DOM element (.elt) for addEventListener to work.
    selectAll('.raga-card').forEach(card => {
        card.elt.addEventListener('click', () => startExperience(card.elt.getAttribute('data-raga-name')));
    });
}

function applyColorScheme(scheme) {
    const root = document.documentElement;
    root.style.setProperty('--background-color', scheme.background);
    root.style.setProperty('--primary-color', scheme.primary);
    root.style.setProperty('--secondary-color', scheme.secondary);
    root.style.setProperty('--accent-color', scheme.accent);
    root.style.setProperty('--text-color', scheme.text);
}

function startExperience(ragaName) {
    if (!allRagas[ragaName]) {
        console.error("Selected raga not found:", ragaName);
        // Fallback to the very first raga if the provided one is invalid
        const firstName = Object.keys(allRagas)[0];
        if (!firstName) {
            console.error("No ragas available at all.");
            return;
        }
        currentRaga = allRagas[firstName];
    } else {
        currentRaga = allRagas[ragaName];
    }
    
    console.log("▶ Starting Raga:", currentRaga.name);

    applyColorScheme(currentRaga.colorScheme);
    applyUIColor(color(255)); // Use white for UI elements
    select('#raga-name').html(currentRaga.name);
    
    // Generate the color palette for the selected raga
    generateRagaPalette();

    // Initial setup for the selected raga
    updateBPM();
    generateSequence();
    chooseNextChordInterval();
    createGrid();
    
    // Hide welcome screen and show the controls
    select('#welcome-screen').addClass('hidden');
    select('.top-bar').removeClass('hidden');
    select('.controls-container').removeClass('hidden');
    select('#cast-button-container').removeClass('hidden');
    document.body.classList.add('experience-view');

    // Start playback
    if (!isPlaying) {
        togglePlayback();
    }
}

function goToWelcomeScreen() {
    if (isPlaying) {
        togglePlayback(); // This will stop the music and release notes
    }

    // Reset state
    currentRaga = null;
    grid = [];
    noteCells = {};
    
    // Clear the canvas
    clear();
    background(0); // Set a neutral background

    // Restore default color scheme
    applyColorScheme(defaultColorScheme);

    // Show welcome screen and hide the main interface
    select('#welcome-screen').removeClass('hidden');
    select('.top-bar').addClass('hidden');
    select('.controls-container').addClass('hidden');
    select('#cast-button-container').addClass('hidden');
    select('#back-button').addClass('hidden');
    select('#raga-name').html('raga.fm'); // Reset title
    document.body.classList.remove('experience-view');
    applyUIColor(null); // Revert to default
}

function applyUIColor(colorObj) {
    const ragaName = document.getElementById('raga-name');
    const appLogo = document.getElementById('app-logo');
    const backButton = document.getElementById('back-button');
    const intensityLabel = document.querySelector('.control-group label');
    const sliderTooltip = document.getElementById('slider-tooltip');
    const startStopButton = document.getElementById('start-stop-button');

    const targetColorStr = colorObj ? colorObj.toString('#rrggbb') : '#ffffff';
    const contrastColor = (colorObj && (colorObj.levels[0] * 0.299 + colorObj.levels[1] * 0.587 + colorObj.levels[2] * 0.114) > 128) ? '#000000' : '#ffffff';

    if (ragaName) ragaName.style.color = targetColorStr;
    if (appLogo) appLogo.style.backgroundColor = targetColorStr;
    if (backButton) {
        backButton.style.color = targetColorStr;
        backButton.style.borderColor = targetColorStr;
    }
    if (intensityLabel) intensityLabel.style.color = targetColorStr;
    
    if (sliderTooltip) {
        sliderTooltip.style.background = targetColorStr;
        sliderTooltip.style.color = contrastColor;
    }

    if (startStopButton) {
        startStopButton.style.borderColor = targetColorStr;
        startStopButton.querySelector('.icon-play').style.borderLeftColor = targetColorStr;
        const pauseIcon = startStopButton.querySelector('.icon-pause');
        if (pauseIcon) {
            pauseIcon.style.borderLeftColor = targetColorStr;
            pauseIcon.style.borderRightColor = targetColorStr;
        }
    }
}

function updateSliderTooltip(value) {
    const slider = document.getElementById('intensity-slider');
    const tooltip = document.getElementById('slider-tooltip');
    if (!slider || !tooltip) return;

    // Use provided value or the slider's current value
    const currentValue = value !== undefined ? value : parseFloat(slider.value);
    
    const min = parseFloat(slider.min);
    const max = parseFloat(slider.max);
    const percent = (currentValue - min) / (max - min);
    
    // Calculate the position of the thumb
    const thumbWidth = 22; // Must match the CSS width for the tooltip
    const thumbPosition = percent * (slider.offsetWidth - thumbWidth) + (thumbWidth / 2);
    
    tooltip.style.left = `${thumbPosition}px`;

    // Update text based on the *snapped* version of the value
    const closestStep = Math.round(currentValue);
    const labels = ['1', '2', '3', 'V'];
    tooltip.innerHTML = labels[closestStep] || closestStep;
}
