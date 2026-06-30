/**
 * Team directory — drives /about-us and /about-us/meet-the-team. Member `slug`
 * is used as an in-page anchor id on the Meet the Team page. Content verified
 * against the live About Us page (2026-06).
 *
 * `languages` defaults to English (placeholder) — confirm/extend with the
 * practice if team members speak additional languages.
 */

export type TeamMember = {
  /** In-page anchor id on /about-us/meet-the-team. */
  slug: string;
  name: string;
  /** Professional title / role. */
  role: string;
  /** Credentials line (letters after the name). */
  credentials?: string;
  /** Self-hosted photo, or null to render an initials avatar. */
  image: { src: string; width: number; height: number } | null;
  /** Short bio. */
  bio: string;
  /** Languages spoken (placeholder default — confirm with practice). */
  languages?: string[];
  /** True for dentists (used for Person JSON-LD on the team page). */
  isDentist?: boolean;
  order: number;
};

const DIR = "/assets/images";

export const team: TeamMember[] = [
  {
    slug: "dr-zaid-gabriel",
    name: "Dr. Zaid Gabriel",
    role: "General Dentist",
    credentials: "DMD, MHSc",
    image: { src: `${DIR}/dr-zaid-gabriel-dentist-hamilton.jpg`, width: 661, height: 969 },
    bio: "Dr. Gabriel earned his Doctor of Dental Medicine from the University of Manitoba and holds advanced master's degrees in health-care quality improvement and bioethics. He focuses on restorative and cosmetic dentistry, root canal treatment, extractions and dentures, and believes patients should be free from pain, comfortable during their visit, and empowered to make informed decisions. He is a member of the Royal College of Dental Surgeons of Ontario and the Ontario Dental Association.",
    languages: ["English"],
    isDentist: true,
    order: 1,
  },
  {
    slug: "dr-fadi-bahnam",
    name: "Dr. Fadi Bahnam",
    role: "Dentist",
    credentials: "DDS",
    image: { src: `${DIR}/dr-fadi-bahnam-dentist-hamilton.png`, width: 568, height: 781 },
    bio: "Dr. Bahnam earned his dental degree from University College Cork in Ireland and completed an implant residency at the University of Toronto. He focuses on oral surgical procedures including implant placement and restoration, gum grafting, wisdom teeth removal and oral sedation, and practises patient-centred care tailored to each person's needs.",
    languages: ["English"],
    isDentist: true,
    order: 2,
  },
  {
    slug: "emma",
    name: "Emma",
    role: "Registered Dental Hygienist",
    image: { src: `${DIR}/team-emma-hamilton-city-dental.jpg`, width: 1280, height: 1920 },
    bio: "Emma provides gentle, thorough cleanings and personalised home-care guidance to help keep your smile healthy between visits.",
    languages: ["English"],
    order: 3,
  },
  {
    slug: "makayla",
    name: "Makayla",
    role: "Registered Dental Hygienist",
    image: { src: `${DIR}/team-makayla-hamilton-city-dental.jpg`, width: 1280, height: 1920 },
    bio: "Makayla helps patients of all ages feel at ease while delivering comfortable, detail-focused dental hygiene care.",
    languages: ["English"],
    order: 4,
  },
  {
    slug: "maha",
    name: "Maha",
    role: "Dental Assistant",
    image: { src: `${DIR}/team-maha-hamilton-city-dental.jpg`, width: 1280, height: 1920 },
    bio: "Maha supports our dentists chairside and makes sure every patient feels comfortable and well cared for during treatment.",
    languages: ["English"],
    order: 5,
  },
  {
    slug: "shernette",
    name: "Shernette",
    role: "Dental Coordinator",
    image: { src: `${DIR}/team-shernette-hamilton-city-dental.avif`, width: 480, height: 640 },
    bio: "Shernette coordinates appointments, insurance and CDCP billing, and is often the first friendly voice you will hear at Hamilton City Dental.",
    languages: ["English"],
    order: 6,
  },
];

export const teamByOrder = [...team].sort((a, b) => a.order - b.order);

export function getTeamMember(slug: string): TeamMember | undefined {
  return team.find((m) => m.slug === slug);
}

export const dentists = team.filter((m) => m.isDentist);
export const teamSlugs = team.map((m) => m.slug);
