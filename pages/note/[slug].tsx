import { Container, Typography } from "@mui/material";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { Meta, NoteAside } from "../../components/common";
import { LayoutContext } from "../../context";
import { Route } from "../../interfaces";
import { getRoutes } from "../../utils/mdx";

interface Props {
  routes: Route[];
}

const NotePage: NextPage<Props> = ({ routes }) => {
  const { query } = useRouter();
  const slug = (query?.slug as string)?.replaceAll("-", " ");
  const { setLayouts } = useContext(LayoutContext);

  useEffect(() => {
    setLayouts(<NoteAside routes={routes} />);
  }, [setLayouts, routes]);

  return (
    <>
      <Meta
        keywords={routes.map((r) => r.name).join(", ")}
        title={slug}
        description={slug}
      />
      <Container maxWidth="md">
        <br />
        <br />
        <Typography variant="h2" align="center">
          {slug}
        </Typography>
        <br />
        <Typography variant="h5" align="center" color="text.disabled">
          En la parte izquierda se encuentran los artículos relacionados con
          este tema. Seleccione para ver su contenido
        </Typography>
      </Container>
    </>
  );
};

export default NotePage;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getRoutes("note", 0).map((route) => ({
    params: { slug: route.slug },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  try {
    const i18n = await serverSideTranslations(locale || "es", ["common"]);
    let routes = getRoutes("note", 2);

    routes = routes.find((r) => r.slug === params?.slug)?.children || [];
    routes = routes.map((r) => ({
      ...r,
      slug: "/note/" + params?.slug + "/" + r.slug,
    }));

    return {
      props: {
        ...i18n,
        routes,
      },
    };
  } catch (error) {
    console.log(error);

    return { redirect: { destination: "/note", permanent: false } };
  }
};
