import { Suspense, lazy, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import BackToTop from './components/layout/BackToTop'
import ConceptNotice from './components/layout/ConceptNotice'
import Home from './pages/Home'

// Home ships in the main bundle; everything else is split per route.
const Colleges = lazy(() => import('./pages/Colleges'))
const CollegeDetail = lazy(() => import('./pages/CollegeDetail'))
const Courses = lazy(() => import('./pages/Courses'))
const Exams = lazy(() => import('./pages/Exams'))
const ExamDetail = lazy(() => import('./pages/ExamDetail'))
const Assessment = lazy(() => import('./pages/Assessment'))
const Counselling = lazy(() => import('./pages/Counselling'))
const Blogs = lazy(() => import('./pages/Blogs'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Legal = lazy(() => import('./pages/Legal'))
const NotFound = lazy(() => import('./pages/NotFound'))

function ScrollToTop() {
  const { pathname, search } = useLocation()
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'instant' })
  }, [pathname, search])
  return null
}

function RouteFallback() {
  return (
    <div className="grid min-h-[60vh] place-items-center" role="status" aria-live="polite">
      <span className="font-hand text-[22px] text-muted">Loading…</span>
    </div>
  )
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <ConceptNotice />
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/colleges" element={<Colleges />} />
            <Route path="/colleges/:slug" element={<CollegeDetail />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/exams" element={<Exams />} />
            <Route path="/exams/:slug" element={<ExamDetail />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/counselling" element={<Counselling />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Legal kind="privacy" />} />
            <Route path="/terms" element={<Legal kind="terms" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
