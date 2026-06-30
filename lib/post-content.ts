import type { PostContent } from "@/lib/post-content-types";
import newYearNewSmile from "@/lib/content/blog/new-year-new-smile-in-hamilton-start-2026-with-better-oral-health-fresh-dental-benefits";
import dentalResolutions from "@/lib/content/blog/dental-resolutions-that-actually-work-a-hamilton-dentists-guide-to-better-oral-health";
import cdcp2026 from "@/lib/content/blog/how-to-use-your-cdcp-benefits-at-hamilton-city-dental-in-2026";
import smileMakeovers from "@/lib/content/blog/affordable-smile-makeovers-in-hamilton-cdcp-financing-cosmetic-options";
import invisalignNearMe from "@/lib/content/blog/invisalign-near-me-in-hamilton-what-you-need-to-know-before-starting-treatment";
import professionalWhitening from "@/lib/content/blog/professional-teeth-whitening-in-hamilton-brighter-smiles-at-hamilton-city-dental";
import implantsPost from "@/lib/content/blog/dental-implants-in-hamilton-permanent-tooth-replacement-at-hamilton-city-dental";
import childrensDentistPost from "@/lib/content/blog/childrens-dentist-in-hamilton-gentle-pediatric-dental-care-at-hamilton-city-dental";
import rootCanalPost from "@/lib/content/blog/root-canal-hamilton-what-to-expect-hamilton-city-dental";
import wisdomTeethPost from "@/lib/content/blog/wisdom-teeth-removal-in-hamilton-hamilton-city-dental";
import oneVisitCrowns from "@/lib/content/blog/one-visit-crowns-in-hamilton";
import emergencySeverePain from "@/lib/content/blog/emergency-dentist-in-hamilton-what-to-do-if-you-have-severe-tooth-pain";
import toothPainWhenToSee from "@/lib/content/blog/tooth-pain-near-me-when-to-see-a-dentist-in-hamilton";
import emergencyFamily from "@/lib/content/blog/emergency-family-dental-care-in-hamilton";
import familyCosmetic from "@/lib/content/blog/hamiltons-trusted-family-cosmetic-dentistry";
import cdcpAffordable from "@/lib/content/blog/cdcp-dentist-in-hamilton--how-hamilton-city-dental-makes-dental-care-affordable";
import use2025Benefits from "@/lib/content/blog/use-your-2025-dental-benefits-before-they-expire-hamilton-city-dentals-year-end-guide";
import holidayDentalCare from "@/lib/content/blog/holiday-dental-care-in-hamilton-keep-your-smile-bright-this-christmas-hamilton-city-dental";

/** slug → body content for the /blog/[slug] post. */
export const postContent: Record<string, PostContent> = {
  "new-year-new-smile-in-hamilton-start-2026-with-better-oral-health-fresh-dental-benefits": newYearNewSmile,
  "dental-resolutions-that-actually-work-a-hamilton-dentists-guide-to-better-oral-health": dentalResolutions,
  "how-to-use-your-cdcp-benefits-at-hamilton-city-dental-in-2026": cdcp2026,
  "affordable-smile-makeovers-in-hamilton-cdcp-financing-cosmetic-options": smileMakeovers,
  "invisalign-near-me-in-hamilton-what-you-need-to-know-before-starting-treatment": invisalignNearMe,
  "professional-teeth-whitening-in-hamilton-brighter-smiles-at-hamilton-city-dental": professionalWhitening,
  "dental-implants-in-hamilton-permanent-tooth-replacement-at-hamilton-city-dental": implantsPost,
  "childrens-dentist-in-hamilton-gentle-pediatric-dental-care-at-hamilton-city-dental": childrensDentistPost,
  "root-canal-hamilton-what-to-expect-hamilton-city-dental": rootCanalPost,
  "wisdom-teeth-removal-in-hamilton-hamilton-city-dental": wisdomTeethPost,
  "one-visit-crowns-in-hamilton": oneVisitCrowns,
  "emergency-dentist-in-hamilton-what-to-do-if-you-have-severe-tooth-pain": emergencySeverePain,
  "tooth-pain-near-me-when-to-see-a-dentist-in-hamilton": toothPainWhenToSee,
  "emergency-family-dental-care-in-hamilton": emergencyFamily,
  "hamiltons-trusted-family-cosmetic-dentistry": familyCosmetic,
  "cdcp-dentist-in-hamilton--how-hamilton-city-dental-makes-dental-care-affordable": cdcpAffordable,
  "use-your-2025-dental-benefits-before-they-expire-hamilton-city-dentals-year-end-guide": use2025Benefits,
  "holiday-dental-care-in-hamilton-keep-your-smile-bright-this-christmas-hamilton-city-dental": holidayDentalCare,
};

export function getPostContent(slug: string): PostContent | undefined {
  return postContent[slug];
}
