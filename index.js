const fs = require("fs");
const { spawn } = require("node:child_process");

const path = "./songs";
let currentProcess = null;

//Error Handling
if (!fs.existsSync(path)) {
    console.error(`Error: The directory "${path}" does not exist.`);
    process.exit(1);
}

//Case Sensitivity handling (.mp3 and .MP3)
const songs = fs.readdirSync(path).filter(el => el.toLowerCase().endsWith('.mp3'));

if (songs.length === 0) {
    console.error(`Error: No MP3 files found in "${path}".`);
    process.exit(1);
}

console.log(`🎶 Welcome to the Songs App 🎶 \n`);

for(let i = 0; i < songs.length; i++){
    console.log(`${i+1}: ${songs[i].split('.')[0]}`);
}

console.log(`\n 🎵 Select a number to play the song`);

process.stdin.setEncoding('utf-8');

process.stdin.on("data", (input) => {
    const rawInput = input.trim();
    const userInput = Number(rawInput);

    //Input Validation (Must be a valid number within the array range)
    if (isNaN(userInput) || userInput < 1 || userInput > songs.length) {
        console.log(`Invalid selection. Please enter a number between 1 and ${songs.length}.`);
        return; 
    }

    player(userInput);
});

function player(userInput) {
    const selectedSong = songs[userInput - 1];
    
    //Overlapping Audio handling (kill previous song if a new one is selected)
    if (currentProcess) {
        currentProcess.kill();
    }

    console.log(`Selected Song: ${selectedSong}`);
    
    currentProcess = spawn('afplay', [`${path}/${selectedSong}`]);

    currentProcess.on('close', (code, signal) => {
        // Only exit if the song finished naturally, not if it was intentionally killed
        if (signal !== 'SIGTERM') {
            console.log("song finished...");
            process.exit(0);
        }
    });
}