import React, { useState, useEffect, useCallback } from "react";
import { getRandomEnrollment } from "../data/fakeEnrollments";
import "./SocialProofToast.css";

export default function SocialProofToast() {
  const [current, setCurrent] = useState(null);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const showNext = useCallback(() => {
    if (dismissed) return;
    setCurrent(getRandomEnrollment());
    setVisible(true);
    setTimeout(() => setVisible(false), 5000);
  }, [dismissed]);

  useEffect(() => {
    if (dismissed) return;

    // First popup after 10 seconds
    const firstTimer = setTimeout(showNext, 10000);

    // Then every 20-30 seconds
    const interval = setInterval(showNext, 20000 + Math.random() * 10000);

    return () => {
      clearTimeout(firstTimer);
      clearInterval(interval);
    };
  }, [showNext, dismissed]);

  if (dismissed || !current) return null;

  return (
    <div className={`sp-toast ${visible ? "sp-show" : "sp-hide"}`}>
      <div className="sp-toast-inner">
        <div className="sp-avatar" style={{ background: current.color }}>
          {current.name.charAt(0)}
        </div>
        <div className="sp-content">
          <p className="sp-text">
            <strong>{current.name}</strong> enrolled in the course
          </p>
          <p className="sp-course">'{current.course}'</p>
          <p className="sp-time">{current.time}</p>
        </div>
        <button
          className="sp-close"
          onClick={(e) => {
            e.stopPropagation();
            setVisible(false);
            setDismissed(true);
          }}
        >
          &times;
        </button>
      </div>
    </div>
  );
}
