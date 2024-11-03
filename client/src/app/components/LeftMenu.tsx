import { Box, List, ListItem, ListItemText } from "@mui/material";
import Link from "next/link";

type MenuItem = {
  key: string;
  text: string;
  href: string;
};

const menu: MenuItem[] = [
  { key: "dashboard", text: "Dash Board", href: "/" },
  { key: "search", text: "Search Score", href: "/search" },
  { key: "report", text: "Report", href: "/report" },
  { key: "settings", text: "Settings", href: "/settings" },
];

export default function LeftMenu() {
  return (
    <Box className="bg-neutral-600 flex flex-col w-64">
      <List>
        <ListItem>
          <ListItemText
            className=" text-white text-center"
            sx={{ fontSize: "1.5rem" }}
          >
            Menu
          </ListItemText>
        </ListItem>
        {menu.map((item) => (
          <ListItem
            key={item.key}
            component={Link}
            href={item.href}
            className=" text-white pl-5 hover:bg-neutral-800"
            sx={{
              fontFamily: "Rubik",
            }}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
