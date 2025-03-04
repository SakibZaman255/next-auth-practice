'use client'
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register the ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ImageData {
  id: number;
  src: string;
  alt: string;
}

const ImageSlider = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<Array<HTMLDivElement | null>>([]);
  const textRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Sample image data (replace with your own images)
  const images: ImageData[] = [
    { id: 1, src: "/images/image1.jpg", alt: "Beautiful landscape" },
    { id: 2, src: "/images/image2.jpg", alt: "City skyline" },
    { id: 3, src: "/images/image3.jpg", alt: "Ocean view" },
    { id: 4, src: "/images/image4.jpg", alt: "Mountain range" },
    { id: 5, src: "/images/image5.jpg", alt: "Forest scene" },
  ];

  useEffect(() => {
    // Set loaded state to true after component mounts
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    // Only run GSAP code after component has mounted and refs are populated
    if (!isLoaded || typeof window === 'undefined' || !containerRef.current) return;
    
    // Force a small delay to ensure DOM is fully ready
    const timer = setTimeout(() => {
      initAnimations();
    }, 100);
    
    return () => {
      clearTimeout(timer);
      // Clean up all ScrollTriggers when component unmounts
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isLoaded]);

  const initAnimations = () => {
    const ctx = gsap.context(() => {
      // Setup for smooth scrolling panel
      const sections = gsap.utils.toArray<HTMLElement>('.panel');
      
      // Initial state - hide all images and text
      gsap.set(imagesRef.current, { 
        y: '100vh', 
        opacity: 0,
        scale: 0.9
      });
      
      gsap.set(textRefs.current, {
        y: 50,
        opacity: 0
      });
      
      // Make sure container width is calculated correctly
      const totalWidth = containerRef.current!.scrollWidth;
      const sectionWidth = window.innerWidth;
      
      // Create the smooth scrolling effect
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          invalidateOnRefresh: true, // Recalculate on window resize
          end: () => `+=${totalWidth - sectionWidth}`
        }
      });
      
      // Animate each image and its text
      sections.forEach((section, i) => {
        if (i === 0) return; // Skip the intro panel
        
        const imageIndex = i - 1;
        if (!imagesRef.current[imageIndex] || !textRefs.current[imageIndex]) return;
        
        // Image animation
        ScrollTrigger.create({
          trigger: section,
          start: "left center",
          end: "right center",
          onEnter: () => {
            gsap.to(imagesRef.current[imageIndex], {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: "power3.out"
            });
            
            gsap.to(textRefs.current[imageIndex], {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: 0.3,
              ease: "power2.out"
            });
          },
          onLeaveBack: () => {
            gsap.to(imagesRef.current[imageIndex], {
              y: '100vh',
              opacity: 0,
              scale: 0.9,
              duration: 0.8,
              ease: "power3.in"
            });
            
            gsap.to(textRefs.current[imageIndex], {
              y: 50,
              opacity: 0,
              duration: 0.5,
              ease: "power2.in"
            });
          }
        });
      });
    }, containerRef);
  };

  return (
    <div className="overflow-hidden h-screen" ref={containerRef}>
      <div className="flex flex-nowrap h-screen">
        {/* Intro Panel */}
        <section className="panel flex-shrink-0 w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 to-black text-white">
          <div className="max-w-4xl text-center px-6">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Visual Journey
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Scroll horizontally to explore stunning visuals that slide into view
            </p>
            <div className="animate-bounce mt-16">
              <svg className="w-10 h-10 rotate-90 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </section>
        
        {/* Image Panels */}
        {images.map((image, index) => (
          <section key={image.id} className="panel flex-shrink-0 w-screen h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 to-black">
            {/* Background blur effect */}
            <div 
              className="absolute inset-0 opacity-20 blur-xl scale-110"
              style={{ 
                backgroundImage: `url(${image.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center max-w-7xl mx-4">
              <div 
                ref={el => { imagesRef.current[index] = el; }}
                className="w-full md:w-3/5 h-auto rounded-xl overflow-hidden shadow-2xl mb-6 md:mb-0 md:mr-8"
              >
                <div 
                  className="w-full h-80 md:h-96 lg:h-[500px] bg-cover bg-center rounded-xl transform transition-transform duration-700 hover:scale-105"
                  style={{ backgroundImage: `url(${image.src})` }}
                  role="img"
                  aria-label={image.alt}
                />
              </div>
              
              <div 
                ref={el => { textRefs.current[index] = el; }}
                className="w-full md:w-2/5 text-white p-6"
              >
                <span className="inline-block px-3 py-1 bg-indigo-500 text-white rounded-full text-sm font-semibold mb-4">
                  Image {image.id}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                  {image.alt}
                </h2>
                <p className="text-gray-300 text-lg md:text-xl mb-6">
                  Experience the beauty of this stunning visual scene. Each image tells its own unique story as you journey through this interactive gallery.
                </p>
                <div className="flex space-x-2">
                  <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                  <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                  <span className="w-3 h-3 rounded-full bg-pink-500"></span>
                </div>
              </div>
            </div>
          </section>
        ))}
        
        {/* Outro Panel */}
        <section className="panel flex-shrink-0 w-screen h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-black text-white">
          <div className="max-w-4xl text-center px-6">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Journey Complete
            </h2>
            <p className="text-xl md:text-2xl text-gray-300">
              Thank you for experiencing our visual showcase
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ImageSlider;