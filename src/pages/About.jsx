import { useEffect, useState } from "react";
import api from "../services/api.js";
import AdminLayout from "../AdminLayout";

export default function About() {
  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");
  const [heroTagline, setHeroTagline] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [originalResume, setOriginalResume] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchAbout = async () => {
    try {
      const res = await api.get("/about");
      if (res.data.about) {
        setHeroTitle(res.data.about.heroTitle || "");
        setHeroSubtitle(res.data.about.heroSubtitle || "");
        setHeroTagline(res.data.about.heroTagline || "");
        setResumeUrl(res.data.about.resumeUrl || "");
        setOriginalResume(res.data.about.resumeUrl || "");
      }
    } catch {
      setError("Failed to load about info");
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  const updateAbout = async () => {
    if (!heroTitle.trim() || !heroSubtitle.trim() || !heroTagline.trim()) {
      setError("Hero text fields are required");
      return;
    }

    const payload = {
      heroTitle,
      heroSubtitle,
      heroTagline,
    };

    if (resumeUrl.trim() !== originalResume.trim()) {
      payload.resumeUrl = resumeUrl;
    }

    try {
      const res = await api.put("/about", payload);
      setSuccess(res.data.message);
      setOriginalResume(resumeUrl);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
      setSuccess("");
    }
  };

  return (
    <AdminLayout>
      <div style={styles.container}>
        <h1 style={styles.title}>About Section</h1>

        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}

        <div style={styles.form}>
          <input
            style={styles.input}
            placeholder="Hero Title"
            value={heroTitle}
            onChange={(e) => setHeroTitle(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="Hero Subtitle"
            value={heroSubtitle}
            onChange={(e) => setHeroSubtitle(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="Hero Tagline"
            value={heroTagline}
            onChange={(e) => setHeroTagline(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="Resume URL"
            value={resumeUrl}
            onChange={(e) => setResumeUrl(e.target.value)}
          />

          <button style={styles.updateBtn} onClick={updateAbout}>
            Save About Section
          </button>
        </div>
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
    textAlign: "center",
    marginBottom: "10px",
  },
  success: {
    color: "#4ade80",
    textAlign: "center",
    marginBottom: "10px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    outline: "none",
    background: "#1e1a2b",
    color: "white",
  },
  updateBtn: {
    marginTop: "10px",
    background: "#9333ea",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "12px",
    cursor: "pointer",
  },
};
