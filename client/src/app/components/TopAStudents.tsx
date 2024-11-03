import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";

interface TopStudent {
  sbd: string;
  totalScore: number;
}

export default function TopStudents() {
  const [topStudents, setTopStudents] = useState<TopStudent[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/exam-results/top-10-A")
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          setTopStudents(result.data);
        } else {
          setTopStudents([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Top 10 Khối A</Typography>
        <ul>
          {topStudents.map((student, index) => (
            <li key={index}>
              {student.sbd}: {student.totalScore}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
