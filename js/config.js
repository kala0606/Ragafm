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

const drumSamples = {
    'C1': 'samples/drums/Ghosthack-Kick_01.wav',    // kick
    'D1': 'samples/drums/Ghosthack-Snare_01.wav',   // snare
    'D#1': 'samples/drums/Ghosthack-Clap_01.wav'      // clap
};
  
const hiHatSamples = {
    'F#1': 'samples/drums/Ghosthack-Closed_Hihat_01.wav', // hhc
    'A#1': 'samples/drums/Ghosthack-Open_Hihat_01.wav'   // hho
};

const tablaSamples = {
    'Na1': 'samples/TABLA/Tabla_Hit_High_1.wav',
    'Na2': 'samples/TABLA/Tabla_Hit_High_2.wav',
    'Na3': 'samples/TABLA/Tabla_Hit_High_3.wav',
    'Na4': 'samples/TABLA/Tabla_Hit_High_4.wav',
    'Te1': 'samples/TABLA/Tabla_Slap_1.wav',
    'Te2': 'samples/TABLA/Tabla_Slap_2.wav',
    'Te3': 'samples/TABLA/Tabla_Slap_3.wav',
    'Te4': 'samples/TABLA/Tabla_Slap_4.wav',
    'Ge1': 'samples/TABLA/Tabla_Low_1.wav',
    'Ge2': 'samples/TABLA/Tabla_Low_2.wav',
    'Ge3': 'samples/TABLA/Tabla_Low_3.wav',
    'Dha1': 'samples/TABLA/Tabla_Mid_1.wav',
    'Dha2': 'samples/TABLA/Tabla_Mid_2.wav',
    'Dha3': 'samples/TABLA/Tabla_Mid_3.wav',
    'Flare1': 'samples/TABLA/Tabla_Flare_1.wav',
    'Ring1': 'samples/TABLA/Tabla_Ring_1.wav'
};

const defaultTablaPatterns = {
    "TeenTaal": {
        "pattern": [
            'Dha1', 'Te1', 'Ge1', 'Te2', 'Na1', 'Te1', 'Na2', 'Te2', 
            'Dha2', 'Te3', 'Ge2', 'Te4', 'Na3', 'Te3', 'Na4', 'Te4'
        ],
        "beats": 16
    },
    "Keherwa": {
        "pattern": ['Dha1', 'Ge1', 'Na1', 'Te1', 'Dha2', 'Ge2', 'Na2', 'Te2'],
        "beats": 8
    },
    "Dadra": {
        "pattern": ['Dha1', 'Na1', 'Na2', 'Dha2', 'Te1', 'Te2'],
        "beats": 6
    },
    "FastTeenTaal": {
        "pattern": [
            'Dha1', 'Te1', 'Ge1', 'Te2', 'Na1', 'Te1', 'Na2', 'Te2', 'Dha2', 'Te3', 'Ge2', 'Te4', 'Na3', 'Te3', 'Na4', 'Te4',
            'Dha1', 'Te1', 'Ge1', 'Te2', 'Na1', 'Te1', 'Na2', 'Te2', 'Dha3', 'Te3', 'Ge3', 'Te4', 'Na3', 'Te3', 'Na4', 'Te4'
        ],
        "beats": 32
    }
};

const complexHiHatPatterns = [
    [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1], // Shuffled 16ths
    [1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0], // Another shuffle
    [2, 0, 1, 0, 2, 0, 1, 1, 2, 0, 1, 0, 2, 0, 1, 1]  // Open hats on downbeats
];

const PALETTE_SIZE = 256; // Number of colors to generate for the palette

const drumPatterns = {
    'C1': [ // kick
        [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0], // Four on the floor
        [1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0], // Syncopated
        [1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0]  // Driving
    ],
    'D1': [ // snare
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], // On the 2 and 4
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0], // Off-beat accents
        [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0]  // Syncopated snare
    ],
    'hats': [ // closed hat (1) and open hat (2)
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1], // Off-beats
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 16ths
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0], // 8ths
        [1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1]  // 16ths with open hat accents
    ]
};

const timeSignatures = [
    { beats: 1, subdivision: 4 },
    { beats: 2, subdivision: 4 },
    { beats: 3, subdivision: 4 },
    { beats: 4, subdivision: 4 },
    { beats: 7, subdivision: 8 },
];

const tihaiPatterns = [
    [1,1,2,2,1,1,2,2,1,1,2,2],
    [3,3,4,4,3,3,4,4,3,3,4,4],
];

const fastRhythmPatterns = [
    { pattern: [0,1,0,1], noteOffset: [0,2], length: 4 },
    { pattern: [0,2,0,2], noteOffset: [0,4], length: 4 },
    { pattern: [1,3,1,3], noteOffset: [2,5], length: 4 },
];

const defaultColorScheme = {
    background: '#000000',
    primary: '#36454F',
    secondary: '#E6E6FA',
    accent: '#6A5ACD',
    text: '#F8F8FF'
};

const defaultDrumPattern = {
    "C1": [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    "D1": [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    "hats": [1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1]
}; 