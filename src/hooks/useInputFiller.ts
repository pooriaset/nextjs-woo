import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

const useInputFiller = () => {
  const params = useSearchParams();
  const q = params.get("q") ?? "";

  const inputRef = useRef<HTMLInputElement>();
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = q;
    }
  }, [q]);
  return { inputRef, q };
};

export default useInputFiller;
