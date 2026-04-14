import React, { useCallback, useRef, useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Youtube from "@tiptap/extension-youtube";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle, Color } from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import { supabaseBlog as supabase } from "./supabaseBlogClient";

/* ─── Upload to Supabase Storage ─── */
async function uploadImageToSupabase(file) {
  const ext = file.name.split(".").pop();
  const name = `blog/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage.from("blog-images").upload(name, file, { contentType: file.type });
  if (error) throw error;
  const { data } = supabase.storage.from("blog-images").getPublicUrl(name);
  return data.publicUrl;
}

/* ─── SVG Icons ─── */
const Icons = {
  Bold: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/></svg>,
  Italic: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><line x1="19" y1="4" x2="10" y2="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="14" y1="20" x2="5" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="15" y1="4" x2="9" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
  Underline: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"/><line x1="4" y1="21" x2="20" y2="21"/></svg>,
  Strike: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17.3 4.9c-2.3-.6-4.4-1-6.2-.9-2.7 0-5.3.7-5.3 3.6 0 1.5 1.8 3.3 6.3 3.9"/><path d="m7 15c.5 2 2.5 4 6 4 2.5 0 4.5-.7 5.5-2"/><line x1="4" y1="11.5" x2="20" y2="11.5"/></svg>,
  H1: () => <svg width="18" height="15" viewBox="0 0 24 20"><text x="0" y="16" fontFamily="sans-serif" fontWeight="700" fontSize="16" fill="currentColor">H1</text></svg>,
  H2: () => <svg width="18" height="15" viewBox="0 0 24 20"><text x="0" y="16" fontFamily="sans-serif" fontWeight="700" fontSize="16" fill="currentColor">H2</text></svg>,
  H3: () => <svg width="18" height="15" viewBox="0 0 24 20"><text x="0" y="16" fontFamily="sans-serif" fontWeight="700" fontSize="16" fill="currentColor">H3</text></svg>,
  Quote: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>,
  BulletList: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4" cy="6" r="1.5" fill="currentColor" stroke="none"/><circle cx="4" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="4" cy="18" r="1.5" fill="currentColor" stroke="none"/></svg>,
  OrderedList: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><text x="1" y="8" fontFamily="sans-serif" fontSize="7" fill="currentColor" stroke="none">1.</text><text x="1" y="14" fontFamily="sans-serif" fontSize="7" fill="currentColor" stroke="none">2.</text><text x="1" y="20" fontFamily="sans-serif" fontSize="7" fill="currentColor" stroke="none">3.</text></svg>,
  Code: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  Link: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
  Image: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
  Youtube: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58a2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#0a0a0a"/></svg>,
  AlignLeft: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="18" y2="18"/></svg>,
  AlignCenter: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>,
  AlignRight: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="9" y1="12" x2="21" y2="12"/><line x1="6" y1="18" x2="21" y2="18"/></svg>,
  HR: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="2" y1="12" x2="22" y2="12"/></svg>,
  Undo: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg>,
  Redo: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13"/></svg>,
  Highlight: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 11-6 6v3h9l3-3"/><path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4"/></svg>,
  Unlink: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18.84 12.25l1.72-1.71a4.5 4.5 0 0 0-6.37-6.37L12.5 5.86"/><path d="M5.17 11.75l-1.72 1.71a4.5 4.5 0 0 0 6.37 6.37l1.71-1.71"/><line x1="8" y1="2" x2="8" y2="5"/><line x1="2" y1="8" x2="5" y2="8"/><line x1="16" y1="19" x2="16" y2="22"/><line x1="19" y1="16" x2="22" y2="16"/></svg>,
};

/* ─── Toolbar Button ─── */
function Btn({ onClick, active, title, children, danger }) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => { e.preventDefault(); onClick(); }}
      className={`re-tb-btn${active ? " active" : ""}${danger ? " danger" : ""}`}
    >
      {children}
    </button>
  );
}

const Divider = () => <span className="re-tb-div" />;

/* ─── Extract YouTube video ID from any URL format ─── */
function extractYoutubeId(raw) {
  if (!raw) return null;
  const url = raw.trim();
  // ?v=ID or &v=ID  (watch URLs)
  const v = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (v) return v[1];
  // youtu.be/ID
  const short = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (short) return short[1];
  // youtube.com/embed/ID
  const embed = url.match(/youtube(?:-nocookie)?\.com\/embed\/([a-zA-Z0-9_-]{11})/);
  if (embed) return embed[1];
  // youtube.com/shorts/ID
  const shorts = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
  if (shorts) return shorts[1];
  // youtube.com/live/ID
  const live = url.match(/youtube\.com\/live\/([a-zA-Z0-9_-]{11})/);
  if (live) return live[1];
  // youtube.com/v/ID
  const oldv = url.match(/youtube\.com\/v\/([a-zA-Z0-9_-]{11})/);
  if (oldv) return oldv[1];
  return null;
}

/* ─── Main Rich Editor ─── */
export default function RichEditor({ value, onChange, placeholder }) {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [linkMenuOpen, setLinkMenuOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: false }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { target: "_blank", rel: "noopener noreferrer" },
      }),
      Image.configure({ inline: false, allowBase64: false, HTMLAttributes: { class: "re-img" } }),
      Youtube.configure({
        controls: true,
        nocookie: false,
        HTMLAttributes: { class: "re-youtube" },
        width: 840,
        height: 472,
      }),
      Placeholder.configure({ placeholder: placeholder || "Start writing your article here…" }),
      CharacterCount,
    ],
    content: "",           // always start empty — content is loaded via useEffect below
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  /* Load existing content safely after editor is mounted.
     TipTap v3 YouTube extension crashes during useEditor() if content has
     YouTube embed URLs — so we init empty and load via setContent in a try/catch. */
  useEffect(() => {
    if (!editor || !value) return;

    // Convert stored embed URLs → watch URLs so TipTap v3 can re-parse them
    const safe = value.replace(
      /src="https?:\/\/(?:www\.)?youtube(?:-nocookie)?\.com\/embed\/([^?"]+)[^"]*"/gi,
      'src="https://www.youtube.com/watch?v=$1"'
    );

    try {
      editor.commands.setContent(safe, false);
    } catch (_) {
      // If YouTube node still crashes, strip YouTube divs and load text-only
      try {
        const stripped = safe.replace(
          /<div[^>]*data-youtube-video[^>]*>[\s\S]*?<\/div>/gi, ""
        );
        editor.commands.setContent(stripped, false);
      } catch (e2) {
        console.error("RichEditor: content load failed", e2);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  /* Image Upload */
  const handleImageFile = useCallback(async (file) => {
    if (!file || !editor) return;
    setUploading(true);
    try {
      const url = await uploadImageToSupabase(file);
      editor.chain().focus().setImage({ src: url, alt: file.name }).run();
    } catch (err) {
      alert("Image upload failed: " + err.message + "\n\nMake sure 'blog-images' bucket exists in Supabase Storage and is set to Public.");
    }
    setUploading(false);
  }, [editor]);

  const handleImageChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) handleImageFile(file);
    e.target.value = "";
  }, [handleImageFile]);

  /* Drag & Drop on editor */
  const handleDrop = useCallback((e) => {
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      e.preventDefault();
      handleImageFile(file);
    }
  }, [handleImageFile]);

  /* YouTube */
  const handleYoutube = useCallback(() => {
    if (!editor) return;
    const raw = prompt("Paste YouTube URL (any format — watch, live, shorts, youtu.be):");
    if (!raw || !raw.trim()) return;
    const id = extractYoutubeId(raw);
    if (!id) { alert("Couldn't find a YouTube video ID in that URL.\nMake sure it's a valid YouTube link."); return; }
    // Insert as raw HTML — bypasses TipTap v3 YouTube extension URL parser bugs
    const embedHtml = `<div data-youtube-video=""><iframe src="https://www.youtube.com/embed/${id}?controls=1" allowfullscreen loading="lazy" title="YouTube video"></iframe></div>`;
    editor.chain().focus().insertContent(embedHtml).run();
  }, [editor]);

  /* Link */
  const applyLink = useCallback(() => {
    if (!editor) return;
    if (!linkUrl.trim()) { editor.chain().focus().unsetLink().run(); }
    else { editor.chain().focus().setLink({ href: linkUrl.trim() }).run(); }
    setLinkMenuOpen(false);
    setLinkUrl("");
  }, [editor, linkUrl]);

  const openLinkMenu = useCallback(() => {
    if (!editor) return;
    const existing = editor.getAttributes("link").href || "";
    setLinkUrl(existing);
    setLinkMenuOpen(true);
  }, [editor]);

  /* Custom bubble menu — show on text selection */
  const [bubble, setBubble] = useState({ visible: false, top: 0, left: 0 });
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!editor) return;
    const updateBubble = () => {
      const { from, to } = editor.state.selection;
      if (from === to) { setBubble(b => ({ ...b, visible: false })); return; }
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0) { setBubble(b => ({ ...b, visible: false })); return; }
      const range = sel.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const wrapRect = wrapperRef.current?.getBoundingClientRect();
      if (!wrapRect || rect.width === 0) { setBubble(b => ({ ...b, visible: false })); return; }
      setBubble({
        visible: true,
        top: rect.top - wrapRect.top - 46,
        left: Math.max(0, rect.left - wrapRect.left + rect.width / 2 - 100),
      });
    };
    editor.on("selectionUpdate", updateBubble);
    editor.on("transaction", updateBubble);
    return () => { editor.off("selectionUpdate", updateBubble); editor.off("transaction", updateBubble); };
  }, [editor]);

  if (!editor) return <div className="re-loading">Loading editor…</div>;

  const words = editor.storage.characterCount?.words() ?? 0;
  const chars = editor.storage.characterCount?.characters() ?? 0;
  const readTime = Math.max(1, Math.ceil(words / 200));

  return (
    <div className="re-wrapper" ref={wrapperRef} onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} style={{ position: "relative" }}>

      {/* ──────── TOOLBAR ──────── */}
      <div className="re-toolbar">
        <div className="re-tb-group">
          <Btn title="Undo (Ctrl+Z)" onClick={() => editor.chain().focus().undo().run()}><Icons.Undo /></Btn>
          <Btn title="Redo (Ctrl+Y)" onClick={() => editor.chain().focus().redo().run()}><Icons.Redo /></Btn>
        </div>

        <Divider />

        <div className="re-tb-group">
          <Btn title="Heading 1" active={editor.isActive("heading", { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}><Icons.H1 /></Btn>
          <Btn title="Heading 2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><Icons.H2 /></Btn>
          <Btn title="Heading 3" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}><Icons.H3 /></Btn>
        </div>

        <Divider />

        <div className="re-tb-group">
          <Btn title="Bold (Ctrl+B)" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}><Icons.Bold /></Btn>
          <Btn title="Italic (Ctrl+I)" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}><Icons.Italic /></Btn>
          <Btn title="Underline (Ctrl+U)" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}><Icons.Underline /></Btn>
          <Btn title="Strikethrough" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}><Icons.Strike /></Btn>
          <Btn title="Highlight text" active={editor.isActive("highlight")} onClick={() => editor.chain().focus().toggleHighlight().run()}><Icons.Highlight /></Btn>
        </div>

        <Divider />

        <div className="re-tb-group">
          <Btn title="Align Left" active={editor.isActive({ textAlign: "left" })} onClick={() => editor.chain().focus().setTextAlign("left").run()}><Icons.AlignLeft /></Btn>
          <Btn title="Align Center" active={editor.isActive({ textAlign: "center" })} onClick={() => editor.chain().focus().setTextAlign("center").run()}><Icons.AlignCenter /></Btn>
          <Btn title="Align Right" active={editor.isActive({ textAlign: "right" })} onClick={() => editor.chain().focus().setTextAlign("right").run()}><Icons.AlignRight /></Btn>
        </div>

        <Divider />

        <div className="re-tb-group">
          <Btn title="Bullet List" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}><Icons.BulletList /></Btn>
          <Btn title="Numbered List" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}><Icons.OrderedList /></Btn>
          <Btn title="Blockquote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}><Icons.Quote /></Btn>
          <Btn title="Code Block" active={editor.isActive("codeBlock")} onClick={() => editor.chain().focus().toggleCodeBlock().run()}><Icons.Code /></Btn>
          <Btn title="Horizontal Rule" onClick={() => editor.chain().focus().setHorizontalRule().run()}><Icons.HR /></Btn>
        </div>

        <Divider />

        <div className="re-tb-group">
          <Btn title="Insert / Edit Link" active={editor.isActive("link")} onClick={openLinkMenu}><Icons.Link /></Btn>
          {editor.isActive("link") && (
            <Btn title="Remove Link" danger onClick={() => editor.chain().focus().unsetLink().run()}><Icons.Unlink /></Btn>
          )}
        </div>

        <Divider />

        <div className="re-tb-group">
          <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageChange} />
          <Btn title="Upload Image (or drag & drop)" onClick={() => fileInputRef.current?.click()}>
            {uploading ? <span className="re-spin">⏳</span> : <><Icons.Image /> <span className="re-btn-label">Image</span></>}
          </Btn>
          <Btn title="Embed YouTube Video" onClick={handleYoutube}>
            <Icons.Youtube /> <span className="re-btn-label">YouTube</span>
          </Btn>
        </div>

        <Divider />

        <div className="re-tb-group">
          <span className="re-color-picker" title="Text Color">
            <span className="re-color-icon">A</span>
            <input type="color" defaultValue="#ffb703" onChange={(e) => editor.chain().focus().setColor(e.target.value).run()} />
          </span>
        </div>
      </div>

      {/* ──────── LINK DIALOG ──────── */}
      {linkMenuOpen && (
        <div className="re-link-overlay" onClick={() => setLinkMenuOpen(false)}>
          <div className="re-link-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="re-link-title">Insert Link</div>
            <input
              className="re-link-input"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://example.com"
              autoFocus
              onKeyDown={(e) => { if (e.key === "Enter") applyLink(); if (e.key === "Escape") setLinkMenuOpen(false); }}
            />
            <div className="re-link-actions">
              <button className="re-link-btn-cancel" onClick={() => setLinkMenuOpen(false)}>Cancel</button>
              <button className="re-link-btn-apply" onClick={applyLink}>Apply</button>
            </div>
          </div>
        </div>
      )}

      {/* ──────── CUSTOM BUBBLE MENU ──────── */}
      {bubble.visible && (
        <div className="re-bubble" style={{ position: "absolute", top: bubble.top, left: bubble.left, zIndex: 50 }}>
          <button className={`re-bubble-btn${editor.isActive("bold") ? " active" : ""}`} onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleBold().run(); }}><strong>B</strong></button>
          <button className={`re-bubble-btn${editor.isActive("italic") ? " active" : ""}`} onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleItalic().run(); }}><em>I</em></button>
          <button className={`re-bubble-btn${editor.isActive("underline") ? " active" : ""}`} onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleUnderline().run(); }}><u>U</u></button>
          <span className="re-bubble-sep" />
          <button className={`re-bubble-btn${editor.isActive("highlight") ? " active" : ""}`} onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleHighlight().run(); }}>Mark</button>
          <button className={`re-bubble-btn${editor.isActive("link") ? " active" : ""}`} onMouseDown={(e) => { e.preventDefault(); openLinkMenu(); }}>Link</button>
        </div>
      )}

      {/* ──────── EDITOR CONTENT ──────── */}
      <EditorContent editor={editor} className="re-content" />

      {/* ──────── DRAG HINT ──────── */}
      <div className="re-footer">
        <span>{words.toLocaleString()} words · {chars.toLocaleString()} characters · ~{readTime} min read</span>
        <span className="re-drag-hint">Drag & drop images into the editor</span>
      </div>
    </div>
  );
}
