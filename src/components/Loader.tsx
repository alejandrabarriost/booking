import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { LucideLoader } from "lucide-react";

export default function Loader({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && setLoading(true);
    const handleComplete = (url: string) =>
      url === router.asPath && setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  if (!loading) {
    return <>{children}</>;
  }

  return (
    <div className="flex justify-center">
      <div className="flex gap-5 mt-36">
        Loading.... <LucideLoader />
      </div>
    </div>
  );
}
