import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js";
import AdminLayout from "../AdminLayout";

export default function Dashboard() {
  const navigate = useNavigate();

  const [counts, setCounts] = useState({
    skills: 0,
    projects: 0,
    education: 0,
  });

  const [system, setSystem] = useState({
    online: false,
    latency: null,
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const start = performance.now();

        const [skillsRes, projectsRes, educationRes] = await Promise.all([
          api.get("/skills"),
          api.get("/projects"),
          api.get("/education"),
        ]);

        const end = performance.now();

        setCounts({
          skills: skillsRes.data.skills.length,
          projects: projectsRes.data.projects.length,
          education: educationRes.data.education.length,
        });

        setSystem({
          online: true,
          latency: Math.round(end - start),
        });
      } catch {
        setSystem({
          online: false,
          latency: null,
        });
        setError("Backend is not reachable");
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <AdminLayout>
      <div style={styles.container}>
        <h1 style={styles.title}>Admin Dashboard</h1>
        <p style={styles.subtitle}>Welcome back, Chidvilash</p>

        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.cards}>
          <div style={styles.card}>
            <h2>{counts.skills}</h2>
            <p>Total Skills</p>
            <button style={styles.btn} onClick={() => navigate("/admin/skills")}>
              Manage Skills
            </button>
          </div>

          <div style={styles.card}>
            <h2>{counts.projects}</h2>
            <p>Total Projects</p>
            <button style={styles.btn} onClick={() => navigate("/admin/projects")}>
              Manage Projects
            </button>
          </div>

          <div style={styles.card}>
            <h2>{counts.education}</h2>
            <p>Education Entries</p>
            <button style={styles.btn} onClick={() => navigate("/admin/education")}>
              Manage Education
            </button>
          </div>

          <div style={styles.card}>
            <h2 style={{ color: system.online ? "#4ade80" : "#f87171" }}>
              {system.online ? "Online" : "Offline"}
            </h2>
            <p>Backend Status</p>
            <small style={{ color: "#c4b5fd" }}>
              {system.latency !== null
                ? `Response time: ${system.latency} ms`
                : "No response"}
            </small>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

const styles = {
  container: {
    background: "#2c1a3f",
    margin: "20px",
    padding: "30px",
    borderRadius: "12px",
    color: "white",
    minHeight: "80vh",
  },
  title: {
    marginBottom: "5px",
  },
  subtitle: {
    marginBottom: "25px",
    color: "#c4b5fd",
  },
  error: {
    color: "#f87171",
    marginBottom: "15px",
  },
  cards: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },
  card: {
    flex: "1 1 240px",
    background: "#1e1a2b",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
  },
  btn: {
    marginTop: "10px",
    padding: "8px 12px",
    background: "#9333ea",
    border: "none",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
  },
};
