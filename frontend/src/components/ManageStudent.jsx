import { useState } from "react";
import { updateStudent, deleteStudent } from "../api";

export default function ManageStudent() {
  const [rollNo, setRollNo] = useState("");
  const [updateData, setUpdateData] = useState({ name: "", department: "", cgpa: "" });
  const [message, setMessage] = useState("");

  const handleUpdate = async () => {
    try {
      const { data } = await updateStudent(rollNo, updateData);
      setMessage(`✅ ${data.message}`);
    } catch (err) {
      const msg = err?.response?.data?.message || "Error updating student";
      setMessage(`❌ ${msg}`);
    }
  };

  const handleDelete = async () => {
    try {
      const { data } = await deleteStudent(rollNo);
      setMessage(`✅ ${data.message}`);
    } catch (err) {
      const msg = err?.response?.data?.message || "Error deleting student";
      setMessage(`❌ ${msg}`);
    }
  };

  return (
    <div>
      <h2>Update / Delete Student</h2>
      <input
        placeholder="Roll No"
        value={rollNo}
        onChange={(e) => setRollNo(e.target.value)}
      />

      <h3>Update Student Details</h3>
      <input
        placeholder="New Name"
        value={updateData.name}
        onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })}
      />
      <input
        placeholder="New Department"
        value={updateData.department}
        onChange={(e) => setUpdateData({ ...updateData, department: e.target.value })}
      />
      <input
        type="number"
        placeholder="New CGPA"
        value={updateData.cgpa}
        onChange={(e) => setUpdateData({ ...updateData, cgpa: e.target.value })}
      />
      <button onClick={handleUpdate}>Update</button>

      <h3>Delete Student</h3>
      <button onClick={handleDelete}>Delete</button>

      <p>{message}</p>
    </div>
  );
}
