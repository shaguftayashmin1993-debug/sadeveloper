import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

import image1 from "../assets/images/modern_indian_villa_1200_1779102434930.png";
import image2 from "../assets/images/contemporary_ranchi_home_2400_1779102453300.png";
import image3 from "../assets/images/urban_indian_duplex_1800_1779102471590.png";
import image4 from "../assets/images/traditional_ranchi_estate_3500_1779102488583.png";
import image5 from "../assets/images/compact_indian_bungalow_800_sq_ft_1779102505835.png";

const DESIGNS = [
  { 
    id: 1, 
    title: "Modern Minimalist Villa", 
    area: 1200, 
    category: "Compact", 
    price: "From ₹45L",
    image: image1
  },
  { 
    id: 2, 
    title: "Contemporary Family Home", 
    area: 2400, 
    category: "Luxury", 
    price: "From ₹85L",
    image: image2
  },
  { 
    id: 3, 
    title: "Urban Indian Duplex", 
    area: 1800, 
    category: "Mid-Range", 
    price: "From ₹62L",
    image: image3
  },
  { 
    id: 4, 
    title: "Traditional Ranchi Estate", 
    area: 3500, 
    category: "Estate", 
    price: "From ₹1.4Cr",
    image: image4
  },
  { 
    id: 5, 
    title: "Studio Bungalow", 
    area: 800, 
    category: "Compact", 
    price: "From ₹28L",
    image: image5
  },
];

export default function HomeDesigns() {
  const [filter, setFilter] = useState("All");

  const filteredDesigns = filter === "All" 
    ? DESIGNS 
    : DESIGNS.filter(d => d.category === filter);

  const categories = ["All", "Compact", "Mid-Range", "Luxury", "Estate"];

  return (
    <div className="mx-auto max-w-container-max px-margin-desktop py-20">
      <header className="mb-16">
        <h1 className="text-display-lg mb-4 text-on-surface animate-fade-in">House Designs</h1>
        <div className="flex gap-1.5 mb-8">
          <div className="h-1.5 w-16 bg-primary" />
          <div className="h-1.5 w-6 bg-[#D99414]" />
          <div className="h-1.5 w-12 bg-[#0A523A]" />
        </div>
        <p className="text-on-surface-variant max-w-2xl leading-relaxed">
          From compact efficient layouts for Ranchi urban plots to sprawling luxury estates, explore our range of design concepts tailored for modern living in Jharkhand.
        </p>
      </header>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-4 mb-12 border-b border-outline-variant/20 pb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 text-label-md transition-all ${
              filter === cat 
                ? "bg-primary text-on-primary" 
                : "text-on-surface-variant hover:text-primary border border-outline-variant/30"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Design Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {filteredDesigns.map((design, i) => (
          <motion.div
            key={design.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="bg-surface-container-lowest border border-outline-variant/10 p-4 hover:border-primary/40 transition-all group"
          >
            <div className="aspect-square bg-surface-container-high mb-6 border border-outline-variant/10 relative overflow-hidden">
               <img src={design.image} alt={design.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
               <div className="absolute top-4 left-4 bg-white/90 px-2 py-1 text-[10px] font-mono text-outline">{design.area} SQ. FT.</div>
            </div>
            <div className="space-y-2 mb-6 px-4">
              <span className="text-label-md text-primary text-xs">{design.category}</span>
              <h3 className="text-headline-md leading-tight group-hover:text-primary transition-colors">{design.title}</h3>
              <p className="text-on-surface-variant text-sm font-mono">{design.area} sq. ft. Total Area</p>
            </div>
            <div className="pt-6 border-t border-outline-variant/10 flex justify-between items-center px-4">
              <span className="text-label-md text-xs text-outline">{design.price}</span>
              <Link to={`/designs/${design.id}`} className="text-primary text-sm hover:underline font-semibold">View Details</Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Custom Request Callout */}
      <div className="mt-32 p-12 bg-gradient-to-r from-[#CA4E12] via-[#E28318] to-[#0A523A] text-on-primary text-center rounded-lg shadow-xl border-2 border-[#D99414]/30 relative overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:24px_24px] opacity-35" />
         <div className="relative z-10">
           <h2 className="text-display-lg text-3xl md:text-5xl mb-4 text-white">Don't see the exact size?</h2>
           <p className="mb-8 opacity-95 max-w-xl mx-auto text-sm">
             Our Ranchi estate architects specialize in custom multi-generational villa expansions and Vastu-compliant layouts. We will scale any architectural concept to your exact plot boundaries within 72 hours.
           </p>
           <Link to="/consultation" className="bg-[#FFFBF3] text-[#CA4E12] px-10 py-3.5 text-label-md font-bold hover:bg-white transition-all inline-block shadow-md rounded uppercase tracking-wider text-xs">
             Speak with a Ranchi Architect
           </Link>
         </div>
      </div>
    </div>
  );
}
