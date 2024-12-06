import { useEffect, useState } from "react";
import { useCustomerTrainingContext } from "../CustomerTrainingContext";
import { Box } from "@mui/material";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enGB } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
    "en-GB": enGB,
};

const Calendar = () => {
    const { trainings, setTrainings } = useCustomerTrainingContext();
    const [events, setEvents] = useState([]);
    const [view, setView] = useState("month");

    const localizer = dateFnsLocalizer({
        format: (date, formatString) => format(date, formatString),
        parse,
        startOfWeek,
        getDay,
        locales,
    });

    // Fetch trainings from the API when the component loads
    const fetchTrainings = async () => {
        try {
            const response = await fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/gettrainings");
            const data = await response.json();
            console.log('Fetched Trainings:', data);
            setTrainings(data);
        } catch (error) {
            console.error("Error fetching trainings:", error);
        }
    };

    // Fetch trainings when the component mounts
    useEffect(() => {
        fetchTrainings();
    }, []);

  
    useEffect(() => {
        const formattedEvents = trainings.map((training) => {
            const customer = training.customer; 
            
            if (!customer) {
                console.warn('Missing customer data for training ID:', training.id); 
            }

            return {
                id: training.id,
                title: customer ? `${training.activity} / ${customer.firstname} ${customer.lastname}` : `${training.activity} / Unknown`,
                start: new Date(training.date),
                end: new Date(new Date(training.date).getTime() + training.duration * 60000),
            };
        });
        setEvents(formattedEvents);
    }, [trainings]);

    const handleViewChange = (newView) => {
        setView(newView);
    };

    return (
        <Box padding={3}>
            <BigCalendar
                localizer={localizer}
                events={events}
                views={["month", "week", "day"]}
                defaultView={view}
                onView={handleViewChange}
                style={{ height: "750px" }}
                selectable
                step={10}
                timeslots={12}
                eventPropGetter={(event) => ({
                    style: {
                        maxWidth: "850px",
                        borderRadius: "4px",
                        color: "white",
                        border: "none",
                        padding: "4px",
                    },
                })}
                formats={{
                    timeGutterFormat: "HH:mm",
                    eventTimeRangeFormat: ({ start, end }) =>
                        `${format(start, "HH:mm")} - ${format(end, "HH:mm")}`,
                }}
            />
        </Box>
    );
};

export default Calendar;
