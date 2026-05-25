import React, { useState } from "react";
import { motion } from "motion/react";
import { createInquiry } from "../lib/firebase";

export default function Consultation() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [generatedCode, setGeneratedCode] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      // 1. Submit to server-side API proxy (keeps track of submissions on disk)
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const resData = await res.json();
      
      // 2. Submit to Firestore for real-time syncd tracking
      try {
        await createInquiry(formData.name, formData.email, formData.message);
      } catch (fsError) {
        console.warn("Firestore collection sync deferred or using offline buffer: ", fsError);
      }

      if (res.ok) {
        if (resData.projectCode) {
          setGeneratedCode(resData.projectCode);
        }
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Submission failed:", err);
      setStatus("error");
    }
  };

  return (
    <div className="mx-auto max-w-container-max px-margin-desktop py-20 min-h-[80vh] flex items-center">
      <div className="grid md:grid-cols-2 gap-20 items-center w-full">
        <section>
          <span className="text-label-md text-[#0A523A] mb-4 block font-mono">✦ Shubh Aarambh</span>
          <h1 className="text-display-lg mb-4 text-primary">Architectural & Vastu Consultation</h1>
          <div className="flex gap-1.5 mb-8">
            <div className="h-1.5 w-16 bg-primary" />
            <div className="h-1.5 w-6 bg-[#D99414]" />
            <div className="h-1.5 w-12 bg-[#0A523A]" />
          </div>
          <p className="text-on-surface-variant mb-12 max-w-md leading-relaxed text-sm">
            Begin your auspicious journey towards modern design excellence. Our lead Ranchi team combines elite structural engineering with ancient Vastu Shastra wisdom to build spacious, multi-generational sanctuaries customized for Jharkhand's climate.
          </p>
          <div className="space-y-4 text-sm text-on-surface-variant font-sans">
             <div className="flex items-center gap-4">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Ranchi HQ: Main Road, Ranchi, Jharkhand, India
             </div>
             <div className="flex items-center gap-4">
                <span className="w-2 h-2 bg-[#0A523A] rounded-full"></span>
                Kanke Road Design Studio: Opp. Rock Garden, Ranchi
             </div>
          </div>
        </section>

        <section className="bg-surface-container-lowest p-10 border-t-4 border-t-[#0A523A] border-x border-b border-outline-variant/30 shadow-2xl rounded-b-lg relative overflow-hidden">
          {status === "success" ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="text-primary text-headline-md mb-4 font-bold">Inquiry Received</div>
              <p className="text-on-surface-variant text-sm mb-6">Thank you. Our Ranchi team will contact you shortly.</p>
              
              {generatedCode && (
                <div className="bg-surface-container-low p-6 border border-outline-variant/30 inline-block rounded-md mb-8 max-w-sm">
                  <span className="text-[10px] font-mono text-outline block uppercase tracking-widest mb-1">Your Tracking ID</span>
                  <strong className="text-xl font-mono text-primary tracking-wider">{generatedCode}</strong>
                  <p className="text-xs text-on-surface-variant mt-2">Write down this unique code. Once approved, you can log in to our Customer Portal to monitor your material progress & construction phases!</p>
                </div>
              )}

              <div className="space-y-4">
                <button 
                  onClick={() => setStatus("idle")}
                  className="block mx-auto text-label-md text-primary underline font-medium hover:opacity-80 transition-opacity"
                >
                  Send another message
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="text-label-md block mb-4">Your Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-transparent border-b border-outline-variant py-3 focus:border-primary outline-none transition-colors px-1"
                />
              </div>
              <div>
                <label className="text-label-md block mb-4">Email Address</label>
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-transparent border-b border-outline-variant py-3 focus:border-primary outline-none transition-colors px-1"
                />
              </div>
              <div>
                <label className="text-label-md block mb-4">Project Brief & Plot Size</label>
                <textarea 
                  required
                  placeholder="Tell us about your plot location in Ranchi..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={4}
                  className="w-full bg-transparent border border-outline-variant p-4 focus:border-primary outline-none transition-colors resize-none"
                />
              </div>
              <button 
                disabled={status === "loading"}
                className={`w-full py-4 text-label-md transition-all ${
                  status === "loading" ? "bg-outline text-white" : "bg-primary text-on-primary hover:opacity-90 active:scale-95"
                }`}
              >
                {status === "loading" ? "Processing..." : "Submit Inquiry"}
              </button>
              {status === "error" && <p className="text-red-500 text-xs text-center">Something went wrong. Please try again.</p>}
            </form>
          )}
        </section>
      </div>
    </div>
  );
}
