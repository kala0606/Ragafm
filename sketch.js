const samplesMap = {
    "D3": "samples/Sustain/Front_D3_Sustain2.flac",
    "Ds3": "samples/Sustain/Front_Ds3_Sustain2.flac",
    "E3": "samples/Sustain/Front_E3_Sustain2.flac",
    "F3": "samples/Sustain/Front_F3_Sustain2.flac",
    "Fs3": "samples/Sustain/Front_Fs3_Sustain2.flac",
    "G3": "samples/Sustain/Front_G3_Sustain2.flac",
    "Gs3": "samples/Sustain/Front_Gs3_Sustain2.flac",
    "A3": "samples/Sustain/Front_A3_Sustain2.flac",
    "As3": "samples/Sustain/Front_As3_Sustain2.flac",
    "B3": "samples/Sustain/Front_B3_Sustain2.flac",
    "C4": "samples/Sustain/Front_C4_Sustain2.flac",
    "Cs4": "samples/Sustain/Front_Cs4_Sustain2.flac",
    "D4": "samples/Sustain/Front_D4_Sustain2.flac",
    "Ds4": "samples/Sustain/Front_Ds4_Sustain2.flac",
    "E4": "samples/Sustain/Front_E4_Sustain2.flac",
    "F4": "samples/Sustain/Front_F4_Sustain2.flac",
    "Fs4": "samples/Sustain/Front_Fs4_Sustain2.flac",
    "G4": "samples/Sustain/Front_G4_Sustain2.flac",
    "Gs4": "samples/Sustain/Front_Gs4_Sustain2.flac",
    "A4": "samples/Sustain/Front_A4_Sustain2.flac",
    "As4": "samples/Sustain/Front_As4_Sustain2.flac",
    "B4": "samples/Sustain/Front_B4_Sustain2.flac",
    "C5": "samples/Sustain/Front_C5_Sustain2.flac",
    "Cs5": "samples/Sustain/Front_Cs5_Sustain2.flac",
    "D5": "samples/Sustain/Front_D5_Sustain2.flac",
    "Ds5": "samples/Sustain/Front_Ds5_Sustain2.flac",
    "E5": "samples/Sustain/Front_E5_Sustain2.flac",
    "F5": "samples/Sustain/Front_F5_Sustain2.flac",
    "Fs5": "samples/Sustain/Front_Fs5_Sustain2.flac",
    "G5": "samples/Sustain/Front_G5_Sustain2.flac",
    "Gs5": "samples/Sustain/Front_Gs5_Sustain2.flac",
    "A5": "samples/Sustain/Front_A5_Sustain2.flac",
    "As5": "samples/Sustain/Front_As5_Sustain2.flac",
    "B5": "samples/Sustain/Front_B5_Sustain2.flac",
    "C6": "samples/Sustain/Front_C6_Sustain2.flac"
};

const stringSamplesMap = {
    "Fs3": "samples/Strings1/fs3_Pick1.flac",
    "G3": "samples/Strings1/g3_Pick1.flac",
    "Gs3": "samples/Strings1/gs3_Pick1.flac",
    "A3": "samples/Strings1/a3_Pick1.flac",
    "As3": "samples/Strings1/as3_Pick1.flac",
    "B3": "samples/Strings1/b3_Pick1.flac",
    "C4": "samples/Strings1/c4_Pick1.flac",
    "Cs4": "samples/Strings1/cs4_Pick1.flac",
    "D4": "samples/Strings1/d4_Pick1.flac",
    "Ds4": "samples/Strings1/ds4_Pick1.flac",
    "E4": "samples/Strings1/e4_Pick1.flac",
    "F4": "samples/Strings1/f4_Pick1.flac",
    "Fs4": "samples/Strings1/fs4_Pick1.flac",
    "G4": "samples/Strings1/g4_Pick1.flac",
    "Gs4": "samples/Strings1/gs4_Pick1.flac",
    "A4": "samples/Strings1/a4_Pick1.flac",
    "As4": "samples/Strings1/as4_Pick1.flac",
    "B4": "samples/Strings1/b4_Pick1.flac",
    "C5": "samples/Strings1/c5_Pick1.flac",
    "Cs5": "samples/Strings1/cs5_Pick1.flac",
    "D5": "samples/Strings1/d5_Pick1.flac",
    "Ds5": "samples/Strings1/ds5_Pick1.flac",
    "E5": "samples/Strings1/e5_Pick1.flac",
    "F5": "samples/Strings1/f5_Pick1.flac",
    "Fs5": "samples/Strings1/fs5_Pick1.flac",
    "G5": "samples/Strings1/g5_Pick1.flac",
    "Gs5": "samples/Strings1/gs5_Pick1.flac",
    "A5": "samples/Strings1/a5_Pick1.flac",
    "As5": "samples/Strings1/as5_Pick1.flac",
    "B5": "samples/Strings1/b5_Pick1.flac",
};

