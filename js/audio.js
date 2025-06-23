let lastIntensityLevel;

async function togglePlayback() {
    // Use the async nature of Tone.start()
    await Tone.start();
  
    isPlaying = !isPlaying;
  
    const startStopButton = document.getElementById('start-stop-button');
    if (isPlaying) {
        startStopButton.classList.add('playing');
    } else {
        startStopButton.classList.remove('playing');
    }
  
    if (isPlaying) {
        updatePlaybackParameters();
        playbackLoop();
        try {
            if ('wakeLock' in navigator) {
                wakeLock = await navigator.wakeLock.request('screen');
                console.log('Screen Wake Lock is active.');
                wakeLock.addEventListener('release', () => {
                    console.log('Screen Wake Lock was released.');
                });
            }
        } catch (err) {
            console.error(`${err.name}, ${err.message}`);
        }
        console.log("Playback started/resumed");
    } else {
        clearTimeout(playbackLoopTimeout);
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
        if (drumSampler) {
            drumSampler.releaseAll();
        }
        if (hiHatSampler) {
            hiHatSampler.releaseAll();
        }
        if (wakeLock !== null) {
            wakeLock.release();
            wakeLock = null;
        }
        console.log("Playback stopped");
    }
}

function chooseNextChordInterval() {
    nextChordInterval = random([1, 2, 1]);
    barsSinceChord = 0;
    console.log("→ Chords every", nextChordInterval, "bars");
}

