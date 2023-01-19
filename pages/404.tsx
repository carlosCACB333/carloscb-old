import { Box, Typography } from "@mui/material";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Icon } from "../components/icons";

export default function NontFoundPage() {
  const { t } = useTranslation("common");
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Icon
        name="notfound"
        sx={{
          fontSize: 100,
          color: "text.disabled",
          marginBottom: 2,
        }}
      />
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography variant="h1">404</Typography>
        <Box
          sx={{
            borderLeft: "3px solid",
            paddingLeft: 1,
          }}
        >
          <Typography variant="h2">{t("404.title")}</Typography>
          <Typography>{t("404.description")}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const i18n = await serverSideTranslations(locale || "es", ["common"]);

  return {
    props: {
      ...i18n,
    },
  };
};
