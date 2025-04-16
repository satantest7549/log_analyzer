// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Grid,
//   TextField,
// } from "@mui/material";
// import SelectInput from "./common/SelectInput";
// import {
//   AREA,
//   HOW_FOUND,
//   SEVERITY,
//   tableHeader,
//   TAGS,
//   TEAMS,
//   VERSIONS,
//   WHERE_FOUND,
// } from "../constants";
// import { createBugRequest } from "../redux";

// const BugFormModal = ({ open, onClose, data }) => {
//   const dispatch = useDispatch();
//   const fields = [
//     {
//       label: "TEAM",
//       name: "TEAM",
//       type: "select",
//       options: TEAMS,
//       defaultValue: TEAMS[1],
//     },
//     {
//       label: tableHeader.SEVERITY,
//       name: tableHeader.SEVERITY,
//       type: "select",
//       options: SEVERITY,
//       defaultValue: SEVERITY[3],
//     },
//     {
//       label: "Version Planned",
//       name: "VERSION_PLANNED",
//       type: "select",
//       options: VERSIONS,
//       defaultValue: VERSIONS[0],
//     },
//     {
//       label: "How Found",
//       name: "HOW_FOUND",
//       type: "select",
//       options: HOW_FOUND,
//       defaultValue: HOW_FOUND[0],
//     },
//     {
//       label: "Where Found",
//       name: "WHERE_FOUND",
//       type: "select",
//       options: WHERE_FOUND,
//       defaultValue: WHERE_FOUND[3],
//     },
//     {
//       label: "Found in Release",
//       name: "FOUND_IN_RELEASE",
//       type: "select",
//       options: VERSIONS,
//       defaultValue: VERSIONS[0],
//     },
//     {
//       label: "Found by Team",
//       name: "FOUND_BY_TEAM",
//       type: "select",
//       options: TEAMS,
//       defaultValue: TEAMS[1],
//     },
//     {
//       label: "Area",
//       name: "AREA",
//       type: "select",
//       options: AREA,
//       defaultValue: AREA[0],
//     },
//     {
//       label: "Tags",
//       name: "TAGS",
//       type: "select",
//       options: TAGS,
//       defaultValue: TAGS[0],
//     },
//   ];

//   const getInitialState = () => {
//     const state = {};
//     fields.forEach((field) => {
//       state[field.name] = field.defaultValue || "";
//     });

//     // Add derived values from `data` if present
//     if (data) {
//       state[tableHeader.BUG_TITLE] = data[tableHeader.BUG_TITLE] || "";
//       state[tableHeader.HISTORICAL_SOLUTION] =
//         data[tableHeader.HISTORICAL_SOLUTION] || "";
//     }

//     return state;
//   };

//   const [formValues, setFormValues] = useState(getInitialState());

//   useEffect(() => {
//     if (open) {
//       setFormValues(getInitialState());
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [data, open]);

//   const handleChange = (field) => (event) => {
//     setFormValues((prev) => ({
//       ...prev,
//       [field]: event.target.value,
//     }));
//   };

//   const handleSubmit = () => {
//     // console.log("Final Payload:", formValues);
//     const finalPayload = {
//       ...data,
//       ...formValues,
//     };
//     dispatch(createBugRequest(finalPayload));
//     onClose();
//     // TODO: dispatch createBugRequest(formValues)
//   };

//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
//       <DialogTitle>Create Bug</DialogTitle>
//       <DialogContent>
//         <Grid
//           container
//           spacing={1}
//           p={2}
//           alignItems="flex-start"
//           // border={"1px solid blue"}
//         >
//           {/* Bug Title at the top - full width like a heading */}
//           <TextField
//             label={tableHeader.BUG_TITLE}
//             value={formValues[tableHeader.BUG_TITLE]}
//             onChange={handleChange(tableHeader.BUG_TITLE)}
//             fullWidth
//             variant="outlined"
//           />

