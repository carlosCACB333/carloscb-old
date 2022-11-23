import { useEffect, useRef } from 'react';

export const useObserver = (loadMore: () => Promise<boolean>) => {
  const moreRef = useRef<HTMLDivElement>(null);
  const firtRender = useRef(true);

  useEffect(() => {
    if (firtRender.current) {
      firtRender.current = false;
      return;
    }
  }, []);

  useEffect(() => {
    if (!moreRef.current) return;

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
