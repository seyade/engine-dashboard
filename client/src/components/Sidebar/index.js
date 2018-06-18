import React from 'react';
import { Link } from 'react-router-dom';

export const Sidebar = props => {
  return (
    <aside className="sidebar">
      <h1 className="sidebar__title">Sidebar</h1>

      {props.children}

      <div className="sidebar__sign-out">
        <a href="/">
          <span className="icon fa fa-power-off" /> Sign out
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
