'use client';

import React from 'react';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const generateInlineBlurStyles = value => ({
  WebkitBackfaceVisibility: 'hidden',
  MozBackfaceVisibility: 'hidden',
  WebkitTransform: 'translate3d(0, 0, 0)',
  MozTransform: 'translate3d(0, 0, 0)',
  WebkitFilter: `blur(${value}px)`,
  filter: `blur(${value}px)`
});

const ScrollBlurImage = ({ imageUrl }) => {
  const controls = useAnimation();
  const { ref, inView } = useInView();

  const variants = {
    visible: { ...generateInlineBlurStyles(0) },
    hidden: { ...generateInlineBlurStyles(8) }
  };

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  return (
    <AnimatePresence>
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
    </AnimatePresence>
  );
};

export default ScrollBlurImage;
