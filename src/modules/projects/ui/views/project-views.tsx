'use client';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import ProjectMessageContainer from '../components/project-message-container';
import { Suspense, useState } from 'react';
import { Fragment } from '@/generated/prisma';
import ProjectHeader from '../components/project-header';
import ProjectFragmentWeb from '../components/project-fragment-web';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CodeIcon, CrownIcon, EyeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FileExplorer } from '@/components/file-explorer';
import { UserControl } from '@/components/user-control';
import { useAuth } from '@clerk/nextjs';
import { ErrorBoundary } from 'react-error-boundary';
import { useIsMobile } from '@/hooks/use-mobile';

interface Props {
  projectId: string;
}

export const ProjectView = ({ projectId }: Props) => {
  const { has } = useAuth();
  const hasProAccess = has?.({ plan: 'brixie_pro' });
  const [activeFragment, setActiveFragment] = useState<Fragment | null>(null);
  const [tabState, setTabState] = useState<'preview' | 'code'>('preview');
  const isMobile = useIsMobile();

  const header = (
    <ErrorBoundary fallback={<p>Project Header Error</p>}>
      <Suspense fallback={<p>Loading project...</p>}>
        <ProjectHeader projectId={projectId} />
      </Suspense>
    </ErrorBoundary>
  );

  const messageContainer = (
    <ErrorBoundary fallback={<p>Project Messages Error</p>}>
      <Suspense fallback={<p>Loading messages...</p>}>
        <ProjectMessageContainer
          projectId={projectId}
          activeFragment={activeFragment}
          setActiveFragment={setActiveFragment}
        />
      </Suspense>
    </ErrorBoundary>
  );

  const fragmentView = (
    <Tabs
      className="flex h-full w-full flex-col gap-y-0"
      defaultValue="preview"
      value={tabState}
      onValueChange={(value) => setTabState(value as 'preview' | 'code')}
    >
      <div className="flex w-full items-center gap-x-2 border-b p-2">
        <TabsList className="h-8 rounded-md border p-0">
          <TabsTrigger value="preview" className="rounded-md">
            <EyeIcon />
            <span>Demo</span>
          </TabsTrigger>
          <TabsTrigger value="code" className="rounded-md">
            <CodeIcon />
            <span>Code</span>
          </TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-x-2">
          {!hasProAccess && (
            <Button asChild size={'sm'} variant={'tertiary'}>
              <Link href={'/pricing'}>
                <CrownIcon /> Upgrade
              </Link>
            </Button>
          )}
          <UserControl />
        </div>
      </div>
      <TabsContent value="preview" className="flex-1">
        {!!activeFragment && <ProjectFragmentWeb data={activeFragment} />}
      </TabsContent>
      <TabsContent value="code" className="min-h-0 flex-1">
        {!!activeFragment?.files && (
          <FileExplorer
            files={activeFragment.files as { [path: string]: string }}
          />
        )}
      </TabsContent>
    </Tabs>
  );

  if (isMobile) {
    return (
      <div className="flex h-screen w-full flex-col">
        <div className="flex min-h-0 flex-1 flex-col">
          {header}
          {messageContainer}
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          defaultSize={35}
          minSize={20}
          className="flex min-h-0 flex-col"
        >
          {header}
          {messageContainer}
        </ResizablePanel>
        <ResizableHandle className="hover:bg-primary transition-colors" />
        <ResizablePanel defaultSize={65} minSize={50} className="flex flex-col">
          {fragmentView}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
