import { useEffect, useState } from "react";

export const useHighlight = (container: string, elements: string[]) => {
  const [active, setActive] = useState("");

  useEffect(() => {
    const containerElement = document.querySelector(container);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -90% 0px",
      }
    );

    if (containerElement) {
      const children = containerElement.querySelectorAll(elements.join(","));
      for (let i = 0; i < children.length; i++) {
        observer.observe(children[i]);
      }
    }

    return () => {
      if (containerElement) {
        const children = containerElement.children;
        for (let i = 0; i < children.length; i++) {
          observer.unobserve(children[i]);
        }
      }
    };
  }, [container, elements]);

  return active;
};
