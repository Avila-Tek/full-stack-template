export function capitalize(text: string) {
  if (!text) {
    return '';
  }
  return `${text[0].toUpperCase()}${text.slice(1)}`;
}