let kotoSampler, stringSampler;
let reverb, delay;

// === CASTING ===
let presentation;
let connection;
let presentationRequest;
let isReceiver = false;
let castButton;

// === RAGA DATA ===
let bhairavButton, deshButton;
const ragas = {
  'Bhairav': {
    name: 'Bhairav',
    aaroh: [60, 61, 64, 65, 67, 68, 71, 72], // Sa Re♭ Ga Ma Pa Dha♭ Ni Sa'
    avroh: [72, 71, 68, 67, 65, 64, 61, 60], // Sa' Ni Dha♭ Pa Ma Ga Re♭ Sa
    pakad: [
      [64, 65, 68, 68, 67], // Ga Ma Dha Dha Pa
      [64, 65, 61, 61, 60], // Ga Ma Re♭ Re♭ Sa
    ],
    vadi: 68, // Dha♭
    samavadi: 61, // Re♭
  },
  'Desh': {
    name: 'Desh',
    // Arohana: Ni Sa Re, Ma Pa Ni, Sa
    // Avarohana: Sa ni Dha, Pa Dha Ma Ga Re, Pa Ma Ga, Re Ga Ni Sa
    // Pakad: Re, Ma Pa Ni, Sa Re ni Dha Pa, ma Ga Re
    aaroh: [60, 62, 65, 67, 71, 72], // Sa Re Ma Pa Ni Sa'
    avroh: [72, 70, 69, 67, 65, 64, 62, 60], // S' n D P M G R S
    pakad: [
      [59, 60, 62], // Ni Sa Re
      [65, 67, 71], // Ma Pa Ni
      [72, 70, 69], // Sa' ni Dha
      [67, 69, 65, 64, 62], // Pa Dha Ma Ga Re
      [67, 65, 64], // Pa Ma Ga
      [62, 64, 71, 60], // Re Ga Ni Sa
      [62], // Re
      [60, 62, 70, 69, 67], // Sa Re ni Dha Pa
      [65, 64, 62] // ma Ga Re
    ],
    vadi: 62, // Re
    samavadi: 67, // Pa
  }
};
let currentRaga = ragas.Bhairav; // Default raga

// === VISUALS ===
// Circle Packing Variables
let circles = [];
let minRadius = 10;
let maxRadius = 80;
let packingAttempts = 500;
let packed = false;

// Hindi Note Letters
const hindiNotes = ["सा", "रे", "ग", "म", "प", "ध", "नि"];
let noteElements = []; // Array to hold the Hindi letter elements
let currentPlayingNote = null;

function preload() {
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

  // Set up the audio chain: Sampler -> Delay -> Reverb -> Master Output
  kotoSampler = new Tone.Sampler(samplesMap, {
    release: 1,
    baseUrl: "./"
  }).chain(delay, reverb, Tone.Destination);

  stringSampler = new Tone.Sampler(stringSamplesMap, {
    release: 1,
    baseUrl: "./"
  }).chain(delay, reverb, Tone.Destination);
}

// === GLOBALS ===
// playback control
let isPlaying = false;

