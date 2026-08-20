import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  InputAdornment,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Stack,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PeopleIcon from "@mui/icons-material/People";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const USER_LIST_KEY = "campusiq_user_list";

const defaultRosterUsers = [
  { id: "7376242AD267", name: "Rahul K", email: "rahulk.ad24@bitsathy.ac.in", role: "Student", department: "AI & Data Science", status: "Active" },
  { id: "7376242AD292", name: "Sanjiv", email: "sanjiv.ad24@bitsathy.ac.in", role: "Student", department: "AI & Data Science", status: "Active" },
  { id: "7376242IT314", name: "Sujan", email: "sujan.it24@bitsathy.ac.in", role: "Student", department: "Information Technology", status: "Active" },
  { id: "7376242AD267", name: "Kanagaraj", email: "kanagaraj@bitsathy.ac.in", role: "Parent", department: "AI & Data Science", status: "Active" },
  { id: "7376242AD292", name: "Venkatachalam", email: "venkatachalam@bitsathy.ac.in", role: "Parent", department: "AI & Data Science", status: "Active" },
  { id: "7376242IT314", name: "Palanisamy", email: "palanisamy@bitsathy.ac.in", role: "Parent", department: "Information Technology", status: "Active" },
  { id: "FAC001", name: "Dr. Arun Kumar", email: "arunkumar@bitsathy.ac.in", role: "Faculty", department: "AIDS (Associate Prof.)", status: "Active" },
  { id: "FAC002", name: "Dr. Sathishkumar", email: "sathishkumar@bitsathy.ac.in", role: "Faculty", department: "CSE (Prof.)", status: "Active" },
  { id: "ADM001", name: "System Admin", email: "admin@bitsathy.ac.in", role: "Admin", department: "Administration", status: "Active" },
];

