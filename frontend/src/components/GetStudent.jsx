import { useState } from "react";
import { getStudent } from "../api";

export default function GetStudent() {
  const [rollNo, setRollNo] = useState("");
  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      const { data } = await getStudent(rollNo);
      setStudent(data);
      setError("");
    } catch {
      setStudent(null);
      setError("❌ Student not found");
    }
  };

  return (
    <div>
      <h2>Search Student</h2>
      <input placeholder="Enter Roll No" value={rollNo} onChange={e => setRollNo(e.target.value)} />
      <button onClick={handleSearch}>Search</button>

      {student && (
        <div>
          <h3>Student Details</h3>
          <p><b>Name:</b> {student.name}</p>
          <p><b>Roll No:</b> {student.rollNo}</p>
          <p><b>Department:</b> {student.department}</p>
          <p><b>CGPA:</b> {student.cgpa}</p>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}
