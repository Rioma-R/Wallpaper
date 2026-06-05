import "./App.css";
import { WindowBox } from "./components/WindowBox";
import { WorldClock } from "./components/WorldClock";
import { Notepad } from "./components/Notepad";
import { Calendar } from "./components/Calendar";
import { AudioVisualizer } from "./components/AudioVisualizer";

function App() {
  return (
    <div className="h-screen w-screen bg-cyber-bg text-cyber-neon p-4 font-retro overflow-hidden">
      <div className="grid grid-cols-[1fr_1.5fr_1fr] gap-4 h-full w-full">
        
        <div className="flex flex-col gap-4 h-full">
          <WindowBox title="City" className="flex-[2] relative">
            <div className="w-full h-full flex items-center justify-center">
              <img src="./loop.gif" alt="Cyber City" className="max-w-full max-h-full object-contain" />
            </div>
            <div className="absolute inset-0 bg-cyber-neon mix-blend-overlay opacity-10 pointer-events-none"></div>
          </WindowBox>
          <WindowBox title="SYS_INFO" className="flex-[1]">
            <div className="flex flex-col gap-3 h-full justify-center text-sm">
              <div>
                <div className="flex justify-between mb-1">
                  <span>CPU_CORES</span>
                  <span>{navigator.hardwareConcurrency || 8}</span>
                </div>
                <div className="w-full bg-cyber-dark h-2 border border-cyber-neon/50">
                  <div className="bg-cyber-neon h-full w-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>DISK_C:\</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-cyber-dark h-2 border border-cyber-neon/50">
                  <div className="bg-cyber-neon h-full w-[75%]"></div>
                </div>
              </div>
            </div>
          </WindowBox>
        </div>

        <div className="flex flex-col gap-4 h-full">
          <WindowBox title="Audio" className="flex-[1]">
            <AudioVisualizer />
          </WindowBox>
          <WindowBox title="Notepad" className="flex-[3]">
            <Notepad />
          </WindowBox>
          <WindowBox title="World Clock" className="flex-[1]">
            <WorldClock />
          </WindowBox>
        </div>

        <div className="flex flex-col gap-4 h-full">
          <WindowBox title="Calendar" className="flex-[1]">
            <Calendar />
          </WindowBox>
          <WindowBox title="City" className="flex-[5] relative">
            <div className="w-full h-full flex items-center justify-center">
              <img src="./loop2.gif" alt="Cyber City" className="max-w-full max-h-full object-contain" />
            </div>
            <div className="absolute inset-0 bg-cyber-neon mix-blend-overlay opacity-10 pointer-events-none"></div>
          </WindowBox>
        </div>
        
      </div>
    </div>
  );
}

export default App;