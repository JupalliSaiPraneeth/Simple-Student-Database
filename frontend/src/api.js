import axios from "axios";

const API = axios.create({
  baseURL: "https://simple-student-database-5.onrender.com/api/students",
});



export const addStudent = (student) => API.post("/", student);
export const getStudent = (rollNo) => API.get(`/${rollNo}`);
export const updateStudent = (rollNo, updatedData) => API.put(`/${rollNo}`, updatedData);
export const deleteStudent = (rollNo) => API.delete(`/${rollNo}`);
