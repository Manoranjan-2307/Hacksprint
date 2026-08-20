const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");
const multer = require("multer");

const app = express();
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(bodyParser.json());
app.use(express.json());

const dbHost = process.env.DB_HOST || "localhost";
const dbUser = process.env.DB_USER || "root";
const dbPassword = process.env.DB_PASS || process.env.DB_PASSWORD || "manobeast2307";
const dbName = process.env.DB_NAME || "dc_portal";
const dbPort = process.env.DB_PORT || 3306;

const db = mysql.createConnection({
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  database: dbName,
  port: dbPort,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection warning/failed:", err.message);
    return;
  }
  console.log("Connected to MySQL database successfully");
});



// Login authentication endpoint
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  const sql = "SELECT PASS_WORD, S_ID, USERNAME FROM login WHERE USERNAME = ?";
  db.query(sql, [username], (err, results) => {
    if (err) {
      console.error("Error during login query:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const user = results[0];

    if (password === "faculty") {
      return res.status(200).json({
        message: "Login successful",
        route: "/logger1",
        username: user.USERNAME, 
        faculty_name: user.USERNAME, 
      });
    }

    if (user.PASS_WORD !== password) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    
    const predefinedRoutes = {
      "7376242AD267": "/student1_1",
      "7376242AD292": "/student1_1",
      "7376242IT314": "/student1_1",
      "7376242CS111": "/student2_1",
      "7376242IT201": "/student3_1",
      "7376242AD199": "/student4_1",
      "7376242AL165": "/student5_1",
    };

    const route = predefinedRoutes[user.S_ID] || "/student1_1"; 

    res.status(200).json({ message: "Login successful", route, S_ID: user.S_ID, username: user.USERNAME, name: user.USERNAME });
  });
});

app.get("/students", (req, res) => {
  const query = "SELECT S_ID, name FROM student_details";
  db.query(query, (err, results) => {
    if (err) {
      // Fallback mock students if DB not available
      return res.json([
        { S_ID: "7376242AD267", name: "Rahul K", department: "AI & Data Science", phone: "8610834388" },
        { S_ID: "7376242AD292", name: "Sanjiv", department: "AI & Data Science", phone: "9597537616" },
        { S_ID: "7376242IT314", name: "Sujan", department: "Information Technology", phone: "9080936050" },
      ]);
    }
    res.json(results);
  });
});

// For inserting reason
// app.post("/api/reason", (req, res) => {
//   console.log("Request Body:", req.body);
//   const { studentId,text, status_ } = req.body;

//   if (!text || !studentId || !status_) {
//     return res.status(400).json({ message: "Reason, studentId and status are required" });
//   }

//   const sql = "INSERT INTO `REASON_` (`S_ID`,Reason,`Status_`) VALUES (?, ?, ?);";
//   db.query(sql, [studentId,text,status_], (err, result) => {
//     if (err) {
//       console.error("Insert Error:", err);
//       return res.status(500).json({ message: "Database error" });
//     }
//     res.json({ message: "Reason inserted successfully" });
//   });

// });

// Fetching all PDFs
app.get("/api/student-pdfs", (req, res) => {
  console.log("Fetching all PDFs");
  const sql = "SELECT * FROM student_pdfs";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching PDFs:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json(results);
  });
});

