'use client';

import React, { useRef, useEffect, useState, ReactNode } from 'react';

interface AnimateOnScrollProps {
    children: ReactNode;
    className?: string;
    threshold?: number;
    triggerOnce?: boolean;
}

const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({
    children,
    className = '',
    threshold = 0.1,
    triggerOnce = true
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  // Specify the element type for the ref
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Ensure IntersectionObserver is available (client-side)
    if (typeof IntersectionObserver === 'undefined') {
        console.warn('IntersectionObserver is not supported in this environment.');
        setIsVisible(true); // Default to visible if observer isn't supported
        return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (triggerOnce && elementRef.current) {
              observer.unobserve(elementRef.current);
            }
          } else {
            if (!triggerOnce) {
              setIsVisible(false);
            }
          }
        });
      },
      { threshold: threshold }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    // Cleanup function
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, triggerOnce]); // Dependencies array

  const baseClasses = 'transition-all duration-600 ease-out';
  const hiddenStateClasses = 'opacity-0 translate-y-[30px]';
  const visibleStateClasses = 'opacity-100 translate-y-0';

  return (
    <div
      ref={elementRef}
      className={`${className} ${baseClasses} ${isVisible ? visibleStateClasses : hiddenStateClasses}`}
    >
      {children}
    </div>
  );
};

export default AnimateOnScroll;