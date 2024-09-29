'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const randomCharacters = '@#$%&*+=-:.';
const scrambleDuration = 2000; // 2 seconds for scramble
const holdDuration = 5000; // 5 seconds for holding stable texts

// Function to generate random scrambled text
const getRandomScrambledText = length => {
  return Array.from({ length }, () =>
    randomCharacters.charAt(Math.floor(Math.random() * randomCharacters.length))
  ).join('');
};

const ScrambledText = () => {
  const [displayText, setDisplayText] = useState('hael.cc'); // Default text
  const [isHovering, setIsHovering] = useState(false); // Track mouse hover

  useEffect(() => {
    let interval;
    if (isHovering) {
      // Start animation on hover
      const cycleText = () => {
        // Scramble the text during mouse hover
        interval = setInterval(() => {
          setDisplayText(getRandomScrambledText(16)); // Scramble for 16 characters
        }, 100);

        // Stop scrambling and display "michael ciccarelli" after scrambleDuration
        setTimeout(() => {
          clearInterval(interval);
          setDisplayText('michael ciccarelli');

          // After holding "michael ciccarelli", reset back to "hael.cc" after holdDuration
          setTimeout(() => {
            setDisplayText('hael.cc');
          }, holdDuration);
        }, scrambleDuration);
      };

      cycleText();
    } else {
      // Reset text when hover ends
      setDisplayText('hael.cc');
    }

    return () => clearInterval(interval); // Clean up the interval when component unmounts or hover ends
  }, [isHovering]);

  return (
    <div
      className="flex items-center cursor-default"
      onMouseEnter={() => setIsHovering(true)} // Start animation on mouse over
      onMouseLeave={() => setIsHovering(false)} // Reset animation on mouse leave
    >
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
        {displayText}
      </motion.div>
    </div>
  );
};

export default ScrambledText;
