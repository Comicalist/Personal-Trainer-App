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
    const { trainings } = useCustomerTrainingContext();
    const [events, setEvents] = useState([]);
    const [view, setView] = useState("month");

    const localizer = dateFnsLocalizer({
        format: (date, formatString) => format(date, formatString),
        parse,
        startOfWeek,
        getDay,
        locales,
    });

    useEffect(() => {
        const formattedEvents = trainings.map((training) => ({
            id: training.id,
            title: `${training.activity} / ${training.customer}`,
            start: new Date(training.date),
            end: new Date(new Date(training.date).getTime() + training.duration * 60000),
        }));
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
