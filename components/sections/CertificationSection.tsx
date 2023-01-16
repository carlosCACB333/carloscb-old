import { ArrowRightAltOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useTranslation } from "next-i18next";
import { Certification } from "../../graphql/generated/graphql";
import { CertificationCard } from "../certification/CertificationCard";
import { Link } from "../common";
import { SectionLayout } from "../layouts";

interface Props {
  certifications: Certification[];
}
export const CertificationSection = ({ certifications }: Props) => {
  const { t } = useTranslation(["home", "common"]);

  return (
    <SectionLayout
      id="certifications-section"
      component="section"
      maxWidth="xl"
      title={t("home:certifications.title")}
      detail={t("home:certifications.description")}
    >
      <Grid container spacing={1}>
        {certifications.map((cert, idx) => (
          <Grid
            key={cert.id}
            xs={12}
            md={6}
            lg={4}
            sx={{ aspectRatio: "5/4" }}
            data-aos="zoom-in"
          >
            <CertificationCard certification={cert} idx={idx} />
          </Grid>
        ))}
      </Grid>
      <Link
        href="/certification"
        style={{
          textDecoration: "none",
        }}
      >
        <Button
          sx={{
            marginTop: 2,
          }}
          variant="text"
          color="primary"
          endIcon={<ArrowRightAltOutlined />}
          aria-label={t("common:btn.show-all")}
        >
          {t("common:btn.show-all")}
        </Button>
      </Link>
    </SectionLayout>
  );
};
