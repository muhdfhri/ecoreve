import "../css/app.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { LanguageProvider } from "./i18n/LanguageContext";

const appName = import.meta.env.VITE_APP_NAME || "Ecoreve - Qingdao Topolar New Material Co.,Ltd.";

createInertiaApp({
  title: (title) => (title ? `${title} - ${appName}` : appName),
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.tsx`,
      import.meta.glob("./Pages/**/*.tsx")
    ),
  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(
      <LanguageProvider>
        <App {...props} />
      </LanguageProvider>
    );
  },
  progress: false,
});
