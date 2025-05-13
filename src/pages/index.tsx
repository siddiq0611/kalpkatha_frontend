import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StoryForm from '../components/StoryForm';

const Home: NextPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>kalpkatha</title>
        <meta name="description" content="AI-powered story generator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Kalpkatha AI
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Enter a prompt and let our AI weave a captivating story for you. From fantasy adventures to sci-fi thrillers, the possibilities are endless.
          </p>
        </div>

        <StoryForm />
        
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="card text-center">
            <div className="text-3xl mb-4">✨</div>
            <h3 className="text-xl mb-2">Creative & Unique</h3>
            <p className="text-gray-400">
              Each story is uniquely crafted based on your prompt, ensuring original content every time.
            </p>
          </div>
          
          <div className="card text-center">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-xl mb-2">Lightning Fast</h3>
            <p className="text-gray-400">
              Get your story in seconds, powered by state-of-the-art AI technology.
            </p>
          </div>
          
          <div className="card text-center">
            <div className="text-3xl mb-4">📝</div>
            <h3 className="text-xl mb-2">Well-Structured</h3>
            <p className="text-gray-400">
              Stories follow a proper narrative structure with characters, plot, and resolution.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;