import fs from 'fs';
import path from 'path';

const SONGS_DIR = "./songs";

export const getSongs = () => {
    if (!fs.existsSync(SONGS_DIR)) {
        console.error(`Error: Directory "${SONGS_DIR}" does not exist.`);
        return [];
    }
    
    // Read directory and filter out non-mp3 files
    const files = fs.readdirSync(SONGS_DIR);
    return files.filter(file => file.toLowerCase().endsWith('.mp3'));
};