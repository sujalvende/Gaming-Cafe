import { useState, useRef, useLayoutEffect } from 'react';
import Button from '../components/Button';
import { zones } from '../data';
import { gsap } from '../lib/gsap';

type ZoneId = 'pc' | 'ps5' | 'vip' | 'bootcamp';
type Step = 1 | 2 | 3 | 4 | 5;

const durations = ['1 Hour', '2 Hours', '3 Hours', '5 Hours', '7 Hours'];
const timeSlots = [
  '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM',
  '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM',
  '8:00 PM', '9:00 PM', '10:00 PM',
];
const pricingMap: Record<string, Record<string, number>> = {
  pc: { '1 Hour': 80, '2 Hours': 150, '3 Hours': 210, '5 Hours': 320, '7 Hours': 420 },
  ps5: { '1 Hour': 60, '2 Hours': 110, '3 Hours': 150, '5 Hours': 240, '7 Hours': 320 },
  vip: { '1 Hour': 200, '2 Hours': 380, '3 Hours': 540, '5 Hours': 860, '7 Hours': 1120 },
  bootcamp: { '1 Hour': 120, '2 Hours': 220, '3 Hours': 300, '5 Hours': 480, '7 Hours': 630 },
};

function getDates() {
  const dates: Date[] = [];
  const now = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    dates.push(d);
  }
  return dates;
}