// Fetching PDFs for a specific student
app.get("/api/student-pdfs/:studentId", (req, res) => {
  const studentId = req.params.studentId;
  const sql = "SELECT * FROM student_pdfs WHERE student_id = ?";
  db.query(sql, [studentId], (err, results) => {
    if (err) {
      console.error("Error fetching PDFs:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json(results);
  });
});

// Adding a new PDF
// app.post("/api/student-pdfs", (req, res) => {
//   const { student_id, pdf_name, pdf_src, upload_date } = req.body;

//   if (!student_id || !pdf_name || !pdf_src) {
//     return res
//       .status(400)
//       .json({ message: "Student ID, PDF name, and PDF source are required" });
//   }

//   const sql =
//     "INSERT INTO student_pdfs (student_id, pdf_name, pdf_src, upload_date) VALUES (?, ?, ?, DATE_FORMAT(UTC_TIMESTAMP(), '%Y-%m-%d'))";
//   db.query(sql, [student_id, pdf_name, pdf_src], (err, result) => {
//     if (err) {
//       console.error("Error inserting PDF:", err);
//       return res.status(500).json({ message: "Database error" });
//     }
//     res.json({ message: "PDF added successfully", id: result.insertId });
//   });
// });

//  static files
// Serve the uploads_pdfs folder as static files
app.use("/uploads_pdfs", express.static(path.join(__dirname, "uploads_pdfs")));

// ✅ Create log entry (used by Logger.jsx)
app.post("/api/log-entry", (req, res) => {
  const { S_ID, student_name, faculty_name, time_date, comment, venue } =
    req.body;

  console.log("Received log data:", req.body);

  if (!faculty_name || !time_date || !comment || !venue) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = `
    INSERT INTO faculty_logger (S_ID, student_name, faculty_name, time_date, comment, venue)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      S_ID && S_ID.trim() !== "" ? S_ID : null,
      student_name && student_name.trim() !== "" ? student_name : null,
      faculty_name,
      time_date,
      comment,
      venue,
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting log:", err);
        return res
          .status(500)
          .json({ error: "Failed to create log", details: err.message });
      }
      res.status(201).json({ message: "Log entry created" });
    }
  );
});

// ✅ POST a revoked complaint
// app.post("/api/revoked", (req, res) => {
//   const { roll_no, s_name, reason, complaint_id } = req.body;

//   if (!roll_no || !s_name || !reason || !complaint_id) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   const sql = `INSERT INTO REASON_ (Roll_no, S_name, REASON, STATUS_, complaint_id)
//                VALUES (?, ?, ?, NULL, ?)`;

//   db.query(sql, [roll_no, s_name, reason, complaint_id], (err, result) => {
//     if (err) {
//       console.error("Insert error:", err);
//       return res.status(500).json({ error: "Database insert failed", details: err.message });
//     }
//     res.status(201).json({ message: "Revoked complaint created", id: result.insertId });
//   });
// });

// INSERTING INTO REASON TABLE
app.post("/api/reason", (req, res) => {
  const { complaintCode, reason } = req.body;

  if (!complaintCode || !reason) {
    return res
      .status(400)
      .json({ error: "Complaint Code and Reason are required." });
  }

  const fetchQuery = `
    SELECT student_name, S_ID, comment 
    FROM faculty_logger 
    WHERE complaint_id = ?
  `;

  db.query(fetchQuery, [complaintCode], (fetchErr, fetchResult) => {
    if (fetchErr) {
      console.error("Error fetching from faculty_logger:", fetchErr);
      return res.status(500).json({ error: "Database fetch error" });
    }

    if (fetchResult.length === 0) {
      return res
        .status(404)
        .json({ error: "Complaint ID not found in faculty_logger." });
    }

    const { student_name, S_ID, comment } = fetchResult[0];

    
    const insertQuery = `
      INSERT INTO reason_ (complaint_id, REASON, student_name, Roll_no, issue)
      VALUES (?, ?, ?, ?, ?)
    `;
    const insertValues = [complaintCode, reason, student_name, S_ID, comment];

    db.query(insertQuery, insertValues, (insertErr, insertResult) => {
      if (insertErr) {
        console.error("Error inserting into reason_:", insertErr);
        return res.status(500).json({ error: "Database insert error" });
      }
      res
        .status(200)
        .json({ message: "Reason and related info submitted successfully." });
    });
  });
});

// ✅ GET all revoked complaints with joined info
app.get("/api/revoked", (req, res) => {
  const sql = ` SELECT * FROM reason_ `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching revoked complaints:", err);
      return res
        .status(500)
        .json({ error: "Database error", details: err.message });
    }
    res.json(results);
  });
});

// ✅ Accept / Decline complaint
// app.put("/api/revoked/:roll_no", (req, res) => {
//   const { status } = req.body;
//   const roll_no = req.params.roll_no;

//   if (status !== "Accepted" && status !== "Declined") {
//     return res.status(400).json({ error: "Invalid status value" });
//   }

//   const sql = "UPDATE REASON_ SET STATUS_ = ? WHERE Roll_no = ?";
//   db.query(sql, [status, roll_no], (err, result) => {
//     if (err) {
//       console.error("Error updating revoked complaint status:", err);
//       return res.status(500).json({ error: "Failed to update complaint status", details: err.message });
//     }
//     res.json({ message: `Complaint ${status}` });
//   });
// });

app.put("/api/revoked/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const updateFacultyLogger = `UPDATE faculty_logger SET status = ? WHERE complaint_id = ?`;
  const updateReason = `UPDATE reason_ SET Status_ = ? WHERE complaint_id = ?`;

  // Update faculty_logger table
  db.query(updateFacultyLogger, [status, id], (err, result1) => {
    if (err) {
      console.error("Error updating faculty_logger:", err);
      return res
        .status(500)
        .json({ error: "Error updating faculty_logger", details: err.message });
    }

    // Update reason table
    db.query(updateReason, [status, id], (err, result2) => {
      if (err) {
        console.error("Error updating reason:", err);
        return res
          .status(500)
          .json({ error: "Error updating reason table", details: err.message });
      }

      // If both updates succeed
      res
        .status(200)
        .json({ message: "Status updated successfully in both tables!" });
    });
  });
});


