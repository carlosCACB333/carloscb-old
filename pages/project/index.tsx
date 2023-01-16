import Grid from "@mui/material/Unstable_Grid2";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Meta, ProfileAside, ProgressBar } from "../../components/common";
import { SectionLayout } from "../../components/layouts";
import { ProjectCard } from "../../components/project/ProjectCard";
import { LayoutContext } from "../../context";
import { GetProjectsDocument, Project, Stage } from "../../graphql";
import { useObserver } from "../../hooks/useObserver";
import { client } from "../../utils/apolloClient";

interface Props {
  projects: Project[];
}

const FIRST = 4;

const ProjectsPage = ({ projects: p }: Props) => {
  const [projects, setProjects] = useState(p);
  const skipRef = React.useRef(FIRST);
  const { t } = useTranslation("project");
  const { isPreview } = useRouter();

  const loadMore = useCallback(async () => {
    const { data } = await client.query({
      query: GetProjectsDocument,
      variables: {
        first: FIRST,
        skip: skipRef.current,
        stage: isPreview ? Stage.Draft : Stage.Published,
      },
    });
    setProjects((prev) => [...prev, ...(data.projects as Project[])]);

    if (data.projects.length < FIRST) {
      return false;
    }
    skipRef.current += FIRST;
    return true;
  }, [isPreview]);

  const { moreRef } = useObserver(loadMore);
  const { setLayouts } = useContext(LayoutContext);

  useEffect(() => {
    setLayouts(<ProfileAside />);
  }, [setLayouts]);

  return (
    <>
      <SectionLayout maxWidth="xl" title={t("title")} detail={t("description")}>
        <Meta title={t("title")} description={t("description")} />

        <Grid container spacing={2}>
          {projects.map((project) => (
            <Grid key={project.id} xs={12} md={6}>
              <ProjectCard key={project.id} project={project} />
            </Grid>
          ))}
        </Grid>

        <div ref={moreRef}>
          <ProgressBar />
        </div>
      </SectionLayout>
    </>
  );
};

export default ProjectsPage;

export const getStaticProps: GetStaticProps = async ({ locale, preview }) => {
  const i18n = await serverSideTranslations(locale || "es", [
    "common",
    "project",
  ]);
  const { data } = await client.query({
    query: GetProjectsDocument,
    variables: {
      first: FIRST,
      skip: 0,
      stage: preview ? Stage.Draft : Stage.Published,
    },
  });

  return {
    props: {
      ...i18n,
      projects: data.projects,
    },
    revalidate: 3600,
  };
};
