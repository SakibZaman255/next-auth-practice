'use client'
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface FeatureCard {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const ModernCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const mainTitleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Initialize empty array for refs
  useEffect(() => {
    cardsRef.current = cardsRef.current.slice(0, 4);
    // Mark component as loaded after first render
    setIsLoaded(true);
  }, []);

  const features: FeatureCard[] = [
    {
      id: 1,
      title: "Immersive Experiences",
      description: "Create stunning digital experiences that captivate your audience with smooth transitions and elegant design elements.",
      icon: "✨",
      color: "from-violet-600 to-indigo-600",
    },
    {
      id: 2,
      title: "Responsive Design",
      description: "Build interfaces that adapt seamlessly to any device, maintaining beauty and functionality across all screen sizes.",
      icon: "📱",
      color: "from-blue-600 to-cyan-600",
    },
    {
      id: 3,
      title: "Performance Optimized",
      description: "Deliver lightning-fast experiences with optimized animations and efficient rendering for maximum performance.",
      icon: "⚡",
      color: "from-emerald-600 to-teal-600",
    },
    {
      id: 4,
      title: "Accessible Design",
      description: "Ensure your beautiful animations and interfaces are accessible to everyone with carefully crafted interactions.",
      icon: "🌐",
      color: "from-rose-600 to-pink-600",
    },
  ];

  // Initialize GSAP animations after component fully mounts
  useEffect(() => {
    if (!isLoaded || typeof window === 'undefined' || !containerRef.current) return;
    
    // Delay initialization slightly to ensure DOM is ready
    const timer = setTimeout(() => {
      // Initialize GSAP animations after component mounts
      const ctx = gsap.context(() => {
        console.log("Initializing GSAP animations");
        
        // Set initial state for cards
        gsap.set(cardsRef.current, {
          y: 100,
          opacity: 0,
          scale: 0.95
        });
        
        // Set specific position for active card
        gsap.set(cardsRef.current[activeIndex], {
          scale: 1,
          y: 0,
          opacity: 1
        });
        
        // Set initial state for text elements
        gsap.set(mainTitleRef.current, {
          y: -50,
          opacity: 0
        });
        
        gsap.set(subtitleRef.current, {
          y: 30,
          opacity: 0
        });
        
        // Create animation timeline
        const tl = gsap.timeline();
        
        // Animate the main title and subtitle
        tl.to(mainTitleRef.current, {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out"
        })
        .to(subtitleRef.current, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out"
        }, "-=0.8")
        
        // Animate the feature cards in staggered fashion
        .to(cardsRef.current, {
          y: index => (index - activeIndex) * 20,
          opacity: index => index === activeIndex ? 1 : 0.6,
          scale: index => index === activeIndex ? 1 : 0.95,
          stagger: 0.2,
          duration: 0.8,
          ease: "back.out(1.4)"
        }, "-=0.5");
        
        // Store the timeline for future reference
        timelineRef.current = tl;
      }, containerRef);
      
      return () => ctx.revert(); // Clean up animations
    }, 100);
    
    return () => clearTimeout(timer);
  }, [isLoaded, activeIndex]);

  // Handle card transition when active card changes
  useEffect(() => {
    if (!isLoaded || cardsRef.current.length === 0) return;
    
    console.log("Active index changed to:", activeIndex);
    
    // Animate cards when active index changes
    gsap.to(cardsRef.current, {
      scale: index => index === activeIndex ? 1 : 0.95,
      y: index => (index - activeIndex) * 20,
      opacity: index => index === activeIndex ? 1 : 0.6,
      duration: 0.5,
      ease: "power2.out"
    });
  }, [activeIndex, isLoaded]);

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
  };

  const handleNextCard = () => {
    setActiveIndex((prev) => (prev + 1) % features.length);
  };

  const handlePrevCard = () => {
    setActiveIndex((prev) => (prev - 1 + features.length) % features.length);
  };

  // Particle animation effect
  useEffect(() => {
    if (!isLoaded || !containerRef.current) return;
    
    // Create a separate GSAP context for particles
    const particleCtx = gsap.context(() => {
      console.log("Initializing particle animations");
      
      const particlesCount = 25;
      const particles: HTMLDivElement[] = [];
      
      // Create particles
      for (let i = 0; i < particlesCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute rounded-full bg-white opacity-0';
        particle.style.width = `${Math.random() * 10 + 3}px`;
        particle.style.height = particle.style.width;
        
        containerRef.current!.appendChild(particle);
        particles.push(particle);
        
        // Animate each particle
        gsap.set(particle, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          opacity: 0
        });
        
        // Delay particle animation start for a more natural effect
        setTimeout(() => {
          animateParticle(particle);
        }, Math.random() * 1000);
      }
      
      function animateParticle(particle: HTMLDivElement) {
        gsap.to(particle, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          opacity: Math.random() * 0.4 + 0.1,
          duration: Math.random() * 15 + 5,
          ease: "power1.inOut",
          onComplete: () => animateParticle(particle)
        });
      }
      
      return () => {
        particles.forEach(p => {
          if (p && p.parentNode) {
            p.parentNode.removeChild(p);
          }
        });
      };
    }, containerRef);
    
    return () => particleCtx.revert();
  }, [isLoaded]);

  return (
    <div 
      ref={containerRef} 
      className="relative min-h-screen w-full bg-gradient-to-tr from-gray-900 via-slate-900 to-black text-white overflow-hidden flex flex-col items-center justify-center px-4 py-12"
    >
      {/* Background gradient orbs */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-600 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-600 rounded-full filter blur-3xl opacity-20"></div>
      
      {/* Header section */}
      <div className="text-center max-w-3xl mb-16 relative z-10">
        <h1 
          ref={mainTitleRef}
          className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500"
        >
          Next-Level Experiences
        </h1>
        <p 
          ref={subtitleRef}
          className="text-xl text-gray-300"
        >
          Discover how smooth animations and modern design can transform your digital presence
        </p>
      </div>
      
      {/* Feature cards carousel */}
      <div className="flex flex-col items-center w-full max-w-5xl relative z-10">
        <div className="relative w-full h-80 max-w-lg mx-auto mb-12">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              ref={el => { cardsRef.current[index] = el; }}
              onClick={() => handleCardClick(index)}
              className={`absolute top-0 left-0 right-0 mx-auto bg-gradient-to-br ${feature.color} rounded-2xl p-8 shadow-xl backdrop-blur-sm 
                transition-all duration-300 cursor-pointer
                ${index === activeIndex ? 'z-20' : 'z-10'}`}
              style={{
                transform: `translateY(${(index - activeIndex) * 20}px) scale(${index === activeIndex ? 1 : 0.95})`,
                opacity: index === activeIndex ? 1 : 0.6
              }}
            >
              <div className="flex items-start mb-6">
                <span className="text-4xl mr-4">{feature.icon}</span>
                <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
              </div>
              <p className="text-gray-100 text-lg">{feature.description}</p>
            </div>
          ))}
        </div>
        
        {/* Navigation controls */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button 
            onClick={handlePrevCard}
            className="group bg-white/10 hover:bg-white/20 text-white rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 hover:scale-110"
            aria-label="Previous card"
          >
            <svg 
              className="w-6 h-6 transform transition-transform duration-300 group-hover:-translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* Dots indicator */}
          <div className="flex gap-2">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => handleCardClick(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'bg-white w-8' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          <button 
            onClick={handleNextCard}
            className="group bg-white/10 hover:bg-white/20 text-white rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 hover:scale-110"
            aria-label="Next card"
          >
            <svg 
              className="w-6 h-6 transform transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Action button with ripple effect */}
      <button className="mt-16 relative overflow-hidden group bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
        <span className="relative z-10">Explore Features</span>
        <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
      </button>
    </div>
  );
};

export default ModernCarousel;