function updatePlaybackParameters() {
    if (currentMode === 'ambient') {
        // Variable BPM for ambient mode
        bpm = map(noise(a * 0.02), 0, 1, 20, 200); // Slower, more ambient range
        beatDuration = 60000 / bpm;
    } else { // 'rhythm' mode
        // Fixed BPM for rhythm mode
        bpm = 120;
        beatDuration = 60000 / bpm;
        // Only generate a new drum pattern if we're in rhythm mode and don't have one
        if (Object.keys(currentDrumPattern).length === 0) {
            generateDrumPattern();
        }
        if (Object.keys(currentTablaPattern).length === 0) {
            generateTablaPattern();
        }
    }
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
  
function playbackLoop() {
    if (!isPlaying) {
        clearTimeout(playbackLoopTimeout);
        return;
    }
    
    // Do the work of a beat
    playBeat();
    
    // Schedule the next beat using the now-current beatDuration
    let interval = beatDuration / currentTimeSignature.subdivision;
    playbackLoopTimeout = setTimeout(playbackLoop, interval);
}

function playBeat() {
    a += 1;
    updatePlaybackParameters();
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
  
    // --- RHYTHM SECTION (runs only in 'rhythm' mode) ---
    if (currentMode === 'rhythm') {
        // The entire rhythm section, including event logic, is nested here.
        if (drumState.event !== 'mute_all' && currentTimeSignature.beats === 4 && currentTimeSignature.subdivision === 4) {
            const step = currentBeat % 16;
            let patternSource = (Object.keys(currentDrumPattern).length > 0) ? currentDrumPattern : defaultDrumPattern;
    
            // --- Check for drum events ---
            // Use a fill pattern for hats if one is active
            if (drumState.event === 'hat_fill' && drumState.duration > 0) {
                patternSource = { ...patternSource, hats: drumState.fillPattern };
            }
    
            // Kick
            if (drumState.event !== 'mute_kick' && patternSource['C1'] && patternSource['C1'][step] === 1) {
                drumSampler.triggerAttack('C1');
            }
      
            // Snare
            if (drumState.event !== 'mute_snare' && patternSource['D1'] && patternSource['D1'][step] === 1) {
                drumSampler.triggerAttack('D1');
            }
      
            // Hi-Hats
            if (drumState.event !== 'mute_hats' && patternSource.hats) {
                const hat_trigger = patternSource.hats[step];
                if (hat_trigger > 0) {
                    // Modulate effects for hi-hats
                    const hatReverbWet = map(noise(a * 0.1), 0, 1, 0, 0.3);
                    const hatDelayWet = map(noise(a * 0.1 + 1000), 0, 1, 0, 0.4);
                    hiHatReverb.wet.rampTo(hatReverbWet, 0.05);
                    hiHatDelay.wet.rampTo(hatDelayWet, 0.05);
      
                    if (hat_trigger === 1) {
                        hiHatSampler.triggerAttack('F#1'); // Closed Hi-hat
                    } else if (hat_trigger === 2) {
                        hiHatSampler.triggerAttack('A#1'); // Open Hi-hat
                    }
                }
            }
        }

        // --- TABLA SECTION ---
        if (currentTablaPattern && currentTablaPattern.pattern) {
            const pattern = currentTablaPattern.pattern;
            const totalPatternSteps = currentTablaPattern.beats;
            // The number of sequencer steps in one bar, typically 16 for 4/4 time.
            const totalSequenceSteps = currentTimeSignature.beats * currentTimeSignature.subdivision;

            // Check if the pattern has a higher resolution than the main sequencer.
            const stepsPerBeat = Math.round(totalPatternSteps / totalSequenceSteps);

            if (stepsPerBeat > 1) { 
                // This pattern is faster (e.g., 32nd notes over 16th note sequencer).
                const interval = beatDuration / currentTimeSignature.subdivision; // Duration of one sequencer step in ms
                const subStepInterval = (interval / stepsPerBeat) / 1000; // Duration of one tabla note in seconds for Tone.js

                for (let i = 0; i < stepsPerBeat; i++) {
                    const stepIndex = (currentBeat * stepsPerBeat) + i;
                    if (stepIndex < pattern.length) {
                        const noteToPlay = pattern[stepIndex];
                        if (noteToPlay) {
                            // Schedule the note within the current sequencer step.
                            const timeToPlay = Tone.now() + (subStepInterval * i);
                            tablaSampler.triggerAttack(noteToPlay, timeToPlay);
                        }
                    }
                }
            } else { 
                // This pattern runs at the same or a different tempo (polyrhythm), but not at a higher subdivision.
                const stepIndex = currentBeat % totalPatternSteps;
                const noteToPlay = pattern[stepIndex];
                if (noteToPlay) {
                    tablaSampler.triggerAttack(noteToPlay);
                }
            }
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
  
    // ——— BAR & CHORD LOGIC (always runs) ———
    currentBeat++;
    if (currentBeat >= slotCount) {
      // bar rollover
      currentBeat = 0;
      barCounter++;
      barsSinceChord++;

      // --- Drum Event Logic (only active in rhythm mode) ---
      if (currentMode === 'rhythm') {
        if (drumState.duration > 0) {
            drumState.duration--;
            if (drumState.duration === 0) {
                console.log(`→ Drum event '${drumState.event}' finished.`);
                drumState.event = null;
            }
        }
  
        drumState.barsUntilChange--;
        
        if (drumState.barsUntilChange <= 0 && drumState.event === null) {
            console.log('--- Checking for a drum event ---');
            if (random() < 0.7) { // 70% chance of any event
                const possibleEvents = ['mute_kick', 'mute_snare', 'mute_hats', 'hat_fill', 'mute_all'];
                const chosenEvent = random(possibleEvents);
                
                drumState.event = chosenEvent;
                
                switch (chosenEvent) {
                    case 'mute_kick':
                    case 'mute_snare':
                    case 'mute_hats':
                    case 'mute_all':
                        drumState.duration = random([4, 8]);
                        console.log(`→ Triggering drum event: ${chosenEvent} for ${drumState.duration} bars.`);
                        break;
                    case 'hat_fill':
                        drumState.duration = random([2, 4]);
                        drumState.fillPattern = random(complexHiHatPatterns);
                        console.log(`→ Triggering drum event: Hat Fill for ${drumState.duration} bars.`);
                        break;
                }
            }
            // Reset check counter regardless of whether an event triggered
            drumState.barsUntilChange = random([8, 16]); 
        }
      }
  
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
    }
}

function playChord(rootNote, velocity) {
    const noteName = midiNoteToName(rootNote);
    const fifth = Tone.Frequency(noteName).transpose(7).toNote();
    const third = Tone.Frequency(noteName).transpose(4).toNote();
    const normalizedVelocity = velocity / 127;
    chordSampler.triggerAttackRelease([noteName, third, fifth], "2n", undefined, normalizedVelocity);
}

function createDrumVariation(basePattern) {
    // Deep copy to avoid modifying the original pattern
    const newPattern = JSON.parse(JSON.stringify(basePattern));

    // Iterate over each instrument in the pattern
    for (const instrument of Object.keys(newPattern)) {
        // Decide whether to modify this instrument's pattern
        if (random() < 0.5) { // 50% chance to modify each instrument part
            const part = newPattern[instrument];
            const partLength = part.length;
            
            const nonZeroCount = part.filter(v => v !== 0).length;
            
            // More likely to add notes to sparse patterns, and remove from dense ones
            const modificationType = random() < (nonZeroCount / partLength) ? 'remove' : 'add';

            switch(modificationType) {
                case 'add':
                    // Add a note in a random empty spot
                    const zeroIndices = part.map((val, i) => val === 0 ? i : -1).filter(i => i !== -1);
                    if (zeroIndices.length > 0) {
                        const randomIndex = random(zeroIndices);
                        // For hats, it can be 1 or 2, for others just 1
                        part[randomIndex] = (instrument === 'hats') ? 1 : 1; // Keep it simple, mostly closed hats
                    }
                    break;
                case 'remove':
                    // Remove a random existing note
                    if (nonZeroCount > 2) { // Don't remove if it's already very sparse
                        const nonZeroIndices = part.map((val, i) => val !== 0 ? i : -1).filter(i => i !== -1);
                        const randomIndex = random(nonZeroIndices);
                        part[randomIndex] = 0;
                    }
                    break;
            }
        }
    }
    return newPattern;
}

function generateDrumPattern() {
    console.log(`[generateDrumPattern] Called for rhythm mode.`);
    let basePattern;

    if (currentRaga && currentRaga.composition && Object.keys(currentRaga.composition.drumPatterns).length > 0) {
        const patterns = currentRaga.composition.drumPatterns;
        // Just pick a random pattern since there's no intensity
        const availableLevels = Object.keys(patterns);
        const randomLevel = random(availableLevels);
        basePattern = patterns[randomLevel];
    } else {
        // Fallback to the global default if no specific one is found
        basePattern = defaultDrumPattern;
    }

    if (basePattern) {
        currentDrumPattern = createDrumVariation(basePattern);
        console.log('[generateDrumPattern] Created a new drum variation.');
    } else {
        console.log('[generateDrumPattern] No base pattern found, using default.');
        currentDrumPattern = createDrumVariation(defaultDrumPattern);
    }
}

function generateTablaPattern() {
    console.log(`[generateTablaPattern] Called for rhythm mode.`);
    let pattern;
    let source = "default";
    let patterns;

    if (currentRaga && currentRaga.composition && currentRaga.composition.tablaPatterns && Object.keys(currentRaga.composition.tablaPatterns).length > 0) {
        patterns = currentRaga.composition.tablaPatterns;
        source = "raga";
    } else {
        patterns = defaultTablaPatterns;
    }
    
    const patternNames = Object.keys(patterns);
    if (patternNames.length > 0) {
        const randomPatternName = random(patternNames);
        pattern = patterns[randomPatternName];
        console.log(`[generateTablaPattern] Selected new tabla pattern '${randomPatternName}' from ${source}.`);
    } else {
        console.log(`[generateTablaPattern] No tabla patterns found, playing silent.`);
        pattern = {}; // empty pattern
    }

    if (pattern) {
        currentTablaPattern = pattern;
    }
} 