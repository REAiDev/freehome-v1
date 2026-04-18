import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How It Works | FreeHome.world',
  description:
    'Learn how FreeHome.world helps you locate and buy your dream home abroad — easily, simply, intelligently, and confidently.',
};

const steps = [
  {
    number: '1',
    emoji: '🌍',
    title: 'Explore and Learn',
    subtitle: 'Optional but Helpful',
    body: 'Start by browsing the FreeHome.world homepage and our Insights section. These pages provide educational and practical information about buying property abroad, lifestyle differences by country, and incentives, regulations, and market dynamics. This helps you form initial ideas — but you don\'t need to know everything to get started.',
    id: 'step-1',
  },
  {
    number: '2',
    emoji: '🏡',
    title: 'Start Matching to Your Dream Home',
    subtitle: null,
    body: 'From the homepage, scroll to the middle and click "Match to My Dream Home." You\'ll be guided through a simple, intuitive flow that takes you step by step toward your perfect property.',
    id: 'step-2',
  },
  {
    number: '3',
    emoji: '📍',
    title: 'Choose Your Destination(s)',
    subtitle: null,
    body: 'Select one or more countries you\'re considering moving to or investing in. You can explore multiple destinations at once. When you\'re ready, click "Getting Started."',
    id: 'step-3',
  },
  {
    number: '4',
    emoji: '🏠',
    title: 'Define Your Property Basics',
    subtitle: null,
    body: 'On the next page, choose your budget range, property type, number of bedrooms, and property condition. These basics help us narrow down the best matches for you. Click "Continue" when done.',
    id: 'step-4',
  },
  {
    number: '5',
    emoji: '🌅',
    title: 'Select Your Preferences',
    subtitle: null,
    body: 'Tell us what matters to you most: ocean view, mountain view, countryside, or city living. Your lifestyle preferences help our engine find properties that truly fit how you want to live. Click "Continue."',
    id: 'step-5',
  },
  {
    number: '6',
    emoji: '🎯',
    title: 'Define Your Lifestyle Goals',
    subtitle: null,
    body: 'Help us understand how you plan to use the home — your family structure and how you\'ll use your overseas property. The more we know, the better we can match you. Click "Continue."',
    id: 'step-6',
  },
  {
    number: '7',
    emoji: '✅',
    title: 'Review and Confirm',
    subtitle: null,
    body: 'You\'ll see a summary of all your selections. Take a moment to review and make any adjustments if needed. When you\'re satisfied, click "See My Dream Home."',
    id: 'step-7',
  },
  {
    number: '8',
    emoji: '🧠',
    title: 'Smart Matching Powered by REAI Technology',
    subtitle: null,
    body: 'After clicking "See My Dream Home," you\'ll be redirected to REAI.co\'s FreeHome.world section, where our proprietary smart engine begins working for you. REAI uses its patented and proprietary AI technologies to analyze your inputs, considering both current and projected future preferences, and intelligently matches you with the most suitable properties — without endless searching. You\'ll immediately see an initial matched property.',
    id: 'step-8',
    highlight: true,
  },
  {
    number: '9',
    emoji: '🔍',
    title: 'Refine or Explore Further',
    subtitle: null,
    body: 'From here, you can modify your selections (you\'ll be guided back to FreeHome.world to adjust preferences), view more details of the matched home, or see the next matched home. At this point, you\'ll be prompted to sign up or log in.',
    id: 'step-9',
  },
  {
    number: '10',
    emoji: '🔑',
    title: 'Sign Up or Log In',
    subtitle: 'Quick & Easy',
    body: 'First-time users can sign up on REAI.co using Google, Microsoft, X (Twitter), or with your email and password. Returning users can simply log in. Once logged in, you can explore more matched properties, dive deeper into details, and proceed toward transaction and next steps with confidence.',
    id: 'step-10',
  },
];

const whyItems = [
  { emoji: '🌍', text: 'Global, not limited by MLS systems' },
  { emoji: '🧠', text: 'Patented AI-powered smart matching — no keyword searching needed' },
  { emoji: '🏡', text: 'Lifestyle-first and personal preference approach, not just listings' },
  { emoji: '🤝', text: 'Designed to guide you through both discovery and transaction' },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-8 pb-12 sm:pb-16 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">

          {/* Hero */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How FreeHome.world Works
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Locate and buy your dream home abroad — easily, simply, intelligently, and confidently.
            </p>
          </div>

          {/* Intro card */}
          <div className="bg-gradient-to-br from-blue-50 to-white p-6 sm:p-8 rounded-2xl border border-blue-100 shadow-sm mb-10">
            <p className="text-gray-700 leading-relaxed mb-4">
              Buying a home overseas can feel overwhelming. Different countries, rules, taxes, languages, and endless listings make it difficult to know where to start.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              After reading our Insights articles, many users tell us the same thing:
            </p>
            <blockquote className="border-l-4 border-blue-600 pl-4 italic text-gray-700 mb-4">
              &ldquo;Now I understand how complex this is — but I still don&apos;t know how to find the right home.&rdquo;
            </blockquote>
            <p className="text-gray-700 leading-relaxed font-medium">
              That&apos;s exactly why FreeHome.world is here to serve you. We simplify the entire process and lead you step by step — from onboarding, smart matching and, ultimately, to transaction.
            </p>
          </div>

          {/* Steps */}
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Step-by-Step: How to Use FreeHome.world</h2>

          <div className="space-y-6 mb-12">
            {steps.map((step) => (
              <div
                key={step.id}
                id={step.id}
                className={`bg-white p-6 sm:p-8 rounded-2xl border shadow-sm hover:shadow-md transition-shadow ${
                  step.highlight ? 'border-blue-200 bg-gradient-to-br from-blue-50 to-white' : 'border-gray-100'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${
                    step.highlight ? 'bg-blue-600' : 'bg-blue-100'
                  }`}>
                    {step.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">
                        Step {step.number}
                      </span>
                      {step.subtitle && (
                        <span className="text-xs text-gray-500 italic">— {step.subtitle}</span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Why FreeHome.world */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 sm:p-8 rounded-2xl shadow-md mb-10">
            <h2 className="text-2xl font-bold text-white mb-6">
              Why FreeHome.world Is The Service for Your Overseas Home Needs
            </h2>
            <ul className="space-y-4">
              {whyItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                  <span className="text-blue-50 leading-relaxed">{item.text}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-blue-100 leading-relaxed font-medium">
              FreeHome.world removes friction, confusion, and guesswork — so finding your dream home abroad becomes clear, efficient, and enjoyable.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-gray-600 mb-4">Ready to find your dream home abroad?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
              >
                Get Started
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/insights"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl border border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-colors"
              >
                Browse Insights
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
