import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";
import { FC } from "react";
import { Category } from "../../graphql/generated/graphql";
import { Link, HygraphImg } from "../common";

interface Props {
  category: Category;
}
export const CategoryCard: FC<Props> = ({ category }) => {
  const { palette } = useTheme();
  return (
    <Card
      sx={{
        height: "100%",
        width: "100%",
      }}
      data-aos="zoom-in"
    >
      <Box sx={{ position: "relative", height: 200 }}>
        <HygraphImg
          src={category.img?.url || ""}
          alt={category.name}
          fit="crop"
          aspRatio={1}
          sizes="(max-width: 600px) 90vw, (max-width: 960px) 25vw, (max-width: 1200px) 20vw, 15vw"
        />
        <Box
          sx={{
            background: `linear-gradient(rgba(0, 0, 0, 0) 0%, ${palette.background.paper} 80%)`,
            position: "absolute",
            height: "100%",
            width: "100%",
            top: 0,
          }}
        ></Box>
      </Box>

      <CardContent
        sx={{
          marginTop: "-20%",
          height: "100%",
          zIndex: 10,
          position: "relative",
          textAlign: "center",
        }}
      >
        <Link
          href={`/blog/category/${category.slug}`}
          scroll={false}
          variant="h5"
        >
          {category.name}
        </Link>
        <Typography variant="body2">
          {category.posts.length + ` `}
          post{category.posts.length > 1 ? "s" : ""}
        </Typography>
      </CardContent>
    </Card>
  );
};
