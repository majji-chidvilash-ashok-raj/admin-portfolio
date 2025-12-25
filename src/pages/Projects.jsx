import { useEffect, useState } from "react";
import api from "../services/api.js";
import AdminLayout from "../AdminLayout";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [github, setGithub] = useState("");
  const [live, setLive] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data.projects);
    } catch {
      setError("Failed to load projects");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const addProject = async () => {
    if (!title.trim() || !shortDescription.trim() || !icon.trim() || !github.trim()) {
      setError("Title, description, icon and GitHub link are required");
      return;
    }

    try {
      const res = await api.post("/projects", {
        title,
        shortDescription,
        icon,
        github,
        live,
      });

      setProjects([res.data.project, ...projects]);
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || "Add failed");
    }
  };

  const getProjectById = async (id) => {
    try {
      const res = await api.get(`/projects/${id}`);
      const p = res.data.project;

      setEditingId(p._id);
      setTitle(p.title);
      setShortDescription(p.shortDescription);
      setIcon(p.icon);
      setGithub(p.github);
      setLive(p.live || "");
      setError("");
    } catch {
      setError("Failed to load project");
    }
  };

  const updateProject = async () => {
    if (!editingId) return;

    try {
      const res = await api.put(`/projects/${editingId}`, {
        title,
        shortDescription,
        icon,
        github,
        live,
      });

      setProjects(
        projects.map((p) =>
          p._id === editingId ? res.data.project : p
        )
      );

      resetForm();
    } catch {
      setError("Update failed");
    }
  };

  const deleteProject = async (id) => {
    try {
      await api.delete(`/projects/${id}`);
      setProjects(projects.filter((p) => p._id !== id));
    } catch {
      setError("Delete failed");
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setShortDescription("");
    setIcon("");
    setGithub("");
    setLive("");
    setError("");
  };

  return (
    <AdminLayout>
      <div style={styles.container}>
        <h1 style={styles.title}>Projects</h1>

        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.form}>
          <input style={styles.input} placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input style={styles.input} placeholder="Short description" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} />
          <input style={styles.input} placeholder="Icon (emoji or class)" value={icon} onChange={(e) => setIcon(e.target.value)} />
          <input style={styles.input} placeholder="GitHub link" value={github} onChange={(e) => setGithub(e.target.value)} />
          <input style={styles.input} placeholder="Live link (optional)" value={live} onChange={(e) => setLive(e.target.value)} />

          {editingId ? (
            <button style={styles.updateBtn} onClick={updateProject}>
              Update Project
            </button>
          ) : (
            <button style={styles.addBtn} onClick={addProject}>
              Add Project
            </button>
          )}
        </div>

        <ul style={styles.list}>
          {projects.map((p) => (
            <li key={p._id} style={styles.listItem}>
              <div>
                <strong>{p.icon} {p.title}</strong>
                <p style={styles.desc}>{p.shortDescription}</p>
                <small style={styles.meta}>{p.github}</small>
              </div>

              <div>
                <button style={styles.viewBtn} onClick={() => getProjectById(p._id)}>
                  View
                </button>
                <button style={styles.deleteBtn} onClick={() => deleteProject(p._id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </AdminLayout>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    background: "#2c1a3f",
    padding: "30px",
    borderRadius: "12px",
    color: "white",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  error: {
    color: "#f87171",
    textAlign: "center",
    marginBottom: "15px",
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "25px",
  },
  input: {
    flex: "1 1 45%",
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    outline: "none",
    background: "#1e1a2b",
    color: "white",
  },
  addBtn: {
    background: "#9333ea",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "10px",
    cursor: "pointer",
  },
  updateBtn: {
    background: "#7e22ce",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "10px",
    cursor: "pointer",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    background: "#1e1a2b",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  desc: {
    fontSize: "14px",
    color: "#c4b5fd",
    margin: "4px 0",
  },
  meta: {
    fontSize: "12px",
    color: "#a78bfa",
  },
  viewBtn: {
    marginRight: "8px",
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "6px 10px",
    cursor: "pointer",
  },
  deleteBtn: {
    background: "#dc2626",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "6px 10px",
    cursor: "pointer",
  },
};
