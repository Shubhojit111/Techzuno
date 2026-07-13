"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Mention from "@tiptap/extension-mention";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableCell } from "@tiptap/extension-table-cell";
import { Youtube } from "@tiptap/extension-youtube";
import { useEffect, useCallback, useState, useRef } from "react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Check,
  ChevronDown,
  Code2,
  Eraser,
  Highlighter,
  Image as ImageIcon,
  Italic,
  Link as LinkIcon,
  Link2Off,
  List,
  ListChecks,
  ListOrdered,
  Minus,
  Palette,
  Quote,
  Redo2,
  Rows3,
  Strikethrough,
  Subscript as SubscriptIcon,
  Superscript as SuperscriptIcon,
  Table as TableIcon,
  TextCursorInput,
  Type,
  X,
  Underline as UnderlineIcon,
  Undo2,
  Video as YoutubeIcon,
} from "lucide-react";

const HEADING_OPTIONS = [
  { label: "Paragraph", value: "paragraph" },
  { label: "Heading 1", value: "h1" },
  { label: "Heading 2", value: "h2" },
  { label: "Heading 3", value: "h3" },
];

const TEXT_COLORS = [
  { label: "Slate", value: "#0f172a" },
  { label: "Teal", value: "#03B8B8" },
  { label: "Cyan", value: "#0891b2" },
  { label: "Rose", value: "#be123c" },
  { label: "Amber", value: "#b45309" },
  { label: "Violet", value: "#6d28d9" },
];

const HIGHLIGHT_COLORS = [
  { label: "Teal", value: "#ccfbf1" },
  { label: "Yellow", value: "#fef3c7" },
  { label: "Rose", value: "#ffe4e6" },
  { label: "Blue", value: "#dbeafe" },
  { label: "Green", value: "#dcfce7" },
  { label: "Violet", value: "#ede9fe" },
];

const MENTION_USERS = [
  { id: "albert", label: "Albert", email: "albert@gmail.com", color: "#2f5f85" },
  { id: "andrew-james", label: "Andrew James", email: "james@gmail.com", color: "#70d84a" },
  { id: "camden-kate", label: "Camden Kate", email: "camden@gmail.com", color: "#6366e8" },
  { id: "sarah", label: "Sarah", email: "sarah@gmail.com", color: "#0f766e" },
  { id: "bishal", label: "Bishal", email: "bishal@techzuno.com", color: "#03B8B8" },
];

function createMentionSuggestion() {
  let popup;
  let selectedIndex = 0;
  let currentItems = [];
  let currentCommand;

  const selectItem = (index) => {
    const item = currentItems[index];
    if (item && currentCommand) currentCommand(item);
  };

  const renderItems = () => {
    if (!popup) return;
    popup.innerHTML = "";

    currentItems.forEach((item, index) => {
      const option = document.createElement("button");
      option.type = "button";
      option.className = `mention-option ${index === selectedIndex ? "is-selected" : ""}`;
      option.addEventListener("mousedown", (event) => {
        event.preventDefault();
        selectItem(index);
      });

      const avatar = document.createElement("span");
      avatar.className = "mention-avatar";
      avatar.style.backgroundColor = item.color;
      avatar.textContent = item.label
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

      const meta = document.createElement("span");
      meta.className = "mention-meta";
      meta.innerHTML = `<strong>${item.label}</strong><small>${item.email}</small>`;

      option.appendChild(avatar);
      option.appendChild(meta);
      popup.appendChild(option);
    });
  };

  const movePopup = (clientRect) => {
    if (!popup || !clientRect) return;
    const rect = clientRect();
    if (!rect) return;
    popup.style.left = `${rect.left + window.scrollX}px`;
    popup.style.top = `${rect.bottom + window.scrollY + 8}px`;
  };

  return {
    char: "@",
    items: ({ query }) =>
      MENTION_USERS.filter((user) =>
        `${user.label} ${user.email}`.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6),
    command: ({ editor, range, props }) => {
      editor
        .chain()
        .focus()
        .insertContentAt(range, [
          { type: "mention", attrs: { id: props.id, label: props.label } },
          { type: "text", text: " " },
        ])
        .run();
    },
    render: () => ({
      onStart: (props) => {
        selectedIndex = 0;
        currentItems = props.items;
        currentCommand = props.command;
        popup = document.createElement("div");
        popup.className = "tiptap-mention-popover";
        document.body.appendChild(popup);
        renderItems();
        movePopup(props.clientRect);
      },
      onUpdate: (props) => {
        selectedIndex = 0;
        currentItems = props.items;
        currentCommand = props.command;
        renderItems();
        movePopup(props.clientRect);
      },
      onKeyDown: (props) => {
        if (props.event.key === "ArrowDown") {
          selectedIndex = (selectedIndex + 1) % currentItems.length;
          renderItems();
          return true;
        }
        if (props.event.key === "ArrowUp") {
          selectedIndex = (selectedIndex + currentItems.length - 1) % currentItems.length;
          renderItems();
          return true;
        }
        if (props.event.key === "Enter") {
          selectItem(selectedIndex);
          return true;
        }
        return false;
      },
      onExit: () => {
        popup?.remove();
        popup = null;
      },
    }),
  };
}

