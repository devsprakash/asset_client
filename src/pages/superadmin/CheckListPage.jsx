import { useState } from "react";

// ─── Theme / Tokens ──────────────────────────────────────────────────────────
const P = "#0f4c61";
const P2 = "#153d5c";

const styles = {
  page: { minHeight: "100vh", background: "#f1f5f9", fontFamily: "'Segoe UI', sans-serif" },
  card: {
    background: "#fff", borderRadius: 16, border: "1px solid #e8edf3",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  },
  btn: (variant = "primary", sm = false) => ({
    display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer",
    border: variant === "primary" ? "none" : `1px solid ${variant === "danger" ? "#fca5a5" : "#e2e8f0"}`,
    borderRadius: 10, fontWeight: 600, fontSize: sm ? 12 : 13,
    padding: sm ? "6px 14px" : "9px 18px",
    background: variant === "primary" ? P : variant === "danger" ? "#fff5f5" : "#fff",
    color: variant === "primary" ? "#fff" : variant === "danger" ? "#dc2626" : "#374151",
    transition: "all 0.15s",
    outline: "none",
  }),
  chip: (color = "blue") => {
    const map = {
      blue: { bg: "#dbeafe", color: "#1d4ed8" },
      green: { bg: "#dcfce7", color: "#15803d" },
      red: { bg: "#fee2e2", color: "#dc2626" },
      orange: { bg: "#ffedd5", color: "#ea580c" },
      slate: { bg: "#f1f5f9", color: "#475569" },
      teal: { bg: "#e0f2fe", color: "#0369a1" },
      amber: { bg: "#fef3c7", color: "#d97706" },
      purple: { bg: "#f3e8ff", color: "#7c3aed" },
    };
    const c = map[color] || map.blue;
    return {
      display: "inline-flex", alignItems: "center", padding: "3px 10px",
      borderRadius: 20, fontSize: 11, fontWeight: 600,
      background: c.bg, color: c.color,
    };
  },
  input: {
    width: "100%", padding: "9px 12px", border: "1px solid #e2e8f0", borderRadius: 10,
    fontSize: 13, color: "#0f172a", outline: "none", boxSizing: "border-box", background: "#fff",
  },
  label: { fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 6, display: "block" },
};

// ─── Shared Components ────────────────────────────────────────────────────────

function TopBar({ title, subtitle, onBack, actions }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", background: "#fff", borderBottom: "1px solid #e8edf3", flexWrap: "wrap", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {onBack && (
          <button onClick={onBack} style={{ ...styles.btn("outline", true), padding: "7px 10px", borderRadius: 10 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
          </button>
        )}
        <div>
          <div style={{ fontWeight: 700, fontSize: 17, color: "#0f172a" }}>{title}</div>
          {subtitle && <div style={{ fontSize: 12, color: "#64748b", marginTop: 1 }}>{subtitle}</div>}
        </div>
      </div>
      {actions && <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>{actions}</div>}
    </div>
  );
}

function Tabs({ tabs, active, onChange, badge }) {
  return (
    <div style={{ display: "flex", gap: 0, padding: "0 20px", background: "#fff", borderBottom: "1px solid #e8edf3" }}>
      {tabs.map((t) => (
        <button key={t} onClick={() => onChange(t)} style={{
          padding: "13px 18px", fontSize: 13, fontWeight: active === t ? 700 : 500,
          color: active === t ? P : "#64748b", background: "none", border: "none",
          borderBottom: active === t ? `2px solid ${P}` : "2px solid transparent",
          cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
        }}>
          {t}
          {t === "Customer Requests" && badge && (
            <span style={{ background: "#ef4444", color: "#fff", borderRadius: 20, fontSize: 10, fontWeight: 700, padding: "1px 7px" }}>{badge}</span>
          )}
        </button>
      ))}
    </div>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <button onClick={() => onChange(!checked)} style={{
      width: 40, height: 22, borderRadius: 11, background: checked ? P : "#d1d5db",
      border: "none", cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0,
    }}>
      <span style={{
        position: "absolute", top: 2, left: checked ? 20 : 2, width: 18, height: 18,
        borderRadius: "50%", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        transition: "left 0.2s", display: "block",
      }} />
    </button>
  );
}

