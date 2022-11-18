import { GitHub, LaptopWindows } from '@mui/icons-material';
import { Box, Button, Container, CardContent, Typography, Card, Alert, AlertTitle } from '@mui/material';
import { GetStaticPaths, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Icon } from '../../components/icons';
import { SectionLayout } from '../../components/Layout';
import { Carrousel } from '../../components/UI';
import { GetProjectsSlugDocument, GetProjectDocument, Project, Stage } from '../../graphql/generated/graphql';
import { client } from '../../utils/apolloClient';
import { Md, Meta } from '../../components/common';

interface Props {
  project: Project;
}
const ProjectDetail = ({ project }: Props) => {
  const { asPath, isPreview } = useRouter();

  return (
    <SectionLayout
      maxWidth="xl"
      title={project.title}
      sx={{
        paddingY: 0,
      }}
    >
      <Meta title={project.title} description={project.detail} />

      {isPreview && (
        <Alert
          severity="warning"
          variant="filled"
          sx={{
            position: 'fixed',
            bottom: 0,
            right: 0,
            zIndex: 100,
            marginBottom: 2,
          }}
        >
          <AlertTitle>Modo de previsualización</AlertTitle>
          Solo puedes ver esto porque estás en modo de previsualización.{' '}
          <Link href={`/api/prev/exit?url=${asPath}`}>
            <Button size="small" variant="text" aria-label="exit preview">
              Desabilitar
            </Button>
          </Link>
        </Alert>
      )}

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
