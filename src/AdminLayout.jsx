import Sidebar from "./components/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ padding: "20px", flex: 1 , background:"#ffffffff"}}>{children}</div>
    </div>
  );
}
