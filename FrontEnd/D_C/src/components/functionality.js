import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../pages/firebase";

const USER_STORAGE_KEY = "campusiq_user";

export const saveUserSession = (user) => {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
};

export const getStoredUser = () => {
  try {
    const savedUser = localStorage.getItem(USER_STORAGE_KEY);
    return savedUser ? JSON.parse(savedUser) : null;
  } catch (error) {
    return null;
  }
};

export const handleRegister = async (name, email, password) => {
  try {
    const response = await axios.post("http://localhost:5000/api/register", {
      name,
      email,
      password,
    });

    return {
      success: true,
      message: response.data.message,
      user: response.data,
    };
  } catch (error) {
    const message =
      error?.response?.data?.message || "Registration failed. Please try again.";
    return { success: false, message };
  }
};

export const handleLogin = async (email, password, navigate) => {
  try {
    const response = await axios.post("http://localhost:5000/api/login", {
      username: email,
      password,
    });

    const { route, S_ID, name, email: userEmail, id, username } = response.data;
    const user = {
      id: S_ID || id || username || "7376242AD267",
      name: name || username || "Rahul K",
      email: userEmail || `${username || "user"}@bitsathy.ac.in`,
      studentId: S_ID || null,
      route: route || "/student1_1",
    };

    saveUserSession(user);
    alert(response.data.message || "Login successful");
    navigate(user.route, { state: { studentId: user.id, studentName: user.name, ...user } });
    return true;
  } catch (error) {
    console.error("Login error:", error);
    const message =
      error?.response?.data?.message || "An error occurred during login. Please try again.";
    alert(message);
    return false;
  }
};

// Google Sign-In logic
export const handleGoogleLogin = async (navigate) => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    console.log("Google User:", user);

    if (user.email === "manoranjanm.ad24@bitsathy.ac.in") {
      const sessionUser = {
        id: "7376242AD267",
        name: "Rahul K",
        email: "rahulk.ad24@bitsathy.ac.in",
        studentId: "7376242AD267",
        dept: "Artificial Intelligence and Data Science",
        route: "/student1_1",
      };
      saveUserSession(sessionUser);
      navigate("/student1_1");
    } else if (user.email === "manomurugesh2007@gmail.com") {
      const sessionUser = {
        id: "ADM001",
        name: "System Admin",
        email: "admin@bitsathy.ac.in",
        route: "/admin1",
      };
      saveUserSession(sessionUser);
      navigate("/admin1");
    } else {
      alert("Access Denied! Only authorized users can log in.");
    }
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    alert("Google Sign-In failed. Please try again.");
  }
};

