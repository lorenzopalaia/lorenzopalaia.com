export default function formatLink(link: string) {
  return link
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .split("/")[0];
}
