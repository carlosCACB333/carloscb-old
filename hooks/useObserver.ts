import { useRef, useEffect, useMemo } from 'react';

export const useObserver = (loadMore: () => Promise<boolean>) => {
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting) {
          const hasMore = await loadMore();
          if (!hasMore) {
            observer.disconnect();
            moreRef.current?.remove();
          }
        }
      },
      { rootMargin: '0px 0px 100px 0px' }
    );

    if (moreRef.current) {
      observer.observe(moreRef.current);
    }
    return () => observer.disconnect();
  }, [loadMore]);

  return { moreRef };
};
