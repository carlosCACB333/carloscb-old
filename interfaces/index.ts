export * from "./contact";
export * from "./icons";
export * from "./note";

import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { Note } from "./note";

export type MDX = MDXRemoteSerializeResult<
  Record<string, unknown>,
  Record<string, string>
>;

export interface Toc {
  title: string;
  url: string;
  children: { title: string; url: string }[];
}

export interface Route {
  slug: string;
  name: string;
  meta?: Note;
  children?: Route[];
}
