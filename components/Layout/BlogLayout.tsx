import Grid from '@mui/material/Unstable_Grid2';
import { FC, PropsWithChildren } from 'react';
import { Category, Post, Skill } from '../../graphql/generated/graphql';
import { BlogCard, BlogRight } from '../Blog';
import { CategoryCard } from '../category';
import { SectionLayout } from './SectionLayout';

interface Props extends PropsWithChildren {
  posts: Post[];
  categories: Category[];
  tags: Skill[];
  isDetail?: boolean;
}

export const BlogLayout: FC<Props> = ({ posts, categories, tags, children, isDetail }) => {
  const categoriesSorted = [...categories].sort((a, b) => b.posts.length - a.posts.length);
  const blogPriority = [...posts].sort((a, b) => b.priority - a.priority).slice(0, 4);

  return (
    <>
      {!isDetail && (
        <>
          <SectionLayout maxWidth="lg">
            <Grid container spacing={2}>
              <Grid xs={12} md={6}>
                <BlogCard post={blogPriority.shift()!} />
              </Grid>
              <Grid container xs={12} md={6}>
                {blogPriority.map((post) => (
                  <Grid xs={12} md={6} key={post.id}>
                    <BlogCard post={post} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </SectionLayout>

          <SectionLayout maxWidth="lg" title="Categorías más publicadas">
            <br />
            <Grid container spacing={2}>
              {categoriesSorted.slice(0, 4).map((category) => (
                <Grid xs={12} sm={6} md={3} key={category.id}>
                  <CategoryCard category={category} />
                </Grid>
              ))}
            </Grid>
          </SectionLayout>
        </>
      )}

      <SectionLayout maxWidth="lg">
        <Grid container>
          <Grid xs={12} md={6} lg={8} sx={{ maxWidth: '100%' }}>
            {children}
          </Grid>
          <Grid xs={12} md={6} lg={4} sx={{ paddingLeft: [2, 4, 6, 8] }}>
            <BlogRight categories={categories} tags={tags} posts={posts} isDetail={isDetail} />
          </Grid>
        </Grid>
      </SectionLayout>
    </>
  );
};
