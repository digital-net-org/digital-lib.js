import React from 'react';
import Script from 'next/script';

export interface GoogleAnalyticsProps {
    googleAnalyticsId: string;
}

export default function GoogleAnalytics({ googleAnalyticsId }: GoogleAnalyticsProps) {
    return (
        <React.Fragment>
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag() {
                    dataLayer.push(arguments);
                }
                
                const consent = localStorage.getItem("ga_consent");
                if (consent !== null && consent === "true") {
                    gtag('consent', 'update', {
                        'ad_user_data': 'denied',
                        'ad_personalization': 'denied',
                        'ad_storage': 'denied',
                        'analytics_storage': 'granted',
                        'functionality_storage': 'denied',
                        'personalization_storage': 'denied',
                        'security_storage': 'denied',
                } else {
                    gtag('consent', 'default', {
                        'ad_user_data': 'denied',
                        'ad_personalization': 'denied',
                        'ad_storage': 'denied',
                        'analytics_storage': 'denied',
                        'functionality_storage': 'denied',
                        'personalization_storage': 'denied',
                        'security_storage': 'denied',
                    });
                }
                
                gtag('js', new Date());
                gtag('config', '${googleAnalyticsId}');
                `,
                }}
            />
        </React.Fragment>
    );
}
