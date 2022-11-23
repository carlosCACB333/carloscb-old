import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { BlogPage } from '../../../components/Blog';
import { Meta } from '../../../components/common';
import { Category, GetBlogsByCategoryDocument, GetCategoriesSlugDocument, Post, Skill, Stage } from '../../../graphql';
import { client } from '../../../utils/apolloClient';

interface Props {
  posts: Post[];
  filteredPosts: Post[];
  categories: Category[];
  tags: Skill[];
}
const PostByCategory: NextPage<Props> = ({ posts, categories, tags, filteredPosts }) => {
  return (
    <>
      <Meta
        title="Blog | categorías"
        description={`Los blog post de desarrollo de software más interesantes agrupados por las distintas categorías`}
      />
      <BlogPage posts={posts} categories={categories} tags={tags} filteredPosts={filteredPosts} />
    </>
  );
};

export default PostByCategory;

export const getStaticProps: GetStaticProps = async ({ locale, params, preview }) => {
  const i18n = await serverSideTranslations(locale || 'es', ['common']);
  const { data } = await client.query({
    query: GetBlogsByCategoryDocument,
    variables: { category: params?.slug as string, stage: preview ? Stage.Draft : Stage.Published },
  });

  return {
    props: {
      ...i18n,
      posts: data.posts,
      filteredPosts: data.filteredPosts,
      categories: data.categories,
      tags: data.skills,
    },
    revalidate: 3600,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query({ query: GetCategoriesSlugDocument });
  const paths = data.categories.map((category) => ({ params: { slug: category.slug } }));
  return { paths, fallback: 'blocking' };
};
