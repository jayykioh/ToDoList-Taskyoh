import React from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router'
import { Button } from '@/components/ui/button'
import { ListTodo, Timer, Sun, Moon, Sparkles, Palette } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useBackground } from '@/components/BackgroundContext'

const Header = () => {
  const [theme, setTheme] = React.useState('light');
  const location = useLocation();
  const { cycleTheme, currentTheme } = useBackground();

  React.useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const navItems = [
    { path: '/app', label: 'Tasks', icon: ListTodo },
    { path: '/pomodoro', label: 'Focus', icon: Timer },
  ];

  return (
    <header 
      className="w-full bg-white/40 dark:bg-black/40 backdrop-blur-2xl border border-white/20 dark:border-white/5 shadow-2xl rounded-3xl overflow-hidden relative"
    >
      <div className="px-6 h-16 flex items-center justify-between relative z-10">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Sparkles className="h-5 w-5 text-primary transition-transform group-hover:rotate-12" />
          </div>
          <span className="font-bold text-xl tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
            Taskyoh
          </span>
        </Link>

        {/* Navigation Section */}
        <nav className="hidden md:flex items-center gap-1 bg-zinc-100/50 dark:bg-zinc-900/50 p-1 rounded-full border border-white/10">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link key={item.path} to={item.path}>
                <div className={cn(
                  "relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2",
                  isActive 
                    ? "text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground hover:bg-white/10 dark:hover:bg-white/5"
                )}>
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-primary rounded-full shadow-sm"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Actions Section */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={cycleTheme}
            className="rounded-full hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 transition-transform hover:scale-105 active:scale-95 group"
            title={`Current Theme: ${currentTheme.label}`}
          >
            <Palette className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="sr-only">Switch Background Theme</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 transition-transform hover:scale-105 active:scale-95"
          >
            <motion.div
              key={theme}
              initial={{ rotate: -90, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </motion.div>
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header
