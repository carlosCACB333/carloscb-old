import { Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React from 'react';
import { SectionLayout } from '../Layout';
import { Project } from '../../graphql/generated/graphql';
import Link from 'next/link';
import { ProjectCard } from '../project/ProjectCard';
import { ArrowRightAltOutlined } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

interface Props {
  projects: Project[];
}
export const ProjectSection = ({ projects }: Props) => {
  const { t } = useTranslation('home');
  return (
    <SectionLayout id="projects-section" widh="xl" title={t('title')} detail={t('description')}>
      <Grid container spacing={2}>
        {projects.map((project) => (
          <Grid key={project.id} xs={12} md={6}>
            <ProjectCard key={project.id} project={project} />
          </Grid>
        ))}
      </Grid>
      <Link
        href="/project"
        style={{
          textDecoration: 'none',
        }}
      >
        <Button
          sx={{
            marginTop: 2,
          }}
          variant="text"
          color="primary"
          endIcon={<ArrowRightAltOutlined />}
        >
          {t('projects.btn-show-All')}
        </Button>
      </Link>
    </SectionLayout>
  );
};
