'use client';
import Image from 'next/image';
import Script from 'next/script';

const PixelTracker = () => {
    return (
        <>
            {/* Meta Pixel Script */}
            <Script
                id="meta-pixel"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        !function(f,b,e,v,n,t,s)
                        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                        n.queue=[];t=b.createElement(e);t.async=!0;
                        t.src=v;s=b.getElementsByTagName(e)[0];
                        s.parentNode.insertBefore(t,s)}(window, document,'script',
                        'https://connect.facebook.net/en_US/fbevents.js');
                        fbq('init', '1900603570343818');
                        fbq('track', 'PageView');
                    `,
                }}
            />

            {/* Fallback for no JS */}
            <noscript>
                <Image
                    height="1"
                    width="1"
                    style={{ display: 'none' }}
                    src="https://www.facebook.com/tr?id=1900603570343818&ev=PageView&noscript=1"
                    alt=""
                />
            </noscript>
        </>
    );
};

export default PixelTracker;
