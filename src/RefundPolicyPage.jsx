import React from "react";

export default function RefundPolicyPage() {
  return (
    <div style={{
      minHeight: "70vh",
      padding: "120px 20px 80px",
      maxWidth: "800px",
      margin: "0 auto",
      color: "#fff",
      fontFamily: "'Inter', sans-serif",
    }}>
      <h1 style={{
        fontFamily: "'Unbounded', sans-serif",
        fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
        fontWeight: 600,
        color: "#ffb703",
        margin: "0 0 32px 0",
        letterSpacing: "-0.02em",
      }}>
        Refund Policy
      </h1>

      <div style={{ color: "#ccc", fontSize: "1rem", lineHeight: 1.8 }}>
        <p style={{ marginBottom: "20px" }}>
          <strong>Effective Date:</strong> 16 April 2026
        </p>

        <h2 style={{ color: "#fff", fontSize: "1.25rem", fontWeight: 600, margin: "32px 0 12px" }}>
          No Refund Policy
        </h2>
        <p style={{ marginBottom: "20px" }}>
          All purchases made on <strong>ravindrababuravula.in</strong> and associated platforms
          (including courses, mentorship programs, and any other digital products or services)
          are <strong>final and non-refundable</strong>.
        </p>

        <h2 style={{ color: "#fff", fontSize: "1.25rem", fontWeight: 600, margin: "32px 0 12px" }}>
          Why No Refunds?
        </h2>
        <ul style={{ paddingLeft: "20px", marginBottom: "20px" }}>
          <li style={{ marginBottom: "8px" }}>Our courses and services are digital in nature and access is granted immediately upon purchase.</li>
          <li style={{ marginBottom: "8px" }}>Significant resources go into creating high-quality content, mentorship infrastructure, and support systems.</li>
          <li style={{ marginBottom: "8px" }}>Once access is provided, the content has been consumed or made available to the buyer.</li>
        </ul>

        <h2 style={{ color: "#fff", fontSize: "1.25rem", fontWeight: 600, margin: "32px 0 12px" }}>
          Before You Purchase
        </h2>
        <p style={{ marginBottom: "20px" }}>
          We encourage all users to carefully review the course details, syllabus, demo lectures
          (available free on YouTube), and any other relevant information before making a purchase.
        </p>

        <h2 style={{ color: "#fff", fontSize: "1.25rem", fontWeight: 600, margin: "32px 0 12px" }}>
          Contact
        </h2>
        <p style={{ marginBottom: "20px" }}>
          If you have any questions regarding this policy, please reach out to us at{" "}
          <a href="mailto:gate2014.ravindra@gmail.com" style={{ color: "#ffb703", textDecoration: "none" }}>
            gate2014.ravindra@gmail.com
          </a>
        </p>

        <div style={{
          marginTop: "40px",
          padding: "20px 24px",
          background: "rgba(255, 183, 3, 0.08)",
          borderLeft: "3px solid #ffb703",
          borderRadius: "8px",
          fontSize: "0.95rem",
          color: "#bbb",
        }}>
          By purchasing any course or service from ravindrababuravula.in, you acknowledge
          and agree to this No Refund Policy.
        </div>
      </div>
    </div>
  );
}
