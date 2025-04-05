import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function AboutPage() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-grow bg-gray-50'>
        <div className='container mx-auto px-4 py-12'>
          <div className='max-w-3xl mx-auto'>
            <h1 className='text-4xl font-bold mb-8'>About Meme Creator</h1>

            <section className='mb-8'>
              <h2 className='text-2xl font-semibold mb-4'>Our Mission</h2>
              <p className='text-gray-700 mb-4'>
                At Meme Creator, we believe in the power of humor and creativity
                to bring people together. Our mission is to provide an
                intuitive, powerful, and fun platform for creating and sharing
                memes.
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-semibold mb-4'>Features</h2>
              <ul className='list-disc list-inside space-y-2 text-gray-700'>
                <li>Easy-to-use meme creation tools</li>
                <li>Extensive library of templates and images</li>
                <li>Custom text and font options</li>
                <li>Vector graphics support</li>
                <li>High-quality export options</li>
              </ul>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-semibold mb-4'>Our Team</h2>
              <p className='text-gray-700 mb-4'>
                We're a passionate team of designers, developers, and meme
                enthusiasts dedicated to making meme creation accessible to
                everyone. Our diverse backgrounds and shared love for internet
                culture drive us to continuously improve our platform.
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-semibold mb-4'>Contact Us</h2>
              <p className='text-gray-700'>
                Have questions or suggestions? We'd love to hear from you! Reach
                out to us at{' '}
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