export const handleStaticLogin = (usernameInput, passwordInput, navigate) => {
  if (!usernameInput || !passwordInput) return false;

  const inputLower = usernameInput.trim().toLowerCase();

  const staticUserList = [
    // 1. Admin
    {
      keys: ["admin"],
      password: "@min",
      id: "ADM001",
      name: "System Admin",
      email: "admin@bitsathy.ac.in",
      route: "/admin1",
      role: "Admin",
    },

    // 2. Students
    {
      keys: ["7376242ad267", "rahul", "rahulk.ad24@bitsathy.ac.in"],
      password: "pass",
      id: "7376242AD267",
      name: "Rahul K",
      email: "rahulk.ad24@bitsathy.ac.in",
      dept: "Artificial Intelligence and Data Science",
      phone: "8610834388",
      route: "/student1_1",
      role: "Student",
    },
    {
      keys: ["7376242ad292", "sanjiv", "sanjiv.ad24@bitsathy.ac.in"],
      password: "pass",
      id: "7376242AD292",
      name: "Sanjiv",
      email: "sanjiv.ad24@bitsathy.ac.in",
      dept: "Artificial Intelligence and Data Science",
      phone: "9597537616",
      route: "/student1_1",
      role: "Student",
    },
    {
      keys: ["7376242it314", "sujan", "sujan.it24@bitsathy.ac.in"],
      password: "pass",
      id: "7376242IT314",
      name: "Sujan",
      email: "sujan.it24@bitsathy.ac.in",
      dept: "Information Technology",
      phone: "9080936050",
      route: "/student1_1",
      role: "Student",
    },

    // 3. Parents
    {
      keys: ["parent", "kanagaraj", "kanagaraj@bitsathy.ac.in"],
      password: "pass",
      id: "7376242AD267",
      name: "Kanagaraj",
      email: "kanagaraj@bitsathy.ac.in",
      phone: "8610834388",
      linkedStudent: "Rahul K",
      route: "/parent/dashboard",
      role: "Parent",
    },
    {
      keys: ["parent2", "venkatachalam", "venkatachalam@bitsathy.ac.in"],
      password: "pass",
      id: "7376242AD292",
      name: "Venkatachalam",
      email: "venkatachalam@bitsathy.ac.in",
      phone: "9842547616",
      linkedStudent: "Sanjiv",
      route: "/parent/dashboard",
      role: "Parent",
    },
    {
      keys: ["parent3", "palanisamy", "palanisamy@bitsathy.ac.in"],
      password: "pass",
      id: "7376242IT314",
      name: "Palanisamy",
      email: "palanisamy@bitsathy.ac.in",
      phone: "9371838902",
      linkedStudent: "Sujan",
      route: "/parent/dashboard",
      role: "Parent",
    },

    // 4. Faculty
    {
      keys: ["faculty", "arunkumar", "arunkumar@bitsathy.ac.in"],
      password: "pass",
      id: "FAC001",
      name: "Dr. Arun Kumar",
      email: "arunkumar@bitsathy.ac.in",
      dept: "Artificial Intelligence and Data Science (AIDS)",
      designation: "Associate Professor",
      route: "/faculty/dashboard",
      role: "Faculty",
    },
    {
      keys: ["faculty2", "sathishkumar", "sathishkumar@bitsathy.ac.in"],
      password: "pass",
      id: "FAC002",
      name: "Dr. Sathishkumar",
      email: "sathishkumar@bitsathy.ac.in",
      dept: "Computer Science & Engineering (CSE)",
      designation: "Professor",
      route: "/faculty/dashboard",
      role: "Faculty",
    },
  ];

  // Merge newly created users from Admin local storage
  try {
    const savedUserList = localStorage.getItem("campusiq_user_list");
    if (savedUserList) {
      const parsedList = JSON.parse(savedUserList);
      if (Array.isArray(parsedList)) {
        parsedList.forEach((u) => {
          if (!u || !u.name) return;
          const uName = String(u.name || "").trim().toLowerCase();
          const uEmail = String(u.email || "").trim().toLowerCase();
          const uId = String(u.id || "").trim().toLowerCase();
          const emailPrefix = uEmail.includes("@") ? uEmail.split("@")[0] : uName;
          
          let userRoute = "/student1_1";
          if (u.role === "Parent") userRoute = "/parent/dashboard";
          else if (u.role === "Faculty") userRoute = "/faculty/dashboard";
          else if (u.role === "Admin") userRoute = "/admin1";

          staticUserList.push({
            keys: [uName, uEmail, uId, emailPrefix],
            password: u.role === "Admin" ? "@min" : "pass",
            id: u.id || `u_${Date.now()}`,
            studentId: u.id || `u_${Date.now()}`,
            name: u.name,
            email: u.email,
            dept: u.department || "AI & Data Science",
            route: userRoute,
            role: u.role || "Student",
          });
        });
      }
    }
  } catch (e) {
    console.warn("Could not parse campusiq_user_list for login:", e);
  }

  const matchedUser = staticUserList.find((u) => {
    const isPasswordMatch =
      u.password === passwordInput ||
      passwordInput === "pass" ||
      (u.role === "Admin" && passwordInput === "@min");

    const isKeyMatch = u.keys.some(
      (k) =>
        k === inputLower ||
        (k && k.length >= 2 && (inputLower.includes(k) || k.includes(inputLower)))
    );

    return isKeyMatch && isPasswordMatch;
  });

  if (matchedUser) {
    const sessionUser = {
      id: matchedUser.id,
      name: matchedUser.name,
      email: matchedUser.email,
      studentId: matchedUser.id,
      dept: matchedUser.dept || "",
      phone: matchedUser.phone || "",
      linkedStudent: matchedUser.linkedStudent || matchedUser.name,
      role: matchedUser.role,
      route: matchedUser.route,
    };

    saveUserSession(sessionUser);
    navigate(matchedUser.route, { state: sessionUser });
    return true;
  }

  return false;
};