function getActiveHeading(editor) {
  if (!editor) return "paragraph";
  if (editor.isActive("heading", { level: 1 })) return "h1";
  if (editor.isActive("heading", { level: 2 })) return "h2";
  if (editor.isActive("heading", { level: 3 })) return "h3";
  return "paragraph";
}

function Dropdown({ label, icon: Icon, minWidth = "min-w-[132px]", children }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (event) => {
      if (ref.current && !ref.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => setOpen((value) => !value)}
        className={`toolbar-select ${minWidth}`}
      >
        {Icon ? <Icon className="w-4 h-4" /> : null}
        <span className="truncate">{label}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? (
        <div className="toolbar-menu" onClick={() => setOpen(false)}>
          {children}
        </div>
      ) : null}
    </div>
  );
}

function MenuItem({ active, onClick, children }) {
  return (
    <button
      type="button"
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      className={`toolbar-menu-item ${active ? "is-active" : ""}`}
    >
      {children}
      {active ? <Check className="w-3.5 h-3.5" /> : null}
    </button>
  );
}

function SwatchItem({ label, value, onClick }) {
  return (
    <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={onClick} className="toolbar-swatch-item">
      <span className="toolbar-swatch" style={{ backgroundColor: value }} />
      <span>{label}</span>
    </button>
  );
}

function ToolbarBtn({ onClick, isActive, disabled, title, children }) {
  return (
    <button
      type="button"
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`toolbar-btn ${isActive ? "is-active" : ""}`}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <span className="toolbar-divider" />;
}


function LinkModal({ open, initialUrl, initialText, onClose, onSubmit }) {
  const [url, setUrl] = useState(initialUrl || "https://");
  const [label, setLabel] = useState(initialText || "");
  const urlRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    setUrl(initialUrl || "https://");
    setLabel(initialText || "");
    const id = window.setTimeout(() => urlRef.current?.focus(), 20);
    return () => window.clearTimeout(id);
  }, [open, initialUrl, initialText]);

  if (!open) return null;

  return (
    <div className="link-modal-backdrop">
      <div className="link-modal" role="dialog" aria-modal="true" aria-label="What's your link?">
        <div className="link-modal-header">
          <div>
            <p className="link-modal-kicker">Hyperlink</p>
            <h3>What's your link?</h3>
          </div>
          <button type="button" className="link-modal-close" onClick={onClose} aria-label="Close link dialog">
            <X className="w-4 h-4" />
          </button>
        </div>
        <label className="link-modal-field">
          <span>URL</span>
          <input
            ref={urlRef}
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="https://example.com"
            onKeyDown={(event) => {
              if (event.key === "Enter") onSubmit({ url, label });
              if (event.key === "Escape") onClose();
            }}
          />
        </label>
        <label className="link-modal-field">
          <span>Display text</span>
          <input
            value={label}
            onChange={(event) => setLabel(event.target.value)}
            placeholder="Text to show when nothing is selected"
            onKeyDown={(event) => {
              if (event.key === "Enter") onSubmit({ url, label });
              if (event.key === "Escape") onClose();
            }}
          />
        </label>
        <p className="link-modal-help">Select text to turn it into a link, or place the cursor anywhere to insert a new linked text. Empty URL removes the active link.</p>
        <div className="link-modal-actions">
          <button type="button" className="link-modal-secondary" onClick={onClose}>Cancel</button>
          <button type="button" className="link-modal-primary" onClick={() => onSubmit({ url, label })}>Apply link</button>
        </div>
      </div>
    </div>
  );
}

