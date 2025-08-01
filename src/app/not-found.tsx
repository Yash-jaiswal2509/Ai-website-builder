import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="bg-background relative flex h-screen w-full flex-col items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="from-primary/20 to-accent/20 absolute -top-1/2 -left-1/4 h-96 w-96 animate-pulse rounded-full bg-gradient-to-r blur-3xl"></div>
        <div className="from-secondary/20 to-primary/20 absolute -right-1/4 -bottom-1/2 h-96 w-96 animate-pulse rounded-full bg-gradient-to-r blur-3xl [animation-delay:1000ms]"></div>
        <div className="from-accent/15 to-secondary/15 absolute top-1/4 right-1/3 h-64 w-64 animate-bounce rounded-full bg-gradient-to-r blur-2xl [animation-delay:500ms]"></div>
      </div>

      <div className="pointer-events-none absolute inset-0">
        <div className="from-primary to-accent animate-float-1 absolute top-[30%] left-[20%] h-2 w-2 rounded-full bg-gradient-to-r opacity-30"></div>
        <div className="from-primary to-accent animate-float-2 absolute top-[40%] left-[35%] h-2 w-2 rounded-full bg-gradient-to-r opacity-30 [animation-delay:500ms]"></div>
        <div className="from-primary to-accent animate-float-3 absolute top-[50%] left-[50%] h-2 w-2 rounded-full bg-gradient-to-r opacity-30 [animation-delay:1000ms]"></div>
        <div className="from-primary to-accent animate-float-1 absolute top-[60%] left-[65%] h-2 w-2 rounded-full bg-gradient-to-r opacity-30 [animation-delay:1500ms]"></div>
        <div className="from-primary to-accent animate-float-2 absolute top-[70%] left-[80%] h-2 w-2 rounded-full bg-gradient-to-r opacity-30 [animation-delay:2000ms]"></div>
        <div className="from-primary to-accent animate-float-3 absolute top-[80%] left-[95%] h-2 w-2 rounded-full bg-gradient-to-r opacity-30 [animation-delay:2500ms]"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <div className="relative mb-8">
          <Image
            src="/logo.svg"
            alt="Brixie"
            width={60}
            height={60}
            className="mx-auto drop-shadow-lg"
          />
        </div>

        <div className="relative mb-6">
          <h1 className="from-primary via-secondary to-accent animate-bounce-slow bg-gradient-to-r bg-clip-text text-8xl font-black tracking-tighter text-transparent sm:text-9xl">
            404
          </h1>
          <div className="text-primary/10 absolute inset-0 -z-10 animate-pulse text-8xl font-black tracking-tighter sm:text-9xl">
            404
          </div>
        </div>

        <div className="mb-8 space-y-4">
          <h2 className="text-foreground text-2xl font-bold sm:text-3xl">
            Hi user, we have a problem!
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            The page you're looking for seems to have wandered off into the
            digital void.
          </p>
          <p className="text-muted-foreground/80">
            Don't worry, even the best explorers get lost sometimes.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            className="group from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground relative transform overflow-hidden bg-gradient-to-r px-8 py-3 text-lg font-semibold shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <Link href="/">
              <span className="relative z-10 flex items-center gap-2">
                <svg
                  className="h-5 w-5 transition-transform group-hover:-translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Go Back Home
              </span>
              <div className="from-secondary to-accent absolute inset-0 translate-x-full bg-gradient-to-r transition-transform duration-300 group-hover:translate-x-0"></div>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
