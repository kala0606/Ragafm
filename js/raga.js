function parseSargamToMidi(sargamString, isAvroha = false) {
    if (!sargamString) return [];

    const sargamMap = {
        'S': 0, 'r': 1, 'R': 2, 'g': 3, 'G': 4, 'M': 5, "M'": 6,
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
        let noteName = note;
        let pitchClass = sargamMap[noteName];

        if (pitchClass === undefined) {
            // Probably has an octave marker, so strip it and try again.
            noteName = note.replace(/[.']/g, '');
            pitchClass = sargamMap[noteName];
        }

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
        'S': 0, 'r': 1, 'R': 2, 'g': 3, 'G': 4, 'M': 5, "M'": 6,
        'P': 7, 'd': 8, 'D': 9, 'n': 10, 'N': 11
    };

    ragaData.raga_suggestions.forEach(timeSlot => {
        timeSlot.moods.forEach(mood => {
            mood.ragas.forEach(raga => {
                const pakadPhrases = raga.pakad.split(',')
                    .map(phrase => parseSargamToMidi(phrase.trim()))
                    .filter(phrase => phrase.length > 0);

                let vadiNoteName = raga.vadi.split(' ')[0];
                if (!sargamToMidiOffset.hasOwnProperty(vadiNoteName)) {
                    vadiNoteName = vadiNoteName.replace(/[.']/g, '');
                }

                let samvadiNoteName = raga.samvadi.split(' ')[0];
                if (!sargamToMidiOffset.hasOwnProperty(samvadiNoteName)) {
                    samvadiNoteName = samvadiNoteName.replace(/[.']/g, '');
                }

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
                
                // Ensure composition objects exist.
                if (!processedRaga.composition) {
                    processedRaga.composition = { sequences: {}, drumPatterns: {} };
                }
                if (!processedRaga.composition.sequences) {
                    processedRaga.composition.sequences = {};
                }
                if (!processedRaga.composition.drumPatterns) {
                    processedRaga.composition.drumPatterns = {};
                }

                // Populate missing drum patterns by repeating from available ones.
                const drumPatterns = processedRaga.composition.drumPatterns;
                const availableDrumPatterns = Object.values(drumPatterns);
                if (availableDrumPatterns.length > 0) {
                    for (let i = 1; i <= 5; i++) {
                        if (!drumPatterns[i] && !drumPatterns[String(i)]) {
                            drumPatterns[i] = availableDrumPatterns[i % availableDrumPatterns.length];
                        }
                    }
                }
                
                // Populate missing sequences by repeating from available ones.
                const sequences = processedRaga.composition.sequences;
                const availableSequences = Object.values(sequences);
                if (availableSequences.length > 0) {
                    for (let i = 1; i <= 5; i++) {
                        if (!sequences[i] && !sequences[String(i)]) {
                            sequences[i] = availableSequences[i % availableSequences.length];
                        }
                    }
                }

                allRagas[raga.name] = processedRaga;
            });
        });
    });

    console.log("All Ragas Processed and ready.");
    
    // The application will now wait for the user to select a raga from the welcome screen.
    // All initialization logic is handled by the startExperience() function.
    populateWelcomeScreen();
}

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

function refreshComposition() {
    console.log("↻ Refreshing sequence…");
    generateSequence();
    generateDrumPattern();
    barsUntilRefresh = int(random([4, 8, 16]));
    chooseNextChordInterval();
    currentBeat = 0; // Reset the beat counter
}

function getSuggestionsForCurrentTime() {
    const now = new Date();
    if (!ragaData || !ragaData.raga_suggestions) {
        console.error("Raga data not loaded or is invalid.");
        return null;
    }

    const currentHour = now.getHours();

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