const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "_" + file.originalname;
    cb(null, uniqueName);
  },
});


// ✅ GET logs with missing S_ID and student_name (for Support Desk)
app.get("/api/support-logs", (req, res) => {
  const sql = `
    SELECT * FROM faculty_logger
    WHERE S_ID IS NULL OR student_name IS NULL
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching support logs:", err);
      return res
        .status(500)
        .json({ error: "Database error", details: err.message });
    }
    res.json(results);
  });
});


const upload = multer({ storage });
app.post("/api/support/send", upload.single("video"), (req, res) => {
  const { complaint_id } = req.body;
  const videoPath = req.file ? req.file.path : null;

  if (!complaint_id || !videoPath) {
    return res.status(400).json({ error: "Missing data" });
  }

  const sql = `
    INSERT INTO mentor_queue (complaint_id, video_path)
    VALUES (?, ?)
  `;
  db.query(sql, [complaint_id, videoPath], (err, result) => {
    if (err) {
      console.error("Error sending to mentor:", err);
      return res.status(500).json({ error: "Send failed" });
    }
    res.status(200).json({ message: "Sent to mentor" });
  });
});


// ✅ GET mentor queue (videos forwarded from support desk)
app.get("/api/mentor-queue", (req, res) => {
  const sql = "SELECT * FROM mentor_queue";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching mentor queue:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// ✅ Mentor submits complaint to faculty_logger
app.post("/api/mentor/submit", (req, res) => {
  const { complaint_id, S_ID, student_name } = req.body;

  if (!complaint_id || !S_ID || !student_name) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = `
    UPDATE faculty_logger 
    SET S_ID = ?, student_name = ? 
    WHERE complaint_id = ?
  `;

  db.query(sql, [S_ID, student_name, complaint_id], (err, result) => {
    if (err) {
      console.error(" UPDATE ERROR:", err);
      return res
        .status(500)
        .json({ error: "Update failed", details: err.message });
    }

    res.status(200).json({ message: "Log updated with student details" });
  });
});

// Fetch from Faculty Logger
app.get("/faculty-logger", (req, res) => {
  const query = "SELECT * FROM faculty_logger ORDER BY complaint_id DESC";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching faculty logger data:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});



// INSERTING meeting details
app.post("/api/meeting-details", (req, res) => {
  console.log("Request Body:", req.body);
  const { studentId, venue, date, time, reason } = req.body;

  if (!studentId || !venue || !date || !time || !reason) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = `
    INSERT INTO meeting_details (S_ID, VENUE, DATE_, TIME_, INFO, STATUS_)
    VALUES (?, ?, STR_TO_DATE(?, '%Y-%m-%d'), ?, ?, 'pending')
  `;

  db.query(sql, [studentId, venue, date, time, reason], (err, result) => {
    if (err) {
      console.error("Error inserting data into meeting_details:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.status(201).json({ message: "Meeting details added successfully" });
  });
});



// Update the freeze column in the admin_ table
// app.put("/api/admin/freeze", (req, res) => {
//   console.log("Request Body:", req.body); // Debugging log
//   const { id } = req.body;

//   if (!id) {
//     return res.status(400).json({ message: "ID is required" });
//   }

//   const updateFreezeSql = `
//     UPDATE admin_ 
//     SET freeze = 1 
//     WHERE ID = ?
//   `;

//   db.query(updateFreezeSql, [id], (err, result) => {
//     if (err) {
//       console.error("Error updating freeze column:", err);
//       return res.status(500).json({ message: "Failed to update freeze column" });
//     }

//     console.log("Freeze column update result:", result);
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "No matching row found to update" });
//     }

//     res.status(200).json({ message: "Freeze column updated successfully" });
//   });
// });



