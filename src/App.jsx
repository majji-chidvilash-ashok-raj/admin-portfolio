import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./protectedRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Education from "./pages/Education";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/skills"
        element={
          <PrivateRoute>
            <Skills />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/projects"
        element={
          <PrivateRoute>
            <Projects />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/about"
        element={
          <PrivateRoute>
            <About />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/education"
        element={
          <PrivateRoute>
            <Education />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
