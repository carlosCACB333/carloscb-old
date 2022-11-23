import { ArrowBackIos } from '@mui/icons-material';
import { Avatar, Box, Button, Card, CardContent, Container, Typography, useTheme } from '@mui/material';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
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
}
const BlogDetailPage: NextPage<Props> = ({ posts, categories, post }) => {
  const { palette } = useTheme();
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
              <Link href="/blog">
                <Button startIcon={<ArrowBackIos />} variant="outlined" aria-label="Volver al blog">
                  volver
                </Button>
              </Link>
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

  return {
    props: {
      ...i18n,
      posts: data.posts,
      categories: data.categories,
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
