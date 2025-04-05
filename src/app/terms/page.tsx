import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function TermsPage() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-grow bg-gray-50'>
        <div className='container mx-auto px-4 py-12'>
          <div className='max-w-3xl mx-auto'>
            <h1 className='text-4xl font-bold mb-8'>Terms of Service</h1>

            <section className='mb-8'>
              <h2 className='text-2xl font-semibold mb-4'>
                1. Acceptance of Terms
              </h2>
              <p className='text-gray-700 mb-4'>
                By accessing and using Meme Creator, you agree to be bound by
                these Terms of Service. If you do not agree to these terms,
                please do not use our services.
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-semibold mb-4'>
                2. User Responsibilities
              </h2>
              <p className='text-gray-700 mb-4'>
                As a user of Meme Creator, you agree to:
              </p>
              <ul className='list-disc list-inside space-y-2 text-gray-700'>
                <li>Provide accurate account information</li>
                <li>Maintain the security of your account</li>
                <li>Not use the service for illegal purposes</li>
                <li>Respect intellectual property rights</li>
                <li>Not create or share harmful or offensive content</li>
              </ul>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-semibold mb-4'>
                3. Content Ownership
              </h2>
              <p className='text-gray-700 mb-4'>
                You retain ownership of the content you create using Meme
                Creator. However, by using our service, you grant us a license
                to use, store, and display your content as necessary to provide
                our services.
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-semibold mb-4'>
                4. Service Modifications
              </h2>
              <p className='text-gray-700 mb-4'>
                We reserve the right to modify or discontinue any part of our
                service at any time. We will notify users of any significant
                changes to our services.
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-semibold mb-4'>
                5. Limitation of Liability
              </h2>
              <p className='text-gray-700 mb-4'>
                Meme Creator is provided "as is" without any warranties. We are
                not liable for any damages resulting from your use of our
                service.
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-semibold mb-4'>
                6. Contact Information
              </h2>
              <p className='text-gray-700'>
                For any questions regarding these Terms of Service, please
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
