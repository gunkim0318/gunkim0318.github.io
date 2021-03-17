import React from "react";

import { Top } from "../components/top";
import { Header } from "../components/header";
import { ThemeSwitch } from "../components/theme-switch";
import { Footer } from "../components/footer";
import Grid from "@material-ui/core/Grid";

import "./index.scss";

export const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;

  return (
    <>
      <Top title={title} location={location} rootPath={rootPath} />
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        style={{
          paddingTop: "60px",
          paddingBottom: "30px",
        }}
      >
        <Grid xs={10} md={10} lg={7}>
          <ThemeSwitch />
          <Header title={title} location={location} rootPath={rootPath} />
          {children}
          <Footer />
        </Grid>
      </Grid>
    </>
  );
};
