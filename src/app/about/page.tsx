'use client';
import { useState, useEffect } from 'react';
import { PageLayout } from '@/components/common';
import FilterModal from '@/components/homepage/FilterModal';

const sections = [
  { id: 'about', title: 'About FreeHome.world', icon: '🏠' },
  { id: 'mission', title: 'Our Mission', icon: '🎯' },
  { id: 'why-we-exist', title: 'Why We Exist', icon: '💡' },
  { id: 'approach', title: 'Our Approach', icon: '🔧' },
  { id: 'different', title: 'What Makes Us Different', icon: '⭐' },
];

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

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
    <PageLayout title="About Us">
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
          {/* Section 1: About FreeHome.world */}
          <section
            id="about"
            className="mb-8 bg-gradient-to-br from-blue-50 to-white p-6 sm:p-8 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                🏠
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">About FreeHome.world</h2>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              FreeHome.world is part of the Global Services of REAI, Inc. (
              <a
                href="https://REAI.co"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-semibold underline"
              >
                https://REAI.co
              </a>
              ). We lead you to your best matching dream home overseas—tailored for either your
              expat life, remote work, vacation home, or rental income—and leverage exclusive
              pricing and incentives to ensure it is a sound financial decision.
            </p>
          </section>

          {/* Section 2: Our Mission */}
          <section
            id="mission"
            className="mb-8 bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                🎯
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Our Mission</h2>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Our mission is to empower your overseas property journey with the utmost solution. We
              simplify a complex process by using our patented AI engine to locate the best matching
              properties personalized from your lifestyle, preferences, or future goals.
              Furthermore, we help you uncover unique financial incentives and subsidy programs from
              various local governments overseas, making your transition abroad smoother and more
              financially sound.
            </p>
          </section>

          {/* Section 3: Why We Exist */}
          <section
            id="why-we-exist"
            className="mb-8 bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                💡
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Why We Exist</h2>
              </div>
            </div>
            <div className="space-y-4">
              {[
                {
                  title: 'Bridging the Gap',
                  desc: 'Buyers looking for overseas properties lack knowledge, information, language skills, and leads of good agents and properties in foreign lands. We bridge the gap among international buyers and foreign regions.',
                  color: 'blue',
                },
                {
                  title: 'Revitalizing or Balancing Growth',
                  desc: 'We help cities or regions in foreign countries revitalize by bringing in overseas buyers and supporting regional growth.',
                  color: 'green',
                },
                {
                  title: 'Creating Opportunities',
                  desc: 'We guide buyers to affordable overseas properties with special price incentives or government subsidy programs.',
                  color: 'purple',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border-l-4 ${
                    item.color === 'blue'
                      ? 'bg-blue-50 border-blue-500'
                      : item.color === 'green'
                        ? 'bg-green-50 border-green-500'
                        : 'bg-purple-50 border-purple-500'
                  }`}
                >
                  <h3
                    className={`font-bold mb-2 ${
                      item.color === 'blue'
                        ? 'text-blue-900'
                        : item.color === 'green'
                          ? 'text-green-900'
                          : 'text-purple-900'
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`text-sm ${
                      item.color === 'blue'
                        ? 'text-blue-800'
                        : item.color === 'green'
                          ? 'text-green-800'
                          : 'text-purple-800'
                    }`}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Our Approach */}
          <section
            id="approach"
            className="mb-8 bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                🔧
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Our Approach</h2>
              </div>
            </div>
            <div className="space-y-4">
              {[
                {
                  number: '01',
                  title: 'AI-Powered Matching',
                  desc: 'REAI (FreeHome.world is part of the Global Services of REAI, Inc.) is the only company with a portfolio of AI patents for advanced real estate applications. We lead you to the best matching properties customized for you, not only with your current preferences, but projected future trends and needs.',
                },
                {
                  number: '02',
                  title: 'Comprehensive Database',
                  desc: "We maintain the world's most comprehensive database of special housing programs, continuously updating information from official governments and municipal sources, as well as verified community reports.",
                },
                {
                  number: '03',
                  title: 'Complete Transparency',
                  desc: 'Our platform provides complete transparency about program requirements, property conditions, renovation costs, and community support to help users make informed decisions.',
                },
                {
                  number: '04',
                  title: 'Strategic Matchmaking',
                  desc: 'We create matchings between buyers, municipalities, and service providers to ensure successful transitions and sustainable community development.',
                },
              ].map((item) => (
                <div key={item.number} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {item.number}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: What Makes Us Different */}
          <section
            id="different"
            className="mb-8 bg-gradient-to-br from-blue-50 to-white p-6 sm:p-8 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                ⭐
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">What Makes Us Different</h2>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  title: 'Patented Technology',
                  desc: 'Our portfolio of patents and powerful proprietary features enable us to guide users through their overseas home journey with ease, minimal effort, and maximum or optimal results.',
                  icon: '🔬',
                },
                {
                  title: 'Comprehensive Database',
                  desc: 'Access to millions of unique properties across multiple countries/regions with special pricing, also various unique municipal incentive programs.',
                  icon: '📊',
                },
                {
                  title: 'Verified Information',
                  desc: 'All property and program data is continuously updated and verified from official government and municipal sources.',
                  icon: '✓',
                },
                {
                  title: 'Community Support',
                  desc: 'Get guidance from our community of experts and municipal representatives, and be matched to other users for various overseas home needs.',
                  icon: '🤝',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-4 bg-white rounded-xl border border-blue-100 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{item.icon}</span>
                    <h3 className="font-bold text-gray-900">{item.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <section className="mb-8 bg-gradient-to-r from-blue-600 to-blue-700 p-6 sm:p-8 rounded-2xl shadow-lg">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                Ready to Find Your Dream Home Overseas?
              </h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Start your journey today and discover exclusive properties with special pricing and
                incentive programs.
              </p>
              <button
                onClick={() => setIsFilterModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all shadow-md hover:shadow-lg"
              >
                Explore Properties
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
            </div>
          </section>
        </main>
      </div>

      {/* Filter Modal */}
      <FilterModal open={isFilterModalOpen} onOpenChange={setIsFilterModalOpen} />
    </PageLayout>
  );
}
