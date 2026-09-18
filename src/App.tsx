import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Games from './pages/Games';
import Tournaments from './pages/Tournaments';
import TournamentDetails from './pages/TournamentDetails';
import Availability from './pages/Availability';
import Booking from './pages/Booking';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import AdminDashboard from './pages/admin/AdminDashboard';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

/**
 * PublicLayout — Navbar + page-shell + Footer.
 *
 * The `.page-shell` class applies `padding-top: var(--navbar-h)` (64px) ONCE,
 * globally. Individual pages must NOT add their own top-padding offset —
 * they simply provide their own internal section spacing.
 */
function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <Navbar />
      <main className="page-shell flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function AppRoutes() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return (
      <Routes>
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
    );
  }

  return (
    <PublicLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/tournaments/:id" element={<TournamentDetails />} />
        <Route path="/availability" element={<Availability />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="*" element={
          <div className="py-32 text-center px-6">
            <h1 className="font-display font-bold text-5xl text-text mb-4">404</h1>
            <p className="text-muted mb-8">Page not found.</p>
            <a href="/" className="inline-flex items-center gap-2 bg-lime text-bg font-display font-bold text-xs uppercase tracking-widest px-8 py-3 rounded hover:bg-lime-dim transition-colors">
              Go Home
            </a>
          </div>
        } />
      </Routes>
    </PublicLayout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRoutes />
    </BrowserRouter>
  );
}
