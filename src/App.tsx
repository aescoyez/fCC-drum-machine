import { useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const [display, setDisplay] = useState<string>("");
  const audioRefs = useRef<{[key: string]: HTMLAudioElement | null}>({});

  const audioBank: {[key: string]: string}[] = [
    {id: "Heater 1", key: "Q", link: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3"},
    {id: "Heater 2", key: "W", link: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3"},
    {id: "Heater 3", key: "E", link: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3"},
    {id: "Heater 4", key: "A", link: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3"},
    {id: "Clap", key: "S", link: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3"},
    {id: "Open-HH", key: "D", link: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3"},
    {id: "Kick-n'-Hat", key: "Z", link: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3"},
    {id: "Kick", key: "X", link: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3"},
    {id: "Closed-HH", key: "C", link: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3"},
  ]
  
  const playAudio = (id: string) => {
    const audioElement = audioRefs.current[id];
    if (audioElement) {
      audioElement.play();
      setDisplay(id);
    }
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    event.preventDefault();
    const button = audioBank.find((audio) => audio.key === event.key.toUpperCase());
    if (button) {
      playAudio(button.id);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div>
      <div className="background">
        <div id="drum-machine">
          <div className="pad">
            {audioBank.map((el) => (
              <button className="drum-pad" id={el.id} onClick={() => playAudio(el.id)}>
              {el.key}<audio ref={(e) => (audioRefs.current[el.id] = e)} src={el.link} className="clip" id={el.key}></audio>
            </button>
            ))}
          </div>
          <div className="display-container">
            <div id="display">
              {display}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
