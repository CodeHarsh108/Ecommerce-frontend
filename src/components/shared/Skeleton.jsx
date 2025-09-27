import React from "react";

const Skeleton = () => {
return (
    <div
        role="status"
        className="w-full max-w-2xl mx-auto p-6 bg-gradient-to-br from-gray-50 via-white to-gray-100  rounded-2xl shadow-xl space-y-4 animate-pulse"
    >
        {[...Array(12)].map((_, i) => (
            <div
                key={i}
                className="flex items-center w-full gap-3"
            >
                <div
                    className={`h-3 rounded-full ${
                        i % 3 === 0
                            ? "bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900"
                            : "bg-gray-200 dark:bg-gray-700"
                    } ${i % 2 === 0 ? "w-32" : "flex-1"}`}
                />
                <div
                    className={`h-3 rounded-full ${
                        i % 2 === 0
                            ? "bg-gradient-to-r from-pink-200 via-blue-200 to-purple-200 dark:from-pink-900 dark:via-blue-900 dark:to-purple-900"
                            : "bg-gray-300 dark:bg-gray-600"
                    } ${i % 3 === 1 ? "w-24" : "flex-1"}`}
                />
                <div
                    className={`h-3 rounded-full ${
                        i % 4 === 0
                            ? "bg-gradient-to-r from-purple-200 via-blue-200 to-pink-200 dark:from-purple-900 dark:via-blue-900 dark:to-pink-900"
                            : "bg-gray-300 dark:bg-gray-600"
                    } ${i % 5 === 0 ? "w-80" : "flex-1"}`}
                />
            </div>
        ))}
        <span className="sr-only">Loading...</span>
    </div>
);
};

export default Skeleton;