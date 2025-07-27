import ProjectForm from '@/modules/home/ui/components/project-form';
import Projectslist from '@/modules/home/ui/components/projects-list';
import Image from 'next/image';

const Page = () => {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col">
      <section className="space-y-6 py-[16vh] 2xl:py-48">
        <div className="flex flex-col items-center">
          <Image
            src="/logo.svg"
            alt="brixie"
            width={60}
            height={60}
            className="hidden md:block"
          />
        </div>
        <h1 className="text-center text-2xl font-bold md:text-5xl">
          Turn Your Ideas into Websites — Instantly
        </h1>
        <p className="text-muted-foreground text-center text-lg md:text-xl">
          Brixie turns natural language prompts into fully responsive websites
          using AI — no code, no hassle
        </p>
        <div className="mx-auto w-full max-w-3xl">
          <ProjectForm />
        </div>
      </section>
      <Projectslist />
    </div>
  );
};

export default Page;
