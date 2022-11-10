import { GetStaticProps } from 'next';
import React from 'react';
import { client } from '../../utils/apolloClient';
import { GetProjectsDocument, Project } from '../../graphql/generated/graphql';
import { SectionLayout } from '../../components/Layout';
import { ProjectCard } from '../../components/project/ProjectCard';
import Grid from '@mui/material/Unstable_Grid2';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

interface Props {
  projects: Project[];
}

const ProjectsPage = ({ projects }: Props) => {
  const { t } = useTranslation('project');
  return (
    <SectionLayout widh="xl" title={t('title')} detail={t('description')}>
      <Head>
        <title>{t('title')}</title>
      </Head>
      <Grid container spacing={2}>
        {projects.map((project) => (
          <Grid key={project.id} xs={12} md={6}>
            <ProjectCard key={project.id} project={project} />
          </Grid>
        ))}
      </Grid>
    </SectionLayout>
  );
};

export default ProjectsPage;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const i18n = await serverSideTranslations(locale || 'es');
  const { data } = await client.query({
    query: GetProjectsDocument,
  });

  return {
    props: {
      ...i18n,
      projects: data.projects,
    },
  };
};
