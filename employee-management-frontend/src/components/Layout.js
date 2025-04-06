// src/components/Layout.js
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Header />
        <main className="main-content">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;