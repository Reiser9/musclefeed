import React from 'react';

export const Chat = ({ ...props }) => {
    return (
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M10 15.499L6.92474 18.6127C6.49579 19.047 6.28131 19.2642 6.09695 19.2795C5.93701 19.2928 5.78042 19.2285 5.67596 19.1067C5.55556 18.9662 5.55556 18.661 5.55556 18.0506V16.4906C5.55556 15.943 5.10707 15.5467 4.5652 15.4673V15.4673C3.25374 15.2752 2.22378 14.2453 2.03168 12.9338C2 12.7176 2 12.4595 2 11.9435V7.29902C2 5.61887 2 4.77879 2.32698 4.13705C2.6146 3.57257 3.07354 3.11362 3.63803 2.826C4.27976 2.49902 5.11984 2.49902 6.8 2.49902H14.2C15.8802 2.49902 16.7202 2.49902 17.362 2.826C17.9265 3.11362 18.3854 3.57257 18.673 4.13705C19 4.77879 19 5.61887 19 7.29902V11.499M19 22.499L16.8236 20.9859C16.5177 20.7732 16.3647 20.6669 16.1982 20.5915C16.0504 20.5245 15.8951 20.4758 15.7356 20.4464C15.5558 20.4133 15.3695 20.4133 14.9969 20.4133H13.2C12.0799 20.4133 11.5198 20.4133 11.092 20.1953C10.7157 20.0036 10.4097 19.6976 10.218 19.3213C10 18.8935 10 18.3334 10 17.2133V14.699C10 13.5789 10 13.0189 10.218 12.591C10.4097 12.2147 10.7157 11.9088 11.092 11.717C11.5198 11.499 12.0799 11.499 13.2 11.499H18.8C19.9201 11.499 20.4802 11.499 20.908 11.717C21.2843 11.9088 21.5903 12.2147 21.782 12.591C22 13.0189 22 13.5789 22 14.699V17.4133C22 18.3452 22 18.8111 21.8478 19.1787C21.6448 19.6687 21.2554 20.0581 20.7654 20.2611C20.3978 20.4133 19.9319 20.4133 19 20.4133V22.499Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
