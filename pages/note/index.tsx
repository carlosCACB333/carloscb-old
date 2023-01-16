import { GetStaticProps, NextPage } from "next";
import { CardActionArea, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { getRoutes } from "../../utils/mdx";
import { Route } from "../../interfaces";
import { Meta, NoteAside, NoteLogo } from "../../components/common";
import { useContext, useEffect } from "react";
import { LayoutContext } from "../../context";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
interface Props {
  routes: Route[];
}
const NoteHome: NextPage<Props> = ({ routes }) => {
  const { setLayouts } = useContext(LayoutContext);

  useEffect(() => {
    setLayouts(<NoteLogo />);
  }, [setLayouts]);

  return (
    <>
      <Meta
        keywords={routes.map((r) => r.name).join(", ")}
        title="CodeNote"
        description="Apuntes de cursos y libros"
      />
      <Container>
        <br />
        <br />
        <Typography textAlign="center" variant="h1">
          Mis apuntes
        </Typography>
        <br />

        <Grid container spacing={2}>
          {routes?.map(({ name, slug }) => (
            <Grid xs={12} sm={6} md={4} lg={3} key={slug}>
              <CardActionArea
                href={`/note/${slug}`}
                className="gradient"
                sx={{
                  p: 4,
                  borderRadius: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Typography variant="h4">{name}</Typography>
              </CardActionArea>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default NoteHome;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const i18n = await serverSideTranslations(locale || "es", ["common"]);
  const routes = getRoutes("note", 0);
  return { props: { ...i18n, routes } };
};
