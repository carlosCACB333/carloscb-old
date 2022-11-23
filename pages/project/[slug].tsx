import { ArrowBackIos, GitHub, LaptopWindows } from '@mui/icons-material';
import { Box, Button, Card, CardContent, Container, Typography } from '@mui/material';
import { GetStaticPaths, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { Md, Meta } from '../../components/common';
import { Icon } from '../../components/icons';
import { SectionLayout } from '../../components/Layout';
import { Carrousel } from '../../components/UI';
import { GetProjectDocument, GetProjectsSlugDocument, Project, Stage } from '../../graphql';
import { client } from '../../utils/apolloClient';

interface Props {
  project: Project;
}
const ProjectDetail = ({ project }: Props) => {
  return (
    <SectionLayout
      maxWidth="xl"
      title={project.title}
      sx={{
        paddingY: 0,
      }}
    >
      <Meta title={project.title} description={project.detail} />

      <br />
      <Card
        sx={{
          maxWidth: 600,
          margin: 'auto',
        }}
        data-aos="fade-up"
      >
        <CardContent>
          <Typography variant="h5" component="h2">
            {project.abstract}
          </Typography>
        </CardContent>
      </Card>
      <br />
      <Box
        sx={{
          position: 'relative',
        }}
      >
        <Carrousel images={project.pictures} sizes="(max-width: 600px) 100vw,70vw" />
      </Box>
      <br />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Link href="/project">
            <Button size="large" startIcon={<ArrowBackIos />} variant="outlined" aria-label="back">
              Volver
            </Button>
          </Link>
          {project.gitHub && (
            <Link href={project.gitHub} target="_blank">
              <Button size="large" startIcon={<GitHub />} arial-label="github">
                Ver código
              </Button>
            </Link>
          )}
          {project.webSide && (
            <Link href={project.webSide} target="_blank">
              <Button size="large" startIcon={<LaptopWindows />} aria-label="web">
                Ver en línea
              </Button>
            </Link>
          )}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'end', gap: 0.2, marginY: 1 }}>
          {project.skills.map((skill) => (
            <Icon key={skill.id} name={skill.icon as any} fontSize="medium" />
          ))}
        </Box>
      </Box>

      <Container>
        <Md>{project.detail}</Md>
      </Container>
    </SectionLayout>
  );
};

export default ProjectDetail;

export const getStaticPaths: GetStaticPaths = async (context) => {
  const { data } = await client.query({ query: GetProjectsSlugDocument });
  const paths = data.projects.map((pro) => ({ params: { slug: pro.slug } }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params, preview, locale }) => {
  const i18n = await serverSideTranslations(locale || 'es', ['common']);
  const slug = params?.slug as string;
  const { data } = await client.query({
    query: GetProjectDocument,
    variables: { slug, stage: preview ? Stage.Draft : Stage.Published },
  });
  const project = data.project;

  if (!project) return { redirect: { destination: '/project', permanent: false } };

  return {
    props: {
      project,
      ...i18n,
    },
    revalidate: 3600,
  };
};
