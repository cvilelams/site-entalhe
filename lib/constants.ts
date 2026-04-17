export const SITE_NAME = "Entalhe em madeira com faca";

export const SITE_DESCRIPTION =
  "Um curso para aprender na prática todos os fundamentos da técnica de entalhe com faca. Do bloco de madeira maciça à capivarinha, faça parte dessa comunidade e entalhe sua primeira peça de muitas!";

export const MAX_UPLOAD_MB = 15;

export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm"];

export const ADMIN_SESSION_KEY = "oficina-cigarra-admin";
export const SECTIONS = {
  HERO: "hero",
  SOCIAL_PROOF: "social_proof",
  COURSE_OVERVIEW: "course_overview",
  MODULES: "modules",
  INSTRUCTORS: "instructors",
  TESTIMONIALS: "testimonials",
  GUARANTEE: "guarantee",
  FAQ: "faq",
  FINAL_CTA: "final_cta",
  FOOTER: "footer",
} as const;

export type SectionKey = (typeof SECTIONS)[keyof typeof SECTIONS];

export const DESIGN_TOKENS = {
  colors: {
    washi: "#F5F0E8",
    sumi: "#1C1917",
    urushi: "#6B4E2A",
    kinari: "#A89070",
    shiro: "#E8E0D0",
  },
};

