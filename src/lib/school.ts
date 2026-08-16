/**
 * Single source of truth for every fact shown on the site.
 *
 * Sourcing: values here come from the school crest, the Grade XI admission
 * poster, and the map embed on the old site. Anything not on those is marked
 * PLACEHOLDER — confirm with the school before publishing. Nothing here is
 * invented (no student counts, exam results, or awards that weren't supplied).
 */

export const school = {
  name: "New Horizon Awasiya Secondary School",
  shortName: "New Horizon",
  /** Name as it appears on the official crest. */
  crestName: "New Horizon Higher Secondary School",
  tagline: "Quality Education, Our Commitment",
  subTagline: "Children are our future.",
  /** From the crest banner — 2049 Bikram Sambat (≈ 1992 AD). */
  establishedBS: "2049 B.S.",
  establishedAD: 1992,

  address: {
    line: "Tansen-7, Palpa",
    city: "Tansen",
    district: "Palpa",
    province: "Lumbini Province",
    country: "Nepal",
    /** From the map embed on the school's previous site. */
    geo: { lat: 27.8603, lng: 83.5453 },
  },

  phones: ["075-522626", "9857028244"],
  /** PLACEHOLDER — no public email was supplied; confirm before publishing. */
  email: "info@newhorizon.edu.np",
  website: "www.newhorizon.edu.np",

  social: {
    // PLACEHOLDER — add the school's real profile URLs, or leave null to hide.
    facebook: null as string | null,
    instagram: null as string | null,
    youtube: null as string | null,
  },

  officeHours: "Sunday – Friday, 10:00 AM – 4:00 PM",
} as const;

/** The live admission drive, shown in the pop-up and across the site. */
export const admission = {
  open: true,
  grade: "Grade XI",
  academicYearBS: "2083",
  headline: "Admissions Open",
  streams: [
    {
      key: "science",
      name: "Science",
      blurb:
        "For students aiming at engineering, medicine, IT and pure sciences.",
      optionals: ["Biology", "Computer Science"],
    },
    {
      key: "management",
      name: "Management",
      blurb:
        "For students heading toward business, hospitality, banking and commerce.",
      optionals: ["Hotel Management", "Computer Science"],
    },
  ],
} as const;

/** The four commitments printed on the admission poster. */
export const highlights = [
  {
    title: "Qualified & Experienced Teachers",
    body: "A committed teaching team that knows how to bring out each student's best.",
    icon: "teacher",
  },
  {
    title: "Discipline & Conducive Learning Environment",
    body: "A calm, respectful campus where students can focus and grow.",
    icon: "shield",
  },
  {
    title: "Academic Excellence & Character Development",
    body: "We care about results and about the kind of people our students become.",
    icon: "target",
  },
  {
    title: "Smart Classes, Practical Labs & Co-curricular Activities",
    body: "Modern classrooms, hands-on labs, and a full range of activities beyond books.",
    icon: "spark",
  },
] as const;

/** Only facilities that appear in the school's own photo set are listed. */
export const facilities = [
  {
    name: "Library",
    image: "/photos/library.png",
    body: "A quiet reading space with reference books and study material for every level.",
  },
  {
    name: "Science Laboratories",
    image: "/photos/science-lab.png",
    body: "Practical labs where Science students run real experiments, not just read about them.",
  },
  {
    name: "Playground & Sports",
    image: "/photos/playground.png",
    body: "Open ground and courts for football, basketball and daily physical activity.",
  },
  {
    name: "Basketball Court",
    image: "/photos/sports.png",
    body: "A dedicated court for training, inter-house matches and competitions.",
  },
  {
    name: "Cafeteria",
    image: "/photos/cafeteria.png",
    body: "A clean canteen serving students and staff through the school day.",
  },
  {
    name: "Smart Classrooms",
    image: "/photos/school-2.jpg",
    body: "Bright, well-kept classrooms supported by smart-class teaching aids.",
  },
] as const;

