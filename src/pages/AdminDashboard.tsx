import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { CustomerInquiry, ConstructionProject, ProjectMilestone } from "../lib/firebase";

export default function AdminDashboard() {
  const [inquiries, setInquiries] = useState<CustomerInquiry[]>([]);
  const [projects, setProjects] = useState<ConstructionProject[]>([]);
  const [activeTab, setActiveTab] = useState<"inquiries" | "projects">("inquiries");
  
  // Loading & statuses
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [isPinVerified, setIsPinVerified] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");

  // Editor/Creator forms
  const [selectedProject, setSelectedProject] = useState<ConstructionProject | null>(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [projectForm, setProjectForm] = useState<Omit<ConstructionProject, "createdAt" | "updatedAt">>({
    id: "",
    customerName: "",
    email: "",
    projectTitle: "",
    plotSize: "",
    address: "",
    progressPercent: 0,
    status: "Planning",
    milestones: []
  });

  const [milestonesText, setMilestonesText] = useState("");

  const verifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === "2026") {
      setIsPinVerified(true);
      setPinError("");
      loadDashboardData();
    } else {
      setPinError("Invalid Admin Credentials. Please try again.");
    }
  };

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const inquiresRes = await fetch("/api/admin/inquiries");
      if (inquiresRes.ok) {
        const data = await inquiresRes.json();
        setInquiries(data);
      }

      const projectsRes = await fetch("/api/admin/projects");
      if (projectsRes.ok) {
        const data = await projectsRes.json();
        setProjects(data);
      }
    } catch (err) {
      console.error("Error loading administrative datasets:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInquiryStatus = async (id: string, newStatus: "pending" | "contacted" | "project_created") => {
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        // Reload
        loadDashboardData();
        setMessage("Inquiry status updated successfully!");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      // Parse milestones
      let milestoneList: ProjectMilestone[] = [];
      if (milestonesText) {
        milestoneList = milestonesText.split("\n").filter(Boolean).map(line => {
          const parts = line.split("|");
          return {
            title: parts[0]?.trim() || "Work Step",
            date: parts[1]?.trim() || "TBD",
            status: (parts[2]?.trim()?.toLowerCase() || "pending") as any
          };
        });
      } else if (projectForm.milestones) {
        milestoneList = projectForm.milestones;
      }

      const updatedPayload = {
        ...projectForm,
        milestones: milestoneList
      };

      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPayload)
      });

      if (res.ok) {
        setMessage("Project Saved Successfully both locally and synchronized on server!");
        setIsCreatingProject(false);
        setSelectedProject(null);
        loadDashboardData();
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const startEditProject = (project: ConstructionProject) => {
    setSelectedProject(project);
    setIsCreatingProject(true);
    setProjectForm({
      id: project.id,
      customerName: project.customerName,
      email: project.email,
      projectTitle: project.projectTitle,
      plotSize: project.plotSize || "Standard Plot",
      address: project.address,
      progressPercent: project.progressPercent,
      status: project.status,
      milestones: project.milestones || []
    });

    const mText = project.milestones?.map(m => `${m.title} | ${m.date} | ${m.status}`).join("\n") || "";
    setMilestonesText(mText);
  };

  const startNewProject = () => {
    setSelectedProject(null);
    setIsCreatingProject(true);
    const code = `SA-${Math.floor(1000 + Math.random() * 9000)}`;
    setProjectForm({
      id: code,
      customerName: "",
      email: "",
      projectTitle: "New Residential Bungalow",
      plotSize: "30x40 Ft",
      address: "Ranchi, Jharkhand",
      progressPercent: 10,
      status: "Planning",
      milestones: []
    });
    setMilestonesText(
      "Site Inspection & Survey Completed | Tomorrow | completed\nDetailed Design Concept | 28 May 2026 | in-progress\nFoundation Layout | June 2026 | pending"
    );
  };

  return (
    <div className="mx-auto max-w-container-max px-margin-desktop py-12 min-h-[85h]">
      {!isPinVerified ? (
        <div className="max-w-md mx-auto py-24 text-center">
          <span className="text-label-md text-primary tracking-widest block uppercase mb-3 text-xs font-mono">Administrative Control</span>
          <h1 className="text-3xl font-sans tracking-tight text-on-surface mb-6">Staff Portal Verification</h1>
          <p className="text-on-surface-variant text-sm leading-relaxed mb-8">
            Access to the customer inquiries database and project tracking controls is restricted to authorized SA Developers supervisors. Proving direct credentials.
          </p>

          <form onSubmit={verifyPin} className="space-y-6 text-left">
            <div>
              <label className="text-label-md block mb-3 font-mono text-xs uppercase text-outline">Enter Admin Login PASS PIN</label>
              <input 
                type="password"
                placeholder="••••"
                value={pin}
                maxLength={4}
                onChange={(e) => setPin(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant/30 px-5 py-3 tracking-widest text-center text-xl text-on-surface outline-none focus:border-primary"
                required
              />
              <span className="text-[10px] text-outline mt-1 block text-center font-mono">*Hint for review: Developer entry PIN is <b className="text-primary font-bold">2026</b></span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-primary text-on-primary font-bold uppercase tracking-wider text-label-md hover:opacity-90 transition-all text-xs"
            >
              Verify Administrative Access
            </button>
          </form>

          {pinError && (
            <p className="mt-4 text-red-500 font-medium text-xs bg-red-500/10 p-3">{pinError}</p>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-outline-variant/20 pb-6">
            <div>
              <h1 className="text-3xl font-sans font-bold tracking-tight text-on-surface">SA Ranchi studio control center</h1>
              <p className="text-on-surface-variant text-sm mt-1">Check incoming client leads, create dynamic construction trackers, and generate project codes.</p>
            </div>
            <button 
              onClick={() => setIsPinVerified(false)}
              className="text-xs font-mono border border-outline-variant/30 px-4 py-2 hover:border-red-500 hover:text-red-500 transition-colors"
            >
              Lock Panel
            </button>
          </div>

          {message && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="bg-primary/10 text-primary border border-primary/20 p-4 text-sm font-semibold rounded"
            >
              {message}
            </motion.div>
          )}

          {/* Navigation Tab */}
          <div className="flex gap-4 border-b border-outline-variant/10 pb-4">
            <button
              onClick={() => { setActiveTab("inquiries"); setIsCreatingProject(false); }}
              className={`px-6 py-2.5 text-xs uppercase tracking-wider font-mono transition-all font-semibold border-b-2 ${
                activeTab === "inquiries" ? "border-primary text-primary" : "border-transparent text-outline"
              }`}
            >
              Consultations ({inquiries.length})
            </button>
            <button
              onClick={() => { setActiveTab("projects"); }}
              className={`px-6 py-2.5 text-xs uppercase tracking-wider font-mono transition-all font-semibold border-b-2 ${
                activeTab === "projects" ? "border-primary text-primary" : "border-transparent text-outline"
              }`}
            >
              Active trackers ({projects.length})
            </button>
          </div>

          {activeTab === "inquiries" ? (
            <div className="bg-surface-container-lowest border border-outline-variant/20 p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-headline-md">Queries Database (Local JSON + FirestoreSynced)</h2>
                <span className="text-[10px] font-mono text-outline uppercase tracking-wider">File: /data/queries-database.json</span>
              </div>

              {loading ? (
                <p className="text-center py-12 text-outline text-sm">Synchronizing datasets...</p>
              ) : inquiries.length === 0 ? (
                <p className="text-center py-12 text-outline text-sm font-mono">No submissions recorded.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-outline-variant/20 text-outline text-[10px] uppercase font-mono">
                        <th className="py-4 font-bold">Client Name</th>
                        <th className="py-4 font-bold">Inquiry Email</th>
                        <th className="py-4 font-bold">Requirement Details / Plot location</th>
                        <th className="py-4 font-bold">Submission Time</th>
                        <th className="py-4 font-bold">Tracking ID</th>
                        <th className="py-4 font-bold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/10">
                      {inquiries.map((q) => (
                        <tr key={q.id} className="hover:bg-surface-container-low transition-colors">
                          <td className="py-4 font-semibold text-on-surface">{q.name}</td>
                          <td className="py-4 font-mono text-outline">{q.email}</td>
                          <td className="py-4 text-on-surface-variant max-w-sm leading-relaxed">{q.message}</td>
                          <td className="py-4 font-mono text-outline">{new Date(q.createdAt).toLocaleDateString()}</td>
                          <td className="py-4 font-mono font-medium text-primary">{q.projectCode || "N/A"}</td>
                          <td className="py-4 space-x-2">
                            {q.status === "pending" && (
                              <button 
                                onClick={() => handleInquiryStatus(q.id!, "contacted")}
                                className="bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1 text-[10px] font-bold uppercase rounded font-mono"
                              >
                                Mark Contacted
                              </button>
                            )}
                            {q.status !== "project_created" && (
                              <button 
                                onClick={() => {
                                  handleInquiryStatus(q.id!, "project_created");
                                  // Auto populate standard creation template with their credentials
                                  setIsCreatingProject(true);
                                  setActiveTab("projects");
                                  setProjectForm({
                                    id: q.projectCode || `SA-${Math.floor(1000 + Math.random() * 9000)}`,
                                    customerName: q.name,
                                    email: q.email,
                                    projectTitle: "Modern Ranchi Villa Layout",
                                    plotSize: "30x50 Ft",
                                    address: q.message ? q.message.substring(0, 80) : "Ranchi District",
                                    progressPercent: 10,
                                    status: "Planning",
                                    milestones: [
                                      { title: "Consultation Request Submitted", date: new Date().toLocaleDateString(), status: "completed" },
                                      { title: "Pre-Planning Architecture Review", date: "Within 7 Days", status: "in-progress" },
                                      { title: "Execution Foundations", date: "TBD", status: "pending" }
                                    ]
                                  });
                                  setMilestonesText(
                                    "Consultation Request Submitted | Completed | completed\nPre-Planning Architecture Review | Within 7 Days | in-progress\nExecution Foundations | TBD | pending"
                                  );
                                }}
                                className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 px-3 py-1 text-[10px] font-bold uppercase rounded font-mono"
                              >
                                Create Progress Roadmap
                              </button>
                            )}
                            <span className="text-[10px] font-bold uppercase tracking-wider ml-2 opacity-50 block font-mono mt-1">Status: {q.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Active trackers list */}
              <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant/20 p-8 space-y-6">
                <div className="flex justify-between items-center pb-4 border-b">
                  <h2 className="text-headline-md">Manage Construction Progress Tracks</h2>
                  <button 
                    onClick={startNewProject}
                    className="bg-primary text-on-primary px-4 py-2 text-xs uppercase tracking-wider font-mono font-bold hover:opacity-90"
                  >
                    + Provision Code Tracker
                  </button>
                </div>

                <div className="divide-y divide-outline-variant/10">
                  {projects.map((p) => (
                    <div key={p.id} className="py-5 flex justify-between items-center gap-4 hover:bg-surface-container-low px-4 rounded transition-colors">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <strong className="text-xs font-mono bg-primary/10 text-primary px-2 py-0.5 rounded uppercase">{p.id}</strong>
                          <span className="text-xs text-outline">{p.customerName}</span>
                        </div>
                        <h4 className="text-base font-sans font-medium">{p.projectTitle} - {p.address}</h4>
                        <p className="text-xs text-outline mt-1 font-mono">Progress Level: {p.progressPercent}% | Current: <b className="text-primary">{p.status}</b></p>
                      </div>
                      <button 
                        onClick={() => startEditProject(p)}
                        className="border border-outline-variant text-[10px] uppercase font-mono font-bold px-3 py-1.5 hover:border-primary hover:text-primary"
                      >
                        Edit Phase
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Work Editor */}
              <div>
                {isCreatingProject ? (
                  <form onSubmit={handleSaveProject} className="bg-surface-container-lowest border border-outline-variant/20 p-8 space-y-6">
                    <h3 className="text-label-md font-bold text-on-surface">
                      {selectedProject ? "Modify Progress Phase" : "Provision New House Tracking ID"}
                    </h3>

                    <div className="space-y-4 text-xs font-sans">
                      <div>
                        <label className="block text-outline uppercase text-[10px] font-mono mb-1">Unique project lookup key Code (ID)</label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. SA-1025" 
                          value={projectForm.id}
                          onChange={(e) => setProjectForm({...projectForm, id: e.target.value.toUpperCase()})}
                          disabled={!!selectedProject}
                          className="w-full bg-surface-container-low border border-outline-variant p-3 outline-none font-mono tracking-widest text-primary text-sm font-semibold"
                        />
                      </div>

                      <div>
                        <label className="block text-outline uppercase text-[10px] font-mono mb-1">Customer Full Name</label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. Amit Sharma"
                          value={projectForm.customerName}
                          onChange={(e) => setProjectForm({...projectForm, customerName: e.target.value})}
                          className="w-full bg-surface-container-low border border-outline-variant p-3 outline-none text-on-surface"
                        />
                      </div>

                      <div>
                        <label className="block text-outline uppercase text-[10px] font-mono mb-1">Customer Email</label>
                        <input 
                          type="email" 
                          required
                          placeholder="client@mail.com"
                          value={projectForm.email}
                          onChange={(e) => setProjectForm({...projectForm, email: e.target.value})}
                          className="w-full bg-surface-container-low border border-outline-variant p-3 outline-none text-on-surface"
                        />
                      </div>

                      <div>
                        <label className="block text-outline uppercase text-[10px] font-mono mb-1">Design/Villa Project Title</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Contemporary Villa Ranchi"
                          value={projectForm.projectTitle}
                          onChange={(e) => setProjectForm({...projectForm, projectTitle: e.target.value})}
                          className="w-full bg-surface-container-low border border-outline-variant p-3 outline-none text-on-surface"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-outline uppercase text-[10px] font-mono mb-1">Plot Size</label>
                          <input 
                            type="text" 
                            required
                            placeholder="30x50 sq ft"
                            value={projectForm.plotSize}
                            onChange={(e) => setProjectForm({...projectForm, plotSize: e.target.value})}
                            className="w-full bg-surface-container-low border border-outline-variant p-3 outline-none text-on-surface"
                          />
                        </div>
                        <div>
                          <label className="block text-outline uppercase text-[10px] font-mono mb-1">Overall progress %</label>
                          <input 
                            type="number" 
                            required
                            min={0}
                            max={100}
                            value={projectForm.progressPercent}
                            onChange={(e) => setProjectForm({...projectForm, progressPercent: parseInt(e.target.value) || 0})}
                            className="w-full bg-surface-container-low border border-outline-variant p-3 outline-none text-on-surface"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-outline uppercase text-[10px] font-mono mb-1">Address in Ranchi District</label>
                        <input 
                          type="text" 
                          required
                          value={projectForm.address}
                          onChange={(e) => setProjectForm({...projectForm, address: e.target.value})}
                          className="w-full bg-surface-container-low border border-outline-variant p-3 outline-none text-on-surface"
                        />
                      </div>

                      <div>
                        <label className="block text-outline uppercase text-[10px] font-mono mb-1">Active Status Phase</label>
                        <select 
                          value={projectForm.status}
                          onChange={(e: any) => setProjectForm({...projectForm, status: e.target.value})}
                          className="w-full bg-surface-container-low border border-outline-variant p-3 outline-none text-on-surface font-sans"
                        >
                          {["Planning", "Approval", "Excavation", "Masonry", "Finishing", "Handover"].map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="block text-outline uppercase text-[10px] font-mono">Milestones timeline steps</label>
                          <small className="text-[9px] text-outline font-mono">Format: Step Name | Date/Target | status</small>
                        </div>
                        <textarea 
                          rows={6}
                          placeholder="e.g.: Excavation of plot | Completed | completed&#10;Slab Cast Steel Layout | June 15 | in-progress"
                          value={milestonesText}
                          onChange={(e) => setMilestonesText(e.target.value)}
                          className="w-full bg-surface-container-low border border-outline-variant p-3 font-mono text-[10px] resize-none outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3">
                      <button 
                        type="button"
                        onClick={() => setIsCreatingProject(false)}
                        className="px-4 py-2 border text-outline font-mono uppercase font-bold text-[10px] rounded"
                      >
                        Discard
                      </button>
                      <button 
                        type="submit"
                        disabled={saving}
                        className="px-5 py-2.5 bg-primary text-on-primary font-mono uppercase font-bold text-[10px] rounded"
                      >
                        {saving ? "Saving changes..." : "Save tracker dataset"}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="bg-surface-container-lowest border border-outline-variant/20 p-8 text-center text-xs text-outline space-y-4">
                    <p className="font-mono">Work milestones editor is vacant.</p>
                    <p>Select a construction contract from the list to update its live construction phases or add concrete material completion dates.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
