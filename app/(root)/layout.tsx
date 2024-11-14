import React from 'react';

import Navbar from '@/components/navigation/Navbar';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
    </>
  );
};

export default RootLayout;
