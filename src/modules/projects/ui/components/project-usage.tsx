import { Button } from '@/components/ui/button';
import { useAuth } from '@clerk/nextjs';
import { formatDuration, intervalToDuration } from 'date-fns';
import { CrownIcon } from 'lucide-react';
import Link from 'next/link';

interface Props {
  points: number;
  msBeforeNext: number;
}

// msBeforeNext - milliseconds before next
export const ProjectUsage = ({ points, msBeforeNext }: Props) => {
  const { has } = useAuth();
  const hasProAccess = has?.({ plan: 'brixie_pro' });
  return (
    <div className="bg-background rounded-t-xl border border-b-0 p-2.5">
      <div className="flex items-center gap-x-2">
        <div>
          <p className="text-sm">{points} credits remaining</p>
          <p className="text-muted-foreground text-xs">
            Resets in{' '}
            {formatDuration(
              intervalToDuration({
                start: new Date(),
                end: new Date(Date.now() + msBeforeNext),
              }),
              { format: ['months', 'days', 'hours'] },
            )}
          </p>
        </div>
        {!hasProAccess && (
          <Button asChild size={'sm'} variant={'tertiary'} className="ml-auto">
            <Link href={'/pricing'}>
              <CrownIcon /> Upgrade
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};
