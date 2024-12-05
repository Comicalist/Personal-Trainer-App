import React, { useState } from "react";
import { useCustomerTrainingContext } from "../CustomerTrainingContext";
import { AgGridReact } from "ag-grid-react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box, Typography, MenuItem, Select } from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import "dayjs/locale/de";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const Training = () => {
  const { customers, trainings, setTrainings } = useCustomerTrainingContext();

  const [openDialog, setOpenDialog] = useState(false);
  const [editTraining, setEditTraining] = useState(null);
  const [date, setDate] = useState(dayjs());
  const [activity, setActivity] = useState("");
  const [duration, setDuration] = useState("");
  const [customer, setCustomer] = useState("");

  const handleDialogClose = () => {
    setOpenDialog(false);
    setEditTraining(null);
    setDate(dayjs());
    setActivity("");
    setDuration("");
    setCustomer("");
  };

  const handleAddTraining = () => {
    const newTraining = {
      id: trainings.length + 1,
      date,
      activity,
      duration: parseInt(duration, 10),
      customer,
    };
    setTrainings([...trainings, newTraining]);
    handleDialogClose();
  };

  const handleEditTraining = () => {
    const updatedTrainings = trainings.map((training) =>
      training.id === editTraining.id
        ? { ...training, date, activity, duration: parseInt(duration, 10), customer }
        : training
    );
    setTrainings(updatedTrainings);
    handleDialogClose();
  };

  const handleDeleteTraining = (id) => {
    if (window.confirm("Are you sure you want to delete this training?")) {
      setTrainings(trainings.filter((training) => training.id !== id));
    }
  };

  const columnDefs = [
    { headerName: "Date", field: "date", sortable: true, filter: true, valueFormatter: (params) => params.value.format("DD.MM.YYYY HH:mm") },
    { headerName: "Activity", field: "activity", sortable: true, filter: true },
    { headerName: "Duration (min)", field: "duration", sortable: true, filter: true },
    { headerName: "Customer", field: "customer", sortable: true, filter: true },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params) => (
        <Box>
          <Button color="primary" onClick={() => {
            setEditTraining(params.data);
            setDate(params.data.date);
            setActivity(params.data.activity);
            setDuration(params.data.duration);
            setCustomer(params.data.customer);
            setOpenDialog(true);
          }}>
            <Edit />
          </Button>
          <Button color="secondary" onClick={() => handleDeleteTraining(params.data.id)}>
            <Delete />
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box padding={3}>
      <Typography variant="h4" gutterBottom>
        Trainings
      </Typography>
      <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => setOpenDialog(true)} style={{ marginBottom: "20px" }}>
        Add Training
      </Button>
      <Box className="ag-theme-alpine" style={{ height: "400px", width: "100%" }}>
        <AgGridReact rowData={trainings} columnDefs={columnDefs} pagination={true} paginationPageSize={7} />
      </Box>

      {/* Add/Edit Training Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{editTraining ? "Edit Training" : "Add Training"}</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
            <DateTimePicker
              label="Date & Time"
              value={date}
              onChange={(newValue) => setDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
              inputFormat="DD.MM.YYYY HH:mm"
            />
          </LocalizationProvider>
          <TextField
            margin="dense"
            label="Activity"
            fullWidth
            variant="outlined"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Duration (min)"
            fullWidth
            variant="outlined"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          <Select
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            displayEmpty
            fullWidth
            margin="dense"
            label="Customer"
          >
            <MenuItem value="" disabled>
              Select Customer
            </MenuItem>
            {customers.map((customer) => (
              <MenuItem key={customer.id} value={customer.name}>
                {customer.name}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={editTraining ? handleEditTraining : handleAddTraining} color="primary">
            {editTraining ? "Save Changes" : "Add Training"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Training;