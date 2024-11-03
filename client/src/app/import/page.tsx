"use client";
import {
  Box,
  Button,
  Typography,
  LinearProgress,
  Snackbar,
} from "@mui/material";
import GScoresCard from "../components/GScoresCard";
import { useState } from "react";

export default function ImportFileCard() {
  const [fileName, setFileName] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false); // State for Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Message for Snackbar
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  ); // Severity for Snackbar

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
      setSnackbarMessage("Please select a file first.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true);
    setUploadProgress(0); // Reset progress to 0 before upload

    // Fetch request to upload file
    const response = await fetch("http://localhost:8080/api/v1/exam-results", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      console.log(response.json());
      setSnackbarMessage("File uploaded successfully!");
      setSnackbarSeverity("success");
    } else {
      console.log(response.json());
      setSnackbarMessage("Error uploading file.");
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
