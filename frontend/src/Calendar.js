import React, { useEffect, useState } from 'react';
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import "./Calendar.css";

const styles = {
  wrap: {
    display: "flex",
    justifyContent: "flex-start",
    gap: "40px",
    padding: "20px",
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    marginRight: "10px",
  },
  addButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    fontSize: "24px",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  main: {
    flexGrow: 1, 
    padding: "10px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  modal: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    zIndex: 1000,
    width: "400px",
  },
  overlay: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
  },
  formGroup: {
    marginBottom: "15px",
  },
};

const Calendar = ({plan}) => {
  debugger;
  const [calendar, setCalendar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    text: "",
    instructor: "",
    section: "",
    days: [],
    startTime: "",
    endTime: "",
  });

  const config = {
    viewType: "Days",
    days: 5, 
    startDate: "2025-10-06",
    durationBarVisible: false,
    timeRangeSelectedHandling: "Disabled",
    eventDeleteHandling: "Update",
    onEventDeleted: (args) => {
      plan.events = plan.events.filter((e) => e.id !== args.e.id());
    },
    events: plan.events,
    headerDateFormat: "dddd", 
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      text: "",
      instructor: "",
      section: "",
      days: [],
      startTime: "",
      endTime: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const day = e.target.value;
    const updatedDays = formData.days.includes(day)
      ? formData.days.filter((d) => d !== day)
      : [...formData.days, day];
    setFormData({ ...formData, days: updatedDays });
  };

  const handleSubmit = async () => {
    const courseData = {
      name: formData.text,
      instructor: formData.instructor,
      section: formData.section,
      days: formData.days, // Send the selected days as an array
      startTime: formData.startTime, // Send start time as a string
      endTime: formData.endTime, // Send end time as a string
    };
  
    console.log("Course Data Sent to Backend:", courseData); // Debug log
  
    try {
      const response = await fetch("http://localhost:5007/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(courseData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add course");
      }
  
      // Update UI without affecting the database structure
      const newEvents = formData.days.map((day) => {
        const dayIndex = ["Mon", "Tue", "Wed", "Thu", "Fri"].indexOf(day);
        const start = new DayPilot.Date(config.startDate).getDatePart();
        const eventDate = start.addDays(dayIndex);
  
        const [startHour, startMinute] = formData.startTime.split(":").map(Number);
        const eventStart = eventDate.addHours(startHour).addMinutes(startMinute);
  
        const [endHour, endMinute] = formData.endTime.split(":").map(Number);
        const eventEnd = eventDate.addHours(endHour).addMinutes(endMinute);
  
        return {
          id: DayPilot.guid(), // Unique ID for UI
          text: `${formData.text} (${formData.section}) - ${formData.instructor}`,
          start: eventStart.toString(), // Required for UI
          end: eventEnd.toString(), // Required for UI
        };
      });
  
      plan.events = [...plan.events, ...newEvents]; // Update the plan events
      calendar.update({ events: plan.events }); // Update the calendar UI
      handleCloseModal();
    } catch (error) {
      console.error(error);
      alert("Failed to save course. Please try again.");
    }
  };
  
  

  return (
    <div style={styles.wrap}>
      <div>
        <h2>Schedule</h2>
        <ul>
  {plan.events.map(event => {
    const eventDate = new DayPilot.Date(event.start);
    const dayOfWeek = eventDate.toString("dddd");
    return (
      <li key={event.id}>
        {event.text} - {dayOfWeek}
      </li>
    );
  })}
</ul>

        <button onClick={handleOpenModal}>+</button>
      </div>

      <div style={styles.main}>
        <DayPilotCalendar {...config} controlRef={setCalendar} />
      </div>
      {isModalOpen && (
        <>
          <div style={styles.overlay} onClick={handleCloseModal}></div>
          <div style={styles.modal}>
            <h3>Add Course</h3>
            <div style={styles.formGroup}>
              <label>Course Name:</label>
              <input
                type="text"
                name="text"
                value={formData.text}
                onChange={handleInputChange}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Instructor:</label>
              <input
                type="text"
                name="instructor"
                value={formData.instructor}
                onChange={handleInputChange}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Section:</label>
              <input
                type="text"
                name="section"
                value={formData.section}
                onChange={handleInputChange}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Days:</label>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
                  <label key={day} style={{ marginRight: "10px" }}>
                    <input
                      type="checkbox"
                      value={day}
                      checked={formData.days.includes(day)}
                      onChange={handleCheckboxChange}
                    />
                    {day}
                  </label>
                ))}
              </div>
            </div>
            <div style={styles.formGroup}>
              <label>Start Time:</label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleInputChange}
              />
            </div>
            <div style={styles.formGroup}>
              <label>End Time:</label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleInputChange}
              />
            </div>
            <button onClick={handleSubmit}>Add Event</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Calendar;
