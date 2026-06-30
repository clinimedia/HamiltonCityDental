/**
 * Shape of the long-form body content rendered on each /services/[slug] page.
 * One content object per service lives in lib/content/services/<slug>.ts and is
 * registered in lib/service-content.ts.
 */

export type SCParagraph = string;
export type SCBenefit = { title: string; body: string };
export type SCStep = { title: string; body: string };
export type SCFaq = { q: string; a: string };

export type ServiceContent = {
  /** 1–2 paragraphs: what the treatment is. */
  whatItIs: SCParagraph[];
  /** 1 paragraph: who it's for / good candidates. */
  whoFor: SCParagraph;
  /** 3–5 key benefits. */
  benefits: SCBenefit[];
  /** 3–5 "what to expect" steps, in order. */
  whatToExpect: SCStep[];
  /** 4–6 signs a patient may need this treatment. */
  signs: string[];
  /** 3–5 aftercare / maintenance tips. */
  aftercare: string[];
  /** Closing paragraph (affordability / CDCP / call to action context). */
  closing: SCParagraph;
  /** 3–5 service-specific FAQs (unique to this service — no cannibalisation). */
  faqs: SCFaq[];
};
