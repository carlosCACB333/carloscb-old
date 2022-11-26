import { ArrowRightAltOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useTranslation } from 'react-i18next';
import { Project } from '../../graphql/generated/graphql';
import { Link } from '../common';
import { SectionLayout } from '../Layout';
import { ProjectCard } from '../project/ProjectCard';

interface Props {
  projects: Project[];
}
export const ProjectSection = ({ projects }: Props) => {
  const { t } = useTranslation(['home', 'common']);

  return (
    <SectionLayout
      id="projects-section"
      component="section"
      maxWidth="xl"
      title={t('home:projects.title')}
      detail={t('home:projects.description')}
    >
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
          aria-label={t('common:btn.show-all')}
        >
          {t('common:btn.show-all')}
        </Button>
      </Link>
    </SectionLayout>
  );
};
