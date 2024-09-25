'use client';

export default function IconC() {
  const scrollToTop = () => {
    window?.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    // <svg width="37" height="44" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={scrollToTop}>
    //   <path
    //     d="M13.79 4.03c0-1.293.578-2.451 1.491-3.23-.126.069-.25.142-.373.22L2.661 8.878A5.783 5.783 0 0 0 0 13.745v16.812a5.783 5.783 0 0 0 2.66 4.868l12.248 7.856c.122.079.247.152.373.22a4.232 4.232 0 0 1-1.491-3.229V4.03ZM22.272 4.03A4.232 4.232 0 0 0 20.78.8c.127.069.251.142.373.22l12.248 7.857a5.783 5.783 0 0 1 2.66 4.868v3.972h-13.79V4.03ZM22.272 26.2v14.072a4.231 4.231 0 0 1-1.492 3.23c.127-.069.251-.142.373-.22l12.248-7.857a5.783 5.783 0 0 0 2.66-4.868v-4.358h-13.79Z"
    //     fill="currentColor"
    //   />
    // </svg>
    <svg width="26" height="30" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={scrollToTop}>
      <path
        d="M23.148 22.077a11.33 11.33 0 0 1-8.548 3.88c-6.271 0-11.355-5.085-11.355-11.357C3.245 8.33 8.329 3.245 14.6 3.245c3.409 0 6.466 1.501 8.548 3.879L26 5.477A14.573 14.573 0 0 0 14.6 0C6.537 0 0 6.537 0 14.6c0 8.064 6.537 14.6 14.6 14.6 4.612 0 8.724-2.138 11.4-5.477l-2.852-1.646Z"
        fill="#D6DBDC"
      />
      <path
        d="M23.148 22.077a11.33 11.33 0 0 1-8.548 3.88c-6.271 0-11.355-5.085-11.355-11.357C3.245 8.33 8.329 3.245 14.6 3.245c3.409 0 6.466 1.501 8.548 3.879L26 5.477A14.573 14.573 0 0 0 14.6 0C6.537 0 0 6.537 0 14.6c0 8.064 6.537 14.6 14.6 14.6 4.612 0 8.724-2.138 11.4-5.477l-2.852-1.646Z"
        fill="url(#a)"
      />
      <g style={{ MixBlendMode: 'lighten' }} filter="url(#b)">
        <path
          d="M20.393 19.661a7.602 7.602 0 0 1-5.733 2.6c-4.207 0-7.617-3.407-7.617-7.61s3.41-7.61 7.617-7.61a7.602 7.602 0 0 1 5.733 2.6l1.913-1.104a9.778 9.778 0 0 0-7.646-3.67c-5.409 0-9.793 4.38-9.793 9.784 0 5.404 4.384 9.784 9.793 9.784a9.778 9.778 0 0 0 7.646-3.67l-1.913-1.104Z"
          fill="#D6DBDC"
        />
        <path
          d="M20.393 19.661a7.602 7.602 0 0 1-5.733 2.6c-4.207 0-7.617-3.407-7.617-7.61s3.41-7.61 7.617-7.61a7.602 7.602 0 0 1 5.733 2.6l1.913-1.104a9.778 9.778 0 0 0-7.646-3.67c-5.409 0-9.793 4.38-9.793 9.784 0 5.404 4.384 9.784 9.793 9.784a9.778 9.778 0 0 0 7.646-3.67l-1.913-1.104Z"
          fill="url(#c)"
        />
      </g>
      <defs>
        <linearGradient id="a" x1="25.956" y1="29.201" x2="0" y2="29.201" gradientUnits="userSpaceOnUse">
          <stop stopColor="#161616" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="c" x1="4.867" y1="24.435" x2="22.306" y2="24.435" gradientUnits="userSpaceOnUse">
          <stop stopColor="#161616" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <filter
          id="b"
          x=".867"
          y=".867"
          width="25.439"
          height="27.568"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_0_3" />
          <feBlend in="SourceGraphic" in2="effect1_backgroundBlur_0_3" result="shape" />
        </filter>
      </defs>
    </svg>
  );
}
