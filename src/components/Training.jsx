import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box, Typography, MenuItem, Select } from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const Training = () => {
    const [trainings, setTrainings] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [editTraining, setEditTraining] = useState(null);
    const [date, setDate] = useState(dayjs());
    const [activity, setActivity] = useState("");
    const [duration, setDuration] = useState("");
    const [customer, setCustomer] = useState("");

    useEffect(() => {
        // Fetch the training data from the API using native fetch
        fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/gettrainings")
            .then((response) => response.json())
            .then((data) => {
                setTrainings(data);
            })
            .catch((error) => {
                console.error("Error fetching training data:", error);
            });

        // Optionally, you can fetch customers here too if needed
        // fetch("API_TO_FETCH_CUSTOMERS")
        //   .then(response => response.json())
        //   .then(data => setCustomers(data))
        //   .catch(error => console.error('Error fetching customers:', error));
    }, []);

    const handleDialogClose = () => {
        setOpenDialog(false);
        setEditTraining(null);
        setDate(dayjs());
        setActivity("");
        setDuration("");
        setCustomer("");
    };

    const handleAddTraining = () => {
        const selectedCustomer = customers.find((cust) => cust.id === customer);
        const newTraining = {
            id: trainings.length + 1,
            date,
            activity,
            duration: parseInt(duration, 10),
            customer: selectedCustomer,
        };
        setTrainings([...trainings, newTraining]);
        handleDialogClose();
    };

    const handleEditTraining = () => {
        const selectedCustomer = customers.find((cust) => cust.id === customer);
        const updatedTrainings = trainings.map((training) =>
            training.id === editTraining.id
                ? { ...training, date, activity, duration: parseInt(duration, 10), customer: selectedCustomer }
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
        { 
            headerName: "Date", 
            field: "date", 
            valueFormatter: (params) => dayjs(params.value).format("DD.MM.YYYY HH:mm"),
            width: 200,
        },
        { 
            headerName: "Activity", 
            field: "activity", 
            sortable: true, 
            filter: true,
            width: 180,
        },
        { 
            headerName: "Duration (min)", 
            field: "duration", 
            sortable: true, 
            filter: true, 
            width: 120,
        },
        {
            headerName: "First Name",
            field: "customer.firstname",
            sortable: true,
            filter: true,
            width: 150,
        },
        {
            headerName: "Last Name",
            field: "customer.lastname",
            sortable: true,
            filter: true,
            width: 150,
        },
        {
            headerName: "Email",
            field: "customer.email",
            sortable: true,
            filter: true,
            width: 200,
        },
        {
            headerName: "Phone",
            field: "customer.phone",
            sortable: true,
            filter: true,
            width: 160,
        },
        {
            headerName: "Address",
            field: "customer.streetaddress",
            sortable: true,
            filter: true,
            width: 200,
        },
        {
            headerName: "Postcode",
            field: "customer.postcode",
            sortable: true,
            filter: true,
            width: 150,
        },
        {
            headerName: "City",
            field: "customer.city",
            sortable: true,
            filter: true,
            width: 150,
        },
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
                        setCustomer(params.data.customer.id);
                        setOpenDialog(true);
                    }}>
                        <Edit />
                    </Button>
                    <Button color="secondary" onClick={() => handleDeleteTraining(params.data.id)}>
                        <Delete />
                    </Button>
                </Box>
            ),
            width: 120,
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
            <Box className="ag-theme-alpine" style={{ height: "520px", width: "100%" }}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={10}
                    paginationPageSizeSelector={[10, 25, 50]}
                />
            </Box>

            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle>{editTraining ? "Edit Training" : "Add Training"}</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
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
                            <MenuItem key={customer.id} value={customer.id}>
                                {customer.firstname} {customer.lastname}
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