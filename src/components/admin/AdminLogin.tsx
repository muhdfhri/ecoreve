import React from "react";
import { SignInPage, Testimonial } from "@/components/ui/sign-in";
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

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const handleSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onLoginSuccess();
  };

  const handleGoogleSignIn = () => {
    onLoginSuccess();
  };

  const handleResetPassword = () => {
    alert("Password reset instructions dispatched to IT administrator.");
  };

  const handleCreateAccount = () => {
    alert("To request administrator credentials, contact IT Support.");
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
};
