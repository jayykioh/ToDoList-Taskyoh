import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useLocation } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../lib/axios';

const PETS = ['/poke.gif', '/poke2.gif', '/poke3.gif', '/poke4.gif'];

const PetBot = () => {
  const [messages, setMessages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [petIndex, setPetIndex] = useState(0);
  const [position, setPosition] = useState(0); // -1: left, 0: center, 1: right
  
  const location = useLocation();

  // Only show on specific routes
  const allowedRoutes = ['/app', '/pomodoro'];
  const shouldShow = allowedRoutes.includes(location.pathname);

  // Fetch messages from backend
  useEffect(() => {
    if (!shouldShow) return;

    const fetchMessages = async () => {
      try {
        const response = await api.get('/messages');
        console.log('Messages loaded:', response.data);
        if (response.data && response.data.length > 0) {
          setMessages(response.data);
          setShowNotification(true);
        }
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    fetchMessages();
  }, [shouldShow]);

  // Auto-change pet every 10 seconds
  useEffect(() => {
    if (!shouldShow) return;

    const interval = setInterval(() => {
      setPetIndex((prev) => (prev + 1) % PETS.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [shouldShow]);

  // Pet walking animation (left-right movement)
  useEffect(() => {
    if (!shouldShow) return;

    const interval = setInterval(() => {
      setPosition((prev) => {
        if (prev === 1) return -1; // right to left
        return prev + 1; // move right
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [shouldShow]);

  // Auto-cycle messages every 12 seconds
  useEffect(() => {
    if (!shouldShow || messages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % messages.length;
        setShowNotification(true);
        return nextIndex;
      });
    }, 12000);

    return () => clearInterval(interval);
  }, [shouldShow, messages.length]);

  // Auto-hide notification after 5 seconds
  useEffect(() => {
    if (!showNotification) return;

    const timer = setTimeout(() => {
      setShowNotification(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [showNotification, currentIndex]);

  const handlePetClick = () => {
    if (messages.length > 0) {
      setShowNotification((prev) => !prev);
    }
  };

  const handleCloseNotification = (e) => {
    e.stopPropagation();
    setShowNotification(false);
  };

  const currentMessage = messages[currentIndex];

  if (!shouldShow) return null;

  return (
    <div className="fixed bottom-6 left-10 z-50">
      {/* Notification Bubble - Modern Apple Style */}
      <AnimatePresence>
        {showNotification && currentMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute bottom-full left-0 mb-4 w-64 origin-bottom-left"
          >
            <div className="relative bg-white/70 dark:bg-black/60 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] p-5">
              
              {/* Message content */}
              <div className="text-center">
                <p className="text-sm font-medium text-gray-800 dark:text-gray-100 leading-relaxed">
                  {currentMessage?.message}
                </p>
              </div>

              {/* Speech bubble tail */}
              <div className="absolute -bottom-2 left-8 w-3 h-3 bg-white/70 dark:bg-black/60 backdrop-blur-xl border-r border-b border-white/20 dark:border-white/10 rotate-45"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pet GIF - Walking animation */}
      <motion.div
        className="relative cursor-pointer"
        onClick={handlePetClick}
        animate={{ x: position === -1 ? -20 : position === 1 ? 20 : 0 }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl transform scale-75"></div>
          
          {/* Pet Image - Smaller size (w-16 h-16) */}
          <img
            src={PETS[petIndex]}
            alt="Virtual Pet"
            className="relative w-16 h-16 object-contain drop-shadow-lg"
          />
          
          {/* Notification indicator */}
          <AnimatePresence>
            {!showNotification && messages.length > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute top-0 right-1 w-2.5 h-2.5 bg-red-500 rounded-full shadow-lg border-2 border-white dark:border-black"
              >
                <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default PetBot;
