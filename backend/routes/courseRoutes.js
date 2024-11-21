router.post("/", async (req, res) => {
    try {
      const { name, instructor, section, days, startTime, endTime } = req.body;
  
      // Validate required fields
      if (!name || !instructor || !section || !days || !startTime || !endTime) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const course = new Course({
        name,
        instructor,
        section,
        days,
        startTime,
        endTime,
      });
  
      const savedCourse = await course.save();
      res.status(201).json({ message: "Course added successfully", course: savedCourse });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to save course" });
    }
  });
  