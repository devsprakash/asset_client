import { useState } from "react";

const inputStyle = {
  width: "100%",
  padding: "9px 12px",
  border: "1px solid #e2e8f0",
  borderRadius: 6,
  fontSize: 14,
  color: "#1e293b",
  background: "#fff",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle = {
  fontSize: 13,
  color: "#334155",
  fontWeight: 500,
  marginBottom: 6,
  display: "block",
};

const sectionStyle = {
  background: "#fff",
  border: "1px solid #e2e8f0",
  borderRadius: 10,
  padding: "24px",
  marginBottom: 16,
};

const Checkbox = ({ label, checked, onChange }) => (
  <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#334155", cursor: "pointer" }}>
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      style={{ width: 16, height: 16, accentColor: "#0f4c5c", cursor: "pointer" }}
    />
    {label}
  </label>
);

const Toggle = ({ checked, onChange }) => (
  <div
    onClick={onChange}
    style={{
      width: 44, height: 24, borderRadius: 12,
      background: checked ? "#0f766e" : "#cbd5e1",
      position: "relative", cursor: "pointer", transition: "background 0.2s", flexShrink: 0,
    }}
  >
    <div style={{
      width: 18, height: 18, borderRadius: "50%", background: "#fff",
      position: "absolute", top: 3, left: checked ? 23 : 3,
      transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
    }} />
  </div>
);

export default function CloneAsset() {
  const [form, setForm] = useState({
    assetId: "", assetName: "", serialNumber: "",
    assetCategory: "Electrical", customCategory: "",
    locations: { warehouseA: false, warehouseB: false, officeBuilding: false, factoryFloor: false, remoteSite: false },
    customAddress: "", addressLine1: "", addressLine2: "", city: "", state: "",
    assignedUser: "", assignedUser2: "",
    status: { active: false, inMaintenance: false, retired: false, inTransit: false, reserved: false },
    acquisitionDate: "", warrantyExpiry: "",
    warrantyFilter: { lt90: false, expired: false },
    inspectionSystems: { amc: true, camc: true },
    amcSchedule: { weekly: false, monthly: false, quarterly: false, halfYearly: false, yearly: false },
    camcSchedule: { weekly: false, monthly: false, quarterly: false, halfYearly: false, yearly: false },
    assetCondition: { critical: false, normal: false },
    commissioningDate: "", invoiceDate: "",
    mheStatus: { active: false, underMaintenance: false, idle: false, notApplicable: false, decommissioned: false },
    mheRuntime: "", mheSafetyCert: false,
    vehicleType: { truck: false, van: false, car: false, motorcycle: false, heavyDuty: false, notApplicable: false },
    driver: "", loadStatus: 85,
  });

  const toggle = (group, key) => setForm(f => ({ ...f, [group]: { ...f[group], [key]: !f[group][key] } }));
  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const scheduleKeys = ["weekly", "monthly", "quarterly", "halfYearly", "yearly"];

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: "#f1f5f9", minHeight: "100vh", paddingBottom: 80 }}>
      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={() => window.history.back()}
            style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#475569" }}
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 12H5M5 12l7-7M5 12l7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div>
            <h1 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#0f172a" }}>Clone Asset: Generator Unit A-12</h1>
            <p style={{ margin: 0, fontSize: 12, color: "#64748b" }}>Asset details, classification, and category filters</p>
          </div>
        </div>
        <button style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", padding: 4 }}>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
          </svg>
        </button>
      </div>

      {/* Search bar */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "10px 28px", display: "flex", gap: 12 }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, border: "1px solid #e2e8f0", borderRadius: 8, padding: "7px 12px" }}>
          <svg width="15" height="15" fill="none" stroke="#94a3b8" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <input style={{ border: "none", outline: "none", fontSize: 14, width: "100%", background: "transparent" }} />
        </div>
        <select style={{ border: "1px solid #e2e8f0", borderRadius: 8, padding: "7px 12px", fontSize: 13, color: "#334155", background: "#fff", cursor: "pointer" }}>
          <option>All Status</option>
        </select>
        <select style={{ border: "1px solid #e2e8f0", borderRadius: 8, padding: "7px 12px", fontSize: 13, color: "#334155", background: "#fff", cursor: "pointer" }}>
          <option>All Memberships</option>
        </select>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px 20px" }}>
        {/* Core Identification */}
        <div style={sectionStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <svg width="17" height="17" fill="none" stroke="#0f4c5c" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
            <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#0f172a" }}>Core Identification</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div><label style={labelStyle}>Asset ID / Tag Number</label><input style={inputStyle} value={form.assetId} onChange={e => set("assetId", e.target.value)} /></div>
            <div><label style={labelStyle}>Asset Name / Description</label><input style={inputStyle} value={form.assetName} onChange={e => set("assetName", e.target.value)} /></div>
            <div><label style={labelStyle}>Serial Number</label><input style={inputStyle} value={form.serialNumber} onChange={e => set("serialNumber", e.target.value)} /></div>
            <div>
              <label style={labelStyle}>Asset Category</label>
              <select style={{ ...inputStyle }} value={form.assetCategory} onChange={e => set("assetCategory", e.target.value)}>
                <option>Electrical</option><option>Mechanical</option><option>IT Equipment</option>
              </select>
            </div>
          </div>
          <div style={{ marginTop: 16 }}>
            <label style={labelStyle}>Custom Asset Category</label>
            <input style={inputStyle} value={form.customCategory} onChange={e => set("customCategory", e.target.value)} />
          </div>
        </div>

        {/* Two-col layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "start" }}>
          {/* LEFT: Primary Filters */}
          <div style={{ ...sectionStyle, marginBottom: 0 }}>
            <h2 style={{ margin: "0 0 18px 0", fontSize: 15, fontWeight: 700, color: "#0f172a" }}>Primary Filters</h2>

            <label style={{ ...labelStyle, marginBottom: 8 }}>Current Location</label>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
              {[["warehouseA","Warehouse A"],["warehouseB","Warehouse B"],["officeBuilding","Office Building"],["factoryFloor","Factory Floor"],["remoteSite","Remote Site"]].map(([k,l]) => (
                <Checkbox key={k} label={l} checked={form.locations[k]} onChange={() => toggle("locations", k)} />
              ))}
            </div>

            <label style={labelStyle}>Custom Physical Address</label>
            <input style={{ ...inputStyle, marginBottom: 8 }} value={form.customAddress} onChange={e => set("customAddress", e.target.value)} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 18 }}>
              <input style={inputStyle} value={form.addressLine1} onChange={e => set("addressLine1", e.target.value)} />
              <input style={inputStyle} value={form.addressLine2} onChange={e => set("addressLine2", e.target.value)} />
              <input style={inputStyle} value={form.city} onChange={e => set("city", e.target.value)} />
              <input style={inputStyle} value={form.state} onChange={e => set("state", e.target.value)} />
            </div>

            <label style={labelStyle}>Assigned User / Custodian</label>
            <input style={{ ...inputStyle, marginBottom: 8 }} value={form.assignedUser} onChange={e => set("assignedUser", e.target.value)} />
            <input style={{ ...inputStyle, marginBottom: 18 }} value={form.assignedUser2} onChange={e => set("assignedUser2", e.target.value)} />

            <label style={{ ...labelStyle, marginBottom: 8 }}>Status</label>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
              {[["active","Active"],["inMaintenance","In Maintenance"],["retired","Retired"],["inTransit","In Transit"],["reserved","Reserved"]].map(([k,l]) => (
                <Checkbox key={k} label={l} checked={form.status[k]} onChange={() => toggle("status", k)} />
              ))}
            </div>

            <label style={labelStyle}>Acquisition Date</label>
            <input type="date" style={{ ...inputStyle, marginBottom: 14 }} value={form.acquisitionDate} onChange={e => set("acquisitionDate", e.target.value)} />

            <label style={labelStyle}>Warranty / Lease Expiry</label>
            <input type="date" style={{ ...inputStyle, marginBottom: 8 }} value={form.warrantyExpiry} onChange={e => set("warrantyExpiry", e.target.value)} />
            <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
              {[["lt90","< 90 Days"],["expired","Expired"]].map(([k,l]) => (
                <button key={k} onClick={() => toggle("warrantyFilter", k)} style={{ padding: "4px 14px", borderRadius: 20, fontSize: 13, cursor: "pointer", background: form.warrantyFilter[k] ? "#0f4c5c" : "#fff", color: form.warrantyFilter[k] ? "#fff" : "#475569", border: "1px solid #e2e8f0" }}>{l}</button>
              ))}
            </div>

            <label style={{ ...labelStyle, marginBottom: 8 }}>Choose Inspection System</label>
            <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
              {[["amc","AMC Inspection"],["camc","CAMC Inspection"]].map(([k,l]) => (
                <span key={k} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 20, background: form.inspectionSystems[k] ? "#0f4c5c" : "#f1f5f9", color: form.inspectionSystems[k] ? "#fff" : "#475569", fontSize: 13, fontWeight: 500, cursor: "pointer" }}
                  onClick={() => toggle("inspectionSystems", k)}>
                  {l} {form.inspectionSystems[k] && <span style={{ fontWeight: 400, opacity: 0.8 }}>×</span>}
                </span>
              ))}
            </div>

            {/* AMC Schedule */}
            <div style={{ border: "1px solid #e2e8f0", borderRadius: 8, padding: 16, marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#0f4c5c" }}>AMC Inspection Schedule</span>
                <button onClick={() => setForm(f => ({ ...f, amcSchedule: Object.fromEntries(scheduleKeys.map(k => [k,true])) }))} style={{ fontSize: 13, color: "#0f4c5c", background: "none", border: "none", cursor: "pointer" }}>Select All</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[["weekly","Weekly"],["monthly","Monthly"],["quarterly","Quarterly"],["halfYearly","Half Yearly"],["yearly","Yearly"]].map(([k,l]) => (
                  <Checkbox key={k} label={l} checked={form.amcSchedule[k]} onChange={() => toggle("amcSchedule", k)} />
                ))}
              </div>
            </div>

            {/* CAMC Schedule */}
            <div style={{ border: "1px solid #e2e8f0", borderRadius: 8, padding: 16, marginBottom: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#0f4c5c" }}>CAMC Inspection Schedule</span>
                <button onClick={() => setForm(f => ({ ...f, camcSchedule: Object.fromEntries(scheduleKeys.map(k => [k,true])) }))} style={{ fontSize: 13, color: "#0f4c5c", background: "none", border: "none", cursor: "pointer" }}>Select All</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[["weekly","Weekly"],["monthly","Monthly"],["quarterly","Quarterly"],["halfYearly","Half Yearly"],["yearly","Yearly"]].map(([k,l]) => (
                  <Checkbox key={k} label={l} checked={form.camcSchedule[k]} onChange={() => toggle("camcSchedule", k)} />
                ))}
              </div>
            </div>

            <label style={{ ...labelStyle, marginBottom: 8 }}>Choose Asset Condition</label>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
              <Checkbox label="Critical" checked={form.assetCondition.critical} onChange={() => toggle("assetCondition","critical")} />
              <Checkbox label="Normal" checked={form.assetCondition.normal} onChange={() => toggle("assetCondition","normal")} />
            </div>

            <label style={labelStyle}>Commissioning Date</label>
            <input type="date" style={{ ...inputStyle, marginBottom: 14 }} value={form.commissioningDate} onChange={e => set("commissioningDate", e.target.value)} />

            <label style={labelStyle}>Invoice Date</label>
            <input type="date" style={inputStyle} value={form.invoiceDate} onChange={e => set("invoiceDate", e.target.value)} />
          </div>

          {/* RIGHT column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* MHE Filters */}
            <div style={{ ...sectionStyle, marginBottom: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
                <svg width="17" height="17" fill="none" stroke="#0f4c5c" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
                </svg>
                <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#0f4c5c" }}>Material Handling Equipment Filters</h2>
              </div>

              <label style={{ ...labelStyle, marginBottom: 8 }}>MHE Utilization Status</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px", marginBottom: 18 }}>
                {[["active","Active"],["underMaintenance","Under Maintenance"],["idle","Idle"],["notApplicable","Not Applicable"],["decommissioned","Decommissioned"]].map(([k,l]) => (
                  <Checkbox key={k} label={l} checked={form.mheStatus[k]} onChange={() => toggle("mheStatus", k)} />
                ))}
              </div>

              <label style={labelStyle}>MHE Engine Status / Runtime (Hours)</label>
              <input style={{ ...inputStyle, marginBottom: 18 }} value={form.mheRuntime} onChange={e => set("mheRuntime", e.target.value)} />

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 14, color: "#334155" }}>MHE Safety Certification</span>
                <Toggle checked={form.mheSafetyCert} onChange={() => set("mheSafetyCert", !form.mheSafetyCert)} />
              </div>
            </div>

            {/* Transportation Filters */}
            <div style={{ ...sectionStyle, marginBottom: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
                <svg width="17" height="17" fill="none" stroke="#0f4c5c" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
                <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#0f4c5c" }}>Transportation Filters</h2>
              </div>

              <label style={{ ...labelStyle, marginBottom: 8 }}>Vehicle Type</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px 12px", marginBottom: 18 }}>
                {[["truck","Truck"],["van","Van"],["car","Car"],["motorcycle","Motorcycle"],["heavyDuty","Heavy Duty"],["notApplicable","Not Applicable"]].map(([k,l]) => (
                  <Checkbox key={k} label={l} checked={form.vehicleType[k]} onChange={() => toggle("vehicleType", k)} />
                ))}
              </div>

              <label style={labelStyle}>Driver / Behavior Flag</label>
              <div style={{ position: "relative", marginBottom: 18 }}>
                <input placeholder="Search and select driver" style={{ ...inputStyle, paddingRight: 36 }} value={form.driver} onChange={e => set("driver", e.target.value)} />
                <svg style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)" }} width="16" height="16" fill="none" stroke="#94a3b8" strokeWidth="2" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
              </div>

              <label style={labelStyle}>Load Status: %</label>
              <input type="range" min={0} max={100} value={form.loadStatus} onChange={e => set("loadStatus", Number(e.target.value))} style={{ width: "100%", accentColor: "#0f4c5c", marginBottom: 4 }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#94a3b8" }}>
                <span>0%</span><span>100%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, paddingTop: 20 }}>
          <button onClick={() => window.history.back()} style={{ padding: "10px 24px", borderRadius: 8, border: "1px solid #e2e8f0", background: "#fff", color: "#334155", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
            Cancel
          </button>
          <button style={{ padding: "10px 24px", borderRadius: 8, border: "none", background: "#0f4c5c", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
            Clone Asset
          </button>
        </div>
      </div>
    </div>
  );
}