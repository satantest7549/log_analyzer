import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Container,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useSelector } from "react-redux";

const ErrorCardPage = ({ setDrawerOpen }) => {
  const { cstt, analyze } = useSelector((state) => state);

  const error = cstt.error || analyze.error;

  // Parse code and message safely
  const code = typeof error === "object" && error?.code ? error.code : 500;

  const message =
    typeof error === "string" ? error : error?.message || "Somthing Went wrong";

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          sx={{
            p: 4,
            borderRadius: 4,
            boxShadow: 6,
            textAlign: "center",
            width: "100%",
          }}
        >
          <CardContent>
            <ErrorOutlineIcon color="error" sx={{ fontSize: 64, mb: 2 }} />
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Error {code}
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
              {message}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setDrawerOpen(true)}
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default ErrorCardPage;
