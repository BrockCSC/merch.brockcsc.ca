import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';

import type { Route } from './+types/root';
import './app.css';
import Nav from './components/Nav/Nav';
import { OrderProvider } from './context/order-context';

export const links: Route.LinksFunction = () => [
  {
    rel: 'icon',
    href: '/assets/logo-black.svg',
    media: '(prefers-color-scheme: light)',
  },
  {
    rel: 'icon',
    href: '/assets/logo.svg',
    media: '(prefers-color-scheme: dark)',
  },
  { rel: 'apple-touch-icon', href: '/assets/logo-black.svg' },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap',
  },
];

export function meta({}: Route.MetaArgs) {
  const baseUrl = 'https://merch.brockcsc.ca';

  return [
    { title: 'BrockCSC Official Merch | Hoodies & Apparel' },
    {
      name: 'description',
      content: 'Shop official Brock Computer Science Club merchandise. Premium hoodies, apparel, and accessories for BrockU students. Free campus pickup available.',
    },
    { name: 'keywords', content: 'BrockCSC, Brock University, Computer Science Club, merchandise, hoodie, apparel, students, campus, St. Catharines' },
    { name: 'author', content: 'Brock Computer Science Club' },
    { name: 'robots', content: 'index, follow' },
    { name: 'language', content: 'English' },
    { name: 'revisit-after', content: '7 days' },

    // Open Graph / Facebook
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: baseUrl },
    { property: 'og:title', content: 'BrockCSC Official Merch | Hoodies & Apparel' },
    { property: 'og:description', content: 'Shop official Brock Computer Science Club merchandise. Premium hoodies, apparel, and accessories for BrockU students.' },
    { property: 'og:image', content: `${baseUrl}/merch/black-m.png` },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '1200' },
    { property: 'og:site_name', content: 'BrockCSC Merch' },
    { property: 'og:locale', content: 'en_CA' },

    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:url', content: baseUrl },
    { name: 'twitter:title', content: 'BrockCSC Official Merch | Hoodies & Apparel' },
    { name: 'twitter:description', content: 'Shop official Brock Computer Science Club merchandise. Premium hoodies, apparel, and accessories for BrockU students.' },
    { name: 'twitter:image', content: `${baseUrl}/merch/black-m.png` },

    // Additional SEO
    { name: 'theme-color', content: '#aa3b3b' },
    { name: 'msapplication-TileColor', content: '#aa3b3b' },
    { name: 'application-name', content: 'BrockCSC Merch' },
  ];
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#aa3b3b" />
        <meta name="msapplication-TileColor" content="#aa3b3b" />
        <meta name="application-name" content="BrockCSC Merch" />
        <Meta />
        <Links />
      </head>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (window.location.search.startsWith('?') && window.location.search.length > 1) {
                const path = window.location.search.slice(1).split('&')[0].replace(/~and~/g, '&');
                window.history.replaceState(null, '', '/' + path + window.location.hash);
              }
            `,
          }}
        />
        <OrderProvider>
          <Nav />
          <main className="mx-auto w-[75%] max-w-[1280px]">
            {children}
          </main>
        </OrderProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 9999,
          fontFamily: "'Lato', sans-serif",
          margin: 0,
          background: 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
        }}
      >
        <section
          style={{
            width: '100%',
            maxWidth: '32rem',
            backgroundColor: 'white',
            border: '1px solid #d1d5db',
            borderRadius: '0.75rem',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            padding: '3rem 2rem',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              marginBottom: '2rem',
              animation: 'fadeIn 1s ease-in',
              textAlign: 'center',
            }}
          >
            <a href="/">
              <img
                src="/assets/logo-black.svg"
                alt="Brock Computer Science Club Logo"
                style={{
                  width: '120px',
                  display: 'block',
                  margin: '0 auto',
                }}
              />
            </a>
          </div>

          <div>
            <h1
              style={{
                fontSize: '2rem',
                fontWeight: 700,
                color: '#111827',
                marginBottom: '1rem',
                animation: 'slideIn 1s ease-out 0.2s both',
              }}
            >
              404 - Page Not Found
            </h1>

            <p
              style={{
                fontSize: '1rem',
                color: '#6b7280',
                marginBottom: '2rem',
                animation: 'slideIn 1s ease-out 0.4s both',
              }}
            >
              The page you're looking for doesn't exist.
            </p>

            <a
              href="/"
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #aa3b3b 0%, #d9534f 100%)',
                color: 'white',
                padding: '0.75rem 2rem',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 14px rgba(170, 59, 59, 0.3)',
                animation: 'slideIn 1s ease-out 0.6s both',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow =
                  '0 6px 20px rgba(170, 59, 59, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow =
                  '0 4px 14px rgba(170, 59, 59, 0.3)';
              }}
            >
              Go Home
            </a>
          </div>
        </section>
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
