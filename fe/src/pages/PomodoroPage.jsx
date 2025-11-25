import React from 'react';
import { motion } from 'framer-motion';
import PomodoroTimer from '@/components/PomodoroTimer';
import Header from '@/components/Header';
import CozyBackground from '@/components/CozyBackground';

const PomodoroPage = () => {
  return (
    <div className="min-h-screen w-full bg-zinc-50 dark:bg-zinc-950 transition-colors duration-500 relative overflow-hidden">
      {/* Cozy 3D Background */}
      <div className="absolute inset-0 z-0">
        <CozyBackground />
      </div>

      {/* Content */}
      <div className='container pt-8 mx-auto relative z-10'>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className='w-full max-w-2xl p-6 mx-auto space-y-8'
        >
          <Header />
          <PomodoroTimer />
        </motion.div>
      </div>
      
      {/* Vignette Overlay for focus */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none z-0" />
    </div>
  );
};

export default PomodoroPage;
