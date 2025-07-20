import * as React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ReduxWrapper from '@/components/redux/ReduxWrapper';
import '../globals.css';
import ClientToaster from '@/components/library/ClientToaster';
import MotionWrapper from '@/components/library/MotionWrapper';


export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const {locale} = params;

  if (!hasLocale(routing.locales, locale)) notFound();

  const messages = (await import(`@/../messages/${locale}.json`)).default;

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body>
        <GoogleOAuthProvider clientId="532924579171-ss8bvsv6s0q963rsojp79o33mk7d9d99.apps.googleusercontent.com">
        <ReduxWrapper>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <ClientToaster/>
          <Navbar />
            {children}
            <MotionWrapper>
              
            <Footer />
            </MotionWrapper>
          </NextIntlClientProvider>
        </ReduxWrapper>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
