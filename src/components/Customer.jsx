import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { Typography, Box } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const Customer = () => {
    const [rowData] = useState([
        { id: 1, name: "John Doe", email: "john.doe@example.com", phone: "+358401234567" },
        { id: 2, name: "Jane Smith", email: "jane.smith@example.com", phone: "+358409876543" },
    ]);

    const columnDefs = [
        { headerName: "Name", field: "name", sortable: true, filter: true },
        { headerName: "Email", field: "email", sortable: true, filter: true },
        { headerName: "Phone", field: "phone", sortable: true, filter: true },
    ];

    return (
        <Box padding={3}>
            <Typography variant="h4" gutterBottom>
                Customers
            </Typography>
            <Box className="ag-theme-alpine" style={{ height: "400px", width: "100%" }}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={5}
                />
            </Box>
        </Box>
    );
};

export default Customer;
