import React from "react";
import { Link } from "gatsby";
import { TARGET_CLASS } from "../../utils/visible";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import "./index.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export const ThumbnailItem = ({ node }) => {
  const classes = useStyles();
  return (
    <Grid xs={12} lg={6}>
      <Link
        className={`thumbnail ${TARGET_CLASS}`}
        to={node.fields.slug.substr(17)}
      >
        <Grid key={node.fields.slug} container spacing={3}>
          <Grid item xs={12} md={5} lg={6}>
            <img src={node.frontmatter.image} />
          </Grid>
          <Grid item xs={12} md={7} lg={6}>
            <h3>{node.frontmatter.title || node.fields.slug}</h3>
            <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
          </Grid>
        </Grid>
      </Link>
    </Grid>
  );
};
