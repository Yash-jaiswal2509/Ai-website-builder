"use client";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const Page = () => {
  const trpc = useTRPC();
  const invoke = useMutation(trpc.invoke.mutationOptions({
    onSuccess: () => {
      toast.success("Background Job Starts")
    }
  }));


  return (
    <div className="p-4 max-w-7xl mx-auto">
      <Button disabled={invoke.isPending} onClick={() => invoke.mutate({
        text: "Yash"
      })} className="cursor-pointer">
        Invoke Background Job
      </Button>
    </div>
  )
}

export default Page;

// 34 minutes
// 1 hour 10 minutes