'use client';

import * as React from 'react';
import { useRef, useState, useEffect, useCallback } from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { motion } from 'motion/react';

import { cn } from '@/lib/utils';

const Tabs = TabsPrimitive.Root;

interface TabsListProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {}

const TabsList = React.forwardRef<React.ComponentRef<typeof TabsPrimitive.List>, TabsListProps>(
  ({ className, children, ...props }, ref) => {
    const listRef = useRef<HTMLDivElement>(null);
    const [indicator, setIndicator] = useState({ left: 0, width: 0 });
    const [ready, setReady] = useState(false);

    const updateIndicator = useCallback(() => {
      const list = listRef.current;
      if (!list) return;
      const active = list.querySelector('[data-state="active"]') as HTMLElement | null;
      if (!active) return;
      setIndicator({
        left: active.offsetLeft,
        width: active.offsetWidth,
      });
      setReady(true);
    }, []);

    useEffect(() => {
      updateIndicator();
      const list = listRef.current;
      if (!list) return;
      const observer = new MutationObserver(updateIndicator);
      observer.observe(list, { attributes: true, subtree: true, attributeFilter: ['data-state'] });
      return () => observer.disconnect();
    }, [updateIndicator]);

    return (
      <TabsPrimitive.List
        ref={(node) => {
          (listRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={cn(
          'relative inline-flex items-center gap-1 rounded-md bg-neutral-900 p-1 font-mono text-xs uppercase',
          className,
        )}
        {...props}
      >
        {ready && (
          <motion.div
            className="absolute top-1 bottom-1 rounded bg-neutral-800"
            animate={{ left: indicator.left, width: indicator.width }}
            transition={{ type: 'spring', duration: 0.4, bounce: 0.15 }}
          />
        )}
        {children}
      </TabsPrimitive.List>
    );
  },
);
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'text-muted-foreground data-[state=active]:text-foreground relative z-10 inline-flex items-center justify-center whitespace-nowrap rounded px-3 py-1.5 transition-colors duration-300 hover:text-foreground focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn('mt-8 focus-visible:outline-none', className)}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
