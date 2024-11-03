import { Card, CardContent, CardHeader } from "@mui/material";
import React, { ReactNode } from "react";

type CardProps = {
  title: string;
  content: ReactNode;
};

const GScoresCard: React.FC<CardProps> = ({ title, content }) => {
  return (
    <Card
      variant="outlined"
      className="shadow-md "
      sx={{ m: 5, minHeight: "8rem", borderRadius: "0.7rem" }}
    >
      <CardHeader
        title={title}
        titleTypographyProps={{
          fontWeight: 700,
        }}
        sx={{ paddingBottom: 0, fontWeight: 800 }}
      ></CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  );
};

export default GScoresCard;
