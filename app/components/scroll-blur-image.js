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
      className="w-full h-auto mx-4 mb-4 drop-shadow-none"
    />
  );
};

export default ScrollBlurImage;
