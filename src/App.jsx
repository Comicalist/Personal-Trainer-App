import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from "@mui/material";
import CalendarToday from "@mui/icons-material/CalendarToday";
import { CustomerTrainingProvider } from "./CustomerTrainingContext";
import Customer from "./components/Customer";
import Training from "./components/Training";
import Calendar from "./components/Calendar";

const App = () => {
  return (
    <CustomerTrainingProvider>
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
              <IconButton color="inherit" component={Link} to="/calendar" aria-label="Calendar">
                <CalendarToday />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Box padding={3}>
            <Routes>
              <Route path="/" element={<Customer />} />
              <Route path="/training" element={<Training />} />
              <Route path="/calendar" element={<Calendar />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </CustomerTrainingProvider>
  );
};

export default App;
