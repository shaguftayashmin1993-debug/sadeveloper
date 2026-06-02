import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowForward } from "../components/Icons";
import { SERVICES, CATEGORIES, Service } from "../constants";

export default function Home() {
  return (
    <div className="architectural-grid mx-auto min-h-screen max-w-container-max px-margin-desktop py-12">
      {/* Hero Section */}
      <section className="mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-display-lg text-on-surface mb-4"
        >
          Services Catalog
        </motion.h1>
        <div className="flex gap-1.5 mb-8">
          <div className="h-1.5 w-16 bg-primary" />
          <div className="h-1.5 w-6 bg-[#D99414]" />
          <div className="h-1.5 w-12 bg-[#0A523A]" />
        </div>
        <p className="font-sans text-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed">
          Exploring the intersection of mathematical precision and human experience. 
          Our services are tailored to deliver high-performance architectural solutions.
        </p>
      </section>

      <div className="flex flex-col gap-gutter md:grid md:grid-cols-[260px_1fr]">
        {/* Sidebar */}
        <aside className="space-y-8">
          <div className="border-l-2 border-outline-variant pl-6">
            <h3 className="text-label-md text-outline mb-6">Categories</h3>
            <ul className="space-y-4">
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <a
                    href="#"
                    className={`block font-sans text-base transition-colors ${
                      cat === "All Services"
                        ? "font-semibold text-primary flex items-center gap-2"
                        : "text-on-surface-variant hover:text-primary"
                    }`}
                  >
                    {cat === "All Services" && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-surface-container-low border border-outline-variant/10 p-6">
            <h4 className="text-label-md text-on-surface mb-2">Request a Proposal</h4>
            <p className="font-sans text-xs text-on-surface-variant mb-6 leading-relaxed">
              Need a custom scope for your development project?
            </p>
            <Link to="/consultation" className="block w-full text-center border border-primary text-primary py-3 text-label-md hover:bg-primary hover:text-on-primary transition-all">
              Consultation
            </Link>
          </div>
        </aside>

        {/* Grid */}
        <div className="space-y-gutter">
          <div className="grid grid-cols-1 gap-gutter lg:grid-cols-2">
            {SERVICES.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>

          {/* Featured BIM Card */}
          <FeaturedCard />
        </div>
      </div>
    </div>
  );
}

const ServiceCard: React.FC<{ service: Service; index: number }> = ({ service, index }) => {
  return (
    <motion.article 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-surface-container-lowest border border-outline-variant/20 p-8 flex flex-col justify-between group hover:border-primary/40 transition-all duration-300"
    >
      <div>
        <div className="mb-8 text-primary">
          <span className="material-symbols-outlined text-5xl font-light">
            {service.icon}
          </span>
        </div>
        <h2 className="text-headline-md text-on-surface mb-4 group-hover:text-primary transition-colors">
          {service.title}
        </h2>
        <p className="text-on-surface-variant mb-8 leading-relaxed text-sm">
          {service.description}
        </p>
      </div>
      <Link 
        to={`/services/${service.id}`}
        className="inline-flex items-center gap-2 text-label-md text-primary group-hover:gap-4 transition-all"
      >
        Learn More <ArrowForward className="w-4 h-4" />
      </Link>
    </motion.article>
  );
};

function FeaturedCard() {
  return (
    <article className="bg-gradient-to-br from-[#0A281E] to-[#124E38] text-inverse-on-surface p-12 flex flex-col md:flex-row items-center gap-12 overflow-hidden border border-[#D99414]/30 relative rounded-lg">
      <div className="relative z-10 md:w-1/2">
        <span className="inline-block bg-[#D99414] text-inverse-on-surface px-3 py-1 text-[10px] uppercase font-bold tracking-[0.2em] mb-6">
          Premium Innovation
        </span>
        <h2 className="text-display-lg text-3xl md:text-5xl mb-6 text-[#FFFCF6]">
          Vastu & Climatology Mapping
        </h2>
        <p className="text-inverse-on-surface/90 mb-8 max-w-md text-sm leading-relaxed">
          Unlock a harmonious living experience. We overlay Vedic Vastu orientation algorithms with modern day-light & ventilation simulations for Ranchi's distinct seasons.
        </p>
        <Link to="/consultation" className="bg-[#CA4E12] text-white hover:bg-[#CA4E12]/90 transition-all px-8 py-3 text-label-md font-bold uppercase tracking-wider inline-block">
          Schedule Consultation
        </Link>
      </div>
      <div className="md:w-1/2 h-64 md:h-80 w-full relative">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWvNBhfZBSo3P47FYT1YnceY3OS7jOqZ-wK2YuLGo5zQfG6d2xlVAZraVeP82vr6tXJ2oEnRChGNV74ThtdE4A7FIMF2G4zSCV_9EMJBzOHQLlaJfORlQ3y8BK1lqnGTch5anKPOY8ce3FW8hlWOttKiiRMsh1cdYCtRYYHYexKBKvBhaYRDEz2yz2TjSGtHC4nPG_yBRX1NukCfz3FIbWIbw4yZDbl-VZ6UKgU11QAgx2sz2cdKSRS0aSW4rWw9LWNbefy4-K6DU" 
          alt="Climatology Vastu Chart" 
          className="w-full h-full object-cover grayscale opacity-40 mix-blend-screen"
          referrerPolicy="no-referrer"
        />
      </div>
    </article>
  );
}
