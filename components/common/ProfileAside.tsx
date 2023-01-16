import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { Divider, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useContext } from "react";

import {
  Code,
  ContactPhone,
  Facebook,
  Favorite,
  FolderSpecial,
  GitHub,
  Home,
  LinkedIn,
  WhatsApp,
  WorkspacePremium,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { AuthorContext } from "../../context";
import { Link } from ".";
import { Icon } from "../icons";
import { useHighlight } from "../../hooks";

interface Props {}

export const ProfileAside = ({}: Props) => {
  const { t } = useTranslation("common");
  const routes = [
    { name: t("side.home"), Icon: Home, id: "" },
    { name: t("side.about"), Icon: Favorite, id: "about-section" },
    { name: t("side.skills"), Icon: Code, id: "skills-section" },
    { name: t("side.projects"), Icon: FolderSpecial, id: "projects-section" },
    {
      name: t("side.certifications"),
      Icon: VerifiedUserIcon,
      id: "certifications-section",
    },
    { name: t("side.contact"), Icon: ContactPhone, id: "contact-section" },
  ];
  const { asPath } = useRouter();
  const { author } = useContext(AuthorContext);
  const active = useHighlight("#main-content", ["section"]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <Box>
        <Link
          href="/"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
          aria-label="home"
        >
          <Icon
            name="logo"
            color="primary"
            sx={{
              fontSize: "4em",
            }}
          />
        </Link>
        <br />
        <br />
        <List>
          {routes.map((route, idx) => (
            <ListItem key={route.name + idx}>
              <Link
                variant="subtitle1"
                sx={{
                  py: 1,
                  display: "flex",
                  alignItems: "center",
                  fontWeight: active === route.id ? "bold" : "auto",
                  color: active === route?.id ? "primary.main" : "text.primary",
                }}
                href={route.id ? `/#${route.id}` : "/"}
              >
                <ListItemIcon>{<route.Icon />}</ListItemIcon>
                {route.name}
              </Link>
            </ListItem>
          ))}
        </List>
        <br />
        <Divider />
        <br />
        <List>
          <ListItem>
            <Link
              variant="subtitle1"
              sx={{
                py: 1,
                display: "flex",
                alignItems: "center",
                fontWeight: asPath === "/certification" ? "bold" : "auto",
                color:
                  asPath === "/certification" ? "primary.main" : "text.primary",
              }}
              href="/certification"
            >
              <ListItemIcon>{<WorkspacePremium />}</ListItemIcon>
              {t("side.all-certifications")}
            </Link>
          </ListItem>
          <ListItem>
            <Link
              variant="subtitle1"
              sx={{
                py: 1,
                display: "flex",
                alignItems: "center",
                fontWeight: asPath.startsWith("/project") ? "bold" : "auto",
                color: asPath.startsWith("/project")
                  ? "primary.main"
                  : "text.primary",
              }}
              href="/project"
            >
              <ListItemIcon>{<FolderSpecial />}</ListItemIcon>
              {t("side.all-projects")}
            </Link>
          </ListItem>
        </List>
      </Box>
      {author && (
        <Box
          sx={{
            display: "flex",
            alignSelf: "center",
          }}
        >
          <Link href={author.facebook || ""} target="_blank">
            <IconButton aria-label="facebook">
              <Facebook color="secondary" />
            </IconButton>
          </Link>
          <Link href={`https://wa.me/51${author.phone}`} target="_blank">
            <IconButton aria-label="whatsapp">
              <WhatsApp color="secondary" />
            </IconButton>
          </Link>
          <Link href={author.linkedin || ""} target="_blank">
            <IconButton aria-label="linkedin">
              <LinkedIn color="secondary" />
            </IconButton>
          </Link>
          <Link href={author.github || ""} target="_blank">
            <IconButton aria-label="github">
              <GitHub color="secondary" />
            </IconButton>
          </Link>
        </Box>
      )}
    </Box>
  );
};