//           {/* Select fields container */}
//           <Grid
//             container
//             item
//             spacing={1}
//             xs={12}
//             // border={"1px solid black"}
//           >
//             {fields
//               .filter((f) => f.type === "select")
//               .map(({ label, name, options }) => (
//                 <Grid item xs={12} sm={6} key={name}>
//                   <SelectInput
//                     label={label}
//                     value={formValues[name]}
//                     onChange={handleChange(name)}
//                     options={options}
//                   />
//                 </Grid>
//               ))}
//           </Grid>
//         </Grid>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose}>Cancel</Button>
//         <Button variant="contained" onClick={handleSubmit}>
//           Submit
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default BugFormModal;

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
  HOW_FOUND,
  SEVERITY,
  tableHeader,
  TAGS,
  TEAMS,
  VERSIONS,
  WHERE_FOUND,
} from "../constants";
import { createBugRequest } from "../redux";

// -------------------- Config Fields --------------------
const getFormFields = () => [
  { label: "TEAM", name: "TEAM", options: TEAMS, defaultValue: TEAMS[1] },
  {
    label: tableHeader.SEVERITY,
    name: tableHeader.SEVERITY,
    options: SEVERITY,
    defaultValue: SEVERITY[3],
  },
  {
    label: "Version Planned",
    name: "VERSION_PLANNED",
    options: VERSIONS,
    defaultValue: VERSIONS[0],
  },
  {
    label: "How Found",
    name: "HOW_FOUND",
    options: HOW_FOUND,
    defaultValue: HOW_FOUND[0],
  },
  {
    label: "Where Found",
    name: "WHERE_FOUND",
    options: WHERE_FOUND,
    defaultValue: WHERE_FOUND[3],
  },
  {
    label: "Found in Release",
    name: "FOUND_IN_RELEASE",
    options: VERSIONS,
    defaultValue: VERSIONS[0],
  },
  {
    label: "Found by Team",
    name: "FOUND_BY_TEAM",
    options: TEAMS,
    defaultValue: TEAMS[1],
  },
  { label: "Area", name: "AREA", options: AREA, defaultValue: AREA[0] },
  { label: "Tags", name: "TAGS", options: TAGS, defaultValue: TAGS[0] },
];

// -------------------- Initial State --------------------
const getInitialState = (fields, data) => {
  const state = {};
  fields.forEach(({ name, defaultValue }) => {
    state[name] = defaultValue || "";
  });

  if (data) {
    state[tableHeader.BUG_TITLE] = data[tableHeader.BUG_TITLE] || "";
    state[tableHeader.HISTORICAL_SOLUTION] =
      data[tableHeader.HISTORICAL_SOLUTION] || "";
  }

  return state;
};

// -------------------- Component --------------------
const BugFormModal = ({ open, onClose, data }) => {
  const dispatch = useDispatch();
  const fields = getFormFields();

  const [formValues, setFormValues] = useState(() =>
    getInitialState(fields, data)
  );

  useEffect(() => {
    if (open) {
      setFormValues(getInitialState(fields, data));
    }
  }, [data, open, fields]);

  const handleChange = (field) => (event) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = () => {
    const finalPayload = { ...data, ...formValues };
    dispatch(createBugRequest(finalPayload));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create Bug</DialogTitle>
      <DialogContent>
        <Grid container spacing={1} p={2} alignItems="flex-start">
          <TextField
            label={tableHeader.BUG_TITLE}
            value={formValues[tableHeader.BUG_TITLE]}
            onChange={handleChange(tableHeader.BUG_TITLE)}
            fullWidth
            variant="outlined"
          />
          <Grid container item spacing={1} xs={12}>
            {fields.map(({ label, name, options }) => (
              <Grid item xs={12} sm={6} key={name}>
                <SelectInput
                  label={label}
                  value={formValues[name]}
                  onChange={handleChange(name)}
                  options={options}
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
