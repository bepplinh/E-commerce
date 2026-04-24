import { useState, useEffect } from "react";

/**
 * Custom hook to safely handle Zustand persistent state in Next.js.
 * It prevents hydration mismatch by ensuring the store data is only
 * returned after the component has mounted on the client.
 */
export const useStore = <T, F>(
    store: (callback: (state: T) => unknown) => unknown,
    callback: (state: T) => F,
) => {
    const result = store(callback) as F;
    const [data, setData] = useState<F>();

    useEffect(() => {
        setData(result);
    }, [result]);

    return data;
};
