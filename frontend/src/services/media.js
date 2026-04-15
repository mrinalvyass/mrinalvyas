const apiRoot = (
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5050/api"
).replace("/api", "");

export function resolveMediaUrl(url) {
  if (!url) {
    return "";
  }

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `${apiRoot}${url}`;
}
