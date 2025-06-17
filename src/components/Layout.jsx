import React from 'react';
import Sidebar from './LeftSidebar';
import Bottombar from './Bottombar';
function Layout({ children }) {
    return (
        <div className="flex min-h-screen relative">
            {/* Sidebar visible on desktop */}
            <Sidebar />

            {/* Main content */}
            <main className="flex-1 md:my-0 md:mx-0 lg:my-0 my-10 md:pt-10 lg:pb-4">
                {children}
            </main>

            {/* Bottombar fixed at bottom on small screens */}
            <div className="fixed bottom-0 w-full lg:hidden">
                <Bottombar />
            </div>
        </div>
    );
}

export default Layout;

