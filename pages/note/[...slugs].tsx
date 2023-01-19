import { Container, Typography } from "@mui/material";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { MDXRemote } from "next-mdx-remote";
import React, { useContext, useEffect } from "react";
import { Blockquote, Meta, NoteAside } from "../../components/common";
import { LayoutContext } from "../../context";
import { MDX, NoteMeta, Route, Toc } from "../../interfaces";
import { serializeFileMdx } from "../../utils";
import { getRoutes } from "../../utils/mdx";
import { ContentMenu } from "../../components/common/ContentMenu";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { MDXComponents } from "../../components/MD";

interface Props {
  meta: NoteMeta;
  source: MDX;
  toc: Toc[];
  routes: Route[];
}

const CoursePage: NextPage<Props> = ({ meta, source, toc, routes }) => {
  const { setLayouts } = useContext(LayoutContext);

  useEffect(() => {
    setLayouts(<NoteAside routes={routes} />, <ContentMenu toc={toc} />);
  }, [setLayouts, routes, toc]);

  return (
    <>
      <Meta
        keywords={meta.tags?.join(", ")}
        title={meta.title}
        description={meta.description}
      />
      <Container maxWidth="md" sx={{ mb: "20rem" }}>
        <br />
        <br />
        <Typography variant="h1" id="">
          {meta.title}
        </Typography>
        <br />
        <Blockquote>{meta.description}</Blockquote>

        <MDXRemote {...source} components={MDXComponents} />
      </Container>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: { params: { slugs: string[] } }[] = [];
  getRoutes("note", 2).forEach((route) => {
    route.children?.forEach((child) => {
      child.children?.forEach((child2) => {
        paths.push({
          params: {
            slugs: [route.slug, child.slug, child2.slug],
          },
        });
      });
    });
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  try {
    const i18n = await serverSideTranslations(locale || "es", ["common"]);
    const slugs = params?.slugs as string[];
    if (slugs?.length !== 3) return { notFound: true };

    const [slug1, slug2, slug3] = slugs;

    const path = getRoutes("note", 2)
      .find((r) => r.slug === slug1)
      ?.children?.find((r) => r.slug === slug2)
      ?.children?.find((r) => r.slug === slug3)?.path;

    if (!path) return { notFound: true };
    const { meta, source, toc } = await serializeFileMdx(path);

    // routes

    let routes = getRoutes("note", 2);
    routes = routes.find((r) => r.slug === slug1)?.children || [];
    routes = routes.map((r) => ({
      ...r,
      slug: "/note/" + slug1 + "/" + r.slug,
    }));

    return {
      props: {
        ...i18n,
        source,
        meta,
        toc,
        routes,
      },
    };
  } catch (error) {
    console.log(error);
    return { notFound: true };
  }
};

export default CoursePage;
