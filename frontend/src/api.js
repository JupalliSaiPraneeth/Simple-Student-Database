import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/students",
});



export const addStudent = (student) => API.post("/", student);
export const getStudent = (rollNo) => API.get(`/${rollNo}`);
export const updateStudent = (rollNo, updatedData) => API.put(`/${rollNo}`, updatedData);
export const deleteStudent = (rollNo) => API.delete(`/${rollNo}`);