const steps = ['Zone', 'Date', 'Time', 'Duration', 'Confirm'];

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Booking() {
  const [step, setStep] = useState<Step>(1);
  const [selectedZone, setSelectedZone] = useState<ZoneId | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<'name' | 'phone' | 'email', string>>>({});
  const [confirmed, setConfirmed] = useState(false);
  const [bookingId] = useState(() => `BK-${String(Math.floor(10000 + Math.random() * 90000))}`);
  const rootRef = useRef<HTMLDivElement>(null);

  const zoneData = selectedZone ? zones.find((z) => z.id === selectedZone) : null;
  const price = selectedZone && selectedDuration ? pricingMap[selectedZone][selectedDuration] : 0;
  const dates = getDates();

  useLayoutEffect(() => {
    if (prefersReduced()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.booking-step-content',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
      );
    }, rootRef);

    return () => ctx.revert();
  }, [step, confirmed]);

  const canProceed = () => {
    if (step === 1) return !!selectedZone;
    if (step === 2) return !!selectedDate;
    if (step === 3) return !!selectedTime;
    if (step === 4) return !!selectedDuration;
    if (step === 5) return (
      name.trim().length > 0 &&
      /^\d{10}$/.test(phone.replace(/\D/g, '')) &&
      /^[^@]+@[^@]+\.[^@]+$/.test(email)
    );
    return false;
  };

  const handleConfirm = () => {
    const errs: Partial<Record<'name' | 'phone' | 'email', string>> = {};
    if (!name.trim()) errs.name = 'Full name is required';
    if (!phone.trim() || !/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
      errs.phone = 'Valid 10-digit mobile number required';
    }
    if (!email.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      errs.email = 'Valid email address required';
    }
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return;
    }
    setFieldErrors({});
    setConfirmed(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const inputCls = (field: 'name' | 'phone' | 'email') =>
    `bg-bg2 border ${
      fieldErrors[field]
        ? 'border-inuse/60 focus:border-inuse'
        : 'border-white/10 focus:border-lime/50 focus:ring-1 focus:ring-lime/30'
    } rounded py-3 px-4 text-sm text-text placeholder:text-muted/60 focus:outline-none transition-colors w-full`;

  const labelCls = 'font-display text-[10px] font-semibold uppercase tracking-widest text-muted block mb-1.5';

  // ── Confirmed state ───────────────────────────────────────────────────────
  if (confirmed) {
    return (
      <div ref={rootRef} className="pb-24 min-h-screen" aria-label="Booking confirmation">
        <div className="max-w-lg mx-auto px-5 sm:px-6 py-12 sm:py-16 text-center booking-step-content">
          <div
            className="w-20 h-20 rounded-full bg-available/10 border border-available/20 flex items-center justify-center mx-auto mb-6 shadow-sm"
            role="status"
            aria-label="Booking confirmed"
          >
            <svg className="w-10 h-10 text-available" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-display font-bold text-3xl text-text mb-2">Booking Confirmed!</h1>
          <div className="font-display text-xs font-semibold uppercase tracking-widest text-lime mb-8">
            Booking ID: {bookingId}
          </div>
          <div className="bg-surface border border-white/8 rounded p-6 text-left mb-8 shadow-xs">
            <div className="font-display text-[10px] font-semibold uppercase tracking-widest text-muted mb-4">
              Summary
            </div>
            {[
              ['Zone', zoneData?.name],
              ['Date', selectedDate?.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })],
              ['Time', selectedTime],
              ['Duration', selectedDuration],
              ['Name', name],
              ['Total', `₹${price}`],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between py-2.5 border-b border-white/6 last:border-0">
                <span className="text-muted text-sm">{label}</span>
                <span className={`text-sm font-medium ${label === 'Total' ? 'text-lime font-bold text-base' : 'text-text'}`}>
                  {value}
                </span>
              </div>
            ))}
          </div>
          <p className="text-muted text-sm leading-relaxed mb-8">
            Please arrive 10 minutes before your session. Payment is due at the counter.
          </p>
          <div className="flex gap-4 justify-center">
            <Button to="/" variant="outline">Home</Button>
            <Button to="/availability">Check Availability</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={rootRef} className="pb-24 min-h-screen" aria-label="Book a gaming session">
      {/* Header + stepper */}
      <div className="bg-bg2 border-b border-white/8 pt-16 pb-10 sm:pt-20 sm:pb-14 px-5 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="font-display text-[11px] font-semibold uppercase tracking-widest text-lime mb-2">
            Reservation
          </div>
          <h1 className="font-display font-bold text-text mb-6 sm:mb-8" style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}>
            Book a Session
          </h1>

          {/* Progress stepper */}
          <nav aria-label="Booking steps">
            <ol className="flex items-center">
              {steps.map((s, i) => {
                const n = (i + 1) as Step;
                const done = step > n;
                const active = step === n;
                return (
                  <li key={s} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                      <div
                        className={`w-8 h-8 rounded-sm flex items-center justify-center font-display font-bold text-xs transition-all ${
                          done
                            ? 'bg-lime text-bg shadow-xs'
                            : active
                            ? 'bg-surface2 text-lime border border-lime/60 shadow-xs ring-2 ring-lime/20'
                            : 'bg-surface text-muted border border-white/10'
                        }`}
                        aria-current={active ? 'step' : undefined}
                        aria-label={`Step ${n}: ${s}${done ? ' (completed)' : active ? ' (current)' : ''}`}
                      >
                        {done ? '✓' : n}
                      </div>
                      <span
                        className={`text-[10px] font-display font-medium uppercase tracking-wide hidden sm:block ${
                          active ? 'text-text font-bold' : done ? 'text-lime' : 'text-muted'
                        }`}
                      >
                        {s}
                      </span>
                    </div>
                    {i < steps.length - 1 && (
                      <div className={`flex-1 h-px mx-2 sm:mx-3 ${done ? 'bg-lime/50' : 'bg-white/10'}`} aria-hidden="true" />
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-5 sm:px-6 mt-8 sm:mt-10">
        <div className="booking-step-content">
          {/* Step 1: Zone */}
          {step === 1 && (
            <section aria-labelledby="step1-heading">
              <h2 id="step1-heading" className="font-display font-bold text-2xl text-text mb-6">
                Choose a Zone
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {zones.map((z) => {
                  const avail = z.stations.filter((s) => s.status === 'available').length;
                  const isSelected = selectedZone === z.id;
                  return (
                    <button
                      key={z.id}
                      onClick={() => setSelectedZone(z.id as ZoneId)}
                      className={`text-left border rounded overflow-hidden transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime/50 ${
                        isSelected ? 'border-lime bg-lime/5 shadow-sm' : 'border-white/10 bg-surface hover:border-white/25'
                      }`}
                      aria-pressed={isSelected}
                      aria-label={`Select ${z.name} — ₹${z.pricePerHour}/hr`}
                    >
                      <div className="relative overflow-hidden h-28 sm:h-32">
                        <img src={z.image} alt="" aria-hidden="true" className="w-full h-full object-cover opacity-60" loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent" />
                        <div className="absolute bottom-3 left-4">
                          <h3 className="font-display font-bold text-base text-text">{z.name}</h3>
                          <span className="font-display font-bold text-sm text-lime">₹{z.pricePerHour}/hr</span>
                        </div>
                        {z.badge && (
                          <div className="absolute top-3 right-3 bg-purple/20 text-purple font-display text-[9px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-sm border border-purple/30">
                            {z.badge}
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <p className="text-muted text-xs leading-relaxed mb-2 line-clamp-2">{z.description}</p>
                        <span
                          className={`font-display text-[10px] font-semibold uppercase tracking-widest ${
                            avail > 0 ? 'text-available' : 'text-inuse'
                          }`}
                        >
                          {avail} station{avail !== 1 ? 's' : ''} available
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {/* Step 2: Date */}
          {step === 2 && (
            <section aria-labelledby="step2-heading">
              <h2 id="step2-heading" className="font-display font-bold text-2xl text-text mb-6">
                Choose a Date
              </h2>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 sm:gap-3">
                {dates.map((date, i) => {
                  const isSelected = selectedDate?.toDateString() === date.toDateString();
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedDate(date)}
                      className={`flex flex-col items-center gap-1 py-4 border rounded transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime/50 ${
                        isSelected
                          ? 'border-lime bg-lime/10 text-lime shadow-xs'
                          : 'border-white/10 bg-surface text-muted hover:border-white/25 hover:text-text'
                      }`}
                      aria-pressed={isSelected}
                      aria-label={date.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
                    >
                      <span className="font-display text-[10px] font-semibold uppercase tracking-widest">
                        {date.toLocaleDateString('en-IN', { weekday: 'short' })}
                      </span>
                      <span className="font-display font-bold text-xl sm:text-2xl">{date.getDate()}</span>
                      <span className="font-display text-[10px] font-semibold uppercase tracking-widest">
                        {date.toLocaleDateString('en-IN', { month: 'short' })}
                      </span>
                      {i === 0 && <span className="text-[9px] text-lime font-display font-semibold uppercase">Today</span>}
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {/* Step 3: Time */}
          {step === 3 && (
            <section aria-labelledby="step3-heading">
              <h2 id="step3-heading" className="font-display font-bold text-2xl text-text mb-6">
                Choose a Start Time
              </h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 sm:gap-3">
                {timeSlots.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTime(t)}
                    className={`py-3 sm:py-3.5 border rounded font-display font-semibold text-xs sm:text-sm uppercase tracking-wide transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime/50 ${
                      selectedTime === t
                        ? 'border-lime bg-lime/10 text-lime shadow-xs'
                        : 'border-white/10 bg-surface text-muted hover:border-white/25 hover:text-text'
                    }`}
                    aria-pressed={selectedTime === t}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Step 4: Duration */}
          {step === 4 && (
            <section aria-labelledby="step4-heading">
              <h2 id="step4-heading" className="font-display font-bold text-2xl text-text mb-6">
                Choose Duration
              </h2>
              <div className="flex flex-col gap-3">
                {durations.map((d) => {
                  const p = selectedZone ? pricingMap[selectedZone][d] : 0;
                  const isSelected = selectedDuration === d;
                  return (
                    <button
                      key={d}
                      onClick={() => setSelectedDuration(d)}
                      className={`flex items-center justify-between p-4 sm:p-5 border rounded transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime/50 ${
                        isSelected ? 'border-lime bg-lime/10 shadow-xs' : 'border-white/10 bg-surface hover:border-white/25'
                      }`}
                      aria-pressed={isSelected}
                    >
                      <span className={`font-display font-semibold text-sm sm:text-base ${isSelected ? 'text-lime' : 'text-text'}`}>
                        {d}
                      </span>
                      <span className={`font-display font-bold text-lg sm:text-xl ${isSelected ? 'text-lime' : 'text-text'}`}>
                        ₹{p}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {/* Step 5: Confirm */}
          {step === 5 && (
            <section aria-labelledby="step5-heading">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <div>
                  <h2 id="step5-heading" className="font-display font-bold text-xl sm:text-2xl text-text mb-5">
                    Your Details
                  </h2>
                  <div className="flex flex-col gap-4">
                    <div>
                      <label htmlFor="booking-name" className={labelCls}>Full Name *</label>
                      <input
                        id="booking-name"
                        type="text"
                        value={name}
                        onChange={(e) => { setName(e.target.value); setFieldErrors((f) => ({ ...f, name: undefined })); }}
                        placeholder="Your full name"
                        className={inputCls('name')}
                        aria-required="true"
                        aria-invalid={!!fieldErrors.name}
                        aria-describedby={fieldErrors.name ? 'err-name' : undefined}
                      />
                      {fieldErrors.name && (
                        <p id="err-name" className="text-inuse text-xs mt-1" role="alert">{fieldErrors.name}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="booking-phone" className={labelCls}>Phone *</label>
                      <input
                        id="booking-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => { setPhone(e.target.value); setFieldErrors((f) => ({ ...f, phone: undefined })); }}
                        placeholder="10-digit number"
                        className={inputCls('phone')}
                        aria-required="true"
                        aria-invalid={!!fieldErrors.phone}
                        aria-describedby={fieldErrors.phone ? 'err-phone' : undefined}
                        inputMode="tel"
                      />
                      {fieldErrors.phone && (
                        <p id="err-phone" className="text-inuse text-xs mt-1" role="alert">{fieldErrors.phone}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="booking-email" className={labelCls}>Email *</label>
                      <input
                        id="booking-email"
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setFieldErrors((f) => ({ ...f, email: undefined })); }}
                        placeholder="you@email.com"
                        className={inputCls('email')}
                        aria-required="true"
                        aria-invalid={!!fieldErrors.email}
                        aria-describedby={fieldErrors.email ? 'err-email' : undefined}
                        inputMode="email"
                      />
                      {fieldErrors.email && (
                        <p id="err-email" className="text-inuse text-xs mt-1" role="alert">{fieldErrors.email}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Booking summary */}
                <div>
                  <h2 className="font-display font-bold text-xl sm:text-2xl text-text mb-5" aria-label="Booking summary">
                    Review
                  </h2>
                  <div className="bg-surface border border-white/8 rounded p-5 sm:p-6 shadow-xs">
                    {[
                      ['Zone', zoneData?.name],
                      ['Date', selectedDate?.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })],
                      ['Time', selectedTime],
                      ['Duration', selectedDuration],
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between py-2.5 border-b border-white/8 last:border-0">
                        <span className="text-muted text-sm">{label}</span>
                        <span className="text-text text-sm font-medium">{value}</span>
                      </div>
                    ))}
                    <div className="flex justify-between pt-3.5 mt-1 border-t border-white/10">
                      <span className="font-display font-bold text-base text-text">Total</span>
                      <span className="font-display font-bold text-2xl text-lime">₹{price}</span>
                    </div>
                    <p className="text-muted text-xs mt-3 leading-relaxed">
                      Payment at the counter. Station is held for 15 minutes past start time.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Navigation */}
          <div className="flex gap-4 mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-white/8">
            {step > 1 && (
              <Button onClick={() => setStep((s) => (s - 1) as Step)} variant="outline" size="md">
                ← Back
              </Button>
            )}
            {step < 5 ? (
              <Button
                onClick={() => {
                  if (canProceed()) setStep((s) => (s + 1) as Step);
                }}
                disabled={!canProceed()}
                size="md"
                className="ml-auto"
                aria-label={canProceed() ? 'Continue to next step' : 'Please make a selection to continue'}
              >
                Continue →
              </Button>
            ) : (
              <Button
                onClick={handleConfirm}
                size="md"
                className="ml-auto"
              >
                Confirm Booking
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
