import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import SelectInput from "./common/SelectInput";
import {
  AREA,
  FOUND_BY_TEAM,
  FOUND_IN_RELEASE,
  HOW_FOUND,
  SEVERITY,
  tableHeader,
  TAGS,
  TEAMS,
  WHERE_FOUND,
} from "../constants";
import { createBugRequest } from "../redux";

const BugFormModal = ({ open, onClose, data }) => {
  const dispatch = useDispatch();
  const fields = [
    {
      label: "TEAM",
      name: "TEAM",
      type: "select",
      options: TEAMS,
      defaultValue: TEAMS[1],
    },
    {
      label: tableHeader.SEVERITY,
      name: tableHeader.SEVERITY,
      type: "select",
      options: SEVERITY,
      defaultValue: SEVERITY[3],
    },
    {
      label: "Version Planned",
      name: "VERSION_PLANNED",
      type: "select",
      options: FOUND_IN_RELEASE,
      defaultValue: FOUND_IN_RELEASE[0],
    },
    {
      label: "How Found",
      name: "HOW_FOUND",
      type: "select",
      options: HOW_FOUND,
      defaultValue: HOW_FOUND[0],
    },
    {
      label: "Where Found",
      name: "WHERE_FOUND",
      type: "select",
      options: WHERE_FOUND,
      defaultValue: WHERE_FOUND[0],
    },
    {
      label: "Found in Release",
      name: "FOUND_IN_RELEASE",
      type: "select",
      options: FOUND_IN_RELEASE,
      defaultValue: FOUND_IN_RELEASE[0],
    },
    {
      label: "Found by Team",
      name: "FOUND_BY_TEAM",
      type: "select",
      options: TEAMS,
      defaultValue: TEAMS[1],
    },
    {
      label: "Area",
      name: "AREA",
      type: "select",
      options: AREA,
      defaultValue: AREA[0],
    },
    {
      label: "Tags",
      name: "TAGS",
      type: "select",
      options: TAGS,
      defaultValue: TAGS[0],
    },
  ];

  // const fields = [
  //   // {
  //   //   label: tableHeader.BUG_TITLE,
  //   //   name: "bug_title",
  //   //   type: "text",
  //   //   defaultValue: "",
  //   // },
  //   {
  //     label: "Team",
  //     name: "team",
  //     type: "select",
  //     options: TEAMS,
  //     defaultValue: TEAMS[1],
  //   },
  //   {
  //     label: "Severity",
  //     name: "severity",
  //     type: "select",
  //     options: SEVERITY,
  //     defaultValue: SEVERITY[3],
  //   },
  //   {
  //     label: "Version Planned",
  //     name: "version_planned",
  //     type: "select",
  //     options: FOUND_IN_RELEASE,
  //     defaultValue: FOUND_IN_RELEASE[0],
  //   },

  //   {
  //     label: "How Found",
  //     name: "how_found",
  //     type: "select",
  //     options: HOW_FOUND,
  //     defaultValue: HOW_FOUND[0],
  //   },
  //   {
  //     label: "Where Found",
  //     name: "where_found",
  //     type: "select",
  //     options: WHERE_FOUND,
  //     defaultValue: WHERE_FOUND[0],
  //   },
  //   {
  //     label: "Found in Release",
  //     name: "found_in_release",
  //     type: "select",
  //     options: FOUND_IN_RELEASE,
  //     defaultValue: FOUND_IN_RELEASE[0],
  //   },
  //   {
  //     label: "Found by Team",
  //     name: "found_by_team",
  //     type: "select",
  //     options: TEAMS,
  //     defaultValue: TEAMS[1],
  //   },
  //   {
  //     label: "Area",
  //     name: "area",
  //     type: "select",
  //     options: AREA,
  //     defaultValue: AREA[0],
  //   },
  //   {
  //     label: "Tags",
  //     name: "tags",
  //     type: "select",
  //     options: TAGS,
  //     defaultValue: TAGS[0],
  //   },

  //   // {
  //   //   label: "Discussion",
  //   //   name: "discussion",
  //   //   type: "text",
  //   //   multiline: true,
  //   //   defaultValue: "",
  //   // },
  //   // {
  //   //   label: "Workaround",
  //   //   name: "workAround",
  //   //   type: "text",
  //   //   multiline: true,
  //   //   defaultValue: "",
  //   // },
  //   // {
  //   //   label: "Steps to Reproduce",
  //   //   name: "stepsToReproduce",
  //   //   type: "text",
  //   //   multiline: true,
  //   //   defaultValue: "",
  //   // },
  //   // {
  //   //   label: "Root Cause Analysis",
  //   //   name: "rca",
  //   //   type: "text",
  //   //   multiline: true,
  //   //   defaultValue: "",
  //   // },
  // ];

  const getInitialState = () => {
    const state = {};
    fields.forEach((field) => {
      state[field.name] = field.defaultValue || "";
    });

    // Add derived values from `data` if present
    if (data) {
      state[tableHeader.BUG_TITLE] = data[tableHeader.BUG_TITLE] || "";
      state[tableHeader.HISTORICAL_SOLUTION] =
        data[tableHeader.HISTORICAL_SOLUTION] || "";
    }

    return state;
  };

  const [formValues, setFormValues] = useState(getInitialState());

  useEffect(() => {
    if (open) {
      setFormValues(getInitialState());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, open]);

  const handleChange = (field) => (event) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = () => {
    // console.log("Final Payload:", formValues);
    const finalPayload = {
      ...data,
      ...formValues,
    };
    dispatch(createBugRequest(finalPayload));
    onClose();
    // TODO: dispatch createBugRequest(formValues)
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Create Bug</DialogTitle>
      <DialogContent>
        <Grid
          container
          spacing={1}
          p={1}
          alignItems="flex-start"
          border={"1px solid blue"}
        >
          {/* Bug Title at the top - full width like a heading */}

          <TextField
            label={tableHeader.BUG_TITLE}
            value={formValues[tableHeader.BUG_TITLE]}
            onChange={handleChange(tableHeader.BUG_TITLE)}
            fullWidth
            variant="outlined"
          />

          {/* Select fields container */}
          <Grid container item spacing={2} xs={12} border={"1px solid black"}>
            {fields
              .filter((f) => f.type === "select")
              .map(({ label, name, options }) => (
                <Grid item xs={12} sm={6} key={name}>
                  <SelectInput
                    label={label}
                    value={formValues[name]}
                    onChange={handleChange(name)}
                    options={options}
                    style={{ width: "300px" }}
                  />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BugFormModal;
