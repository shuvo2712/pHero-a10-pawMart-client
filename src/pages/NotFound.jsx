import { Link } from 'react-router-dom';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import useDocumentTitle from '../hooks/useDocumentTitle';

const NotFound = () => {
  useDocumentTitle("404 Not Found");
  const [text] = useTypewriter({
    words: ["Oops! Page Not Found."],
    loop: true,
    delaySpeed: 1000,
  });
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center p-4">
      <h1 className="text-6xl font-extrabold text-primary mb-4">404</h1>
      <h2 className="text-3xl font-bold mb-4 min-h-[1.2em]">
        {text}<Cursor cursorColor="hsl(var(--p))" />
      </h2>
      <p className="mb-8">The page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-primary">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
