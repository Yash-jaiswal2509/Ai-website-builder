'use client';

import { Button } from '@/components/ui/button';
import { useTRPC } from '@/trpc/client';
import { useUser } from '@clerk/nextjs';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Loading from '@/app/loading';

const Projectslist = () => {
  const trpc = useTRPC();
  const { user } = useUser();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const { data: projects } = useQuery(trpc.projects.getMany.queryOptions());

  const createProject = useMutation(
    trpc.projects.create.mutationOptions({
      onSuccess: (data) => {
        queryClient.invalidateQueries(trpc.projects.getMany.queryOptions());
        queryClient.invalidateQueries(trpc.usage.status.queryOptions());
        router.push(`/projects/${data.id}`);
      },
      onError: (error) => {
        toast.error(error.message);
        if (error.data?.code === 'TOO_MANY_REQUESTS') router.push('/pricing');
        setIsLoading(false);
      },
    }),
  );

  useEffect(() => {
    const pendingPrompt = localStorage.getItem('pending_prompt');
    if (pendingPrompt && user) {
      setIsLoading(true);
      createProject.mutate({ value: pendingPrompt });
      localStorage.removeItem('pending_prompt');
    }
  }, [user, createProject, router]);

  if (isLoading) {
    return <Loading />;
  }

  if (!user) return null;
  return (
    <div className="dark:bg-sidebar flex w-full flex-col gap-y-6 rounded-xl border bg-white p-8 sm:gap-y-4">
      <h2 className="text-2xl font-semibold">
        {user?.firstName}&apos;s projects
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {projects?.length == 0 && (
          <div className="col-span-full text-center">
            <p className="text-muted-foreground text-sm">No projects found</p>
          </div>
        )}
        {projects?.map((project) => (
          <Button
            key={project.id}
            variant={'outline'}
            className="h-auto w-full justify-start p-4 text-start font-normal"
            asChild
          >
            <Link href={`/projects/${project.id}`}>
              <div className="flex items-center gap-x-4">
                <Image
                  src={'/logo.svg'}
                  alt="brixie"
                  width={32}
                  height={32}
                  className="object-contain"
                />
                <div className="flex flex-col">
                  <h3 className="truncate font-medium">{project.name}</h3>
                  <p className="text-muted-foreground text-sm">
                    {formatDistanceToNow(project.updatedAt, {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Projectslist;