export default function AdminUserManagement() {
  const [users, setUsers] = useState(defaultRosterUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");

  // Create User Modal state
  const [openModal, setOpenModal] = useState(false);
  const [newUserId, setNewUserId] = useState("");
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState("Student");
  const [newDept, setNewDept] = useState("AI & Data Science");

  // Edit Role Modal state
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editRole, setEditRole] = useState("Student");

  // Snackbar Toast
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  // Map old IDs (1, 2, 3, u_178...) to clean student/faculty IDs
  const cleanUserId = (user) => {
    const nameLower = (user.name || "").toLowerCase();
    const emailLower = (user.email || "").toLowerCase();

    if (nameLower.includes("rahul")) return "7376242AD267";
    if (nameLower.includes("sanjiv")) return "7376242AD292";
    if (nameLower.includes("sujan")) return "7376242IT314";
    if (nameLower.includes("kanagaraj")) return "7376242AD267";
    if (nameLower.includes("venkatachalam")) return "7376242AD292";
    if (nameLower.includes("palanisamy")) return "7376242IT314";
    if (nameLower.includes("arun")) return "FAC001";
    if (nameLower.includes("sathish")) return "FAC002";
    if (nameLower.includes("admin")) return "ADM001";
    if (nameLower.includes("jagan")) return "7376242AD213";

    if (!user.id || user.id === "1" || user.id === "2" || user.id === "3" || user.id === "4" || user.id === "5" || user.id === "6" || user.id === "7" || user.id.startsWith("u_")) {
      return user.role === "Faculty" ? "FAC" + Math.floor(100 + Math.random() * 900) : "7376242AD" + Math.floor(100 + Math.random() * 900);
    }
    return user.id;
  };

  // Initialize and load saved users safely with deduplication
  useEffect(() => {
    try {
      const saved = localStorage.getItem(USER_LIST_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const seen = new Set();
          const deduplicated = [];

          parsed.forEach((u) => {
            if (!u || !u.name) return;
            const uniqueKey = (u.email || u.name).toLowerCase().trim() + "_" + (u.role || "Student");
            if (!seen.has(uniqueKey)) {
              seen.add(uniqueKey);
              deduplicated.push({
                id: cleanUserId(u),
                name: String(u.name || "User"),
                email: String(u.email || "user@bitsathy.ac.in"),
                role: String(u.role || "Student"),
                department: String(u.department || "AI & Data Science"),
                status: String(u.status || "Active"),
              });
            }
          });

          if (deduplicated.length > 0) {
            setUsers(deduplicated);
            localStorage.setItem(USER_LIST_KEY, JSON.stringify(deduplicated));
            return;
          }
        }
      }
    } catch (e) {
      console.warn("Resetting user list due to parse error:", e);
    }
    setUsers(defaultRosterUsers);
  }, []);

  const saveUserListToStorage = (newList) => {
    setUsers(newList);
    try {
      localStorage.setItem(USER_LIST_KEY, JSON.stringify(newList));
    } catch (e) {
      console.error("Error saving user list:", e);
    }
  };

  const handleResetRoster = () => {
    setUsers(defaultRosterUsers);
    try {
      localStorage.setItem(USER_LIST_KEY, JSON.stringify(defaultRosterUsers));
    } catch (e) {}
    setToastMsg("User roster reset to default clean state!");
    setToastOpen(true);
  };

  const safeUsers = Array.isArray(users) ? users : defaultRosterUsers;

  const filteredUsers = safeUsers.filter((u) => {
    if (!u) return false;
    const nameStr = (u.name || "").toLowerCase();
    const emailStr = (u.email || "").toLowerCase();
    const idStr = (u.id || "").toLowerCase();
    const roleStr = (u.role || "").toLowerCase();
    const deptStr = (u.department || "").toLowerCase();
    const query = (searchTerm || "").toLowerCase().trim();

    const matchesSearch =
      !query ||
      nameStr.includes(query) ||
      emailStr.includes(query) ||
      idStr.includes(query) ||
      roleStr.includes(query);

    const matchesDept =
      departmentFilter === "All" ||
      deptStr.includes(departmentFilter.toLowerCase());

    const matchesRole =
      roleFilter === "All" ||
      u.role === roleFilter;

    return matchesSearch && matchesDept && matchesRole;
  });

  const handleCreateUser = (e) => {
    if (e) e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) {
      setToastMsg("Please fill out all user details.");
      setToastOpen(true);
      return;
    }

    const assignedId = newUserId.trim()
      ? newUserId.trim()
      : newRole === "Faculty"
      ? "FAC" + Math.floor(100 + Math.random() * 900)
      : newRole === "Admin"
      ? "ADM" + Math.floor(100 + Math.random() * 900)
      : "7376242AD" + Math.floor(100 + Math.random() * 900);

    const newUser = {
      id: assignedId,
      name: newName.trim(),
      email: newEmail.trim(),
      role: newRole,
      department: newDept,
      status: "Active",
    };

    // Remove old versions of the same user if re-adding
    const filteredExisting = safeUsers.filter(
      (u) => (u.email || "").toLowerCase() !== newEmail.trim().toLowerCase()
    );

    const updatedList = [newUser, ...filteredExisting];
    saveUserListToStorage(updatedList);

    setNewUserId("");
    setNewName("");
    setNewEmail("");
    setOpenModal(false);
    setToastMsg(`User ${newName} (${assignedId}) created successfully as ${newRole}!`);
    setToastOpen(true);
  };

  const toggleUserStatus = (id) => {
    const updatedList = safeUsers.map((u) => {
      if (u.id === id) {
        const nextStatus = u.status === "Active" ? "Disabled" : "Active";
        setToastMsg(`User ${u.name} status changed to ${nextStatus}.`);
        setToastOpen(true);
        return { ...u, status: nextStatus };
      }
      return u;
    });
    saveUserListToStorage(updatedList);
  };

  const handleOpenEditRole = (user) => {
    setEditingUser(user);
    setEditRole(user?.role || "Student");
    setOpenEditModal(true);
  };

  const handleConfirmEditRole = () => {
    if (!editingUser) return;
    const updatedList = safeUsers.map((u) => (u.id === editingUser.id ? { ...u, role: editRole } : u));
    saveUserListToStorage(updatedList);

    setOpenEditModal(false);
    setToastMsg(`Updated ${editingUser.name}'s role to ${editRole}!`);
    setToastOpen(true);
  };

  const getRoleChipColor = (role) => {
    switch (role) {
      case "Admin":
        return { bgcolor: "#F3E8FF", color: "#7C3AED" };
      case "Faculty":
        return { bgcolor: "#E0F2FE", color: "#0369A1" };
      case "Parent":
        return { bgcolor: "#FEF3C7", color: "#92400E" };
      case "Student":
      default:
        return { bgcolor: "#EEF2FF", color: "#4338CA" };
    }
  };

  const getInitials = (name) => {
    if (!name || typeof name !== "string") return "U";
    const cleaned = name.replace(/^Dr\.\s+/i, "").trim();
    const parts = cleaned.split(" ").filter(Boolean);
    if (parts.length >= 2 && parts[0] && parts[1]) return (parts[0][0] + parts[1][0]).toUpperCase();
    return (parts[0] || "U").substring(0, 2).toUpperCase();
  };

  const getIdInputLabel = (role) => {
    switch (role) {
      case "Faculty":
        return "Faculty ID (e.g. FAC001)";
      case "Parent":
        return "Linked Student Register ID (e.g. 7376242AD213)";
      case "Admin":
        return "Admin ID (e.g. ADM002)";
      case "Student":
      default:
        return "Student Register ID (e.g. 7376242AD213)";
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F8FAFC",
        pt: "115px",
        pb: 4,
        pl: { xs: 2, md: "116px" },
        pr: { xs: 2, md: 3 },
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      }}
    >
      <Box sx={{ maxWidth: "1150px", mx: "auto" }}>
        {/* Header Banner */}
        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            mb: 2.5,
            borderRadius: "18px",
            bgcolor: "#FFFFFF",
            border: "1px solid #E2E8F0",
            boxShadow: "0 4px 20px rgba(15, 23, 42, 0.03)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: "12px",
                  bgcolor: "rgba(79, 70, 229, 0.12)",
                  color: "#4F46E5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PeopleIcon fontSize="medium" />
              </Box>
              <Box>
                <Typography
                  variant="h5"
                  sx={{ color: "#0F172A", fontWeight: 800, fontSize: "1.5rem", lineHeight: 1.2 }}
                >
                  User Management Control
                </Typography>
                <Typography variant="body2" sx={{ color: "#64748B", mt: 0.2 }}>
                  Manage accounts for Students (Rahul, Sanjiv, Sujan), Parents (Kanagaraj, Venkatachalam, Palanisamy), and Faculty
                </Typography>
              </Box>
            </Box>

            <Stack direction="row" spacing={1.5}>
              <Button
                variant="outlined"
                startIcon={<RestartAltIcon />}
                onClick={handleResetRoster}
                sx={{
                  borderColor: "#CBD5E1",
                  color: "#475569",
                  borderRadius: "12px",
                  px: 2,
                  py: 1,
                  fontWeight: 700,
                  textTransform: "none",
                  fontSize: "0.875rem",
                  "&:hover": { borderColor: "#94A3B8", bgcolor: "#F8FAFC" },
                }}
              >
                Reset Default Roster
              </Button>

              <Button
                variant="contained"
                startIcon={<PersonAddIcon />}
                onClick={() => setOpenModal(true)}
                sx={{
                  bgcolor: "#4F46E5",
                  color: "#FFFFFF",
                  borderRadius: "12px",
                  px: 2.5,
                  py: 1,
                  fontWeight: 700,
                  textTransform: "none",
                  fontSize: "0.9rem",
                  boxShadow: "0 4px 14px rgba(79, 70, 229, 0.25)",
                  "&:hover": { bgcolor: "#4338CA" },
                }}
              >
                Create New User
              </Button>
            </Stack>
          </Box>
        </Paper>

        {/* Filter Controls Bar */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 2.5,
            borderRadius: "16px",
            bgcolor: "#FFFFFF",
            border: "1px solid #E2E8F0",
            boxShadow: "0 2px 12px rgba(15, 23, 42, 0.02)",
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={5}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search user by name, ID, email, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#4F46E5" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    bgcolor: "#F8FAFC",
                    "& fieldset": { borderColor: "#E2E8F0" },
                    "&:hover fieldset": { borderColor: "#CBD5E1" },
                    "&.Mui-focused fieldset": { borderColor: "#4F46E5" },
                  },
                }}
              />
            </Grid>

            <Grid item xs={6} sm={3.5}>
              <FormControl fullWidth size="small">
                <InputLabel id="dept-filter-label">Filter Department</InputLabel>
                <Select
                  labelId="dept-filter-label"
                  value={departmentFilter}
                  label="Filter Department"
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  sx={{ borderRadius: "12px", bgcolor: "#F8FAFC" }}
                >
                  <MenuItem value="All">All Departments</MenuItem>
                  <MenuItem value="AI & Data Science">AI & Data Science (AD)</MenuItem>
                  <MenuItem value="Information Technology">Information Technology (IT)</MenuItem>
                  <MenuItem value="CSE">CSE</MenuItem>
                  <MenuItem value="Administration">Administration</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6} sm={3.5}>
              <FormControl fullWidth size="small">
                <InputLabel id="role-filter-label">Filter Role</InputLabel>
                <Select
                  labelId="role-filter-label"
                  value={roleFilter}
                  label="Filter Role"
                  onChange={(e) => setRoleFilter(e.target.value)}
                  sx={{ borderRadius: "12px", bgcolor: "#F8FAFC" }}
                >
                  <MenuItem value="All">All Roles</MenuItem>
                  <MenuItem value="Student">Student</MenuItem>
                  <MenuItem value="Parent">Parent</MenuItem>
                  <MenuItem value="Faculty">Faculty</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>

        {/* User Table List Container */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: "18px",
            bgcolor: "#FFFFFF",
            border: "1px solid #E2E8F0",
            overflow: "hidden",
            boxShadow: "0 4px 20px rgba(15, 23, 42, 0.03)",
          }}
        >
          <TableContainer>
            <Table sx={{ minWidth: 700 }}>
              <TableHead sx={{ bgcolor: "#F8FAFC" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, color: "#475569", py: 1.8 }}>User Name & Email</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#475569", py: 1.8 }}>User / Roll ID</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#475569", py: 1.8 }}>Role</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#475569", py: 1.8 }}>Department</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#475569", py: 1.8 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#475569", py: 1.8, textAlign: "right" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} sx={{ textAlign: "center", py: 4, color: "#64748B" }}>
                      No matching users found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => {
                    const roleStyle = getRoleChipColor(user?.role);
                    return (
                      <TableRow key={user.id + "_" + user.email} sx={{ "&:hover": { bgcolor: "#F8FAFC" } }}>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <Avatar sx={{ bgcolor: "#4F46E5", width: 38, height: 38, fontSize: "0.9rem", fontWeight: 700 }}>
                              {getInitials(user?.name)}
                            </Avatar>
                            <Box>
                              <Typography sx={{ fontWeight: 700, color: "#0F172A", fontSize: "0.925rem" }}>
                                {user?.name || "User"}
                              </Typography>
                              <Typography sx={{ color: "#64748B", fontSize: "0.775rem" }}>
                                {user?.email || "user@bitsathy.ac.in"}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>

                        <TableCell>
                          <Chip
                            label={user?.id || "N/A"}
                            size="small"
                            sx={{
                              bgcolor: "#F1F5F9",
                              color: "#334155",
                              fontWeight: 700,
                              fontSize: "0.775rem",
                              borderRadius: "8px",
                              fontFamily: "monospace",
                            }}
                          />
                        </TableCell>

                        <TableCell>
                          <Chip
                            label={user?.role || "Student"}
                            size="small"
                            sx={{
                              bgcolor: roleStyle.bgcolor,
                              color: roleStyle.color,
                              fontWeight: 700,
                              fontSize: "0.75rem",
                              borderRadius: "999px",
                            }}
                          />
                        </TableCell>

                        <TableCell sx={{ color: "#334155", fontWeight: 600, fontSize: "0.875rem" }}>
                          {user?.department || "General"}
                        </TableCell>

                        <TableCell>
                          <Chip
                            label={user?.status || "Active"}
                            size="small"
                            sx={{
                              bgcolor: user?.status === "Active" ? "#DCFCE7" : "#FEE2E2",
                              color: user?.status === "Active" ? "#166534" : "#991B1B",
                              fontWeight: 700,
                              fontSize: "0.75rem",
                              borderRadius: "999px",
                            }}
                          />
                        </TableCell>

                        <TableCell sx={{ textAlign: "right" }}>
                          <Stack direction="row" spacing={1} justifyContent="flex-end">
                            <Tooltip title="Edit Role">
                              <IconButton size="small" onClick={() => handleOpenEditRole(user)} sx={{ color: "#4F46E5", bgcolor: "#EEF2FF" }}>
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title={user?.status === "Active" ? "Disable User" : "Activate User"}>
                              <IconButton
                                size="small"
                                onClick={() => toggleUserStatus(user.id)}
                                sx={{
                                  color: user?.status === "Active" ? "#DC2626" : "#16A34A",
                                  bgcolor: user?.status === "Active" ? "#FEE2E2" : "#DCFCE7",
                                }}
                              >
                                {user?.status === "Active" ? <BlockIcon fontSize="small" /> : <CheckCircleOutlineIcon fontSize="small" />}
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Create User Modal Dialog */}
        <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: "16px", p: 1 } }}>
          <DialogTitle sx={{ fontWeight: 800, color: "#0F172A" }}>Create New User Account</DialogTitle>
          <Box component="form" onSubmit={handleCreateUser}>
            <DialogContent>
              <Stack spacing={2}>
                <TextField label="Full Name" size="small" fullWidth value={newName} onChange={(e) => setNewName(e.target.value)} required />
                <TextField label="College Email" size="small" fullWidth type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} required />
                <FormControl size="small" fullWidth>
                  <InputLabel>User Role</InputLabel>
                  <Select value={newRole} label="User Role" onChange={(e) => setNewRole(e.target.value)}>
                    <MenuItem value="Student">Student</MenuItem>
                    <MenuItem value="Parent">Parent</MenuItem>
                    <MenuItem value="Faculty">Faculty</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  label={getIdInputLabel(newRole)}
                  size="small"
                  fullWidth
                  value={newUserId}
                  onChange={(e) => setNewUserId(e.target.value)}
                  placeholder={newRole === "Faculty" ? "FAC001" : "7376242AD213"}
                  helperText="This ID will be saved & displayed in the top header upon login"
                  required
                />

                <FormControl size="small" fullWidth>
                  <InputLabel>Department</InputLabel>
                  <Select value={newDept} label="Department" onChange={(e) => setNewDept(e.target.value)}>
                    <MenuItem value="AI & Data Science">AI & Data Science (AD)</MenuItem>
                    <MenuItem value="Information Technology">Information Technology (IT)</MenuItem>
                    <MenuItem value="CSE">CSE</MenuItem>
                    <MenuItem value="Administration">Administration</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
              <Button onClick={() => setOpenModal(false)} sx={{ color: "#64748B" }}>Cancel</Button>
              <Button type="submit" variant="contained" sx={{ bgcolor: "#4F46E5", fontWeight: 700, borderRadius: "10px" }}>
                Create Account
              </Button>
            </DialogActions>
          </Box>
        </Dialog>

        {/* Edit Role Modal Dialog */}
        <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: "16px", p: 1 } }}>
          <DialogTitle sx={{ fontWeight: 800, color: "#0F172A" }}>Edit User Role</DialogTitle>
          <DialogContent>
            <Typography sx={{ color: "#64748B", fontSize: "0.875rem", mb: 2 }}>
              Update role assignment for <strong>{editingUser?.name}</strong>:
            </Typography>
            <FormControl size="small" fullWidth>
              <InputLabel>Role</InputLabel>
              <Select value={editRole} label="Role" onChange={(e) => setEditRole(e.target.value)}>
                <MenuItem value="Student">Student</MenuItem>
                <MenuItem value="Parent">Parent</MenuItem>
                <MenuItem value="Faculty">Faculty</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={() => setOpenEditModal(false)} sx={{ color: "#64748B" }}>Cancel</Button>
            <Button variant="contained" onClick={handleConfirmEditRole} sx={{ bgcolor: "#4F46E5", fontWeight: 700, borderRadius: "10px" }}>
              Save Role
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar Notification */}
        <Snackbar open={toastOpen} autoHideDuration={4000} onClose={() => setToastOpen(false)} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
          <Alert onClose={() => setToastOpen(false)} severity="success" sx={{ borderRadius: "12px", fontWeight: 600 }}>
            {toastMsg}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}