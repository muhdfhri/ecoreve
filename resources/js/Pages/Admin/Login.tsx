import React from "react";
import { SignInPage, Testimonial } from "@/Components/ui/sign-in";
import bannerFooter from "@/assets/banner-footer.webp";

const ecoReveTestimonials: Testimonial[] = [
  {
    avatarSrc: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    name: "Dr. Elena Rostova",
    handle: "@elena_watertech",
    text: "EcoReve's real-time COD monitoring and membrane bioreactors cut our industrial effluent chemical cost by 34%.",
  },
  {
    avatarSrc: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
    name: "David Chen",
    handle: "@david_engineering",
    text: "The telemetry integration and high-pressure butterfly valves operate with absolute zero downtime across 24/7 cycles.",
  },
  {
    avatarSrc: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    name: "Sarah Jenkins",
    handle: "@sarah_sustainability",
    text: "Seamless compliance reporting and high-efficiency aeration blowers. The ultimate partner for industrial water purity.",
  },
];

export default function Login() {
  const handleSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("Admin Sign In submitted:", data);
    
    // Redirect to Admin Dashboard
    window.location.href = "/admin";
  };

  const handleGoogleSignIn = () => {
    alert("Google SSO Authentication simulation. Redirecting to EcoReve Admin Dashboard...");
    window.location.href = "/admin";
  };

  const handleResetPassword = () => {
    alert("Password reset instructions have been dispatched to the administrator's email.");
  };

  const handleCreateAccount = () => {
    alert("To request administrator access, please submit an inquiry form or contact IT Support.");
  };

  return (
    <SignInPage
      title={
        <span className="font-extrabold tracking-tight text-foreground">
          EcoReve Admin <span className="text-[#005883] dark:text-[#008193]">Portal</span>
        </span>
      }
      description="Sign in with your administrator credentials to access real-time industrial telemetry, product catalogs, and inquiry management."
      heroImageSrc={bannerFooter}
      testimonials={ecoReveTestimonials}
      defaultEmail="admin@ecoreve.com"
      defaultPassword="password123"
      onSignIn={handleSignIn}
      onGoogleSignIn={handleGoogleSignIn}
      onResetPassword={handleResetPassword}
      onCreateAccount={handleCreateAccount}
    />
  );
}
