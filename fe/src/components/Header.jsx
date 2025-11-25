import React from 'react'
import { motion } from 'framer-motion'

const Header = () => {
  return (
    <div className='space-y-2 text-center'>
      <motion.h1 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className='text-4xl font-bold text-center text-transparent bg-primary bg-clip-text'
      >
        Taskyoh - Task Manager
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className='text-muted-foreground'
      >
        Làm đi nha hehe
      </motion.p>
    </div>
  )
}

export default Header
