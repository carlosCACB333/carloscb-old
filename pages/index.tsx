import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Meta } from "../components/common";
import {
  AboutSection,
  CertificationSection,
  ContactSection,
  HomeSection,
  ProjectSection,
  SkillSection,
} from "../components/sections";
import {
  Author,
  Category,
  Certification,
  GetHomeDataDocument,
  Locale,
  Project,
  Stage,
} from "../graphql";
import { client } from "../utils/apolloClient";
import { env } from "../utils/env";

interface Props {
  categories: Category[];
  projects: Project[];
  certifications: Certification[];
  author: Author;
}
const HomePage: NextPage<Props> = ({
  categories,
  projects,
  certifications,
  author,
}) => {
  return (
    <>
      <Meta author={author} />
      <HomeSection author={author} />
      <AboutSection author={author} />
      <SkillSection categories={categories} />
      <ProjectSection projects={projects} />
      <CertificationSection certifications={certifications} />
      <ContactSection />
    </>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async ({
  locale = "es",
  preview,
}) => {
  const i18n = await serverSideTranslations(locale || "es", ["common", "home"]);
  const { data } = await client.query({
    query: GetHomeDataDocument,
    variables: {
      locales: [locale as Locale],
      email: env.author,
      stage: preview ? Stage.Draft : Stage.Published,
    },
  });
  const categories = data.categories;
  const projects = data.projects;
  const certifications = data.certifications;
  const author = data.author;

  return {
    props: { ...i18n, categories, projects, certifications, author },
    revalidate: 3600,
  }; // 1 hour
};
