"use client";
import React, { useEffect, useState } from "react";
import GScoresCard from "./components/GScoresCard";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

interface Student {
  sbd: string;
  totalScore: number;
  toan: number;
  vat_li: number | null;
  hoa_hoc: number | null;
}

export default function Home() {
  const [topStudents, setTopStudents] = useState<Student[]>([]);

  useEffect(() => {
    const fetchTopStudents = async () => {
      try {
        const res = await fetch(
          "http://localhost:8081/api/v1/exam-results/top-10-A"
        );
        const data = await res.json();
        if (data && data.status === 200) {
          setTopStudents(data.results); // Extract results if status is 200
        }
      } catch (error) {
        console.error("Failed to fetch top students:", error);
      }
    };

    fetchTopStudents();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <GScoresCard
        title="Top 10 Khối A"
        content={
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#1976d2" }}>
                  <TableCell className="text-white font-semibold">
                    Số Báo Danh
                  </TableCell>
                  <TableCell className="text-white font-semibold">
                    Tổng Điểm
                  </TableCell>
                  <TableCell className="text-white font-semibold">
                    Điểm Toán
                  </TableCell>
                  <TableCell className="text-white font-semibold">
                    Điểm Vật Lý
                  </TableCell>
                  <TableCell className="text-white font-semibold">
                    Điểm Hóa Học
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {topStudents.map((student) => (
                  <TableRow key={student.sbd}>
                    <TableCell>{student.sbd}</TableCell>
                    <TableCell>{student.totalScore}</TableCell>
                    <TableCell>{student.toan}</TableCell>
                    <TableCell>
                      {student.vat_li !== null ? student.vat_li : ""}
                    </TableCell>
                    <TableCell>
                      {student.hoa_hoc !== null ? student.hoa_hoc : ""}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        }
      />
    </div>
  );
}
