import React, { useEffect, useState, Component } from "react";

/* ─── Error Boundary — catches editor crashes, shows a readable message ─── */
class EditorBoundary extends Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 40, color: "#f87171", fontFamily: "sans-serif" }}>
          <strong>Editor failed to load.</strong>
          <p style={{ color: "#888", marginTop: 8, fontSize: 14 }}>{this.state.error.message}</p>
          <button
            style={{ marginTop: 16, padding: "8px 18px", background: "#ffb703", color: "#111", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 700 }}
            onClick={() => this.setState({ error: null })}
          >Retry</button>
        </div>
      );
    }
    return this.props.children;
  }
}
import { supabaseBlog as supabase } from "./supabaseBlogClient";
import RichEditor from "./RichEditor";
import "./blog.css";
import "./admin.css";

/* For preview/display — convert TipTap YouTube divs to renderable iframes */
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

/* For TipTap editor — convert embed URLs back to watch URLs so TipTap v3 can parse them.
   TipTap stores embed URLs but its own parser expects watch URLs — this is a TipTap v3 bug. */
function prepareForEditor(html) {
  if (!html) return "";
  return html.replace(
    /src="https?:\/\/(?:www\.)?youtube(?:-nocookie)?\.com\/embed\/([^?"]+)[^"]*"/gi,
    'src="https://www.youtube.com/watch?v=$1"'
  );
}

const ADMIN_PASSWORD = "rbr@admin2027";
const STORAGE_KEY = "rbr_blog_admin_auth";

function slugify(str) {
  return str.toLowerCase().trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

/* ─── Login ─── */
function LoginScreen({ onLogin }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");

  function submit(e) {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) { localStorage.setItem(STORAGE_KEY, "true"); onLogin(); }
    else setErr("Incorrect password.");
  }

  return (
    <div className="adm-login-wrap">
      <div className="adm-login-card">
        <div className="adm-login-icon">✍️</div>
        <h1 className="adm-login-title">Blog Admin</h1>
        <p className="adm-login-sub">Prof. Ravindrababu Ravula · Content Management</p>
        <form onSubmit={submit}>
          <div className="adm-field">
            <label className="adm-label">Password</label>
            <input type="password" className="adm-input" value={pw}
              onChange={(e) => { setPw(e.target.value); setErr(""); }}
              placeholder="Enter admin password" autoFocus />
          </div>
          {err && <p className="adm-err">{err}</p>}
          <button type="submit" className="adm-btn adm-btn-gold" style={{ width: "100%", marginTop: 18 }}>Sign In →</button>
        </form>
      </div>
    </div>
  );
}

/* ─── Preview Overlay ─── */
function PreviewOverlay({ form, onClose }) {
  return (
    <div className="adm-preview-overlay">
      <div className="adm-preview-bar">
        <span className="adm-preview-label">Preview — as visitors will see it</span>
        <button className="adm-btn adm-btn-ghost" onClick={onClose}>✕ Close Preview</button>
      </div>
      <div className="adm-preview-scroll">
        <div className="blog-detail-wrapper" style={{ paddingTop: 0 }}>
          <div className="blog-detail-hero">
            {form.tags && (
              <div className="blog-detail-tags">
                {form.tags.split(",").map((t, i) => t.trim() && <span key={i} className="blog-tag">{t.trim()}</span>)}
              </div>
            )}
            <h1 className="blog-detail-title">{form.title || "Untitled Article"}</h1>
            <div className="blog-detail-meta">
              <div className="blog-detail-author">
                <div className="blog-detail-avatar">R</div>
                <div className="blog-detail-author-name">{form.author || "Prof. Ravindrababu Ravula"}</div>
              </div>
              <span className="blog-detail-date">Preview</span>
            </div>
          </div>
          {form.cover_image && (
            <div className="blog-detail-cover">
              <img src={form.cover_image} alt={form.title} />
            </div>
          )}
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: processYouTubeEmbeds(form.content) || "<p><em>No content yet.</em></p>" }} />
        </div>
      </div>
    </div>
  );
}

