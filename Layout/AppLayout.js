import React from "react";
import Head from "next/head";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";

export const AppLayout = ({ children, metadata }) => {
  const { push } = useRouter();

  return (
    <section>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar>
        <Toolbar variant="dense">
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            E ID
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={() => push("/register-employee")}
            >
              Register Employee{" "}
            </Button>

            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={() => push("/register-employer")}
            >
              Register Employer
            </Button>

            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={() => push("/search")}
            >
              Search
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ marginY: "70px", display: "flex" }}>
        <main>{children}</main>
      </Box>
    </section>
  );
};
