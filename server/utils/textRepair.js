const RIGHT_SINGLE_QUOTE = "\u2019";
const LEFT_DOUBLE_QUOTE = "\u201C";
const RIGHT_DOUBLE_QUOTE = "\u201D";
const EM_DASH = "\u2014";

const repairBrokenPunctuation = (value = "") =>
  String(value)
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

const repairBlogHtml = (html = "") =>
  String(html)
    .split(/(<[^>]*>)/g)
    .map((part) => (part.startsWith("<") ? part : repairBrokenPunctuation(part)))
    .join("");

module.exports = {
  repairBrokenPunctuation,
  repairBlogHtml,
};