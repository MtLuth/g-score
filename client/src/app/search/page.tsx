"use client";
import React, { useEffect, useState } from "react";
import GScoresCard from "../components/GScoresCard";
import { GScroreForm } from "../components/GScoreFormGroup";

type ExamResult = {
  sbd: string;
  toan: number | null;
  ngu_van: number | null;
  ngoai_ngu: number | null;
  vat_li: number | null;
  hoa_hoc: number | null;
  sinh_hoc: number | null;
  lich_su: number | null;
  dia_li: number | null;
  gdcd: number | null;
  ma_ngoai_ngu: string;
};

export default function ReportPage() {
  const [detailed, setDetailed] = useState<
    { label: string; value: number | null }[]
  >([]);
  const [sbd, setSbd] = useState("");

  useEffect(() => {
    if (sbd) {
      fetch(
        `http://localhost:8081/api/v1/exam-results/search/${encodeURIComponent(
          sbd
        )}`
      )
        .then((response) => response.json())
        .then((result: { status: number; data: ExamResult }) => {
          if (result.status === 200) {
            const data = result.data;
            const results: { label: string; value: number | null }[] = [];

            if (data.toan !== null)
              results.push({ label: "Toán", value: data.toan });
            if (data.ngu_van !== null)
              results.push({ label: "Ngữ Văn", value: data.ngu_van });
            if (data.ngoai_ngu !== null)
              results.push({ label: "Ngoại Ngữ", value: data.ngoai_ngu });
            if (data.vat_li !== null)
              results.push({ label: "Vật Lý", value: data.vat_li });
            if (data.hoa_hoc !== null)
              results.push({ label: "Hóa Học", value: data.hoa_hoc });
            if (data.sinh_hoc !== null)
              results.push({ label: "Sinh Học", value: data.sinh_hoc });
            if (data.lich_su !== null)
              results.push({ label: "Lịch Sử", value: data.lich_su });
            if (data.dia_li !== null)
              results.push({ label: "Địa Lý", value: data.dia_li });
            if (data.gdcd !== null)
              results.push({ label: "GDCD", value: data.gdcd });

            setDetailed(results);
          } else {
            setDetailed([]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [sbd]);
  return (
    <div>
      <GScoresCard
        title="User Resgistration"
        content={<GScroreForm setDetailContent={setSbd} />}
      />

      <GScoresCard
        title="Detailed  Score"
        content={
          <div>
            {sbd === "" ? (
              <p>Vui lòng nhập số báo danh</p>
            ) : (
              <div>
                <p>Số báo danh: {sbd}</p>
                <ul>
                  {detailed.length > 0 ? (
                    detailed.map((item, index) => (
                      <li key={index}>
                        {item.label}: {item.value}
                      </li>
                    ))
                  ) : (
                    <li>Không có điểm nào.</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        }
      />
    </div>
  );
}
