function drawSheenGrid() {
    textCanvas.push();
    textCanvas.stroke(0, 0, 0, 30); // Thin black lines with some transparency
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