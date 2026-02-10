import he from "he";
import DOMPurify from "dompurify";

export function cleanHtmlContent(html) {
	return DOMPurify.sanitize(he.decode(html || ""));
}
