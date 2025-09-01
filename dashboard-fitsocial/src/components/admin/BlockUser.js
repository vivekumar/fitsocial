'use client'
import React from 'react';

const BlockUser = () => {

    return (
        <div className="blockUnblock">
            <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <span className="me-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Blocked
                </span>
                <div
                    className={`relative w-11 h-6 peer-focus:outline-none rounded-full bg-red-600 peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600`}
                ></div>
            </label>
        </div>
    );
};

export default BlockUser;
