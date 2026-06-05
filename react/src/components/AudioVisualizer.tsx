import { useState, useEffect } from 'react';

declare global {
  interface Window {
    wallpaperRegisterAudioListener?: (callback: (samples: number[]) => void) => void;
    wallpaperRegisterMediaPropertiesListener?: (callback: (event: any) => void) => void;
    wallpaperRegisterMediaThumbnailListener?: (callback: (event: any) => void) => void;
  }
}

export const AudioVisualizer = () => {
  const [title, setTitle] = useState('Macarena'); // Donnée de test
  const [artist, setArtist] = useState('Damso'); // Donnée de test
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  
  const [audioBars, setAudioBars] = useState<number[]>(new Array(40).fill(0));

  useEffect(() => {
    if (window.wallpaperRegisterAudioListener) {
      window.wallpaperRegisterAudioListener((samples) => {
        const leftChannel = samples.slice(0, 40);
        setAudioBars(leftChannel);
      });
    } else {
      const mockTimer = setInterval(() => {
        setAudioBars(Array.from({ length: 40 }, () => Math.random() * 1.5));
      }, 100);
      return () => clearInterval(mockTimer);
    }
  }, []);

  useEffect(() => {
    if (window.wallpaperRegisterMediaPropertiesListener) {
      window.wallpaperRegisterMediaPropertiesListener((event) => {
        setTitle(event.title || 'En attente...');
        setArtist(event.artist || 'Système Audio');
      });
    }

    if (window.wallpaperRegisterMediaThumbnailListener) {
      window.wallpaperRegisterMediaThumbnailListener((event) => {
        setThumbnail(event.thumbnail || null);
      });
    }
  }, []);

  return (
    <div className="w-full h-full flex flex-col font-retro tracking-widest text-white">
      
      {/* 1. Titre et Artiste */}
      <div className="mb-2">
        {/* truncate permet de couper le titre avec "..." s'il est trop long */}
        <div className="text-xl truncate">{title}</div>
        <div className="text-sm text-white/70 truncate">{artist}</div>
      </div>

      {/* 2. Pochette + Visualiseur */}
      <div className="flex flex-1 items-end gap-4 overflow-hidden mb-2">
        
        {/* La Pochette (Thumbnail) */}
        <div className="w-20 h-20 shrink-0 border border-cyber-neon relative overflow-hidden bg-cyber-dark flex items-center justify-center">
          {thumbnail ? (
            <>
              <img src={thumbnail} alt="Cover" className="w-full h-full object-cover grayscale opacity-80" />
              {/* Filtre magenta par dessus la pochette */}
              <div className="absolute inset-0 bg-cyber-neon mix-blend-overlay opacity-50 pointer-events-none"></div>
            </>
          ) : (
            // Image par défaut si pas de pochette
            <div className="text-cyber-neon/50 text-xs text-center px-1">NO COVER</div>
          )}
        </div>

        <div className="flex-1 flex items-end justify-between h-full pb-1 gap-[2px]">
          {audioBars.map((value, index) => {
            let height = Math.min((value * 100), 100);
            if (height < 2) height = 2; 

            return (
              <div 
                key={index} 
                className="w-full bg-cyber-neon"
                style={{ height: `${height}%` }}
              ></div>
            );
          })}
        </div>
      </div>

      {/* 3. Statut */}
      <div className="text-sm mt-auto">
        Playing <span className="animate-blink">_</span>
      </div>

    </div>
  );
};