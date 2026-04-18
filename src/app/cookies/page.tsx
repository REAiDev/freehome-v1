'use client';
import { useState, useEffect } from 'react';
import { PageLayout } from '@/components/common';

const sections = [
  { id: 'what-are-cookies', title: 'What Are Cookies', icon: '🍪' },
  { id: 'how-we-use', title: 'How We Use Cookies', icon: '🔧' },
  { id: 'types-of-cookies', title: 'Types of Cookies', icon: '📋' },
  { id: 'third-party', title: 'Third-Party Cookies', icon: '🔗' },
  { id: 'manage-cookies', title: 'Managing Cookies', icon: '⚙️' },
  { id: 'updates', title: 'Updates to This Policy', icon: '🔄' },
  { id: 'contact', title: 'Contact Us', icon: '📧' },
];

export default function CookiesPage() {
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
    <PageLayout title="Cookie Policy">
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

          {/* Section 1: What Are Cookies */}
          <section
            id="what-are-cookies"
            className="mb-8 bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                🍪
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">1. What Are Cookies</h2>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              Cookies are small text files that are placed on your device (computer, smartphone, or
              tablet) when you visit a website. They are widely used to make websites work more
              efficiently and provide information to website owners.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Cookies help us understand how you use our website, remember your preferences, and
              improve your overall experience. They do not typically contain any information that
              personally identifies you, but they may store information about your browsing habits
              and preferences.
            </p>
          </section>

          {/* Section 2: How We Use Cookies */}
          <section
            id="how-we-use"
            className="mb-8 bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                🔧
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">2. How We Use Cookies</h2>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              We use cookies for various purposes to enhance your experience on our website:
            </p>
            <ul className="space-y-2">
              {[
                'To remember your login status and preferences',
                'To analyze website traffic and understand how visitors use our site',
                'To improve website functionality and user experience',
                'To provide personalized content and recommendations',
                'To enable social media features and integrations',
                'To deliver targeted advertising based on your interests',
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

          {/* Section 3: Types of Cookies */}
          <section
            id="types-of-cookies"
            className="mb-8 bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                📋
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  3. Types of Cookies We Use
                </h2>
              </div>
            </div>
            <div className="space-y-4">
              {[
                {
                  title: 'Essential Cookies',
                  desc: 'These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.',
                  color: 'green',
                },
                {
                  title: 'Performance Cookies',
                  desc: 'These cookies collect information about how visitors use our website, such as which pages are visited most often. This helps us improve how our website works.',
                  color: 'blue',
                },
                {
                  title: 'Functionality Cookies',
                  desc: 'These cookies allow our website to remember choices you make (such as your username, language, or region) and provide enhanced, personalized features.',
                  color: 'purple',
                },
                {
                  title: 'Targeting/Advertising Cookies',
                  desc: 'These cookies are used to deliver advertisements that are more relevant to you and your interests. They also help limit the number of times you see an ad.',
                  color: 'orange',
                },
              ].map((cookie, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border-l-4 ${
                    cookie.color === 'green'
                      ? 'bg-green-50 border-green-500'
                      : cookie.color === 'blue'
                        ? 'bg-blue-50 border-blue-500'
                        : cookie.color === 'purple'
                          ? 'bg-purple-50 border-purple-500'
                          : 'bg-orange-50 border-orange-500'
                  }`}
                >
                  <h3
                    className={`font-bold mb-2 ${
                      cookie.color === 'green'
                        ? 'text-green-900'
                        : cookie.color === 'blue'
                          ? 'text-blue-900'
                          : cookie.color === 'purple'
                            ? 'text-purple-900'
                            : 'text-orange-900'
                    }`}
                  >
                    {cookie.title}
                  </h3>
                  <p
                    className={`text-sm ${
                      cookie.color === 'green'
                        ? 'text-green-800'
                        : cookie.color === 'blue'
                          ? 'text-blue-800'
                          : cookie.color === 'purple'
                            ? 'text-purple-800'
                            : 'text-orange-800'
                    }`}
                  >
                    {cookie.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Third-Party Cookies */}
          <section
            id="third-party"
            className="mb-8 bg-gradient-to-br from-blue-50 to-white p-6 sm:p-8 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                🔗
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">4. Third-Party Cookies</h2>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              In addition to our own cookies, we may use third-party cookies from trusted partners.
              These include:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                'Google Analytics for website analytics',
                'Social media platforms (Facebook, Twitter, LinkedIn)',
                'Advertising partners for targeted ads',
                'Payment processors for secure transactions',
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 p-3 rounded-lg bg-white border border-blue-100"
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

          {/* Section 5: Managing Cookies */}
          <section
            id="manage-cookies"
            className="mb-8 bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                ⚙️
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  5. Managing Your Cookie Preferences
                </h2>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              You have the right to decide whether to accept or reject cookies. You can manage your
              cookie preferences through your browser settings:
            </p>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="font-bold text-gray-900 mb-2">Browser Settings</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Most web browsers allow you to control cookies through their settings. You can:
                </p>
                <ul className="space-y-1 text-sm text-gray-600 ml-4">
                  <li>• Block all cookies</li>
                  <li>• Block third-party cookies only</li>
                  <li>• Delete cookies when you close your browser</li>
                  <li>• View and delete individual cookies</li>
                </ul>
              </div>
              <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <div>
                    <h3 className="font-bold text-yellow-900 mb-1">Important Note</h3>
                    <p className="text-sm text-yellow-800">
                      Blocking or deleting cookies may affect your ability to use certain features
                      of our website. Some functionality may not work properly without cookies
                      enabled.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: Updates */}
          <section
            id="updates"
            className="mb-8 bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                🔄
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  6. Updates to This Cookie Policy
                </h2>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">
              We may update this Cookie Policy from time to time to reflect changes in our practices
              or for other operational, legal, or regulatory reasons. We will notify you of any
              material changes by posting the updated policy on this page and updating the
              &quot;Last updated&quot; date at the top.
            </p>
          </section>

          {/* Section 7: Contact Us */}
          <section
            id="contact"
            className="mb-8 bg-gradient-to-br from-blue-50 to-white p-6 sm:p-8 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                📧
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">7. Contact Us</h2>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about our use of cookies, please contact us at:
            </p>
            <a
              href="mailto:james@reai.co"
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
              james@reai.co
            </a>
            <div className="mt-4 pt-4 border-t border-blue-100">
              <p className="text-sm text-gray-600">
                For more information about our data practices, please review our{' '}
                <a
                  href="/privacy"
                  className="text-blue-600 hover:text-blue-700 font-semibold underline"
                >
                  Privacy Policy
                </a>{' '}
                and{' '}
                <a
                  href="/terms"
                  className="text-blue-600 hover:text-blue-700 font-semibold underline"
                >
                  Terms & Conditions
                </a>
                .
              </p>
            </div>
          </section>
        </main>
      </div>
    </PageLayout>
  );
}
