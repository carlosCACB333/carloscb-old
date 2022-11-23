import { ArrowRight, GitHub } from '@mui/icons-material';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import { Box, Button, Card, CardActions, CardContent, IconButton, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { Project } from '../../graphql/generated/graphql';
import { SkillGroup } from '../category';
import { Carrousel } from '../UI';

interface Props {
  project: Project;
}

export const ProjectCard = ({ project }: Props) => {
  const { t } = useTranslation('common');
  return (
    <Card
      sx={{
        height: '100%',
        ':hover': {
          transform: 'scale(1.02)',
          transition: 'all 0.3s ease-in-out',
        },
      }}
      data-aos="zoom-in"
    >
      <CardContent>
        <Box sx={{ position: 'relative' }}>
          <SkillGroup skills={project.skills} />
          <div style={{ height: 4 }}></div>
          <Carrousel images={project.pictures} />

          <Typography gutterBottom variant="h2" component="div">
            {project.title}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {project.abstract}
          </Typography>
        </Box>
      </CardContent>

      <CardActions
        sx={{
          justifyContent: 'end',
        }}
      >
        {project.gitHub && (
          <Link href={project.gitHub} target="_blank">
            <IconButton aria-label="github">
              <GitHub />
            </IconButton>
          </Link>
        )}
        {project.webSide && (
          <Link href={project.webSide} target="_blank">
            <IconButton aria-label="webSide">
              <LaptopMacIcon />
            </IconButton>
          </Link>
        )}

        <Link
          href={`/project/${project.slug}`}
          style={{
            textDecoration: 'none',
          }}
        >
          <Button size="small" variant="text" endIcon={<ArrowRight />} aria-label="read more">
            {t('btn.show-more')}
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};
