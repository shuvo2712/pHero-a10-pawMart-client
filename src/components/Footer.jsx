import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer bg-base-200 text-base-content p-10">
      <aside>
        <Link to="/" className="text-3xl font-bold text-primary flex gap-2 items-center mb-2">
          🐾 PawMart
        </Link>
        <p className="max-w-xs text-gray-600">
          PawMart connects local pet owners and buyers for adoption and pet care products.
        </p>
      </aside>
      <nav>
        <h6 className="footer-title">Useful Links</h6>
        <Link to="/" className="link link-hover">Home</Link>
        <Link to="/contact" className="link link-hover">Contact</Link>
        <Link to="/terms" className="link link-hover">Terms</Link>
      </nav>
      <nav>
        <h6 className="footer-title">Legal</h6>
        <p>&copy; {new Date().getFullYear()} PawMart. All rights reserved.</p>
      </nav>
    </footer>
  );
};

export default Footer;
