import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { SERVICES } from "../constants";
import { ArrowForward } from "../components/Icons";

export default function ServiceDetail() {
  const { id } = useParams();
  const service = SERVICES.find((s) => s.id === id);

  if (!service) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-margin-desktop text-center">
        <h1 className="text-display-lg mb-4">404</h1>
        <p className="text-on-surface-variant mb-8">Service not located in our catalog.</p>
        <Link to="/" className="text-label-md text-primary underline">Return to Services</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-container-max px-margin-desktop py-20 animate-in fade-in duration-700">
      <div className="grid lg:grid-cols-2 gap-20 items-start">
        <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
        >
          <span className="text-label-md text-primary mb-6 block uppercase tracking-widest font-bold">Expertise Component</span>
          <h1 className="text-display-lg mb-8">{service.title}</h1>
          <p className="text-body-lg text-on-surface-variant mb-12 leading-relaxed">
            {service.description} Our approach to {service.title.toLowerCase()} ensures that every structural element serves a dual purpose of utility and aesthetic refinement.
          </p>
          
          <div className="space-y-12">
            <div>
               <h3 className="text-label-md text-on-surface mb-6">Component Highlights</h3>
               <ul className="space-y-4 text-sm text-on-surface-variant">
                  <li className="flex gap-4 items-start">
                     <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                     Comprehensive site integration and climatic alignment.
                  </li>
                  <li className="flex gap-4 items-start">
                     <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                     Advanced material testing and lifecycle documentation.
                  </li>
                  <li className="flex gap-4 items-start">
                     <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                     Full BIM-ready technical specifications for developers.
                  </li>
               </ul>
            </div>
            
            <Link 
                to="/consultation"
                className="inline-flex items-center gap-4 bg-primary text-on-primary px-10 py-5 text-label-md hover:bg-primary/90 transition-all active:scale-95 group"
            >
                Begin Strategy Session <ArrowForward className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
        >
          <div className="aspect-[4/5] bg-surface-container-high border border-outline-variant/20 flex items-center justify-center relative group overflow-hidden">
             <span className="material-symbols-outlined text-[12rem] text-primary/10 group-hover:text-primary/20 transition-colors duration-700 font-extralight">
                {service.icon}
             </span>
             <div className="absolute inset-x-0 bottom-0 p-8 transform translate-y-full group-hover:translate-y-0 transition-transform bg-white/80 backdrop-blur-sm border-t">
                <p className="text-xs text-on-surface-variant italic">Technical schematic visualization placeholder</p>
             </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
             <div className="h-40 bg-surface-container-low border border-outline-variant/10" />
             <div className="h-40 bg-surface-container-low border border-outline-variant/10" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
