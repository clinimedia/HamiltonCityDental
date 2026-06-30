/**
 * Body content for each /blog/[slug] post. One object per post lives in
 * lib/content/blog/<slug>.ts and is registered in lib/post-content.ts.
 */

export type PCSection = { heading: string; paragraphs: string[] };
export type PCFaq = { q: string; a: string };

export type PostContent = {
  /** 1–2 opening paragraphs. */
  intro: string[];
  /** 4–6 H2 sections, each 1–3 paragraphs. */
  sections: PCSection[];
  /** 3–5 bullet key takeaways. */
  keyTakeaways: string[];
  /** 3–5 post-specific FAQs. */
  faqs: PCFaq[];
};
