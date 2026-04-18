'use client';
import { useState, useEffect } from 'react';
import { PageLayout } from '@/components/common';

const sections = [
  { id: 'introduction', title: 'Introduction', icon: '📋' },
  { id: 'information-collect', title: 'Information We Collect', icon: '📊' },
  { id: 'how-we-use', title: 'How We Use Your Information', icon: '🔧' },
  { id: 'data-security', title: 'Data Security', icon: '🔒' },
  { id: 'legal-rights', title: 'Your Legal Rights', icon: '⚖️' },
  { id: 'contact', title: 'Contact Us', icon: '📧' },
  { id: 'changes', title: 'Changes to This Privacy Policy', icon: '🔄' },
];

export default function PrivacyPage() {
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
    <PageLayout title="Privacy Policy">
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

          {/* Section 1: Introduction */}
          <section
            id="introduction"
            className="mb-8 bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                📋
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">1. Introduction</h2>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">
              We respect your privacy and are committed to protecting your personal data. This
              privacy policy will inform you about how we look after your personal data when you
              visit our website and tell you about your privacy rights and how the law protects you.
            </p>
          </section>

          {/* Section 2: Information We Collect */}
          <section
            id="information-collect"
            className="mb-8 bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                📊
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">2. Information We Collect</h2>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              We may collect, use, store and transfer different kinds of personal data about you,
              including:
            </p>
            <ul className="space-y-3">
              {[
                {
                  title: 'Identity Data',
                  desc: 'includes first name, last name, username or similar identifier',
                },
                {
                  title: 'Contact Data',
                  desc: 'includes email address and telephone numbers',
                },
                {
                  title: 'Technical Data',
                  desc: 'includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform',
                },
                {
                  title: 'Usage Data',
                  desc: 'includes information about how you use our website and services',
                },
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                  <svg
                    className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <span className="font-semibold text-gray-900">{item.title}:</span>{' '}
                    <span className="text-gray-600">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 3: How We Use Your Information */}
          <section
            id="how-we-use"
            className="mb-8 bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                🔧
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  3. How We Use Your Information
                </h2>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              We will only use your personal data when the law allows us to. Most commonly, we will
              use your personal data in the following circumstances:
            </p>
            <ul className="space-y-2">
              {[
                'To provide and maintain our service',
                'To notify you about changes to our service',
                'To provide customer support',
                'To gather analysis or valuable information so that we can improve our service',
                'To monitor the usage of our service',
                'To detect, prevent and address technical issues',
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 4: Data Security */}
          <section
            id="data-security"
            className="mb-8 bg-gradient-to-br from-blue-50 to-white p-6 sm:p-8 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                🔒
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">4. Data Security</h2>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              We have implemented appropriate security measures to prevent your personal data from
              being accidentally lost, used, or accessed in an unauthorized way, altered, or
              disclosed. We limit access to your personal data to those employees, agents,
              contractors, and other third parties who have a business need to know.
            </p>
          </section>

          {/* Section 5: Your Legal Rights */}
          <section
            id="legal-rights"
            className="mb-8 bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                ⚖️
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">5. Your Legal Rights</h2>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              Under certain circumstances, you have rights under data protection laws in relation to
              your personal data, including the right to:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                'Request access to your personal data',
                'Request correction of your personal data',
                'Request erasure of your personal data',
                'Object to processing of your personal data',
                'Request restriction of processing your personal data',
                'Request transfer of your personal data',
                'Right to withdraw consent',
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 p-3 rounded-lg bg-gray-50 border border-gray-100"
                >
                  <svg
                    className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 6: Contact Us */}
          <section
            id="contact"
            className="mb-8 bg-gradient-to-br from-blue-50 to-white p-6 sm:p-8 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                📧
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">6. Contact Us</h2>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about this privacy policy or our privacy practices, please
              contact us at:
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="mailto:info@reai.co"
                className="inline-flex items-center gap-2 px-5 py-3 bg-white text-blue-600 font-semibold rounded-xl border-2 border-blue-200 hover:border-blue-600 hover:bg-blue-50 transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                info@reai.co
              </a>
              <a
                href="tel:+16503088979"
                className="inline-flex items-center gap-2 px-5 py-3 bg-white text-blue-600 font-semibold rounded-xl border-2 border-blue-200 hover:border-blue-600 hover:bg-blue-50 transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                01-650-308-8979
              </a>
            </div>
          </section>

          {/* Section 7: Changes */}
          <section
            id="changes"
            className="mb-8 bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                🔄
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  7. Changes to This Privacy Policy
                </h2>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">
              We may update our privacy policy from time to time. We will notify you of any changes
              by posting the new privacy policy on this page and updating the &quot;Last
              updated&quot; date at the top of this privacy policy.
            </p>
          </section>
        </main>
      </div>
    </PageLayout>
  );
}
