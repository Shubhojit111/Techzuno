"use client";

import { useEditor, EditorContent, NodeViewWrapper, NodeViewContent, ReactNodeViewRenderer } from "@tiptap/react";
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
  GripVertical,
  Trash2,
} from "lucide-react";
import axios from "axios";

const ImageNodeComponent = ({ node, updateAttributes, deleteNode, editor }) => {
  const [isResizing, setIsResizing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);

  const handleMouseDown = (e) => {
    if (e.target.closest(".resize-handle")) {
      e.preventDefault();
      setIsResizing(true);
      setStartX(e.clientX);
      setStartWidth(node.attrs.width || 500);
    }
  };

  const handleMouseMove = useCallback((e) => {
    if (!isResizing) return;
    const deltaX = e.clientX - startX;
    const align = node.attrs.align || "center";
    
    // If centered, both sides grow, so right edge moves by deltaX / 2. To get accurate drag, we multiply delta by 2.
    // If right aligned, dragging the right handle doesn't make sense because it's fixed to the right. We subtract deltaX.
    let newWidth = startWidth;
    if (align === "center") {
      newWidth = startWidth + deltaX * 2;
    } else if (align === "right") {
      newWidth = startWidth - deltaX;
    } else {
      newWidth = startWidth + deltaX;
    }
    
    newWidth = Math.max(100, Math.min(1000, newWidth));
    updateAttributes({ width: newWidth });
  }, [isResizing, startX, startWidth, updateAttributes, node.attrs.align]);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isResizing, handleMouseMove, handleMouseUp]);

  const align = node.attrs.align || "center";
  const alignmentClass = align === "left" ? "justify-start" : align === "right" ? "justify-end" : "justify-center";

  return (
    <NodeViewWrapper
      className={`group relative my-4 flex w-full ${alignmentClass}`}
      draggable
      data-drag-handle
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
    >
      <div className={`relative inline-block transition-all ${isDragging ? "opacity-50" : ""}`} style={{ width: node.attrs.width || 500 }}>
        <img
          src={node.attrs.src}
          alt={node.attrs.alt || "Blog image"}
          className="w-full rounded-xl shadow-lg"
        />

        {/* Action Toolbar (Align + Delete) */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm border border-zinc-200 shadow-xl rounded-lg px-2 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 z-10">
          <button onClick={(e) => { e.preventDefault(); updateAttributes({ align: "left" }); }} className={`p-1 rounded hover:bg-zinc-100 ${align === "left" ? "text-[#03B8B8]" : "text-zinc-500"}`} title="Align Left">
            <AlignLeft size={16} />
          </button>
          <button onClick={(e) => { e.preventDefault(); updateAttributes({ align: "center" }); }} className={`p-1 rounded hover:bg-zinc-100 ${align === "center" ? "text-[#03B8B8]" : "text-zinc-500"}`} title="Align Center">
            <AlignCenter size={16} />
          </button>
          <button onClick={(e) => { e.preventDefault(); updateAttributes({ align: "right" }); }} className={`p-1 rounded hover:bg-zinc-100 ${align === "right" ? "text-[#03B8B8]" : "text-zinc-500"}`} title="Align Right">
            <AlignRight size={16} />
          </button>
          <div className="w-px h-4 bg-zinc-300 mx-1"></div>
          <button
            onClick={(e) => {
              e.preventDefault();
              deleteNode();
            }}
            className="p-1 rounded hover:bg-red-50 text-red-500 transition-colors"
            title="Delete Image"
          >
            <Trash2 size={16} />
          </button>
        </div>

        {/* Drag Handle */}
        <div className="absolute -left-8 top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400 hover:text-zinc-600 bg-white shadow-md p-1.5 rounded-lg border border-zinc-200">
          <GripVertical size={16} />
        </div>

        {/* Resize Handle */}
        <div
          className="resize-handle absolute -bottom-1 -right-1 w-6 h-6 cursor-nwse-resize bg-white shadow-md border border-zinc-200 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
          onMouseDown={handleMouseDown}
        >
          <div className="w-2.5 h-2.5 bg-[#03B8B8] rounded-full"></div>
        </div>
      </div>
    </NodeViewWrapper>
  );
};

const CustomImageExtension = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: 500,
      },
      align: {
        default: "center",
      },
    };
  },
  addNodeView() {
    return ReactNodeViewRenderer(ImageNodeComponent);
  },
});

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