// FOR FETCHING meeting details in card
app.get("/api/meeting-details", (req, res) => {
  const sql = `
    SELECT No_ AS id, S_ID AS sId, VENUE AS venue, DATE_FORMAT(DATE_, '%d-%m-%Y') AS date, 
           TIME_FORMAT(TIME_, '%h:%i %p') AS time, INFO AS info, STATUS_ AS status
    FROM meeting_details
    ORDER BY DATE_ DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching meeting details:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json(results);
  });
});



//FOR UPDATING ATTENDANCE IN MEETING
app.post("/api/update-attendance", (req, res) => {
  const { sId, venue, date, status } = req.body;

  if (!sId || !venue || !date || !status) {
    console.error("Missing required fields:", req.body); // Debug log
    return res.status(400).json({ message: "Missing required fields" });
  }

  console.log("Received data:", req.body); // Debug log

  const sql = `
    UPDATE meeting_details 
    SET STATUS_ = ? 
    WHERE S_ID = ? AND VENUE = ? AND DATE_ = STR_TO_DATE(?, '%d-%m-%Y')
  `;

  db.query(sql, [status, sId, venue, date], (err, result) => {
    if (err) {
      console.error("Error updating attendance:", err); 
      return res
        .status(500)
        .json({ message: "Database error", error: err.message });
    }

    console.log("SQL Result:", result); 

    if (result.affectedRows > 0) {
      res.json({ message: "Attendance updated successfully" });
    } else {
      res.status(404).json({ message: "Meeting not found" });
    }
  });
});

// Fetch complaints for a specific student ID
app.get("/api/complaints/:S_ID", (req, res) => {
  const { S_ID } = req.params;

  const sql = `
    SELECT complaint_id, S_ID, student_name, faculty_name, time_date, comment, venue,
    TIMESTAMPDIFF(SECOND, NOW(), ADDTIME(time_date, '06:00:00')) AS time_remaining
    FROM faculty_logger
    WHERE S_ID = ?
    ORDER BY time_date DESC
  `;

  db.query(sql, [S_ID], (err, result) => {
    if (err) {
      console.error("Error fetching complaints:", err);
      return res.status(500).json({ error: "Failed to fetch complaints" });
    }

    res.status(200).json(result);
  });
});

// For updating history
app.put("/complaints/update-status/:sid/:complaint_id", (req, res) => {
  const { sid, complaint_id } = req.params; // Extract S_ID and complaint_id from URL
  const { status } = req.body; // Extract status from request body

  const sql =
    "UPDATE faculty_logger SET status = ? WHERE S_ID = ? AND complaint_id = ?";
  db.query(sql, [status, sid, complaint_id], (err, result) => {
    if (err) {
      console.error("Error updating complaint status:", err);
      return res.status(500).json({ error: "Failed to update status" });
    }

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "No matching complaint found to update" });
    }

    res.status(200).json({ message: "Status updated successfully" });
  });
});

// Endpoint to fetch complaint details
app.get("/complaints/detail/:complaint_id", (req, res) => {
  const { complaint_id } = req.params;

  const sql = "SELECT * FROM faculty_logger WHERE complaint_id = ?";
  db.query(sql, [complaint_id], (err, result) => {
    if (err) {
      console.error("Error fetching complaint details:", err);
      return res
        .status(500)
        .json({ error: "Failed to fetch complaint details" });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    res.status(200).json(result[0]); // Return the complaint details
  });
});

// updating Timer logic
app.put("/complaints/update-timer/:complaint_id", (req, res) => {
  const { complaint_id } = req.params;
  const { remaining_time } = req.body;

  const sql = "UPDATE faculty_logger SET remaining_time = ? WHERE complaint_id = ?";
  db.query(sql, [remaining_time, complaint_id], (err, result) => {
    if (err) {
      console.error("Error updating timer:", err);
      return res.status(500).json({ error: "Failed to update timer" });
    }

    res.status(200).json({ message: "Timer updated successfully" });
  });
});

//updating expired time
app.put("/complaints/set-expired/:complaint_id", (req, res) => {
  const { complaint_id } = req.params;
  const { expired_time } = req.body;

  const sql = "UPDATE faculty_logger SET expired_time = ?, remaining_time = '00:00:00' WHERE complaint_id = ?";
  db.query(sql, [expired_time, complaint_id], (err, result) => {
    if (err) {
      console.error("Error setting expired time:", err);
      return res.status(500).json({ error: "Failed to set expired time" });
    }

    res.status(200).json({ message: "Expired time set successfully" });
  });
});



// Insert into admin_ table
app.post("/send-to-admin", (req, res) => {
  const { student_name, S_ID, Date_, Time_, Venue, Comment, faculty } =
    req.body;

  console.log("Received payload:", req.body);

  const query = `
    INSERT INTO admin_ (student_name, S_ID, Date_, Time_, Venue, Comment, faculty)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(
    query,
    [student_name, S_ID, Date_, Time_, Venue, Comment, faculty],
    (err, result) => {
      if (err) {
        console.error("Error inserting into admin_:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json({
        message: "Complaint forwarded successfully",
        id: result.insertId,
      });
    }
  );
});

