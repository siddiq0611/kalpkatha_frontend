import Link from 'next/link';
import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <header className="bg-dark-200 py-4 border-b border-dark-300">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <img src="/logo.png" alt="kalpkatha" className="h-10 w-10 rounded-lg" />
          <span className="text-2xl font-bold text-white">kalpkatha</span>
        </Link>
        <nav>
            <a 
                href="https://github.com/siddiq0611"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
                >
            <div className="w-12 h-12 bg-graynew rounded-full p-0.5 transition-transform duration-300 hover:scale-110 hover:shadow-lg hover:bg-white">
                <Image 
                src="/avatar.svg" 
                alt="GitHub Avatar" 
                className="rounded-full" 
                width={48} 
                height={48} 
                />
            </div>
            </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;