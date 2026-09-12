import { spawn } from 'child_process';

let currentProcess = null;

export const playSong = (filePath, onFinish) => {
    // Kill any currently playing track before starting a new one
    stopSong();

    // Spawning macOS afplay (can be swapped to 'mpv' or 'ffplay' later for cross-platform)
    currentProcess = spawn('afplay', [filePath]);

    currentProcess.on('close', (code, signal) => {
        // If the process ends naturally (not killed manually via SIGTERM)
        if (signal !== 'SIGTERM' && onFinish) {
            onFinish();
        }
    });
};

export const stopSong = () => {
    if (currentProcess) {
        currentProcess.kill();
        currentProcess = null;
    }
};