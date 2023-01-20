import sl from "slug";
// remove first number from slug
export const slug = (string: string) =>
  sl(string.replace(".mdx", ""), { trim: true, remove: /^[0-9]+/ });
