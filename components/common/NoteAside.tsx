import {
  IconButton,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  List,
} from "@mui/material";
import Box from "@mui/material/Box";
import { Facebook, GitHub, LinkedIn, WhatsApp } from "@mui/icons-material";
import { Li, Link, NoteLogo } from ".";
import { Route } from "../../interfaces";
import { useRouter } from "next/router";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface Props {
  routes: Route[];
}

export const NoteAside = ({ routes }: Props) => {
  const { asPath } = useRouter();
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
        <NoteLogo />
        {routes.map((route) => (
          <Accordion key={route.slug}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon color="disabled" />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="subtitle1">{route.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List
                sx={{
                  margin: 0,
                  padding: 0,
                  ml: 2,
                }}
              >
                {route.children?.map((child) => (
                  <Li
                    key={child.slug}
                    name={child.name}
                    url={`${route.slug}/${child.slug}`}
                    active={asPath.startsWith(`${route.slug}/${child.slug}`)}
                  />
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          alignSelf: "center",
        }}
      >
        <Link href={""} target="_blank">
          <IconButton aria-label="facebook">
            <Facebook color="secondary" />
          </IconButton>
        </Link>
        <Link href={``} target="_blank">
          <IconButton aria-label="whatsapp">
            <WhatsApp color="secondary" />
          </IconButton>
        </Link>
        <Link href={""} target="_blank">
          <IconButton aria-label="linkedin">
            <LinkedIn color="secondary" />
          </IconButton>
        </Link>
        <Link href={""} target="_blank">
          <IconButton aria-label="github">
            <GitHub color="secondary" />
          </IconButton>
        </Link>
      </Box>
    </Box>
  );
};
