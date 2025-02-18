'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function GsapForm() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const creativeRef = useRef<HTMLSpanElement>(null);
  const stakingRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    if (sectionRef.current && containerRef.current && creativeRef.current && stakingRef.current) {
      // Hide spans initially
      gsap.set(containerRef.current?.querySelectorAll("span"), {
        visibility: "hidden",
        opacity: 0
      });

      // Create timeline with ScrollTrigger
      const tl = gsap.timeline({
        defaults: { duration: 1 },
        scrollTrigger: {
          trigger: sectionRef.current,  // Use ref for trigger
          pin: true,
          scrub: true,
          start: "top top",  // Pin starts when the top of the section hits the top of the viewport
          end: "+=3000",     // Scroll until 3000px
          markers: true      // Debugging markers
        }
      });

      // Animation sequence
      tl.to(containerRef.current, {
        height: "100%",
        width: "100%",
        duration: 2,
        borderRadius: 0
      })
      .to(creativeRef.current, { opacity: 1, visibility: "visible" })
      .to(stakingRef.current, { opacity: 1, visibility: "visible" })
      .to(containerRef.current?.querySelectorAll("span"), { opacity: 0, visibility: "hidden" })
      .to(containerRef.current, {
        height: '240px',
        width: '360px',
        borderRadius: '12px'
      });
      
      // Cleanup on component unmount
      return () => {
        if (tl.scrollTrigger) {
          tl.scrollTrigger.kill();
        }
        tl.kill();
      };
    }
  }, []);

  return (
    <div ref={sectionRef} className="flex flex-col items-center justify-center min-h-[200vh]">
      <div
        ref={containerRef}
        id="container"
        className="p-16 rounded-xl w-[360px] h-[240px] bg-[#859ca8] text-white text-[300px] uppercase leading-[250px] tracking-[-16.875px] font-bold flex flex-col"
      >
        {/* <span ref={creativeRef} id="creative">Text 1</span>
        <span ref={stakingRef} id="staking">Text 2</span> */}
      </div>
    </div>
  );
}
