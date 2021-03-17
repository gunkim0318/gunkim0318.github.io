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
    <Link
      className={`thumbnail ${TARGET_CLASS}`}
      to={node.fields.slug.substr(17)}
    >
      <div key={node.fields.slug}>
        <Grid container spacing={3}>
          <Grid item md={4} xs={12}>
            <img src={node.frontmatter.image} />
          </Grid>
          <Grid item md={8} xs={12}>
            <h3>{node.frontmatter.title || node.fields.slug}</h3>
            <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
          </Grid>
        </Grid>
      </div>
    </Link>
  );
};
