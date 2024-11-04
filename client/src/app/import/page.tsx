"use client";
import {
  Box,
  Button,
  LinearProgress,
  Snackbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import GScoresCard from "../components/GScoresCard";
import { API_URL } from "../utils/apiUrl";

type ResponseData = {
  status: number;
  message: string;
};

export default function ImportFileCard() {
  const [fileName, setFileName] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleUpload = async () => {
    const fileInput = document.getElementById(
      "file-upload"
    ) as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (!file) {
      setSnackbarMessage("File đang để trống!");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true);
    setUploadProgress(0);

    const response = await fetch(`${API_URL}/exam-results`, {
      method: "POST",
      body: formData,
    });

    const data: ResponseData = await response.json();

    if (response.ok) {
      setSnackbarMessage(data.message);
      setSnackbarSeverity("success");
    } else {
      setSnackbarMessage(`Error: ${data.message}`);
      setSnackbarSeverity("error");
    }

    setIsUploading(false);
    setFileName("");
    fileInput.value = "";
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <GScoresCard
        title="Import File"
        content={
          <div className="flex justify-between flex-col gap-10">
            <Box display="flex" flexDirection="column" alignItems="center">
              <Typography variant="body1" gutterBottom>
                Choose a CSV file to import:
              </Typography>
              <input
                type="file"
                onChange={handleFileImport}
                style={{ display: "none" }}
                id="file-upload"
                accept=".csv"
              />
              <label htmlFor="file-upload">
                <Button
                  variant="outlined"
                  component="span"
                  sx={{ mt: 1 }}
                  color="primary"
                >
                  Upload File
                </Button>
              </label>
              <Typography>{fileName}</Typography>
              {isUploading && (
                <LinearProgress variant="determinate" value={uploadProgress} />
              )}
            </Box>
            <Box display="flex" justifyContent="end">
              <Button
                variant="contained"
                onClick={handleUpload}
                disabled={isUploading}
              >
                Nhập dữ liệu
              </Button>
            </Box>
          </div>
        }
      />

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        security={snackbarSeverity}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        action={
          <Button color="inherit" onClick={handleSnackbarClose}>
            Close
          </Button>
        }
      />
    </div>
  );
}
