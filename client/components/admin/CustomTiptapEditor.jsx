"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableCell } from "@tiptap/extension-table-cell";
import { Youtube } from "@tiptap/extension-youtube";
import { useEffect, useCallback, useState, useRef } from "react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Link as LinkIcon,
  List,
  ListOrdered,
  Quote,
  Table as TableIcon,
  Video as YoutubeIcon,
  Undo2,
  Redo2,
  ChevronDown,
  Check,
  Link2Off,
} from "lucide-react";

// ─── Heading Dropdown ────────────────────────────────────────────────────────

const HEADING_OPTIONS = [
  { label: "Paragraph", value: "paragraph" },
  { label: "Heading 1", value: "h1" },
  { label: "Heading 2", value: "h2" },
  { label: "Heading 3", value: "h3" },
];

function getActiveHeading(editor) {
  if (!editor) return "paragraph";
  if (editor.isActive("heading", { level: 1 })) return "h1";
  if (editor.isActive("heading", { level: 2 })) return "h2";
  if (editor.isActive("heading", { level: 3 })) return "h3";
  return "paragraph";
}

function HeadingDropdown({ editor }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const active = getActiveHeading(editor);
  const activeLabel =
    HEADING_OPTIONS.find((o) => o.value === active)?.label ?? "Paragraph";

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const apply = (value) => {
    setOpen(false);
    if (!editor) return;
    if (value === "paragraph") {
      editor.chain().focus().setParagraph().run();
    } else {
      const level = parseInt(value.replace("h", ""), 10);
      editor.chain().focus().toggleHeading({ level }).run();
    }
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-zinc-700 bg-white hover:bg-zinc-100 border border-zinc-200 transition-colors min-w-[110px] justify-between"
      >
        <span>{activeLabel}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="absolute top-full mt-1 left-0 z-50 w-40 bg-white border border-zinc-200 rounded-xl shadow-xl overflow-hidden">
          {HEADING_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => apply(opt.value)}
              className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-medium transition-colors ${
                active === opt.value
                  ? "bg-[#03B8B8]/10 text-[#03B8B8]"
                  : "text-zinc-700 hover:bg-zinc-50"
              }`}
            >
              <span
                className={
                  opt.value === "h1"
                    ? "text-base font-extrabold"
                    : opt.value === "h2"
                      ? "text-sm font-bold"
                      : opt.value === "h3"
                        ? "text-xs font-bold"
                        : "text-xs font-normal"
                }
              >
                {opt.label}
              </span>
              {active === opt.value && (
                <Check className="w-3.5 h-3.5 text-[#03B8B8]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Toolbar Button ────────────────────────────────────────────────────────

function ToolbarBtn({ onClick, isActive, disabled, title, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-1.5 rounded-lg transition-all duration-150 ${
        isActive
          ? "bg-[#03B8B8]/15 text-[#03B8B8] border border-[#03B8B8]/25"
          : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 border border-transparent"
      } disabled:opacity-30 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
}

// ─── Divider ────────────────────────────────────────────────────────────────

function Divider() {
  return <span className="w-px h-5 bg-zinc-200 mx-1 flex-shrink-0" />;
}

// ─── Toolbar ────────────────────────────────────────────────────────────────

function Toolbar({ editor }) {
  const handleLink = useCallback(() => {
    if (!editor) return;

    const previousUrl = editor.getAttributes("link").href;

    // Pre-fill the prompt with the current URL when a link is active
    const url = window.prompt(
      previousUrl ? "Edit URL (leave blank to remove link):" : "Enter URL:",
      previousUrl || "https://"
    );

    // User cancelled the prompt — do nothing
    if (url === null) return;

    const trimmed = url.trim();

    // Blank input clears the link
    if (trimmed === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    // Nothing selected and no active link — can't attach to anything
    if (editor.state.selection.empty && !previousUrl) {
      window.alert("Select some text first, then add a link.");
      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: trimmed, target: "_blank" })
      .run();
  }, [editor]);

  const handleTable = useCallback(() => {
    if (!editor) return;
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  }, [editor]);

  const handleYoutube = useCallback(() => {
    if (!editor) return;
    const url = window.prompt(
      "Enter YouTube video URL:",
      "https://www.youtube.com/watch?v=",
    );
    if (url) {
      editor.chain().focus().setYoutubeVideo({ src: url }).run();
    }
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 bg-zinc-50 border-b border-zinc-200 rounded-t-xl min-h-[48px]">
      {/* Heading */}
      <HeadingDropdown editor={editor} />
      <Divider />

      {/* Bold / Italic / Underline */}
      <ToolbarBtn
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
        title="Bold (Ctrl+B)"
      >
        <Bold className="w-4 h-4" />
      </ToolbarBtn>
      <ToolbarBtn
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic")}
        title="Italic (Ctrl+I)"
      >
        <Italic className="w-4 h-4" />
      </ToolbarBtn>
      <ToolbarBtn
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        isActive={editor.isActive("underline")}
        title="Underline (Ctrl+U)"
      >
        <UnderlineIcon className="w-4 h-4" />
      </ToolbarBtn>
      <Divider />

      {/* Link */}
      <ToolbarBtn
        onClick={handleLink}
        isActive={editor.isActive("link")}
        title={
          editor.isActive("link") ? "Edit / remove link" : "Add link"
        }
      >
        {editor.isActive("link") ? (
          <Link2Off className="w-4 h-4" />
        ) : (
          <LinkIcon className="w-4 h-4" />
        )}
      </ToolbarBtn>
      <Divider />

      {/* Lists */}
      <ToolbarBtn
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive("bulletList")}
        title="Bullet List"
      >
        <List className="w-4 h-4" />
      </ToolbarBtn>
      <ToolbarBtn
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive("orderedList")}
        title="Numbered List"
      >
        <ListOrdered className="w-4 h-4" />
      </ToolbarBtn>
      <Divider />

      {/* Blockquote */}
      <ToolbarBtn
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive("blockquote")}
        title="Block Quote"
      >
        <Quote className="w-4 h-4" />
      </ToolbarBtn>
      <Divider />

      {/* Table */}
      <ToolbarBtn onClick={handleTable} title="Insert Table 3×3">
        <TableIcon className="w-4 h-4" />
      </ToolbarBtn>

      {/* YouTube */}
      <ToolbarBtn onClick={handleYoutube} title="Embed YouTube Video">
        <YoutubeIcon className="w-4 h-4" />
      </ToolbarBtn>
      <Divider />

      {/* Undo / Redo */}
      <ToolbarBtn
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        title="Undo (Ctrl+Z)"
      >
        <Undo2 className="w-4 h-4" />
      </ToolbarBtn>
      <ToolbarBtn
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        title="Redo (Ctrl+Shift+Z)"
      >
        <Redo2 className="w-4 h-4" />
      </ToolbarBtn>
    </div>
  );
}

// ─── Main Editor Component ──────────────────────────────────────────────────

export default function CustomTiptapEditor({ value, onChange }) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        // StarterKit already includes Heading, Bold, Italic, Strike, Code,
        // BulletList, OrderedList, Blockquote, HardBreak, HorizontalRule,
        // History (undo/redo), Paragraph, Text, Document, etc.
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          class: "text-[#03B8B8] underline hover:text-[#38FFF2] transition-colors cursor-pointer",
          rel: "noopener noreferrer",
        },
      }),
      Placeholder.configure({
        placeholder: "Write blog content here...",
      }),
      Table.configure({ resizable: false }),
      TableRow,
      TableHeader,
      TableCell,
      Youtube.configure({
        width: 640,
        height: 360,
        HTMLAttributes: { class: "rounded-xl overflow-hidden my-4 mx-auto" },
      }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Sync external `value` into editor after mount (e.g. edit mode loading)
  // Guard: only call setContent if the value actually differs from what is
  // currently rendered — prevents fighting live typing.
  useEffect(() => {
    if (!editor || editor.isDestroyed) return;
    const current = editor.getHTML();
    // Normalize both to avoid false-positives from trailing whitespace
    if ((value ?? "") !== current) {
      // false = do not emit an onUpdate transaction (prevents onChange loop)
      editor.commands.setContent(value || "", false);
    }
  }, [value, editor]);

  return (
    <div className="w-full rounded-xl border border-zinc-200 overflow-hidden bg-white shadow-sm">
      <Toolbar editor={editor} />
      <EditorContent
        editor={editor}
        className="tiptap-editor-content"
      />
      <style>{`
        /* Editable area sizing & base */
        .tiptap-editor-content .tiptap {
          min-height: 420px;
          padding: 1.25rem 1.5rem;
          outline: none;
          color: #18181b;
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
          font-size: 0.9375rem;
          line-height: 1.75;
          caret-color: #0f172a; /* high-contrast dark slate against white canvas */
        }

        /* Focus ring on the outer wrapper */
        .tiptap-editor-content .tiptap:focus {
          box-shadow: inset 0 0 0 2px rgba(3, 184, 184, 0.18);
        }

        /* Teal-tinted text selection for visibility while dragging */
        .tiptap-editor-content .tiptap ::selection {
          background: rgba(3, 184, 184, 0.25);
        }

        /* Placeholder */
        .tiptap-editor-content .tiptap p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #a1a1aa;
          pointer-events: none;
          height: 0;
        }

        /* Headings */
        .tiptap-editor-content .tiptap h1 {
          font-size: 2rem;
          font-weight: 800;
          line-height: 1.2;
          margin: 1.4rem 0 0.6rem;
          color: #09090b;
        }
        .tiptap-editor-content .tiptap h2 {
          font-size: 1.5rem;
          font-weight: 700;
          line-height: 1.3;
          margin: 1.2rem 0 0.5rem;
          color: #09090b;
        }
        .tiptap-editor-content .tiptap h3 {
          font-size: 1.2rem;
          font-weight: 700;
          line-height: 1.4;
          margin: 1rem 0 0.4rem;
          color: #18181b;
        }

        /* Paragraph */
        .tiptap-editor-content .tiptap p {
          margin: 0 0 0.75rem;
        }

        /* Lists */
        .tiptap-editor-content .tiptap ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin: 0.5rem 0 0.75rem;
        }
        .tiptap-editor-content .tiptap ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin: 0.5rem 0 0.75rem;
        }
        .tiptap-editor-content .tiptap li {
          margin: 0.25rem 0;
        }

        /* Blockquote */
        .tiptap-editor-content .tiptap blockquote {
          border-left: 4px solid #03B8B8;
          margin: 1rem 0;
          padding: 0.6rem 1rem;
          background: rgba(3, 184, 184, 0.04);
          border-radius: 0 8px 8px 0;
          color: #3f3f46;
          font-style: italic;
        }

        /* Code */
        .tiptap-editor-content .tiptap code {
          background: #f4f4f5;
          border-radius: 4px;
          padding: 0.15em 0.35em;
          font-family: ui-monospace, monospace;
          font-size: 0.85em;
          color: #be185d;
        }
        .tiptap-editor-content .tiptap pre {
          background: #18181b;
          color: #e4e4e7;
          border-radius: 10px;
          padding: 1rem 1.25rem;
          font-family: ui-monospace, monospace;
          font-size: 0.875rem;
          overflow-x: auto;
          margin: 1rem 0;
        }
        .tiptap-editor-content .tiptap pre code {
          background: none;
          color: inherit;
          padding: 0;
          font-size: inherit;
        }

        /* Horizontal rule */
        .tiptap-editor-content .tiptap hr {
          border: none;
          border-top: 2px solid #e4e4e7;
          margin: 1.5rem 0;
        }

        /* Table */
        .tiptap-editor-content .tiptap table {
          border-collapse: collapse;
          width: 100%;
          margin: 1rem 0;
          border-radius: 8px;
          overflow: hidden;
          font-size: 0.875rem;
        }
        .tiptap-editor-content .tiptap th {
          background: #f1f5f9;
          color: #334155;
          font-weight: 700;
          text-align: left;
          padding: 0.6rem 0.85rem;
          border: 1px solid #e2e8f0;
        }
        .tiptap-editor-content .tiptap td {
          padding: 0.55rem 0.85rem;
          border: 1px solid #e2e8f0;
          color: #374151;
          vertical-align: top;
        }
        .tiptap-editor-content .tiptap tr:nth-child(even) td {
          background: #f8fafc;
        }
        /* Selected cell highlight */
        .tiptap-editor-content .tiptap .selectedCell {
          background: rgba(3, 184, 184, 0.08) !important;
        }

        /* YouTube embed */
        .tiptap-editor-content .tiptap div[data-youtube-video] {
          display: flex;
          justify-content: center;
          margin: 1.25rem 0;
        }
        .tiptap-editor-content .tiptap div[data-youtube-video] iframe {
          border-radius: 12px;
          max-width: 100%;
        }
      `}</style>
    </div>
  );
}
