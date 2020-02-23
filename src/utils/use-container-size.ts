import {
  useLayoutEffect,
  useState,
  RefObject,
  useEffect,
  useCallback
} from "react";
import throttle from "lodash/throttle";

function useContainerSize(ref: RefObject<HTMLElement>) {
  const [dimensions, setDimensions] = useState<
    Pick<DOMRect, "width" | "height">
  >({
    width: 0,
    height: 0
  });

  const measure = useCallback(
    throttle(() => {
      if (ref.current) {
        setDimensions(ref.current.getBoundingClientRect());
      }
    }, 200),
    [ref]
  );

  useEffect(() => {
    window.addEventListener("resize", measure);

    return () => {
      window.removeEventListener("resize", measure);
    };
  }, [ref]);

  useLayoutEffect(() => {
    measure();
  }, [ref]);

  return dimensions;
}

export default useContainerSize;
