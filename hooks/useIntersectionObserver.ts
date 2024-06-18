import { useState, useEffect, useRef } from "react";

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

interface IntersectionObserverEntry {
  isIntersecting: boolean;
}

interface IntersectionObserver {
  observe: (target: Element) => void;
  unobserve: (target: Element) => void;
}

interface UseIntersectionObserverResult {
  ref: React.RefObject<Element>;
  isIntersecting: boolean;
}

const useIntersectionObserver = (
  options: IntersectionObserverOptions
): UseIntersectionObserverResult => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<Element | null>(null);

  useEffect(() => {
    const observer: IntersectionObserver = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      options
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return { ref, isIntersecting };
};

export default useIntersectionObserver;
