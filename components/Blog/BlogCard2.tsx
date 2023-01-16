import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
  useTheme,
} from "@mui/material";
import { FC } from "react";
import { Post } from "../../graphql/generated/graphql";
import { SkillGroup } from "../category";
import { Link, HygraphImg } from "../common";

interface Props {
  post: Post;
}

export const BlogCard2: FC<Props> = ({ post }) => {
  const { palette } = useTheme();
  return (
    <Card sx={{ height: "100%" }} variant="outlined" data-aos="zoom-in">
      <Box sx={{ aspectRatio: "5/4" }}>
        <HygraphImg
          src={post.banner?.url || ""}
          alt={post.title}
          fit="crop"
          aspRatio={5 / 4}
          sizes="(max-width: 600px) 100vw, (max-width: 960px) 30vw, (max-width: 1200px) 20vw, 15vw"
          style={{
            borderStartEndRadius: "4px",
            height: "100%",
            width: "100%",
          }}
        />
      </Box>
      <CardContent>
        <SkillGroup skills={post.tags} />
        <Typography variant="caption">
          {new Date(post.updatedAt).toLocaleDateString("es-PE", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </Typography>

        <div>
          <Link href={"/blog/" + post.slug} variant="h6">
            {post.title}
          </Link>
        </div>

        <Typography variant="body2" className="truncate-3" mt={1}>
          {post.summary}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: 2,
            gap: 1,
          }}
        >
          <Avatar
            sx={{ backgroundColor: palette.secondary.main }}
            src={post.createdBy?.picture || ""}
            alt={post.createdBy?.name}
          />
          <Typography variant="body2">{post.createdBy?.name}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