// Tempo & timing
let bpm = 120;             // beats per minute
let beatDuration;          // ms per beat (60000/bpm)
let dynamicInterval;       // setInterval reference
let a = 0;                 // Perlin‑noise seed for tempo variation

// Time signature
let currentTimeSignature = { beats: 4, subdivision: 4 };
let currentBeat = 0;       // counts subdivisions since last bar

// Raga Bhairav definitions (MIDI note numbers)
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

// === CASTING ===
function initializeCasting() {
  console.log("Initializing casting...");
  if (!navigator.presentation) {
    console.warn("Presentation API is not available. Cast button will not be shown.");
    return;
  }
  console.log("Presentation API is available.");

  presentationRequest = new PresentationRequest(['receiver.html']);
  castButton = createButton('Cast');
  const castContainer = select('#cast-button-container');
  if (castContainer) {
      castButton.parent(castContainer);
  } else {
      // Fallback positioning if the container isn't found
      castButton.position(width - 80, 20);
  }
  castButton.hide();

  navigator.presentation.defaultRequest = presentationRequest;

  presentationRequest.getAvailability()
    .then(availability => {
      console.log('Casting availability:', availability);
      console.log('Available? ' + availability.value);
      if (availability.value) {
        console.log("Cast button should be visible now.");
        castButton.show();
      } else {
        console.log("No casting devices found. Button remains hidden.");
      }
      availability.onchange = function(event) {
        console.log('Casting availability changed:', event);
        if (event.value) {
          castButton.show();
        } else {
          castButton.hide();
        }
      };
    })
    .catch(error => {
      console.error('Error getting presentation availability:', error);
      console.log('Presentation availability not supported');
    });

  castButton.mousePressed(function() {
    if (connection) {
      connection.close();
      connection = null;
    } else {
      presentationRequest.start()
        .then(p => {
          presentation = p;
          connection = p;
          console.log('Presentation started');
          handleConnection(p);
        })
        .catch(error => {
          console.error('Error starting presentation', error);
        });
    }
  });
}

function handleConnection(conn) {
  conn.onmessage = function(event) {
    const message = JSON.parse(event.data);
    if (message.type === 'play_state') {
      isPlaying = message.isPlaying;
      if (isReceiver) {
        if (isPlaying) {
            setDynamicInterval();
            console.log("Playback started/resumed on receiver");
        } else {
            clearInterval(dynamicInterval);
            if (kotoSampler) {
              kotoSampler.releaseAll();
            }
            if (stringSampler) {
              stringSampler.releaseAll();
            }
            console.log("Playback stopped on receiver");
        }
      }
    }
  };
  conn.onclose = function(event) {
    console.log('Connection closed.');
    connection = null;
  };
  conn.onterminate = function() {
    console.log('Presentation terminated.');
    connection = null;
  };
}

// === SETUP ===
function setup() {
  if (navigator.presentation && navigator.presentation.receiver) {
    isReceiver = true;
    navigator.presentation.receiver.connectionList.then(list => {
      list.connections.map(c => {
        connection = c;
        handleConnection(c);
      });
      list.onconnectionavailable = function(event) {
        connection = event.connection;
        handleConnection(event.connection);
      };
    });
  } else {
    initializeCasting();
  }

  createCanvas(windowWidth, windowHeight);

  const ragaSelector = select('#raga-selector');
  Object.keys(ragas).forEach(ragaName => {
    ragaSelector.option(ragaName);
  });
  ragaSelector.changed(() => {
    selectRaga(ragaSelector.value());
  });

  const startStopButton = select('#start-stop-button');
  startStopButton.mousePressed(togglePlayback);
  
  console.log("▶ Starting Raga Bhairav…");

  updateBPM();
  generateSequence();
  chooseNextChordInterval();
  packCircles(); // Initial circle packing
}

