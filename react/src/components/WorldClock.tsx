import { useState, useEffect } from 'react';

export const WorldClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Formateurs pour l'heure
  const timeFormatterLocal = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Brussels',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false
  });
  
  const timeFormatterJp = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Tokyo',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false
  });

  // Formateurs pour la date (Séparés pour gérer le décalage de minuit)
  const dateFormatterLocal = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Brussels',
    day: '2-digit', month: 'long'
  });

  const dateFormatterTokyo = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Tokyo',
    day: '2-digit', month: 'long'
  });

  // Récupération des heures
  const localTimeStr = timeFormatterLocal.format(time);
  const tokyoTimeStr = timeFormatterJp.format(time);
  
  // Récupération des dates pour Charleroi
  const localDateParts = dateFormatterLocal.formatToParts(time);
  const localDay = localDateParts.find(p => p.type === 'day')?.value;
  const localMonth = localDateParts.find(p => p.type === 'month')?.value;

  // Récupération des dates pour Tokyo
  const tokyoDateParts = dateFormatterTokyo.formatToParts(time);
  const tokyoDay = tokyoDateParts.find(p => p.type === 'day')?.value;
  const tokyoMonth = tokyoDateParts.find(p => p.type === 'month')?.value;

  return (
    <div className="flex justify-around items-center w-full h-full font-retro tracking-widest">
      <div className="flex flex-col gap-2">
        <span className="text-white text-xl">Charleroi</span>
        <span className="text-4xl">
          <span className="text-cyber-neon">{localTimeStr.slice(0, 2)}</span>
          <span className="text-white">{localTimeStr.slice(2)}</span>
        </span>
        <span className="text-cyber-neon text-xl mt-1">
          {localDay} <span className="text-white">{localMonth}</span>
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-white text-xl">Tokyo</span>
        <span className="text-4xl">
          <span className="text-cyber-neon">{tokyoTimeStr.slice(0, 2)}</span>
          <span className="text-white">{tokyoTimeStr.slice(2)}</span>
        </span>
        <span className="text-cyber-neon text-xl mt-1">
          {tokyoDay} <span className="text-white">{tokyoMonth}</span>
        </span>
      </div>
    </div>
  );
};