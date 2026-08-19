'use client';

import { Switch } from '@base-ui-components/react/switch';
import { useFilter } from '@/components/feed-filter';

// deliberately faint — the photo feed is an easter egg, not a headline feature
export default function PhotosSwitch() {
  const { photosVisible, setPhotosVisible } = useFilter();

  return (
    <Switch.Root
      checked={photosVisible}
      onCheckedChange={setPhotosVisible}
      aria-label="Show photos"
      className="text-muted-foreground data-[checked]:opacity-45 -m-1.5 cursor-pointer p-1.5 opacity-[0.14] transition-opacity duration-500 ease-out outline-none hover:opacity-60 focus-visible:opacity-60"
    >
      <span className="flex h-[10px] w-[20px] items-center rounded-full border border-current px-[2px]">
        <Switch.Thumb className="block size-[4px] rounded-full bg-current transition-transform duration-300 ease-out data-[checked]:translate-x-[10px]" />
      </span>
    </Switch.Root>
  );
}
