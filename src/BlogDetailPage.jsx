import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabaseBlog as supabase } from "./supabaseBlogClient";
import "./blog.css";

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

function readTime(content) {
  if (!content) return 1;
  const words = content.replace(/<[^>]+>/g, "").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function processYouTubeEmbeds(html) {
  if (!html) return "";
  html = html.replace(
    /<div[^>]*data-youtube-video[^>]*>\s*<iframe[^>]+src="([^"]+)"[^>]*>[\s\S]*?<\/iframe>\s*<\/div>/gi,
    (_, src) => `<div class="yt-embed"><iframe src="${src}" allowfullscreen loading="lazy" title="YouTube video"></iframe></div>`
  );
  html = html.replace(
    /(?<!["\\'=])(https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([\w-]+)[^\s<"]*)/g,
    (_, _u, id) => `<div class="yt-embed"><iframe src="https://www.youtube.com/embed/${id}" allowfullscreen loading="lazy" title="YouTube video"></iframe></div>`
  );
  html = html.replace(
    /(?<!["\\'=])(https?:\/\/youtu\.be\/([\w-]+)[^\s<"]*)/g,
    (_, _u, id) => `<div class="yt-embed"><iframe src="https://www.youtube.com/embed/${id}" allowfullscreen loading="lazy" title="YouTube video"></iframe></div>`
  );
  return html;
}

function ReadingProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const fn = () => {
      const el = document.documentElement;
      const s = el.scrollTop || document.body.scrollTop;
      const t = el.scrollHeight - el.clientHeight;
      setPct(t > 0 ? Math.min(100, (s / t) * 100) : 0);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return <div className="bd-progress" style={{ width: `${pct}%` }} />;
}

export default function BlogDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchBlog() {
      const { data, error } = await supabase
        .from("rbrblogs").select("*")
        .eq("slug", slug).eq("published", true).single();
      if (error || !data) setNotFound(true);
      else setBlog(data);
      setLoading(false);
    }
    fetchBlog();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) return (
    <div className="bd-page"><div className="bd-loading-state"><div className="bl-loading-ring" /></div></div>
  );

  if (notFound) return (
    <div className="bd-page">
      <div className="bd-notfound">
        <button className="bd-back-link" onClick={() => navigate("/blog")}>← Back to articles</button>
        <h2 className="bd-notfound-h">Article not found</h2>
        <p>It may have been moved or unpublished.</p>
      </div>
    </div>
  );

  const rt = readTime(blog.content);
  const content = processYouTubeEmbeds(blog.content || "");
  const canonical = `https://ravindrababuravula.in/blog/${slug}`;
  const hasCover = !!blog.cover_image;

  return (
    <div className="bd-page">
      <ReadingProgress />

      <Helmet>
        <title>{blog.title} | Prof. Ravindrababu Ravula</title>
        <meta name="description" content={blog.excerpt || blog.title} />
        <meta name="author" content={blog.author || "Prof. Ravindrababu Ravula"} />
        {blog.tags && <meta name="keywords" content={blog.tags.join(", ")} />}
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${blog.title} | Prof. Ravindrababu Ravula`} />
        <meta property="og:description" content={blog.excerpt || blog.title} />
        <meta property="og:url" content={canonical} />
        {hasCover && <meta property="og:image" content={blog.cover_image} />}
        <meta property="article:published_time" content={blog.created_at} />
        <meta property="article:author" content={blog.author || "Prof. Ravindrababu Ravula"} />
        {(blog.tags || []).map((t, i) => <meta key={i} property="article:tag" content={t} />)}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${blog.title} | Prof. Ravindrababu Ravula`} />
        {hasCover && <meta name="twitter:image" content={blog.cover_image} />}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org", "@type": "BlogPosting",
          "headline": blog.title, "description": blog.excerpt || "",
          "url": canonical, "datePublished": blog.created_at,
          "dateModified": blog.updated_at || blog.created_at,
          "timeRequired": `PT${rt}M`,
          "author": { "@type": "Person", "name": blog.author || "Prof. Ravindrababu Ravula", "url": "https://ravindrababuravula.in" },
          "publisher": { "@type": "Organization", "name": "Prof. Ravindrababu Ravula", "url": "https://ravindrababuravula.in" },
          ...(hasCover ? { "image": { "@type": "ImageObject", "url": blog.cover_image, "width": 1200, "height": 630 } } : {}),
          "keywords": (blog.tags || []).join(", "),
        })}</script>
      </Helmet>

      {/* ── HERO ── */}
      <div
        className={`bd-hero${hasCover ? "" : " bd-hero--no-cover"}`}
        style={hasCover ? { backgroundImage: `url(${blog.cover_image})` } : {}}
      >
        <div className={`bd-hero-overlay${hasCover ? "" : " bd-hero-overlay--plain"}`} />
        <div className="bd-hero-content">
          <button className="bd-back-link" onClick={() => navigate("/blog")}>← All articles</button>

          {blog.tags?.length > 0 && (
            <div className="bd-hero-tags">
              {blog.tags.map((t, i) => <span key={i} className="bd-hero-tag">{t}</span>)}
            </div>
          )}

          <h1 className="bd-hero-title">{blog.title}</h1>

          {blog.excerpt && <p className="bd-hero-excerpt">{blog.excerpt}</p>}

          <div className="bd-hero-meta">
            <div className="bd-hero-avatar">R</div>
            <div className="bd-hero-meta-text">
              <span className="bd-hero-author">{blog.author || "Prof. Ravindrababu Ravula"}</span>
              <span className="bd-hero-details">
                {formatDate(blog.created_at)}
                <span className="bd-dot">·</span>
                {rt} min read
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── ARTICLE CONTENT ── */}
      <article className="bd-article">
        <div className="bd-prose" dangerouslySetInnerHTML={{ __html: content }} />
      </article>

      {/* ── AUTHOR FOOTER ── */}
      <div className="bd-author-footer">
        <div className="bd-author-footer-inner">
          <div className="bd-af-left">
            <div className="bd-af-avatar">R</div>
            <div className="bd-af-info">
              <div className="bd-af-name">{blog.author || "Prof. Ravindrababu Ravula"}</div>
              <div className="bd-af-bio">
                IISc Alumnus · PhD in AI/ML &amp; Finance · India's most-watched GATE CS educator · 690K+ subscribers · 90M+ YouTube views
              </div>
            </div>
          </div>
          <div className="bd-af-right">
            <a
              href="https://www.youtube.com/@ravindrababu_ravula"
              target="_blank"
              rel="noopener noreferrer"
              className="bd-af-yt"
            >
              ▶ Subscribe
            </a>
            <button className="bd-af-back" onClick={() => navigate("/blog")}>
              ← All articles
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
