import { useState } from "react";

const NAV_ITEMS = [
  {
    id: "notifications",
    label: "Notifications",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
  {
    id: "security",
    label: "Security",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    id: "preferences",
    label: "Preferences",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    id: "appearance",
    label: "Appearance",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
  {
    id: "mycontrol",
    label: "My Control",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
];

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      style={{
        width: 44,
        height: 24,
        borderRadius: 12,
        background: checked ? "#0d3349" : "#d1d5db",
        border: "none",
        cursor: "pointer",
        position: "relative",
        transition: "background 0.2s",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 2,
          left: checked ? 22 : 2,
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "#fff",
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
          transition: "left 0.2s",
          display: "block",
        }}
      />
    </button>
  );
}

function SettingRow({ label, description, checked, onChange, divider = true }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "18px 0",
        borderBottom: divider ? "1px solid #f1f5f9" : "none",
      }}
    >
      <div>
        <div style={{ fontWeight: 600, fontSize: 14, color: "#1e293b" }}>{label}</div>
        <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 2 }}>{description}</div>
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  );
}

function SectionHeader({ icon, title, subtitle }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "#f1f5f9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#64748b",
        }}
      >
        {icon}
      </div>
      <div>
        <div style={{ fontWeight: 700, fontSize: 16, color: "#1e293b" }}>{title}</div>
        <div style={{ fontSize: 13, color: "#94a3b8" }}>{subtitle}</div>
      </div>
    </div>
  );
}

// ─── Panels ──────────────────────────────────────────────────────────────────

function NotificationsPanel() {
  const [settings, setSettings] = useState({
    email: true,
    taskAssignments: true,
    inspectionReminders: true,
    teamUpdates: false,
    systemAlerts: true,
  });
  const set = (key) => (val) => setSettings((s) => ({ ...s, [key]: val }));

  return (
    <div>
      <SectionHeader
        icon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        }
        title="Notification Settings"
        subtitle="Manage how you receive notifications"
      />
      <SettingRow label="Email Notifications" description="Receive notifications via email" checked={settings.email} onChange={set("email")} />
      <SettingRow label="Task Assignments" description="Get notified when assigned new tasks" checked={settings.taskAssignments} onChange={set("taskAssignments")} />
      <SettingRow label="Inspection Reminders" description="Reminders for upcoming inspections" checked={settings.inspectionReminders} onChange={set("inspectionReminders")} />
      <SettingRow label="Team Updates" description="Updates from your team members" checked={settings.teamUpdates} onChange={set("teamUpdates")} />
      <SettingRow label="System Alerts" description="Important system notifications" checked={settings.systemAlerts} onChange={set("systemAlerts")} divider={false} />
    </div>
  );
}

function SecurityPanel() {
  const [twoFactor, setTwoFactor] = useState(false);
  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    border: "1px solid #e2e8f0",
    borderRadius: 8,
    fontSize: 14,
    color: "#94a3b8",
    outline: "none",
    boxSizing: "border-box",
    background: "#fff",
    marginTop: 8,
  };
  return (
    <div>
      <SectionHeader
        icon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        }
        title="Security Settings"
        subtitle="Manage your account security"
      />
      <div style={{ borderBottom: "1px solid #f1f5f9", paddingBottom: 24, marginBottom: 24 }}>
        <div>
          <div style={{ fontWeight: 600, fontSize: 14, color: "#1e293b" }}>Current Password</div>
          <input type="password" placeholder="Enter current password" style={inputStyle} />
        </div>
        <div style={{ marginTop: 20 }}>
          <div style={{ fontWeight: 600, fontSize: 14, color: "#1e293b" }}>New Password</div>
          <input type="password" placeholder="Enter new password" style={inputStyle} />
        </div>
        <div style={{ marginTop: 20 }}>
          <div style={{ fontWeight: 600, fontSize: 14, color: "#1e293b" }}>Confirm New Password</div>
          <input type="password" placeholder="Confirm new password" style={inputStyle} />
        </div>
      </div>
      <SettingRow label="Two-Factor Authentication" description="Add an extra layer of security" checked={twoFactor} onChange={setTwoFactor} divider={false} />
    </div>
  );
}

function PreferencesPanel() {
  const [settings, setSettings] = useState({ autoSave: true, notifications: false, darkMode: false });
  const set = (key) => (val) => setSettings((s) => ({ ...s, [key]: val }));
  return (
    <div>
      <SectionHeader
        icon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        }
        title="Preferences"
        subtitle="Customize your experience"
      />
      <SettingRow label="Auto Save" description="Automatically save your changes" checked={settings.autoSave} onChange={set("autoSave")} />
      <SettingRow label="Push Notifications" description="Receive push notifications in browser" checked={settings.notifications} onChange={set("notifications")} />
      <SettingRow label="Dark Mode" description="Use dark theme throughout the app" checked={settings.darkMode} onChange={set("darkMode")} divider={false} />
    </div>
  );
}

