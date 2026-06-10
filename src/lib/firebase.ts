import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  getDocFromServer, 
  getDoc, 
  getDocs, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  collection, 
  query, 
  where, 
  orderBy, 
  limit, 
  serverTimestamp 
} from "firebase/firestore";
import firebaseConfig from "../../firebase-applet-config.json";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth();

// Test Connection
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, "test", "connection"));
    console.log("Firebase Connection verified successfully.");
  } catch (error) {
    if (error instanceof Error && error.message.includes("offline")) {
      console.error("Please check your Firebase configuration or network.");
    }
  }
}
testConnection();

// Operation Types for error handling conformity
export enum OperationType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  LIST = "list",
  GET = "get",
  WRITE = "write",
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    isAnonymous?: boolean | null;
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
      isAnonymous: auth.currentUser?.isAnonymous || null,
    },
    operationType,
    path
  };
  console.error("Firestore Error: ", JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Typings for our models
export interface CustomerInquiry {
  id?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: "pending" | "contacted" | "project_created";
  projectCode?: string;
  createdAt: any;
}

export interface ProjectMilestone {
  title: string;
  date: string;
  status: "pending" | "in-progress" | "completed";
}

export interface ConstructionProject {
  id: string; // e.g. SA-1025
  customerName: string;
  email: string;
  projectTitle: string;
  plotSize: string;
  address: string;
  progressPercent: number;
  status: "Planning" | "Approval" | "Excavation" | "Masonry" | "Finishing" | "Handover";
  milestones?: ProjectMilestone[];
  createdAt: any;
  updatedAt: any;
}

// Core Operations wrapper

// 1. Inquiries
export async function createInquiry(name: string, email: string, phone: string, message: string): Promise<string> {
  const path = "inquiries";
  try {
    const docRef = await addDoc(collection(db, path), {
      name,
      email,
      phone,
      message,
      status: "pending",
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    return handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function fetchInquiries(): Promise<CustomerInquiry[]> {
  const path = "inquiries";
  try {
    const q = query(collection(db, path), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as CustomerInquiry[];
  } catch (error) {
    return handleFirestoreError(error, OperationType.LIST, path);
  }
}

export async function updateInquiryStatus(id: string, status: "pending" | "contacted" | "project_created", projectCode?: string) {
  const path = `inquiries/${id}`;
  try {
    const docRef = doc(db, "inquiries", id);
    const updateData: any = { status };
    if (projectCode) {
      updateData.projectCode = projectCode;
    }
    await updateDoc(docRef, updateData);
  } catch (error) {
    return handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

// 2. Projects
export async function createConstructionProject(project: Omit<ConstructionProject, "createdAt" | "updatedAt">): Promise<void> {
  const path = `projects/${project.id}`;
  try {
    const docRef = doc(db, "projects", project.id);
    await setDoc(docRef, {
      ...project,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    return handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function fetchProject(id: string): Promise<ConstructionProject | null> {
  const path = `projects/${id}`;
  try {
    const docRef = doc(db, "projects", id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    return docSnap.data() as ConstructionProject;
  } catch (error) {
    return handleFirestoreError(error, OperationType.GET, path);
  }
}

export async function fetchAllProjects(): Promise<ConstructionProject[]> {
  const path = "projects";
  try {
    const snapshot = await getDocs(collection(db, path));
    return snapshot.docs.map(doc => doc.data()) as ConstructionProject[];
  } catch (error) {
    return handleFirestoreError(error, OperationType.LIST, path);
  }
}

export async function updateProjectProgress(
  id: string, 
  progressPercent: number, 
  status: "Planning" | "Approval" | "Excavation" | "Masonry" | "Finishing" | "Handover",
  milestones?: ProjectMilestone[]
) {
  const path = `projects/${id}`;
  try {
    const docRef = doc(db, "projects", id);
    const updateData: any = {
      progressPercent,
      status,
      updatedAt: serverTimestamp()
    };
    if (milestones) {
      updateData.milestones = milestones;
    }
    await updateDoc(docRef, updateData);
  } catch (error) {
    return handleFirestoreError(error, OperationType.UPDATE, path);
  }
}
