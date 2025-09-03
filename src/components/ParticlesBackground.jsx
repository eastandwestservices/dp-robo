import React, { useEffect } from "react";
import "./ParticlesBackground.css";

const ParticlesBackground = () => {
  useEffect(() => {
    const container = document.getElementById("particles-container");

    let particles = [];

    // Function to create a single particle
    const createParticle = () => {
      const particle = document.createElement("div");
      particle.className = "particle";

      // Random initial position
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;

      // Random size
      const size = Math.random() * 4 + 2; // 2px to 6px
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      // Random speed data
      particle.dataset.speedX = Math.random() * 0.5 - 0.25;
      particle.dataset.speedY = Math.random() * 0.5 + 0.5;

      container.appendChild(particle);
      particles.push(particle);

      // Remove particle after 20s to keep DOM light
      setTimeout(() => {
        particle.remove();
        particles = particles.filter(p => p !== particle);
      }, 20000);
    };

    // Create a new particle every 200ms
    const interval = setInterval(createParticle, 200);

    // Handle cursor interaction
    const handleMouseMove = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      particles.forEach(p => {
        const rect = p.getBoundingClientRect();
        const dx = rect.left + rect.width / 2 - mouseX;
        const dy = rect.top + rect.height / 2 - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          // Push particle slightly away from cursor
          p.style.transform = `translate(${dx / 10}px, ${dy / 10}px)`;
        } else {
          // Reset transform
          p.style.transform = `translate(0, 0)`;
        }
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearInterval(interval);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <div id="particles-container"></div>;
};

export default ParticlesBackground;