function AppearancePanel() {
  const [theme, setTheme] = useState("light");
  const [compact, setCompact] = useState(false);

  const themes = [
    { id: "light", label: "Light", preview: "linear-gradient(135deg, #f8fafc 60%, #e2e8f0 100%)" },
    { id: "dark", label: "Dark", preview: "linear-gradient(135deg, #0d3349 60%, #1e293b 100%)" },
    { id: "auto", label: "Auto", preview: "linear-gradient(135deg, #e2e8f0 0%, #0d3349 100%)" },
  ];

  return (
    <div>
      <SectionHeader
        icon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
          </svg>
        }
        title="Appearance"
        subtitle="Customize the look and feel"
      />
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontWeight: 600, fontSize: 14, color: "#1e293b", marginBottom: 14 }}>Theme</div>
        <div style={{ display: "flex", gap: 16 }}>
          {themes.map((t) => (
            <div
              key={t.id}
              onClick={() => setTheme(t.id)}
              style={{
                flex: 1,
                cursor: "pointer",
                border: theme === t.id ? "2px solid #0d3349" : "2px solid #e2e8f0",
                borderRadius: 10,
                overflow: "hidden",
                transition: "border-color 0.15s",
              }}
            >
              <div style={{ height: 72, background: t.preview }} />
              <div style={{ textAlign: "center", padding: "8px 0", fontSize: 13, fontWeight: theme === t.id ? 600 : 400, color: "#1e293b" }}>
                {t.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      <SettingRow label="Compact Mode" description="Reduce spacing for denser layout" checked={compact} onChange={setCompact} divider={false} />
    </div>
  );
}

const DATA_CATEGORIES = [
  { key: "assetInfo", label: "Asset Information", description: "Allow Super Admin to view asset details and specifications", default: true },
  { key: "teamMember", label: "Team Member Details", description: "Share team member names, roles, and contact information", default: true },
  { key: "inspectionResults", label: "Inspection Results", description: "Allow viewing of completed inspection forms and results", default: true },
  { key: "reports", label: "Reports & Analytics", description: "Share aggregated reports and analytics data", default: true },
  { key: "formResponses", label: "Form Responses", description: "Allow access to detailed form submissions and responses", default: true },
  { key: "performanceMetrics", label: "Performance Metrics", description: "Share team and individual performance statistics", default: false },
  { key: "financialData", label: "Financial Data", description: "Allow viewing of cost and budget information", default: false },
  { key: "customFields", label: "Custom Fields", description: "Share custom field data from your forms and assets", default: true },
  { key: "locationData", label: "Location Data", description: "Allow viewing of asset locations and facility information", default: true },
  { key: "complianceRecords", label: "Compliance Records", description: "Share compliance status and certification records", default: true },
];

function MyControlPanel() {
  const [settings, setSettings] = useState(
    Object.fromEntries(DATA_CATEGORIES.map((c) => [c.key, c.default]))
  );
  const visibleCount = Object.values(settings).filter(Boolean).length;

  const handleReset = () => setSettings(Object.fromEntries(DATA_CATEGORIES.map((c) => [c.key, c.default])));

  return (
    <div>
      <SectionHeader
        icon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        }
        title="Data Visibility Control"
        subtitle="Manage what data Super Admin can view from your account"
      />
      <div
        style={{
          background: "#f8fafc",
          border: "1px solid #e2e8f0",
          borderRadius: 8,
          padding: "12px 16px",
          fontSize: 13,
          color: "#475569",
          marginBottom: 8,
          lineHeight: 1.6,
        }}
      >
        <strong>Note:</strong> Control which data categories are visible to Super Admin users. Disabling a category will hide it from Super Admin dashboards and reports, while still maintaining full access for your team.
      </div>
      {DATA_CATEGORIES.map((cat, i) => (
        <SettingRow
          key={cat.key}
          label={cat.label}
          description={cat.description}
          checked={settings[cat.key]}
          onChange={(val) => setSettings((s) => ({ ...s, [cat.key]: val }))}
          divider={i < DATA_CATEGORIES.length - 1}
        />
      ))}
      <div
        style={{
          background: "#eff6ff",
          border: "1px solid #bfdbfe",
          borderRadius: 8,
          padding: "14px 18px",
          marginTop: 8,
        }}
      >
        <div style={{ fontWeight: 600, fontSize: 13, color: "#1d4ed8" }}>Data Visibility Summary</div>
        <div style={{ fontSize: 13, color: "#3b82f6", marginTop: 4 }}>
          {visibleCount} of {DATA_CATEGORIES.length} categories are currently visible to Super Admin
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 24 }}>
        <button
          onClick={handleReset}
          style={{
            padding: "10px 20px",
            borderRadius: 8,
            border: "1px solid #e2e8f0",
            background: "#fff",
            fontSize: 14,
            fontWeight: 500,
            color: "#1e293b",
            cursor: "pointer",
          }}
        >
          Reset to Defaults
        </button>
        <button
          style={{
            padding: "10px 20px",
            borderRadius: 8,
            border: "none",
            background: "#0d3349",
            fontSize: 14,
            fontWeight: 500,
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Save All Changes
        </button>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const PANELS = {
  notifications: <NotificationsPanel />,
  security: <SecurityPanel />,
  preferences: <PreferencesPanel />,
  appearance: <AppearancePanel />,
  mycontrol: <MyControlPanel />,
};

export default function SettingsPage() {
  const [active, setActive] = useState("notifications");

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9", fontFamily: "'Inter', sans-serif", padding: "40px 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, color: "#0d3349" }}>Settings</h1>
          <p style={{ margin: "4px 0 0", fontSize: 14, color: "#64748b" }}>Manage your account settings and preferences</p>
        </div>

        <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
          {/* Sidebar */}
          <div
            style={{
              width: 220,
              flexShrink: 0,
              background: "#fff",
              borderRadius: 12,
              padding: 8,
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "11px 14px",
                  borderRadius: 8,
                  border: "none",
                  background: active === item.id ? "#0d3349" : "transparent",
                  color: active === item.id ? "#fff" : "#64748b",
                  fontSize: 14,
                  fontWeight: active === item.id ? 600 : 400,
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "background 0.15s, color 0.15s",
                  marginBottom: 2,
                }}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div
            style={{
              flex: 1,
              background: "#fff",
              borderRadius: 12,
              padding: "28px 32px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}
          >
            {PANELS[active]}
          </div>
        </div>
      </div>
    </div>
  );
}