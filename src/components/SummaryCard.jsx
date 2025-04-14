// import React from "react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import { Paper, Typography, Box, Stack, Grid } from "@mui/material";

// const SummaryCard = ({ data }) => {
//   if (!data) return null;

//   return <MarkdownRenderer markdownContent={data} />;
// };

// const MarkdownRenderer = ({ markdownContent }) => {
//   return (
//     <Paper
//       sx={{
//         padding: "16px",
//         backgroundColor: "#f4f4f4",
//         borderRadius: "8px",
//         boxShadow: 3,
//         maxWidth: "600px",
//         margin: "20px auto",
//       }}
//     >
//       <Typography
//         variant="h6"
//         sx={{ marginBottom: "16px", fontWeight: "bold", textAlign: "center" }}
//       >
//         AI Summary
//       </Typography>
//       <ReactMarkdown
//         children={markdownContent}
//         remarkPlugins={[remarkGfm]} // Enable GitHub Flavored Markdown for better support
//         components={{
//           p: ({ children }) => (
//             <Typography
//               variant="body1"
//               sx={{ marginBottom: "8px", textAlign: "left" }}
//             >
//               {children}
//             </Typography>
//           ),
//           h1: ({ children }) => (
//             <Typography
//               variant="h4"
//               sx={{
//                 fontWeight: "bold",
//                 marginBottom: "16px",
//                 textAlign: "left",
//               }}
//             >
//               {children}
//             </Typography>
//           ),
//           h2: ({ children }) => (
//             <Typography
//               variant="h5"
//               sx={{
//                 fontWeight: "bold",
//                 marginBottom: "12px",
//                 textAlign: "left",
//               }}
//             >
//               {children}
//             </Typography>
//           ),
//           h3: ({ children }) => (
//             <Typography
//               variant="h6"
//               sx={{
//                 fontWeight: "bold",
//                 marginBottom: "8px",
//                 textAlign: "left",
//               }}
//             >
//               {children}
//             </Typography>
//           ),
//           ul: ({ children }) => (
//             <Box sx={{ paddingLeft: "20px", textAlign: "left" }}>
//               <ul>{children}</ul>
//             </Box>
//           ),
//           li: ({ children }) => (
//             <Typography
//               variant="body1"
//               sx={{ marginBottom: "4px", textAlign: "left" }}
//             >
//               {children}
//             </Typography>
//           ),
//         }}
//       />
//     </Paper>
//   );
// };

// export default SummaryCard;

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
        padding: "16px",
        backgroundColor: "#f4f4f4",
        borderRadius: "8px",
        boxShadow: 3,
        maxWidth: "600px",
        margin: "20px auto",
      }}
    >
      <Typography
        variant="h6"
        sx={{ marginBottom: "16px", fontWeight: "bold", textAlign: "center" }}
      >
        AI Summary
      </Typography>
      <ReactMarkdown
        children={markdownContent}
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => (
            <Typography
              variant="body1"
              sx={{ marginBottom: "8px", textAlign: "left" }}
            >
              {children}
            </Typography>
          ),
          h1: ({ children }) => (
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                marginBottom: "16px",
                textAlign: "left",
              }}
            >
              {children}
            </Typography>
          ),
          h2: ({ children }) => (
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                marginBottom: "12px",
                textAlign: "left",
              }}
            >
              {children}
            </Typography>
          ),
          h3: ({ children }) => (
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                marginBottom: "8px",
                textAlign: "left",
              }}
            >
              {children}
            </Typography>
          ),
          ul: ({ children }) => (
            <Box sx={{ paddingLeft: "20px", textAlign: "left" }}>
              <ul>{children}</ul>
            </Box>
          ),
          li: ({ children }) => (
            <Typography
              variant="body1"
              sx={{ marginBottom: "4px", textAlign: "left" }}
            >
              • {children}
            </Typography>
          ),
        }}
      />
    </Paper>
  );
};

export default SummaryCard;
