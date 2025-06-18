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
    "A5": "samples/Strings1/a5_Pick1.flac",
    "A#5": "samples/Strings1/as5_Pick1.flac",
    "B5": "samples/Strings1/b5_Pick1.flac",
};

let kotoSampler, stringSampler;
let reverb, delay, lowPassFilter;
let meter;
let currentAmplitude = 0;

// === RAGA DATA ===
let ragaData;
const allRagas = {};
let currentRaga; // Will be set after data is loaded and a selection is made.

// === VISUALS ===
// Boid variables
let boids = [];
let minRadius = 10;
let maxRadius = 80;

// Color Palette
let currentColorPalette = [];
const PALETTE_SIZE = 256; // Number of colors to generate for the palette

// Hindi Note Letters
let currentPlayingNote = null;

class Boid {
  constructor(x, y, midiNote, boidColor) {
    this.position = createVector(x, y);
    this.velocity = createVector(); // Start with no velocity
    this.acceleration = createVector();
    this.maxForce = 0.2;
    this.baseMaxSpeed = 4; // Keep the original max speed
    this.maxSpeed = 0; // Start with 0 speed, will be updated dynamically
    this.r = random(minRadius, maxRadius);
    this.midiNote = midiNote;
    this.color = boidColor;
    this.lit = false;
    this.timeoutId = null;
  }

  edges() {
    let margin = this.r * 2;
    if (this.position.x > width + margin) {
      this.position.x = -margin;
    } else if (this.position.x < -margin) {
      this.position.x = width + margin;
    }
    if (this.position.y > height + margin) {
      this.position.y = -margin;
    } else if (this.position.y < -margin) {
      this.position.y = height + margin;
    }
  }

