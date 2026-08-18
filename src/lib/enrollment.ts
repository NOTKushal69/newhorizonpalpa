/**
 * Enrollment records for the /enrollment admin page.
 *
 * This is a static site (no backend), so records are kept in the browser's
 * localStorage — each device has its own list, and nothing is sent to a server.
 * That keeps student data off any public endpoint. For a shared, central
 * database across staff, the site would need a backend + auth (a later step).
 */

export type EnrollmentStatus = "New" | "Contacted" | "Enrolled" | "Rejected";

export type Enrollment = {
  id: string;
  studentName: string;
  dob: string;
  gender: string;
  grade: string;
  guardianName: string;
  phone: string;
  email: string;
  previousSchool: string;
  address: string;
  status: EnrollmentStatus;
  notes: string;
  createdAt: string;
};

export type EnrollmentInput = Omit<Enrollment, "id" | "createdAt">;

/** Field definitions drive both the form and the table columns. */
export const ENROLLMENT_FIELDS: {
  key: keyof EnrollmentInput;
  label: string;
  type: "text" | "date" | "tel" | "email" | "select" | "textarea";
  required?: boolean;
  options?: readonly string[];
  full?: boolean;
}[] = [
  { key: "studentName", label: "Student name", type: "text", required: true, full: true },
  { key: "dob", label: "Date of birth", type: "date" },
  { key: "gender", label: "Gender", type: "select", options: ["Female", "Male", "Other"] },
  {
    key: "grade",
    label: "Applying for",
    type: "select",
    options: ["Grade XI — Science", "Grade XI — Management", "Other"],
  },
  { key: "guardianName", label: "Parent / guardian", type: "text", required: true },
  { key: "phone", label: "Phone", type: "tel", required: true },
  { key: "email", label: "Email", type: "email" },
  { key: "previousSchool", label: "Previous school", type: "text" },
  { key: "address", label: "Address", type: "text", full: true },
  {
    key: "status",
    label: "Status",
    type: "select",
    options: ["New", "Contacted", "Enrolled", "Rejected"],
  },
  { key: "notes", label: "Notes", type: "textarea", full: true },
];

export const STATUS_OPTIONS: EnrollmentStatus[] = [
  "New",
  "Contacted",
  "Enrolled",
  "Rejected",
];

export const emptyEnrollment: EnrollmentInput = {
  studentName: "",
  dob: "",
  gender: "",
  grade: "Grade XI — Science",
  guardianName: "",
  phone: "",
  email: "",
  previousSchool: "",
  address: "",
  status: "New",
  notes: "",
};

const STORAGE_KEY = "nh_enrollments";

export function loadEnrollments(): Enrollment[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Enrollment[]) : [];
  } catch {
    return [];
  }
}

export function saveEnrollments(list: Enrollment[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function makeId(): string {
  return `enr_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

/** Human-readable column headers for the Excel/CSV export, in order. */
export const EXPORT_COLUMNS: { key: keyof Enrollment; header: string }[] = [
  { key: "studentName", header: "Student Name" },
  { key: "dob", header: "Date of Birth" },
  { key: "gender", header: "Gender" },
  { key: "grade", header: "Applying For" },
  { key: "guardianName", header: "Parent / Guardian" },
  { key: "phone", header: "Phone" },
  { key: "email", header: "Email" },
  { key: "previousSchool", header: "Previous School" },
  { key: "address", header: "Address" },
  { key: "status", header: "Status" },
  { key: "notes", header: "Notes" },
  { key: "createdAt", header: "Added On" },
];
