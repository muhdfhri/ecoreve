/// <reference types="vite/client" />

declare module "@inertiajs/react" {
  import React from "react";

  export interface PageProps {
    [key: string]: any;
  }

  export function createInertiaApp(options: {
    id?: string;
    title?: (title: string) => string;
    resolve: (name: string) => any;
    setup: (options: { el: HTMLElement; App: any; props: any }) => any;
    progress?: false | { delay?: number; color?: string; includeCSS?: boolean; showSpinner?: boolean };
    page?: any;
    render?: any;
  }): Promise<any>;

  export const router: {
    visit: (url: string, options?: any) => void;
    get: (url: string, data?: any, options?: any) => void;
    post: (url: string, data?: any, options?: any) => void;
    put: (url: string, data?: any, options?: any) => void;
    patch: (url: string, data?: any, options?: any) => void;
    delete: (url: string, options?: any) => void;
    reload: (options?: any) => void;
  };

  export const usePage: <T extends PageProps = PageProps>() => {
    props: T;
    url: string;
    component: string;
    version: string | null;
  };

  export const Head: React.FC<{ title?: string; children?: React.ReactNode }>;
  export const Link: React.FC<any>;
}

declare module "@inertiajs/react/server" {
  export default function createServer(
    callback: (page: any) => any,
    port?: number
  ): void;
}

declare module "laravel-vite-plugin/inertia-helpers" {
  export function resolvePageComponent<T>(
    path: string | string[],
    pages: Record<string, () => Promise<T>>
  ): Promise<T>;
}
