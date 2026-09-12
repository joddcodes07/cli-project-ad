const fs = require("fs")
const { spawn } = require("node:child_process");
//read all the mp3 files

const path = "./songs";

const songs = fs.readdirSync(path).filter(el => el.endsWith('.mp3'))

console.log(`🎶 Welcome to the Songs App 🎶 \n`);

for(let i = 0; i < songs.length; i++){
    console.log(`${i+1}: ${songs[i].split('.')[0]}`);
}

console.log(`\n 🎵 Select a number to play the song`);

process.stdin.setEncoding('utf-8')

process.stdin.on("data", (input)=>{
    const userInput = +input.toString();
    player(userInput)
})

function player(userInput){
    console.log(`Selected Song: ${songs[userInput-1]}`)
    const childProcess = spawn('afplay', [`${path}/${songs[userInput - 1]}`]);
    childProcess.on('close',()=>{
        console.log("song finished...");
        process.exit(0);
    })
}