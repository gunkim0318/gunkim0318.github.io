import React from "react";

import "./index.scss";

import Grid from "@material-ui/core/Grid";

export const ThumbnailContainer = React.memo(({ children }) => (
  // <div className="thumbnail-container">{children}</div>
  <Grid container spacing={3}>
    {children}
  </Grid>
));
