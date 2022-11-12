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
import { Loader } from '../../components/UI';

interface Props {
  projects: Project[];
}

const FIRST = 4;
const SKIP = 0;

const ProjectsPage = ({ projects: p }: Props) => {
  const [projects, setProjects] = useState(p);
  const skipRef = React.useRef(SKIP + FIRST);
  const moreRef = React.useRef<HTMLDivElement>(null);
  const { t } = useTranslation('project');

  const loadMore = useCallback(async () => {
    const { data } = await client.query({
      query: GetProjectsDocument,
      variables: {
        first: FIRST,
        skip: skipRef.current,
      },
    });

    if (data.projects.length === 0) {
      moreRef.current?.remove();
    }

    setProjects((prev) => [...prev, ...(data.projects as Project[])]);
    skipRef.current += FIRST;
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: '0px 0px 100px 0px' }
    );
    observer.observe(moreRef.current!);
    return () => observer.disconnect();
  }, [loadMore]);

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
        <Grid ref={moreRef} xs={12} md={6}>
          <Loader />
        </Grid>
      </Grid>

      {/* <div ref={moreRef}>
        <LoaderGrid />
      </div> */}
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
      skip: SKIP,
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
