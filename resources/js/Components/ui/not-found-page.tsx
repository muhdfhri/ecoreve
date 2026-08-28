import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Frown } from "lucide-react";
import { Link } from "@inertiajs/react";
import { cn } from "@/lib/utils";

interface NotFoundPageProps {
  className?: string;
  homeHref?: string;
  title?: string;
  description?: string;
  helperText?: string;
  backLabel?: string;
  icon?: React.ReactNode;
  buttonClassName?: string;
}

export function NotFoundPage({
  className,
  homeHref = "/",
  title = "404",
  description = "Oops! Page not found",
  helperText = "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.",
  backLabel = "Back to Home",
  icon,
  buttonClassName,
}: NotFoundPageProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5 }}
      className={cn("flex min-h-[60svh] flex-col items-center justify-center space-y-6 text-center font-sans p-6", className)}
    >
      <motion.div
        animate={shouldReduceMotion ? { rotate: 0 } : { rotate: [0, 5, -5, 0] }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : {
                duration: 2,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
              }
        }
        className="inline-block"
      >
        {icon ?? <Frown className="mx-auto h-24 w-24 text-zinc-600 dark:text-zinc-400" />}
      </motion.div>
      <h1 className="font-bold text-4xl text-foreground tracking-tight">{title}</h1>
      <p className="text-muted-foreground text-xl font-medium">{description}</p>
      <p className="mx-auto max-w-md text-muted-foreground text-sm leading-relaxed">{helperText}</p>
      <Link
        href={homeHref}
        className={cn(
          "mt-4 inline-flex items-center gap-2 rounded-xl bg-zinc-900 dark:bg-white px-5 py-2.5 font-medium text-white dark:text-zinc-900 text-sm transition-all hover:bg-zinc-800 dark:hover:bg-zinc-100 shadow-sm active:scale-95 cursor-pointer",
          buttonClassName,
        )}
      >
        <ArrowLeft className="h-4 w-4" />
        <span>{backLabel}</span>
      </Link>
    </motion.div>
  );
}

export default NotFoundPage;
