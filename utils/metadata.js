import * as mm from 'music-metadata';
import path from 'path';

export const getTrackInfo = async (filePath) => {
    try {
        const metadata = await mm.parseFile(filePath);
        return {
            title: metadata.common.title || path.basename(filePath, '.mp3'),
            artist: metadata.common.artist || 'Unknown Artist',
            album: metadata.common.album || 'Unknown Album',
            duration: metadata.format.duration || 0 // duration in seconds
        };
    } catch (error) {
        // Fallback if the MP3 has no tags
        return {
            title: path.basename(filePath, '.mp3'),
            artist: 'Unknown Artist',
            album: 'Unknown Album',
            duration: 0
        };
    }
};