import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="App-sidebar">
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/posts">Posts</Link></li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
