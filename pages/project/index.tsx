import { GetStaticProps } from 'next';
import React, { useCallback, useEffect, useState } from 'react';
import { client } from '../../utils/apolloClient';
import { GetProjectsDocument, Project } from '../../graphql/generated/graphql';
import { SectionLayout } from '../../components/Layout';
import { ProjectCard } from '../../components/project/ProjectCard';
import Grid from '@mui/material/Unstable_Grid2';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { ProgressBar } from '../../components/UI';
import { useObserver } from '../../hooks/useObserver';

interface Props {
  projects: Project[];
}

const FIRST = 4;

const ProjectsPage = ({ projects: p }: Props) => {
  const [projects, setProjects] = useState(p);
  const skipRef = React.useRef(FIRST);
  const { t } = useTranslation('project');

  const loadMore = useCallback(async () => {
    const { data } = await client.query({
      query: GetProjectsDocument,
      variables: {
        first: FIRST,
        skip: skipRef.current,
      },
    });
    setProjects((prev) => [...prev, ...(data.projects as Project[])]);

    if (data.projects.length < FIRST) {
      return false;
    }
    skipRef.current += FIRST;
    return true;
  }, []);

  const { moreRef } = useObserver(loadMore);

  return (
    <SectionLayout maxWidth="xl" title={t('title')} detail={t('description')}>
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

      <div ref={moreRef}>
        <ProgressBar />
      </div>
    </SectionLayout>
  );
};

export default ProjectsPage;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const i18n = await serverSideTranslations(locale || 'es', ['common', 'project']);
  const { data } = await client.query({
    query: GetProjectsDocument,
    variables: {
      first: FIRST,
      skip: 0,
    },
  });

  return {
    props: {
      ...i18n,
      projects: data.projects,
    },
    revalidate: 3600,
  };
};
