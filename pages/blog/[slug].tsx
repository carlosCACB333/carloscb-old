import { ArrowBackIos } from '@mui/icons-material';
import { Avatar, Box, Button, Card, CardContent, Container, Divider, Typography, useTheme } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { BlogCard2 } from '../../components/Blog';
import { SkillGroup } from '../../components/category/SkillGroup';
import { Md, Meta } from '../../components/common';
import { BlogLayout } from '../../components/Layout';
import { HygraphImg } from '../../components/UI';
import { Category, GetBlogsDataDocument, GetPostsSlugDocument, Post, Stage } from '../../graphql';
import { client } from '../../utils/apolloClient';

interface Props {
  posts: Post[];
  post: Post;
  categories: Category[];
  similarPosts: Post[];
}
const BlogDetailPage: NextPage<Props> = ({ posts, categories, post, similarPosts }) => {
  const { palette } = useTheme();
  const { back } = useRouter();
  return (
    <>
      <Meta title={post.title} description={post.summary}>
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.summary} />
        <meta property="og:image" content={post.banner?.url || '/logo.svg'} />
      </Meta>

      <Box
        sx={{
          aspectRatio: '16/5',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            background: `linear-gradient(rgba(0, 0, 0, 0) 0%, ${palette.background.default} 90%)`,
            position: 'absolute',
            height: '100%',
            width: '100%',
            top: 0,
            zIndex: 10,
          }}
        >
          <Container
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'end',
              height: '100%',
            }}
          >
            <SkillGroup skills={post.tags} />
            <Typography variant="h1">{post.title}</Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {new Date(post.updatedAt).toLocaleDateString('es-PE', {
                weekday: 'long',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </Typography>
            <div>
              <br />
              <Button onClick={back} startIcon={<ArrowBackIos />} variant="text" aria-label="Volver al blog">
                volver
              </Button>
            </div>
          </Container>
        </Box>
        <HygraphImg src={post.banner?.url!} alt={post.title} fit="crop" aspRatio={16 / 5} />
      </Box>
      <BlogLayout categories={categories} posts={posts} tags={post.tags} isDetail>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            {post.summary}
          </Typography>
          <Md>{post.content}</Md>
          <br />
          <br />

          <Card>
            <CardContent
              sx={{ display: 'flex', gap: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
            >
              <Avatar src={post.createdBy?.picture!} alt={post.createdBy?.name} sx={{ height: 100, width: 100 }} />
              <Typography variant="h5" component="h2" gutterBottom>
                {post.createdBy?.name}
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <br />
        <br />
        <Divider />
        <br />
        <br />

        <Typography variant="h2" gutterBottom>
          Artículos relacionados ({similarPosts.length})
        </Typography>

        <Grid container spacing={1}>
          {similarPosts.map((post) => (
            <Grid xs={12} sm={6} md={3} lg={4} key={post.id}>
              <BlogCard2 post={post} />
            </Grid>
          ))}
        </Grid>
      </BlogLayout>
    </>
  );
};

export default BlogDetailPage;

export const getStaticProps: GetStaticProps = async ({ locale, params, preview }) => {
  const i18n = await serverSideTranslations(locale || 'es', ['common']);
  const { data } = await client.query({
    query: GetBlogsDataDocument,
    variables: {
      stage: preview ? Stage.Draft : Stage.Published,
    },
  });
  const post = data.posts.find((post) => post.slug === params?.slug) as Post;
  if (!post) {
    return {
      notFound: true,
    };
  }
  const tags = post.tags.map((tag) => tag.name);
  const similarPosts = data.posts.filter((p) => {
    const postTags = p.tags.map((tag) => tag.name);
    return postTags.some((tag) => tags.includes(tag)) && p.id !== post.id;
  }) as Post[];

  return {
    props: {
      ...i18n,
      posts: data.posts,
      categories: data.categories,
      similarPosts,
      post,
    },
    revalidate: 3600,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query({ query: GetPostsSlugDocument });
  const paths = data.posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: 'blocking' };
};
