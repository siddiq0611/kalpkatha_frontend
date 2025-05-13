const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-200 py-6 border-t border-dark-300 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-400">
            &copy; {new Date().getFullYear()} kalpkatha — @siddiq0611
        </p>
        <p className="text-gray-500 text-sm mt-2">
          Powered by NextJS and FastAPI
        </p>
      </div>
    </footer>
  );
};

export default Footer;