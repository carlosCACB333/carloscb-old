import { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { BlogPage } from '../../components/Blog';
import { Meta } from '../../components/common';
import { Category, GetBlogsDataDocument, Post, Skill, Stage } from '../../graphql';
import { client } from '../../utils/apolloClient';

interface Props {
  posts: Post[];
  categories: Category[];
  tags: Skill[];
}
const BlogPageMain: NextPage<Props> = ({ posts, categories, tags }) => {
  return (
    <>
      <Meta title="Blog" description="Los blog post de desarrollo de software más interesantes" />
      <BlogPage posts={posts} categories={categories} tags={tags} filteredPosts={posts} />
    </>
  );
};

export default BlogPageMain;

export const getStaticProps: GetStaticProps = async ({ locale, preview }) => {
  const i18n = await serverSideTranslations(locale || 'es', ['common']);
  const { data } = await client.query({
    query: GetBlogsDataDocument,
    variables: {
      stage: preview ? Stage.Draft : Stage.Published,
    },
  });

  return {
    props: {
      ...i18n,
      posts: data.posts,
      categories: data.categories,
      tags: data.skills,
    },
    revalidate: 3600,
  };
};