  align(boids) {
    let perceptionRadius = 50;
    let steering = createVector();
    let total = 0;
    for (let other of boids) {
      let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
      if (other != this && d < perceptionRadius) {
        steering.add(other.velocity);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  cohesion(boids) {
    let perceptionRadius = 100;
    let steering = createVector();
    let total = 0;
    for (let other of boids) {
      let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
      if (other != this && d < perceptionRadius) {
        steering.add(other.position);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.sub(this.position);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  separation(boids) {
    let perceptionRadius = this.r * 2;
    let steering = createVector();
    let total = 0;
    for (let other of boids) {
      let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
      if (other != this && d > 0 && d < perceptionRadius) {
        let diff = p5.Vector.sub(this.position, other.position);
        diff.div(d * d); 
        steering.add(diff);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  flock(boids) {
    let alignment = this.align(boids);
    let cohesionForce = this.cohesion(boids);
    let separationForce = this.separation(boids);

    alignment.mult(1.0);
    cohesionForce.mult(1.0);
    separationForce.mult(1.5);

    this.acceleration.add(alignment);
    this.acceleration.add(cohesionForce);
    this.acceleration.add(separationForce);
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.mult(0);
  }

  show() {
    if (!currentRaga) return; // Don't draw if no raga/scheme is active

    const scheme = currentRaga.colorScheme;
    const hindiText = midiToHindi(this.midiNote);

    const bodyColor = this.color;
    const litColor = color(0);
    const textColor = color(scheme.background); // For contrast against the boid body
    const strokeColor = color(scheme.primary);

    if (this.lit) {
        fill(litColor);
        drawingContext.shadowBlur = 32;
        drawingContext.shadowColor = litColor;
    } else {
        if (bodyColor) {
          let c = color(bodyColor);
          c.setAlpha(200); // Make them slightly transparent
          fill(c);
        } else {
          // Fallback color
          let fallbackColor = color(scheme.text);
          fallbackColor.setAlpha(200);
          fill(fallbackColor);
        }
        drawingContext.shadowBlur = 0;
    }
    
    strokeColor.setAlpha(100);
    // stroke(strokeColor);
    stroke(0)
    strokeWeight(0.3);
    ellipse(this.position.x, this.position.y, this.r * 1.8 * noise(this.position.x / 100, this.position.y / 100));

    noStroke();
    drawingContext.shadowBlur = 0; // Reset shadow for text

    // fill(textColor);
    fill(255);
    textSize(this.r * 0.5);
    text(hindiText, this.position.x, this.position.y + this.r * 0.1);
  }
}

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
                const pakadPhrases = raga.pakad.split(',').map(phrase => parseSargamToMidi(phrase.trim()));

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
  kotoSampler = new Tone.Sampler(samplesMap, {
    release: 1,
    baseUrl: "./"
  }).chain(lowPassFilter, delay, reverb, Tone.Destination);

  stringSampler = new Tone.Sampler(stringSamplesMap, {
    release: 1,
    baseUrl: "./"
  }).chain(lowPassFilter, delay, reverb, Tone.Destination);

  // Set up the meter to measure the master output
  meter = new Tone.Meter();
  Tone.getDestination().connect(meter);
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
  createCanvas(windowWidth, windowHeight);
  textFont('ome_bhatkhande_hindi');

  const intensitySlider = select('#intensity-slider');
  intensitySlider.changed(() => {
    intensityLevel = intensitySlider.value();
    updateBPM();
  });

  // Using a standard event listener is more robust and avoids double-firing issues.
  const startStopButton = document.getElementById('start-stop-button');
  if (startStopButton) {
      startStopButton.addEventListener('click', togglePlayback);
  }

  const backButton = select('#back-button');
  backButton.mousePressed(goToWelcomeScreen);
  
  // The rest of the setup is now deferred until a raga is selected.
}

function draw() {
    if(currentRaga) {
        let bgColor = color(currentRaga.colorScheme.background);
        background(red(bgColor), green(bgColor), blue(bgColor), 1);
    } else {
        background(0, 1);
    }

    // Get the amplitude from the master output
    if (meter) {
        let level_dB = meter.getValue();
        // Map the decibel level to a linear amplitude (0-1) for speed control
        // -48 dB is a reasonable threshold for "quiet"
        currentAmplitude = map(level_dB, -48, 0, 0, 1, true);
    }

    textAlign(CENTER, CENTER);
    for (let boid of boids) {
        // Update boid's max speed based on the current sound amplitude
        boid.maxSpeed = boid.baseMaxSpeed * currentAmplitude;

        boid.edges();
        boid.flock(boids);
        boid.update();
        boid.show();
    }
    drawingContext.shadowBlur = 0; // Reset shadow for other elements
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
        if (kotoSampler) {
          kotoSampler.releaseAll();
        }
        if (stringSampler) {
          stringSampler.releaseAll();
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
        let phrase = random(currentRaga.pakad);
        currentSequence.push(...phrase);
    }

    //if (r > 0.8) currentSequence.push(...aaroh);
    //else if (random() > 0.8) currentSequence.push(...avroh);
    //if (r > 0.5) currentSequence.push(...random(pakad));

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
    note = currentSequence[currentBeat];
  }

  currentPlayingNote = note;

  // send the note
  if (note != null) {
    const noteName = midiNoteToName(note);
    const durationMs = (actualDur / 4);
    const duration = durationMs / 1000;
    const normalizedVelocity = velocity / 127;

    lightUpNote(note, durationMs);

    kotoSampler.triggerAttackRelease(noteName, duration, undefined, normalizedVelocity);
    if (!isJhala && !fastRhythmEvent) {
      stringSampler.triggerAttackRelease(noteName, duration, undefined, normalizedVelocity);
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

  // C4 (MIDI 60) is the base for the middle octave (Madhya Saptak), which has no suffix.
  const saptak = Math.floor(num / 12) - 5;

  let suffix = '';
  if (saptak === 1) {
    suffix = 'u'; // Taar (Upper)
  } else if (saptak > 1) {
    suffix = 'U'; // Ati Taar (Double Upper)
  } else if (saptak === -1) {
    suffix = 'l'; // Mandra (Lower)
  } else if (saptak < -1) {
    suffix = 'L'; // Ati Mandra (Double Lower) - assumed from font docs
  }

  return noteName + suffix;
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

  kotoSampler.triggerAttackRelease(chordNoteNames, duration, undefined, normalizedVelocity);
}

function generateChord(rootNote) {
  let base = Math.floor(rootNote/12)*12;
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
  // The boids don't need to be recreated on every refresh.
  // createBoids(); 
}


// === VISUALS ===

const defaultColorScheme = {
    background: '#000000',
    primary: '#36454F',
    secondary: '#E6E6FA',
    accent: '#6A5ACD',
    text: '#F8F8FF'
};

function createBoids() {
    boids = [];
    if (!currentRaga || currentColorPalette.length === 0) return;

    const scaleNotes = [...new Set([...currentRaga.aaroh, ...currentRaga.avroh])].sort((a,b) => a - b);
    
    const noteToColor = {};
    scaleNotes.forEach((note, index) => {
        const pitchClass = note % 12;
        // Use pitch class to ensure notes in different octaves have the same base color
        if (noteToColor[pitchClass] === undefined) {
            const colorIndex = floor(map(index, 0, scaleNotes.length, 0, PALETTE_SIZE - 1));
            noteToColor[pitchClass] = currentColorPalette[colorIndex];
        }
    });

    const numBoids = scaleNotes.length > 0 ? scaleNotes.length * 4 : 40;

    for (let i = 0; i < numBoids; i++) {
        let x = random(width);
        let y = random(height);
        let midiNote = scaleNotes[i % scaleNotes.length];
        let boidColor = noteToColor[midiNote % 12];
        boids.push(new Boid(x, y, midiNote, boidColor));
    }
    console.log("Created", boids.length, "boids for raga", currentRaga.name);
    // Start playback
    if (!isPlaying) {
        togglePlayback();
    }
    // Show the back button
    select('#back-button').removeClass('hidden');
}

function getSuggestionsForCurrentTime() {
    if (!ragaData || !ragaData.raga_suggestions) {
        console.error("Raga data not loaded or is invalid.");
        return [];
    }

    const currentHour = new Date().getHours();

    for (const slot of ragaData.raga_suggestions) {
        const timeParts = slot.time_slot.split('-');
        const startTime = parseInt(timeParts[0].split(':')[0]);
        let endTimeString = timeParts[1].trim();
        let endTime = parseInt(endTimeString.split(':')[0]);

        if (endTimeString.toLowerCase().includes('pm') && endTime !== 12) {
            endTime += 12;
        }
        if (endTimeString.toLowerCase().includes('am') && endTime === 12) { // 12 AM is hour 0
            endTime = 24; // Use 24 to represent end of day for comparison
        }
        
        // Handle overnight slots like "10:00 PM - 04:00 AM"
        if (endTime < startTime) { // Overnight case
             // e.g. 22:00-04:00. Current hour must be >= 22 or < 4
            if (currentHour >= startTime || currentHour < endTime) {
                return slot;
            }
        } else {
             // Normal daytime slot e.g. 06:00-10:00
            if (currentHour >= startTime && currentHour < endTime) {
                return slot;
            }
        }
    }

    return null; // Return null if no matching slot is found
}

function lightUpNote(noteNumber, durationMs) {
    if (noteNumber === null) return;

    const blinkDuration = Math.max(durationMs, 120);

    for (let boid of boids) {
        // Compare the pitch class (note % 12) to make it octave-independent for lighting up
        if ((boid.midiNote % 12) === (noteNumber % 12)) {
            if (boid.timeoutId) {
                clearTimeout(boid.timeoutId);
            }
            boid.lit = true;

            const timeoutId = setTimeout(() => {
                boid.lit = false;
                boid.timeoutId = null;
            }, blinkDuration);
            boid.timeoutId = timeoutId;
        }
    }
}

function turnOffNote(noteNumber) {
    if (noteNumber === null) return;
    for (let boid of boids) {
        if ((boid.midiNote % 12) === (noteNumber % 12)) {
            boid.lit = false;
        }
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
    select('#raga-name').html(currentRaga.name);
    
    // Generate the color palette for the selected raga
    generateRagaPalette();

    // Initial setup for the selected raga
    updateBPM();
    generateSequence();
    chooseNextChordInterval();
    createBoids();
    
    // Hide welcome screen. This uses the p5.js .addClass() method.
    select('#welcome-screen').addClass('hidden');

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
    boids = [];
    
    // Clear the canvas
    clear();
    background(0); // Set a neutral background

    // Restore default color scheme
    applyColorScheme(defaultColorScheme);

    // Show welcome screen and hide the back button
    select('#welcome-screen').removeClass('hidden');
    select('#back-button').addClass('hidden');
    select('#raga-name').html('Koto Sampler'); // Reset title
}
