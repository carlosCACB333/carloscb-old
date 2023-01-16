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
import { env } from "../config/env";
import { useContext, useEffect } from "react";
import { LayoutContext } from "../context";
import { ProfileAside } from "../components/common";
import { serializeStrMdx } from "../utils/mdx";

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
  const { setLayouts } = useContext(LayoutContext);

  useEffect(() => {
    setLayouts(<ProfileAside />);
  }, [setLayouts]);

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

  const { source } = await serializeStrMdx(author?.bio || "");

  return {
    props: {
      ...i18n,
      categories,
      projects,
      certifications,
      author: { ...author, bio: source },
    },
    revalidate: 3600,
  }; // 1 hour
};
