import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ArrowLeft, ArrowUpRight, Play, Search, X } from "lucide-react";
import { useState } from "react";

import heroDrone from "@/assets/hero-drone.jpg";
import cardCreator from "@/assets/card-creator.jpg";
import cardRealestate from "@/assets/card-realestate.jpg";
import cardPro from "@/assets/card-pro.jpg";
import expertImg from "@/assets/expert.jpg";
import bannerMoments from "@/assets/banner-moments.jpg";
import productVision from "@/assets/product-vision.png";
import productPulse from "@/assets/product-pulse.png";
import productNova from "@/assets/product-nova.png";
import productAtlas from "@/assets/product-atlas.png";
import whyPilot from "@/assets/why-pilot.jpg";
import whyCouple from "@/assets/why-couple.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BAWQ — Professional Drones For Every Flight Mission" },
      {
        name: "description",
        content:
          "Expert-picked professional drones for creators, real estate and industrial teams. Compare models, get 15-minute guidance and fly with confidence.",
      },
      { property: "og:title", content: "BAWQ — Professional Drones For Every Flight Mission" },
      {
        property: "og:description",
        content:
          "Expert-picked professional drones for creators, real estate and industrial teams. Fly with confidence.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const navLinks = ["Home", "Solutions", "Learn", "Reviews", "Support"];

const cards = [
  {
    img: cardCreator,
    tags: ["4K Video", "Smart Tracking", "Under 249g"],
    title: "Content Creators",
  },
  {
    img: cardRealestate,
    tags: ["High Resolution", "Reliable Flight"],
    title: "Business & Real Estate",
  },
  {
    img: cardPro,
    tags: ["Long Range Flight", "Advanced Sensors", "Pro Workflow"],
    title: "Professionals",
  },
];

const problems = [
  { n: "01", t: "Too Many Models, Too Little Clarity" },
  { n: "02", t: "Afraid of Buying the Wrong Drone" },
  { n: "03", t: "Hard to Understand Technical Specifications" },
  { n: "04", t: "Concerned About Warranty & Support" },
];

const products = [
  {
    img: productVision,
    name: "BAWQ Vision X",
    price: 799,
    wasPrice: 899,
    tags: ["4K Video", "Smart Tracking"],
    category: "Creators",
  },
  {
    img: productPulse,
    name: "BAWQ Pulse X",
    price: 899,
    wasPrice: 999,
    tags: ["Freestyle", "FPV Racing"],
    category: "FPV",
  },
  {
    img: productNova,
    name: "BAWQ Nova Pro",
    price: 1099,
    wasPrice: 1299,
    tags: ["Business", "Inspection"],
    category: "Business",
  },
  {
    img: productAtlas,
    name: "BAWQ Atlas",
    price: 1699,
    wasPrice: 1899,
    tags: ["Cinematic", "Long Range"],
    category: "Professional",
  },
];

const filters = ["Creators", "FPV", "Business", "Professional", "All Models"];

function Index() {
  const [activeFilter, setActiveFilter] = useState("All Models");
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-4">
          <div className="flex items-center gap-2 pr-2 text-base font-extrabold tracking-tight">
            <X className="h-4 w-4" strokeWidth={3} />
            BAWQ
          </div>
          <ul className="hidden items-center gap-1 rounded-full bg-secondary p-1 md:flex">
            {navLinks.map((l, i) => (
              <li key={l}>
                <a
                  href="#"
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    i === 0
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <div className="ml-auto hidden items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm text-muted-foreground lg:flex">
            <Search className="h-4 w-4" />
            Search
          </div>
          <a
            href="#"
            className="ml-auto flex items-center gap-2 rounded-full bg-primary py-2 pl-4 pr-2 text-sm font-semibold text-primary-foreground lg:ml-0"
          >
            Explore Models
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-5 pb-8 pt-6">
        <div className="relative overflow-hidden rounded-[2rem]">
          <img
            src={heroDrone}
            alt="Professional quadcopter drone flying above a forest canopy"
            width={1408}
            height={912}
            className="h-[520px] w-full object-cover md:h-[600px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center gap-6 p-8 md:p-12">
            <h1 className="max-w-xl text-4xl font-extrabold uppercase leading-[0.95] md:text-6xl">
              Professional
              <br />
              Drones <span className="text-muted-foreground">for every</span>
              <br />
              Flight Mission
            </h1>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              From first flight to advanced aerial work — find the right drone with clear guidance,
              honest specs and support that stays with you after the purchase.
            </p>
            <div>
              <a
                href="#"
                className="inline-flex items-center gap-3 rounded-full bg-primary py-2 pl-5 pr-2 text-sm font-semibold text-primary-foreground"
              >
                Find Your Drone
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Under hero row */}
        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[cardCreator, cardPro, expertImg].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  loading="lazy"
                  className="h-9 w-9 rounded-full border-2 border-background object-cover"
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Trusted by 5,000+</span> pilots
              worldwide
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:w-[420px]">
            <div className="rounded-2xl bg-card p-5">
              <p className="text-3xl font-extrabold">50+</p>
              <p className="mt-1 text-xs text-muted-foreground">Drone models compared</p>
            </div>
            <div className="rounded-2xl bg-accent p-5 text-accent-foreground">
              <p className="text-3xl font-extrabold">15min</p>
              <p className="mt-1 text-xs opacity-70">Free expert consultation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Built for every way of flying */}
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
          <div>
            <span className="inline-block rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              Ideal Profile
            </span>
            <h2 className="mt-5 text-4xl font-extrabold leading-[1.05]">
              Built for
              <br />
              Every Way
              <br />
              of Flying
            </h2>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Whether you are filming, surveying or inspecting, each profile gets a shortlist that
              matches the way you actually fly.
            </p>
            <div className="mt-6 flex gap-2">
              <button className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-secondary">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {cards.map((c) => (
              <article key={c.title} className="rounded-3xl bg-card p-3">
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={c.img}
                    alt={c.title}
                    width={700}
                    height={900}
                    loading="lazy"
                    className="h-[300px] w-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2">
                    {c.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-background/85 px-3 py-1 text-[11px] font-medium backdrop-blur"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between px-2 py-3">
                  <h3 className="text-sm font-semibold">{c.title}</h3>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Problems */}
      <section className="mx-auto max-w-7xl px-5 pb-24">
        <div className="rounded-[2rem] bg-secondary/60 p-6 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="inline-block rounded-full bg-background px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                Challenges
              </span>
              <h2 className="mt-5 max-w-xl text-3xl font-extrabold leading-[1.1] md:text-4xl">
                Choosing the Right Drone
                <br />
                Shouldn't Be Complicated
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Most buyers get lost between spec sheets and marketing claims. We remove the noise so
              the decision takes minutes, not weeks.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <ul className="space-y-3">
              {problems.map((p) => (
                <li
                  key={p.n}
                  className="relative flex items-center overflow-hidden rounded-2xl bg-card px-5 py-5"
                >
                  <span className="w-24 shrink-0 text-4xl font-extrabold text-secondary-foreground/15">
                    {p.n}
                  </span>
                  <span className="text-sm font-medium">{p.t}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-4">
              <div className="relative overflow-hidden rounded-3xl">
                <img
                  src={expertImg}
                  alt="Drone expert ready to advise before you buy"
                  width={1200}
                  height={750}
                  loading="lazy"
                  className="h-[300px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
                  <h3 className="max-w-[14ch] text-2xl font-extrabold leading-[1.05] text-primary-foreground">
                    Expert Guidance Before You Buy
                  </h3>
                  <div className="rounded-2xl bg-background/90 px-4 py-3 backdrop-blur">
                    <p className="text-lg font-extrabold">15min</p>
                    <p className="text-[11px] text-muted-foreground">Free call</p>
                  </div>
                </div>
                <span className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <Play className="h-4 w-4 fill-current" />
                </span>
              </div>
              <div className="flex flex-col gap-4 rounded-3xl bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                  Talk with a certified pilot, share your mission and get a shortlist of two or three
                  drones that genuinely fit.
                </p>
                <a
                  href="#"
                  className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground"
                >
                  Book a call
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banner — Extraordinary Moments */}
      <section className="mx-auto max-w-7xl px-5 pb-24">
        <div className="relative overflow-hidden rounded-[2rem]">
          <img
            src={bannerMoments}
            alt="Drone pilot looking up at a flying drone in a sunlit forest"
            width={1408}
            height={800}
            loading="lazy"
            className="h-[420px] w-full object-cover md:h-[520px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-8 text-center text-white">
            <span className="rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-black">
              A New Perspective
            </span>
            <h2 className="max-w-2xl text-4xl font-extrabold leading-[1.05] md:text-5xl">
              Extraordinary
              <br />
              Moments
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-white/80">
              Every flight is an opportunity to capture something extraordinary.
              See the world from above and tell stories that only a drone can reveal.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="mx-auto max-w-7xl px-5 pb-24">
        <div className="flex flex-col items-center text-center">
          <span className="inline-block rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            Popular Models
          </span>
          <h2 className="mt-5 max-w-md text-3xl font-extrabold leading-[1.1] md:text-4xl">
            Explore Our
            <br />
            Best-Selling Drones
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            From beginner-friendly models to advanced aerial systems, discover drones
            curated for creators, FPV pilots, businesses, and professionals.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeFilter === f
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <article key={p.name} className="rounded-3xl bg-card p-3">
              <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl bg-secondary">
                <img
                  src={p.img}
                  alt={p.name}
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="h-full w-full object-contain p-4"
                />
                <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-background/85 px-3 py-1 text-[11px] font-medium backdrop-blur"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between px-2 py-4">
                <div>
                  <h3 className="text-sm font-semibold">{p.name}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Price: <span className="line-through">${p.wasPrice}</span>{" "}
                    <span className="font-semibold text-foreground">${p.price}</span>
                  </p>
                </div>
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full ${
                    p.category === "FPV" ? "bg-accent text-accent-foreground" : "bg-secondary"
                  }`}
                >
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-secondary">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* Why BAWQ */}
      <section className="mx-auto max-w-7xl px-5 pb-24">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="inline-block rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              Why BAWQ
            </span>
            <h2 className="mt-5 max-w-md text-3xl font-extrabold leading-[1.1] md:text-4xl">
              More Than
              <br />
              a Drone Store
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            From choosing the right model to long-term support, we are here to make every step of
            your journey simple, reliable, and enjoyable.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Expert Guidance */}
          <div className="flex flex-col justify-between rounded-3xl bg-card p-6 md:min-h-[260px]">
            <div>
              <h3 className="text-xl font-semibold">Expert Guidance</h3>
              <p className="mt-3 max-w-[26ch] text-xs leading-relaxed text-muted-foreground">
                Choosing a drone does not have to be complicated. Our specialists help you compare
                models, understand technical differences, and recommend the right solution based on
                your goals — not just specifications.
              </p>
            </div>
            <span className="mt-4 inline-flex w-fit items-center rounded-full bg-primary px-3 py-1.5 text-[11px] font-semibold text-primary-foreground">
              Free Consultation Included
            </span>
          </div>

          {/* Pilot image */}
          <div className="relative overflow-hidden rounded-3xl md:min-h-[260px]">
            <img
              src={whyPilot}
              alt="Pilot controlling a drone outdoors"
              width={1024}
              height={1024}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Response time */}
          <div className="flex flex-col justify-between rounded-3xl bg-card p-6 md:min-h-[260px]">
            <h3 className="text-xl font-semibold">Average Response Time</h3>
            <div>
              <p className="text-4xl font-extrabold">15 min</p>
              <p className="mt-1 text-xs text-muted-foreground">Our team typically replies within minutes.</p>
            </div>
          </div>

          {/* Warranty */}
          <div className="flex flex-col justify-between rounded-3xl bg-card p-6 md:min-h-[260px]">
            <h3 className="text-xl font-semibold">Official Warranty</h3>
            <p className="text-4xl font-extrabold">
              2 Years
              <br />
              Coverage
            </p>
          </div>

          {/* Trust stats */}
          <div className="flex flex-col justify-between rounded-3xl bg-card p-6 md:min-h-[260px] lg:col-span-1">
            <p className="text-4xl font-extrabold">
              5,000+
              <br />
              <span className="text-2xl font-semibold text-muted-foreground">Pilots Trust BAWQ</span>
            </p>
            <p className="mt-4 max-w-[30ch] text-xs leading-relaxed text-muted-foreground">
              Creators, FPV pilots, businesses, and professionals choose BAWQ for trusted products
              and expert advice.
            </p>
          </div>

          {/* Couple image */}
          <div className="relative overflow-hidden rounded-3xl md:min-h-[260px]">
            <img
              src={whyCouple}
              alt="Two pilots sharing a drone flight experience"
              width={1024}
              height={1024}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-2 border-t border-border px-5 py-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} BAWQ Aerial Systems</p>
        <p>Professional drones, honest guidance.</p>
      </footer>
    </main>
  );
}
