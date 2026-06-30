import { ImageResponse } from "next/og";
import { SITE, formattedAddress } from "@/lib/site";

// Branded default OpenGraph image, generated at the edge (1200×630).
export const runtime = "edge";
export const alt = `${SITE.name} — Dentist in ${SITE.city}, ${SITE.province}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #0d0f13 0%, #1d1f24 100%)",
          color: "#f0f7ff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 9999,
              background: "#74d5ff",
            }}
          />
          <div style={{ fontSize: 30, letterSpacing: 1, color: "#74d5ff" }}>
            {SITE.tagline}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>
            {SITE.name}
          </div>
          <div style={{ fontSize: 40, color: "#74d5ff", fontWeight: 600 }}>
            Dentist in {SITE.city}, {SITE.province}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28 }}>
          <span>{formattedAddress}</span>
          <span style={{ color: "#74d5ff" }}>{SITE.phone}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
