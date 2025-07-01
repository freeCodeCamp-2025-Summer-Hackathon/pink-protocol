import { Link } from "react-router";

export const Navbar = () => {
  // styles for demonstration only, do not follow this approach
  return (
    <nav style={{
      padding: "1rem",
      display: "flex",
      gap: "1rem",
    }}>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </nav>
  );
};