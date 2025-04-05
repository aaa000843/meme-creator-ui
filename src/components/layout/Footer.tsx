import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='bg-white border-t'>
      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div>
            <Link href='/' className='flex items-center space-x-2 group'>
              <span className='text-2xl font-bold text-blue-600 group-hover:scale-110 transition-transform duration-200'>
                🎭
              </span>
              <span className='text-xl font-semibold group-hover:text-blue-600 transition-colors duration-200'>
                Meme Creator
              </span>
            </Link>
            <p className='text-gray-600'>
              Create and share your memes with the world. Simple, fast, and fun!
            </p>
          </div>
          <div>
            <h3 className='text-lg font-semibold mb-4'>Quick Links</h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='/about'
                  className='text-gray-600 hover:text-gray-900'
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href='/privacy'
                  className='text-gray-600 hover:text-gray-900'
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href='/terms'
                  className='text-gray-600 hover:text-gray-900'
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='text-lg font-semibold mb-4'>Contact</h3>
            <ul className='space-y-2'>
              <li className='text-gray-600'>
                <a
                  href='mailto:sassflair0@gmail.com'
                  className='hover:text-gray-900'
                >
                  sassflair0@gmail.com
                </a>
              </li>
              <li className='text-gray-600'></li>
            </ul>
          </div>
        </div>
        <div className='mt-8 pt-8 border-t text-center text-gray-600'>
          <p>
            &copy; {new Date().getFullYear()} Meme Creator. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
