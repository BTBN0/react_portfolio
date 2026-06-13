import { db } from "./firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const CERTS = "certifications";
const PROJECTS = "projects";

export async function listCertifications() {
  const snap = await getDocs(collection(db, CERTS));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function listProjects() {
  const snap = await getDocs(collection(db, PROJECTS));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function addCertification({ name, bio, imageFile }) {
  const imageUrl = await fileToDataUrl(imageFile);
  return addDoc(collection(db, CERTS), { name, bio, imageUrl });
}

export async function addProject({ name, bio, link, imageFile }) {
  const imageUrl = await fileToDataUrl(imageFile);
  return addDoc(collection(db, PROJECTS), { name, bio, link, imageUrl });
}

export async function updateCertification(id, data) {
  return updateDoc(doc(db, CERTS, id), data);
}

export async function updateProject(id, data) {
  return updateDoc(doc(db, PROJECTS, id), data);
}

export async function deleteCertification(id) {
  return deleteDoc(doc(db, CERTS, id));
}

export async function deleteProject(id) {
  return deleteDoc(doc(db, PROJECTS, id));
}

function fileToDataUrl(file) {
  if (!file) return Promise.resolve("");
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
