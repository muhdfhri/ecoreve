import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

// --- HELPER COMPONENTS (ICONS) ---

const GoogleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s12-5.373 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-2.641-.21-5.236-.611-7.743z" />
        <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.022 35.026 44 30.038 44 24c0-2.641-.21-5.236-.611-7.743z" />
    </svg>
);

// --- TYPE DEFINITIONS ---

export interface Testimonial {
  avatarSrc: string;
  name: string;
  handle: string;
  text: string;
}

interface SignInPageProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  heroImageSrc?: string;
  testimonials?: Testimonial[];
  defaultEmail?: string;
  defaultPassword?: string;
  errors?: Record<string, string>;
  onSignIn?: (event: React.FormEvent<HTMLFormElement>) => void;
  onGoogleSignIn?: () => void;
  onResetPassword?: () => void;
  onCreateAccount?: () => void;
}

// --- SUB-COMPONENTS ---

const GlassInputWrapper = ({ children, hasError }: { children: React.ReactNode; hasError?: boolean }) => (
  <div
    className={`rounded-2xl border backdrop-blur-sm transition-colors focus-within:border-[#005883] focus-within:bg-[#005883]/5 ${
      hasError
        ? "border-rose-500 bg-rose-500/5 dark:bg-rose-950/20"
        : "border-border bg-foreground/5"
    }`}
  >
    {children}
  </div>
);

const TestimonialCard = ({ testimonial, delay }: { testimonial: Testimonial, delay: string }) => (
  <div className={`animate-testimonial ${delay} flex items-start gap-3 rounded-3xl bg-card/60 dark:bg-zinc-900/60 backdrop-blur-xl border border-white/20 dark:border-white/10 p-5 w-64 shadow-lg`}>
    <img src={testimonial.avatarSrc} className="h-10 w-10 object-cover rounded-2xl border border-white/20" alt="avatar" />
    <div className="text-sm leading-snug">
      <p className="flex items-center gap-1 font-semibold text-foreground">{testimonial.name}</p>
      <p className="text-xs text-muted-foreground">{testimonial.handle}</p>
      <p className="mt-1 text-xs text-foreground/80 font-normal">{testimonial.text}</p>
    </div>
  </div>
);

// --- MAIN COMPONENT ---

export const SignInPage: React.FC<SignInPageProps> = ({
  title = <span className="font-light text-foreground tracking-tighter">Welcome</span>,
  description = "Access your account and continue your journey with us",
  heroImageSrc,
  testimonials = [],
  defaultEmail = "",
  defaultPassword = "",
  errors = {},
  onSignIn,
  onGoogleSignIn,
  onResetPassword,
  onCreateAccount,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState(defaultPassword);

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans w-full bg-white dark:bg-zinc-950 overflow-hidden">
      {/* Left column: sign-in form */}
      <section className="flex-1 flex items-center justify-center p-6 sm:p-12 relative z-10">
        <div className="w-full max-w-md">
          <div className="flex flex-col gap-6">
            <h1 className="animate-element animate-delay-100 text-3xl sm:text-4xl font-bold leading-tight tracking-tight text-foreground">{title}</h1>
            <p className="animate-element animate-delay-200 text-sm text-muted-foreground">{description}</p>

            <form noValidate className="space-y-4 sm:space-y-5" onSubmit={onSignIn}>
              <div className="animate-element animate-delay-300">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Work Email</label>
                <GlassInputWrapper hasError={!!errors.email}>
                  <input
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-transparent text-sm p-3.5 sm:p-4 rounded-2xl focus:outline-none text-foreground font-medium"
                    required
                  />
                </GlassInputWrapper>
                {errors.email && (
                  <p className="text-xs font-semibold text-rose-500 dark:text-rose-400 mt-1.5 animate-fade-in flex items-center gap-1">
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              <div className="animate-element animate-delay-400">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Password</label>
                <GlassInputWrapper hasError={!!errors.password}>
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full bg-transparent text-sm p-3.5 sm:p-4 pr-12 rounded-2xl focus:outline-none text-foreground font-medium"
                      required
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-3.5 flex items-center cursor-pointer">
                      {showPassword ? <EyeOff className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" /> : <Eye className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />}
                    </button>
                  </div>
                </GlassInputWrapper>
                {errors.password && (
                  <p className="text-xs font-semibold text-rose-500 dark:text-rose-400 mt-1.5 animate-fade-in flex items-center gap-1">
                    <span>{errors.password}</span>
                  </p>
                )}
              </div>

              <div className="animate-element animate-delay-500 flex items-center justify-between text-xs sm:text-sm">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input type="checkbox" name="rememberMe" defaultChecked className="rounded border-border text-[#005883] focus:ring-[#005883] cursor-pointer" />
                  <span className="text-foreground/90 font-medium">Keep me signed in</span>
                </label>
                <a href="#" onClick={(e) => { e.preventDefault(); onResetPassword?.(); }} className="hover:underline text-[#005883] dark:text-[#008193] font-semibold transition-colors">Reset password</a>
              </div>

              <button type="submit" className="animate-element animate-delay-600 w-full rounded-2xl bg-[#005883] hover:bg-[#003853] py-3.5 sm:py-4 font-bold text-white shadow-md hover:shadow-lg transition-all cursor-pointer">
                Sign In to Dashboard
              </button>
            </form>

            <p className="animate-element animate-delay-700 text-center text-xs text-muted-foreground pt-2">
              New to EcoReve platform? <a href="#" onClick={(e) => { e.preventDefault(); onCreateAccount?.(); }} className="text-[#005883] dark:text-[#008193] font-bold hover:underline transition-colors">Request Access</a>
            </p>
          </div>
        </div>
      </section>

      {/* Right column: hero image container with Option 3 rounded-2xl border */}
      {heroImageSrc && (
        <section className="hidden md:block flex-1 p-4 lg:p-6">
          <div className="w-full h-full rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800">
            <img
              src={heroImageSrc}
              alt="EcoReve Hero Banner"
              className="w-full h-full object-cover"
            />
          </div>
        </section>
      )}
    </div>
  );
};
