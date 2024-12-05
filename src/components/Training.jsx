import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { Typography, Box } from "@mui/material";
import dayjs from "dayjs";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const Training = () => {
    const [rowData] = useState([
        {
            id: 1,
            date: "2024-12-05T10:00:00",
            activity: "Yoga",
            duration: 60,
            customer: "John Doe",
        },
        {
            id: 2,
            date: "2024-12-06T15:30:00",
            activity: "Running",
            duration: 45,
            customer: "Jane Smith",
        },
    ]);

    const columnDefs = [
        {
            headerName: "Date",
            field: "date",
            sortable: true,
            filter: true,
            valueFormatter: (params) => dayjs(params.value).format("DD.MM.YYYY HH:mm"),
        },
        { headerName: "Activity", field: "activity", sortable: true, filter: true },
        { headerName: "Duration (min)", field: "duration", sortable: true, filter: true },
        { headerName: "Customer", field: "customer", sortable: true, filter: true },
    ];

    return (
        <Box padding={3}>
            <Typography variant="h4" gutterBottom>
                Trainings
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

export default Training;