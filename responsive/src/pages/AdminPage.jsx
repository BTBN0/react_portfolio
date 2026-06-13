import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogoMotion from "../components/ui/LogoMotion";
import {
  listCertifications,
  listProjects,
  addCertification,
  addProject,
  deleteCertification,
  deleteProject,
} from "../lib/content";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

export default function AdminPage() {
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem("admin_authed") === "true"
  );
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_authed", "true");
      setAuthed(true);
    } else {
      setError("Буруу нууц үг");
    }
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <form onSubmit={handleLogin} className="w-full max-w-sm px-6">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 outline-none focus:border-white/50"
          />
          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
          <button
            type="submit"
            className="mt-4 w-full rounded-full bg-white text-black font-semibold py-3 hover:opacity-90 transition"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return <AdminDashboard />;
}

function AdminDashboard() {
  const [certs, setCerts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    try {
      const [c, p] = await Promise.all([listCertifications(), listProjects()]);
      setCerts(c);
      setProjects(p);
    } catch (err) {
      console.error("Failed to load content:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-8 py-10">
      <div className="fixed top-4 left-4 sm:top-6 sm:left-8 z-50">
        <LogoMotion />
      </div>

      <div className="max-w-5xl mx-auto pt-16">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <Link to="/certifications" className="text-white/60 hover:text-white text-sm">
            View page →
          </Link>
        </div>

        <Section
          title="Certifications"
          items={certs}
          loading={loading}
          fields={["name", "bio"]}
          onAdd={async (data) => {
            await addCertification(data);
            refresh();
          }}
          onDelete={async (id) => {
            await deleteCertification(id);
            refresh();
          }}
        />

        <Section
          title="Projects"
          items={projects}
          loading={loading}
          fields={["name", "bio", "link"]}
          onAdd={async (data) => {
            await addProject(data);
            refresh();
          }}
          onDelete={async (id) => {
            await deleteProject(id);
            refresh();
          }}
        />
      </div>
    </div>
  );
}

function Section({ title, items, loading, fields, onAdd, onDelete }) {
  const [form, setForm] = useState({ name: "", bio: "", link: "" });
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name) return;
    setSubmitting(true);
    try {
      await onAdd({ ...form, imageFile });
      setForm({ name: "", bio: "", link: "" });
      setImageFile(null);
      e.target.reset();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mb-16">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 border border-white/10 rounded-2xl p-6"
      >
        {fields.includes("name") && (
          <input
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Name"
            className="bg-transparent border border-white/20 rounded-lg px-4 py-2 outline-none focus:border-white/50"
          />
        )}
        {fields.includes("link") && (
          <input
            value={form.link}
            onChange={(e) => setForm((f) => ({ ...f, link: e.target.value }))}
            placeholder="Link (https://...)"
            className="bg-transparent border border-white/20 rounded-lg px-4 py-2 outline-none focus:border-white/50"
          />
        )}
        {fields.includes("bio") && (
          <textarea
            value={form.bio}
            onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
            placeholder="Bio / Description"
            rows={3}
            className="sm:col-span-2 bg-transparent border border-white/20 rounded-lg px-4 py-2 outline-none focus:border-white/50 resize-none"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
          className="sm:col-span-2 text-sm text-white/70"
        />
        <button
          type="submit"
          disabled={submitting}
          className="sm:col-span-2 rounded-full bg-white text-black font-semibold py-2 hover:opacity-90 transition disabled:opacity-50"
        >
          {submitting ? "Adding..." : "Add"}
        </button>
      </form>

      {loading ? (
        <p className="text-white/50">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-white/50">No items yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item.id} className="border border-white/10 rounded-2xl p-4">
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
              )}
              <div className="font-semibold">{item.name}</div>
              {item.bio && <p className="text-sm text-white/60 mt-1">{item.bio}</p>}
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-blue-400 mt-1 block break-all"
                >
                  {item.link}
                </a>
              )}
              <button
                onClick={() => onDelete(item.id)}
                className="mt-3 text-sm text-red-400 hover:text-red-300"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
