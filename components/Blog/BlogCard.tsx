import { Avatar, Box, Card, CardContent, Typography, useTheme } from '@mui/material';
import Link from 'next/link';
import { FC } from 'react';
import { Post } from '../../graphql/generated/graphql';
import { SkillGroup } from '../category';
import { HygraphImg } from '../UI';

interface Props {
  post: Post;
}

export const BlogCard: FC<Props> = ({ post }) => {
  const { palette } = useTheme();
  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        width: '100%',
        position: 'relative',
      }}
      data-aos="zoom-in"
    >
      <Box sx={{ position: 'relative', aspectRatio: '16/9' }}>
        <Box
          sx={{
            background: `linear-gradient(rgba(0, 0, 0, 0) 0%, ${palette.background.paper} 90%)`,
            position: 'absolute',
            height: '100%',
            width: '100%',
            top: 0,
            zIndex: 10,
          }}
        />

        <HygraphImg
          src={post.banner?.url || ''}
          alt={post.title}
          fit="clip"
          aspRatio={16 / 9}
          sizes="(max-width: 600px) 100vw, (max-width: 960px) 30vw, (max-width: 1200px) 20vw, 15vw"
          style={{
            borderRadius: 8,
            height: '100%',
            width: '100%',
          }}
        />
      </Box>
      <CardContent sx={{ position: 'relative', marginTop: -10, zIndex: 10 }}>
        <SkillGroup skills={post.tags} />
        <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
          {new Date(post.updatedAt).toLocaleDateString('es-PE', {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </Typography>
        <Link href={'/blog/' + post.slug}>
          <Typography
            variant="h2"
            sx={{
              ':hover': {
                cursor: 'pointer',
                textDecoration: 'underline',
              },
            }}
          >
            {post.title}
          </Typography>
        </Link>
        <Typography variant="body2">{post.summary}</Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginTop: 2,
            gap: 1,
          }}
        >
          <Avatar
            sx={{ backgroundColor: palette.secondary.main }}
            src={post.createdBy?.picture || ''}
            alt={post.createdBy?.name}
          />
          <Typography variant="body2">{post.createdBy?.name}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
