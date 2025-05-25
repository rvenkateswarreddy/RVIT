import { useEffect, useRef } from "react";

interface Props {
  onIntersect: () => void;
  enabled: boolean;
  rootMargin?: string;
}

export default function useIntersectionObserver({
  onIntersect,
  enabled,
  rootMargin = "0px",
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    if (!ref.current) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onIntersect();
        }
      },
      { rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [enabled, onIntersect, rootMargin]);
  return { ref };
}