import { ImageResponse } from "next/og";

export const alt =
  "Coffret Soin Cheveux VALON – Shampoing Kératine & Huile d'Argan | Maroc";
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
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0B0B0B",
          backgroundImage:
            "radial-gradient(circle at 50% 30%, rgba(201,162,39,0.20), rgba(11,11,11,0) 60%)",
          color: "#F6F1E7",
          fontFamily: "serif",
        }}
      >
        {/* cadre doré */}
        <div
          style={{
            position: "absolute",
            top: 36,
            left: 36,
            right: 36,
            bottom: 36,
            border: "1px solid rgba(201,162,39,0.45)",
            borderRadius: 18,
            display: "flex",
          }}
        />

        <div
          style={{
            fontSize: 110,
            fontWeight: 700,
            letterSpacing: 16,
            color: "#E4C76B",
            display: "flex",
          }}
        >
          VALON
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            marginTop: 6,
            color: "#C9A227",
            letterSpacing: 12,
            fontSize: 24,
          }}
        >
          <div style={{ width: 60, height: 1, backgroundColor: "#C9A227", display: "flex" }} />
          HAIR CARE
          <div style={{ width: 60, height: 1, backgroundColor: "#C9A227", display: "flex" }} />
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 40,
            color: "#F6F1E7",
            textAlign: "center",
          }}
        >
          Coffret Kératine &amp; Huile d&apos;Argan
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 22,
            marginTop: 28,
          }}
        >
          <div
            style={{
              fontSize: 34,
              display: "flex",
              color: "rgba(246,241,231,0.45)",
              textDecoration: "line-through",
            }}
          >
            899 DH
          </div>
          <div style={{ fontSize: 64, color: "#E4C76B", fontWeight: 700, display: "flex" }}>
            649 DH
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 34,
            fontSize: 26,
            color: "rgba(246,241,231,0.8)",
            letterSpacing: 1,
          }}
        >
          Livraison gratuite · Paiement à la livraison · Maroc
        </div>
      </div>
    ),
    { ...size }
  );
}
