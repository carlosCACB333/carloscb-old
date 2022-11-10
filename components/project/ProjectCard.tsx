import { ArrowRight, GitHub } from '@mui/icons-material';
import { Card, CardContent, Box, Typography, CardActions, IconButton, Button } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { Project } from '../../graphql/generated/graphql';
import { Icon } from '../icons';
import { Carrousel } from '../UI';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import { useTranslation } from 'next-i18next';

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
    >
      <CardContent>
        <Box sx={{ position: 'relative' }}>
          <Box sx={{ display: 'flex', justifyContent: 'end', gap: 0.2, marginBottom: 1 }}>
            {project.skills.map((skill) => (
              <Icon key={skill.id} name={skill.icon as any} />
            ))}
          </Box>

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
            <IconButton>
              <GitHub />
            </IconButton>
          </Link>
        )}
        {project.webSide && (
          <Link href={project.webSide} target="_blank">
            <IconButton>
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
          <Button size="small" variant="text" endIcon={<ArrowRight />}>
            {t('btn.show-more')}
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};
