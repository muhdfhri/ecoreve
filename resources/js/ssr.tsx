import React from "react";
import ReactDOMServer from "react-dom/server";
import { createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { LanguageProvider } from "./i18n/LanguageContext";

const appName = import.meta.env.VITE_APP_NAME || "EcoReve";

createServer((page) =>
  createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
      resolvePageComponent(
        `./Pages/${name}.tsx`,
        import.meta.glob("./Pages/**/*.tsx")
      ),
    setup: ({ App, props }) => (
      <LanguageProvider>
        <App {...props} />
      </LanguageProvider>
    ),
  })
);
