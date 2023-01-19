import fs from "fs";
import path from "path";
import { serialize } from "next-mdx-remote/serialize";
import { NoteMeta, Route, Toc } from "../interfaces";
import rehypeSlug from "rehype-slug";
import matter from "gray-matter";
import rehypePrism from "rehype-prism-plus";
import { visit } from "unist-util-visit";
import remarkGfm from "remark-gfm";
import { slug } from "./slug";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkUnwrapImages from "remark-unwrap-images";

const root = process.cwd() + "/content/";

export const getRoutes = (dirName: string, deeph = 1): Route[] => {
  return fs
    .readdirSync(path.join(root, dirName), {
      withFileTypes: true,
    })
    .map((item) => {
      if (item.isDirectory()) {
        if (deeph === 0) {
          return {
            slug: slug(item.name),
            name: item.name,
            path: `${dirName}/${item.name}`,
          };
        }
        return {
          slug: slug(item.name),
          name: item.name,
          path: `${dirName}/${item.name}`,
          children: getRoutes(`${dirName}/${item.name}`, deeph - 1),
        };
      }
      const { data } = matter(
        fs.readFileSync(path.join(root, dirName, item.name), "utf8")
      );

      return {
        slug: slug(data.title),
        name: data.title,
        path: `${dirName}/${item.name}`,
        meta: {
          ...(data as NoteMeta),
        },
      };
    });
};

export const serializeFileMdx = async (url: string) => {
  const source = fs.readFileSync(path.join(root, url), "utf8");
  return await serializeStrMdx(source);
};
export const serializeStrMdx = async (source: string) => {
  const toc: Toc[] = [
    {
      title: "Inicio",
      url: "#",
      children: [],
    },
  ];

  const { data, content } = matter(source);
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [
        remarkMath, // add math
        remarkUnwrapImages,
      ],
      rehypePlugins: [
        rehypeKatex, // add math
        remarkGfm, // add tables
        rehypeSlug, // add id to headings
        () => (tree) => {
          // get headings for table of contents
          visit(tree, "element", (node) => {
            if (node.tagName === "h2") {
              toc.push({
                url: `#${node.properties.id}`,
                title: node.children[0].value || null,
                children: [],
              });
            }

            if (node.tagName === "h3") {
              toc[toc.length - 1].children.push({
                url: `#${node.properties.id}`,
                title: node.children[0].value || null,
              });
            }
          });
          return;
        },
        rehypePrism, // add syntax highlighting to code blocks
      ],
    },
  });

  return {
    source: mdxSource,
    toc,
    meta: {
      ...data,
      wordCount: content.split(/\s+/gu).length,
    },
  };
};