function draw() {
    translate(width/2, height/2);
    scale(0.9);
    translate(-width/2, -height/2)
    background(10);

    if (isReceiver && !connection) {
        // A bit of a hack to show text on WEBGL canvas, but works for this simple case.
        // We'd need to use a separate 2D graphics buffer for more complex overlays.
        let g = createGraphics(width, height);
        g.background(0);
        g.fill(255);
        g.textAlign(CENTER, CENTER);
        g.textSize(24);
        g.text("Waiting for sender...", width / 2, height / 2);
        image(g, 0, 0); // Use image() for 2D context
        g.remove();
        return;
    }

    if (packed) {
        textAlign(CENTER, CENTER);
        for (let i = 0; i < circles.length; i++) {
            const circle = circles[i];
            const noteElement = noteElements.find(el => el.circleIndex === i);
            const hindiText = hindiNotes[circle.noteIndex % hindiNotes.length];

            if (noteElement && noteElement.lit) {
                fill(255, 255, 255, 220); // Lit color
                drawingContext.shadowBlur = 32;
                drawingContext.shadowColor = color(255, 255, 255);

            } else {
                fill(50, 50, 50, 200); // Unlit color
                drawingContext.shadowBlur = 0;
            }
            noStroke();
            ellipse(circle.x, circle.y, circle.r * 1.8);

            if (noteElement && noteElement.lit) {
                fill(0);
            } else {
                fill(180);
            }
            textSize(circle.r * 0.9);
            text(hindiText, circle.x, circle.y);
        }
        drawingContext.shadowBlur = 0; // Reset shadow for other elements
    } else {
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(24);
        text("Packing Circles...", width / 2, height / 2);
    }
}

function mousePressed() {
  // Only toggle playback if the click is on the canvas itself, not on the UI elements.
  const controls = document.querySelector('.controls-container');
  const title = document.querySelector('.title-container');
  const cast = document.querySelector('#cast-button-container');
  
  if (controls && controls.contains(event.target)) return;
  if (title && title.contains(event.target)) return;
  if (cast && cast.contains(event.target)) return;

  togglePlayback();
}

