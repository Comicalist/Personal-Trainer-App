import { createContext, useState, useContext } from "react";

const CustomerTrainingContext = createContext();

export const useCustomerTrainingContext = () => useContext(CustomerTrainingContext);

export const CustomerTrainingProvider = ({ children }) => {
  const [customers, setCustomers] = useState([
    { id: 1, name: "John Doe", email: "john.doe@example.com", phone: "+358 501111211" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", phone: "+358 401311111" },
    { id: 3, name: "Bob Johnson", email: "bob.johnson@example.com", phone: "+358 451114111" },
  ]);

  const [trainings, setTrainings] = useState([]);

  return (
    <CustomerTrainingContext.Provider value={{ customers, setCustomers, trainings, setTrainings }}>
      {children}
    </CustomerTrainingContext.Provider>
  );
};

