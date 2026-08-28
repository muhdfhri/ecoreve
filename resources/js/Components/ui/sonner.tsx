import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast:
            "group toast font-sans text-xs p-4 rounded-2xl shadow-xl border-2 transition-all font-medium flex items-center gap-3 bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100",
          description: "text-zinc-500 dark:text-zinc-400 text-xs mt-0.5 font-normal",
          actionButton: "bg-[#005883] text-white font-bold rounded-xl text-xs",
          cancelButton: "bg-zinc-100 text-zinc-500 text-xs",
          success:
            "!border-emerald-500 !bg-emerald-50/90 dark:!bg-emerald-950/80 !text-emerald-950 dark:!text-emerald-100 [&_svg]:!text-emerald-600 dark:[&_svg]:!text-emerald-400 font-bold shadow-emerald-500/10",
          error:
            "!border-rose-500 !bg-rose-50/90 dark:!bg-rose-950/80 !text-rose-950 dark:!text-rose-100 [&_svg]:!text-rose-600 dark:[&_svg]:!text-rose-400 font-bold shadow-rose-500/10",
          info:
            "!border-[#005883] !bg-sky-50/90 dark:!bg-sky-950/80 !text-sky-950 dark:!text-sky-100 [&_svg]:!text-[#005883] font-bold shadow-sky-500/10",
          warning:
            "!border-amber-500 !bg-amber-50/90 dark:!bg-amber-950/80 !text-amber-950 dark:!text-amber-100 [&_svg]:!text-amber-600 font-bold shadow-amber-500/10",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
