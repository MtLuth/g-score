/* eslint-disable @next/next/no-page-custom-font */
"use client";
import Head from "next/head";
import Header from "./components/Header";
import "@/app/_styles/global.css";
import LeftMenu from "./components/LeftMenu";
import { createTheme, ThemeProvider } from "@mui/material";
import Footer from "./components/Footer";

const theme = createTheme({
  typography: {
    fontFamily: "Rubik, Arial, sans-serif",
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <Head>
        <title>G-Score</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <ThemeProvider theme={theme}>
          <div className="grid-template-original">
            <Header />
            <div className="grid-body-template">
              <LeftMenu />
              {children}
            </div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
