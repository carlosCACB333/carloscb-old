import sl from "slug";

export const slug = (string: string) =>
  sl(string.replace(".mdx", ""), { trim: true, remove: /[0-9]/g });
