import Link from "next/link";
import React from "react";

const NotFound = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-white text-center">
            <div>
                <h1 className="text-6xl font-bold text-black mb-4">404 Not Found</h1>
                <p className="text-gray-600 mb-6">
                    Your visited page not found. You may go home page.
                </p>
                <Link href="/"
                    className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded"
                >
                    Back to home page
                </Link>
            </div>
        </div>
    );
};

export default NotFound;