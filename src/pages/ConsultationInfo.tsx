import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowForward } from "../components/Icons";

export default function ConsultationInfo() {
  return (
    <div className="mx-auto max-w-container-max px-margin-desktop py-20">
      <header className="mb-20 max-w-4xl">
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-label-md text-primary mb-4 block"
        >
          Expert Guidance for Ranchi Homeowners
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-display-lg mb-8"
        >
          Comprehensive Architectural Consultation
        </motion.h1>
        <p className="text-on-surface-variant leading-relaxed text-lg md:text-xl">
          At SA Developers, we understand that building a home in Ranchi involves unique terrain, climate, and local regulations. Our consultation service is designed to give you a clear roadmap from plot selection to final possession.
        </p>
      </header>

      <section className="grid md:grid-cols-2 gap-12 mb-32">
        <div className="bg-surface-container-low p-10 border border-outline-variant/10 group hover:border-primary/30 transition-all">
          <h2 className="text-headline-md mb-6">Technical Site Review</h2>
          <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">
            We perform an exhaustive analysis of your plot in Ranchi. This includes soil testing coordination, boundary measurements, and checking local RRDA (Ranchi Regional Development Authority) compliance.
          </p>
          <ul className="space-y-4 text-xs text-outline font-sans uppercase tracking-widest">
             <li>• Plot Setback Calculations</li>
             <li>• Drainage & Slope Analysis</li>
             <li>• Vastu-Compliant Zoning</li>
          </ul>
        </div>
        <div className="bg-surface-container-low p-10 border border-outline-variant/10 group hover:border-primary/30 transition-all">
          <h2 className="text-headline-md mb-6">Personalized Design Strategy</h2>
          <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">
            Every family is different. During our session, we map your daily routines to spatial flows. We help you choose material palettes that are durable for the Jharkhand monsoon and heat.
          </p>
          <ul className="space-y-4 text-xs text-outline font-sans uppercase tracking-widest">
             <li>• Sunlight & Flow Studies</li>
             <li>• Premium Material Curation</li>
             <li>• Cost Optimization Layouts</li>
          </ul>
        </div>
      </section>

      {/* Protocol Section - How we handle customers */}
      <section className="mb-32">
         <h2 className="text-label-md text-outline mb-12">The SA Protocol: How We Respond to You</h2>
         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
               { step: "01", title: "Immediate Response", desc: "Within 4 hours of your inquiry, our studio manager calls you to understand the basic plot location and requirements." },
               { step: "02", title: "Lead Architect Review", desc: "Our lead designer reviews your brief against Ranchi's urban laws and prepares a preliminary 'Plot Vision' report." },
               { step: "03", title: "Physical Site Visit", desc: "We meet you at your plot for a site survey. We check the orientation and neighbors to ensure maximum privacy." },
               { step: "04", title: "Final Design Quote", desc: "A detailed design contract and a preliminary 3D sketch are presented for your final approval." }
            ].map((item) => (
               <div key={item.step} className="space-y-4">
                  <div className="text-display-lg text-primary/10 font-bold">{item.step}</div>
                  <h3 className="text-label-md text-on-surface">{item.title}</h3>
                  <p className="text-on-surface-variant text-xs leading-relaxed">{item.desc}</p>
               </div>
            ))}
         </div>
      </section>

      <section className="bg-primary text-on-primary p-16 text-center">
         <h2 className="text-headline-md mb-6">Build with Certainty</h2>
         <p className="mb-10 text-on-primary/80 max-w-xl mx-auto">Stop guessing and start building with a data-driven design strategy. Our Ranchi studio is ready to bring your vision to life.</p>
         <Link to="/consultation" className="bg-white text-primary px-12 py-4 text-label-md inline-flex items-center gap-4 hover:bg-surface transition-all">
            Book Site Visit <ArrowForward className="w-5 h-5" />
         </Link>
      </section>
    </div>
  );
}
