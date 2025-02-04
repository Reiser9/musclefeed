import React from 'react';

export const Error = ({ ...props }) => {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g clipPath="url(#clip0_14411_8822)">
                <path
                    d="M7.99967 5.33325V7.99992M7.99967 10.6666H8.00634M14.6663 7.99992C14.6663 11.6818 11.6816 14.6666 7.99967 14.6666C4.31778 14.6666 1.33301 11.6818 1.33301 7.99992C1.33301 4.31802 4.31778 1.33325 7.99967 1.33325C11.6816 1.33325 14.6663 4.31802 14.6663 7.99992Z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                ></path>
            </g>
            <defs>
                <clipPath id="clip0_14411_8822">
                    <rect width="16" height="16" fill="white"></rect>
                </clipPath>
            </defs>
        </svg>
    );
};
