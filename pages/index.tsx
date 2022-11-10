import { GetStaticProps, NextPage } from 'next';
import { AboutSection, SkillSection, ContactSection, ProjectSection, HomeSection } from '../components/sections';
import { Category, GetHomeDataDocument, Project } from '../graphql/generated/graphql';
import { client } from '../utils/apolloClient';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useContext } from 'react';
import { AuthorContext } from '../context';

interface Props {
  categories: Category[];
  projects: Project[];
}
const HomePage: NextPage<Props> = ({ categories, projects }) => {
  const { author } = useContext(AuthorContext);

  return (
    <>
      <Head>
        <title>{`${author.firstName} ${author.lastName}`}</title>
      </Head>
      <HomeSection />
      <AboutSection />
      <SkillSection categories={categories} />
      <ProjectSection projects={projects} />
      <ContactSection />
    </>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const i18n = await serverSideTranslations(locale || 'es', ['common', 'home']);
  const { data } = await client.query({ query: GetHomeDataDocument });
  const categories = data.categories;
  const projects = data.projects;

  return { props: { ...i18n, categories, projects }, revalidate: 3600 }; // 1 hour
};
