import { useEffect, useState } from "react";
import { API } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  const [projectName, setProjectName] = useState("");
  const [taskTitle, setTaskTitle] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const taskRes = await API.get("/tasks");
      const projRes = await API.get("/projects");

      setTasks(taskRes.data);
      setProjects(projRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  const createProject = async () => {
    try {
      await API.post("/projects", {
        name: projectName,
        description: "Created from frontend",
      });

      setProjectName("");
      fetchData();
    } catch (err) {
      alert("Error creating project");
    }
  };

  const createTask = async () => {
    try {
      await API.post("/tasks", {
        title: taskTitle,
        status: "todo",
      });

      setTaskTitle("");
      fetchData();
    } catch (err) {
      alert("Error creating task");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow"
        >
          Logout
        </button>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-3">Create Project</h3>

          <input
            className="w-full border p-2 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />

          <button
            onClick={createProject}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
          >
            Create Project
          </button>

          <h2 className="text-lg font-semibold mt-5 mb-2">Projects</h2>

          <div className="space-y-2">
            {projects.map((p) => (
              <div
                key={p._id}
                className="p-2 bg-gray-50 border rounded-lg"
              >
                {p.name}
              </div>
            ))}
          </div>
        </div>

        
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-3">Create Task</h3>

          <input
            className="w-full border p-2 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter task title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />

          <button
            onClick={createTask}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
          >
            Add Task
          </button>

          <h2 className="text-lg font-semibold mt-5 mb-2">Tasks</h2>

          <div className="space-y-2">
            {tasks.map((t) => (
              <div
                key={t._id}
                className="p-2 bg-gray-50 border rounded-lg flex justify-between"
              >
                <span>{t.title}</span>
                <span className="text-sm text-gray-500">{t.status}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}