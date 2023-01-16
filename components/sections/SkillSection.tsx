import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useTranslation } from "next-i18next";
import { Category, Skill } from "../../graphql/generated/graphql";
import { Icon } from "../icons";
import { SectionLayout } from "../layouts";

export const SkillSection = ({ categories }: { categories: Category[] }) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
  const { t } = useTranslation("home");

  return (
    <SectionLayout
      id="skills-section"
      component="section"
      maxWidth="md"
      title={t("skills.title")}
      detail={t("skills.description")}
    >
      <Grid container spacing={2}>
        {categories.map((category) => (
          <Grid item key={category.id} xs={12} md={12} data-aos="fade-up">
            <Accordion
              expanded={expanded === category.id}
              onChange={handleChange(category.id)}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <Icon
                    name={category.icon as any}
                    sx={{
                      fontSize: "3rem",
                    }}
                  />
                  <Box>
                    <Typography variant="h4" component="h2">
                      {category.name}
                    </Typography>
                    <Typography variant="body1"> {category.detail}</Typography>
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Timeline onResize={undefined} onResizeCapture={undefined}>
                  {category.skills.map((skill, idx) => (
                    <Skill
                      key={skill.id}
                      skill={skill}
                      isFirst={idx === 0}
                      isEnd={idx === category.skills.length - 1}
                    />
                  ))}
                </Timeline>
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </Grid>
    </SectionLayout>
  );
};

interface SkillProps {
  skill: Skill;
  isFirst: boolean;
  isEnd: boolean;
}
const Skill = ({ skill, isFirst, isEnd }: SkillProps) => {
  return (
    <TimelineItem key={skill.id}>
      <TimelineOppositeContent
        sx={{ m: "auto 0", flex: "initial" }}
        align="right"
        variant="body2"
        color="text.secondary"
      >
        {/* {++idx} */}
      </TimelineOppositeContent>
      <TimelineSeparator>
        {!isFirst && <TimelineConnector />}
        <TimelineDot color="primary">
          <Icon name={skill.icon as any} />
        </TimelineDot>
        {!isEnd && <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent sx={{ py: "12px", px: 2 }}>
        <Typography variant="h5" component="h3">
          {skill.name}
        </Typography>
        <Typography variant="body2">{skill.detail} </Typography>
      </TimelineContent>
    </TimelineItem>
  );
};
