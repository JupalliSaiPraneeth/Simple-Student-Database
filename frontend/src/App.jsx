import AddStudent from "./components/AddStudent";
import GetStudent from "./components/GetStudent";
import ManageStudent from "./components/ManageStudent";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>🎓 Student Database Admin</h1>
      <AddStudent />
      <hr />
      <GetStudent />
      <hr />
      <ManageStudent />
    </div>
  );
}

export default App;
