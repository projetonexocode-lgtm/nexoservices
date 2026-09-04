import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1A1815",
          color: "#C9A464",
          fontSize: 36,
          border: "3px solid #C9A464",
        }}
      >
        N
      </div>
    ),
    size,
  );
}
