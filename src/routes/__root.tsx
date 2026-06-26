import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet, Link, createRootRouteWithContext, useRouter, useLocation,
  HeadContent, Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-[#363092]">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-gray-500">The page you're looking for doesn't exist.</p>
        <Link to="/" className="mt-6 inline-flex rounded-md bg-[#363092] px-4 py-2 text-sm font-medium text-white">Go home</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root" }); }, [error]);
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">This page didn't load</h1>
        <button onClick={() => { router.invalidate(); reset(); }} className="mt-4 rounded-md bg-[#363092] px-4 py-2 text-sm text-white">Try again</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Sports & Youth Services Department — Government of Maharashtra" },
      { name: "description", content: "Official portal of the Sports & Youth Services Department, Government of Maharashtra." },
      { property: "og:title", content: "Sports & Youth Services Department — Government of Maharashtra" },
      { name: "twitter:title", content: "Sports & Youth Services Department — Government of Maharashtra" },
      { property: "og:description", content: "Official portal of the Sports & Youth Services Department, Government of Maharashtra." },
      { name: "twitter:description", content: "Official portal of the Sports & Youth Services Department, Government of Maharashtra." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2d99d383-2e2d-4c1c-ab4b-881562bf27d0/id-preview-7f88bad5--f1759080-177b-46b3-8014-3b58b541d05a.lovable.app-1782304673796.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2d99d383-2e2d-4c1c-ab4b-881562bf27d0/id-preview-7f88bad5--f1759080-177b-46b3-8014-3b58b541d05a.lovable.app-1782304673796.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        {/* Google Translate — hidden widget, triggered programmatically */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              function googleTranslateElementInit() {
                new google.translate.TranslateElement(
                  { pageLanguage: 'en', includedLanguages: 'mr,hi,en', autoDisplay: false },
                  'google_translate_element'
                );
              }
            `,
          }}
        />
        <script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" async />
        <style dangerouslySetInnerHTML={{ __html: `
          /* Hide Google Translate toolbar banner */
          .goog-te-banner-frame, .goog-te-gadget { display: none !important; }
          body { top: 0 !important; }
          .skiptranslate { display: none !important; }
        `}} />
      </head>
      <body>
        {/* Hidden Google Translate mount point */}
        <div id="google_translate_element" style={{ display: "none" }} />
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { pathname } = useLocation();
  const isAuthPage = pathname === "/login" || pathname.startsWith("/register");

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col bg-white">
        {!isAuthPage && <Header />}
        <main className="flex-1"><Outlet /></main>
        {!isAuthPage && <Footer />}
      </div>
    </QueryClientProvider>
  );
}
