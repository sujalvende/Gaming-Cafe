import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '../components/Button';
import { tournaments } from '../data';
import { gsap } from '../lib/gsap';

// ── Registration Form ──────────────────────────────────────────────────────────

interface FormData {
  teamName: string;
  captainName: string;
  phone: string;
  email: string;
  discord: string;
  instagram: string;
  notes: string;
  players: string[];
}

function RegistrationForm({ tournament }: { tournament: (typeof tournaments)[0] }) {
  const [form, setForm] = useState<FormData>({
    teamName: '',
    captainName: '',
    phone: '',
    email: '',
    discord: '',
    instagram: '',
    notes: '',
    players: Array(tournament.playersPerTeam).fill(''),
  });
  const [submitted, setSubmitted] = useState(false);
  const [regId] = useState(() => `REG-${String(Math.floor(1000 + Math.random() * 9000))}`);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  const validate = () => {
    const e: Partial<Record<string, string>> = {};
    if (!form.teamName.trim()) e.teamName = 'Team name is required';
    if (!form.captainName.trim()) e.captainName = 'Captain name is required';
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone.replace(/\D/g, '')))
      e.phone = 'Valid 10-digit phone required';
    if (!form.email.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(form.email))
      e.email = 'Valid email required';
    form.players.forEach((p, i) => {
      if (!p.trim()) e[`player_${i}`] = `Player ${i + 1} name is required`;
    });
    return e;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      const firstErrorKey = Object.keys(e)[0];
      const el = document.getElementById(`field-${firstErrorKey}`);
      el?.focus();
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  const setPlayer = (idx: number, val: string) => {
    setForm((f) => {
      const p = [...f.players];
      p[idx] = val;
      return { ...f, players: p };
    });
    setErrors((prev) => ({ ...prev, [`player_${idx}`]: undefined }));
  };

  const inputCls = (field: string) =>
    `bg-bg2 border ${
      errors[field]
        ? 'border-inuse/60 focus:border-inuse'
        : 'border-white/10 focus:border-lime/50 focus:ring-1 focus:ring-lime/30'
    } rounded py-3 px-4 text-sm text-text placeholder:text-muted/60 focus:outline-none transition-colors w-full`;

  const labelCls = 'font-display text-[10px] font-semibold uppercase tracking-widest text-muted block mb-1.5';

  if (submitted) {
    return (
      <div className="bg-surface border border-available/20 rounded p-8 text-center" role="status">
        <div className="w-16 h-16 rounded-full bg-available/10 border border-available/20 flex items-center justify-center mx-auto mb-5 shadow-xs">
          <svg className="w-8 h-8 text-available" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display font-bold text-2xl text-text mb-1">Registration Submitted!</h3>
        <p className="font-display text-xs text-lime uppercase tracking-widest mb-4">Registration ID: {regId}</p>
        <p className="text-muted text-sm max-w-md mx-auto mb-6">
          Captain <strong className="text-text">{form.captainName}</strong> — our tournament team will review and confirm your bracket slot via email.
        </p>
        <Button to="/tournaments" variant="outline">Back to Tournaments</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="bg-surface border border-white/8 rounded p-6 sm:p-8 flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="field-teamName" className={labelCls}>Team Name *</label>
          <input
            id="field-teamName"
            value={form.teamName}
            onChange={(e) => setForm((f) => ({ ...f, teamName: e.target.value }))}
            placeholder="e.g. Phoenix Vanguard"
            className={inputCls('teamName')}
            aria-required="true"
            aria-invalid={!!errors.teamName}
            aria-describedby={errors.teamName ? 'err-teamName' : undefined}
          />
          {errors.teamName && (
            <p id="err-teamName" className="text-inuse text-xs mt-1" role="alert">{errors.teamName}</p>
          )}
        </div>
        <div>
          <label htmlFor="field-captainName" className={labelCls}>Captain Name *</label>
          <input
            id="field-captainName"
            value={form.captainName}
            onChange={(e) => setForm((f) => ({ ...f, captainName: e.target.value }))}
            placeholder="e.g. Alex Rivera"
            className={inputCls('captainName')}
            aria-required="true"
            aria-invalid={!!errors.captainName}
            aria-describedby={errors.captainName ? 'err-captainName' : undefined}
          />
          {errors.captainName && (
            <p id="err-captainName" className="text-inuse text-xs mt-1" role="alert">{errors.captainName}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="field-phone" className={labelCls}>Phone *</label>
          <input
            id="field-phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            placeholder="10-digit number"
            className={inputCls('phone')}
            aria-required="true"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'err-phone' : undefined}
            inputMode="tel"
          />
          {errors.phone && (
            <p id="err-phone" className="text-inuse text-xs mt-1" role="alert">{errors.phone}</p>
          )}
        </div>
        <div>
          <label htmlFor="field-email" className={labelCls}>Email *</label>
          <input
            id="field-email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="captain@email.com"
            className={inputCls('email')}
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'err-email' : undefined}
            inputMode="email"
          />
          {errors.email && (
            <p id="err-email" className="text-inuse text-xs mt-1" role="alert">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Dynamic roster fields */}
      <fieldset className="border border-white/10 rounded p-5">
        <legend className="font-display text-[10px] font-semibold uppercase tracking-widest text-muted px-1.5">
          Player Roster — {tournament.playersPerTeam} player{tournament.playersPerTeam > 1 ? 's' : ''} required
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          {form.players.map((p, i) => (
            <div key={i}>
              <label htmlFor={`field-player_${i}`} className={labelCls}>
                Player {i + 1} {i === 0 ? '(Captain)' : ''} *
              </label>
              <input
                id={`field-player_${i}`}
                value={p}
                onChange={(e) => setPlayer(i, e.target.value)}
                placeholder={`Player ${i + 1} in-game tag`}
                className={inputCls(`player_${i}`)}
                aria-required="true"
                aria-invalid={!!errors[`player_${i}`]}
                aria-describedby={errors[`player_${i}`] ? `err-player_${i}` : undefined}
              />
              {errors[`player_${i}`] && (
                <p id={`err-player_${i}`} className="text-inuse text-xs mt-1" role="alert">{errors[`player_${i}`]}</p>
              )}
            </div>
          ))}
        </div>
      </fieldset>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="field-discord" className={labelCls}>Discord Username</label>
          <input
            id="field-discord"
            value={form.discord}
            onChange={(e) => setForm((f) => ({ ...f, discord: e.target.value }))}
            placeholder="e.g. shadow#1234"
            className={inputCls('discord')}
          />
        </div>
        <div>
          <label htmlFor="field-instagram" className={labelCls}>Instagram Handle</label>
          <input
            id="field-instagram"
            value={form.instagram}
            onChange={(e) => setForm((f) => ({ ...f, instagram: e.target.value }))}
            placeholder="e.g. @team_shadow"
            className={inputCls('instagram')}
          />
        </div>
      </div>

      <div className="pt-2">
        <Button type="submit" size="lg">Submit Registration</Button>
      </div>
    </form>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function TournamentDetails() {
  const { id } = useParams<{ id: string }>();
  const tournament = tournaments.find((t) => t.id === id);
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const slotsLeft = tournament ? tournament.maxTeams - tournament.registeredTeams : 0;
  const isFull = slotsLeft === 0;
  const pct = tournament ? (tournament.registeredTeams / tournament.maxTeams) * 100 : 0;
  const canRegister = tournament?.registrationStatus === 'open' && !isFull;

  useEffect(() => {
    if (window.location.hash === '#register' && canRegister) {
      setShowForm(true);
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
    }
  }, [canRegister]);

  useLayoutEffect(() => {
    if (prefersReduced()) return;

    const ctx = gsap.context(() => {
      gsap.from('.tourndetail-hero-anim', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
      });
    }, rootRef);

    return () => ctx.revert();
  }, [id]);

  const handleRegisterClick = () => {
    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
  };

  if (!tournament) {
    return (
      <div className="py-32 px-6 max-w-7xl mx-auto text-center" aria-labelledby="not-found-heading">
        <h1 id="not-found-heading" className="font-display font-bold text-4xl text-text mb-4">
          Tournament Not Found
        </h1>
        <p className="text-muted mb-8">This tournament doesn't exist or has been removed.</p>
        <Button to="/tournaments">Back to Tournaments</Button>
      </div>
    );
  }

  return (
    <div ref={rootRef} className="pb-24 min-h-screen" aria-labelledby="tournament-heading">
      {/* Hero banner */}
      <div className="relative overflow-hidden bg-bg2 h-72 sm:h-80 border-b border-white/8">
        <img
          src={tournament.image}
          alt={tournament.name}
          className="w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/65 to-transparent" />
        <div className="absolute bottom-8 left-0 right-0 px-5 sm:px-6">
          <div className="max-w-7xl mx-auto tourndetail-hero-anim">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="bg-bg/90 backdrop-blur-xs text-cyan font-display text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-sm border border-cyan/20">
                {tournament.game}
              </span>
              <span className="bg-bg/90 backdrop-blur-xs text-muted font-display text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-sm border border-white/10">
                {tournament.playersPerTeam === 1 ? 'Solo' : `${tournament.playersPerTeam}v${tournament.playersPerTeam}`}
              </span>
              <span
                className={`font-display text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-sm border backdrop-blur-xs ${
                  canRegister
                    ? 'bg-available/15 text-available border-available/30'
                    : 'bg-inuse/15 text-inuse border-inuse/30'
                }`}
              >
                {isFull ? 'Registration Full' : tournament.registrationStatus === 'open' ? 'Registration Open' : 'Registration Closed'}
              </span>
            </div>
            <h1 id="tournament-heading" className="font-display font-bold text-text" style={{ fontSize: 'clamp(28px, 5vw, 52px)' }}>
              {tournament.name}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 mt-10 sm:mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 flex flex-col gap-8 sm:gap-10">
            <p className="text-muted text-base sm:text-lg leading-relaxed">{tournament.description}</p>

            {/* Key details grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {[
                {
                  label: 'Date',
                  value: new Date(tournament.date).toLocaleDateString('en-IN', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                  }),
                },
                { label: 'Time', value: tournament.time },
                { label: 'Format', value: tournament.format },
                {
                  label: 'Team Size',
                  value: tournament.playersPerTeam === 1 ? 'Solo' : `${tournament.playersPerTeam} players`,
                },
                { label: 'Max Teams', value: `${tournament.maxTeams} teams` },
                { label: 'Venue', value: 'Nexus, Bengaluru' },
              ].map(({ label, value }) => (
                <div key={label} className="bg-surface border border-white/8 rounded p-4 sm:p-5">
                  <div className="font-display text-[10px] font-semibold uppercase tracking-widest text-muted mb-1.5">
                    {label}
                  </div>
                  <div className="text-sm sm:text-base text-text font-medium leading-snug">{value}</div>
                </div>
              ))}
            </div>

            {/* Rules */}
            <div>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-text mb-5">Tournament Rules</h2>
              <ol className="flex flex-col gap-3" aria-label="Tournament rules">
                {tournament.rules.map((rule, i) => (
                  <li key={i} className="flex gap-3 text-sm text-muted bg-surface/40 border border-white/5 rounded p-3.5">
                    <span className="font-display font-bold text-lime flex-shrink-0 tabular-nums">
                      {String(i + 1).padStart(2, '0')}.
                    </span>
                    <span className="leading-relaxed">{rule}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Registration form */}
            {showForm && (
              <div id="register" ref={formRef} className="scroll-mt-24 pt-4 border-t border-white/10">
                <h2 className="font-display font-bold text-2xl text-text mb-6">Register Your Team</h2>
                <RegistrationForm tournament={tournament} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            {/* Prize card */}
            <div className="bg-surface border border-white/10 rounded p-6 sm:p-7 sticky top-24 shadow-sm">
              <div className="text-center mb-6">
                <div className="font-display text-[10px] font-semibold uppercase tracking-widest text-muted mb-1">
                  Prize Pool
                </div>
                <div className="font-display font-bold text-gold" style={{ fontSize: 'clamp(36px, 5vw, 48px)' }}>
                  ₹{tournament.prizePool.toLocaleString('en-IN')}
                </div>
              </div>

              <div className="flex flex-col gap-3 text-sm border-t border-white/8 pt-5 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted">Entry Fee</span>
                  <span className="text-text font-bold">₹{tournament.entryFee}/team</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">1st Place</span>
                  <span className="text-gold font-bold">
                    ₹{Math.round(tournament.prizePool * 0.6).toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">2nd Place</span>
                  <span className="text-gold font-bold">
                    ₹{Math.round(tournament.prizePool * 0.25).toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">3rd Place</span>
                  <span className="text-gold font-bold">
                    ₹{Math.round(tournament.prizePool * 0.15).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Capacity */}
              <div className="mb-6">
                <div className="flex justify-between text-[11px] font-display uppercase tracking-wide mb-1.5">
                  <span className="text-muted">{tournament.registeredTeams}/{tournament.maxTeams} teams</span>
                  <span className={slotsLeft <= 3 ? 'text-reserved font-semibold' : 'text-muted'}>
                    {slotsLeft} slots left
                  </span>
                </div>
                <div className="h-2 bg-surface2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${pct >= 90 ? 'bg-inuse' : pct >= 70 ? 'bg-reserved' : 'bg-lime'}`}
                    style={{ width: `${pct}%` }}
                    role="progressbar"
                    aria-valuenow={tournament.registeredTeams}
                    aria-valuemin={0}
                    aria-valuemax={tournament.maxTeams}
                  />
                </div>
              </div>

              {canRegister ? (
                <button
                  onClick={handleRegisterClick}
                  className="w-full bg-lime text-bg font-display font-bold text-xs uppercase tracking-widest py-3.5 rounded hover:bg-lime-dim transition-all active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime/50 min-h-[48px] cursor-pointer"
                  aria-label={`Register for ${tournament.name}`}
                >
                  {showForm ? 'Registration Form Below ↓' : 'Register Now'}
                </button>
              ) : (
                <div
                  className="w-full bg-surface2 text-muted font-display font-bold text-xs uppercase tracking-widest py-3.5 rounded text-center"
                  role="status"
                >
                  {isFull ? 'Registration Full' : 'Registration Closed'}
                </div>
              )}
            </div>

            {/* Info card */}
            <div className="bg-surface border border-white/8 rounded p-6 text-sm text-muted">
              <div className="font-display text-[10px] font-semibold uppercase tracking-widest text-muted mb-3">
                Important Info
              </div>
              <ul className="flex flex-col gap-2.5 text-xs leading-relaxed" role="list">
                <li className="flex gap-2"><span className="text-lime flex-shrink-0" aria-hidden="true">→</span> Teams must arrive 30 min before schedule</li>
                <li className="flex gap-2"><span className="text-lime flex-shrink-0" aria-hidden="true">→</span> Valid ID proof required at venue check-in</li>
                <li className="flex gap-2"><span className="text-lime flex-shrink-0" aria-hidden="true">→</span> Entry fee payable upon arrival at counter</li>
                <li className="flex gap-2"><span className="text-lime flex-shrink-0" aria-hidden="true">→</span> Direct questions to: play@nexusgaming.in</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
