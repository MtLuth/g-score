"use client";
import { useEffect, useState } from "react";
import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import GScoresCard from "../components/GScoresCard";
import { API_URL } from "../utils/apiUrl";

interface SubjectResults {
  Gioi: number;
  Kha: number;
  TrungBinh: number;
  Yeu: number;
}

interface ResultsReport {
  [subject: string]: SubjectResults;
}

export default function ReportPage() {
  const [results, setResults] = useState<ResultsReport | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch(`${API_URL}/exam-results/report`);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setResults(data.results);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch data");
      }
    };

    fetchResults();
  }, []);

  const subjectRow: { [key: string]: string } = {
    toan: "Toán",
    ngu_van: "Ngữ Văn",
    ngoai_ngu: "Ngoại Ngữ",
    vat_li: "Vật Lý",
    hoa_hoc: "Hóa Học",
    sinh_hoc: "Sinh Học",
    lich_su: "Lịch Sử",
    dia_li: "Địa Lý",
    gdcd: "GDCD",
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!results) {
    return (
      <div className="flex justify-center items-center h-full">
        <CircularProgress />;
      </div>
    );
  }

  return (
    <>
      <GScoresCard
        title="Thống kê theo môn học"
        content={
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#1976d2" }}>
                  <TableCell className="text-white font-semibold">
                    Môn Học
                  </TableCell>
                  <TableCell className="text-white font-semibold">
                    Từ 8 trở lên
                  </TableCell>
                  <TableCell className="text-white font-semibold">
                    Từ 6 đến thấp hơn 8
                  </TableCell>
                  <TableCell className="text-white font-semibold">
                    Từ 4 đến thấp hơn 6
                  </TableCell>
                  <TableCell className="text-white font-semibold">
                    Thấp hơn 4
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(results).map((subjectKey) => {
                  const subjectResults = results[subjectKey];
                  return (
                    <TableRow
                      key={subjectKey}
                      style={{ backgroundColor: "#f9f9f9" }}
                    >
                      <TableCell>
                        {subjectRow[subjectKey]
                          ? subjectRow[subjectKey]
                          : subjectKey.replace(/_/g, " ").toUpperCase()}
                      </TableCell>
                      <TableCell>{subjectResults.Gioi} học sinh</TableCell>
                      <TableCell>{subjectResults.Kha} học sinh</TableCell>
                      <TableCell>{subjectResults.TrungBinh} học sinh</TableCell>
                      <TableCell>{subjectResults.Yeu} học sinh</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        }
      />
    </>
  );
}
