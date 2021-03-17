import React from "react";

import "./index.scss";

import Grid from "@material-ui/core/Grid";

export const ThumbnailContainer = React.memo(({ children }) => (
  <Grid container spacing={3} style={{ marginTop: "10px" }}>
    {children}
  </Grid>
));
