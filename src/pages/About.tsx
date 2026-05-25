import { motion } from "motion/react";

export default function About() {
  return (
    <div className="mx-auto max-w-container-max px-margin-desktop py-20">
      <section className="mb-20">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-display-lg mb-8"
        >
          SA Developers Ranchi
        </motion.h1>
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <h2 className="text-headline-md text-primary">Our Philosophy</h2>
            <p className="text-on-surface-variant leading-relaxed">
              Founded on the principles of structural integrity and aesthetic clarity, SA Developers is more than an architecture firm. We are engineers of experience, designers of legacy, and stewards of the environment.
            </p>
            <p className="text-on-surface-variant leading-relaxed text-sm">
              We believe that every line drawn carry the weight of mathematical certainty and human aspiration. Our studio operates at the nexus of high-technology and artisanal craftsmanship.
            </p>
          </div>
          <div className="bg-surface-container-high p-8 border border-outline-variant/30">
            <h3 className="text-label-md mb-6">Technical Standards</h3>
            <ul className="space-y-4 text-sm text-on-surface-variant">
              <li className="flex justify-between border-b pb-2"><span>Precision Mapping</span> <span>±1.5mm</span></li>
              <li className="flex justify-between border-b pb-2"><span>RRDA Compliance</span> <span>100%</span></li>
              <li className="flex justify-between border-b pb-2"><span>BIM Compliance</span> <span>Level 2+</span></li>
              <li className="flex justify-between border-b pb-2"><span>Ranchi Coverage</span> <span>Full District</span></li>
            </ul>
          </div>
        </div>
      </section>
      
      <section className="py-20 border-t border-outline-variant/20">
        <div className="grid md:grid-cols-3 gap-12">
            {[
                { label: "Established", value: "2015" },
                { label: "Ranchi Homes Delivered", value: "120+" },
                { label: "Design Experts", value: "12" }
            ].map((stat, i) => (
                <motion.div 
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-center"
                >
                    <div className="text-display-lg text-primary mb-2">{stat.value}</div>
                    <div className="text-label-md text-outline">{stat.label}</div>
                </motion.div>
            ))}
        </div>
      </section>
    </div>
  );
}
