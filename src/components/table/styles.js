export const COLUMN_STYLES = {
  DEFAULT: {
    maxWidth: "180px",
    whiteSpace: "nowrap",
  },
  SUMMARY: {
    maxWidth: "500px",
    whiteSpace: "nowrap",
  },
  // HISTORICAL_SOLUTION: {
  //   maxWidth: "400px",
  //   whiteSpace: "normal",
  // },
  // DESCRIPTION: {
  //   maxWidth: "400px",
  //   whiteSpace: "normal",
  // },
  // DETAILS: {
  //   maxWidth: "350px",
  //   whiteSpace: "normal",
  // },
};

const columnStyleMap = {
  "ANTHROPIC AI SUMMARY": COLUMN_STYLES.SUMMARY,
  "HISTORICAL SOLUTION": COLUMN_STYLES.SUMMARY,
  "CAUSED BY DETAILS": COLUMN_STYLES.SUMMARY,
};

export const getColumnStyle = (key) =>
  columnStyleMap[key] || COLUMN_STYLES.DEFAULT;

export const cellStyle = {
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
  padding: "8px",
  boxSizing: "border-box",
  border: "1px solid #ccc",
};

export const headerCellStyle = {
  ...cellStyle,
  fontWeight: "bold",
  backgroundColor: "#1976d2",
  color: "#fff",
};

export const indexCellStyle = {
  ...cellStyle,
  fontWeight: "bold",
  textAlign: "center",
  backgroundColor: "#fafafa",
};