function Modal({ open, onClose, title, subtitle, children, footer }) {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(2px)" }} />
      <div style={{ ...styles.card, position: "relative", width: "100%", maxWidth: 480, maxHeight: "90vh", overflowY: "auto", zIndex: 1, borderRadius: 20, padding: "24px 24px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 17, color: "#0f172a" }}>{title}</div>
            {subtitle && <div style={{ fontSize: 12, color: "#64748b", marginTop: 3 }}>{subtitle}</div>}
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", padding: 4 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
        </div>
        {children}
        {footer && <div style={{ marginTop: 16, paddingTop: 12, borderTop: "1px solid #f1f5f9" }}>{footer}</div>}
      </div>
    </div>
  );
}

// ─── PAGE 1: Checklist List ────────────────────────────────────────────────────

const CHECKLISTS = [
  { id: 1, title: "Safety Inspection Q2 2024", category: "Safety", status: "Active", assigned: "2024-04-15", dueDate: "2024-06-30", submissions: 12, rate: 85, barColor: "#22c55e" },
  { id: 2, title: "Equipment Maintenance Check", category: "Maintenance", status: "Active", assigned: "2024-05-01", dueDate: "2024-06-15", submissions: 8, rate: 100, barColor: "#22c55e" },
  { id: 3, title: "Quality Assurance Audit", category: "Quality", status: "Overdue", assigned: "2024-05-20", dueDate: "2024-06-10", submissions: 3, rate: 42, barColor: "#f97316" },
  { id: 4, title: "Monthly Inspection Report", category: "Inspection", status: "Active", assigned: "2024-05-25", dueDate: "2024-06-25", submissions: 5, rate: 67, barColor: "#0ea5e9" },
  { id: 5, title: "Emergency Equipment Check", category: "Safety", status: "Draft", assigned: "2024-06-05", dueDate: "2024-07-05", submissions: 0, rate: 0, barColor: "#94a3b8" },
];

function StatusChip({ status }) {
  const map = { Active: "green", Overdue: "red", Draft: "slate" };
  return <span style={styles.chip(map[status] || "slate")}>{status}</span>;
}

function ChecklistCard({ item, onView }) {
  return (
    <div style={{ ...styles.card, padding: "18px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: "#0f172a", flex: 1, paddingRight: 8 }}>{item.title}</div>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
        <span style={styles.chip("teal")}>{item.category}</span>
        <StatusChip status={item.status} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
        {[["Assigned", item.assigned], ["Due Date", item.dueDate]].map(([k, v]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 12, color: "#94a3b8" }}>{k}</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#1e293b" }}>{v}</span>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "#94a3b8" }}>Submissions</span>
          <span style={{ width: 24, height: 24, borderRadius: "50%", background: "#e0f2fe", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: P }}>{item.submissions}</span>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 12, color: "#94a3b8" }}>Completion Rate</span>
        <span style={{ fontSize: 12, fontWeight: 600, color: "#475569" }}>{item.rate}%</span>
      </div>
      <div style={{ height: 6, borderRadius: 3, background: "#e2e8f0", marginBottom: 14, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${item.rate}%`, background: item.barColor, borderRadius: 3 }} />
      </div>
      <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: 12, display: "flex", gap: 8 }}>
        <button onClick={onView} style={{ ...styles.btn("outline", true), flex: 1, justifyContent: "center" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
          View
        </button>
        {[
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>,
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>,
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /></svg>,
        ].map((icon, i) => (
          <button key={i} style={{ ...styles.btn("outline", true), padding: "6px 10px" }}>{icon}</button>
        ))}
      </div>
    </div>
  );
}

function ChecklistListPage({ navigate }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = CHECKLISTS.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) &&
    (statusFilter === "All Status" || c.status === statusFilter)
  );

  return (
    <div style={styles.page}>
      <TopBar
        title="Checklist - Acme Corporation"
        subtitle="Manage assigned checklist and submissions"
        onBack={() => {}}
        actions={[
          <button key="add" style={styles.btn()} onClick={() => setModalOpen(true)}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg>
            Add New Checklist
          </button>
        ]}
      />

      <div style={{ padding: "20px 16px" }}>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginBottom: 20 }}>
          {[["Total Checklist", "5"], ["Active Checklist", "3"], ["Total Submissions", "28"], ["Avg Completion", "59%"]].map(([k, v]) => (
            <div key={k} style={{ ...styles.card, padding: "16px" }}>
              <div style={{ fontSize: 11, color: "#64748b", marginBottom: 6 }}>{k}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#0f172a" }}>{v}</div>
            </div>
          ))}
        </div>

        {/* Search/Filter */}
        <div style={{ ...styles.card, padding: "14px 16px", marginBottom: 20 }}>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 160, position: "relative" }}>
              <svg style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search forms..." style={{ ...styles.input, paddingLeft: 34 }} />
            </div>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ ...styles.input, width: "auto", minWidth: 130, cursor: "pointer" }}>
              {["All Status", "Active", "Overdue", "Draft"].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 14 }}>
          {filtered.map(item => (
            <ChecklistCard key={item.id} item={item} onView={() => navigate("customBuilder")} />
          ))}
        </div>
      </div>

      <CreateChecklistModal open={modalOpen} onClose={() => setModalOpen(false)} navigate={navigate} />
    </div>
  );
}

// ─── Create Checklist Modal ────────────────────────────────────────────────────

const MODAL_OPTIONS = [
  { icon: "📋", iconBg: "#f1f5f9", title: "Custom Checklist", desc: "Create a custom form for your team. Only visible to your organization.", page: "customBuilder" },
  { icon: "🌐", iconBg: "#f1f5f9", title: "Global Checklist", desc: "Create a global form to submit to Super Admin. Requires approval before use.", page: "globalBuilder" },
  { icon: "📊", iconBg: "#f0fdf4", title: "Import Checklist Fields", desc: "Upload an Excel sheet to auto-generate input fields.", page: "importChecklist" },
  { icon: "📑", iconBg: "#a855f7", title: "Select Checklist to Clone", desc: "Choose a checklist from the list below to create a copy.", page: "cloneChecklist" },
];

function CreateChecklistModal({ open, onClose, navigate }) {
  return (
    <Modal open={open} onClose={onClose} title="Create New Checklist" subtitle="Choose the type of checklist you want to create"
      footer={<button style={{ ...styles.btn("outline"), width: "100%", justifyContent: "center" }} onClick={onClose}>Cancel</button>}>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {MODAL_OPTIONS.map((opt, i) => (
          <div key={i} onClick={() => { onClose(); navigate(opt.page); }} style={{
            display: "flex", alignItems: "flex-start", gap: 14, padding: "14px 16px",
            border: "1px solid #e2e8f0", borderRadius: 14, cursor: "pointer",
            transition: "all 0.15s", position: "relative",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#f8fafc"; e.currentTarget.style.borderColor = "#cbd5e1"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = "#e2e8f0"; }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: opt.iconBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
              {opt.icon}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#0f172a", marginBottom: 3 }}>{opt.title}</div>
              <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.4 }}>{opt.desc}</div>
            </div>
            <div style={{ position: "absolute", top: 14, right: 14, width: 8, height: 8, borderRadius: "50%", background: "#ef4444" }} />
          </div>
        ))}
      </div>
    </Modal>
  );
}

// ─── PAGE 2: Global Checklist Builder ────────────────────────────────────────

const FIELD_TYPES = [
  { icon: "T", label: "Text Input" },
  { icon: "¶", label: "Text Area" },
  { icon: "▾", label: "Dropdown" },
  { icon: "☑", label: "Checkbox" },
  { icon: "★", label: "Rating" },
  { icon: "🖼", label: "Image Upload" },
  { icon: "✍", label: "Signature" },
];

const CUSTOMER_REQUESTS = [
  { id: 1, title: "Fire Safety Inspection", by: "John Smith", customer: "Acme Manufacturing Corp", category: "Safety", date: "2024-11-01", urgency: "High", status: "Pending" },
  { id: 2, title: "Electrical Equipment Safety Check", by: "Sarah Wilson", customer: "TechStart Inc.", category: "Equipment", date: "2024-10-30", urgency: "Medium", status: "Pending" },
  { id: 3, title: "Environmental Compliance Audit", by: "Mike Anderson", customer: "BuildCo Ltd", category: "Environmental", date: "2024-10-28", urgency: "Critical", status: "Under Review" },
  { id: 4, title: "Heavy Machinery Daily Checklist", by: "Anna Martinez", customer: "SafeWorks", category: "Safety", date: "2024-10-25", urgency: "Medium", status: "Pending" },
];

function UrgencyBadge({ urgency }) {
  const map = { High: "red", Medium: "amber", Critical: "red", Low: "slate" };
  return <span style={{ ...styles.chip(map[urgency] || "slate"), fontWeight: 700 }}>{urgency}</span>;
}

function AssignModal({ open, onClose }) {
  const [selected, setSelected] = useState([1]);
  const customers = [
    { id: 1, name: "Acme Corp" }, { id: 2, name: "TechStart Inc" },
    { id: 3, name: "BuildCo Ltd" }, { id: 4, name: "SafeWorks" },
  ];
  const toggle = (id) => setSelected(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  return (
    <Modal open={open} onClose={onClose} title="Assign Checklist to Customers & Assets"
      subtitle="Select customers and their specific assets that will use this inspection form"
      footer={
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{ ...styles.btn("outline"), flex: 1, justifyContent: "center" }} onClick={onClose}>Cancel</button>
          <button style={{ ...styles.btn(), flex: 1, justifyContent: "center" }} onClick={onClose}>Assign</button>
        </div>
      }>
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 10 }}>Select Customers</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
          {customers.map(c => (
            <div key={c.id} onClick={() => toggle(c.id)} style={{
              display: "flex", alignItems: "center", gap: 8, padding: "10px 12px",
              border: `2px solid ${selected.includes(c.id) ? P : "#e2e8f0"}`,
              borderRadius: 12, cursor: "pointer", background: selected.includes(c.id) ? `rgba(15,76,97,0.05)` : "#fff",
              transition: "all 0.15s",
            }}>
              <div style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${selected.includes(c.id) ? P : "#e2e8f0"}`, background: selected.includes(c.id) ? P : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {selected.includes(c.id) && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>}
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={P} strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#0f172a" }}>{c.name}</span>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}

function GlobalChecklistBuilderPage({ navigate }) {
  const [tab, setTab] = useState("Checklist Builder");
  const [assignOpen, setAssignOpen] = useState(false);

  return (
    <div style={styles.page}>
      <TopBar
        title="Global Checklist Builder"
        subtitle="Create and manage inspection forms and review customer requests"
        onBack={() => navigate("list")}
        actions={[
          <button key="prev" style={styles.btn("outline", true)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
            Preview
          </button>,
          <button key="assign" style={styles.btn()} onClick={() => setAssignOpen(true)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg>
            Assign to Customers
          </button>
        ]}
      />
      <Tabs tabs={["Checklist Builder", "Customer Requests"]} active={tab} onChange={setTab} badge={3} />

      {tab === "Checklist Builder" ? (
        <div style={{ padding: "20px 16px", display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr min(260px, 30%)", gap: 16, alignItems: "start" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ ...styles.card, padding: 20 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 14 }}>General Information</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div>
                    <label style={styles.label}>Checklist Name</label>
                    <input style={styles.input} placeholder="New Inspection Form" />
                  </div>
                  <div>
                    <label style={styles.label}>Description</label>
                    <textarea style={{ ...styles.input, resize: "vertical", minHeight: 80 }} placeholder="Enter form description" />
                  </div>
                </div>
              </div>
              <div style={{ ...styles.card, padding: 20 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 6 }}>Checklist Fields</div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 24px", color: "#94a3b8", textAlign: "center" }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>📋</div>
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, color: "#64748b" }}>No fields added yet</div>
                  <div style={{ fontSize: 12, color: "#94a3b8" }}>Click on field types from the right panel to add them</div>
                </div>
              </div>
            </div>
            <div style={{ ...styles.card, padding: 18, position: "sticky", top: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 14 }}>Field Types</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {FIELD_TYPES.map((f, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
                    border: "1px solid #e2e8f0", borderRadius: 10, cursor: "pointer", transition: "all 0.15s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = P; e.currentTarget.style.background = `rgba(15,76,97,0.04)`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.background = "#fff"; }}>
                    <span style={{ width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: P }}>{f.icon}</span>
                    <span style={{ fontSize: 13, fontWeight: 500, color: "#374151" }}>{f.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ padding: "20px 16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginBottom: 20 }}>
            {[
              { icon: "📋", label: "Total Request", value: "4", bg: "#e0f2fe" },
              { icon: "⏳", label: "Pending", value: "4", bg: "#fef3c7" },
              { icon: "👁", label: "Under Review", value: "4", bg: "#dcfce7" },
              { icon: "🔴", label: "High Priority", value: "4", bg: "#fee2e2" },
            ].map((s, i) => (
              <div key={i} style={{ ...styles.card, padding: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{s.icon}</div>
                  <span style={{ fontSize: 12, color: "#64748b" }}>{s.label}</span>
                </div>
                <div style={{ fontSize: 28, fontWeight: 800, color: "#0f172a" }}>{s.value}</div>
              </div>
            ))}
          </div>
          <div style={styles.card}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
                <thead>
                  <tr style={{ background: "rgba(15,76,97,0.04)" }}>
                    {["Checklist Request", "Customer", "Category", "Request Date", "Urgency", "Status", "Actions"].map(h => (
                      <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CUSTOMER_REQUESTS.map((r, i) => (
                    <tr key={r.id} style={{ borderTop: "1px solid #f1f5f9" }}
                      onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"}
                      onMouseLeave={e => e.currentTarget.style.background = "#fff"}>
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ fontWeight: 600, fontSize: 13, color: "#0f172a" }}>{r.title}</div>
                        <div style={{ fontSize: 11, color: "#94a3b8" }}>By {r.by}</div>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                          <span style={{ fontSize: 13, color: "#374151" }}>{r.customer}</span>
                        </div>
                      </td>
                      <td style={{ padding: "14px 16px" }}><span style={styles.chip("teal")}>{r.category}</span></td>
                      <td style={{ padding: "14px 16px", fontSize: 13, color: "#64748b" }}>{r.date}</td>
                      <td style={{ padding: "14px 16px" }}><UrgencyBadge urgency={r.urgency} /></td>
                      <td style={{ padding: "14px 16px" }}>
                        <span style={styles.chip(r.status === "Under Review" ? "blue" : "slate")}>{r.status}</span>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <button style={{ ...styles.btn("outline", true), gap: 5 }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      <AssignModal open={assignOpen} onClose={() => setAssignOpen(false)} />
    </div>
  );
}

// ─── PAGE 3: Custom Checklist Builder (View) ──────────────────────────────────

function CustomChecklistBuilderPage({ navigate }) {
  const [ratings, setRatings] = useState(0);

  return (
    <div style={styles.page}>
      <TopBar
        title="Custom Checklist Builder"
        subtitle="Create and manage inspection Checklist and review customer requests"
        onBack={() => navigate("list")}
        actions={[
          <button key="dl" style={styles.btn("outline", true)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
            Download Custom Checklist
          </button>,
          <button key="edit" style={styles.btn("outline", true)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
            Edit Checklist
          </button>,
          <button key="assign" style={styles.btn()}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg>
            Assign To Member
          </button>,
        ]}
      />

      <div style={{ padding: "20px 16px", display: "grid", gridTemplateColumns: "1fr min(280px, 28%)", gap: 16, alignItems: "start" }}>
        {/* Main form */}
        <div style={{ ...styles.card, padding: 28 }}>
          <div style={{ fontWeight: 800, fontSize: 20, color: "#0f172a", marginBottom: 6 }}>Equipment Safety Inspection Checklist</div>
          <div style={{ fontSize: 13, color: "#64748b", marginBottom: 24 }}>Complete this form to document equipment safety inspection results. All fields marked with * are required.</div>

          {/* Section: Basic Information */}
          <SectionHeader label="Basic Information" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14, marginBottom: 20 }}>
            {[
              ["Equipment Name *", "Text Input Field"],
              ["Equipment ID *", "Text Input Field"],
              ["Location *", "Dropdown: Select Location"],
              ["Equipment Category *", "Dropdown: Select Category"],
              ["Inspection Date *", "Date Picker"],
              ["Inspector Name *", "Text Input Field"],
            ].map(([label, placeholder]) => (
              <div key={label}>
                <label style={styles.label}>{label}</label>
                <input style={{ ...styles.input, color: "#94a3b8" }} readOnly value={`[${placeholder}]`} />
              </div>
            ))}
          </div>

          {/* Section: Safety Checks */}
          <SectionHeader label="Safety Checks" />
          <div style={{ marginBottom: 20 }}>
            <label style={styles.label}>Pre-Inspection Checklist *</label>
            <div style={{ border: "1px solid #e2e8f0", borderRadius: 12, overflow: "hidden" }}>
              {["Equipment is powered off", "Safety gear is available", "Area is clear of hazards", "Documentation is ready"].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", borderTop: i > 0 ? "1px solid #f1f5f9" : "none" }}>
                  <div style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${P}`, background: `rgba(15,76,97,0.1)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={P} strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                  <span style={{ fontSize: 13, color: "#374151" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div style={{ marginBottom: 20 }}>
            <label style={styles.label}>Equipment Condition *</label>
            <div style={{ border: "1px solid #e2e8f0", borderRadius: 12, padding: "16px", display: "flex", alignItems: "center", gap: 10 }}>
              {[1, 2, 3, 4, 5].map(star => (
                <button key={star} onClick={() => setRatings(star)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 24, color: star <= ratings ? "#f59e0b" : "#d1d5db", padding: 0 }}>★</button>
              ))}
              <span style={{ fontSize: 12, color: "#94a3b8" }}>[Rating Scale: 1-5]</span>
            </div>
          </div>

          {/* Section: Documentation */}
          <SectionHeader label="Documentation" />
          <div style={{ marginBottom: 16 }}>
            <label style={styles.label}>Upload Equipment Photos</label>
            <div style={{ border: "2px dashed #d1d5db", borderRadius: 12, padding: "32px 24px", textAlign: "center", cursor: "pointer", background: "#fafafa" }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🖼</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 4 }}>Drag and drop images here or click to browse</div>
              <div style={{ fontSize: 12, color: "#0369a1" }}>Supported formats: JPG, PNG, PDF (Max 10MB)</div>
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={styles.label}>Additional Notes</label>
            <textarea style={{ ...styles.input, minHeight: 80, resize: "vertical", color: "#94a3b8" }} readOnly value="[Text Area Field]" />
          </div>

          {/* Signature */}
          <div style={{ marginBottom: 24 }}>
            <label style={styles.label}>Inspector Signature *</label>
            <div style={{ border: "1px solid #e2e8f0", borderRadius: 12, overflow: "hidden" }}>
              <div style={{ height: 120, background: "#fafafa", display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8", fontSize: 13 }}>[Signature Pad]</div>
              <div style={{ height: 2, background: "#e2e8f0", margin: "0 16px" }} />
              <div style={{ padding: "10px 16px", textAlign: "center", fontSize: 12, color: "#94a3b8" }}>Sign above using mouse or touch</div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, paddingTop: 12, borderTop: "1px solid #f1f5f9" }}>
            <button style={styles.btn("outline")}>Clear Checklist</button>
            <button style={styles.btn()}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
              Submit Inspection
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ ...styles.card, padding: 20, position: "sticky", top: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", marginBottom: 16 }}>Checklist Details</div>
          {[
            ["📁", "Checklist Name", "Equipment Safety Inspection"],
            ["👤", "Created By", "Customer Admin"],
            ["📅", "Created On", "Nov 27, 2024"],
            ["📂", "Category", "Custom Checklist"],
            ["#", "Total Fields", "14"],
            ["🔖", "Form Version", "v1.0"],
          ].map(([icon, label, value]) => (
            <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 14 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>{icon}</div>
              <div>
                <div style={{ fontSize: 11, color: "#94a3b8" }}>{label}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{value}</div>
              </div>
            </div>
          ))}
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 6 }}>Tags</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {["Safety", "Equipment", "Inspection", "Mandatory"].map(t => (
                <span key={t} style={styles.chip("teal")}>{t}</span>
              ))}
            </div>
          </div>
          <div style={{ background: `rgba(15,76,97,0.06)`, borderRadius: 10, padding: "12px 14px", display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={P} strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
            <span style={{ fontSize: 13, fontWeight: 600, color: P }}>Ready to Assign</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ label }) {
  return (
    <div style={{ background: `rgba(15,76,97,0.06)`, borderRadius: 10, padding: "12px 16px", marginBottom: 16, fontWeight: 700, fontSize: 14, color: "#0f172a" }}>{label}</div>
  );
}

// ─── PAGE 4: Import Checklist ─────────────────────────────────────────────────

function ImportChecklistPage({ navigate }) {
  const [tab, setTab] = useState("Checklist Builder");
  const [dragging, setDragging] = useState(false);

  return (
    <div style={styles.page}>
      <TopBar
        title="Import Checklist Fields"
        subtitle="Upload an Excel sheet to auto-generate input fields."
        onBack={() => navigate("list")}
        actions={[
          <button key="prev" style={styles.btn("outline", true)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
            Preview
          </button>,
          <button key="assign" style={styles.btn()}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg>
            Assign to Customers
          </button>,
        ]}
      />
      <Tabs tabs={["Checklist Builder", "Customer Requests"]} active={tab} onChange={setTab} badge={3} />

      <div style={{ padding: "40px 16px", display: "flex", justifyContent: "center" }}>
        <div style={{ ...styles.card, padding: 32, width: "100%", maxWidth: 860 }}>
          <div
            style={{
              border: `2px dashed ${dragging ? P : "#cbd5e1"}`,
              borderRadius: 16, padding: "60px 32px", textAlign: "center", cursor: "pointer",
              background: dragging ? `rgba(15,76,97,0.04)` : "#fafafa", transition: "all 0.2s",
            }}
            onDragEnter={() => setDragging(true)}
            onDragLeave={() => setDragging(false)}
            onDragOver={e => e.preventDefault()}
            onDrop={e => { e.preventDefault(); setDragging(false); }}>
            <div style={{ marginBottom: 20 }}>
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke={dragging ? P : "#94a3b8"} strokeWidth="1.5" style={{ display: "block", margin: "0 auto" }}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 6 }}>Drop your Excel file here or click to browse</div>
            <div style={{ fontSize: 13, color: "#64748b", marginBottom: 20 }}>Supported formats: .xlsx / .xls</div>
            <button style={{ ...styles.btn(), gap: 8 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
              Select File
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PAGE 5: Clone Checklist ──────────────────────────────────────────────────

const CLONE_DATA = [
  { id: 1, name: "Safety Inspection", type: "Clone", date: "2024-10-15", assignments: 12, status: "Active" },
  { id: 2, name: "Equipment Check", type: "Custom", date: "2024-10-20", assignments: 8, status: "Active" },
  { id: 3, name: "Site Inspection", type: "Global", date: "2024-10-10", assignments: 15, status: "Active" },
  { id: 4, name: "Quality Assurance", type: "Custom", date: "2024-10-25", assignments: 6, status: "Pending" },
  { id: 5, name: "Compliance Audit", type: "Clone", date: "2024-10-28", assignments: 4, status: "Active" },
];

function CloneChecklistPage({ navigate }) {
  const [search, setSearch] = useState("");
  const filtered = CLONE_DATA.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={styles.page}>
      <TopBar
        title="Select Checklist to Clone"
        subtitle="Choose a checklist from the list below to create a copy"
        onBack={() => navigate("list")}
      />

      <div style={{ padding: "20px 16px" }}>
        <div style={{ position: "relative", marginBottom: 20, maxWidth: 400 }}>
          <svg style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search checklists..." style={{ ...styles.input, paddingLeft: 36 }} />
        </div>

        <div style={styles.card}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                  {["Checklist Name", "Type", "Received Date", "Assignments", "Status", "Actions"].map(h => (
                    <th key={h} style={{ padding: "14px 20px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "#64748b" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, i) => (
                  <tr key={row.id} style={{ borderTop: "1px solid #f1f5f9" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"}
                    onMouseLeave={e => e.currentTarget.style.background = "#fff"}>
                    <td style={{ padding: "16px 20px", fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{row.name}</td>
                    <td style={{ padding: "16px 20px", fontSize: 13, color: "#64748b" }}>{row.type}</td>
                    <td style={{ padding: "16px 20px", fontSize: 13, color: "#64748b" }}>{row.date}</td>
                    <td style={{ padding: "16px 20px", fontSize: 13, color: "#64748b" }}>{row.assignments}</td>
                    <td style={{ padding: "16px 20px" }}>
                      <span style={{ ...styles.chip(row.status === "Active" ? "green" : "amber"), borderRadius: 20 }}>{row.status}</span>
                    </td>
                    <td style={{ padding: "16px 20px" }}>
                      <button style={{ ...styles.btn(), padding: "7px 20px", background: P, borderRadius: 20 }} onClick={() => navigate("list")}>Clone</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── App Router ────────────────────────────────────────────────────────────────

export default function ChecklistApp() {
  const [page, setPage] = useState("list");

  const navigate = (p) => setPage(p);

  return (
    <div>
      {page === "list" && <ChecklistListPage navigate={navigate} />}
      {page === "globalBuilder" && <GlobalChecklistBuilderPage navigate={navigate} />}
      {page === "customBuilder" && <CustomChecklistBuilderPage navigate={navigate} />}
      {page === "importChecklist" && <ImportChecklistPage navigate={navigate} />}
      {page === "cloneChecklist" && <CloneChecklistPage navigate={navigate} />}
    </div>
  );
}