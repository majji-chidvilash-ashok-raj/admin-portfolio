import Sidebar from "./components/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100dvh",
        flexWrap: "wrap"
      }}
    >
      <Sidebar />

      <div
        style={{
          padding: "20px",
          flex: 1,
          background: "#ffffffff",
          minWidth: 0 
        }}
      >
        {children}
      </div>
    </div>
  );
}
