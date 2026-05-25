import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowForward } from "../components/Icons";

const DESIGNS = [
  { 
    id: 1, 
    title: "Modern Minimalist Villa", 
    area: 1200, 
    category: "Compact", 
    bhk: "2 BHK + Study",
    image: "/src/assets/images/modern_indian_villa_1200_1779102434930.png",
    description: "A compact yet luxury-focused villa designed for efficiency and modern aesthetics. Ideal for 30x40 plots in Ranchi's suburbs." 
  },
  { 
    id: 2, 
    title: "Contemporary Family Home", 
    area: 2400, 
    category: "Luxury", 
    bhk: "4 BHK + Family Room",
    image: "/src/assets/images/contemporary_ranchi_home_2400_1779102453300.png",
    description: "A sprawling residence emphasizing open-plan living and cross-ventilation. Features dual-height living area and premium landscape integration." 
  },
  { 
    id: 3, 
    title: "Urban Indian Duplex", 
    area: 1800, 
    category: "Mid-Range", 
    bhk: "3 BHK + Lounge",
    image: "/src/assets/images/urban_indian_duplex_1800_1779102471590.png",
    description: "Perfect for urban plots in Ranchi, this duplex offers privacy across levels with a stylish facade and efficient parking." 
  },
  { 
    id: 4, 
    title: "Traditional Ranchi Estate", 
    area: 3500, 
    category: "Estate", 
    bhk: "5 BHK + Servant Quarter",
    image: "/src/assets/images/traditional_ranchi_estate_3500_1779102488583.png",
    description: "Inspired by regional forms, this estate uses local stones and brickwork combined with high-tech structural glass." 
  },
  { 
    id: 5, 
    title: "Studio Bungalow", 
    area: 800, 
    category: "Compact", 
    bhk: "1 BHK / Studio",
    image: "/src/assets/images/compact_indian_bungalow_800_sq_ft_1779102505835.png",
    description: "Elevated studio living with premium finishes. A retreat design for vacation plots or small urban infill projects." 
  }
];

export default function DesignDetail() {
  const { id } = useParams();
  const design = DESIGNS.find((d) => d.id === Number(id));

  if (!design) return <div>Design not found</div>;

  return (
    <div className="mx-auto max-w-container-max px-margin-desktop py-20">
      <div className="grid lg:grid-cols-2 gap-20 items-start">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Link to="/designs" className="text-label-md text-primary mb-8 inline-block">← Back to Catalog</Link>
          <span className="text-label-md text-outline mb-4 block">{design.category} Series</span>
          <h1 className="text-display-lg mb-8">{design.title}</h1>
          
          <div className="grid grid-cols-2 gap-8 mb-12 border-y border-outline-variant/20 py-8">
            <div>
              <div className="text-label-md text-outline text-xs mb-2">Total Project Area</div>
              <div className="text-headline-md">{design.area} Sq. Ft.</div>
            </div>
            <div>
              <div className="text-label-md text-outline text-xs mb-2">Configuration</div>
              <div className="text-headline-md">{design.bhk}</div>
            </div>
          </div>

          <p className="text-on-surface-variant mb-12 leading-relaxed">
            {design.description} This design is optimized for the Jharkhand climate, featuring deep overhangs and intelligent shading systems to maintain thermal comfort year-round.
          </p>

          <div className="space-y-6 mb-12">
            <h3 className="text-label-md">Technical Specs</h3>
            <ul className="space-y-4 text-sm text-on-surface-variant font-sans">
              <li className="flex justify-between border-b pb-2"><span>Structural System</span> <span>Reinforced Concrete Frame</span></li>
              <li className="flex justify-between border-b pb-2"><span>Energy Rating</span> <span>Highly Efficient</span></li>
              <li className="flex justify-between border-b pb-2"><span>Plot Compatibility</span> <span>Variable (Min 25x40)</span></li>
            </ul>
          </div>

          <Link to="/consultation" className="bg-primary text-on-primary px-10 py-5 text-label-md inline-flex items-center gap-4 hover:bg-primary/90 transition-all">
            Get Project Quote <ArrowForward className="w-5 h-5" />
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="aspect-[4/5] bg-surface-container-high border border-outline-variant/30 overflow-hidden shadow-2xl">
            <img src={design.image} alt={design.title} className="w-full h-full object-cover" />
          </div>
          <div className="mt-8 p-6 bg-surface-container-low border border-outline-variant/10 italic text-xs text-on-surface-variant">
            *Visual representation only. Exact finishes and layout will be customized during the strategy session.
          </div>
        </motion.div>
      </div>
    </div>
  );
}
