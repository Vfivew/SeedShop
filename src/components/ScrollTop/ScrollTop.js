import React from 'react';
import { useState, useEffect } from 'react';

import './ScrollTop.css'

const ScrollToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
          setShowTopBtn(true);
        } else {
          setShowTopBtn(false);
      }
  };

    const debouncedHandleScroll = debounce(handleScroll, 500); 

    window.addEventListener("scroll", debouncedHandleScroll);

    return () => {
        window.removeEventListener("scroll", debouncedHandleScroll);
      };
    }, []);

    const goToTop = () => {
        console.log('effectdadada')
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

function debounce(func, delay) {
  let timerId;
  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => func.apply(this, args), delay);
  };
}

    
  return (
    <div className="top-to-btm">
      {showTopBtn && (
        <div className="icon-position icon-style" onClick={goToTop}>
          ⇫
        </div>
      )}
    </div>
  );
};


export default ScrollToTop;