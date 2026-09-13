# Terminal Rhythm

Terminal Rhythm is a minimal, highly interactive command-line music player built with Node.js. It transforms the standard terminal environment into a responsive, component-based user interface, enabling users to play, pause, stop, and navigate local audio tracks seamlessly.

This project serves as a practical implementation of advanced backend and command-line application concepts, bridging modern frontend architectural patterns with low-level system operations.

---

## Concepts Demonstrated

### CLI Development & UI Architecture
The application utilizes a reactive component architecture to render standard CSS Flexbox layouts directly within the terminal constraints. By intercepting raw `stdin` streams, it handles complex user inputs and keyboard shortcuts while maintaining an interactive, non-blocking interface. Dynamic terminal elements, such as the ticking progress bar and ASCII visuals, are managed through centralized state loops to prevent screen tearing or flickering.

### Process Management
Audio playback is achieved without freezing the main application thread by offloading the workload to background system processes. The application leverages Node's `child_process` module to spawn instances of native audio engines. Playback state control (pausing, resuming, and skipping) is managed by dispatching specific UNIX signals (`SIGSTOP`, `SIGCONT`, `SIGKILL`) to these child processes, demonstrating robust concurrent execution handling.

### File Handling & Data Parsing
The player implements secure directory scanning to read and filter local file systems for supported `.mp3` media. It asynchronously parses binary audio files on the fly to extract embedded ID3 metadata tags (Title, Artist, Album, and Duration), feeding that data directly back into the application state for the UI to render.

---

## Key Features

* **Playback Controls:** Play, pause, stop, and skip tracks interactively using keyboard inputs.
* **Asynchronous Execution:** Background audio playback that keeps the terminal interface fully responsive.
* **Dynamic Visuals:** A real-time updating progress bar and rendering of metadata/ASCII art that updates dynamically upon track changes.
* **Automated Queueing:** Automatic progression to the next available track in the directory upon song completion.

---

## Tech Stack

* **Runtime:** Node.js
* **Interface:** Ink (React in the Terminal) & Babel
* **System Operations:** Node `fs`, `path`, and `child_process`
* **Data Extraction:** `music-metadata`

---

## Installation

1. Clone the repository and navigate to the project directory.
2. Install the required dependencies:
   ```bash
   npm install
   Ensure you have a directory named songs in the project root containing valid .mp3 files.

Launch the application:

Bash
npm start


Keyboard Controls
[Up Arrow] / [Down Arrow] : Navigate through the playlist queue.

[Enter] : Play the currently selected track.

[Spacebar] : Toggle pause and resume for the active track.

[Q] : Safely terminate the audio process and quit the application.