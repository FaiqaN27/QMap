import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="shadow-lg">
      <div className="max-w-5xl mx-auto bg-white py-4 px-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <span className="text-blue-600 text-3xl">Q</span>Map
        </div>

        <div className="flex gap-6 text-gray-700 font-bold">
          <Link
            to="/"
            className="hover:text-blue-600 transition hover:underline"
          >
            Home
          </Link>

          <Link
            to="/about"
            className="hover:text-blue-600 hover:underline transition"
          >
            About
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
