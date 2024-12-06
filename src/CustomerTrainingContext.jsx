import { createContext, useState, useContext } from "react";
import dayjs from "dayjs";

const CustomerTrainingContext = createContext();

export const useCustomerTrainingContext = () => useContext(CustomerTrainingContext);

export const CustomerTrainingProvider = ({ children }) => {

  // Default customers
  const [customers, setCustomers] = useState([
    { id: 1, name: "John Doe", email: "john.doe@example.com", phone: "+358 501111211" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", phone: "+358 401311111" },
    { id: 3, name: "Bob Johnson", email: "bob.johnson@example.com", phone: "+358 451114111" },
  ]);

  // Default trainings
  const [trainings, setTrainings] = useState([
    { 
      id: 1, 
      date: dayjs().add(1, "day"), // Tomorrow at the current time
      activity: "Yoga", 
      duration: 60, // Minutes
      customer: "John Doe"
    },
    { 
      id: 2, 
      date: dayjs().add(2, "days").hour(10).minute(30), // 10:30 in 2 days
      activity: "Weightlifting", 
      duration: 45, 
      customer: "Jane Smith" 
    },
    { 
      id: 3, 
      date: dayjs().add(3, "days").hour(9), // In 3 days at 09:00
      activity: "Pilates", 
      duration: 30, 
      customer: "Bob Johnson" 
    },
  ]);

  return (
    <CustomerTrainingContext.Provider value={{ customers, setCustomers, trainings, setTrainings }}>
      {children}
    </CustomerTrainingContext.Provider>
  );
};


