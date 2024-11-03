/* eslint-disable @next/next/no-img-element */
import { AppBar, Typography } from "@mui/material";

export default function Header() {
  return (
    <header>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#262626",
        }}
        className="pl-5 pt-6 pb-6"
      >
        <div className="flex gap-3">
          <img
            className="w-10"
            src="https://goldenowl.asia/_next/static/media/golden_owl.881f6e7a.svg"
            alt="icon"
          />
          <Typography variant="h4" className="text-yellow-400">
            G-Score
          </Typography>
        </div>
      </AppBar>
    </header>
  );
}
