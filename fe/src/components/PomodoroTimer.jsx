import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Music, Volume2, Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const MODES = {
  FOCUS: { id: 'focus', label: 'Focus', time: 25 * 60, color: 'text-teal-600 dark:text-teal-400', bg: 'bg-teal-500', ring: 'ring-teal-500/30' },
  SHORT_BREAK: { id: 'short', label: 'Short Break', time: 5 * 60, color: 'text-blue-500 dark:text-blue-400', bg: 'bg-blue-500', ring: 'ring-blue-500/30' },
  LONG_BREAK: { id: 'long', label: 'Long Break', time: 15 * 60, color: 'text-indigo-500 dark:text-indigo-400', bg: 'bg-indigo-500', ring: 'ring-indigo-500/30' },
};

const SOUNDS = [
  { id: 'none', label: 'Silent' },
  { id: 'rain', label: 'Rain' },
  { id: 'forest', label: 'Forest' },
  { id: 'cafe', label: 'Cafe' },
];

const PomodoroTimer = () => {
  const [mode, setMode] = useState('FOCUS');
  const [timeLeft, setTimeLeft] = useState(MODES.FOCUS.time);
  const [isActive, setIsActive] = useState(false);
  const [volume, setVolume] = useState(50);
  const [selectedSound, setSelectedSound] = useState('none');
  const [sessions, setSessions] = useState(0);
  
  const timerRef = useRef(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      clearInterval(timerRef.current);
      handleTimerComplete();
    }
    return () => clearInterval(timerRef.current);
  }, [isActive, timeLeft]);

  const handleTimerComplete = () => {
    if (mode === 'FOCUS') {
      const newSessions = sessions + 1;
      setSessions(newSessions);
      if (newSessions % 4 === 0) {
        switchMode('LONG_BREAK');
      } else {
        switchMode('SHORT_BREAK');
      }
    } else {
      switchMode('FOCUS');
    }
  };

  const switchMode = (newModeKey) => {
    setMode(newModeKey);
    setTimeLeft(MODES[newModeKey].time);
    setIsActive(false);
  };

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(MODES[mode].time);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentMode = MODES[mode];

  return (
    <Card className="w-full max-w-sm mx-auto p-6 bg-white/40 dark:bg-black/40 border-white/20 dark:border-white/5 backdrop-blur-2xl shadow-2xl rounded-3xl overflow-hidden relative">
      {/* Ambient Glow */}
      <div className={cn("absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 opacity-30 blur-3xl transition-colors duration-700 pointer-events-none", currentMode.bg)} />

      <div className="flex flex-col gap-5 relative z-10">
        {/* Mode Selector */}
        <div className="flex justify-center">
          <div className="flex p-1 bg-zinc-100/50 dark:bg-zinc-900/50 rounded-full border border-white/10 backdrop-blur-sm">
            {Object.keys(MODES).map((key) => (
              <button
                key={key}
                onClick={() => switchMode(key)}
             className={cn(
  "relative px-5 py-1.5 text-xs font-semibold rounded-full transition-colors duration-300 z-10 focus:outline-none focus:ring-0 whitespace-nowrap",
  mode === key ? "text-white" : "text-muted-foreground hover:text-foreground"
)}
              >
                {mode === key && (
                  <motion.div
                    layoutId="activeMode"
                    className={cn("absolute inset-0 rounded-full shadow-sm", MODES[key].bg)}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{MODES[key].label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Timer Display */}
        <div className="flex flex-col items-center justify-center py-4 space-y-4">
          <div className="relative">
            <motion.div
              key={mode}
              initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.5 }}
              className={cn("text-7xl font-light tracking-tighter tabular-nums select-none drop-shadow-sm", currentMode.color)}
            >
              {formatTime(timeLeft)}
            </motion.div>
            
            {/* Active Pulse Ring */}
            {isActive && (
               <motion.div
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: [0, 0.15, 0], scale: 1.1 }}
                 transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
                 className={cn("absolute inset-0 rounded-full blur-2xl -z-10", currentMode.bg)}
               />
            )}
          </div>

          {/* Session Info */}
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100/50 dark:bg-zinc-900/50 border border-white/5"
          >
            <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", isActive ? "bg-green-500" : "bg-zinc-400")} />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Session {sessions + 1}
            </span>
          </motion.div>
        </div>

        {/* Volume Slider */}
        <div className="px-4">
          <div className="relative flex items-center group h-6">
            <Volume2 className="h-3.5 w-3.5 text-muted-foreground mr-3" />
            <div className="relative flex-1 flex items-center">
                <Slider
                value={[volume]}
                max={100}
                step={1}
                onValueChange={(val) => setVolume(val[0])}
                className="cursor-pointer"
              />
              {/* Running Particle */}
              <motion.div 
                className={cn("absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.2)] pointer-events-none", currentMode.bg)}
                style={{ left: `${volume}%` }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-8 pt-2 pb-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={resetTimer}
            className="h-10 w-10 rounded-full text-muted-foreground hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all focus:outline-none focus:ring-0"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTimer}
            className={cn(
              "h-16 w-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 focus:outline-none focus:ring-0",
              isActive 
                ? "bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 text-foreground" 
                : "bg-gradient-to-br from-teal-400 to-emerald-500 text-white shadow-teal-500/30"
            )}
          >
            <AnimatePresence mode="wait">
              {isActive ? (
                <motion.div
                  key="pause"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                >
                  <Pause className="h-6 w-6 fill-current" />
                </motion.div>
              ) : (
                <motion.div
                  key="play"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                >
                  <Play className="h-6 w-6 fill-current ml-1" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full text-muted-foreground hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all focus:outline-none focus:ring-0"
              >
                 <Music className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-3 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border-white/20 shadow-xl rounded-2xl" sideOffset={10}>
              <div className="space-y-2">
                <h4 className="font-semibold text-xs text-muted-foreground mb-2 px-1">Soundscapes</h4>
                <div className="grid grid-cols-1 gap-1">
                  {SOUNDS.map((sound) => (
                    <button
                      key={sound.id}
                      onClick={() => setSelectedSound(sound.id)}
                      className={cn(
                        "px-3 py-2 text-xs font-medium rounded-lg transition-all duration-200 text-left focus:outline-none focus:ring-0 flex items-center justify-between",
                        selectedSound === sound.id
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-muted-foreground"
                      )}
                    >
                      {sound.label}
                      {selectedSound === sound.id && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                    </button>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </Card>
  );
};

export default PomodoroTimer;
