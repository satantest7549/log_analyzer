import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Paper, Typography, Box } from "@mui/material";

const SummaryCard = ({ data }) => {
  if (!data) return null;

  return <MarkdownRenderer markdownContent={data} />;
};

const MarkdownRenderer = ({ markdownContent }) => {
  return (
    <Paper
      sx={{
        backgroundColor: "#f4f4f4",
        borderRadius: "8px",
        boxShadow: 3,
        margin: "50px auto",
        // margin: "auto",
        p: 2,
      }}
    >
      <Typography
        variant="h6"
        sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}
      >
        📊 AI Summary
      </Typography>
      <ReactMarkdown
        children={markdownContent}
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => (
            <Typography variant="body1" sx={{ mb: 1, textAlign: "left" }}>
              {children}
            </Typography>
          ),
          h1: ({ children }) => (
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
              {children}
            </Typography>
          ),
          h2: ({ children }) => (
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
              {children}
            </Typography>
          ),
          h3: ({ children }) => (
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1.5 }}>
              {children}
            </Typography>
          ),
          h4: ({ children }) => (
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", textAlign: "left", mb: 1 }}
            >
              {children}
            </Typography>
          ),
          h5: ({ children }) => (
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: "bold", textAlign: "left", mb: 1 }}
            >
              {children}
            </Typography>
          ),
          h6: ({ children }) => (
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", textAlign: "left", mb: 1 }}
            >
              {children}
            </Typography>
          ),
          ul: ({ children }) => (
            <Box component="ul" sx={{ pl: 3, textAlign: "left", mb: 2 }}>
              {children}
            </Box>
          ),
          li: ({ children }) => (
            <li>
              <Typography variant="body1" component="span">
                {children}
              </Typography>
            </li>
          ),
        }}
      />
    </Paper>
  );
};

export default SummaryCard;
