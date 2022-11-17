import { GetStaticProps, NextPage } from 'next';
import {
  AboutSection,
  SkillSection,
  ContactSection,
  ProjectSection,
  HomeSection,
  CertificationSection,
} from '../components/sections';
import { Category, GetHomeDataDocument, Project, Certification } from '../graphql/generated/graphql';
import { client } from '../utils/apolloClient';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useContext } from 'react';
import { AuthorContext } from '../context';

interface Props {
  categories: Category[];
  projects: Project[];
  certifications: Certification[];
}
const HomePage: NextPage<Props> = ({ categories, projects, certifications }) => {
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
      <CertificationSection certifications={certifications} />
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
  const certifications = data.certifications;

  return { props: { ...i18n, categories, projects, certifications }, revalidate: 3600 }; // 1 hour
};
