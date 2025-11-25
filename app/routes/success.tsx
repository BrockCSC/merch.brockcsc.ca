import type { Route } from './+types/success';
import { Link } from 'react-router';

export function meta({}: Route.MetaArgs) {
  const baseUrl = 'https://merch.brockcsc.ca';

  return [
    { title: 'Order Confirmed | BrockCSC Merch' },
    {
      name: 'description',
      content:
        'Your BrockCSC merchandise order has been successfully placed. Check your email for confirmation details. Free campus pickup available.',
    },
    {
      name: 'keywords',
      content:
        'order confirmation, BrockCSC, merchandise, order success, Brock University, student merchandise',
    },
    { name: 'robots', content: 'noindex, nofollow' }, // Don't index success pages
    { rel: 'canonical', href: `${baseUrl}/success` },

    // Open Graph
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `${baseUrl}/success` },
    { property: 'og:title', content: 'Order Confirmed | BrockCSC Merch' },
    {
      property: 'og:description',
      content: 'Your BrockCSC merchandise order has been successfully placed.',
    },
  ];
}

export default function Success() {
  return (
    <>
      {/* Breadcrumb structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: window.location.origin,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Checkout',
                item: window.location.origin + '/checkout',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Order Success',
                item: window.location.href,
              },
            ],
          }),
        }}
      />

      <main className="min-h-screen bg-neutral-100 flex items-center justify-center px-4 w-[100vw] ml-[calc(50%-50vw)] mr-[calc(50%-50vw)]">
        <section className="w-full max-w-2xl rounded-lg bg-white border border-neutral-200 shadow-sm py-10 px-6">
          <div className="flex flex-col items-center">
            {/* Logo */}
            <div className="mb-6">
              <a href="https://brockcsc.ca">
                <img
                  width={120}
                  src={'./assets/logo-black.svg'}
                  alt="Brock Computer Science Club Logo"
                />
              </a>
            </div>

            {/* Content */}
            <div className="w-full max-w-lg text-left">
              <h1 className="text-xl font-extrabold text-neutral-900 leading-snug mb-2">
                Your order has been confirmed!
              </h1>

              <p className="text-sm text-neutral-700 mt-1">
                You&apos;ll receive an email confirmation shortly from from
                admin@brockcsc.ca.
              </p>

              <hr className="my-6 border-neutral-200" />

              <h2 className="text-sm font-semibold text-neutral-900 mb-1">
                Need help?
              </h2>

              <p className="text-sm text-neutral-700">
                If you have any questions, contact us at{' '}
                <a
                  href={`mailto: admin@brockcsc.ca`}
                  className="text-blue-600 underline"
                >
                  admin@brockcsc.ca
                </a>{' '}
                or reach out to an executive through Discord.
              </p>

              {/* Button */}
              <div className="mt-8">
                <Link
                  to="/"
                  className="inline-flex items-center rounded-md bg-black px-4 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
