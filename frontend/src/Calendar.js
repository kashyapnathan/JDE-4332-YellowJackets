import React, { useEffect, useState } from 'react';
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import "./Calendar.css";

const styles = {
  wrap: {
    display: "flex",
    justifyContent: "flex-end", 
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
    width: "60%", 
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

const Calendar = () => {
  const [calendar, setCalendar] = useState(null);
  const [events, setEvents] = useState([]);
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
      setEvents((prevEvents) => prevEvents.filter((e) => e.id !== args.e.id()));
    },
    events,
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

  const handleSubmit = () => {
    const newEvents = formData.days.map((day) => {
      const dayIndex = ["Mon", "Tue", "Wed", "Thu", "Fri"].indexOf(day);
      const start = new DayPilot.Date(config.startDate).getDatePart();
      const eventDate = start.addDays(dayIndex);

      const [startHour, startMinute] = formData.startTime.split(":").map(Number);
      const eventStart = eventDate.addHours(startHour).addMinutes(startMinute);

      const [endHour, endMinute] = formData.endTime.split(":").map(Number);
      const eventEnd = eventDate.addHours(endHour).addMinutes(endMinute);

      return {
        id: DayPilot.guid(),
        text: `${formData.text} (${formData.section}) - ${formData.instructor}`,
        start: eventStart.toString(),
        end: eventEnd.toString(),
      };
    });

    setEvents((prevEvents) => [...prevEvents, ...newEvents]);
    handleCloseModal();
  };

  useEffect(() => {
    
    setEvents([]);
  }, []);

  return (
    <div style={styles.wrap}>
      <div style={styles.buttonContainer}>
        <button style={styles.addButton} onClick={handleOpenModal}>
          +
        </button>
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
