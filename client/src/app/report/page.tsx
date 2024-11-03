import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import GScoresCard from "../components/GScoresCard";

interface SubjectResults {
  Gioi: number;
  Kha: number;
  TrungBinh: number;
  Yeu: number;
}

interface ResultsReport {
  [subject: string]: SubjectResults;
}

export default async function ReportPage() {
  const res = await fetch("http://localhost:8080/api/v1/exam-results/report");
  const data = await res.json();

  const results: ResultsReport = data.results;

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
