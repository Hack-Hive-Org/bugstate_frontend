"use client";
import { css } from "@/styles/dashboard";
import { useState, useEffect, FC } from "react";
import { useGetApiKeys, useGetMyProjects, useRevokeApiKey, useGenerateApiKey, useGetUserProfile } from "@/services/user.service";
import { useGetProjectErrors } from "@/services/error.service";
import { useCreateProject } from "@/services/project.service";
import { useAuth } from "@/providers/authProvider";
// ─── Types ────────────────────────────────────────────────────────────────────

// ─── Icons ────────────────────────────────────────────────────────────────────

const Icon: FC<IconProps> = ({ d, size = 16, stroke = "currentColor", fill = "none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const Icons: Record<string, FC> = {
  dashboard:    () => <Icon d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10" />,
  projects:     () => <Icon d="M2 7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7z M16 3l-4 4-4-4" />,
  key:          () => <Icon d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />,
  user:         () => <Icon d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />,
  logout:       () => <Icon d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9" />,
  plus:         () => <Icon d="M12 5v14M5 12h14" />,
  settings:     () => <Icon d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />,
  copy:         () => <Icon d="M8 8V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2M6 8H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2" />,
  check:        () => <Icon d="M20 6L9 17l-5-5" />,
  alert:        () => <Icon d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z M12 9v4M12 17h.01" />,
  bug:          () => <Icon d="M8 2l1.88 1.88M14.12 3.88 16 2M9 7.13v-1a3.003 3.003 0 1 1 6 0v1M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6z M12 20v-9 M6.53 9C4.6 8.8 3 7.1 3 5M6 13H2M3 21c0-3 1.5-6 3-8M21 5c0 2.1-1.6 3.8-3.53 4M22 13h-4M21 21c0-3-1.5-6-3-8" />,
  chevronRight: () => <Icon d="M9 18l6-6-6-6" />,
  eye:          () => <Icon d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />,
  eyeOff:       () => <Icon d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22" />,
};

// ─── Mock Data ────────────────────────────────────────────────────────────────

const mockProjects: ProjectWithErrorSummary[] = [
  { id: "1", name: "Production API",   description: "Main production backend service", environment: "production",  createdAt: "2024-11-15", errors: { open: 12, resolved: 87, ignored: 3 } },
  { id: "2", name: "Staging Frontend", description: "Next.js staging environment",     environment: "staging",     createdAt: "2024-12-01", errors: { open: 4,  resolved: 21, ignored: 1 } },
  { id: "3", name: "Mobile Backend",   description: "iOS/Android API gateway",         environment: "development", createdAt: "2025-01-10", errors: { open: 0,  resolved: 5,  ignored: 0 } },
];

const mockApiKeys: ApiKeyDisplay[] = [
  { id: "1", projectId: "1", keyId: "bug_live_a1b2c3d4", prefix: "bug_live", isActive: true,  createdAt: "2025-01-05" },
  { id: "2", projectId: "2", keyId: "bug_live_e5f6g7h8", prefix: "bug_live", isActive: false, createdAt: "2025-01-20" },
];

const mockErrors: ErrorGroup[] = [
  { id: "1", title: "TypeError: Cannot read property 'map' of undefined", service: "api-gateway",  status: "OPEN",     occurrences: 143, firstSeen: "2025-01-28" },
  { id: "2", title: "Database connection timeout exceeded 30000ms",        service: "db-service",   status: "OPEN",     occurrences: 28,  firstSeen: "2025-01-30" },
  { id: "3", title: "JWT verification failed: invalid signature",          service: "auth-service", status: "RESOLVED", occurrences: 7,   firstSeen: "2025-01-25" },
  { id: "4", title: "Memory heap out of bounds in worker thread",          service: "worker",       status: "IGNORED",  occurrences: 2,   firstSeen: "2025-01-22" },
];

const mockUser: User = { id: "1", name: "Alex Rivera", email: "alex@acme.io", isActive: true, createdAt: "2024-10-01" };

// ─── CSS — Green / Black theme ────────────────────────────────────────────────
// All colour values are derived from the provided globals.css design tokens.



// ─── Toast ────────────────────────────────────────────────────────────────────

const Toast: FC<ToastProps> = ({ message, onDone }) => {
  useEffect(() => { const t = setTimeout(onDone, 2500); return () => clearTimeout(t); }, [onDone]);
  return <div className="toast"><Icons.check />{message}</div>;
};

// ─── Dashboard Page ───────────────────────────────────────────────────────────

const DashboardPage: FC<DashboardPageProps> = ({ projects, onNavigate }) => {
  const firstProjectId = projects[0]?.id ? String(projects[0].id) : "";
  const { data: recentErrorsData } = useGetProjectErrors(firstProjectId, { limit: 4 });
  const recentErrors = recentErrorsData?.errors ?? [];

  const totalOpen     = projects.reduce((s, p) => s + p.errors.open, 0);
  const totalResolved = projects.reduce((s, p) => s + p.errors.resolved, 0);
  const totalIgnored  = projects.reduce((s, p) => s + p.errors.ignored, 0);

  const stats = [
    { label: "Total Projects", value: projects.length, sub: "Across all envs",  color: "c-green",  textColor: "var(--primary)" },
    { label: "Open Errors",    value: totalOpen,       sub: "Needs attention",  color: "c-red",    textColor: "var(--red)" },
    { label: "Resolved",       value: totalResolved,   sub: "All time",         color: "c-teal",   textColor: "var(--accent)" },
    { label: "Ignored",        value: totalIgnored,    sub: "Suppressed",       color: "c-yellow", textColor: "var(--yellow)" },
  ];

  return (
    <div className="page-enter">
      <div className="stats-grid">
        {stats.map(s => (
          <div key={s.label} className={`stat-card ${s.color}`}>
            <div className="stat-glow" />
            <div className="stat-label">{s.label}</div>
            <div className="stat-value" style={{color: s.textColor}}>{s.value}</div>
            <div className="stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        <div className="card card-glow">
          <div className="card-header">
            <div className="card-title">Projects Health</div>
            <button className="btn btn-ghost btn-sm" onClick={() => onNavigate("projects")}>View all</button>
          </div>
          {projects.map((p: ProjectWithErrorSummary) => {
            const total       = p.errors.open + p.errors.resolved + p.errors.ignored;
            const openPct     = total ? (p.errors.open     / total) * 100 : 0;
            const resolvedPct = total ? (p.errors.resolved / total) * 100 : 0;
            return (
              <div key={p.id} style={{padding:"12px 0",borderBottom:"1px solid var(--border)"}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6}}>
                  <div>
                    <div style={{fontWeight:600,fontSize:14}}>{p.name}</div>
                    <div style={{fontSize:11,color:"var(--text3)",display:"flex",alignItems:"center",gap:5,marginTop:2}}>
                      <span className={`env-dot ${p.environment}`} />{p.environment}
                    </div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:13,color:"var(--red)",fontWeight:700}}>{p.errors.open} open</div>
                    <div style={{fontSize:11,color:"var(--primary)",marginTop:1}}>{p.errors.resolved} resolved</div>
                  </div>
                </div>
                <div className="error-bar-wrap">
                  <div className="error-bar" style={{width:`${openPct}%`,     background:"var(--red)"}} />
                  <div className="error-bar" style={{width:`${resolvedPct}%`, background:"var(--primary)"}} />
                  <div className="error-bar" style={{flex:1,                  background:"var(--surface3)"}} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="card card-glow">
          <div className="card-header">
            <div className="card-title">Recent Errors</div>
            <span className="badge status-open">{totalOpen} open</span>
          </div>
          {recentErrors.length === 0 && (
            <div style={{padding:"16px 0",fontSize:13,color:"var(--text3)"}}>No errors yet{firstProjectId ? "" : " — no projects found"}.</div>
          )}
          {recentErrors.map((e: any) => (
            <div key={e.id} style={{padding:"11px 0",borderBottom:"1px solid var(--border)",cursor:"pointer"}}>
              <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12}}>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:12,fontFamily:"var(--font-mono)",marginBottom:3,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",color:"var(--text2)"}}>{e.message ?? e.title}</div>
                  <div style={{fontSize:11,color:"var(--text3)"}}>{e.service} · {e.occurrences} occurrences</div>
                </div>
                <span className={`badge status-${e.status.toLowerCase()}`}>{e.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Projects Page ────────────────────────────────────────────────────────────

const ProjectsPage: FC<ProjectsPageProps> = ({ projects, onNavigate }) => {
  const [filter, setFilter] = useState<EnvironmentFilter>("all");
  const filtered = filter === "all" ? projects : projects.filter(p => p.environment === filter);
  const filterOptions: EnvironmentFilter[] = ["all", "production", "staging", "development"];

  return (
    <div className="page-enter">
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24}}>
        <div className="tabs">
          {filterOptions.map(f => (
            <button key={f} className={`tab ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <button className="btn btn-primary" onClick={() => onNavigate("create-project")}>
          <Icons.plus />New Project
        </button>
      </div>

      <div className="grid-3">
        {filtered.map((p: ProjectWithErrorSummary) => {
          const total = p.errors.open + p.errors.resolved + p.errors.ignored;
          return (
            <div key={p.id} className="project-card">
              <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:10}}>
                <span className={`badge env-${p.environment}`}>
                  <span className={`env-dot ${p.environment}`} />{p.environment}
                </span>
                <button className="btn btn-ghost btn-icon btn-sm" style={{color:"var(--text3)"}}>
                  <Icons.settings />
                </button>
              </div>
              <div className="project-name">{p.name}</div>
              <div className="project-desc">{p.description ?? "No description provided"}</div>
              <div className="project-meta">
                <span style={{fontSize:12,color:"var(--red)",fontWeight:700}}>{p.errors.open} open</span>
                <span style={{color:"var(--border2)"}}>·</span>
                <span style={{fontSize:12,color:"var(--text3)"}}>{total} total</span>
                <span style={{color:"var(--border2)"}}>·</span>
                <span style={{fontSize:12,color:"var(--text3)"}}>Since {p.createdAt}</span>
              </div>
            </div>
          );
        })}
        <div
          className="project-card"
          style={{border:"1px dashed var(--border2)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:10,minHeight:180,background:"transparent"}}
          onClick={() => onNavigate("create-project")}
        >
          <div style={{width:40,height:40,borderRadius:"50%",background:"var(--primary-dim)",border:"1px solid hsl(158 64% 51% / 0.2)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--primary)"}}>
            <Icons.plus />
          </div>
          <div style={{fontSize:14,fontWeight:600,color:"var(--text3)"}}>Create Project</div>
        </div>
      </div>
    </div>
  );
};

// ─── Create Project Page ──────────────────────────────────────────────────────

const CreateProjectPage: FC<CreateProjectPageProps> = ({ onSuccess, toast }) => {
  const [form, setForm] = useState<CreateProjectFormState>({ name: "", description: "", environment: "production" });
  const { mutate: createProject, isPending } = useCreateProject();

  const set = (k: keyof CreateProjectFormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (): void => {
    if (!form.name) return;
    createProject(form, {
      onSuccess: () => { toast("Project created successfully!"); onSuccess(); },
      onError: (err) => { toast(err.message ?? "Failed to create project"); },
    });
  };

  return (
    <div className="page-enter" style={{maxWidth:560}}>
      <div className="card" style={{padding:28}}>
        <div style={{marginBottom:24}}>
          <div style={{fontSize:16,fontWeight:700,marginBottom:4}}>New Project</div>
          <div style={{fontSize:13,color:"var(--text3)"}}>Set up a project to start capturing errors</div>
        </div>
        <div className="form-group">
          <label className="form-label">Project Name *</label>
          <input className="form-input" placeholder="e.g. Production API" value={form.name} onChange={set("name")} />
        </div>
        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea className="form-textarea" placeholder="Brief description..." value={form.description} onChange={set("description")} rows={3} />
        </div>
        <div className="form-group">
          <label className="form-label">Environment *</label>
          <select className="form-select" value={form.environment} onChange={set("environment")}>
            <option value="production">Production</option>
            <option value="staging">Staging</option>
            <option value="development">Development</option>
          </select>
          <div className="form-hint">Determines alert thresholds and visibility settings</div>
        </div>
        <button className="btn btn-primary" onClick={handleSubmit} disabled={isPending} style={{marginTop:4}}>
          {isPending ? "Creating..." : <><Icons.plus />Create Project</>}
        </button>
      </div>
    </div>
  );
};

// ─── API Keys Page ────────────────────────────────────────────────────────────

const ApiKeysPage: FC<ApiKeysPageProps> = ({ projects, toast }) => {
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [newKey, setNewKey] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const { data, isLoading } = useGetApiKeys(selectedProject);
  const { mutate: revokeKey, isPending: isRevoking } = useRevokeApiKey();
  const { mutate: generateKey, isPending: isGenerating } = useGenerateApiKey();

  const handleGenerate = (): void => {
    if (!selectedProject) return;
    generateKey(selectedProject, {
      onSuccess: (res) => { setNewKey(res.api_key); toast("API key generated — copy it now, it won't be shown again!"); },
      onError: () => { toast("Failed to generate API key"); },
    });
  };

  const keys = data?.apiKeys ?? [];

  const handleRevoke = (apiKeyId: string) => {
    if (!selectedProject) return;

    revokeKey(
      { projectId: selectedProject, apiKeyId },
      {
        onSuccess: () => {
          toast("API key revoked");
        },
        onError: () => {
          toast("Failed to revoke key");
        },
      }
    );
  };

  const copyKey = () => {
    if (!newKey) return;
    navigator.clipboard?.writeText(newKey);
    setCopied(true);
    toast("API key copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="page-enter">
      <div className="grid-2" style={{ alignItems: "start" }}>
        {/* Left Panel */}
        <div>
          <div className="card" style={{ padding: 24, marginBottom: 20 }}>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>
              Generate API Key
            </div>

            <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 20 }}>
              Keys are project-scoped.
            </div>

            <div className="form-group">
              <label className="form-label">Select Project</label>
              <select
                className="form-select"
                value={selectedProject}
                onChange={(e) => {
                  setSelectedProject(e.target.value);
                  setNewKey(null);
                }}
              >
                <option value="">Choose a project...</option>
                {projects.map((p: Project) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.environment})
                  </option>
                ))}
              </select>
            </div>

            <button
              className="btn btn-primary"
              disabled={!selectedProject || isGenerating}
              onClick={handleGenerate}
              style={{marginTop:8}}
            >
              {isGenerating ? "Generating..." : <><Icons.plus />Generate Key</>}
            </button>

            {newKey && (
              <div style={{marginTop:16,background:"var(--surface2)",border:"1px solid var(--border2)",borderRadius:8,padding:"12px 14px"}}>
                <div style={{fontSize:11,color:"var(--text3)",marginBottom:6}}>New API Key — copy it now:</div>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <code style={{flex:1,fontSize:11,fontFamily:"var(--font-mono)",wordBreak:"break-all",color:"var(--primary)"}}>{newKey}</code>
                  <button className="btn btn-ghost btn-icon btn-sm" onClick={() => { navigator.clipboard?.writeText(newKey); setCopied(true); toast("Copied!"); setTimeout(() => setCopied(false), 2000); }}>
                    {copied ? <Icons.check /> : <Icons.copy />}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel */}
        <div className="card" style={{ padding: 0 }}>
          <div
            style={{
              padding: "16px 20px",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 600 }}>Project API Keys</div>
            <span style={{ fontSize: 12, color: "var(--text3)" }}>
              {keys.length} total
            </span>
          </div>

          {!selectedProject && (
            <div style={{ padding: 20, fontSize: 13, color: "var(--text3)" }}>
              Select a project to view API keys.
            </div>
          )}

          {selectedProject && (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Key ID</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading && (
                    <tr>
                      <td colSpan={4} style={{ padding: 20 }}>
                        Loading...
                      </td>
                    </tr>
                  )}

                  {!isLoading && keys.length === 0 && (
                    <tr>
                      <td colSpan={4} style={{ padding: 20 }}>
                        No API keys found.
                      </td>
                    </tr>
                  )}

                  {!isLoading &&
                    keys.map((k) => (
                      <tr key={k.id}>
                        <td className="td-mono">{k.keyId}</td>

                        <td>
                          <span
                            className={`badge ${
                              k.isActive ? "b-active" : "b-inactive"
                            }`}
                          >
                            {k.isActive ? "Active" : "Revoked"}
                          </span>
                        </td>

                        <td className="td-muted">
                          {new Date(k.createdAt).toLocaleDateString()}
                        </td>

                        <td>
                          {k.isActive && (
                            <button
                              className="btn btn-danger btn-sm"
                              disabled={isRevoking}
                              onClick={() => handleRevoke(k.id)}
                            >
                              Revoke
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Profile Page ─────────────────────────────────────────────────────────────

const ProfilePage: FC<ProfilePageProps> = ({ toast }) => {
  const { data: profileData, isLoading: profileLoading } = useGetUserProfile();
  const user = profileData?.user;
  const [form, setForm]     = useState<UpdateProfileFormState>({ name: "", email: "" });
  const [pwForm, setPwForm] = useState<ChangePasswordFormState>({ current: "", next: "", confirm: "" });
  const [showPw, setShowPw] = useState<boolean>(false);

  useEffect(() => {
    if (user) setForm({ name: user.name, email: user.email });
  }, [user]);

  const set   = (k: keyof UpdateProfileFormState)  => (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [k]: e.target.value }));
  const setPw = (k: keyof ChangePasswordFormState) => (e: React.ChangeEvent<HTMLInputElement>) => setPwForm(f => ({ ...f, [k]: e.target.value }));

  const pwFields: Array<{ key: keyof ChangePasswordFormState; label: string; idx: number }> = [
    { key: "current", label: "Current Password",    idx: 0 },
    { key: "next",    label: "New Password",         idx: 1 },
    { key: "confirm", label: "Confirm New Password", idx: 2 },
  ];

  if (profileLoading) return <div style={{padding:32,fontSize:13,color:"var(--text3)"}}>Loading profile...</div>;

  return (
    <div className="page-enter">
      <div className="profile-header">
        <div className="profile-avatar">{user?.name.split(" ").map((n: string) => n[0]).join("") ?? "?"}</div>
        <div style={{flex:1,position:"relative",zIndex:1}}>
          <div className="profile-name">{user?.name}</div>
          <div className="profile-email">{user?.email}</div>
          <div style={{marginTop:8,display:"flex",gap:8,alignItems:"center"}}>
            <span className="badge b-active">{user?.isActive ? "Active" : "Inactive"}</span>
            <span style={{fontSize:11,color:"var(--text3)"}}>Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : ""}</span>
          </div>
        </div>
      </div>

      <div className="grid-2" style={{alignItems:"start"}}>
        <div className="card" style={{padding:24}}>
          <div style={{fontSize:14,fontWeight:600,marginBottom:20}}>Profile Information</div>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input className="form-input" value={form.name} onChange={set("name")} />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input className="form-input" type="email" value={form.email} onChange={set("email")} />
          </div>
          <button className="btn btn-primary" onClick={() => toast("Profile updated!")}>Save Changes</button>
        </div>

        <div>
          <div className="card" style={{padding:24,marginBottom:20}}>
            <div style={{fontSize:14,fontWeight:600,marginBottom:20}}>Change Password</div>
            {pwFields.map(({ key, label, idx }) => (
              <div key={key} className="form-group" style={{marginBottom:14}}>
                <label className="form-label">{label}</label>
                <div style={{position:"relative"}}>
                  <input className="form-input" type={showPw ? "text" : "password"} value={pwForm[key]} onChange={setPw(key)} style={{paddingRight:44}} />
                  {idx === 0 && (
                    <button style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"var(--text3)"}} onClick={() => setShowPw(!showPw)}>
                      {showPw ? <Icons.eyeOff /> : <Icons.eye />}
                    </button>
                  )}
                </div>
              </div>
            ))}
            <button className="btn btn-secondary" onClick={() => toast("Password updated!")}>Update Password</button>
          </div>

          <div className="card" style={{padding:24,borderColor:"hsl(0 84% 60% / 0.2)"}}>
            <div style={{fontSize:14,fontWeight:600,marginBottom:6,color:"var(--red)"}}>Danger Zone</div>
            <div style={{fontSize:12,color:"var(--text3)",marginBottom:16,lineHeight:1.6}}>
              Permanently delete your account and all associated data. This cannot be undone.
            </div>
            <button className="btn btn-danger" onClick={() => toast("Account deletion requested")}>Delete Account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Errors Page ──────────────────────────────────────────────────────────────

const ErrorsPage: FC<ErrorsPageProps> = ({ projects }) => {
  const [statusFilter, setStatusFilter] = useState<ErrorStatusFilter>("all");
  const [selectedProject, setSelectedProject] = useState<string>("");

  const { data, isLoading } = useGetProjectErrors(
    selectedProject,
    statusFilter === "all" ? undefined : { status: statusFilter }
  );

  const errors = data?.errors ?? [];

  const filterOptions: ErrorStatusFilter[] = [
    "all",
    "OPEN",
    "RESOLVED",
    "IGNORED",
  ];

  return (
    <div className="page-enter">

      {/* Project Selector */}
      <div style={{ marginBottom: 16 }}>
        <select
          className="form-select"
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
        >
          <option value="">Select project...</option>
          {projects.map((p: Project) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      {/* Status Tabs */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24}}>
        <div className="tabs">
          {filterOptions.map(s => (
            <button
              key={s}
              className={`tab ${statusFilter === s ? "active" : ""}`}
              onClick={() => setStatusFilter(s)}
            >
              {s === "all" ? "All" : s}
            </button>
          ))}
        </div>
        <span style={{fontSize:12,color:"var(--text3)"}}>
          {errors.length} errors
        </span>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Error</th>
                <th>Service</th>
                <th>Status</th>
                <th>Occurrences</th>
                <th>First Seen</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={5} style={{ padding: 20 }}>
                    Loading...
                  </td>
                </tr>
              )}

              {!isLoading && errors.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ padding: 20 }}>
                    No errors found.
                  </td>
                </tr>
              )}

              {!isLoading &&
                errors.map((e: ErrorGroup) => (
                  <tr key={e.id}>
                    <td style={{ maxWidth: 360 }}>
                      <div style={{display:"flex",alignItems:"center",gap:8}}>
                        <span style={{color:"var(--red)"}}>
                          <Icons.bug />
                        </span>
                        <span className="td-mono">{e.title}</span>
                      </div>
                    </td>

                    <td>
                      <span className="badge b-service">
                        {e.service}
                      </span>
                    </td>

                    <td>
                      <span className={`badge status-${e.status.toLowerCase()}`}>
                        {e.status}
                      </span>
                    </td>

                    <td className="td-mono">
                      {e.occurrences.toLocaleString()}
                    </td>

                    <td className="td-muted">
                      {new Date(e.firstSeen).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
// ─── Nav Config ───────────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  { id: "dashboard",      label: "Overview",    Icon: Icons.dashboard, section: null },
  { id: "projects",       label: "Projects",    Icon: Icons.projects,  section: "Manage" },
  { id: "errors",         label: "Errors",      Icon: Icons.bug,       section: "Monitor", badge: 16 },
  { id: "api-keys",       label: "API Keys",    Icon: Icons.key,       section: "Developer" },
  { id: "create-project", label: "New Project", Icon: Icons.plus,      section: "Developer", hidden: true },
  { id: "profile",        label: "Profile",     Icon: Icons.user,      section: "Account" },
];

const PAGE_TITLES: Record<NavPage, PageTitleConfig> = {
  "dashboard":      { title: "Overview",    subtitle: "Monitor your projects and errors at a glance" },
  "projects":       { title: "Projects",    subtitle: "All your tracked projects" },
  "errors":         { title: "Errors",      subtitle: "Browse and triage incoming errors" },
  "api-keys":       { title: "API Keys",    subtitle: "Manage project-scoped API keys" },
  "create-project": { title: "New Project", subtitle: "Configure a new tracking project" },
  "profile":        { title: "My Profile",  subtitle: "Manage your account and security" },
};

// ─── App Shell ────────────────────────────────────────────────────────────────

export default function App() {
  const { user: currentUser, logout } = useAuth();
  const { data, isLoading, error, isError } = useGetMyProjects();
  const [active, setActive] = useState<NavPage>("dashboard");
  const projects = data?.projects ?? [];
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string): void => setToast(msg);
  const navItems: NavItem[] = NAV_ITEMS.filter(p => !p.hidden);
  let lastSection: NavSection = null;
  const { title, subtitle } = PAGE_TITLES[active];

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <aside className="sidebar">
          <div className="sidebar-logo">
            <div className="logo-mark"><Icons.bug /></div>
            <div>
              <div className="logo-text"><span className="text-gradient">BugState</span></div>
              <div className="logo-sub">Error Tracking</div>
            </div>
          </div>

          <nav className="sidebar-nav">
            {navItems.map((item: NavItem) => {
              const showSection = item.section && item.section !== lastSection;
              if (showSection) lastSection = item.section;
              return (
                <div key={item.id}>
                  {showSection && <div className="nav-section-label">{item.section}</div>}
                  <div className={`nav-item ${active === item.id ? "active" : ""}`} onClick={() => setActive(item.id)}>
                    <item.Icon />
                    {item.label}
                    {item.badge !== undefined && <span className="nav-badge">{item.badge}</span>}
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="sidebar-footer">
            <div className="user-card" onClick={() => setActive("profile")}>
              <div className="avatar">{currentUser?.name?.split(" ").map((n: string) => n[0]).join("") ?? "…"}</div>
              <div style={{flex:1,minWidth:0}}>
                <div className="user-name">{currentUser?.name ?? ""}</div>
                <div className="user-email" style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{currentUser?.email ?? ""}</div>
              </div>
              <span style={{color:"var(--text3)",flexShrink:0}}><Icons.chevronRight /></span>
            </div>
            <button
              className="btn btn-ghost btn-sm"
              onClick={logout}
              title="Sign out"
              style={{width:"100%",marginTop:8,display:"flex",alignItems:"center",justifyContent:"center",gap:6,color:"var(--text3)",fontSize:12}}
            >
              <Icons.logout />Sign out
            </button>
          </div>
        </aside>

        <main className="main">
          <div className="header">
            <div>
              <div className="page-title">{title}</div>
              <div className="page-subtitle">{subtitle}</div>
            </div>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              {active === "projects"  && <button className="btn btn-primary"   onClick={() => setActive("create-project")}><Icons.plus />New Project</button>}
              {active === "api-keys"  && <button className="btn btn-secondary" onClick={() => setActive("projects")}><Icons.projects />Projects</button>}
            </div>
          </div>

          <div className="content">
            {active === "dashboard"      && <DashboardPage     projects={projects} onNavigate={setActive} />}
            {active === "projects"       && <ProjectsPage      projects={projects} onNavigate={setActive} />}
            {active === "create-project" && <CreateProjectPage onSuccess={() => setActive("projects")} toast={showToast} />}
            {active === "api-keys"       && <ApiKeysPage       projects={projects} toast={showToast} />}
            {active === "errors"         && <ErrorsPage        projects={projects} />}
            {active === "profile"        && <ProfilePage       toast={showToast} />}
          </div>
        </main>
      </div>

      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </>
  );
}