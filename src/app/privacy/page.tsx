import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function PrivacyPage() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-grow bg-gray-50'>
        <div className='container mx-auto px-4 py-12'>
          <div className='max-w-3xl mx-auto'>
            <h1 className='text-4xl font-bold mb-8'>Privacy Policy</h1>

            <section className='mb-8'>
              <h2 className='text-2xl font-semibold mb-4'>Introduction</h2>
              <p className='text-gray-700 mb-4'>
                At Meme Creator, we take your privacy seriously. This Privacy
                Policy explains how we collect, use, and protect your personal
                information when you use our services.
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-semibold mb-4'>
                Information We Collect
              </h2>
              <ul className='list-disc list-inside space-y-2 text-gray-700'>
                <li>Account information (email, username)</li>
                <li>Content you create and upload</li>
                <li>Usage data and analytics</li>
                <li>Device and browser information</li>
              </ul>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-semibold mb-4'>
                How We Use Your Information
              </h2>
              <p className='text-gray-700 mb-4'>We use your information to:</p>
              <ul className='list-disc list-inside space-y-2 text-gray-700'>
                <li>Provide and improve our services</li>
                <li>Personalize your experience</li>
                <li>Communicate with you</li>
                <li>Ensure security and prevent fraud</li>
              </ul>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-semibold mb-4'>Data Security</h2>
              <p className='text-gray-700 mb-4'>
                We implement appropriate security measures to protect your
                personal information. However, no method of transmission over
                the internet is 100% secure.
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-semibold mb-4'>Your Rights</h2>
              <p className='text-gray-700 mb-4'>You have the right to:</p>
              <ul className='list-disc list-inside space-y-2 text-gray-700'>
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </section>

            <section>
              <h2 className='text-2xl font-semibold mb-4'>Contact Us</h2>
              <p className='text-gray-700'>
                If you have any questions about this Privacy Policy, please
                contact us at{' '}
                <a
                  href='mailto:sassflair0@gmail.com'
                  className='text-blue-600 hover:underline'
                >
                  sassflair0@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
