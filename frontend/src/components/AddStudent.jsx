/* eslint-disable no-unused-vars */
// frontend/src/components/AddStudent.jsx
import { useState } from "react";
import { addStudent } from "../api";

export default function AddStudent() {
  const [student, setStudent] = useState({
    name: "",
    rollNo: "",
    department: "",
    cgpa: ""
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const validate = (fields = student) => {
    const e = {};
    if (!fields.name || !fields.name.trim()) e.name = "Name is required";
    if (!fields.rollNo || !fields.rollNo.trim()) e.rollNo = "Roll No is required";
    if (!fields.department || !fields.department.trim()) e.department = "Department is required";

    if (fields.cgpa === "" || fields.cgpa === null || fields.cgpa === undefined) {
      e.cgpa = "CGPA is required";
    } else {
      const n = Number(fields.cgpa);
      if (Number.isNaN(n)) e.cgpa = "CGPA must be a number";
      else if (n < 0 || n > 10) e.cgpa = "CGPA must be between 0 and 10";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    const updated = { ...student, [field]: value };
    setStudent(updated);

    // re-validate just this field for immediate feedback
    const fieldErrors = { ...errors };
    // run validate on the updated object, but only keep errors that are still present:
    validate(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!validate()) return; // prevents submission if any field missing/invalid

    try {
      const payload = {
        ...student,
        cgpa: Number(student.cgpa)
      };
      const { data } = await addStudent(payload);
      setMessage(data?.message || "Student added successfully!");
      setStudent({ name: "", rollNo: "", department: "", cgpa: "" });
      setErrors({});
    } catch (err) {
      // show backend error message if available
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Error adding student";
      setMessage(`❌ ${msg}`);
    }
  };

  return (
    <div style={{ maxWidth: 520 }}>
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div style={{ marginBottom: 8 }}>
          <input
            placeholder="Name"
            value={student.name}
            onChange={handleChange("name")}
            style={{ width: "100%", padding: 8 }}
          />
          {errors.name && <div style={{ color: "red", fontSize: 13 }}>{errors.name}</div>}
        </div>

        <div style={{ marginBottom: 8 }}>
          <input
            placeholder="Roll No"
            value={student.rollNo}
            onChange={handleChange("rollNo")}
            style={{ width: "100%", padding: 8 }}
          />
          {errors.rollNo && <div style={{ color: "red", fontSize: 13 }}>{errors.rollNo}</div>}
        </div>

        <div style={{ marginBottom: 8 }}>
          <input
            placeholder="Department"
            value={student.department}
            onChange={handleChange("department")}
            style={{ width: "100%", padding: 8 }}
          />
          {errors.department && <div style={{ color: "red", fontSize: 13 }}>{errors.department}</div>}
        </div>

        <div style={{ marginBottom: 12 }}>
          <input
            placeholder="CGPA (0 - 10)"
            value={student.cgpa}
            onChange={handleChange("cgpa")}
            style={{ width: "100%", padding: 8 }}
            inputMode="decimal"
          />
          {errors.cgpa && <div style={{ color: "red", fontSize: 13 }}>{errors.cgpa}</div>}
        </div>

        <button type="submit" style={{ padding: "8px 16px" }}>
          Add Student
        </button>
      </form>

      {message && <p style={{ marginTop: 12 }}>{message}</p>}
    </div>
  );
}
