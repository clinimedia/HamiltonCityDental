import type { ServiceContent } from "@/lib/service-content-types";
import familyDentistry from "@/lib/content/services/family-dentistry";
import childrensDentistry from "@/lib/content/services/childrens-dentistry";
import emergencyDentistry from "@/lib/content/services/emergency-dentistry";
import dentalHygiene from "@/lib/content/services/dental-hygiene";
import cosmeticDentistry from "@/lib/content/services/cosmetic-dentistry";
import teethWhitening from "@/lib/content/services/teeth-whitening";
import invisalign from "@/lib/content/services/invisalign";
import implants from "@/lib/content/services/implants";
import crownBridges from "@/lib/content/services/crown-bridges";
import rootCanalTreatment from "@/lib/content/services/root-canal-treatment";
import wisdomTeethRemoval from "@/lib/content/services/wisdom-teeth-removal";

/** slug → long-form body content for the /services/[slug] page. */
export const serviceContent: Record<string, ServiceContent> = {
  "family-dentistry": familyDentistry,
  "childrens-dentistry": childrensDentistry,
  "emergency-dentistry": emergencyDentistry,
  "dental-hygiene": dentalHygiene,
  "cosmetic-dentistry": cosmeticDentistry,
  "teeth-whitening": teethWhitening,
  invisalign,
  implants,
  "crown-bridges": crownBridges,
  "root-canal-treatment": rootCanalTreatment,
  "wisdom-teeth-removal": wisdomTeethRemoval,
};

export function getServiceContent(slug: string): ServiceContent | undefined {
  return serviceContent[slug];
}
