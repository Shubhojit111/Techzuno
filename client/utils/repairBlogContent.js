const RIGHT_SINGLE_QUOTE = "\u2019";
const LEFT_DOUBLE_QUOTE = "\u201C";
const RIGHT_DOUBLE_QUOTE = "\u201D";
const EM_DASH = "\u2014";

export function repairBrokenPunctuation(value = "") {
  return String(value)
    .replace(/’|‘/g, RIGHT_SINGLE_QUOTE)
    .replace(/“/g, LEFT_DOUBLE_QUOTE)
    .replace(/”/g, RIGHT_DOUBLE_QUOTE)
    .replace(/—|–/g, EM_DASH)
    .replace(/•/g, "\u2022")
    .replace(/←/g, "\u2190")
    .replace(/([A-Za-z])\?\?\?([A-Za-z])/g, `$1${RIGHT_SINGLE_QUOTE}$2`)
    .replace(/\s\?\?\?\s/g, ` ${EM_DASH} `)
    .replace(/([A-Za-z0-9])\?\?\?\?/g, `$1?${RIGHT_DOUBLE_QUOTE}`)
    .replace(/([,.;:!?])\?\?\?/g, `$1${RIGHT_DOUBLE_QUOTE}`)
    .replace(/(^|[\s([{>])\?\?\?(?=[A-Za-z0-9])/g, `$1${LEFT_DOUBLE_QUOTE}`)
    .replace(/\?\?\?/g, RIGHT_SINGLE_QUOTE);
}

export function repairBlogHtml(html = "") {
  if (!html) return "";

  // 1. Repair punctuation inside non-tag text parts
  let processed = String(html)
    .split(/(<[^>]*>)/g)
    .map((part) => (part.startsWith("<") ? part : repairBrokenPunctuation(part)))
    .join("");

  // 2. Transform legacy white-theme callouts and light backgrounds to dark glassmorphism cards
  processed = processed
    // Green / Emerald light background boxes (#d4edda, #e6f4ea, #f0fdf4, #d1fae5, #c6f6d5, etc.)
    .replace(
      /style="[^"]*(?:#d4edda|#e6f4ea|#f0fdf4|#d1fae5|#c6f6d5|212,\s*237,\s*218|230,\s*244,\s*234)[^"]*"/gi,
      'style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(6, 78, 59, 0.25)); border: 1px solid rgba(52, 211, 153, 0.35); border-left: 4px solid #10b981; border-radius: 12px; padding: 1.5rem; color: #f0fdf4; margin: 1.8rem 0;"'
    )
    // Blue / Cyan light background boxes (#e6f7ff, #e3f2fd, #f0f9ff, #e0f2fe, #cff4fc, etc.)
    .replace(
      /style="[^"]*(?:#e6f7ff|#e3f2fd|#f0f9ff|#e0f2fe|#cff4fc|230,\s*247,\s*255|227,\s*242,\s*253)[^"]*"/gi,
      'style="background: linear-gradient(135deg, rgba(3, 184, 184, 0.12), rgba(15, 23, 42, 0.6)); border: 1px solid rgba(56, 255, 242, 0.3); border-left: 4px solid #38fff2; border-radius: 12px; padding: 1.5rem; color: #f8fafc; margin: 1.8rem 0;"'
    )
    // Yellow / Amber warning boxes (#fff3cd, #fef3c7, #fef9c3, etc.)
    .replace(
      /style="[^"]*(?:#fff3cd|#fef3c7|#fef9c3|255,\s*243,\s*205)[^"]*"/gi,
      'style="background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(120, 53, 15, 0.25)); border: 1px solid rgba(245, 158, 11, 0.35); border-left: 4px solid #f59e0b; border-radius: 12px; padding: 1.5rem; color: #fffbeb; margin: 1.8rem 0;"'
    )
    // Generic light / white inline background colors (#ffffff, #fff, #f8f9fa, #f1f5f9, #f3f4f6, #e5e7eb, etc.)
    .replace(
      /style="[^"]*(?:background(?:-color)?:\s*(?:#fff(?:fff)?|#f8f9fa|#f1f5f9|#f3f4f6|#e5e7eb|#ffffff|rgb\(\s*255\s*,\s*255\s*,\s*255\s*\)))[^"]*"/gi,
      'style="background: linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(3, 184, 184, 0.04)); border: 1px solid rgba(56, 255, 242, 0.2); border-radius: 12px; padding: 1.5rem; color: rgba(255, 255, 255, 0.9); margin: 1.8rem 0;"'
    )
    // Dark inline text colors (#000, #000000, #111, #222, #333, #155724, #0c5460, #856404, black, rgb(0,0,0))
    .replace(
      /color:\s*(?:#[0-4][0-9a-f]{5}|#[0-4][0-9a-f]{2}\b|black|rgb\(\s*(?:[0-9]|[1-7][0-9]|80)\s*,\s*(?:[0-9]|[1-7][0-9]|80)\s*,\s*(?:[0-9]|[1-7][0-9]|80)\s*\))/gi,
      'color: rgba(255, 255, 255, 0.9)'
    );

  return processed;
}