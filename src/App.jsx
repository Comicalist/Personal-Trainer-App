import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import Customer from "./components/Customer";
import Training from "./components/Training";

const App = () => {
    return (
        <Router>
            <Box>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" style={{ flexGrow: 1 }}>
                            Personal Trainer App
                        </Typography>
                        <Button color="inherit" component={Link} to="/">
                            Customers
                        </Button>
                        <Button color="inherit" component={Link} to="/training">
                            Trainings
                        </Button>
                    </Toolbar>
                </AppBar>
                <Box padding={3}>
                    <Routes>
                        <Route path="/" element={<Customer />} />
                        <Route path="/training" element={<Training />} />
                    </Routes>
                </Box>
            </Box>
        </Router>
    );
};

export default App;

