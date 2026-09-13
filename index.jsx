import React, { useState, useEffect } from 'react';
import { render, Box, useInput } from 'ink';
import { getSongs } from './utils/scanner.js';
import { playSong, stopSong } from './utils/audioEngine.js';

//importing components
import { Layout } from './components/Layout.jsx';
import { Header } from './components/Header.jsx';
import { QueueList } from './components/QueueList.jsx';
import { NowPlaying } from './components/NowPlaying.jsx';
import { ProgressBar } from './components/ProgressBar.jsx';
import { KeyboardLegend } from './components/KeyboardLegend.jsx';

const App = () => {
    const [songs, setSongs] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [currentPlaying, setCurrentPlaying] = useState(null);

    useEffect(() => {
        setSongs(getSongs());
    }, []);

    useInput((input, key) => {
        if (input === 'q') {
            stopSong();
            process.exit(0);
        }
        if (songs.length === 0) return;
        if (key.upArrow) setSelectedIndex(prev => (prev > 0 ? prev - 1 : songs.length - 1));
        if (key.downArrow) setSelectedIndex(prev => (prev < songs.length - 1 ? prev + 1 : 0));
        
        if (key.return) {
            const selected = songs[selectedIndex];
            setCurrentPlaying(selected);
            playSong(`./songs/${selected}`, () => setCurrentPlaying(null));
        }
    });

    return (
        <Layout>
            <Header />
            <Box flexDirection="row">
                <QueueList songs={songs} selectedIndex={selectedIndex} currentPlaying={currentPlaying} />
                <NowPlaying currentPlaying={currentPlaying} />
            </Box>
            <ProgressBar />
            <KeyboardLegend />
        </Layout>
    );
};

render(<App />);