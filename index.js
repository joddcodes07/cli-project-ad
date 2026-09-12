const fs = require("fs");
const { spawn } = require("node:child_process");

const path = "./songs";
let currentProcess = null;

// ANSI escape codes for terminal styling (clean UI colors)
const c = {
    reset: "\x1b[0m",
    bold: "\x1b[1m",
    dim: "\x1b[2m",
    cyan: "\x1b[36m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    gray: "\x1b[90m",
    bgDark: "\x1b[40m",
    red: "\x1b[31m"
};

if (!fs.existsSync(path)) {
    console.error(`${c.red}❌ Error: Directory "${path}" does not exist.${c.reset}`);
    process.exit(1);
}

const songs = fs.readdirSync(path).filter(el => el.toLowerCase().endsWith('.mp3'));

if (songs.length === 0) {
    console.error(`${c.red}❌ Error: No MP3 files found in "${path}".${c.reset}`);
    process.exit(1);
}

// Minimal Clean Header
console.log(`\n${c.bold}${c.cyan}  🎶 SONGS APP ${c.reset}${c.dim}— Terminal Edition${c.reset}\n`);
console.log(`${c.gray}  ────────────────────────────────────────${c.reset}`);

for(let i = 0; i < songs.length; i++){
    const num = String(i + 1).padStart(2, '0');
    const songName = songs[i].replace(/\.[^/.]+$/, ""); // strip extension cleanly
    console.log(`  ${c.cyan}${num}${c.reset} ${c.dim}│${c.reset}  ${songName}`);
}

console.log(`${c.gray}  ────────────────────────────────────────${c.reset}`);
process.stdout.write(`\n  ${c.yellow}🎵 Select a track number (or type 'q' to quit):${c.reset} `);

process.stdin.setEncoding('utf-8');

process.stdin.on("data", (input) => {
    const rawInput = input.trim();
    
    if (rawInput.toLowerCase() === 'q') {
        if (currentProcess) currentProcess.kill();
        console.log(`\n  ${c.dim}Goodbye! 👋${c.reset}\n`);
        process.exit(0);
    }

    const userInput = Number(rawInput);

    if (isNaN(userInput) || userInput < 1 || userInput > songs.length) {
        console.log(`  ${c.red}⚠️ Invalid selection. Choose between 1 and ${songs.length}.${c.reset}`);
        process.stdout.write(`  ${c.yellow}🎵 Select a track number:${c.reset} `);
        return; 
    }

    player(userInput);
});

function player(userInput) {
    const selectedSong = songs[userInput - 1];
    const songDisplayName = selectedSong.replace(/\.[^/.]+$/, "");
    
    if (currentProcess) {
        currentProcess.kill();
    }

    console.log(`\n  ${c.green}▶ Playing:${c.reset} ${c.bold}${songDisplayName}${c.reset}`);
    
    currentProcess = spawn('afplay', [`${path}/${selectedSong}`]);

    currentProcess.on('close', (code, signal) => {
        if (signal !== 'SIGTERM') {
            console.log(`\n  ${c.dim}✓ Song finished.${c.reset}`);
            process.stdout.write(`  ${c.yellow}🎵 Select another track (or 'q' to quit):${c.reset} `);
        }
    });
}