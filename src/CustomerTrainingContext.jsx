import { createContext, useState, useContext, useEffect } from "react";

const CustomerTrainingContext = createContext();

export const useCustomerTrainingContext = () => useContext(CustomerTrainingContext);

export const CustomerTrainingProvider = ({ children }) => {

  const [customers, setCustomers] = useState([]);
  const [trainings, setTrainings] = useState([]);

  // Fetch all customers from the API
  const fetchCustomers = async () => {
    try {
      const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers');
      const data = await response.json();
      setCustomers(data._embedded.customers);
    } catch (error) {
      console.error("Failed to fetch customers:", error);
    }
  };

  // Fetch all trainings from the API
  const fetchTrainings = async () => {
    try {
      const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings');
      const data = await response.json();
      setTrainings(data._embedded.trainings);
    } catch (error) {
      console.error("Failed to fetch trainings:", error);
    }
  };

  // Fetch customers and trainings
  useEffect(() => {
    fetchCustomers();
    fetchTrainings();
  }, []);

  // Create a new customer
  const createCustomer = async (customer) => {
    try {
      const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer),
      });
      const data = await response.json();
      setCustomers((prev) => [...prev, data]);
    } catch (error) {
      console.error("Failed to create customer:", error);
    }
  };

  // Create a new training session
  const createTraining = async (training) => {
    try {
      const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(training),
      });
      const data = await response.json();
      setTrainings((prev) => [...prev, data]);
    } catch (error) {
      console.error("Failed to create training:", error);
    }
  };

  // Update a customer
  const updateCustomer = async (id, updatedCustomer) => {
    try {
      const response = await fetch(`https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCustomer),
      });
      const data = await response.json();
      setCustomers((prev) =>
        prev.map((customer) => (customer.id === id ? data : customer))
      );
    } catch (error) {
      console.error("Failed to update customer:", error);
    }
  };

  // Delete a customer
  const deleteCustomer = async (id) => {
    try {
      await fetch(`https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers/${id}`, {
        method: 'DELETE',
      });
      setCustomers((prev) => prev.filter((customer) => customer.id !== id));
    } catch (error) {
      console.error("Failed to delete customer:", error);
    }
  };

  // Delete a training session
  const deleteTraining = async (id) => {
    try {
      await fetch(`https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings/${id}`, {
        method: 'DELETE',
      });
      setTrainings((prev) => prev.filter((training) => training.id !== id));
    } catch (error) {
      console.error("Failed to delete training:", error);
    }
  };

  return (
    <CustomerTrainingContext.Provider
      value={{
        customers,
        setCustomers,
        trainings,
        setTrainings,
        createCustomer,
        createTraining,
        updateCustomer,
        deleteCustomer,
        deleteTraining,
      }}
    >
      {children}
    </CustomerTrainingContext.Provider>
  );
};



