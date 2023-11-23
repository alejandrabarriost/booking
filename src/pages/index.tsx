import Link from "next/link";
import { Button } from "@booking/@components/ui/button";
import { sessionAtom } from "@booking/config/store";
import { withSession } from "@booking/config/utils";
import { useAtom } from "jotai";

export const getServerSideProps = withSession();

export default function Home() {
  const [session] = useAtom(sessionAtom);

  return (
    <div>
      <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-3xl mb-4">
        Booking System
      </h1>

      <div className="flex gap-5 mt-10">
        {!session && (
          <div>
            <Link href="/auth">
              <Button>Sing in</Button>
            </Link>
            <Link href="/auth">
              <Button variant="secondary">Sing up</Button>
            </Link>
          </div>
        )}
        {session && (
          <div>
            <Link href="/dashboard">
              <Button>Dashboard</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
