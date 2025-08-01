import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import ProjectMessageCard from './project-message-card';
import ProjectMessageForm from './project-message-form';
import { useEffect, useRef } from 'react';
import { Fragment } from '@/generated/prisma';
import ProjectMessageLoading from './project-message-loading';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';

interface Props {
  projectId: string;
  activeFragment: Fragment | null;
  setActiveFragment: (fragment: Fragment | null) => void;
}

const ProjectMessageContainer = ({
  projectId,
  activeFragment,
  setActiveFragment,
}: Props) => {
  const trpc = useTRPC();
  const bottomRef = useRef<HTMLDivElement>(null);
  const lastAssistantMessageIdRef = useRef<string | null>(null);
  const isMobile = useIsMobile();

  const { data: messages } = useSuspenseQuery(
    trpc.messages.getMany.queryOptions(
      {
        projectId: projectId,
      },
      {
        refetchInterval: 2000,
      },
    ),
  );

  useEffect(() => {
    const lastAssistantMessage = messages.findLast(
      (message) => message.role == 'ASSISTANT',
    );

    if (
      lastAssistantMessage?.fragment &&
      lastAssistantMessage.id !== lastAssistantMessageIdRef.current
    ) {
      if (!isMobile) {
        setActiveFragment(lastAssistantMessage.fragment);
      }
      lastAssistantMessageIdRef.current = lastAssistantMessage.id;
    }
  }, [messages, setActiveFragment, isMobile]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [messages.length]);

  const handleFragmentClick = (fragment: Fragment | null) => {
    if (isMobile) {
      if (fragment?.sandboxUrl) {
        window.open(fragment.sandboxUrl, '_blank');
      } else {
        toast.error('No preview available for this fragment.');
      }
    } else {
      setActiveFragment(fragment);
    }
  };

  const lastMessage = messages[messages.length - 1];
  const isLastMessageUser = lastMessage?.role === 'USER';

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="pt-2 pr-1">
          {messages.map((message) => (
            <ProjectMessageCard
              key={message.id}
              // projectId={projectId}
              content={message.content}
              role={message.role}
              fragment={message.fragment}
              createdAt={message.createdAt}
              isActiveFragment={activeFragment?.id === message.fragment?.id}
              onFragmentClick={() => handleFragmentClick(message.fragment)}
              type={message.type}
            />
          ))}
          {isLastMessageUser && <ProjectMessageLoading />}
          <div ref={bottomRef} />
        </div>
      </div>
      <div className="relative p-3 pt-1">
        <div className="to-background pointer-events-none absolute -top-6 right-0 left-0 h-6 bg-gradient-to-b from-transparent" />
        <ProjectMessageForm projectId={projectId} />
      </div>
    </div>
  );
};

export default ProjectMessageContainer;
