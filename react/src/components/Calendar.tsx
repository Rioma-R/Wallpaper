import { useState, useEffect } from "react";

export const Calendar = () => {
  const [time, setTime] = useState(new Date());

  // Mise à jour de l'heure chaque seconde
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 1. FORMATAGE DE L'HEURE
  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");
  // Petite logique pour afficher la lune la nuit et le soleil le jour
  const isNight = time.getHours() >= 18 || time.getHours() < 6;

  // 2. FORMATAGE DE LA DATE
  const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
  });
  const parts = dateFormatter.formatToParts(time);
  const dayStr = parts.find((p) => p.type === "day")?.value;
  const monthStr = parts.find((p) => p.type === "month")?.value;

  // 3. LOGIQUE DE LA GRILLE DU MOIS
  const year = time.getFullYear();
  const month = time.getMonth();
  const currentDay = time.getDate();

  // On calcule le nombre de jours dans le mois actuel
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // On trouve quel jour de la semaine est le 1er du mois (0 = Dimanche, 1 = Lundi...)
  const firstDayIndex = new Date(year, month, 1).getDay();
  // On ajuste pour que la semaine commence le lundi
  const startDay = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

  // On prépare les cases vides avant le 1er du mois
  const blanks = Array(startDay).fill(null);
  // On génère un tableau avec tous les jours du mois [1, 2, 3... 31]
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="flex justify-between items-center w-full h-full font-retro tracking-widest px-2">
      <div className="flex flex-col text-3xl leading-none gap-2">
        <div className="flex items-center gap-2">
          <span className="text-white">{hours}</span>
          <span className="text-cyber-neon text-3xl drop-shadow-[0_0_5px_rgba(255,0,255,0.8)]">
            {isNight ? "☾" : "☼"}
          </span>
        </div>
        <span className="text-white">{minutes}</span>
        <span className="text-white">{seconds}</span>
      </div>

      <div className="flex flex-col items-center justify-center mx-4">
        <span className="text-cyber-neon text-4xl">{dayStr}</span>
        <span className="text-white text-xl mt-1">{monthStr}</span>
      </div>

      <div className="grid grid-cols-7 gap-x-3 gap-y-1 text-xs text-white/50 text-right">
        {blanks.map((_, i) => (
          <div key={`blank-${i}`}></div>
        ))}
        {days.map((d) => (
          <div
            key={d}
            className={
              d === currentDay
                ? "text-cyber-neon font-bold drop-shadow-[0_0_5px_rgba(255,0,255,0.8)]"
                : ""
            }
          >
            {d.toString().padStart(2, "0")}
          </div>
        ))}
      </div>
    </div>
  );
};
