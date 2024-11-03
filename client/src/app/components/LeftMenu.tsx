import { Box, List, ListItem, ListItemText } from "@mui/material";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import { ImportExport } from "@mui/icons-material";

type MenuItem = {
  key: string;
  text: string;
  href: string;
  icon: React.ReactNode;
};

const menu: MenuItem[] = [
  { key: "home", text: "Home", href: "/", icon: <HomeIcon /> },
  {
    key: "search",
    text: "Search Score",
    href: "/search",
    icon: <SearchIcon />,
  },
  { key: "report", text: "Report", href: "/report", icon: <AssessmentIcon /> },
  {
    key: "settings",
    text: "Settings",
    href: "/settings",
    icon: <SettingsIcon />,
  },
  {
    key: "import",
    text: "Import",
    href: "/import",
    icon: <ImportExport />,
  },
];

export default function LeftMenu() {
  return (
    <Box className="bg-neutral-600 flex flex-col w-64">
      <List>
        <ListItem>
          <ListItemText
            className="text-white text-center"
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
            className="text-white pl-5 hover:bg-neutral-800"
            sx={{
              fontFamily: "Rubik",
            }}
          >
            {item.icon}
            <ListItemText primary={item.text} sx={{ marginLeft: 1 }} />{" "}
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
