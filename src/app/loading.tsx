import Image from 'next/image';

export default function Loading() {
  return (
    <div className="bg-background fixed inset-0 z-50 flex items-center justify-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="from-primary/10 to-accent/10 absolute -top-1/2 -left-1/4 h-96 w-96 animate-pulse rounded-full bg-gradient-to-r blur-3xl"></div>
        <div className="from-secondary/10 to-primary/10 absolute -right-1/4 -bottom-1/2 h-96 w-96 animate-pulse rounded-full bg-gradient-to-r blur-3xl [animation-delay:1500ms]"></div>
        <div className="from-accent/8 to-secondary/8 absolute top-1/3 left-1/3 h-64 w-64 animate-pulse rounded-full bg-gradient-to-r blur-2xl [animation-delay:750ms]"></div>
      </div>

      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0">
        <div className="bg-primary/40 animate-float-1 absolute top-[25%] left-[15%] h-1 w-1 rounded-full"></div>
        <div className="bg-accent/40 animate-float-2 absolute top-[35%] left-[85%] h-1 w-1 rounded-full [animation-delay:1000ms]"></div>
        <div className="bg-secondary/40 animate-float-3 absolute top-[75%] left-[25%] h-1 w-1 rounded-full [animation-delay:2000ms]"></div>
        <div className="bg-primary/40 animate-float-1 absolute top-[85%] left-[75%] h-1 w-1 rounded-full [animation-delay:3000ms]"></div>
      </div>

      {/* Main loading content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        {/* Logo with animated glow */}
        <div className="relative mb-8">
          <div className="from-primary to-accent animate-pulse-slow absolute inset-0 rounded-full bg-gradient-to-r opacity-40 blur-2xl"></div>
          <div className="animate-bounce-gentle">
            <Image
              src="/logo.svg"
              alt="Brixie"
              width={80}
              height={80}
              className="mx-auto drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Loading spinner */}
        <div className="relative mb-6">
          {/* Outer ring */}
          <div className="border-border/30 h-16 w-16 rounded-full border-4"></div>
          {/* Spinning gradient ring */}
          <div className="border-t-primary border-r-secondary absolute inset-0 h-16 w-16 animate-spin rounded-full border-4 border-transparent"></div>
          {/* Inner pulsing dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="from-primary to-accent h-2 w-2 animate-pulse rounded-full bg-gradient-to-r"></div>
          </div>
        </div>

        {/* Loading text with animated dots */}
        <div className="space-y-3">
          <h2 className="text-foreground text-2xl font-bold">Loading</h2>
          <div className="flex items-center justify-center space-x-1">
            <div className="bg-primary h-2 w-2 animate-bounce rounded-full [animation-delay:0ms]"></div>
            <div className="bg-secondary h-2 w-2 animate-bounce rounded-full [animation-delay:150ms]"></div>
            <div className="bg-accent h-2 w-2 animate-bounce rounded-full [animation-delay:300ms]"></div>
          </div>
          <p className="text-muted-foreground animate-fade-in-out text-sm">
            Please wait while we prepare your experience
          </p>
        </div>

        {/* Progress bar */}
        <div className="bg-border/50 mt-8 h-1 w-64 overflow-hidden rounded-full">
          <div className="from-primary via-secondary to-accent animate-progress-slide h-full bg-gradient-to-r"></div>
        </div>

        {/* Loading percentage or status (optional) */}
        <div className="text-muted-foreground/70 mt-4 animate-pulse text-xs">
          Initializing components...
        </div>
      </div>

      {/* Orbiting elements */}
      <div className="pointer-events-none absolute inset-0">
        {/* Large orbit */}
        <div className="border-border/20 animate-spin-slow absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border">
          <div className="bg-primary absolute -top-1 -left-1 h-2 w-2 rounded-full"></div>
        </div>

        {/* Medium orbit */}
        <div className="border-border/10 animate-spin-reverse absolute top-1/2 left-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full border">
          <div className="bg-accent absolute -top-0.5 -right-0.5 h-1 w-1 rounded-full"></div>
        </div>

        {/* Small orbit */}
        <div className="border-border/5 animate-spin-slow absolute top-1/2 left-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border">
          <div className="bg-secondary absolute -bottom-0.5 -left-0.5 h-1 w-1 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
