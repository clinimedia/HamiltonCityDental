import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";

/** Full header: utility top bar (scrolls away) + sticky primary navbar. */
export function SiteHeader() {
  return (
    <>
      <TopBar />
      <Navbar />
    </>
  );
}