function Toolbar({ editor }) {
  const [stateVersion, setStateVersion] = useState(0);
  const [linkModal, setLinkModal] = useState({ open: false, url: "", text: "" });
  const lastSelectionRef = useRef(null);

  useEffect(() => {
    if (!editor) return;

    const rememberSelection = () => {
      lastSelectionRef.current = editor.state.selection.toJSON();
      setStateVersion((value) => value + 1);
    };

    editor.on("selectionUpdate", rememberSelection);
    editor.on("transaction", rememberSelection);
    editor.on("focus", rememberSelection);

    return () => {
      editor.off("selectionUpdate", rememberSelection);
      editor.off("transaction", rememberSelection);
      editor.off("focus", rememberSelection);
    };
  }, [editor]);

  const restoreSelection = useCallback(() => {
    if (!editor || !lastSelectionRef.current) return;
    try {
      const { from, to } = lastSelectionRef.current;
      if (Number.isFinite(from) && Number.isFinite(to)) {
        editor.commands.setTextSelection({ from, to });
      }
    } catch {
      editor.commands.focus("end");
    }
  }, [editor]);

  const openLinkModal = useCallback(() => {
    if (!editor) return;
    restoreSelection();
    const previousUrl = editor.getAttributes("link").href || "";
    const selectedText = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      " "
    );
    setLinkModal({
      open: true,
      url: previousUrl || "https://",
      text: selectedText || previousUrl || "",
    });
  }, [editor, restoreSelection]);

  const applyLink = useCallback(({ url, label }) => {
    if (!editor) return;

    restoreSelection();
    const trimmed = (url || "").trim();
    const selection = editor.state.selection;
    const previousUrl = editor.getAttributes("link").href;

    if (trimmed === "" || trimmed === "https://") {
      if (previousUrl) {
        editor.chain().focus().extendMarkRange("link").unsetLink().run();
      }
      setLinkModal({ open: false, url: "", text: "" });
      return;
    }

    if (selection.empty && !previousUrl) {
      const fallbackText = (label || "").trim() || trimmed;
      editor
        .chain()
        .focus()
        .insertContent({
          type: "text",
          text: fallbackText,
          marks: [
            {
              type: "link",
              attrs: { href: trimmed, target: "_blank", rel: "noopener noreferrer" },
            },
          ],
        })
        .run();
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: trimmed, target: "_blank" })
        .run();
    }

    setLinkModal({ open: false, url: "", text: "" });
  }, [editor, restoreSelection]);

  const handleImage = useCallback(() => {
    if (!editor) return;
    const src = window.prompt("Image URL:", "https://");
    if (!src || src.trim() === "https://") return;
    const alt = window.prompt("Alt text:", "Blog image") || "Blog image";
    editor.chain().focus().setImage({ src: src.trim(), alt }).run();
  }, [editor]);

  const handleTable = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  }, [editor]);

  const handleYoutube = useCallback(() => {
    if (!editor) return;
    const url = window.prompt("Enter YouTube video URL:", "https://www.youtube.com/watch?v=");
    if (url) editor.chain().focus().setYoutubeVideo({ src: url }).run();
  }, [editor]);

  if (!editor) return null;
  void stateVersion;

  const activeHeading = getActiveHeading(editor);
  const activeHeadingLabel = HEADING_OPTIONS.find((option) => option.value === activeHeading)?.label;

  return (
    <>
    <div className="tiptap-toolbar">
      <div className="toolbar-row ">
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive("bold")} title="Bold">
          <Bold className="w-4 h-4" />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive("italic")} title="Italic">
          <Italic className="w-4 h-4" />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive("underline")} title="Underline">
          <UnderlineIcon className="w-4 h-4" />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive("strike")} title="Strikethrough">
          <Strikethrough className="w-4 h-4" />
        </ToolbarBtn>
        <Divider />
        <ToolbarBtn onClick={openLinkModal} isActive={editor.isActive("link")} title={editor.isActive("link") ? "Edit or remove link" : "Add link"}>
          {editor.isActive("link") ? <Link2Off className="w-4 h-4" /> : <LinkIcon className="w-4 h-4" />}
        </ToolbarBtn>
        <ToolbarBtn onClick={handleImage} title="Insert image">
          <ImageIcon className="w-4 h-4" />
        </ToolbarBtn>
        <ToolbarBtn onClick={handleTable} title="Insert 3 x 3 table">
          <TableIcon className="w-4 h-4" />
        </ToolbarBtn>
        <ToolbarBtn onClick={handleYoutube} title="Embed YouTube video">
          <YoutubeIcon className="w-4 h-4" />
        </ToolbarBtn>
        <Dropdown label="Insert" icon={Rows3} minWidth="min-w-[110px]">
          <MenuItem onClick={() => editor.chain().focus().setHorizontalRule().run()}>
            <span className="flex items-center gap-2"><Minus className="w-4 h-4" /> Horizontal rule</span>
          </MenuItem>
          <MenuItem onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive("codeBlock")}>
            <span className="flex items-center gap-2"><Code2 className="w-4 h-4" /> Code block</span>
          </MenuItem>
        </Dropdown>
        <Divider />
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive("bulletList")} title="Bullet list">
          <List className="w-4 h-4" />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive("orderedList")} title="Numbered list">
          <ListOrdered className="w-4 h-4" />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleTaskList().run()} isActive={editor.isActive("taskList")} title="Task list">
          <ListChecks className="w-4 h-4" />
        </ToolbarBtn>
        <Dropdown label={activeHeadingLabel || "Paragraph"} icon={Type} minWidth="min-w-[150px]">
          {HEADING_OPTIONS.map((option) => (
            <MenuItem
              key={option.value}
              active={activeHeading === option.value}
              onClick={() => {
                if (option.value === "paragraph") editor.chain().focus().setParagraph().run();
                else editor.chain().focus().toggleHeading({ level: Number(option.value.slice(1)) }).run();
              }}
            >
              {option.label}
            </MenuItem>
          ))}
        </Dropdown>
      </div>

      <div className="toolbar-row toolbar-row-secondary">
        <Dropdown label="Align" icon={AlignLeft} minWidth="min-w-[112px]">
          <MenuItem active={editor.isActive({ textAlign: "left" })} onClick={() => editor.chain().focus().setTextAlign("left").run()}>
            <span className="flex items-center gap-2"><AlignLeft className="w-4 h-4" /> Left</span>
          </MenuItem>
          <MenuItem active={editor.isActive({ textAlign: "center" })} onClick={() => editor.chain().focus().setTextAlign("center").run()}>
            <span className="flex items-center gap-2"><AlignCenter className="w-4 h-4" /> Center</span>
          </MenuItem>
          <MenuItem active={editor.isActive({ textAlign: "right" })} onClick={() => editor.chain().focus().setTextAlign("right").run()}>
            <span className="flex items-center gap-2"><AlignRight className="w-4 h-4" /> Right</span>
          </MenuItem>
          <MenuItem active={editor.isActive({ textAlign: "justify" })} onClick={() => editor.chain().focus().setTextAlign("justify").run()}>
            <span className="flex items-center gap-2"><AlignJustify className="w-4 h-4" /> Justify</span>
          </MenuItem>
        </Dropdown>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive("blockquote")} title="Block quote">
          <Quote className="w-4 h-4" />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleCode().run()} isActive={editor.isActive("code")} title="Inline code">
          <Code2 className="w-4 h-4" />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleSubscript().run()} isActive={editor.isActive("subscript")} title="Subscript">
          <SubscriptIcon className="w-4 h-4" />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleSuperscript().run()} isActive={editor.isActive("superscript")} title="Superscript">
          <SuperscriptIcon className="w-4 h-4" />
        </ToolbarBtn>
        <Divider />
        <Dropdown label="Text color" icon={Palette} minWidth="min-w-[132px]">
          {TEXT_COLORS.map((color) => (
            <SwatchItem key={color.value} label={color.label} value={color.value} onClick={() => editor.chain().focus().setMark("textStyle", { color: color.value }).run()} />
          ))}
          <MenuItem onClick={() => editor.chain().focus().unsetColor().run()}>
            <span className="flex items-center gap-2"><Eraser className="w-4 h-4" /> Clear color</span>
          </MenuItem>
        </Dropdown>
        <Dropdown label="Highlight" icon={Highlighter} minWidth="min-w-[124px]">
          {HIGHLIGHT_COLORS.map((color) => (
            <SwatchItem key={color.value} label={color.label} value={color.value} onClick={() => editor.chain().focus().toggleHighlight({ color: color.value }).run()} />
          ))}
          <MenuItem onClick={() => editor.chain().focus().unsetHighlight().run()}>
            <span className="flex items-center gap-2"><Eraser className="w-4 h-4" /> Clear highlight</span>
          </MenuItem>
        </Dropdown>
        <Divider />
        <ToolbarBtn onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Undo">
          <Undo2 className="w-4 h-4" />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Redo">
          <Redo2 className="w-4 h-4" />
        </ToolbarBtn>
        <div className="toolbar-hint">
          <TextCursorInput className="w-3.5 h-3.5" /> Type @ to mention
        </div>
      </div>
    </div>
    <LinkModal
      open={linkModal.open}
      initialUrl={linkModal.url}
      initialText={linkModal.text}
      onClose={() => setLinkModal({ open: false, url: "", text: "" })}
      onSubmit={applyLink}
    />
    </>
  );
}

