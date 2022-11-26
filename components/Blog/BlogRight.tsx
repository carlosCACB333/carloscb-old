import { Avatar, Chip, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { Category, Post, Skill } from '../../graphql/generated/graphql';
import { Link } from '../common';
import { Searcher } from './Searcher';

interface Props {
  categories: Category[];
  tags: Skill[];
  posts: Post[];
  isDetail?: boolean;
}
export const BlogRight: FC<Props> = ({ categories, tags, posts, isDetail }) => {
  const { asPath } = useRouter();

  return (
    <>
      {!isDetail && <Searcher />}
      <br />
      <br />
      <div>
        <Typography variant="h5" component="h2" data-aos="fade-up">
          Categorías
        </Typography>

        <List dense>
          <CategoryItem name="Todos" url="/blog" active={asPath === '/blog'} />
          {categories.map(({ name, id, slug }) => (
            <CategoryItem
              key={id}
              name={name}
              url={'/blog/category/' + slug}
              active={asPath === '/blog/category/' + slug}
            />
          ))}
        </List>
      </div>
      <br />
      <div>
        <Typography variant="h5" component="h2" data-aos="fade-up">
          Posts recientes
        </Typography>
        <List>
          {posts.slice(0, 5).map((post) => (
            <ListItem key={post.id} sx={{ marginBottom: 1 }} data-aos="fade-up">
              <ListItemAvatar>
                <Avatar
                  sx={{
                    width: 90,
                    height: 90,
                    marginRight: 1,
                  }}
                  variant="rounded"
                  src={post.banner?.url || ''}
                  alt={post.title}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Link href={'/blog/' + post.slug} scroll={false} variant="subtitle1">
                    {post.title}
                  </Link>
                }
                secondary={
                  <Typography className="truncate-2" variant="body2">
                    {post.summary}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </div>
      <br />
      <div>
        <Typography variant="h5" component="h2" data-aos="fade-up">
          Etiquetas
        </Typography>
        <br />
        {tags.map((tag) => (
          <Chip
            key={tag.id}
            color="secondary"
            label={tag.name}
            sx={{ marginRight: 0.5, marginBottom: 0.5 }}
            data-aos="zoom-in"
          />
        ))}
      </div>
    </>
  );
};

interface CategoryItemProps {
  active: boolean;
  name: string;
  url: string;
}

const CategoryItem = ({ active, name, url }: CategoryItemProps) => {
  return (
    <ListItem data-aos="fade-up">
      <ListItemText
        primary={
          <Link variant="button" href={url} scroll={false} sx={{ color: active ? 'primary.main' : 'text.primary' }}>
            {name}
          </Link>
        }
        sx={{
          position: 'relative',
          marginLeft: 3,
          ':before': {
            content: "''",
            display: 'inline-block',
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: active ? 'primary.main' : 'text.primary',
            position: 'absolute',
            top: '50%',
            botton: '50%',
            transform: 'translateY(-50%)',
            left: -20,
          },
        }}
      />
    </ListItem>
  );
};