function Toolbar({ editor, handleImageUpload }) {
  const [stateVersion, setStateVersion] = useState(0);
  const [linkModal, setLinkModal] = useState({ open: false, url: "", text: "" });
  const [uploadingImage, setUploadingImage] = useState(false);
  const lastSelectionRef = useRef(null);
  const fileInputRef = useRef(null);

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
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const imageUrl = await handleImageUpload(file);
      if (imageUrl) {
        editor.chain().focus().setImage({ src: imageUrl, alt: file.name, width: 500 }).run();
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Failed to upload image");
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

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
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: "none" }}
      />
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
          <ToolbarBtn onClick={handleImage} title="Insert image" disabled={uploadingImage}>
            {uploadingImage ? (
              <div className="w-4 h-4 border-2 border-zinc-300 border-t-[#03B8B8] rounded-full animate-spin" />
            ) : (
              <ImageIcon className="w-4 h-4" />
            )}
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
  // Function to upload image
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await axios.post("http://localhost:5000/api/upload/image", formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.url;
  };

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        underline: false,
        link: false,
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
      CustomImageExtension.configure({
        inline: false,
        allowBase64: true,
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
      <Toolbar editor={editor} handleImageUpload={handleImageUpload} />
      <EditorContent editor={editor} className="tiptap-editor-content no-scrollbar" />
      <style>{`
        .tiptap-shell {
          width: 100%;
          display: flex;
          flex-direction: column;
          border-radius: 14px;
          background: rgba(0, 0, 0, 0.15);
          box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.25);
        }

        .tiptap-toolbar {
          display: flex;
          flex-shrink: 0;
          flex-direction: column;
          gap: 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(20, 25, 35, 0.98);
          backdrop-filter: blur(12px);
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .toolbar-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.35rem;
          min-height: 56px;
          padding: 0.75rem 1rem;
        }

        .toolbar-row-secondary {
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          background: rgba(0, 0, 0, 0.1);
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
          color: #a1a1aa;
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
          border-color: rgba(3, 184, 184, 0.3);
          background: rgba(3, 184, 184, 0.1);
          color: #38FFF2;
          transform: translateY(-1px);
        }

        .toolbar-btn.is-active,
        .toolbar-menu-item.is-active {
          border-color: rgba(3, 184, 184, 0.4);
          background: rgba(3, 184, 184, 0.2);
          color: #38FFF2;
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
          background: rgba(255, 255, 255, 0.1);
        }

        .toolbar-menu {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          z-index: 80;
          width: 210px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 14px;
          background: #080C14;
          box-shadow: 0 18px 45px rgba(0, 0, 0, 0.5);
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
          color: #e4e4e7;
          font-size: 0.8rem;
          font-weight: 650;
          text-align: left;
          cursor: pointer;
        }

        .toolbar-menu-item:hover,
        .toolbar-swatch-item:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #38FFF2;
        }

        .toolbar-swatch-item {
          justify-content: flex-start;
          gap: 0.65rem;
        }

        .toolbar-swatch {
          width: 18px;
          height: 18px;
          border-radius: 999px;
          border: 2px solid #080C14;
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.2);
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
          max-height: 70vh;
          overflow-y: auto;
          background: transparent;
        }

        .tiptap-editor-content .tiptap {
          min-height: 300px;
          padding: 1.75rem;
          outline: none;
          color: #f4f4f5;
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
          font-size: 1rem;
          line-height: 1.7;
          caret-color: #38FFF2;
          background: transparent;
        }

        .tiptap-editor-content .tiptap:focus {
          box-shadow: inset 0 0 0 2px rgba(3, 184, 184, 0.18);
        }

        .tiptap-editor-content .tiptap ::selection {
          background: rgba(3, 184, 184, 0.35);
        }

        .tiptap-editor-content .tiptap p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #71717a;
          pointer-events: none;
          height: 0;
        }

        .tiptap-editor-content .tiptap h1,
        .tiptap-editor-content .tiptap h2,
        .tiptap-editor-content .tiptap h3 {
          color: #ffffff;
          font-weight: 800;
        }

        .tiptap-editor-content .tiptap h1 { font-size: 2.2rem; line-height: 1.2; margin: 1.8rem 0 0.8rem; }
        .tiptap-editor-content .tiptap h2 { font-size: 1.75rem; line-height: 1.3; margin: 1.5rem 0 0.7rem; }
        .tiptap-editor-content .tiptap h3 { font-size: 1.35rem; line-height: 1.4; margin: 1.2rem 0 0.5rem; }
        .tiptap-editor-content .tiptap p { margin: 0 0 1rem; }
        .tiptap-editor-content .tiptap u,
        .tiptap-editor-content .tiptap a {
          text-underline-offset: 3px;
          text-decoration-thickness: 1px;
        }

        .tiptap-editor-content .tiptap ul,
        .tiptap-editor-content .tiptap ol {
          padding-left: 1.75rem;
          margin: 0.75rem 0 1rem;
        }
        .tiptap-editor-content .tiptap ul { list-style-type: disc; }
        .tiptap-editor-content .tiptap ol { list-style-type: decimal; }
        .tiptap-editor-content .tiptap li { margin: 0.35rem 0; }

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
          margin: 1.2rem 0;
          padding: 0.7rem 1.2rem;
          background: rgba(3, 184, 184, 0.1);
          border-radius: 0 10px 10px 0;
          color: #d4d4d8;
          font-style: italic;
        }

        .tiptap-editor-content .tiptap code {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 5px;
          padding: 0.15em 0.4em;
          font-family: ui-monospace, monospace;
          font-size: 0.86em;
          color: #fb7185;
        }
        .tiptap-editor-content .tiptap pre {
          background: rgba(0, 0, 0, 0.4);
          color: #e4e4e7;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 1.25rem 1.5rem;
          font-family: ui-monospace, monospace;
          font-size: 0.9rem;
          overflow-x: auto;
          margin: 1.2rem 0;
        }
        .tiptap-editor-content .tiptap pre code {
          background: none;
          color: inherit;
          padding: 0;
          font-size: inherit;
        }

        .tiptap-editor-content .tiptap hr {
          border: none;
          border-top: 2px solid rgba(255, 255, 255, 0.1);
          margin: 2rem 0;
        }

        .tiptap-editor-content .tiptap table {
          border-collapse: collapse;
          width: 100%;
          margin: 1.2rem 0;
          border-radius: 10px;
          overflow: hidden;
          font-size: 0.9rem;
        }
        .tiptap-editor-content .tiptap th {
          background: rgba(255, 255, 255, 0.05);
          color: #e4e4e7;
          font-weight: 700;
          text-align: left;
          padding: 0.75rem 1rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .tiptap-editor-content .tiptap td {
          padding: 0.75rem 1rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #d4d4d8;
          vertical-align: top;
        }
        .tiptap-editor-content .tiptap tr:nth-child(even) td { background: rgba(255, 255, 255, 0.02); }
        .tiptap-editor-content .tiptap .selectedCell { background: rgba(3, 184, 184, 0.15) !important; }

        .tiptap-editor-content .tiptap div[data-youtube-video] {
          display: flex;
          justify-content: center;
          margin: 1.5rem 0;
        }
        .tiptap-editor-content .tiptap div[data-youtube-video] iframe {
          border-radius: 12px;
          max-width: 100%;
        }

        .tiptap-editor-content .tiptap .tiptap-mention {
          display: inline-flex;
          align-items: center;
          border-radius: 999px;
          background: rgba(3, 184, 184, 0.15);
          color: #38FFF2;
          padding: 0.1rem 0.5rem;
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
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
        }
        .link-modal {
          width: min(440px, calc(100vw - 2rem));
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 18px;
          background: #080C14;
          box-shadow: 0 28px 80px rgba(0, 0, 0, 0.8);
          padding: 1.25rem;
        }
        .link-modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 1.25rem;
        }
        .link-modal-kicker {
          margin: 0 0 0.25rem;
          color: #03B8B8;
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }
        .link-modal h3 {
          margin: 0;
          color: #ffffff;
          font-size: 1.3rem;
          font-weight: 850;
        }
        .link-modal-close {
          display: inline-flex;
          width: 36px;
          height: 36px;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.05);
          color: #a1a1aa;
          cursor: pointer;
        }
        .link-modal-close:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.1);
        }
        .link-modal-field {
          display: block;
          margin-top: 1rem;
        }
        .link-modal-field span {
          display: block;
          margin-bottom: 0.5rem;
          color: #a1a1aa;
          font-size: 0.8rem;
          font-weight: 800;
        }
        .link-modal-field input {
          width: 100%;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 12px;
          background: rgba(0, 0, 0, 0.2);
          color: #ffffff;
          outline: none;
          padding: 0.85rem 1rem;
          font-size: 0.95rem;
        }
        .link-modal-field input:focus {
          border-color: rgba(3, 184, 184, 0.6);
          box-shadow: 0 0 0 3px rgba(3, 184, 184, 0.12);
        }
        .link-modal-help {
          margin: 1rem 0 0;
          color: #94a3b8;
          font-size: 0.8rem;
          line-height: 1.6;
        }
        .link-modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
          margin-top: 1.25rem;
        }
        .link-modal-secondary,
        .link-modal-primary {
          border-radius: 11px;
          padding: 0.75rem 1.1rem;
          font-size: 0.85rem;
          font-weight: 800;
          cursor: pointer;
        }
        .link-modal-secondary {
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: transparent;
          color: #a1a1aa;
        }
        .link-modal-secondary:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #ffffff;
        }
        .link-modal-primary {
          border: 1px solid #03B8B8;
          background: #03B8B8;
          color: #001314;
          box-shadow: 0 10px 24px rgba(3, 184, 184, 0.24);
        }
        .link-modal-primary:hover {
          background: #38FFF2;
          border-color: #38FFF2;
        }

        .tiptap-mention-popover {
          position: absolute;
          z-index: 9999;
          width: 360px;
          max-height: 280px;
          overflow-y: auto;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 14px;
          background: #080C14;
          box-shadow: 0 22px 60px rgba(0, 0, 0, 0.6);
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
          padding: 0.75rem;
          text-align: left;
          cursor: pointer;
        }
        .mention-option:hover,
        .mention-option.is-selected {
          background: rgba(255, 255, 255, 0.05);
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
          font-size: 0.85rem;
          font-weight: 800;
        }
        .mention-meta {
          display: flex;
          min-width: 0;
          flex-direction: column;
        }
        .mention-meta strong {
          color: #f4f4f5;
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