/* ─── Blog Editor ─── */
function BlogEditor({ blog, onSave, onCancel }) {
  const [form, setForm] = useState({
    title: blog?.title || "",
    slug: blog?.slug || "",
    excerpt: blog?.excerpt || "",
    content: prepareForEditor(blog?.content || ""),
    cover_image: blog?.cover_image || "",
    author: blog?.author || "Prof. Ravindrababu Ravula",
    tags: blog?.tags ? blog.tags.join(", ") : "",
    published: blog?.published || false,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);

  function set(key, val) {
    setForm(f => {
      const u = { ...f, [key]: val };
      if (key === "title" && !blog?.id) u.slug = slugify(val);
      return u;
    });
  }

  async function uploadCover(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const name = `covers/${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage.from("blog-images").upload(name, file, { contentType: file.type });
      if (upErr) throw upErr;
      const { data } = supabase.storage.from("blog-images").getPublicUrl(name);
      set("cover_image", data.publicUrl);
    } catch (err) {
      alert("Cover upload failed: " + err.message);
    }
    setCoverUploading(false);
    e.target.value = "";
  }

  async function handleSave() {
    if (!form.title.trim()) { setError("Title is required."); return; }
    if (!form.slug.trim()) { setError("Slug is required."); return; }
    setSaving(true);
    setError("");
    const payload = {
      title: form.title.trim(),
      slug: form.slug.trim(),
      excerpt: form.excerpt.trim(),
      content: form.content,
      cover_image: form.cover_image.trim(),
      author: form.author.trim() || "Prof. Ravindrababu Ravula",
      tags: form.tags ? form.tags.split(",").map(t => t.trim()).filter(Boolean) : [],
      published: form.published,
      updated_at: new Date().toISOString(),
    };
    const result = blog?.id
      ? await supabase.from("rbrblogs").update(payload).eq("id", blog.id)
      : await supabase.from("rbrblogs").insert({ ...payload, created_at: new Date().toISOString() });
    if (result.error) setError(result.error.message);
    else onSave();
    setSaving(false);
  }

  return (
    <>
      {preview && <PreviewOverlay form={form} onClose={() => setPreview(false)} />}

      <div className="adm-editor-layout">

        {/* ── TOP BAR ── */}
        <div className="adm-editor-topbar">
          <button className="adm-back-btn" onClick={onCancel}>← All Articles</button>

          <div className="adm-topbar-center">
            {form.slug && <span className="adm-slug-chip">/blog/{form.slug}</span>}
          </div>

          <div className="adm-topbar-right">
            {error && <span className="adm-inline-err">{error}</span>}
            <button className="adm-btn adm-btn-ghost" onClick={() => setPreview(true)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              Preview
            </button>
            <label className="adm-publish-toggle">
              <input type="checkbox" checked={form.published} onChange={e => set("published", e.target.checked)} />
              <span className="adm-toggle-track">
                <span className="adm-toggle-thumb" />
              </span>
              <span className="adm-toggle-text" style={{ color: form.published ? "#22c55e" : "#666" }}>
                {form.published ? "Published" : "Draft"}
              </span>
            </label>
            <button className="adm-btn adm-btn-gold" onClick={handleSave} disabled={saving}>
              {saving ? "Saving…" : blog?.id ? "Update" : "Publish"}
            </button>
          </div>
        </div>

        {/* ── BODY: Editor + Sidebar ── */}
        <div className="adm-editor-body">

          {/* ── MAIN EDITOR ── */}
          <div className="adm-editor-main">
            <div className="adm-editor-inner">
              <textarea
                className="adm-title-input"
                rows={2}
                value={form.title}
                onChange={e => { set("title", e.target.value); e.target.style.height = "auto"; e.target.style.height = e.target.scrollHeight + "px"; }}
                placeholder="Article title…"
              />
              <EditorBoundary key={blog?.id || "new"}>
                <RichEditor
                  key={blog?.id || "new"}
                  value={form.content}
                  onChange={(html) => set("content", html)}
                  placeholder="Start writing… drag & drop images, click YouTube to embed videos."
                />
              </EditorBoundary>
            </div>
          </div>

          {/* ── SIDEBAR ── */}
          <aside className="adm-sidebar">

            {/* Status */}
            <div className="adm-sidebar-section">
              <div className="adm-sidebar-heading">Status</div>
              <div className="adm-status-row">
                <span className={`adm-status-dot ${form.published ? "published" : ""}`} />
                <span className="adm-status-text">{form.published ? "Published · visible to everyone" : "Draft · not visible"}</span>
              </div>
            </div>

            {/* URL Slug */}
            <div className="adm-sidebar-section">
              <div className="adm-sidebar-heading">URL Slug</div>
              <input className="adm-input" value={form.slug} onChange={e => set("slug", slugify(e.target.value))} placeholder="url-slug" />
              <div className="adm-field-hint">ravindrababuravula.in/blog/{form.slug || "slug"}</div>
            </div>

            {/* Author */}
            <div className="adm-sidebar-section">
              <div className="adm-sidebar-heading">Author</div>
              <input className="adm-input" value={form.author} onChange={e => set("author", e.target.value)} placeholder="Prof. Ravindrababu Ravula" />
            </div>

            {/* Excerpt / SEO Description */}
            <div className="adm-sidebar-section">
              <div className="adm-sidebar-heading">SEO Excerpt</div>
              <textarea
                className="adm-input adm-textarea"
                rows={3}
                value={form.excerpt}
                onChange={e => set("excerpt", e.target.value)}
                placeholder="Short summary — used in blog cards and Google search snippets"
              />
              <div className="adm-field-hint">{form.excerpt.length}/160 characters</div>
            </div>

            {/* Cover Image */}
            <div className="adm-sidebar-section">
              <div className="adm-sidebar-heading">Cover Image</div>
              {form.cover_image ? (
                <div className="adm-cover-preview">
                  <img src={form.cover_image} alt="cover" />
                  <button className="adm-cover-remove" onClick={() => set("cover_image", "")} title="Remove">✕</button>
                </div>
              ) : (
                <label className="adm-cover-upload">
                  <input type="file" accept="image/*" style={{ display: "none" }} onChange={uploadCover} disabled={coverUploading} />
                  <span className="adm-cover-upload-icon">🖼</span>
                  <span>{coverUploading ? "Uploading…" : "Click to upload cover"}</span>
                  <span className="adm-field-hint">or paste URL below</span>
                </label>
              )}
              <input
                className="adm-input"
                style={{ marginTop: 8 }}
                value={form.cover_image}
                onChange={e => set("cover_image", e.target.value)}
                placeholder="https://…  (paste image URL)"
              />
            </div>

            {/* Tags */}
            <div className="adm-sidebar-section">
              <div className="adm-sidebar-heading">Tags</div>
              <input className="adm-input" value={form.tags} onChange={e => set("tags", e.target.value)} placeholder="GATE, CS, Tips" />
              <div className="adm-field-hint">Separate with commas</div>
              {form.tags && (
                <div className="adm-tags-preview">
                  {form.tags.split(",").map((t, i) => t.trim() && <span key={i} className="blog-tag">{t.trim()}</span>)}
                </div>
              )}
            </div>

            {/* SEO Preview */}
            <div className="adm-sidebar-section">
              <div className="adm-sidebar-heading">Google Preview</div>
              <div className="adm-seo-preview">
                <div className="adm-seo-title">{form.title || "Article title"} | Prof. Ravindrababu Ravula</div>
                <div className="adm-seo-url">ravindrababuravula.in › blog › {form.slug || "slug"}</div>
                <div className="adm-seo-desc">{form.excerpt || "Add an excerpt to improve SEO…"}</div>
              </div>
            </div>

          </aside>
        </div>
      </div>
    </>
  );
}

/* ─── Articles List ─── */
function ArticlesList({ blogs, loading, onNew, onEdit, onDelete, onTogglePublish, onLogout }) {
  return (
    <div className="adm-list-layout">
      <div className="adm-list-header">
        <div>
          <h1 className="adm-list-title">Blog Articles</h1>
          <p className="adm-list-sub">{blogs.filter(b => b.published).length} published · {blogs.filter(b => !b.published).length} drafts</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <a href="/blog" target="_blank" rel="noopener" className="adm-btn adm-btn-ghost">View Blog ↗</a>
          <button className="adm-btn adm-btn-ghost" onClick={onLogout}>Sign Out</button>
          <button className="adm-btn adm-btn-gold" onClick={onNew}>+ New Article</button>
        </div>
      </div>

      {loading ? (
        <div className="adm-loading">
          <div className="adm-loading-dots"><span/><span/><span/></div>
          Loading articles…
        </div>
      ) : blogs.length === 0 ? (
        <div className="adm-empty">
          <div style={{ fontSize: "3rem", marginBottom: 16 }}>✍️</div>
          <div style={{ color: "#fff", fontSize: "1.1rem", marginBottom: 8 }}>No articles yet</div>
          <div style={{ color: "#555", marginBottom: 24 }}>Create your first article to get started</div>
          <button className="adm-btn adm-btn-gold" onClick={onNew}>Create Article</button>
        </div>
      ) : (
        <div className="adm-articles">
          {blogs.map(blog => (
            <div key={blog.id} className="adm-article-row">
              {blog.cover_image && (
                <img src={blog.cover_image} alt="" className="adm-article-thumb" />
              )}
              <div className="adm-article-info">
                <div className="adm-article-title">{blog.title}</div>
                <div className="adm-article-meta">
                  <span className={`adm-badge ${blog.published ? "published" : "draft"}`}>
                    {blog.published ? "Published" : "Draft"}
                  </span>
                  <span className="adm-article-date">{formatDate(blog.created_at)}</span>
                  {blog.tags?.slice(0, 3).map((t, i) => <span key={i} className="blog-tag" style={{ fontSize: "0.62rem" }}>{t}</span>)}
                </div>
                <div className="adm-article-slug">/blog/{blog.slug}</div>
              </div>
              <div className="adm-article-actions">
                <button className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => onEdit(blog)}>Edit</button>
                <button
                  className="adm-btn adm-btn-ghost adm-btn-sm"
                  onClick={() => onTogglePublish(blog)}
                  style={{ color: blog.published ? "#f59e0b" : "#22c55e" }}
                >
                  {blog.published ? "Unpublish" : "Publish"}
                </button>
                <button className="adm-btn adm-btn-danger adm-btn-sm" onClick={() => onDelete(blog.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Main Export ─── */
export default function BlogAdminPage() {
  const [authed, setAuthed] = useState(() => localStorage.getItem(STORAGE_KEY) === "true");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  async function fetchBlogs() {
    setLoading(true);
    const { data } = await supabase
      .from("rbrblogs")
      .select("id,title,slug,excerpt,content,published,author,tags,cover_image,created_at")
      .order("created_at", { ascending: false });
    setBlogs(data || []);
    setLoading(false);
  }

  useEffect(() => { if (authed) fetchBlogs(); }, [authed]);

  async function handleDelete(id) {
    if (!window.confirm("Delete this article permanently?")) return;
    await supabase.from("rbrblogs").delete().eq("id", id);
    fetchBlogs();
  }

  async function handleTogglePublish(blog) {
    await supabase.from("rbrblogs").update({ published: !blog.published }).eq("id", blog.id);
    fetchBlogs();
  }

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

  if (editing !== null) {
    return (
      <BlogEditor
        blog={editing?.id ? editing : null}
        onSave={() => { setEditing(null); fetchBlogs(); }}
        onCancel={() => setEditing(null)}
      />
    );
  }

  return (
    <ArticlesList
      blogs={blogs}
      loading={loading}
      onNew={() => setEditing({})}
      onEdit={(b) => setEditing(b)}
      onDelete={handleDelete}
      onTogglePublish={handleTogglePublish}
      onLogout={() => { localStorage.removeItem(STORAGE_KEY); setAuthed(false); }}
    />
  );
}
