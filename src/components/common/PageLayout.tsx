'use client';

export default function PageLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="pt-8 pb-12 sm:pb-16 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          {title && (
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 sm:mb-8 md:mb-12 text-center">
              {title}
            </h1>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
