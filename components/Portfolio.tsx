
import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  { id: 1, title: "Lumina XR", cat: "Product Design", img: "https://picsum.photos/800/600?random=1" },
  { id: 2, title: "Aeon Financial", cat: "Fintech", img: "https://picsum.photos/800/600?random=2" },
  { id: 3, title: "Solaris Brand", cat: "Branding", img: "https://picsum.photos/800/600?random=3" },
  { id: 4, title: "Nebula OS", cat: "UI/UX", img: "https://picsum.photos/800/600?random=4" },
];

const Portfolio: React.FC = () => {
  return (
    <section id="work" className="py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-display font-bold mb-16 text-center">Selected Work</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-[2.5rem] bg-gray-900 aspect-[4/3]">
                <img 
                  src={project.img} 
                  alt={project.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white text-black px-8 py-3 rounded-full font-bold">VIEW CASE STUDY</span>
                </div>
              </div>
              <div className="mt-6 flex justify-between items-end">
                <div>
                  <h3 className="text-2xl font-bold">{project.title}</h3>
                  <p className="text-gray-500 uppercase tracking-widest text-sm mt-1">{project.cat}</p>
                </div>
                <div className="text-3xl text-gray-700 group-hover:text-white transition-colors">/0{idx + 1}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
