import { spawn } from 'child_process';

let currentProcess = null;
let isPaused = false;

export const playSong = (filePath, onFinish) => {
    stopSong();
    isPaused = false;
    currentProcess = spawn('afplay', [filePath]);

    currentProcess.on('close', (code, signal) => {
        // SIGKILL is used when we manually change tracks
        if (signal !== 'SIGTERM' && signal !== 'SIGKILL' && onFinish) {
            onFinish();
        }
    });
};

export const togglePause = () => {
    if (!currentProcess) return false;
    
    if (isPaused) {
        currentProcess.kill('SIGCONT'); // Resume
        isPaused = false;
    } else {
        currentProcess.kill('SIGSTOP'); // Pause
        isPaused = true;
    }
    return isPaused;
};

export const stopSong = () => {
    if (currentProcess) {
        currentProcess.kill('SIGKILL');
        currentProcess = null;
        isPaused = false;
    }
};