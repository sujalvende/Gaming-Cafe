import { useState, useRef, useLayoutEffect } from 'react';
import { Link, NavLink, Routes, Route, useLocation } from 'react-router-dom';
import { tournaments, adminRegistrations, winners as initialWinners, zones, games as initialGames } from '../../data';
import { gsap } from '../../lib/gsap';

// ── Sidebar ───────────────────────────────────────────────────────────────────

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: '▦' },
  { to: '/admin/tournaments', label: 'Tournaments', icon: '🏆' },
  { to: '/admin/registrations', label: 'Registrations', icon: '📋' },
  { to: '/admin/winners', label: 'Winners', icon: '🥇' },
  { to: '/admin/bookings', label: 'Bookings', icon: '📅' },
  { to: '/admin/availability', label: 'Availability', icon: '🖥' },
  { to: '/admin/games', label: 'Games', icon: '🎮' },
];

function AdminSidebar({ onClose }: { onClose?: () => void }) {
  return (
    <aside className="w-64 bg-bg2 border-r border-white/8 flex flex-col min-h-screen">
      <div className="px-6 py-6 border-b border-white/8">
        <Link to="/" className="flex items-center gap-2.5" onClick={onClose}>
          <span className="w-8 h-8 bg-lime rounded-sm flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-bg">
              <path d="M6 9h2v2H6V9zm4 0h2v2h-2V9zm4 0h2v2h-2V9zM3 5h18a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1zm1 2v10h16V7H4z" />
            </svg>
          </span>
          <div>
            <span className="font-display font-bold text-base text-text tracking-wide block">NEXUS</span>
            <span className="font-display text-[9px] font-semibold uppercase tracking-widest text-muted block -mt-0.5">
              Control Plane
            </span>
          </div>
        </Link>
      </div>
      <nav className="flex-1 py-5 px-3 space-y-1" aria-label="Admin navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/admin'}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded text-sm transition-all ${
                isActive
                  ? 'bg-lime/15 text-lime font-semibold border-l-2 border-lime shadow-xs'
                  : 'text-muted hover:text-text hover:bg-surface/60'
              }`
            }
          >
            <span className="text-base" aria-hidden="true">{item.icon}</span>
            <span className="font-display font-medium text-xs uppercase tracking-wider">
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-white/8">
        <Link
          to="/"
          className="text-muted text-xs font-display font-semibold uppercase tracking-widest hover:text-text transition-colors flex items-center gap-2 p-2 rounded hover:bg-surface/50"
        >
          <span>←</span> Public Site
        </Link>
      </div>
    </aside>
  );
}

// ── Dashboard Home ────────────────────────────────────────────────────────────

function DashboardHome() {
  const totalAvail = zones.reduce((a, z) => a + z.stations.filter((s) => s.status === 'available').length, 0);
  const totalStations = zones.reduce((a, z) => a + z.stations.length, 0);
  const pendingRegs = adminRegistrations.filter((r) => r.status === 'pending').length;
  const upcomingTournaments = tournaments.filter((t) => t.status === 'upcoming').length;

  return (
    <div className="p-6 sm:p-10 max-w-7xl">
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-text">Overview Dashboard</h1>
        <p className="text-muted text-sm mt-1">Real-time telemetry and management controls for Nexus Lounge</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
        {[
          { label: 'Stations Available', value: `${totalAvail}/${totalStations}`, color: 'text-lime', sub: 'Ready for walk-ins' },
          { label: 'Pending Approvals', value: pendingRegs, color: 'text-reserved', sub: 'Tournament team entries' },
          { label: 'Active Tournaments', value: upcomingTournaments, color: 'text-cyan', sub: 'Scheduled circuit events' },
          { label: 'Total Teams', value: adminRegistrations.length, color: 'text-text', sub: 'Registered rosters' },
        ].map((s) => (
          <div key={s.label} className="bg-surface border border-white/8 rounded p-5 sm:p-6 shadow-xs">
            <div className="font-display text-[10px] font-semibold uppercase tracking-widest text-muted mb-2">
              {s.label}
            </div>
            <div className={`font-display font-bold text-3xl sm:text-4xl ${s.color}`}>{s.value}</div>
            <div className="text-muted text-xs mt-1.5">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Quick shortcuts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface border border-white/8 rounded p-6">
          <h3 className="font-display font-bold text-lg text-text mb-2">Quick Station Override</h3>
          <p className="text-muted text-xs mb-4 leading-relaxed">Toggle live availability for PC, PS5, VIP, and Bootcamp stations.</p>
          <Link to="/admin/availability" className="inline-flex items-center gap-1.5 text-lime text-xs font-display font-semibold uppercase tracking-widest hover:underline">
            Manage Stations →
          </Link>
        </div>
        <div className="bg-surface border border-white/8 rounded p-6">
          <h3 className="font-display font-bold text-lg text-text mb-2">Pending Registrations</h3>
          <p className="text-muted text-xs mb-4 leading-relaxed">{pendingRegs} team entries require captain verification and approval.</p>
          <Link to="/admin/registrations" className="inline-flex items-center gap-1.5 text-lime text-xs font-display font-semibold uppercase tracking-widest hover:underline">
            Review Teams →
          </Link>
        </div>
        <div className="bg-surface border border-white/8 rounded p-6">
          <h3 className="font-display font-bold text-lg text-text mb-2">Active Bookings</h3>
          <p className="text-muted text-xs mb-4 leading-relaxed">Track customer reservations, active timers, and counter checkout.</p>
          <Link to="/admin/bookings" className="inline-flex items-center gap-1.5 text-lime text-xs font-display font-semibold uppercase tracking-widest hover:underline">
            View Bookings →
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Tournament Manager ────────────────────────────────────────────────────────

function TournamentManager() {
  const [tournamentList, setTournamentList] = useState(tournaments);
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: '',
    game: 'VALORANT',
    format: 'Single Elimination',
    playersPerTeam: 5,
    maxTeams: 16,
    entryFee: 500,
    prizePool: 25000,
    date: '2026-04-15',
    time: '6:00 PM',
    registrationStatus: 'open',
    description: '',
  });

  const handleEdit = (t: (typeof tournaments)[0]) => {
    setEditingId(t.id);
    setForm({
      name: t.name,
      game: t.game,
      format: t.format,
      playersPerTeam: t.playersPerTeam,
      maxTeams: t.maxTeams,
      entryFee: t.entryFee,
      prizePool: t.prizePool,
      date: t.date,
      time: t.time,
      registrationStatus: t.registrationStatus,
      description: t.description,
    });
    setCreating(true);
  };

  const handleCreateNew = () => {
    setEditingId(null);
    setForm({
      name: '',
      game: 'VALORANT',
      format: 'Single Elimination',
      playersPerTeam: 5,
      maxTeams: 16,
      entryFee: 500,
      prizePool: 25000,
      date: '2026-04-15',
      time: '6:00 PM',
      registrationStatus: 'open',
      description: '',
    });
    setCreating(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setTournamentList((prev) =>
        prev.map((t) => (t.id === editingId ? { ...t, ...form } : t))
      );
    } else {
      const newT = {
        id: `t-${Date.now()}`,
        ...form,
        registeredTeams: 0,
        status: 'upcoming' as const,
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&fit=crop',
        rules: ['Standard competitive rules apply.'],
      };
      setTournamentList([newT, ...tournamentList]);
    }
    setCreating(false);
    setEditingId(null);
  };

  const inputCls = 'w-full bg-bg2 border border-white/10 rounded py-2.5 px-3 text-sm text-text focus:outline-none focus:border-lime/40 transition-colors';
  const labelCls = 'font-display text-[10px] font-semibold uppercase tracking-widest text-muted block mb-1.5';

  return (
    <div className="p-6 sm:p-10 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display font-bold text-3xl text-text">Tournaments</h1>
          <p className="text-muted text-sm mt-1">
            {tournamentList.length} total · {tournamentList.filter((t) => t.status === 'upcoming').length} upcoming
          </p>
        </div>
        <button
          onClick={handleCreateNew}
          className="bg-lime text-bg font-display font-bold text-xs uppercase tracking-widest px-5 py-3 rounded hover:bg-lime-dim transition-colors cursor-pointer"
        >
          + Create Tournament
        </button>
      </div>

      {creating && (
        <form onSubmit={handleSubmit} className="mb-10 bg-surface border border-white/10 rounded p-6 sm:p-8 flex flex-col gap-5 max-w-3xl shadow-sm">
          <h2 className="font-display font-bold text-xl text-text">
            {editingId ? 'Edit Tournament' : 'Create New Tournament'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className={labelCls}>Tournament Name *</label>
              <input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="e.g. Valorant Showdown Season 4"
                className={inputCls}
                required
              />
            </div>
            <div>
              <label className={labelCls}>Game</label>
              <select
                value={form.game}
                onChange={(e) => setForm((f) => ({ ...f, game: e.target.value }))}
                className={inputCls}
              >
                {['VALORANT', 'CS2', 'EA FC 25', 'Rocket League', 'Tekken 8', 'Dota 2'].map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Format</label>
              <select
                value={form.format}
                onChange={(e) => setForm((f) => ({ ...f, format: e.target.value }))}
                className={inputCls}
              >
                {['Single Elimination', 'Double Elimination', 'Round Robin', 'Round Robin + Finals', 'Swiss'].map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Players Per Team</label>
              <select
                value={form.playersPerTeam}
                onChange={(e) => setForm((f) => ({ ...f, playersPerTeam: +e.target.value }))}
                className={inputCls}
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Max Teams</label>
              <input
                type="number"
                value={form.maxTeams}
                onChange={(e) => setForm((f) => ({ ...f, maxTeams: +e.target.value }))}
                className={inputCls}
                min={2}
                required
              />
            </div>
            <div>
              <label className={labelCls}>Entry Fee (₹/team)</label>
              <input
                type="number"
                value={form.entryFee}
                onChange={(e) => setForm((f) => ({ ...f, entryFee: +e.target.value }))}
                className={inputCls}
                min={0}
                required
              />
            </div>
            <div>
              <label className={labelCls}>Prize Pool (₹)</label>
              <input
                type="number"
                value={form.prizePool}
                onChange={(e) => setForm((f) => ({ ...f, prizePool: +e.target.value }))}
                className={inputCls}
                min={0}
                required
              />
            </div>
            <div>
              <label className={labelCls}>Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                className={inputCls}
                required
              />
            </div>
            <div>
              <label className={labelCls}>Time</label>
              <input
                value={form.time}
                onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
                placeholder="e.g. 7:00 PM"
                className={inputCls}
                required
              />
            </div>
          </div>
          <div className="flex gap-4 pt-3">
            <button
              type="submit"
              className="bg-lime text-bg font-display font-bold text-xs uppercase tracking-widest px-6 py-3 rounded hover:bg-lime-dim transition-colors cursor-pointer"
            >
              {editingId ? 'Save Changes' : 'Publish Tournament'}
            </button>
            <button
              type="button"
              onClick={() => { setCreating(false); setEditingId(null); }}
              className="border border-white/20 text-muted hover:text-text font-display font-semibold text-xs uppercase tracking-widest px-6 py-3 rounded transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Tournaments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {tournamentList.map((t) => (
          <div key={t.id} className="bg-surface border border-white/8 rounded p-6 flex flex-col justify-between hover:border-white/20 transition-all shadow-xs">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="font-display text-[10px] font-semibold uppercase tracking-widest text-cyan bg-cyan/10 px-2 py-0.5 rounded-sm">
                  {t.game}
                </span>
                <span className={`font-display text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-sm ${
                  t.status === 'upcoming' ? 'bg-available/10 text-available' : 'bg-surface2 text-muted'
                }`}>
                  {t.status}
                </span>
              </div>
              <h3 className="font-display font-bold text-lg text-text mb-2">{t.name}</h3>
              <div className="text-muted text-xs space-y-1 mb-5">
                <div>📅 {new Date(t.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} at {t.time}</div>
                <div>👥 {t.registeredTeams}/{t.maxTeams} Teams · {t.playersPerTeam}v{t.playersPerTeam}</div>
                <div>🏆 Prize: <strong className="text-gold">₹{t.prizePool.toLocaleString('en-IN')}</strong></div>
              </div>
            </div>
            <div className="pt-4 border-t border-white/8 flex gap-2">
              <button
                onClick={() => handleEdit(t)}
                className="flex-1 border border-white/20 text-text font-display font-semibold text-xs uppercase tracking-wider py-2.5 rounded hover:border-white/40 transition-colors cursor-pointer"
              >
                Edit
              </button>
              <Link
                to={`/tournaments/${t.id}`}
                className="flex-1 bg-surface2 text-muted hover:text-text font-display font-semibold text-xs uppercase tracking-wider py-2.5 rounded text-center transition-colors"
              >
                Public Page
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Registration Manager (Card-Based UI) ──────────────────────────────────────

function RegistrationManager() {
  const [registrations, setRegistrations] = useState(adminRegistrations);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'confirmed' | 'rejected'>('all');
  const [search, setSearch] = useState('');
  const [activeModalReg, setActiveModalReg] = useState<(typeof adminRegistrations)[0] | null>(null);

  const statusColors: Record<string, string> = {
    confirmed: 'bg-available/15 text-available border-available/30',
    approved: 'bg-available/15 text-available border-available/30',
    rejected: 'bg-inuse/15 text-inuse border-inuse/30',
    pending: 'bg-reserved/15 text-reserved border-reserved/30',
  };

  const updateStatus = (id: string, newStatus: 'confirmed' | 'rejected' | 'pending') => {
    setRegistrations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
    if (activeModalReg && activeModalReg.id === id) {
      setActiveModalReg({ ...activeModalReg, status: newStatus });
    }
  };

  const filtered = registrations.filter((r) => {
    const matchStatus = statusFilter === 'all' || r.status === statusFilter;
    const matchSearch =
      r.teamName.toLowerCase().includes(search.toLowerCase()) ||
      r.captainName.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="p-6 sm:p-10 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display font-bold text-3xl text-text">Team Registrations</h1>
          <p className="text-muted text-sm mt-1">
            {registrations.length} total entries · {registrations.filter((r) => r.status === 'pending').length} pending approval
          </p>
        </div>
      </div>

      {/* Controls: Search + Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        {/* Search */}
        <div className="relative w-full max-w-sm">
          <input
            type="search"
            placeholder="Search by team, captain, ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-surface border border-white/10 rounded py-2.5 pl-9 pr-4 text-sm text-text placeholder:text-muted/60 focus:outline-none focus:border-lime/40 transition-colors"
          />
          <svg className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2" role="group" aria-label="Filter registrations by status">
          {(['all', 'pending', 'confirmed', 'rejected'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`font-display text-[11px] font-semibold uppercase tracking-widest px-4 py-2 rounded transition-all cursor-pointer ${
                statusFilter === s
                  ? 'bg-lime text-bg shadow-sm'
                  : 'bg-surface border border-white/10 text-muted hover:text-text hover:border-white/20'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 bg-surface border border-white/8 rounded p-8">
          <p className="text-muted text-sm">No registrations match your search or filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((r) => {
            const tourney = tournaments.find((t) => t.id === r.tournamentId);
            return (
              <div
                key={r.id}
                className="bg-surface border border-white/8 rounded p-6 flex flex-col justify-between hover:border-white/20 transition-all shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs font-bold text-lime">{r.id}</span>
                    <span className={`font-display text-[10px] font-semibold uppercase tracking-widest px-2.5 py-0.5 rounded-sm border ${statusColors[r.status] || 'bg-surface2 text-muted'}`}>
                      {r.status}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-text mb-1">{r.teamName}</h3>
                  <div className="text-muted text-xs mb-4">Captain: <strong className="text-text">{r.captainName}</strong></div>

                  <div className="bg-bg2/60 border border-white/5 rounded p-3 text-xs space-y-1.5 mb-4">
                    <div className="text-muted">Tournament: <span className="text-cyan font-semibold">{tourney?.name || r.tournamentId}</span></div>
                    <div className="text-muted">Roster: <span className="text-text">{r.players.length} players ({r.players.slice(0, 3).join(', ')}{r.players.length > 3 ? '...' : ''})</span></div>
                    <div className="text-muted">Payment: <span className={r.paymentStatus === 'paid' ? 'text-available font-semibold' : 'text-reserved font-semibold'}>{r.paymentStatus.toUpperCase()}</span></div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/8 flex items-center gap-2">
                  {r.status === 'pending' ? (
                    <>
                      <button
                        onClick={() => updateStatus(r.id, 'confirmed')}
                        className="flex-1 bg-available text-bg font-display font-bold text-xs uppercase tracking-wider py-2.5 rounded hover:opacity-90 transition-opacity cursor-pointer"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(r.id, 'rejected')}
                        className="flex-1 border border-inuse/40 text-inuse font-display font-semibold text-xs uppercase tracking-wider py-2.5 rounded hover:bg-inuse/10 transition-colors cursor-pointer"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => updateStatus(r.id, r.status === 'confirmed' ? 'rejected' : 'confirmed')}
                      className="flex-1 border border-white/20 text-muted hover:text-text font-display font-semibold text-xs uppercase tracking-wider py-2.5 rounded transition-colors cursor-pointer"
                    >
                      Toggle {r.status === 'confirmed' ? 'Reject' : 'Approve'}
                    </button>
                  )}
                  <button
                    onClick={() => setActiveModalReg(r)}
                    className="p-2.5 rounded border border-white/10 text-muted hover:text-text hover:bg-surface2 transition-colors cursor-pointer"
                    title="View Details"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Roster & Contact Detail Modal */}
      {activeModalReg && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-bg/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveModalReg(null)}
        >
          <div
            className="bg-surface border border-white/15 rounded p-6 sm:p-8 max-w-lg w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <span className="font-mono text-xs font-bold text-lime">{activeModalReg.id}</span>
                <h2 className="font-display font-bold text-2xl text-text mt-0.5">{activeModalReg.teamName}</h2>
              </div>
              <button
                onClick={() => setActiveModalReg(null)}
                className="w-8 h-8 rounded-sm bg-surface2 text-muted hover:text-text flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-5 text-sm">
              <div>
                <span className="font-display text-[10px] font-semibold uppercase tracking-widest text-muted block mb-1">Captain & Contact</span>
                <div className="text-text font-medium">{activeModalReg.captainName}</div>
                <div className="text-muted text-xs">{activeModalReg.email} · {activeModalReg.phone}</div>
                {activeModalReg.discord && <div className="text-muted text-xs mt-0.5">Discord: <span className="text-text">{activeModalReg.discord}</span></div>}
              </div>

              <div>
                <span className="font-display text-[10px] font-semibold uppercase tracking-widest text-muted block mb-2">Team Roster ({activeModalReg.players.length} Players)</span>
                <div className="bg-bg2/80 rounded p-3 border border-white/5 space-y-1 text-xs">
                  {activeModalReg.players.map((p, idx) => (
                    <div key={idx} className="flex items-center justify-between text-text">
                      <span>Player {idx + 1}: {p}</span>
                      {idx === 0 && <span className="text-lime font-display font-semibold uppercase text-[9px]">Captain</span>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-white/10">
                <button
                  onClick={() => updateStatus(activeModalReg.id, 'confirmed')}
                  className="flex-1 bg-available text-bg font-display font-bold text-xs uppercase tracking-widest py-3 rounded hover:opacity-90 cursor-pointer"
                >
                  Approve Entry
                </button>
                <button
                  onClick={() => updateStatus(activeModalReg.id, 'rejected')}
                  className="flex-1 border border-inuse/40 text-inuse font-display font-semibold text-xs uppercase tracking-widest py-3 rounded hover:bg-inuse/10 cursor-pointer"
                >
                  Reject Entry
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Winners Manager ────────────────────────────────────────────────────────────

function WinnersManager() {
  const [winnerList, setWinnerList] = useState(initialWinners);
  const [form, setForm] = useState({
    tournamentId: tournaments[0].id,
    position: 1,
    teamName: '',
    players: '',
    prize: '',
    description: '',
  });

  const handleDeleteWinner = (id: string) => {
    setWinnerList(winnerList.filter((w) => w.id !== id));
  };

  const handleAddWinner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.teamName.trim()) return;
    const tourney = tournaments.find((t) => t.id === form.tournamentId);
    const newW = {
      id: `w-${Date.now()}`,
      tournamentId: form.tournamentId,
      tournamentName: tourney?.name || 'Nexus Tournament',
      game: tourney?.game || 'Competitive',
      position: +form.position as 1 | 2 | 3,
      teamName: form.teamName,
      players: form.players.split(',').map((s) => s.trim()).filter(Boolean),
      prize: +form.prize || 0,
      date: new Date().toISOString().split('T')[0],
      image: tourney?.image || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&fit=crop',
    };
    setWinnerList([newW, ...winnerList]);
    setForm({ tournamentId: tournaments[0].id, position: 1, teamName: '', players: '', prize: '', description: '' });
  };

  const inputCls = 'w-full bg-bg2 border border-white/10 rounded py-2 px-3 text-sm text-text focus:outline-none focus:border-lime/40 transition-colors';
  const labelCls = 'font-display text-[10px] font-semibold uppercase tracking-widest text-muted block mb-1.5';

  return (
    <div className="p-6 sm:p-10 max-w-7xl">
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-text">Tournament Champions Archive</h1>
        <p className="text-muted text-sm mt-1">Publish podium results and award prize logs</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <h2 className="font-display font-bold text-xl text-text mb-6">Record New Champion</h2>
          <form onSubmit={handleAddWinner} className="bg-surface border border-white/8 rounded p-6 flex flex-col gap-4 shadow-xs">
            <div>
              <label className={labelCls}>Select Tournament</label>
              <select
                value={form.tournamentId}
                onChange={(e) => setForm((f) => ({ ...f, tournamentId: e.target.value }))}
                className={inputCls}
              >
                {tournaments.map((t) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Podium Position</label>
              <select
                value={form.position}
                onChange={(e) => setForm((f) => ({ ...f, position: +e.target.value }))}
                className={inputCls}
              >
                <option value={1}>🥇 1st Place (Champion)</option>
                <option value={2}>🥈 2nd Place (Runner Up)</option>
                <option value={3}>🥉 3rd Place</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Team / Winner Name *</label>
              <input
                value={form.teamName}
                onChange={(e) => setForm((f) => ({ ...f, teamName: e.target.value }))}
                placeholder="e.g. Velocity 9"
                className={inputCls}
                required
              />
            </div>
            <div>
              <label className={labelCls}>Players (comma-separated)</label>
              <input
                value={form.players}
                onChange={(e) => setForm((f) => ({ ...f, players: e.target.value }))}
                placeholder="Player1, Player2, Player3"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Prize Awarded (₹) *</label>
              <input
                type="number"
                value={form.prize}
                onChange={(e) => setForm((f) => ({ ...f, prize: e.target.value }))}
                placeholder="Prize amount in INR"
                className={inputCls}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-lime text-bg font-display font-bold text-xs uppercase tracking-widest px-6 py-3 rounded hover:bg-lime-dim transition-colors cursor-pointer mt-2"
            >
              Publish Result
            </button>
          </form>
        </div>

        <div>
          <h2 className="font-display font-bold text-xl text-text mb-6">Published Winners ({winnerList.length})</h2>
          <div className="flex flex-col gap-3">
            {winnerList.map((w) => (
              <div key={w.id} className="bg-surface border border-gold/20 rounded p-5 flex items-center justify-between shadow-xs">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-display text-[10px] font-semibold uppercase tracking-widest text-gold">
                      {w.position === 1 ? '🥇 1st' : w.position === 2 ? '🥈 2nd' : '🥉 3rd'} · {w.game}
                    </span>
                    <span className="font-display font-bold text-sm text-gold">
                      ₹{w.prize.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="font-display font-bold text-lg text-text">{w.teamName}</div>
                  <div className="text-muted text-xs mt-0.5">{w.tournamentName}</div>
                </div>
                <button
                  onClick={() => handleDeleteWinner(w.id)}
                  className="text-inuse/80 hover:text-inuse text-xs font-display font-semibold uppercase tracking-wider p-2 cursor-pointer transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Booking Manager (Card-Based UI) ───────────────────────────────────────────

function BookingManager() {
  const [bookingList, setBookingList] = useState([
    { id: 'BK-1041', user: 'Vikram Mehta', phone: '+91 98450 12345', zone: 'PC Zone', station: 'PC-04', duration: '2 Hours', price: 299, status: 'Active' },
    { id: 'BK-1040', user: 'Ananya Sharma', phone: '+91 97112 34567', zone: 'VIP Room', station: 'VIP-01', duration: '3 Hours', price: 999, status: 'Confirmed' },
    { id: 'BK-1039', user: 'Arjun Das', phone: '+91 99001 87654', zone: 'PS5 Arena', station: 'PS5-02', duration: '1 Hour', price: 199, status: 'Completed' },
    { id: 'BK-1038', user: 'Team Blitz', phone: '+91 98860 99887', zone: 'Bootcamp Room', station: 'BC-01', duration: '5 Hours', price: 2499, status: 'Confirmed' },
  ]);
  const [filter, setFilter] = useState<'All' | 'Active' | 'Confirmed' | 'Completed'>('All');

  const toggleStatus = (id: string) => {
    setBookingList((prev) =>
      prev.map((b) => {
        if (b.id !== id) return b;
        const next = b.status === 'Confirmed' ? 'Active' : b.status === 'Active' ? 'Completed' : 'Confirmed';
        return { ...b, status: next };
      })
    );
  };

  const filtered = bookingList.filter((b) => filter === 'All' || b.status === filter);

  return (
    <div className="p-6 sm:p-10 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display font-bold text-3xl text-text">Customer Bookings</h1>
          <p className="text-muted text-sm mt-1">Manage station reservations and walk-in timers</p>
        </div>
        <div className="flex gap-2" role="group" aria-label="Filter bookings">
          {(['All', 'Active', 'Confirmed', 'Completed'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`font-display text-[11px] font-semibold uppercase tracking-widest px-4 py-2 rounded transition-all cursor-pointer ${
                filter === s
                  ? 'bg-lime text-bg shadow-sm'
                  : 'bg-surface border border-white/10 text-muted hover:text-text'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filtered.map((b) => (
          <div key={b.id} className="bg-surface border border-white/8 rounded p-6 flex flex-col justify-between hover:border-white/20 transition-all shadow-xs">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="font-mono text-xs font-bold text-lime">{b.id}</span>
                <span className={`font-display text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-sm ${
                  b.status === 'Active' ? 'bg-available/15 text-available border border-available/30' : b.status === 'Confirmed' ? 'bg-cyan/15 text-cyan border border-cyan/30' : 'bg-surface2 text-muted'
                }`}>
                  {b.status}
                </span>
              </div>
              <h3 className="font-display font-bold text-lg text-text mb-1">{b.user}</h3>
              <p className="text-muted text-xs font-mono mb-4">{b.phone}</p>

              <div className="bg-bg2/80 rounded p-3 text-xs space-y-1.5 border border-white/5 mb-5">
                <div className="flex justify-between"><span className="text-muted">Zone:</span> <span className="text-text font-medium">{b.zone}</span></div>
                <div className="flex justify-between"><span className="text-muted">Station:</span> <span className="text-lime font-mono font-bold">{b.station}</span></div>
                <div className="flex justify-between"><span className="text-muted">Duration:</span> <span className="text-text">{b.duration}</span></div>
                <div className="flex justify-between border-t border-white/5 pt-1.5"><span className="text-muted">Total:</span> <span className="text-lime font-bold">₹{b.price}</span></div>
              </div>
            </div>

            <button
              onClick={() => toggleStatus(b.id)}
              className="w-full py-2.5 rounded font-display font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer border border-lime/30 text-lime bg-lime/10 hover:bg-lime/20"
            >
              {b.status === 'Confirmed' ? 'Check In (Activate)' : b.status === 'Active' ? 'Complete Session' : 'Reactivate'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Availability Admin ────────────────────────────────────────────────────────

function AvailabilityAdmin() {
  const [statuses, setStatuses] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    zones.forEach((z) => z.stations.forEach((s) => { init[s.id] = s.status; }));
    return init;
  });
  const [savedNotice, setSavedNotice] = useState(false);

  const colors: Record<string, string> = {
    available: 'text-available',
    'in-use': 'text-inuse',
    reserved: 'text-reserved',
    maintenance: 'text-maintenance',
  };

  const handleSave = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <div className="p-6 sm:p-10 max-w-7xl">
      <h1 className="font-display font-bold text-3xl text-text mb-2">Live Availability Override</h1>
      <p className="text-muted text-sm mb-8">Override and set station status across all gaming zones.</p>

      <div className="flex flex-col gap-10">
        {zones.map((zone) => (
          <div key={zone.id} className="bg-surface border border-white/8 rounded p-6 sm:p-7 shadow-xs">
            <h2 className="font-display font-bold text-xl text-text mb-4 pb-2 border-b border-white/8">{zone.name}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {zone.stations.map((station) => (
                <div key={station.id} className="bg-bg2 border border-white/10 rounded p-3.5">
                  <div className="font-display font-bold text-xs text-text mb-2 truncate">{station.name}</div>
                  <select
                    value={statuses[station.id] || station.status}
                    onChange={(e) => setStatuses((prev) => ({ ...prev, [station.id]: e.target.value }))}
                    className={`w-full bg-surface border border-white/10 rounded py-1.5 px-2 text-[11px] font-display font-semibold uppercase tracking-wide focus:outline-none focus:border-lime/40 transition-colors cursor-pointer ${
                      colors[statuses[station.id] || station.status]
                    }`}
                  >
                    <option value="available">Available</option>
                    <option value="in-use">In Use</option>
                    <option value="reserved">Reserved</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center gap-4">
        <button
          onClick={handleSave}
          className="bg-lime text-bg font-display font-bold text-xs uppercase tracking-widest px-6 py-3 rounded hover:bg-lime-dim transition-colors cursor-pointer"
        >
          Save All Changes
        </button>
        {savedNotice && (
          <span className="text-available font-display text-xs uppercase font-semibold tracking-wider">
            ✓ Station states updated live
          </span>
        )}
      </div>
    </div>
  );
}

// ── Games Admin ───────────────────────────────────────────────────────────────

function GamesAdmin() {
  const [gamesList, setGamesList] = useState(initialGames);
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newGenre, setNewGenre] = useState('FPS');

  const toggleAvailability = (id: string) => {
    setGamesList((prev) =>
      prev.map((g) => (g.id === id ? { ...g, available: !g.available } : g))
    );
  };

  const handleAddGame = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newG = {
      id: `game-${Date.now()}`,
      name: newTitle,
      genre: newGenre as any,
      platform: ['PC'] as any,
      players: '1-10',
      available: true,
      popular: false,
      description: 'Installed in high-speed cafe storage.',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&fit=crop',
    };
    setGamesList([newG, ...gamesList]);
    setNewTitle('');
    setShowAdd(false);
  };

  return (
    <div className="p-6 sm:p-10 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-3xl text-text">Installed Games</h1>
          <p className="text-muted text-sm mt-1">{gamesList.length} titles available across cafe rigs</p>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="bg-lime text-bg font-display font-bold text-xs uppercase tracking-widest px-5 py-2.5 rounded hover:bg-lime-dim transition-colors cursor-pointer"
        >
          {showAdd ? 'Close' : '+ Add Game'}
        </button>
      </div>

      {showAdd && (
        <form onSubmit={handleAddGame} className="mb-8 bg-surface border border-lime/30 rounded p-6 max-w-lg flex flex-col gap-3 shadow-xs">
          <h3 className="font-display font-bold text-sm text-text">Add New Game Title</h3>
          <div>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Game Name (e.g. Apex Legends)"
              className="w-full bg-bg2 border border-white/10 rounded py-2.5 px-3 text-sm text-text focus:outline-none focus:border-lime/40"
              required
            />
          </div>
          <div className="flex gap-2">
            <select
              value={newGenre}
              onChange={(e) => setNewGenre(e.target.value)}
              className="bg-bg2 border border-white/10 rounded py-2 px-3 text-sm text-text focus:outline-none"
            >
              {['FPS', 'MOBA', 'SPORTS', 'RACING', 'FIGHTING', 'CO-OP', 'BATTLE ROYALE'].map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
            <button
              type="submit"
              className="bg-lime text-bg font-display font-bold text-xs uppercase tracking-wider px-4 py-2 rounded cursor-pointer"
            >
              Install Title
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {gamesList.map((game) => (
          <div key={game.id} className="bg-surface border border-white/8 rounded overflow-hidden flex flex-col justify-between hover:border-white/20 transition-all shadow-xs">
            <div>
              <div className="h-36 overflow-hidden bg-bg2 relative">
                <img
                  src={game.image}
                  alt={game.name}
                  className="w-full h-full object-cover opacity-75"
                  loading="lazy"
                />
                <span className={`absolute top-2.5 right-2.5 text-[9px] font-display font-semibold uppercase tracking-widest px-2 py-0.5 rounded-sm backdrop-blur-xs ${
                  game.available ? 'bg-available/80 text-bg font-bold' : 'bg-inuse/80 text-white font-bold'
                }`}>
                  {game.available ? 'Online' : 'Disabled'}
                </span>
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="font-display font-bold text-base text-text mb-1">{game.name}</h3>
                <div className="text-muted text-xs">
                  {game.genre} · {game.platform.join('/')}
                </div>
              </div>
            </div>
            <div className="p-4 sm:p-5 pt-0">
              <button
                onClick={() => toggleAvailability(game.id)}
                className={`w-full py-2 rounded text-xs font-display font-semibold uppercase tracking-wider transition-colors cursor-pointer border ${
                  game.available
                    ? 'border-white/15 text-muted hover:text-text hover:bg-surface2'
                    : 'border-lime/30 text-lime bg-lime/10 hover:bg-lime/20'
                }`}
              >
                {game.available ? 'Set Maintenance' : 'Activate Game'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Admin Layout + Router ─────────────────────────────────────────────────────

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-bg flex">
      {/* Desktop sidebar */}
      <div className="hidden md:block flex-shrink-0">
        <AdminSidebar />
      </div>

      {/* Mobile sidebar drawer */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex" role="dialog" aria-modal="true">
          <div className="flex-shrink-0 z-10">
            <AdminSidebar onClose={() => setSidebarOpen(false)} />
          </div>
          <div
            className="flex-1 bg-bg/80 backdrop-blur-sm cursor-pointer"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu overlay"
          />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top bar */}
        <div className="bg-bg2 border-b border-white/8 px-6 py-4 flex items-center justify-between">
          <button
            className="md:hidden p-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-lime/50 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar menu"
          >
            <div className="w-5 flex flex-col gap-1">
              <span className="block w-5 h-0.5 bg-text" />
              <span className="block w-5 h-0.5 bg-text" />
              <span className="block w-5 h-0.5 bg-text" />
            </div>
          </button>
          <div className="flex items-center gap-3 ml-auto">
            <span className="text-muted text-xs font-display font-medium uppercase tracking-widest hidden sm:inline">
              Super Admin
            </span>
            <div className="w-8 h-8 rounded-sm bg-lime/20 border border-lime/40 flex items-center justify-center font-display font-bold text-xs text-lime">
              A
            </div>
          </div>
        </div>
        <div ref={contentRef} className="flex-1 overflow-auto">
          <Routes>
            <Route index element={<DashboardHome />} />
            <Route path="tournaments" element={<TournamentManager />} />
            <Route path="registrations" element={<RegistrationManager />} />
            <Route path="winners" element={<WinnersManager />} />
            <Route path="bookings" element={<BookingManager />} />
            <Route path="availability" element={<AvailabilityAdmin />} />
            <Route path="games" element={<GamesAdmin />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
