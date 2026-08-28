import React, { useEffect } from "react";
import { router, usePage } from "@inertiajs/react";
import { SignInPage } from "@/Components/ui/sign-in";
import { Toaster, toast } from "@/Components/ui/sonner";
import heroBannerImg from "@/assets/hero-banner.webp";

export default function Login() {
  const { errors } = usePage<any>().props;

  useEffect(() => {
    if (errors && (errors.email || errors.password)) {
      const msg = errors.email || errors.password;
      toast.error("Authentication Failed", {
        description: msg,
      });
    }
  }, [errors]);

  const handleSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = (formData.get("email") as string || "").trim();
    const password = (formData.get("password") as string || "").trim();
    const rememberMe = formData.get("rememberMe") === "on";

    // 1. Client-Side Required Field Validation Toast
    if (!email) {
      toast.error("Work Email or Username Required", {
        description: "Please enter your authorized work email address or username.",
      });
      return;
    }

    // 2. Client-Side Password Validation Toast
    if (!password) {
      toast.error("Password Required", {
        description: "Please enter your admin account password.",
      });
      return;
    }

    // 3. Submit to Laravel Backend & Handle Auth Errors via Sonner Toast
    router.post(
      "/admin/login-auth",
      { email, password, rememberMe },
      {
        onError: (errs) => {
          const msg =
            typeof errs.email === "string"
              ? errs.email
              : Array.isArray(errs.email)
              ? (errs.email as any)[0]
              : "These credentials do not match our admin records.";

          toast.error("Authentication Failed", {
            description: msg,
          });
        },
        onSuccess: (page) => {
          const errs = page.props?.errors as Record<string, any> | undefined;
          if (errs && (errs.email || errs.password)) {
            const msg = typeof errs.email === "string" ? errs.email : errs.email?.[0] || errs.password;
            toast.error("Authentication Failed", {
              description: msg,
            });
          }
        },
      }
    );
  };

  return (
    <>
      <SignInPage
        title={
          <span className="font-extrabold text-[#005883] tracking-tight">
            EcoReve<span className="text-foreground font-light"> Admin Portal</span>
          </span>
        }
        description="Enter your authorized admin credentials to access management tools"
        heroImageSrc={heroBannerImg}
        errors={errors}
        onSignIn={handleSignIn}
      />
      <Toaster position="bottom-right" richColors />
    </>
  );
}
