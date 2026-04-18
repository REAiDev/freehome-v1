'use client';
import { useState, useEffect } from 'react';
import { PageLayout } from '@/components/common';

const sections = [
  { id: 'acceptance', title: 'Acceptance of Terms', icon: '✓' },
  { id: 'use-license', title: 'Use License', icon: '📜' },
  { id: 'privacy', title: 'Privacy Policy', icon: '🔐' },
  { id: 'disclaimer', title: 'Disclaimer', icon: '⚠️' },
  { id: 'limitations', title: 'Limitations', icon: '⚡' },
  { id: 'accuracy', title: 'Accuracy of Materials', icon: '✏️' },
  { id: 'links', title: 'Links', icon: '🔗' },
  { id: 'modifications', title: 'Modifications', icon: '🔄' },
  { id: 'governing-law', title: 'Governing Law', icon: '⚖️' },
  { id: 'contact', title: 'Contact Information', icon: '📞' },
];

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -35% 0px' }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <PageLayout title="Terms & Conditions">
      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
        {/* Sticky Table of Contents - Desktop */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24 bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl border border-blue-100 shadow-sm">
            <h2 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">
              On This Page
            </h2>
            <nav className="space-y-1">
              {sections.map(({ id, title, icon }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 flex items-center gap-2 ${
                    activeSection === id
                      ? 'bg-blue-600 text-white font-medium shadow-sm'
                      : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  <span className="text-base">{icon}</span>
                  <span className="truncate">{title}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Mobile Dropdown TOC */}
        <div className="lg:hidden mb-6">
          <select
            value={activeSection}
            onChange={(e) => scrollToSection(e.target.value)}
            className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl font-medium text-gray-700 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all"
          >
            <option value="">Jump to section...</option>
            {sections.map(({ id, title, icon }) => (
              <option key={id} value={id}>
                {icon} {title}
              </option>
            ))}
          </select>
        </div>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {/* Last Updated Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-8 border border-blue-100">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Last updated: {new Date().toLocaleDateString()}
          </div>

          {/* Section 1: Acceptance of Terms */}
          <section
            id="acceptance"
            className="mb-8 bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                ✓
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">1. Acceptance of Terms</h2>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">
              By accessing and using this website, you accept and agree to be bound by the terms and
              provision of this agreement. If you do not agree to abide by the above, please do not
              use this website.
            </p>
          </section>

          {/* Section 2: Use License */}
          <section
            id="use-license"
            className="mb-8 bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                📜
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">2. Use License</h2>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              Permission is granted to temporarily access the materials (information or software) on
              our website for personal, non-commercial transitory viewing only. This is the grant of
              a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="space-y-2">
              {[
                'Modify or copy the materials',
                'Use the materials for any commercial purpose',
                'Attempt to decompile or reverse engineer any software contained on the website',
                'Remove any copyright or other proprietary notations from the materials',
                'Transfer the materials to another person or "mirror" the materials on any other server',
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 3: Privacy Policy */}
          <section
            id="privacy"
            className="mb-8 bg-gradient-to-br from-blue-50 to-white p-6 sm:p-8 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                🔐
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">3. Privacy Policy</h2>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Your use of our website is also governed by our Privacy Policy. Please review our{' '}
              <a
                href="/privacy"
                className="text-blue-600 hover:text-blue-700 font-semibold underline"
              >
                Privacy Policy
              </a>
              , which also governs the site and informs users of our data collection practices.
            </p>
          </section>

          {/* Section 4: Disclaimer */}
          <section
            id="disclaimer"
            className="mb-8 bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                ⚠️
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">4. Disclaimer</h2>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">
              The materials on our website are provided on an &apos;as is&apos; basis. We make no
              warranties, expressed or implied, and hereby disclaim and negate all other warranties
              including, without limitation, implied warranties or conditions of merchantability,
              fitness for a particular purpose, or non-infringement of intellectual property or
              other violation of rights.
            </p>
          </section>

          {/* Section 5: Limitations */}
          <section
            id="limitations"
            className="mb-8 bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                ⚡
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">5. Limitations</h2>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">
              In no event shall we or our suppliers be liable for any damages (including, without
              limitation, damages for loss of data or profit, or due to business interruption)
              arising out of the use or inability to use the materials on our website.
            </p>
          </section>

          {/* Section 6: Accuracy of Materials */}
          <section
            id="accuracy"
            className="mb-8 bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                ✏️
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">6. Accuracy of Materials</h2>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">
              The materials appearing on our website could include technical, typographical, or
              photographic errors. We do not warrant that any of the materials on our website are
              accurate, complete, or current. We may make changes to the materials contained on our
              website at any time without notice.
            </p>
          </section>

          {/* Section 7: Links */}
          <section
            id="links"
            className="mb-8 bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                🔗
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">7. Links</h2>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">
              We have not reviewed all of the sites linked to our website and are not responsible
              for the contents of any such linked site. The inclusion of any link does not imply
              endorsement by us of the site. Use of any such linked website is at the user&apos;s
              own risk.
            </p>
          </section>

          {/* Section 8: Modifications */}
          <section
            id="modifications"
            className="mb-8 bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                🔄
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">8. Modifications</h2>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">
              We may revise these terms of service for our website at any time without notice. By
              using this website, you are agreeing to be bound by the then current version of these
              terms of service.
            </p>
          </section>

          {/* Section 9: Governing Law */}
          <section
            id="governing-law"
            className="mb-8 bg-gradient-to-br from-blue-50 to-white p-6 sm:p-8 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                ⚖️
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">9. Governing Law</h2>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              These terms and conditions are governed by and construed in accordance with the laws
              and you irrevocably submit to the exclusive jurisdiction of the courts in that
              location.
            </p>
          </section>

          {/* Section 10: Contact Information */}
          <section
            id="contact"
            className="mb-8 bg-gradient-to-br from-blue-50 to-white p-6 sm:p-8 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                📞
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">10. Contact Information</h2>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about these Terms and Conditions, please contact us at:
            </p>
            <div className="space-y-3">
              <a
                href="mailto:info@reai.co"
                className="flex items-center gap-3 p-3 bg-white rounded-xl border border-blue-100 hover:border-blue-600 hover:bg-blue-50 transition-all group"
              >
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="font-medium text-gray-900 group-hover:text-blue-600">
                  info@reai.co
                </span>
              </a>
              <a
                href="tel:+16503088979"
                className="flex items-center gap-3 p-3 bg-white rounded-xl border border-blue-100 hover:border-blue-600 hover:bg-blue-50 transition-all group"
              >
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="font-medium text-gray-900 group-hover:text-blue-600">
                  01-650-308-8979
                </span>
              </a>
            </div>
          </section>
        </main>
      </div>
    </PageLayout>
  );
}