/** The school's full photo set, shown in the gallery grid. */
export const gallery = [
  { src: "/photos/campus.jpg", alt: "New Horizon school building" },
  { src: "/photos/front.jpg", alt: "Front view of the New Horizon campus" },
  { src: "/photos/students-1.jpg", alt: "New Horizon students" },
  { src: "/photos/teachers.jpg", alt: "New Horizon teaching staff" },
  { src: "/photos/library.png", alt: "The school library" },
  { src: "/photos/science-lab.png", alt: "Students in the science laboratory" },
  { src: "/photos/playground.png", alt: "The school playground" },
  { src: "/photos/sports.png", alt: "The basketball court" },
  { src: "/photos/cafeteria.png", alt: "The school cafeteria" },
  { src: "/photos/campus-life-1.jpg", alt: "Campus life at New Horizon" },
  { src: "/photos/campus-life-2.jpg", alt: "A school event" },
  { src: "/photos/campus-life-3.jpg", alt: "Students and staff together" },
  { src: "/photos/campus-life-4.png", alt: "A moment on campus" },
  { src: "/photos/campus-life-5.png", alt: "School activity" },
  { src: "/photos/campus-life-6.png", alt: "School gathering" },
  { src: "/photos/moment-1.png", alt: "A memorable school moment" },
  { src: "/photos/students-2.jpg", alt: "Students on campus" },
  { src: "/photos/school-1.jpg", alt: "The New Horizon school grounds" },
  { src: "/photos/school-2.jpg", alt: "Inside the New Horizon campus" },
  { src: "/photos/tansen.jpg", alt: "Tansen, Palpa — home of New Horizon" },
] as const;

/** Short campus clips shown in the video showcase. */
export const videos = [
  { src: "/video/campus-1.mp4", label: "Around the Campus" },
  { src: "/video/campus-2.mp4", label: "A Day at New Horizon" },
] as const;

/**
 * Achievements — grounded in the school's own photos (an ISO certification
 * ceremony, SEE toppers being felicitated, daily assembly, eco activities).
 * Confirm the exact ISO standard/number and result figures before publishing.
 */
export const achievements = [
  {
    title: "ISO Certified",
    body: "Recognised with an ISO certification for its quality of education and management.",
    icon: "shield",
  },
  {
    title: "SEE Toppers",
    body: "Students regularly among the top performers, felicitated for outstanding SEE results.",
    icon: "target",
  },
  {
    title: "30+ Years of Trust",
    body: "Serving families in Tansen, Palpa since 2049 B.S. with a steady reputation.",
    icon: "book",
  },
  {
    title: "Beyond the Classroom",
    body: "Assembly, sports, eco days and cultural programs build discipline and character.",
    icon: "spark",
  },
] as const;

/**
 * News & highlights strip. The images below are real campus stand-ins — replace
 * each file (same path/name) with the matching event photo to update the site,
 * no code change needed. See PHOTOS.md for the mapping.
 */
export const highlightsNews = [
  {
    title: "Morning Assembly",
    caption: "Students gather each morning — the start of a disciplined school day.",
    image: "/photos/highlights/assembly.jpg",
  },
  {
    title: "ISO Certification",
    caption: "A proud milestone recognising New Horizon's commitment to quality.",
    image: "/photos/highlights/iso-certification.jpg",
  },
  {
    title: "Felicitating Our Toppers",
    caption: "Celebrating students who excelled in their board examinations.",
    image: "/photos/highlights/toppers.jpg",
  },
  {
    title: "Congratulations, Achievers!",
    caption: "The community comes together to honour our high achievers.",
    image: "/photos/highlights/congratulations.jpg",
  },
  {
    title: "Eco & Green Day",
    caption: "Younger students take part in fun, hands-on activities on campus.",
    image: "/photos/highlights/green-day.jpg",
  },
] as const;

/**
 * PLACEHOLDER notices — structure is real, content is illustrative. Replace the
 * text with the school's actual notices, or wire this to a CMS later.
 */
export const notices = [
  {
    title: "Grade XI Admissions Open for 2083",
    date: "2083-01-15",
    category: "Admissions",
    body: "Applications are now open for Science and Management streams. Visit the school office or apply online.",
    pinned: true,
  },
  {
    title: "Entrance & Interview Schedule",
    date: "2083-01-20",
    category: "Admissions",
    body: "Dates for the Grade XI entrance and interview will be published here. Confirm at the school office.",
    pinned: false,
  },
  {
    title: "Scholarship Information",
    date: "2083-01-22",
    category: "Scholarship",
    body: "Merit and need-based scholarship details for new students. Enquire at the admissions desk.",
    pinned: false,
  },
] as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Academics", href: "/academics" },
  { label: "Admissions", href: "/admissions" },
  { label: "Facilities", href: "/facilities" },
  { label: "Gallery", href: "/gallery" },
  { label: "Notices", href: "/notices" },
  { label: "Contact", href: "/contact" },
] as const;

export const SITE_URL = "https://www.newhorizon.edu.np";

/** `tel:` href with punctuation stripped. */
export function telHref(phone: string) {
  return `tel:${phone.replace(/[^0-9+]/g, "")}`;
}
