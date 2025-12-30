import { useEffect, useState } from "react";
import api from "../services/api.js";
import AdminLayout from "../AdminLayout";

export default function Education() {
  const [education, setEducation] = useState([]);

  const [title, setTitle] = useState("");
  const [school, setSchool] = useState("");
  const [year, setYear] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const fetchEducation = async () => {
    try {
      const res = await api.get("/education");
      setEducation(res.data.education);
    } catch {
      setError("Failed to load education");
    }
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  const addEducation = async () => {
    if (!title.trim() || !school.trim() || !year.trim()) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await api.post("/education", {
        title,
        school,
        year,
        imgUrl,
      });

      setEducation([res.data.education, ...education]);
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || "Add failed");
    }
  };

  const updateEducation = async () => {
    if (!editingId) return;

    try {
      const res = await api.put(`/education/${editingId}`, {
        title,
        school,
        year,
        imgUrl,
      });

      setEducation(
        education.map((e) =>
          e._id === editingId ? res.data.education : e
        )
      );

      resetForm();
    } catch {
      setError("Update failed");
    }
  };

  const deleteEducation = async (id) => {
    try {
      await api.delete(`/education/${id}`);
      setEducation(education.filter((e) => e._id !== id));
    } catch {
      setError("Delete failed");
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setSchool("");
    setYear("");
    setImgUrl("");
    setError("");
  };

  return (
    <AdminLayout>
      <div style={styles.container}>
        <h1 style={styles.title}>Education</h1>

        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.form}>
          <input
            style={styles.input}
            placeholder="Degree / Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="School / College"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="Image URL"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
          />

          {imgUrl && (
            <img
              src={imgUrl}
              alt="Preview"
              style={styles.preview}
              onError={(e) => (e.target.style.display = "none")}
            />
          )}

          {editingId ? (
            <button style={styles.updateBtn} onClick={updateEducation}>
              Update Education
            </button>
          ) : (
            <button style={styles.addBtn} onClick={addEducation}>
              Add Education
            </button>
          )}
        </div>

        <ul style={styles.list}>
          {education.map((e) => (
            <li key={e._id} style={styles.listItem}>
              <div style={styles.left}>
                {e.imgUrl && (
                  <img
                    src={e.imgUrl}
                    alt={e.school}
                    style={styles.image}
                    onError={(ev) => (ev.target.style.display = "none")}
                  />
                )}

                <div>
                  <strong>{e.title}</strong>
                  <p style={styles.desc}>{e.school}</p>
                  <small style={styles.meta}>{e.year}</small>
                </div>
              </div>

              <div>
                <button
                  style={styles.editBtn}
                  onClick={() => {
                    setEditingId(e._id);
                    setTitle(e.title);
                    setSchool(e.school);
                    setYear(e.year);
                    setImgUrl(e.imgUrl || "");
                  }}
                >
                  Edit
                </button>

                <button
                  style={styles.deleteBtn}
                  onClick={() => deleteEducation(e._id)}
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
    flex: "1 1 30%",
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    outline: "none",
    background: "#1e1a2b",
    color: "white",
  },
  preview: {
    width: "80px",
    height: "80px",
    objectFit: "contain",
    borderRadius: "8px",
    background: "#1e1a2b",
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
  left: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  image: {
    width: "60px",
    height: "60px",
    objectFit: "contain",
    borderRadius: "6px",
    background: "#0f0a1a",
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
  editBtn: {
    marginRight: "8px",
    background: "#f59e0b",
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
