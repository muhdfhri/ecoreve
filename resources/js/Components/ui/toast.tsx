import { toast } from "sonner";

export { Toaster } from "./sonner";
export { toast };

export const toastManager = {
  success: (message: string, description?: string) => {
    toast.success(message, { description });
  },
  error: (message: string, description?: string) => {
    toast.error(message, { description });
  },
  info: (message: string, description?: string) => {
    toast.info(message, { description });
  },
  promise: <T,>(
    promise: Promise<T>,
    options: {
      loading: { title: string; description?: string };
      success: (data: T) => { title: string; description?: string };
      error: (err: any) => { title: string; description?: string };
    }
  ) => {
    toast.promise(promise, {
      loading: options.loading.title,
      success: (data) => {
        const res = options.success(data);
        return res.title + (res.description ? `: ${res.description}` : "");
      },
      error: (err) => {
        const res = options.error(err);
        return res.title + (res.description ? `: ${res.description}` : "");
      },
    });
  },
};
