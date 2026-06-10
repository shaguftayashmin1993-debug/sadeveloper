import { Link, Outlet } from "react-router-dom";
import { motion } from "motion/react";
import { Share, Public, Mail, AccountCircle } from "./Icons";

const navLinks = [
  { name: "Services", path: "/" },
  { name: "House Designs", path: "/designs" },
  { name: "About", path: "/about" },
  { name: "Process", path: "/process" },
  { name: "Customer Portal", path: "/portal" },
];

export default function Layout() {
  return (
    <div className="min-h-screen selection:bg-primary/20 bg-surface">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b border-outline-variant/20 bg-surface/85 backdrop-blur-md">
        {/* Austere Saffron-Marigold-Emerald Ribbon representing prosperity */}
        <div className="h-1.5 w-full bg-gradient-to-r from-primary via-[#D99414] to-[#0A523A]" />
        
        <div className="mx-auto flex h-20 max-w-container-max items-center justify-between px-margin-desktop">
          <div className="flex flex-col">
            <Link to="/" className="text-xl md:text-2xl font-display font-bold uppercase tracking-tight text-primary transition-colors">
               SA Developers
            </Link>
            <span className="text-[10px] font-semibold text-[#0A523A] uppercase tracking-wider font-sans -mt-1 block">Auspicious Ranchi Homes</span>
          </div>
          <nav className="hidden h-full items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-label-md py-2 border-b-2 border-transparent hover:border-primary/50 text-on-surface-variant hover:text-on-surface transition-all"
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-6">
            <Link to="/portal" className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-surface-container-low transition-colors" title="Customer Portal">
              <AccountCircle className="h-6 w-6 text-on-surface" />
            </Link>
            <Link to="/consultation" className="bg-primary px-6 py-2.5 text-label-md text-on-primary hover:bg-primary/90 transition-all active:scale-95 inline-block">
              Start Project
            </Link>
          </div>
        </div>
      </header>

      <main className="min-h-screen pt-20">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-highest border-t border-outline-variant/30">
        <div className="mx-auto max-w-container-max px-margin-desktop py-16 grid grid-cols-1 md:grid-cols-4 gap-gutter">
          <div className="md:col-span-2">
             <div className="text-headline-md font-bold mb-6">SA Developers</div>
             <p className="text-on-surface-variant max-w-xs mb-2 text-sm italic">
                Ranchi, Jharkhand, India
             </p>
             <p className="text-on-surface-variant max-w-xs mb-8 text-sm">
                © 2024 SA Developers. Precision in every line.
             </p>
             <div className="flex gap-6">
                <button className="text-on-surface-variant hover:text-primary transition-colors"><Share className="w-5 h-5"/></button>
                <button className="text-on-surface-variant hover:text-primary transition-colors"><Public className="w-5 h-5"/></button>
                <button className="text-on-surface-variant hover:text-primary transition-colors"><Mail className="w-5 h-5"/></button>
             </div>
          </div>
          <div>
            <h4 className="text-label-md text-on-surface mb-6">Explore</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-label-md tracking-wider text-xs text-on-surface-variant hover:text-primary">About Us</Link></li>
              <li><Link to="/process" className="text-label-md tracking-wider text-xs text-on-surface-variant hover:text-primary">Our Process</Link></li>
              <li><Link to="/consultation-info" className="text-label-md tracking-wider text-xs text-on-surface-variant hover:text-primary">Consultation Service</Link></li>
              <li><Link to="/portal" className="text-label-md tracking-wider text-xs text-on-surface-variant hover:text-primary">Customer Portal</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-label-md text-on-surface mb-6">Expertise</h4>
            <ul className="space-y-4">
              <li><Link to="/designs" className="text-label-md tracking-wider text-xs text-on-surface-variant hover:text-primary">House Designs</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
