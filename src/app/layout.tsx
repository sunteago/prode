import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { cookies } from 'next/headers'
import SessionWrapper from '@/components/common/SessionWrapper/SessionWrapper'
import QueryProvider from '@/components/common/QueryProvider/QueryProvider'
import { LocaleProvider } from '@/locale'
import { DEFAULT_LOCALE, isSupportedLocale, LOCALE_COOKIE } from '@/locale/shared'
import '@/styles/globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Prode',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const cookieLocale = cookieStore.get(LOCALE_COOKIE)?.value
  const locale = isSupportedLocale(cookieLocale) ? cookieLocale : DEFAULT_LOCALE

  return (
    <html lang={locale} className={poppins.variable}>
      <body>
        <SessionWrapper>
          <QueryProvider>
            <LocaleProvider initialLocale={locale}>
              {children}
            </LocaleProvider>
          </QueryProvider>
        </SessionWrapper>
      </body>
    </html>
  )
}
