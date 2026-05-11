import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="footer footer-center bg-base-200 text-base-content p-10 flex flex-col items-center text-center">
      <aside className="flex flex-col items-center">
        <Link to="/" className="text-3xl font-bold text-primary flex gap-2 items-center mb-2">
          🐾 PawMart
        </Link>
        <p className="max-w-md text-gray-600">
          PawMart connects local pet owners and buyers for adoption and pet care products.
        </p>
      </aside>
      <nav>
        <div className="grid grid-flow-col gap-6">
          <Link to="/" className="link link-hover">Home</Link>
          <Link to="/contact" className="link link-hover">Contact</Link>
          <Link to="/terms" className="link link-hover">Terms</Link>
        </div>
      </nav>
      <nav className="flex flex-col items-center">
        <h6 className="footer-title">Social</h6>
        <div className="grid grid-flow-col gap-4">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-2xl hover:text-primary transition-colors">
            <FaFacebook />
          </a>
          <a href="https://x.com" target="_blank" rel="noreferrer" className="text-2xl hover:text-primary transition-colors">
            <FaXTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-2xl hover:text-primary transition-colors">
            <FaInstagram />
          </a>
        </div>
      </nav>
      <aside className="flex flex-col items-center">
        <h6 className="footer-title">Legal</h6>
        <p>&copy; {new Date().getFullYear()} PawMart. All rights reserved.</p>
      </aside>
    </footer>
  );
};

export default Footer;
