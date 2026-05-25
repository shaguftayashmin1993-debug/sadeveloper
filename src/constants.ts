export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  link: string;
}

export const SERVICES: Service[] = [
  {
    id: "rendering",
    title: "3D Architectural Rendering",
    description: "Photorealistic visualizations that capture atmospheric conditions, material textures, and spatial volume with absolute accuracy for marketing and development.",
    icon: "architecture",
    link: "#"
  },
  {
    id: "spatial",
    title: "Interior Spatial Planning",
    description: "Optimizing circulatory flow and ergonomic utility within existing or proposed shells to maximize functional yield and inhabitant wellbeing.",
    icon: "floor_lamp",
    link: "#"
  },
  {
    id: "audit",
    title: "Sustainable Design Audit",
    description: "Comprehensive analysis of thermal performance, material lifecycle, and carbon footprint mitigation for LEED and BREEAM certifications.",
    icon: "energy_savings_leaf",
    link: "#"
  },
  {
    id: "survey",
    title: "Structural Integrity Survey",
    description: "Technical assessment of load-bearing systems and foundational stability using advanced sonar and thermal imaging technologies.",
    icon: "foundation",
    link: "#"
  },
  {
    id: "urban",
    title: "Urban Planning Strategy",
    description: "Designing large-scale masterplans that integrate public infrastructure, residential zones, and green spaces into cohesive urban ecosystems.",
    icon: "next_plan",
    link: "#"
  },
  {
    id: "fabrication",
    title: "Custom Fabrication Design",
    description: "Parametric design services for bespoke structural elements, facades, and furniture systems manufactured via CNC and 3D printing.",
    icon: "design_services",
    link: "#"
  }
];

export const CATEGORIES = [
  "All Services",
  "Residential Design",
  "Commercial Planning",
  "Sustainability Audits",
  "Digital Twins & BIM",
  "Interior Architectures"
];
