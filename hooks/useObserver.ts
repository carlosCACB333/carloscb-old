import { useRef, useEffect, useMemo } from 'react';

export const useObserver = (loadMore: () => Promise<boolean>) => {
  const moreRef = useRef<HTMLDivElement>(null);

  const observer = useMemo(() => {
    return new IntersectionObserver(
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
  }, [loadMore]);

  useEffect(() => {
    if (moreRef.current) {
      observer.observe(moreRef.current);
    }
    return () => observer.disconnect();
  }, [observer]);

  return { moreRef };
};
