import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
} from "@mui/material";
import SelectInput from "./common/SelectInput";

const BugFormModal = ({ open, onClose }) => {
  const [formValues, setFormValues] = useState({
    severity: "1 - Critical",
    tags: "Dummy",
    version_planned: "2025.2",
    how_found: "System Monitor",
    where_found: "4 - Dev",
    found_by_team: "WC Pre Estimating Workflow",
    found_in_release: "2025.2",
  });

  const handleChange = (field) => (event) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const fields = [
    {
      label: "Bug Title",
      name: "Bug_Title",
      options: ["Error while updating Appraisal Assignment."],
    },
    {
      label: "Severity",
      name: "severity",
      options: ["1 - Critical", "2 - High", "3 - Medium"],
    },
    { label: "Tags", name: "tags", options: ["Dummy", "Real"] },
    {
      label: "Version Planned",
      name: "version_planned",
      options: ["2025.2", "2025.3"],
    },
    {
      label: "How Found",
      name: "how_found",
      options: ["System Monitor", "User Reported"],
    },
    {
      label: "Where Found",
      name: "where_found",
      options: ["4 - Dev", "5 - QA"],
    },
    {
      label: "Found by Team",
      name: "found_by_team",
      options: ["WC Pre Estimating Workflow", "Another Team"],
    },
    {
      label: "Found in Release",
      name: "found_in_release",
      options: ["2025.2", "2025.3"],
    },
  ];

  const handleSubmit = (payload) => {
    console.log(payload, "payload");
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create Bug</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {fields.map((field) => (
            <Grid item xs={12} sm={6} key={field.name}>
              <SelectInput
                label={field.label}
                value={formValues[field.name]}
                onChange={handleChange(field.name)}
                options={field.options}
              />
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={() => handleSubmit(formValues)}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BugFormModal;
