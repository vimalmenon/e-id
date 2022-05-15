import React from "react";
import Head from "next/head";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { blue } from "@mui/material/colors";

export const AppLayout = ({ children, metadata }) => {
  const { push } = useRouter();

  return (
    <Box
      component={"section"}
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <AppBar>
        <Toolbar variant="dense">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flex: 1,
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", flex: "0 0 auto" }}>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  fontWeight: 700,
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                E ID
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flex: "0 0 auto" }}>
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
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ marginTop: "70px", display: "flex" }}>{children}</Box>
      <Box
        sx={{
          display: "flex",
          fontSize: "10px",
          background: blue[500],
          paddingY: 1,
          paddingX: 2,
          color: "white",
          marginY: 1,
          justifyContent: "end",
        }}
      >
        <footer>All right reserved @ 2022</footer>
      </Box>
    </Box>
  );
};