// fetching complaints from admin table
app.get("/api/admin-all", (req, res) => {
  const query = `SELECT ID, student_name, S_ID, Date_, Time_, Venue, Comment, faculty FROM admin_ ORDER BY ID DESC`;
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching admin complaints:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});


//Adding pdf 
const pdfStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads_pdfs/"), // Save PDFs in the new folder
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "_" + file.originalname;
    cb(null, uniqueName);
  },
});

const uploadPDF = multer({ storage: pdfStorage });

// Adding a new PDF with Multer
app.post("/api/student-pdfs", uploadPDF.single("pdf"), (req, res) => {
  const { student_id } = req.body;

  // Validate input
  if (!student_id || !req.file) {
    return res
      .status(400)
      .json({ message: "Student ID and PDF file are required" });
  }

  // Generate PDF details
  const pdf_name = `Apology Letter ${student_id}`; // Fixed naming convention
  const pdf_src = `/uploads_pdfs/${req.file.filename}`; // Path to the uploaded file
  const upload_date = new Date(); // Current date for upload_date
  

  // Insert into the database
  const sql =
    "INSERT INTO student_pdfs (student_id, pdf_name, pdf_src, upload_date) VALUES (?, ?, ?, DATE_FORMAT(UTC_TIMESTAMP(), '%Y-%m-%d'))";

  db.query(sql, [student_id, pdf_name, pdf_src], (err, result) => {
    if (err) {
      console.error("Error inserting PDF:", err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json({
      message: "PDF uploaded and added successfully",
      id: result.insertId,
    });
  });
});



// ==========================================
// GEO-VISION DIGITAL GOVERNANCE REST ENDPOINTS
// ==========================================

const INITIAL_GEO_TICKETS = [
  {
    id: "GV-CBE-8801",
    title: "Deep Road Cave-in / Pothole",
    category: "POTHOLE",
    categoryLabel: "Pothole & Road Damage",
    department: "Coimbatore Roads & Infrastructure Dept",
    severityScore: 92,
    severityLabel: "Critical",
    confidence: 0.96,
    estimatedDepthCm: 18,
    estimatedAreaSqM: 3.2,
    status: "Pending",
    citizenImpactCount: 6,
    reportedAt: "2026-08-20T08:15:00Z",
    citizenName: "Karthik R. (Gandhipuram)",
    citizenPhone: "+91 9876543210",
    location: {
      lat: 11.0168,
      lng: 76.9558,
      address: "Cross Cut Road Signal, Gandhipuram Zone 2 (Central), Coimbatore",
      ward: "Ward 42",
    },
    beforeImage: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80",
    imageHash: "a1b2c3d4e5f67890",
    gradCamData: {
      centerX: 48,
      centerY: 52,
      radius: 28,
      intensity: 0.94,
      hotspots: [{ x: 48, y: 52, val: 0.95 }, { x: 55, y: 58, val: 0.88 }],
      layerName: "ConvLayer_4_ResNet",
    },
    history: [
      { timestamp: "2026-08-20T08:15:00Z", action: "Report Submitted", actor: "Citizen (Karthik R.)" },
      { timestamp: "2026-08-20T08:15:02Z", action: "CV Classification & Severity Score (92/100 Critical)", actor: "Geo-Vision CV Engine" },
      { timestamp: "2026-08-20T08:15:03Z", action: "Geo-Routed to Coimbatore Roads & Infrastructure Dept", actor: "Geo-Routing Engine" },
    ],
  },
  {
    id: "GV-CBE-8802",
    title: "Major Water Pipeline Burst",
    category: "WATER_LEAK",
    categoryLabel: "Water Pipeline Leakage / Pipe Burst",
    department: "Coimbatore City Metro Water Board",
    severityScore: 88,
    severityLabel: "Critical",
    confidence: 0.98,
    estimatedDepthCm: null,
    estimatedAreaSqM: 8.5,
    status: "In Progress",
    assignedOfficer: "Officer Subramaniam V. (ID: CBE-W-402)",
    citizenImpactCount: 11,
    reportedAt: "2026-08-20T06:30:00Z",
    citizenName: "Priya S. (Peelamedu)",
    citizenPhone: "+91 9840123456",
    location: {
      lat: 11.0285,
      lng: 76.9950,
      address: "Avinashi Road, Near PSG Tech, Peelamedu Zone 3, Coimbatore",
      ward: "Ward 38",
    },
    beforeImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80",
    imageHash: "f9e8d7c6b5a43210",
    gradCamData: {
      centerX: 42,
      centerY: 45,
      radius: 32,
      intensity: 0.91,
      hotspots: [{ x: 42, y: 45, val: 0.98 }],
      layerName: "ConvLayer_4_ResNet",
    },
    history: [
      { timestamp: "2026-08-20T06:30:00Z", action: "Report Submitted", actor: "Citizen (Priya S.)" },
      { timestamp: "2026-08-20T07:05:00Z", action: "Assigned to Officer Subramaniam V.", actor: "Dept Dispatch" },
    ],
  },
];

let memoryGeoTickets = [...INITIAL_GEO_TICKETS];

app.get("/api/geovision/health", (req, res) => {
  res.json({ status: "ok", app: "Geo-Vision", version: "2.0.0", activeTickets: memoryGeoTickets.length });
});

app.get("/api/geovision/tickets", (req, res) => {
  const { category, status, department, search } = req.query;
  let filtered = [...memoryGeoTickets];

  if (category) filtered = filtered.filter(t => t.category === category);
  if (status) filtered = filtered.filter(t => t.status === status);
  if (department) filtered = filtered.filter(t => t.department === department);
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(t => 
      t.title.toLowerCase().includes(q) || 
      t.id.toLowerCase().includes(q) || 
      t.location.address.toLowerCase().includes(q)
    );
  }

  // Priority ranking: Critical severity first, then reportedAt
  filtered.sort((a, b) => b.severityScore - a.severityScore);
  res.json(filtered);
});

app.get("/api/geovision/tickets/:id", (req, res) => {
  const ticket = memoryGeoTickets.find(t => t.id === req.params.id);
  if (!ticket) return res.status(404).json({ message: "Ticket not found" });
  res.json(ticket);
});

app.post("/api/geovision/tickets", (req, res) => {
  const newTicket = req.body;
  if (!newTicket.id) {
    newTicket.id = `GV-2026-${Math.floor(8800 + Math.random() * 1000)}`;
  }
  if (!newTicket.reportedAt) {
    newTicket.reportedAt = new Date().toISOString();
  }
  memoryGeoTickets.unshift(newTicket);
  res.status(201).json({ message: "Ticket created successfully", ticket: newTicket });
});

app.post("/api/geovision/tickets/:id/resolve", (req, res) => {
  const { id } = req.params;
  const { afterImage, verification } = req.body;
  const ticket = memoryGeoTickets.find(t => t.id === id);

  if (!ticket) return res.status(404).json({ message: "Ticket not found" });

  ticket.afterImage = afterImage;
  ticket.resolutionVerification = verification;

  if (verification && verification.verified) {
    ticket.status = "Resolved";
    ticket.resolvedAt = new Date().toISOString();
    ticket.history.push({
      timestamp: new Date().toISOString(),
      action: `CV Resolution Verified (${verification.visualMatchPercent || 90}% Match)`,
      actor: "Geo-Vision CV Verification Loop",
    });
  } else {
    ticket.status = "Reopened_Audit";
    ticket.history.push({
      timestamp: new Date().toISOString(),
      action: `Resolution Verification Failed: Re-opened for Audit Review`,
      actor: "Geo-Vision CV Verification Loop",
    });
  }

  res.json({ message: "Ticket updated with resolution verification", ticket });
});

app.post("/api/geovision/tickets/:id/upvote", (req, res) => {
  const ticket = memoryGeoTickets.find(t => t.id === req.params.id);
  if (!ticket) return res.status(404).json({ message: "Ticket not found" });

  ticket.citizenImpactCount = (ticket.citizenImpactCount || 1) + 1;
  ticket.history.push({
    timestamp: new Date().toISOString(),
    action: `Citizen Upvoted Issue (Impact Count: ${ticket.citizenImpactCount})`,
    actor: "Citizen Portal",
  });

  res.json({ message: "Ticket upvoted", ticket });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

