'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    clarity: any;
  }
}

export default function ClarityAnalytics() {
  useEffect(() => {
    // Only initialize Clarity on the client side
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID) {
      // Load Clarity script dynamically
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.innerHTML = `
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}");
      `;
      document.head.appendChild(script);
    }
  }, []);

  return null; // This component doesn't render anything
}
