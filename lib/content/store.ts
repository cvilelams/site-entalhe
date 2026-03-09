import { landingData } from "../landing-data";

export type SectionVisibilityItem = {
  section: string;
  label: string;
  is_visible: boolean;
  order_index: number;
};

export type ContentPayload = {
  sections: Record<string, Record<string, string>>;
  collections: {
    modules: Array<{ id: string; title: string; description: string; icon?: string }>;
    instructors: Array<{ id: string; name: string; bio: string; photo_url?: string }>;
    testimonials: Array<{ id: string; name: string; role?: string; text: string; photo_url?: string }>;
    faq: Array<{ id: string; question: string; answer: string }>;
  };
};

const defaultVisibility: SectionVisibilityItem[] = [
  { section: "hero", label: "Hero (Topo)", is_visible: true, order_index: 1 },
  { section: "social_proof", label: "Barra de Impacto", is_visible: true, order_index: 2 },
  { section: "course_overview", label: "Visao Geral do Curso", is_visible: true, order_index: 3 },
  { section: "modules", label: "Modulos do Curso", is_visible: true, order_index: 4 },
  { section: "instructors", label: "Instrutoras", is_visible: true, order_index: 5 },
  { section: "testimonials", label: "Depoimentos", is_visible: true, order_index: 6 },
  { section: "guarantee", label: "Garantia", is_visible: true, order_index: 7 },
  { section: "faq", label: "FAQ", is_visible: true, order_index: 8 },
  { section: "final_cta", label: "CTA Final", is_visible: true, order_index: 9 },
];

let state: {
  content: ContentPayload;
  visibility: SectionVisibilityItem[];
} = {
  content: {
    sections: {
      hero: landingData.hero,
      social_proof: landingData.socialProof,
      course_overview: landingData.courseOverview,
      guarantee: landingData.guarantee,
      final_cta: landingData.finalCta,
    },
    collections: {
      modules: landingData.modules,
      instructors: landingData.instructors,
      testimonials: landingData.testimonials,
      faq: landingData.faq,
    },
  },
  visibility: defaultVisibility,
};

export function getContent() {
  return state.content;
}

export function putSectionValue(section: string, key: string, value: string) {
  const current = state.content.sections[section] ?? {};
  state = {
    ...state,
    content: {
      ...state.content,
      sections: {
        ...state.content.sections,
        [section]: { ...current, [key]: value },
      },
    },
  };
  return state.content.sections[section];
}

export function getVisibility() {
  return [...state.visibility].sort((a, b) => a.order_index - b.order_index);
}

export function putVisibility(section: string, isVisible: boolean) {
  state = {
    ...state,
    visibility: state.visibility.map((item) =>
      item.section === section ? { ...item, is_visible: isVisible } : item,
    ),
  };
  return getVisibility();
}
