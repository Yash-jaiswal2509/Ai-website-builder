'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTRPC } from '@/trpc/client';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

const Page = () => {
  const [value, setValue] = useState('');

  const trpc = useTRPC();
  const invoke = useMutation(
    trpc.invoke.mutationOptions({
      onSuccess: () => {
        toast.success('Background Job Starts');
      },
    }),
  );

  return (
    <div className="mx-auto max-w-7xl p-4">
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <Button
        disabled={invoke.isPending}
        onClick={() =>
          invoke.mutate({
            value: value,
          })
        }
        className="cursor-pointer"
      >
        Invoke Background Job
      </Button>
    </div>
  );
};

export default Page;

// 34 minutes
// 1 hour 10 minutes
// 1 hour 53 minutes
