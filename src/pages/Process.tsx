import { motion } from "motion/react";

const STEPS = [
  { id: "01", title: "Site Analysis", desc: "Rigorous assessment of topographic, climatic, and social context." },
  { id: "02", title: "Conceptual Drafting", desc: "Mathematical translation of project vision into spatial volumes." },
  { id: "03", title: "Technical Integration", desc: "Layering structural, mechanical, and sustainable systems." },
  { id: "04", title: "Fabrication & Execution", desc: "Precision assembly monitored via real-time BIM coordination." },
];

export default function Process() {
  return (
    <div className="mx-auto max-w-container-max px-margin-desktop py-20">
      <div className="text-center mb-20">
        <h1 className="text-display-lg mb-6">The Methodology</h1>
        <p className="text-on-surface-variant max-w-2xl mx-auto">
          Precision is not an accident; it is the result of a rigorous, four-stage architectural framework that eliminates uncertainty.
        </p>
      </div>

      <div className="space-y-4">
        {STEPS.map((step, i) => (
          <motion.div 
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group flex flex-col md:flex-row gap-8 p-12 bg-surface-container-low border border-outline-variant/10 hover:border-primary/30 transition-all cursor-default"
          >
            <div className="text-display-lg text-primary/20 group-hover:text-primary transition-colors duration-500">
               {step.id}
            </div>
            <div className="flex-1">
               <h3 className="text-headline-md mb-4">{step.title}</h3>
               <p className="text-on-surface-variant max-w-xl">{step.desc}</p>
            </div>
            <div className="md:w-64 h-32 bg-surface-container-high border border-outline-variant/10 self-center" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
