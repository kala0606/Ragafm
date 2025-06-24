let experienceStartTime;

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
    
    experienceStartTime = new Date(); // Start the timer
    
    console.log("▶ Starting Raga:", currentRaga.name);

    // Track the raga selection with Microsoft Clarity
    if (typeof clarity === 'function') {
        clarity('set', 'selected_raga', ragaName);
        clarity('event', 'Raga Selected');
    }

    applyColorScheme(currentRaga.colorScheme);
    applyUIColor(color(255)); // Use white for UI elements
    select('#raga-name-display').html(currentRaga.name);
    
    // Notify cast system about raga change
    if (typeof notifyCastRagaChange === 'function') {
        notifyCastRagaChange(currentRaga);
    }
    
    // Generate the color palette for the selected raga
    generateRagaPalette();

    // Initial setup for the selected raga
    resetPlaybackState();
    updatePlaybackParameters();
    generateSequence();
    generateDrumPattern();
    chooseNextChordInterval();
    createGrid();
    
    // Hide welcome screen and show the controls
    select('#welcome-screen').addClass('hidden');
    select('#app').removeClass('hidden');
    select('.top-bar').removeClass('hidden');
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

    // Stop all cell loops and dispose resources
    if (typeof stopAllCellLoops === 'function') {
        stopAllCellLoops();
    }

    // Track experience duration with Microsoft Clarity
    if (typeof clarity === 'function' && experienceStartTime) {
        const durationInSeconds = (new Date() - experienceStartTime) / 1000;
        clarity('set', 'experience_duration_seconds', Math.round(durationInSeconds).toString());
        clarity('event', 'Experience Ended');
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
    select('#app').addClass('hidden');
    select('.top-bar').addClass('hidden');
    select('#back-button').addClass('hidden');
    select('#raga-name-display').html('raga.fm'); // Reset title
    document.body.classList.remove('experience-view');
    applyUIColor(null); // Revert to default
}

function applyUIColor(colorObj) {
    const ragaName = document.getElementById('raga-name-display');
    const appLogo = document.getElementById('app-logo');
    const backButton = document.getElementById('back-button');
    const startStopButton = document.getElementById('start-stop-button');
    const modeToggleButton = document.getElementById('mode-toggle');

    const targetColorStr = colorObj ? colorObj.toString('#rrggbb') : '#ffffff';

    if (ragaName) ragaName.style.color = targetColorStr;
    if (appLogo) appLogo.style.backgroundColor = targetColorStr;
    if (backButton) {
        backButton.style.color = targetColorStr;
        backButton.style.borderColor = targetColorStr;
    }
    
    if (startStopButton) {
        startStopButton.style.borderColor = targetColorStr;
        const playIcon = startStopButton.querySelector('.icon-play');
        if (playIcon) playIcon.style.borderLeftColor = targetColorStr;

        const pauseIcon = startStopButton.querySelector('.icon-pause');
        if (pauseIcon) {
            pauseIcon.style.borderLeftColor = targetColorStr;
            pauseIcon.style.borderRightColor = targetColorStr;
        }
    }

    if (modeToggleButton) {
        modeToggleButton.style.color = targetColorStr;
        modeToggleButton.style.borderColor = targetColorStr;
    }
} 