import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const DATA_DIR = path.join(process.cwd(), "data");
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const QUERIES_FILE = path.join(DATA_DIR, "queries-database.json");
const PROJECTS_FILE = path.join(DATA_DIR, "projects-database.json");

// Helper to safely read files or fallback
function readJSONFile(filePath: string, defaultVal: any[]) {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
  }
  return defaultVal;
}

// Helper to safely write files
function writeJSONFile(filePath: string, data: any) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error(`Error writing to ${filePath}:`, error);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // API Route: Client Consultation Inquiry Submission
  app.post("/api/contact", (req, res) => {
    const { name, email, phone, message } = req.body;
    
    // Read and save to local JSON file
    const queries = readJSONFile(QUERIES_FILE, []);
    const projects = readJSONFile(PROJECTS_FILE, []);

    // Generate a unique client code
    const uniqueNum = Math.floor(1000 + Math.random() * 9000);
    const newProjectCode = `SA-${uniqueNum}`;

    const newQuery = {
      id: `q-${queries.length + 1}`,
      name: name || "Anonymous Client",
      email: email || "no-email@sa.com",
      phone: phone || "no-phone",
      message: message || "",
      status: "pending",
      projectCode: newProjectCode,
      createdAt: new Date().toISOString()
    };

    queries.push(newQuery);
    writeJSONFile(QUERIES_FILE, queries);

    // Also auto-provision a preliminary client progress tracker
    const newProject = {
      id: newProjectCode,
      customerName: name || "Anonymous Client",
      email: email || "no-email@sa.com",
      projectTitle: "Residential Design Project",
      plotSize: "Standard Plot",
      address: "Ranchi, Jharkhand, India",
      progressPercent: 5,
      status: "Planning",
      milestones: [
        { title: "Consultation Request Submitted", date: new Date().toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' }), status: "completed" },
        { title: "Site Inspection & Structural Design Study", date: "TBD", status: "pending" },
        { title: "RRDA Sanction & Clearances", date: "TBD", status: "pending" },
        { title: "Foundation Layout & Excavation Work", date: "TBD", status: "pending" },
        { title: "Brickwork & Masonry Structure", date: "TBD", status: "pending" },
        { title: "Plastering & Interior Finishings", date: "TBD", status: "pending" },
        { title: "Final Handover & Vastu Key Ceremony", date: "TBD", status: "pending" }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    projects.push(newProject);
    writeJSONFile(PROJECTS_FILE, projects);

    console.log("Registered new client inquiry:", newQuery);

    res.json({
      success: true,
      message: "Inquiry successfully recorded.",
      projectCode: newProjectCode
    });
  });

  // API Route: Fetch all inquiries for the ADMIN panel
  app.get("/api/admin/inquiries", (req, res) => {
    const queries = readJSONFile(QUERIES_FILE, []);
    res.json(queries);
  });

  // API Route: Update an inquiry status (e.g. mark contacted)
  app.put("/api/admin/inquiries/:id", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const queries = readJSONFile(QUERIES_FILE, []);

    const inquiryIdx = queries.findIndex((q: any) => q.id === id);
    if (inquiryIdx > -1) {
      queries[inquiryIdx].status = status;
      writeJSONFile(QUERIES_FILE, queries);
      return res.json({ success: true, message: "Inquiry status updated successfully." });
    }
    res.status(404).json({ error: "Inquiry not found" });
  });

  // API Route: Fetch all active customer projects
  app.get("/api/admin/projects", (req, res) => {
    const projects = readJSONFile(PROJECTS_FILE, []);
    res.json(projects);
  });

  // API Route: Get a specific project by its Tracking Code (Ranchi Customer Portal lookup)
  app.get("/api/projects/:id", (req, res) => {
    const { id } = req.params;
    const projects = readJSONFile(PROJECTS_FILE, []);
    const project = projects.find((p: any) => p.id.toUpperCase() === id.toUpperCase());
    
    if (project) {
      return res.json(project);
    }
    res.status(404).json({ error: `No active project found with Tracking ID: ${id}` });
  });

  // API Route: Create or update standard customer project tracking milestones from the Admin panel
  app.post("/api/admin/projects", (req, res) => {
    const project = req.body;
    const projects = readJSONFile(PROJECTS_FILE, []);

    const idx = projects.findIndex((p: any) => p.id.toUpperCase() === project.id.toUpperCase());
    const timestampedProject = {
      ...project,
      updatedAt: new Date().toISOString()
    };

    if (idx > -1) {
      projects[idx] = { ...projects[idx], ...timestampedProject };
    } else {
      timestampedProject.createdAt = new Date().toISOString();
      projects.push(timestampedProject);
    }

    writeJSONFile(PROJECTS_FILE, projects);
    res.json({ success: true, project: timestampedProject });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
