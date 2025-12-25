import { useEffect, useState } from "react";
import api from "../services/api.js"
import AdminLayout from "../AdminLayout";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  
  const fetchSkills = async () => {
    try {
      const res = await api.get("/skills");
      setSkills(res.data.skills);
    } catch (err) {
      setError("Failed to load skills");
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const addSkill = async () => {
    if (!name.trim() || !description.trim()) {
      setError("Name and description are required");
      return;
    }

    try {
      const res = await api.post("/skills", {
        name,
        description,
      });

      setSkills([res.data.skill, ...skills]);
      setName("");
      setDescription("");
      setError("");
    } catch (err) {
      console.error(err.response?.data);
  setError(err.response?.data?.message || "Add failed");
    }
  };

  // Update skill (PROTECTED)
  const updateSkill = async () => {
    if (!editingId) return;

    if (!name.trim() || !description.trim()) {
      setError("Name and description are required");
      return;
    }

    try {
      const res = await api.put(`/skills/${editingId}`, {
        name,
        description,
      });

      setSkills(
        skills.map((s) =>
          s._id === editingId ? res.data.skill : s
        )
      );

      setEditingId(null);
      setName("");
      setDescription("");
      setError("");
    } catch (err) {
      setError("Update failed");
    }
  };

  // Delete skill (PROTECTED)
  const deleteSkill = async (id) => {
    try {
      await api.delete(`/skills/${id}`);
      setSkills(skills.filter((s) => s._id !== id));
    } catch (err) {
      setError("Delete failed");
    }
  };

  return (
    <AdminLayout>
      <div style={styles.container}>
        <h1 style={styles.title}>Skills</h1>

        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.form}>
          <input
            style={styles.input}
            type="text"
            placeholder="Skill name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            style={styles.input}
            type="text"
            placeholder="Skill description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {editingId ? (
            <button style={styles.updateBtn} onClick={updateSkill}>
              Update Skill
            </button>
          ) : (
            <button style={styles.addBtn} onClick={addSkill}>
              Add Skill
            </button>
          )}
        </div>

        <ul style={styles.list}>
          {skills.map((skill) => (
            <li key={skill._id} style={styles.listItem}>
              <div>
                <strong>{skill.name}</strong>
                <p style={styles.desc}>{skill.description}</p>
              </div>

              <div>
                <button
                  style={styles.editBtn}
                  onClick={() => {
                    setEditingId(skill._id);
                    setName(skill.name);
                    setDescription(skill.description);
                  }}
                >
                  Edit
                </button>

                <button
                  style={styles.deleteBtn}
                  onClick={() => deleteSkill(skill._id)}
                >
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
    maxWidth: "800px",
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
    marginBottom: "15px",
    textAlign: "center",
  },

  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "25px",
  },

  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    outline: "none",
    background: "#1e1a2b",
    color: "white",
  },

  addBtn: {
    padding: "10px 14px",
    background: "#9333ea",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  updateBtn: {
    padding: "10px 14px",
    background: "#7e22ce",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  list: {
    listStyle: "none",
    padding: 0,
  },

  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px",
    borderRadius: "8px",
    background: "#1e1a2b",
    marginBottom: "10px",
  },

  desc: {
    margin: "4px 0 0",
    fontSize: "14px",
    color: "#c4b5fd",
  },

  editBtn: {
    marginRight: "8px",
    padding: "6px 10px",
    background: "#f59e0b",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  deleteBtn: {
    padding: "6px 10px",
    background: "#dc2626",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
