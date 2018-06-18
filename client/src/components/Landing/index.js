import React from 'react';
import { Link } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="engine-app">
      <h1>Welcome to Engine</h1>

      <nav>
        <Link to="/signin">Sign In</Link> |&nbsp;
        <Link to="/admin">Admin</Link>
      </nav>
    </div>
  );
};

export default Layout;
