import { useEffect, useRef } from "react";

const useIntersectionObserver = ({
  onIntersect,
  root = null,
  rootMargin = "0px",
  threshold = 0.1,
  enabled = true,
}) => {
  const ref = useRef(null); // Ensure ref starts with null

  useEffect(() => {
    if (!enabled || !ref.current) return; // Ensure observer is not created without a valid ref

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onIntersect?.(entry);
          }
        });
      },
      { root, rootMargin, threshold }
    );

    const currentRef = ref.current;
    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [onIntersect, root, rootMargin, threshold, enabled]);

  return { ref };
};

export default useIntersectionObserver;
