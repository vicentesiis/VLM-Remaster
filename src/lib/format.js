export function formatDate(date, opts = {}) {
  if (!date) return "";

  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: "UTC",
      month: opts.month ?? "long",
      day: opts.day ?? "numeric",
      year: opts.year ?? "numeric",
      ...opts,
    }).format(new Date(date));
  } catch (_err) {
    return "";
  }
}