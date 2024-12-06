import React, { useState, useEffect } from "react";
import { useCustomerTrainingContext } from "../CustomerTrainingContext";
import { AgGridReact } from "ag-grid-react";
import { Typography, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Add, Edit, Delete, GetApp } from "@mui/icons-material";
import { Parser } from '@json2csv/plainjs';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const Customer = () => {
    const { customers, setCustomers } = useCustomerTrainingContext();
    const [openDialog, setOpenDialog] = useState(false);
    const [editCustomer, setEditCustomer] = useState(null);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [streetaddress, setStreetaddress] = useState("");
    const [postcode, setPostcode] = useState("");
    const [city, setCity] = useState("");

    const handleDialogClose = () => {
        setOpenDialog(false);
        setEditCustomer(null);
        setFirstname("");
        setLastname("");
        setEmail("");
        setPhone("");
        setStreetaddress("");
        setPostcode("");
        setCity("");
    };

    const handleAddCustomer = () => {
        const newCustomer = {
            id: customers.length + 1,
            firstname,
            lastname,
            email,
            phone,
            streetaddress,
            postcode,
            city,
        };
        setCustomers([...customers, newCustomer]);
        handleDialogClose();
    };

    const handleEditCustomer = () => {
        const updatedCustomers = customers.map((customer) =>
            customer.id === editCustomer.id
                ? { ...customer, firstname, lastname, email, phone, streetaddress, postcode, city }
                : customer
        );
        setCustomers(updatedCustomers);
        handleDialogClose();
    };

    const handleDeleteCustomer = (id) => {
        if (window.confirm("Are you sure you want to delete this customer?")) {
            setCustomers(customers.filter((customer) => customer.id !== id));
        }
    };

    const handleExportCSV = () => {
        const dataToExport = customers.map(({ id, firstname, lastname, email, phone, streetaddress, postcode, city }) => ({
            id,
            firstname,
            lastname,
            email,
            phone,
            streetaddress,
            postcode,
            city,
        }));

        const parser = new Parser();

        const csv = parser.parse(dataToExport);

        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", "customers_data.csv");
            link.click();
        }
    };

    const columnDefs = [
        { headerName: "First Name", field: "firstname", sortable: true, filter: true },
        { headerName: "Last Name", field: "lastname", sortable: true, filter: true },
        { headerName: "Email", field: "email", sortable: true, filter: true },
        { headerName: "Phone", field: "phone", sortable: true, filter: true },
        { headerName: "Street Address", field: "streetaddress", sortable: true, filter: true },
        { headerName: "Postcode", field: "postcode", sortable: true, filter: true },
        { headerName: "City", field: "city", sortable: true, filter: true },
        {
            headerName: "Actions",
            field: "actions",
            cellRenderer: (params) => (
                <Box display="flex" justifyContent="space-around">
                    <Button
                        color="primary"
                        onClick={() => {
                            setEditCustomer(params.data);
                            setFirstname(params.data.firstname);
                            setLastname(params.data.lastname);
                            setEmail(params.data.email);
                            setPhone(params.data.phone);
                            setStreetaddress(params.data.streetaddress);
                            setPostcode(params.data.postcode);
                            setCity(params.data.city);
                            setOpenDialog(true);
                        }}
                        size="small"
                    >
                        <Edit />
                    </Button>
                    <Button
                        color="secondary"
                        onClick={() => handleDeleteCustomer(params.data.id)}
                        size="small"
                    >
                        <Delete />
                    </Button>
                </Box>
            ),
        },
    ];

    return (
        <Box padding={3}>
            <Typography variant="h4" gutterBottom>
                Customers
            </Typography>
            <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                onClick={() => setOpenDialog(true)}
                style={{ marginBottom: "20px" }}
            >
                Add Customer
            </Button>

            <Button
                variant="contained"
                color="secondary"
                startIcon={<GetApp />}
                onClick={handleExportCSV}
                style={{ marginBottom: "20px", marginLeft: "10px" }}
            >
                Export to CSV
            </Button>

            <Box className="ag-theme-alpine" style={{ height: "520px", width: "100%" }}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={10}
                    paginationPageSizeSelector={[10, 25, 50]}
                />
            </Box>

            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle>{editCustomer ? "Edit Customer" : "Add Customer"}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="First Name"
                        fullWidth
                        variant="outlined"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Last Name"
                        fullWidth
                        variant="outlined"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        fullWidth
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Phone"
                        fullWidth
                        variant="outlined"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Street Address"
                        fullWidth
                        variant="outlined"
                        value={streetaddress}
                        onChange={(e) => setStreetaddress(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Postcode"
                        fullWidth
                        variant="outlined"
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="City"
                        fullWidth
                        variant="outlined"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={editCustomer ? handleEditCustomer : handleAddCustomer} color="primary">
                        {editCustomer ? "Save Changes" : "Add Customer"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Customer;




