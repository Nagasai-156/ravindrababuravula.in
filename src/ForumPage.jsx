import React from "react";

export default function ForumPage() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "70vh",
      padding: "120px 20px 80px",
      textAlign: "center",
      color: "#fff",
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* Construction Icon */}
      <div style={{
        fontSize: "clamp(4rem, 10vw, 6rem)",
        marginBottom: "24px",
        lineHeight: 1,
      }}>
        🚧
      </div>

      <h1 style={{
        fontFamily: "'Unbounded', sans-serif",
        fontSize: "clamp(1.8rem, 5vw, 3rem)",
        fontWeight: 600,
        color: "#ffb703",
        margin: "0 0 16px 0",
        letterSpacing: "-0.02em",
      }}>
        Forum — Under Construction
      </h1>

      <p style={{
        color: "#999",
        fontSize: "clamp(0.95rem, 2.5vw, 1.15rem)",
        maxWidth: "520px",
        lineHeight: 1.7,
        margin: "0 0 32px 0",
      }}>
        We're building something amazing! The RBR Community Forum will be live soon.
        Stay tuned for discussions, doubt-solving, and peer learning.
      </p>

      <a
        href="/"
        style={{
          display: "inline-block",
          padding: "12px 32px",
          borderRadius: 999,
          background: "#ffb703",
          color: "#111",
          fontSize: "0.9rem",
          fontWeight: 600,
          textDecoration: "none",
          transition: "opacity 0.2s",
        }}
        onMouseEnter={(e) => (e.target.style.opacity = "0.85")}
        onMouseLeave={(e) => (e.target.style.opacity = "1")}
      >
        Go Home
      </a>
    </div>
  );
}
