export const css = `
  @import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    /* ── Dark palette sourced from provided .dark CSS variables ── */
    --bg:           hsl(0 0% 9%);
    --surface:      hsl(0 0% 14%);
    --surface2:     hsl(0 0% 20%);
    --surface3:     hsl(0 0% 25%);
    --border:       hsl(0 0% 32% / 0.5);
    --border2:      hsl(0 0% 32%);

    --text:         hsl(0 0% 98%);
    --text2:        hsl(0 0% 70%);
    --text3:        hsl(0 0% 45%);

    /* Primary — hsl(158 64% 51%) from --primary dark */
    --primary:      hsl(158 64% 51%);
    --primary-dim:  hsl(158 64% 51% / 0.12);
    --primary-glow: hsl(158 64% 51% / 0.28);
    --primary-fg:   hsl(165 91% 9%);

    /* Accent teal — hsl(172 66% 50%) --accent-foreground dark */
    --accent:       hsl(172 66% 50%);
    --accent-dim:   hsl(178 84% 10%);

    /* Semantic */
    --red:          hsl(0 84% 60%);
    --red-dim:      hsl(0 84% 60% / 0.13);
    --yellow:       hsl(43 96% 56%);
    --yellow-dim:   hsl(43 96% 56% / 0.13);

    /* Chart greens from --chart-1..4 dark */
    --chart1: hsl(156 71% 66%);
    --chart2: hsl(141 76% 73%);
    --chart3: hsl(170 76% 64%);
    --chart4: hsl(81  84% 67%);

    --radius:    0.75rem;
    --radius-sm: 0.5rem;
    --transition: 0.2s cubic-bezier(0.4,0,0.2,1);

    --font-sans: 'Work Sans', ui-sans-serif, system-ui, sans-serif;
    --font-mono: 'Inconsolata', ui-monospace, monospace;

    --shadow-sm: 0 1px 3px hsl(0 0% 0% / 0.35), 0 1px 2px -1px hsl(0 0% 0% / 0.35);
    --shadow-md: 0 1px 3px hsl(0 0% 0% / 0.45), 0 4px 8px -2px hsl(0 0% 0% / 0.4);
    --shadow-lg: 0 1px 3px hsl(0 0% 0% / 0.5),  0 10px 20px -4px hsl(0 0% 0% / 0.5);
  }

  html, body, #root {
    height: 100%;
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
  }

  .app { display: flex; height: 100vh; overflow: hidden; }

  /* ── Sidebar ── */
  .sidebar {
    width: 250px; min-width: 250px;
    background: var(--surface);
    border-right: 1px solid var(--border2);
    display: flex; flex-direction: column;
    position: relative; overflow: hidden;
  }
  /* Hero gradient accent line — mirrors hero-gradient from CSS */
  .sidebar::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg,
      transparent 0%,
      hsl(161 93% 30%) 30%,
      hsl(172 66% 50%) 60%,
      transparent 100%);
  }
  /* Radial ambient glow — mirrors glow-primary */
  .sidebar::after {
    content: ''; position: absolute; top: -80px; left: -80px;
    width: 280px; height: 280px;
    background: radial-gradient(circle, var(--primary-glow) 0%, transparent 65%);
    pointer-events: none;
  }

  .sidebar-logo {
    padding: 22px 20px;
    display: flex; align-items: center; gap: 11px;
    border-bottom: 1px solid var(--border);
    position: relative; z-index: 1;
  }
  .logo-mark {
    width: 34px; height: 34px; border-radius: 8px; flex-shrink: 0;
    background: linear-gradient(135deg, hsl(161 93% 30%), hsl(172 66% 50%));
    display: flex; align-items: center; justify-content: center;
    animation: pulse-glow 3s ease-in-out infinite;
  }
  @keyframes pulse-glow {
    0%,100% { box-shadow: 0 0 16px var(--primary-glow); }
    50%      { box-shadow: 0 0 30px var(--primary-glow), 0 0 60px hsl(158 64% 51% / 0.15); }
  }
  .logo-text { font-size: 15px; font-weight: 700; letter-spacing: -0.02em; }
  /* text-gradient utility from CSS */
  .text-gradient {
    background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .logo-sub {
    font-size: 10px; color: var(--text3); font-family: var(--font-mono);
    letter-spacing: 0.12em; text-transform: uppercase; margin-top: 1px;
  }

  .sidebar-nav {
    flex: 1; padding: 12px 10px;
    display: flex; flex-direction: column; gap: 2px;
    overflow-y: auto; position: relative; z-index: 1;
  }
  .nav-section-label {
    font-size: 10px; font-weight: 600; color: var(--text3);
    letter-spacing: 0.12em; text-transform: uppercase;
    padding: 14px 10px 5px;
  }
  .nav-item {
    display: flex; align-items: center; gap: 10px;
    padding: 9px 12px; border-radius: var(--radius-sm);
    cursor: pointer; transition: all var(--transition);
    color: var(--text3); font-size: 14px; font-weight: 500;
    position: relative; border: 1px solid transparent;
  }
  .nav-item:hover { background: var(--surface2); color: var(--text2); }
  .nav-item.active {
    background: var(--primary-dim);
    color: var(--primary);
    border-color: hsl(158 64% 51% / 0.2);
  }
  .nav-item.active::before {
    content: ''; position: absolute; left: 0; top: 50%; transform: translateY(-50%);
    width: 3px; height: 55%; background: var(--primary); border-radius: 0 3px 3px 0;
  }
  .nav-badge {
    margin-left: auto; font-size: 11px; font-family: var(--font-mono);
    background: var(--red-dim); color: var(--red); padding: 1px 7px; border-radius: 20px;
  }

  .sidebar-footer { padding: 12px 10px; border-top: 1px solid var(--border); position: relative; z-index: 1; }
  .user-card {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 12px; border-radius: var(--radius-sm);
    cursor: pointer; transition: all var(--transition);
    border: 1px solid transparent;
  }
  .user-card:hover { background: var(--surface2); border-color: var(--border); }
  .avatar {
    width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;
    background: linear-gradient(135deg, var(--primary), var(--accent));
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 700; color: var(--primary-fg);
  }
  .user-name  { font-size: 13px; font-weight: 600; }
  .user-email { font-size: 11px; color: var(--text3); }

  /* ── Main ── */
  .main {
    flex: 1; overflow-y: auto;
    display: flex; flex-direction: column; background: var(--bg);
  }
  .main::-webkit-scrollbar       { width: 4px; }
  .main::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 2px; }

  .header {
    padding: 22px 32px 20px;
    display: flex; align-items: flex-start; justify-content: space-between;
    position: sticky; top: 0; z-index: 10;
    background: hsl(0 0% 9% / 0.9);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--border);
  }
  .page-title    { font-size: 21px; font-weight: 700; letter-spacing: -0.03em; }
  .page-subtitle { font-size: 13px; color: var(--text3); margin-top: 3px; }

  .content { padding: 28px 32px; flex: 1; }

  /* ── Cards — glass-card inspired ── */
  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 20px;
    box-shadow: var(--shadow-sm);
    transition: border-color var(--transition), box-shadow var(--transition);
  }
  .card:hover { border-color: var(--border2); }
  .card-glow:hover {
    border-color: hsl(158 64% 51% / 0.3);
    box-shadow: 0 0 0 1px hsl(158 64% 51% / 0.08), var(--shadow-md);
  }
  .card-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 18px; }
  .card-title  { font-size: 11px; font-weight: 600; color: var(--text3); text-transform: uppercase; letter-spacing: 0.1em; }

  /* ── Stat cards ── */
  .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 28px; }
  .stat-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 20px 22px;
    position: relative; overflow: hidden;
    box-shadow: var(--shadow-sm);
    transition: all var(--transition);
  }
  .stat-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-lg); }
  /* top accent line */
  .stat-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; }
  .stat-card.c-green::before  { background: linear-gradient(90deg, var(--primary), var(--accent)); }
  .stat-card.c-red::before    { background: var(--red); }
  .stat-card.c-yellow::before { background: var(--yellow); }
  .stat-card.c-teal::before   { background: var(--accent); }
  /* ambient glow */
  .stat-glow { position: absolute; inset: 0; pointer-events: none; }
  .stat-card.c-green .stat-glow  { background: radial-gradient(ellipse at 85% 50%, var(--primary-glow), transparent 65%); }
  .stat-card.c-red .stat-glow    { background: radial-gradient(ellipse at 85% 50%, var(--red-dim), transparent 65%); }
  .stat-card.c-yellow .stat-glow { background: radial-gradient(ellipse at 85% 50%, var(--yellow-dim), transparent 65%); }
  .stat-card.c-teal .stat-glow   { background: radial-gradient(ellipse at 85% 50%, hsl(172 66% 50% / 0.1), transparent 65%); }
  .stat-label { font-size: 11px; font-weight: 600; color: var(--text3); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px; position: relative; }
  .stat-value { font-size: 34px; font-weight: 700; letter-spacing: -0.04em; font-family: var(--font-mono); position: relative; }
  .stat-sub   { font-size: 12px; color: var(--text3); margin-top: 5px; position: relative; }

  /* ── Grids ── */
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }

  /* ── Project cards ── */
  .project-card {
    background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
    padding: 20px; cursor: pointer; box-shadow: var(--shadow-sm);
    transition: all var(--transition); position: relative; overflow: hidden;
  }
  .project-card:hover {
    border-color: hsl(158 64% 51% / 0.35);
    transform: translateY(-2px);
    box-shadow: 0 0 0 1px hsl(158 64% 51% / 0.08), var(--shadow-lg);
  }
  .project-card::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, var(--primary), transparent);
    opacity: 0; transition: opacity var(--transition);
  }
  .project-card:hover::after { opacity: 0.4; }
  .project-name { font-size: 15px; font-weight: 600; margin-bottom: 5px; }
  .project-desc { font-size: 12px; color: var(--text3); margin-bottom: 16px; line-height: 1.6; }
  .project-meta { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }

  /* ── Badges ── */
  .badge {
    display: inline-flex; align-items: center; gap: 4px; padding: 3px 9px;
    border-radius: 20px; font-size: 11px; font-weight: 600; font-family: var(--font-mono);
  }
  .badge.env-production  { background: var(--red-dim);      color: var(--red); }
  .badge.env-staging     { background: var(--yellow-dim);   color: var(--yellow); }
  .badge.env-development { background: var(--primary-dim);  color: var(--primary); }
  .badge.status-open     { background: var(--red-dim);      color: var(--red); }
  .badge.status-resolved { background: var(--primary-dim);  color: var(--primary); }
  .badge.status-ignored  { background: hsl(0 0% 32% / 0.3); color: var(--text3); }
  .badge.b-active        { background: var(--primary-dim);  color: var(--primary); }
  .badge.b-inactive      { background: hsl(0 0% 32% / 0.3); color: var(--text3); }
  .badge.b-service       { background: var(--accent-dim);   color: var(--accent); }

  /* ── Table ── */
  .table-wrap { overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; }
  th { font-size: 11px; font-weight: 600; color: var(--text3); text-transform: uppercase; letter-spacing: 0.1em; padding: 0 16px 12px; text-align: left; border-bottom: 1px solid var(--border); }
  td { padding: 13px 16px; font-size: 13px; border-bottom: 1px solid var(--border); vertical-align: middle; }
  tr:last-child td { border-bottom: none; }
  tr:hover td { background: var(--surface2); }
  .td-mono  { font-family: var(--font-mono); font-size: 12px; color: var(--text2); }
  .td-muted { color: var(--text3); font-size: 12px; }

  /* ── Buttons ── */
  .btn {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 9px 16px; border-radius: var(--radius-sm);
    font-family: var(--font-sans); font-size: 13px; font-weight: 600;
    cursor: pointer; transition: all var(--transition); border: 1px solid transparent; white-space: nowrap;
  }
  .btn:disabled { opacity: 0.5; cursor: not-allowed; }
  /* glow-primary on primary button */
  .btn-primary {
    background: var(--primary); color: var(--primary-fg); border-color: var(--primary);
  }
  .btn-primary:hover {
    background: hsl(158 64% 57%);
    box-shadow: 0 0 20px var(--primary-glow), 0 0 40px hsl(158 64% 51% / 0.12);
  }
  .btn-secondary { background: var(--surface2); color: var(--text); border-color: var(--border2); }
  .btn-secondary:hover { background: var(--surface3); }
  .btn-danger    { background: var(--red-dim); color: var(--red); border-color: hsl(0 84% 60% / 0.2); }
  .btn-danger:hover { background: hsl(0 84% 60% / 0.2); }
  .btn-ghost  { background: transparent; color: var(--text3); }
  .btn-ghost:hover { background: var(--surface2); color: var(--text2); }
  .btn-sm   { padding: 6px 12px; font-size: 12px; }
  .btn-icon { padding: 8px; }

  /* ── Forms ── */
  .form-group { margin-bottom: 20px; }
  .form-label { display: block; font-size: 11px; font-weight: 600; color: var(--text3); margin-bottom: 7px; text-transform: uppercase; letter-spacing: 0.08em; }
  .form-input, .form-select, .form-textarea {
    width: 100%; background: var(--surface2); border: 1px solid var(--border2);
    border-radius: var(--radius-sm); color: var(--text);
    font-family: var(--font-sans); font-size: 14px; padding: 11px 14px;
    outline: none; transition: all var(--transition);
  }
  .form-input:focus, .form-select:focus, .form-textarea:focus {
    border-color: hsl(158 64% 51% / 0.55);
    box-shadow: 0 0 0 3px var(--primary-dim);
  }
  .form-input::placeholder { color: var(--text3); }
  .form-select  { appearance: none; cursor: pointer; }
  .form-textarea { resize: vertical; min-height: 90px; line-height: 1.55; }
  .form-hint { font-size: 11px; color: var(--text3); margin-top: 5px; }

  /* ── Key display ── */
  .key-display {
    display: flex; align-items: center; gap: 8px;
    background: var(--accent-dim); border: 1px solid hsl(172 66% 50% / 0.22);
    border-radius: var(--radius-sm); padding: 12px 14px;
  }
  .key-value { flex: 1; font-family: var(--font-mono); font-size: 13px; color: var(--primary); word-break: break-all; }

  /* ── Alerts ── */
  .alert { display: flex; gap: 12px; padding: 13px 16px; border-radius: var(--radius-sm); border: 1px solid; margin-bottom: 20px; font-size: 13px; line-height: 1.5; }
  .alert-warning { background: var(--yellow-dim); border-color: hsl(43 96% 56% / 0.25); color: var(--yellow); }
  .alert-success { background: var(--primary-dim); border-color: hsl(158 64% 51% / 0.25); color: var(--primary); }
  .alert-info    { background: var(--accent-dim);  border-color: hsl(172 66% 50% / 0.25); color: var(--accent); }

  /* ── Profile header ── */
  .profile-header {
    display: flex; align-items: center; gap: 20px; padding: 24px;
    background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
    margin-bottom: 24px; position: relative; overflow: hidden;
  }
  .profile-header::before {
    content: ''; position: absolute; top: -80px; right: -80px;
    width: 260px; height: 260px;
    background: radial-gradient(circle, var(--primary-glow), transparent 65%);
    pointer-events: none;
  }
  .profile-avatar {
    width: 64px; height: 64px; border-radius: 50%; flex-shrink: 0;
    background: linear-gradient(135deg, var(--primary), var(--accent));
    display: flex; align-items: center; justify-content: center;
    font-size: 22px; font-weight: 700; color: var(--primary-fg);
    border: 2px solid hsl(158 64% 51% / 0.35);
    box-shadow: 0 0 28px var(--primary-glow);
  }
  .profile-name  { font-size: 20px; font-weight: 700; letter-spacing: -0.03em; }
  .profile-email { font-size: 13px; color: var(--text3); margin-top: 3px; }

  /* ── Tabs ── */
  .tabs {
    display: flex; gap: 2px;
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius-sm); padding: 3px;
    margin-bottom: 24px; width: fit-content;
  }
  .tab {
    padding: 7px 16px; border-radius: 5px; font-size: 13px; font-weight: 600;
    cursor: pointer; transition: all var(--transition); color: var(--text3);
    border: none; background: none; font-family: var(--font-sans);
  }
  .tab.active { background: var(--primary-dim); color: var(--primary); }
  .tab:hover:not(.active) { color: var(--text2); }

  /* ── Env dot ── */
  .env-dot { width: 6px; height: 6px; border-radius: 50%; display: inline-block; }
  .env-dot.production  { background: var(--red); }
  .env-dot.staging     { background: var(--yellow); }
  .env-dot.development { background: var(--primary); }

  /* ── Error bar ── */
  .error-bar-wrap { display: flex; gap: 3px; height: 3px; border-radius: 2px; overflow: hidden; margin-top: 12px; }
  .error-bar { height: 100%; border-radius: 2px; transition: width 0.8s cubic-bezier(.4,0,.2,1); }

  /* ── Animations from provided CSS ── */
  @keyframes slide-up { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
  @keyframes fade-in  { 0% { opacity: 0; } 100% { opacity: 1; } }
  .page-enter { animation: slide-up 0.3s ease-out forwards; }

  /* ── Toast — glow-primary styled ── */
  .toast {
    position: fixed; bottom: 24px; right: 24px;
    background: var(--surface); border: 1px solid hsl(158 64% 51% / 0.4);
    color: var(--primary); padding: 12px 20px; border-radius: var(--radius-sm);
    font-size: 13px; font-weight: 600;
    display: flex; align-items: center; gap: 8px; z-index: 1000;
    box-shadow: 0 0 30px var(--primary-glow), var(--shadow-lg);
    animation: slide-up 0.3s ease-out forwards;
  }

  /* ── Scrollbar ── */
  ::-webkit-scrollbar { width: 4px; height: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 2px; }
  ::-webkit-scrollbar-thumb:hover { background: var(--text3); }
`;