import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabaseBlog as supabase } from "./supabaseBlogClient";
import heroPerson from "./assets/hero-person.png";
import "./blog.css";

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function readTime(content) {
  if (!content) return 1;
  const words = content.replace(/<[^>]+>/g, "").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default function BlogListPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBlogs() {
      const { data, error } = await supabase
        .from("rbrblogs")
        .select("id, title, slug, excerpt, cover_image, author, tags, created_at, content")
        .eq("published", true)
        .order("created_at", { ascending: false });
      if (!error) setBlogs(data || []);
      setLoading(false);
    }
    fetchBlogs();
  }, []);

  const latest = blogs[0] || null;

  return (
    <div className="bl-page">

      {/* ── HERO ── */}
      <section className="bl-hero-section">
        <div className="bl-bg-text">BLOG</div>

        <div className="bl-hero-inner">

          {/* LEFT */}
          <div className="bl-hero-left">

            {/* Eyebrow rows */}
            <div className="bl-eyebrow">
              <div className="bl-eyebrow-row">
                <span className="bl-eyebrow-label">YouTube</span>
                <span className="bl-eyebrow-value">690K+ Subscribers · 90M+ Views</span>
              </div>
              <div className="bl-eyebrow-row">
                <span className="bl-eyebrow-label">Articles</span>
                <span className="bl-eyebrow-value">
                  {loading ? "—" : `${blogs.length} Published`}
                </span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="bl-hero-headline">
              Ideas &amp; insights<br />
              from <em>13+ years</em><br />
              of teaching.
            </h1>

            <p className="bl-hero-subline">
              GATE CS · Computer Science · The journey of deep learning.
              Written by Prof. Ravindrababu Ravula — IISc alumnus, India's most-watched CS educator.
            </p>

            {/* Latest article CTA */}
            {latest && (
              <div className="bl-hero-latest" onClick={() => navigate(`/blog/${latest.slug}`)}>
                <span className="bl-hero-latest-badge">LATEST</span>
                <span className="bl-hero-latest-title">{latest.title}</span>
                <span className="bl-hero-latest-arrow">→</span>
              </div>
            )}

          </div>

          {/* RIGHT — hero person image */}
          <div className="bl-hero-right">
            <div className="bl-hero-img-wrap">
              <img
                src={heroPerson}
                alt="Prof. Ravindrababu Ravula"
                className="bl-hero-person-img"
              />
              <div className="bl-hero-img-gradient" />
              <div className="bl-hero-img-badge">
                <div className="bl-hero-img-name">Prof. Ravindrababu Ravula</div>
                <div className="bl-hero-img-stat">
                  <span className="bl-hero-img-num">90M+</span>
                  <span className="bl-hero-img-lbl">YouTube Views</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <div className="bl-stats-strip">
        <div className="bl-stats-inner">
          <div className="bl-stats-label">
            <span>Prof. Ravindrababu Ravula</span>
            <span>·</span>
          </div>
          <div className="bl-stats-grid">
            {[
              { val: "690K+", lbl: "Subscribers" },
              { val: "90M+", lbl: "Views" },
              { val: "13+", lbl: "Years" },
              { val: loading ? "—" : `${blogs.length}`, lbl: "Articles" },
            ].map((s) => (
              <div key={s.lbl} className="bl-stat-item">
                <span className="bl-stat-val">{s.val}</span>
                <span className="bl-stat-lbl">{s.lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ARTICLES ── */}
      <div className="bl-articles-section">
        <div className="bl-articles-header">
          <div className="bl-section-eyebrow">All Articles</div>
          <div className="bl-section-sub">Writing on GATE CS, computer science, and the journey of learning.</div>
        </div>

        {loading ? (
          <div className="bl-loading">
            <div className="bl-loading-ring" />
          </div>
        ) : blogs.length === 0 ? (
          <div className="bl-empty">No articles yet. Check back soon.</div>
        ) : (
          <div className="bl-grid">
            {blogs.map((blog) => (
              <article
                key={blog.id}
                className="bl-card"
                onClick={() => navigate(`/blog/${blog.slug}`)}
              >
                <div className="bl-card-img-wrap">
                  {blog.cover_image ? (
                    <img
                      src={blog.cover_image}
                      alt={blog.title}
                      className="bl-card-img"
                      onError={(e) => {
                        e.target.parentElement.innerHTML = '<div class="bl-card-img-ph"></div>';
                      }}
                    />
                  ) : (
                    <div className="bl-card-img-ph" />
                  )}
                  {blog.tags?.[0] && (
                    <div className="bl-card-tags-overlay">
                      <span className="bl-tag">{blog.tags[0]}</span>
                    </div>
                  )}
                </div>
                <div className="bl-card-body">
                  <h2 className="bl-card-title">{blog.title}</h2>
                  {blog.excerpt && (
                    <p className="bl-card-excerpt">{blog.excerpt}</p>
                  )}
                  <div className="bl-card-footer">
                    <div className="bl-card-meta-txt">
                      <div className="bl-avatar bl-avatar-sm">R</div>
                      <span className="bl-meta-sep">·</span>
                      <span>{formatDate(blog.created_at)}</span>
                      <span className="bl-meta-sep">·</span>
                      <span>{readTime(blog.content)} min</span>
                    </div>
                    <span className="bl-card-arrow">→</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
