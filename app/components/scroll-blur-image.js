'use client';

import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ScrollBlurImage = ({ imageUrl }) => {
  const controls = useAnimation();
  const { ref, inView } = useInView();

  const variants = {
    visible: { filter: 'blur(0px)' },
    hidden: { filter: 'blur(8px)' }
  };

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  return (
    <motion.img
      ref={ref}
      src={imageUrl}
      alt=""
      initial="hidden"
      animate={controls}
      variants={variants}
      transition={{ duration: 0.5 }}
      className="w-full max-w-full h-auto mb-4 drop-shadow-none will-change-auto"
    />
  );
};

export default ScrollBlurImage;
