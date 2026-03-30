import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SocialProofToast from "./SocialProofToast";
import "./Layout.css";

export default function Layout({ children, hideFooter = false }) {
  return (
    <div className="layout-wrapper">
      <Navbar />
      <main className="layout-main">
        {children}
      </main>
      {!hideFooter && <Footer />}
      <SocialProofToast />
    </div>
  );
}