export default function CustomTiptapEditor({ value, onChange }) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Subscript,
      Superscript,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Image.configure({
        inline: false,
        allowBase64: true,
        HTMLAttributes: { class: "tiptap-image" },
      }),
      Mention.configure({
        HTMLAttributes: { class: "tiptap-mention" },
        suggestion: createMentionSuggestion(),
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          class: "text-[#03B8B8] underline hover:text-[#38FFF2] transition-colors cursor-pointer",
          rel: "noopener noreferrer",
        },
      }),
      Placeholder.configure({ placeholder: "Write blog content here... Type @ to mention someone." }),
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

  useEffect(() => {
    if (!editor || editor.isDestroyed) return;
    const current = editor.getHTML();
    if ((value ?? "") !== current) {
      editor.commands.setContent(value || "", false);
    }
  }, [value, editor]);

  return (
    <div className="tiptap-shell">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} className="tiptap-editor-content" />
      <style>{`
        .tiptap-shell {
          width: 100%;
          height: 100%;
          min-height: 0;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border: 1px solid #d4d4d8;
          border-radius: 18px;
          background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
          box-shadow: 0 20px 50px rgba(15, 23, 42, 0.08);
        }

        .tiptap-toolbar {
          display: flex;
          flex-shrink: 0;
          flex-direction: column;
          gap: 0;
          border-bottom: 1px solid #e4e4e7;
          background: linear-gradient(180deg, #ffffff 0%, #f6f8fb 100%);
        }

        .toolbar-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.35rem;
          min-height: 56px;
          padding: 0.65rem 0.85rem;
        }

        .toolbar-row-secondary {
          border-top: 1px solid #edf0f3;
          background: rgba(248, 250, 252, 0.72);
        }

        .toolbar-btn,
        .toolbar-select {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          min-height: 36px;
          border: 1px solid transparent;
          border-radius: 10px;
          color: #334155;
          background: transparent;
          transition: all 0.16s ease;
          cursor: pointer;
        }

        .toolbar-btn {
          width: 36px;
          padding: 0;
        }

        .toolbar-select {
          padding: 0 0.75rem;
          font-size: 0.78rem;
          font-weight: 700;
        }

        .toolbar-btn:hover,
        .toolbar-select:hover {
          border-color: #d9f7f7;
          background: #ecfeff;
          color: #047b7b;
          transform: translateY(-1px);
        }

        .toolbar-btn.is-active,
        .toolbar-menu-item.is-active {
          border-color: rgba(3, 184, 184, 0.28);
          background: rgba(3, 184, 184, 0.12);
          color: #028989;
        }

        .toolbar-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
          transform: none;
        }

        .toolbar-divider {
          width: 1px;
          height: 26px;
          margin: 0 0.35rem;
          background: #e4e4e7;
        }

        .toolbar-menu {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          z-index: 80;
          width: 210px;
          overflow: hidden;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          background: #ffffff;
          box-shadow: 0 18px 45px rgba(15, 23, 42, 0.16);
          padding: 0.35rem;
        }

        .toolbar-menu-item,
        .toolbar-swatch-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          border: 0;
          border-radius: 10px;
          background: transparent;
          padding: 0.65rem 0.75rem;
          color: #334155;
          font-size: 0.8rem;
          font-weight: 650;
          text-align: left;
          cursor: pointer;
        }

        .toolbar-menu-item:hover,
        .toolbar-swatch-item:hover {
          background: #f0fdfa;
          color: #047b7b;
        }

        .toolbar-swatch-item {
          justify-content: flex-start;
          gap: 0.65rem;
        }

        .toolbar-swatch {
          width: 18px;
          height: 18px;
          border-radius: 999px;
          border: 2px solid #ffffff;
          box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.16);
        }

        .toolbar-hint {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          margin-left: auto;
          color: #64748b;
          font-size: 0.75rem;
          font-weight: 650;
        }

        .tiptap-editor-content {
          flex: 1 1 auto;
          min-height: 0;
          overflow-y: auto;
          overscroll-behavior: contain;
          background: #ffffff;
        }

        .tiptap-editor-content .tiptap {
          min-height: 100%;
          padding: 1.5rem 1.75rem;
          outline: none;
          color: #18181b;
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
          font-size: 0.95rem;
          line-height: 1.78;
          caret-color: #0f172a;
          background: #ffffff;
        }

        .tiptap-editor-content .tiptap:focus {
          box-shadow: inset 0 0 0 2px rgba(3, 184, 184, 0.18);
        }

        .tiptap-editor-content .tiptap ::selection {
          background: rgba(3, 184, 184, 0.25);
        }

        .tiptap-editor-content .tiptap p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #a1a1aa;
          pointer-events: none;
          height: 0;
        }

        .tiptap-editor-content .tiptap h1,
        .tiptap-editor-content .tiptap h2,
        .tiptap-editor-content .tiptap h3 {
          color: #09090b;
          font-weight: 800;
        }

        .tiptap-editor-content .tiptap h1 { font-size: 2rem; line-height: 1.2; margin: 1.4rem 0 0.6rem; }
        .tiptap-editor-content .tiptap h2 { font-size: 1.5rem; line-height: 1.3; margin: 1.2rem 0 0.5rem; }
        .tiptap-editor-content .tiptap h3 { font-size: 1.2rem; line-height: 1.4; margin: 1rem 0 0.4rem; }
        .tiptap-editor-content .tiptap p { margin: 0 0 0.75rem; }
        .tiptap-editor-content .tiptap u,
        .tiptap-editor-content .tiptap a {
          text-underline-offset: 2px;
          text-decoration-thickness: 1px;
        }

        .tiptap-editor-content .tiptap ul,
        .tiptap-editor-content .tiptap ol {
          padding-left: 1.5rem;
          margin: 0.5rem 0 0.75rem;
        }
        .tiptap-editor-content .tiptap ul { list-style-type: disc; }
        .tiptap-editor-content .tiptap ol { list-style-type: decimal; }
        .tiptap-editor-content .tiptap li { margin: 0.25rem 0; }

        .tiptap-editor-content .tiptap ul[data-type="taskList"] {
          list-style: none;
          padding-left: 0;
        }
        .tiptap-editor-content .tiptap li[data-type="taskItem"] {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
        }
        .tiptap-editor-content .tiptap li[data-type="taskItem"] > label {
          margin-top: 0.2rem;
        }
        .tiptap-editor-content .tiptap li[data-type="taskItem"] input {
          accent-color: #03B8B8;
        }

        .tiptap-editor-content .tiptap blockquote {
          border-left: 4px solid #03B8B8;
          margin: 1rem 0;
          padding: 0.7rem 1rem;
          background: rgba(3, 184, 184, 0.05);
          border-radius: 0 10px 10px 0;
          color: #3f3f46;
          font-style: italic;
        }

        .tiptap-editor-content .tiptap code {
          background: #f4f4f5;
          border-radius: 5px;
          padding: 0.15em 0.4em;
          font-family: ui-monospace, monospace;
          font-size: 0.86em;
          color: #be185d;
        }
        .tiptap-editor-content .tiptap pre {
          background: #111827;
          color: #e4e4e7;
          border-radius: 12px;
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

        .tiptap-editor-content .tiptap hr {
          border: none;
          border-top: 2px solid #e4e4e7;
          margin: 1.5rem 0;
        }

        .tiptap-editor-content .tiptap table {
          border-collapse: collapse;
          width: 100%;
          margin: 1rem 0;
          border-radius: 10px;
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
        .tiptap-editor-content .tiptap tr:nth-child(even) td { background: #f8fafc; }
        .tiptap-editor-content .tiptap .selectedCell { background: rgba(3, 184, 184, 0.08) !important; }

        .tiptap-editor-content .tiptap img.tiptap-image {
          display: block;
          max-width: 100%;
          height: auto;
          margin: 1.25rem auto;
          border-radius: 16px;
          box-shadow: 0 18px 42px rgba(15, 23, 42, 0.14);
        }

        .tiptap-editor-content .tiptap div[data-youtube-video] {
          display: flex;
          justify-content: center;
          margin: 1.25rem 0;
        }
        .tiptap-editor-content .tiptap div[data-youtube-video] iframe {
          border-radius: 12px;
          max-width: 100%;
        }

        .tiptap-editor-content .tiptap .tiptap-mention {
          display: inline-flex;
          align-items: center;
          border-radius: 999px;
          background: rgba(3, 184, 184, 0.1);
          color: #047b7b;
          padding: 0.05rem 0.45rem;
          font-weight: 700;
        }

        .link-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 9998;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 18vh;
          background: rgba(15, 23, 42, 0.24);
          backdrop-filter: blur(4px);
        }
        .link-modal {
          width: min(440px, calc(100vw - 2rem));
          border: 1px solid rgba(3, 184, 184, 0.22);
          border-radius: 18px;
          background: #ffffff;
          box-shadow: 0 28px 80px rgba(15, 23, 42, 0.24);
          padding: 1rem;
        }
        .link-modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        .link-modal-kicker {
          margin: 0 0 0.15rem;
          color: #03B8B8;
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }
        .link-modal h3 {
          margin: 0;
          color: #0f172a;
          font-size: 1.2rem;
          font-weight: 850;
        }
        .link-modal-close {
          display: inline-flex;
          width: 34px;
          height: 34px;
          align-items: center;
          justify-content: center;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          background: #f8fafc;
          color: #475569;
          cursor: pointer;
        }
        .link-modal-field {
          display: block;
          margin-top: 0.75rem;
        }
        .link-modal-field span {
          display: block;
          margin-bottom: 0.35rem;
          color: #475569;
          font-size: 0.76rem;
          font-weight: 800;
        }
        .link-modal-field input {
          width: 100%;
          border: 1px solid #dbe3ea;
          border-radius: 12px;
          background: #f8fafc;
          color: #0f172a;
          outline: none;
          padding: 0.75rem 0.85rem;
          font-size: 0.9rem;
        }
        .link-modal-field input:focus {
          border-color: rgba(3, 184, 184, 0.6);
          box-shadow: 0 0 0 3px rgba(3, 184, 184, 0.12);
          background: #ffffff;
        }
        .link-modal-help {
          margin: 0.75rem 0 0;
          color: #64748b;
          font-size: 0.76rem;
          line-height: 1.5;
        }
        .link-modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 0.6rem;
          margin-top: 1rem;
        }
        .link-modal-secondary,
        .link-modal-primary {
          border-radius: 11px;
          padding: 0.65rem 0.95rem;
          font-size: 0.82rem;
          font-weight: 800;
          cursor: pointer;
        }
        .link-modal-secondary {
          border: 1px solid #e2e8f0;
          background: #ffffff;
          color: #475569;
        }
        .link-modal-primary {
          border: 1px solid #03B8B8;
          background: #03B8B8;
          color: #001314;
          box-shadow: 0 10px 24px rgba(3, 184, 184, 0.24);
        }

        .tiptap-mention-popover {
          position: absolute;
          z-index: 9999;
          width: 360px;
          max-height: 280px;
          overflow-y: auto;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          background: #ffffff;
          box-shadow: 0 22px 60px rgba(15, 23, 42, 0.2);
          padding: 0.45rem;
        }
        .mention-option {
          display: flex;
          width: 100%;
          align-items: center;
          gap: 0.85rem;
          border: 0;
          border-radius: 12px;
          background: transparent;
          padding: 0.65rem;
          text-align: left;
          cursor: pointer;
        }
        .mention-option:hover,
        .mention-option.is-selected {
          background: #f0fdfa;
        }
        .mention-avatar {
          display: inline-flex;
          width: 42px;
          height: 42px;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          color: #ffffff;
          font-size: 0.8rem;
          font-weight: 800;
        }
        .mention-meta {
          display: flex;
          min-width: 0;
          flex-direction: column;
        }
        .mention-meta strong {
          color: #1f2937;
          font-size: 0.95rem;
        }
        .mention-meta small {
          color: #94a3b8;
          font-size: 0.82rem;
        }
      `}</style>
    </div>
  );
}