function togglePlayback() {
  if (isReceiver) return;

  Tone.start();

  isPlaying = !isPlaying;

  const startStopButton = select('#start-stop-button');
  if (isPlaying) {
      startStopButton.addClass('playing');
  } else {
      startStopButton.removeClass('playing');
  }

  if (connection) {
    connection.send(JSON.stringify({ type: 'play_state', isPlaying: isPlaying }));
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
  let bpm = map(noise(a * 0.009), 0, 1, 10, 160);
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
      currentSequence.push(note + getRandomOctaveShift());
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
      note += getRandomOctaveShift();
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

function getRandomOctaveShift() {
  // Returns an octave shift in semitones (-12, 0, or 12)
  // Heavily weighted towards no shift.
  let opts = [0, -12, 12];
  let w = [0.8, 0.1, 0.1];
  let r = random(), cum = 0;
  for (let i = 0; i < opts.length; i++) {
    cum += w[i];
    if (r < cum) return opts[i];
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
  const sargam = ["सा", "रे♭", "रे", "ग♭", "ग", "म", "म तीव्र", "प", "ध♭", "ध", "नि♭", "नि"];
  const noteIndex = num % 12;

  let noteName = sargam[noteIndex];

  // Using C4 (MIDI 60) as the reference for the middle octave (Madhya Saptak)
  const saptak = Math.floor(num / 12) - 5;
  if (saptak < 0) {
    // Mandra Saptak (low octave) - dot below
    noteName = noteName + '̣';
  } else if (saptak > 0) {
    // Taar Saptak (high octave) - dot above
    noteName = noteName + '̇';
  }

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

  kotoSampler.triggerAttackRelease(chordNoteNames, duration, undefined, normalizedVelocity);
}

function generateChord(rootNote) {
  let base = Math.floor(rootNote/12)*12;
  let candidates = currentRaga.aaroh.map(n=>base+(n%12))
                       .filter(n=>n>=60 && n<=84);
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

function refreshComposition() {
  console.log("↻ Refreshing sequence…");
  generateSequence();
  barsUntilRefresh = int(random([4,8,16]));
  packCircles();
}


// === VISUALS ===
function packCircles() {
    circles = [];
    packed = false;
    for (let i = 0; i < packingAttempts; i++) {
        let newCircle = {
            x: random(width),
            y: random(height),
            r: minRadius,
            noteIndex: i % hindiNotes.length // Assign a note index
        };
        let overlapping = false;
        for (let j = 0; j < circles.length; j++) {
            let d = dist(newCircle.x, newCircle.y, circles[j].x, circles[j].y);
            if (d < newCircle.r + circles[j].r) {
                overlapping = true;
                break;
            }
        }
        if (!overlapping) {
            circles.push(newCircle);
        }
    }

    // Try to grow circles
    let growing = true;
    while (growing) {
        growing = false;
        for (let i = 0; i < circles.length; i++) {
            let canGrow = true;
            for (let j = 0; j < circles.length; j++) {
                if (i !== j) {
                    let d = dist(circles[i].x, circles[i].y, circles[j].x, circles[j].y);
                    if (d < circles[i].r + circles[j].r + 2) { // Add padding
                        canGrow = false;
                        break;
                    }
                }
            }
            if (canGrow && circles[i].r < maxRadius &&
                circles[i].x - circles[i].r > 0 &&
                circles[i].x + circles[i].r < width &&
                circles[i].y - circles[i].r > 0 &&
                circles[i].y + circles[i].r < height) {
                circles[i].r += 0.5;
                growing = true;
            }
        }
    }
    packed = true;
    createNoteElements();
    console.log("Packed", circles.length, "circles.");
}

function createNoteElements() {
    noteElements = [];
    for (let i = 0; i < circles.length; i++) {
        noteElements.push({
            circleIndex: i,
            lit: false,
            timeoutId: null
        });
    }
}


function noteToHindiIndex(noteNumber) {
    if (noteNumber === null) return -1;
    // This is a simplified mapping to one of the 7 notes of the scale
    // It doesn't perfectly align with raga theory but provides a visual cue.
    const pc = noteNumber % 12;
    const aarohPcs = [...new Set(currentRaga.aaroh.map(n => n % 12))].sort((a,b)=>a-b);
    let index = aarohPcs.indexOf(pc);

    // If not in aaroh, try avroh
    if (index === -1) {
        const avrohPcs = [...new Set(currentRaga.avroh.map(n => n % 12))].sort((a,b)=>a-b);
        index = avrohPcs.indexOf(pc);
    }
    
    // Fallback for notes not in the main scale paths (e.g. from pakad)
    if (index === -1) {
       return Math.abs((noteNumber - 60) % 7);
    }
    
    return index % hindiNotes.length;
}

function lightUpNote(noteNumber, durationMs) {
    const index = noteToHindiIndex(noteNumber);
    if (index === -1) return;

    const blinkDuration = Math.max(durationMs, 120);

    for (let i = 0; i < noteElements.length; i++) {
        const noteElement = noteElements[i];
        if (circles[noteElement.circleIndex].noteIndex === index) {
            if (noteElement.timeoutId) {
                clearTimeout(noteElement.timeoutId);
            }
            noteElement.lit = true;

            const timeoutId = setTimeout(() => {
                noteElement.lit = false;
                noteElement.timeoutId = null;
            }, blinkDuration);
            noteElement.timeoutId = timeoutId;
        }
    }
}

function turnOffNote(noteNumber) {
    const index = noteToHindiIndex(noteNumber);
    if (index === -1) return;
    for (let i = 0; i < noteElements.length; i++) {
        if (circles[noteElements[i].circleIndex].noteIndex === index) {
            noteElements[i].lit = false;
        }
    }
}

function selectRaga(ragaName) {
  if (ragas[ragaName] && currentRaga.name !== ragaName) {
    currentRaga = ragas[ragaName];
    select('#raga-name').html(currentRaga.name);
    console.log(`Switched to Raga ${currentRaga.name}`);
    refreshComposition();
  }
}
