export function removeEspecialChars(text: string) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
