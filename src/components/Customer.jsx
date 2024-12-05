import React, { useState } from "react";
import { useCustomerTrainingContext } from "../CustomerTrainingContext";
import { AgGridReact } from "ag-grid-react";
import { Typography, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const Customer = () => {
  const { customers, setCustomers } = useCustomerTrainingContext();  // Access state and setter from context
  const [openDialog, setOpenDialog] = useState(false);
  const [editCustomer, setEditCustomer] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleDialogClose = () => {
    setOpenDialog(false);
    setEditCustomer(null);
    setName("");
    setEmail("");
    setPhone("");
  };

  const handleAddCustomer = () => {
    const newCustomer = {
      id: customers.length + 1,
      name,
      email,
      phone,
    };
    setCustomers([...customers, newCustomer]);  // Update the customer list in context
    handleDialogClose();
  };

  const handleEditCustomer = () => {
    const updatedCustomers = customers.map((customer) =>
      customer.id === editCustomer.id
        ? { ...customer, name, email, phone }
        : customer
    );
    setCustomers(updatedCustomers);  // Update the customer list in context
    handleDialogClose();
  };

  const handleDeleteCustomer = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      setCustomers(customers.filter((customer) => customer.id !== id));  // Remove from customer list in context
    }
  };

  const columnDefs = [
    { headerName: "Name", field: "name", sortable: true, filter: true },
    { headerName: "Email", field: "email", sortable: true, filter: true },
    { headerName: "Phone", field: "phone", sortable: true, filter: true },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params) => (
        <Box display="flex" justifyContent="space-around">
          <Button
            color="primary"
            onClick={() => {
              setEditCustomer(params.data);
              setName(params.data.name);
              setEmail(params.data.email);
              setPhone(params.data.phone);
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
      <Box className="ag-theme-alpine" style={{ height: "400px", width: "100%" }}>
        <AgGridReact
          rowData={customers}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={5}
        />
      </Box>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{editCustomer ? "Edit Customer" : "Add Customer"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
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