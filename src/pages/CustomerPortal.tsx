import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { fetchProject, ConstructionProject } from "../lib/firebase";

export default function CustomerPortal() {
  const [projectCode, setProjectCode] = useState("");
  const [project, setProject] = useState<ConstructionProject | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLookup = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!projectCode.trim()) return;

    setLoading(true);
    setError("");
    setProject(null);

    try {
      // Try local JSON database first via Express API proxy for robustness
      const res = await fetch(`/api/projects/${projectCode.trim().toUpperCase()}`);
      if (res.ok) {
        const data = await res.json();
        setProject(data);
      } else {
        // Fallback or verify with active Firestore integration directly
        try {
          const fsData = await fetchProject(projectCode.trim().toUpperCase());
          if (fsData) {
            setProject(fsData);
          } else {
            setError(`No active construction project registered under tracking code "${projectCode}". Please check and try again.`);
          }
        } catch (fsErr) {
          setError(`Could not find a project with tracking code "${projectCode}". Verify code and retry.`);
        }
      }
    } catch (err) {
      setError("Failed to query tracking systems. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  // Pre-fill search if active query code exist in URL or localStorage
  useEffect(() => {
    const savedCode = localStorage.getItem("sa_project_code");
    if (savedCode) {
      setProjectCode(savedCode);
      // Auto look up
      setLoading(true);
      fetch(`/api/projects/${savedCode.toUpperCase()}`)
        .then(res => {
          if (res.ok) return res.json();
          return fetchProject(savedCode.toUpperCase());
        })
        .then(data => {
          if (data) setProject(data);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, []);

  const handleSaveCode = (code: string) => {
    localStorage.setItem("sa_project_code", code);
  };

  const handleLogout = () => {
    setProject(null);
    setProjectCode("");
    localStorage.removeItem("sa_project_code");
  };

  return (
    <div className="mx-auto max-w-container-max px-margin-desktop py-16 min-h-[85vh]">
      {!project ? (
        <div className="max-w-md mx-auto py-16 text-center">
          <span className="text-label-md text-[#0A523A] tracking-widest block uppercase mb-3 font-mono">✦ Swagat Hain / Welcome</span>
          <h1 className="text-4xl font-sans tracking-tight text-on-surface mb-4">Customer Project Portal</h1>
          <div className="flex justify-center gap-1.5 mb-8">
            <div className="h-1.5 w-16 bg-primary" />
            <div className="h-1.5 w-6 bg-[#D99414]" />
            <div className="h-1.5 w-12 bg-[#0A523A]" />
          </div>
          <p className="text-on-surface-variant text-sm leading-relaxed mb-10">
            Welcome to the SA Developers Client Experience. Enter your unique tracking key (provided in your consultation receipt, e.g. <span className="font-mono text-primary font-bold">SA-1025</span>) to check the real-world status of your villa layout.
          </p>

          <form onSubmit={handleLookup} className="space-y-6 text-left">
            <div>
              <label className="text-label-md block mb-3 font-mono text-xs uppercase tracking-wider text-outline">Unique Coding Key</label>
              <input 
                type="text"
                placeholder="SA-XXXX"
                value={projectCode}
                onChange={(e) => setProjectCode(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant/30 px-5 py-4 focus:border-primary outline-none text-center font-mono text-xl tracking-widest text-on-surface transition-all uppercase placeholder:opacity-40"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 text-label-md font-bold uppercase tracking-wider bg-primary text-on-primary hover:opacity-90 transition-all active:scale-95 disabled:bg-outline"
            >
              {loading ? "Decrypting Project State..." : "Access Progress Feed"}
            </button>
          </form>

          {error && (
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="mt-6 text-red-500 text-xs font-medium bg-red-500/10 p-4 border border-red-500/20"
            >
              {error}
            </motion.p>
          )}

          <div className="mt-16 text-xs text-outline font-mono border-t border-outline-variant/20 pt-6">
            Demo project code keys available: <span className="text-primary hover:underline cursor-pointer" onClick={() => { setProjectCode("SA-1025"); handleSaveCode("SA-1025"); }}>SA-1025</span> or <span className="text-primary hover:underline cursor-pointer" onClick={() => { setProjectCode("SA-2045"); handleSaveCode("SA-2045"); }}>SA-2045</span>
          </div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          {/* Header Bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-outline-variant/20 pb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-mono bg-primary/10 text-primary px-2.5 py-1 font-bold uppercase tracking-widest rounded">{project.id}</span>
                <span className="text-xs font-mono bg-surface-container-high text-outline px-2.5 py-1 rounded">Ranchi District Project</span>
              </div>
              <h1 className="text-3xl font-sans font-semibold tracking-tight text-on-surface">{project.projectTitle}</h1>
              <p className="text-on-surface-variant text-sm mt-1">Client: <span className="font-medium text-on-surface">{project.customerName}</span> | {project.address}</p>
            </div>
            <button 
              onClick={handleLogout}
              className="px-5 py-2.5 text-xs font-mono text-outline border border-outline-variant/30 hover:text-primary hover:border-primary/50 transition-all rounded"
            >
              Exit Portal
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Status & Materials */}
            <div className="space-y-8 lg:col-span-2">
              {/* Construction Phase Progress */}
              <div className="bg-surface-container-lowest p-8 border-t-4 border-t-primary border-x border-b border-outline-variant/20 rounded-b-lg">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-mono text-outline uppercase tracking-wider">Overall Structural Assembly</span>
                  <span className="text-xl font-mono text-[#0A523A] font-bold">{project.progressPercent}%</span>
                </div>
                {/* Progress Bar Container */}
                <div className="w-full h-4 bg-surface-container-high overflow-hidden rounded-full mb-8 relative border border-outline-variant/20 p-[1px]">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progressPercent}%` }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-[#0A523A] via-[#D99414] to-primary"
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 text-center">
                  {[
                    { label: "Phase", val: project.status },
                    { label: "Plot Size", val: project.plotSize },
                    { label: "Vastu Checked", val: "100% Certified" },
                    { label: "Expected Finish", val: "Handover Ready" }
                  ].map((spec) => (
                    <div key={spec.label} className="p-4 bg-surface-container-low border border-outline-variant/10 text-xs">
                      <span className="text-outline font-mono uppercase block text-[10px] mb-1">{spec.label}</span>
                      <strong className="text-on-surface font-sans text-sm block">{spec.val}</strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* Milestones Flow */}
              <div className="bg-surface-container-lowest p-8 border border-outline-variant/20">
                <h3 className="text-label-md text-on-surface mb-8 font-semibold">Active Work Execution Phases</h3>
                
                <div className="relative pl-8 border-l border-outline-variant/30 space-y-12">
                  {project.milestones?.map((m, idx) => {
                    const isCompleted = m.status === "completed";
                    const isCurrent = m.status === "in-progress";

                    return (
                      <div key={idx} className="relative">
                        {/* Milestone dot */}
                        <div className={`absolute -left-[41px] top-1.5 w-6 h-6 rounded-full border-2 bg-surface flex items-center justify-center transition-all ${
                          isCompleted ? "border-[#0A523A] bg-[#0A523A] text-white" :
                          isCurrent ? "border-[#D99414] bg-white text-[#D99414] animate-pulse" : "border-outline-variant/40 bg-surface"
                        }`}>
                          {isCompleted ? (
                            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <span className="w-2 h-2 rounded-full bg-outline-variant/60" />
                          )}
                        </div>

                        {/* Milestone Info */}
                        <div className="space-y-1.5">
                          <div className="flex flex-wrap items-center gap-3">
                            <h4 className={`text-base font-sans font-medium ${isCompleted ? "text-on-surface" : isCurrent ? "text-primary" : "text-outline"}`}>
                              {m.title}
                            </h4>
                            <span className={`text-[10px] font-mono px-2.5 py-0.5 uppercase tracking-wider rounded font-bold ${
                              isCompleted ? "bg-[#0A523A]/10 text-[#0A523A]" :
                              isCurrent ? "bg-[#D99414]/10 text-[#D99414] animate-pulse" : "bg-surface-container-high text-outline"
                            }`}>
                              {m.status}
                            </span>
                          </div>
                          <p className="text-xs font-mono text-outline">Target Date: {m.date}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Panel Ranchi Team Detail & Vastu */}
            <div className="space-y-8">
              <div className="bg-surface-container-lowest p-8 border border-outline-variant/20">
                <h3 className="text-label-md mb-4 text-on-surface">Ranchi Site Supervisors</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
                  Our dedicated engineering leads monitor execution hourly to guarantee maximum structural integrity. Feel free to initiate contact regarding progress.
                </p>

                <div className="space-y-4">
                  <div className="p-4 bg-surface-container-low border-l-4 border-l-primary border-y border-r border-outline-variant/10 text-xs">
                    <span className="font-mono uppercase text-outline text-[10px] block">Lead Architect</span>
                    <strong className="text-on-surface text-sm">S. Ansari, SA Ranchi</strong>
                    <p className="font-mono text-outline mt-1 font-bold">+91 9431X XXXXX</p>
                  </div>
                  <div className="p-4 bg-surface-container-low border-l-4 border-l-[#0A523A] border-y border-r border-outline-variant/10 text-xs">
                    <span className="font-mono uppercase text-outline text-[10px] block">Chief Structural Engineer</span>
                    <strong className="text-on-surface text-sm">R. K. Mishra, IIT KGP</strong>
                    <p className="font-mono text-outline mt-1 font-bold">+91 7004X XXXXX</p>
                  </div>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-8 border border-outline-variant/20 block">
                <h3 className="text-label-md mb-4 text-on-surface">Need Layout Iteration?</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
                  Want to review material selections or alter partition layouts before slab casting? Inform your supervisor.
                </p>
                <a href="mailto:shaguftayashmin1993@gmail.com" className="w-full text-center bg-primary text-on-primary py-3.5 text-xs uppercase tracking-wider font-mono font-bold hover:opacity-95 transition-all block">
                  Submit Change Request
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
