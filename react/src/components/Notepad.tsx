import { useState, useEffect } from 'react';

export const Notepad = () => {
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const savedNotes = localStorage.getItem('cyber-notepad');
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setNotes(newText);
    localStorage.setItem('cyber-notepad', newText);
  };

  return (
    <div className="w-full h-full relative font-retro text-base">
      
      <div className="absolute inset-0 whitespace-pre-wrap break-words pointer-events-none text-cyber-neon leading-relaxed">
        {notes.length === 0 ? '> SYSTÈME PRÊT. ENTREZ VOS NOTES ICI...' : notes}
        <span className="animate-blink font-bold ml-1">_</span>
      </div>

      <textarea
        value={notes}
        onChange={handleChange}
        spellCheck="false"
        className="absolute inset-0 w-full h-full bg-transparent text-transparent caret-transparent resize-none focus:outline-none leading-relaxed z-10 selection:bg-cyber-neon/30 selection:text-white"
      />

    </div>
  );
};