import { ArrowBackIos, GitHub, LaptopWindows } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import { GetStaticPaths, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { MDXRemote } from "next-mdx-remote";
import { useContext, useEffect } from "react";
import { SkillGroup } from "../../components/category";
import {
  Link,
  MDXComponents,
  Meta,
  Carrousel,
  ProfileAside,
} from "../../components/common";
import { SectionLayout } from "../../components/layouts";
import { LayoutContext } from "../../context";
import {
  GetProjectDocument,
  GetProjectsSlugDocument,
  Project,
  Stage,
} from "../../graphql";
import { serializeStrMdx } from "../../utils";
import { client } from "../../utils/apolloClient";

interface Props {
  project: Project;
}
const ProjectDetail = ({ project }: Props) => {
  const { setLayouts } = useContext(LayoutContext);

  useEffect(() => {
    setLayouts(<ProfileAside />);
  }, [setLayouts]);
  return (
    <>
      <SectionLayout
        maxWidth="xl"
        title={project.title}
        sx={{
          paddingY: 0,
        }}
      >
        <Meta title={project.title} description={project.detail}>
          <meta property="og:title" content={project.title} />
          <meta property="og:description" content={project.detail} />
          <meta
            property="og:image"
            content={project.pictures[0]?.url || "/logo.svg"}
          />
        </Meta>

        <br />
        <Card
          sx={{
            maxWidth: 600,
            margin: "auto",
          }}
          data-aos="fade-up"
        >
          <CardContent>
            <Typography sx={{ fontWeight: 400, fontStyle: "italic" }}>
              {project.abstract}
            </Typography>
          </CardContent>
        </Card>
        <br />
        <Box
          sx={{
            position: "relative",
          }}
        >
          <Carrousel
            images={project.pictures}
            sizes="(max-width: 600px) 100vw,70vw"
          />
        </Box>
        <br />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
            <Link href="/project">
              <Button
                size="large"
                startIcon={<ArrowBackIos />}
                variant="outlined"
                aria-label="back"
              >
                Volver
              </Button>
            </Link>
            {project.gitHub && (
              <Link href={project.gitHub} target="_blank">
                <Button
                  size="large"
                  startIcon={<GitHub />}
                  arial-label="github"
                >
                  Ver código
                </Button>
              </Link>
            )}
            {project.webSide && (
              <Link href={project.webSide} target="_blank">
                <Button
                  size="large"
                  startIcon={<LaptopWindows />}
                  aria-label="web"
                >
                  Ver en línea
                </Button>
              </Link>
            )}
          </Box>

          <SkillGroup skills={project.skills} />
        </Box>

        <Container>
          <MDXRemote {...(project.detail as any)} components={MDXComponents} />
        </Container>
      </SectionLayout>
    </>
  );
};

export default ProjectDetail;

export const getStaticPaths: GetStaticPaths = async (context) => {
  const { data } = await client.query({ query: GetProjectsSlugDocument });
  const paths = data.projects.map((pro) => ({ params: { slug: pro.slug } }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({
  params,
  preview,
  locale,
}) => {
  const i18n = await serverSideTranslations(locale || "es", ["common"]);
  const slug = params?.slug as string;
  const { data } = await client.query({
    query: GetProjectDocument,
    variables: { slug, stage: preview ? Stage.Draft : Stage.Published },
  });
  const project = data.project;

  if (!project)
    return { redirect: { destination: "/project", permanent: false } };

  const { source } = await serializeStrMdx(project.detail);

  return {
    props: {
      project: { ...project, detail: source },
      ...i18n,
    },
    revalidate: 3600,
  };
};
