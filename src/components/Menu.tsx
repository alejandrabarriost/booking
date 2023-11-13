import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@booking/@components/ui/avatar";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@booking/@components/ui/menubar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@booking/@components/ui/tooltip";
import { sessionAtom, store } from "@booking/config/store";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";

export function Menu() {
  const router = useRouter();

  const [session] = useAtom(sessionAtom);

  const logout = async () => {
    await fetch("/api/logout");

    store.set(sessionAtom, undefined);

    router.push("/auth");
  };

  return (
    <div className="flex justify-between items-center">
      <Menubar className="rounded-none border-b border-none">
        <MenubarMenu>
          <MenubarTrigger
            style={{ marginLeft: "-15px" }}
            className="font-bold lg:text-xl tracking-tight cursor-pointer"
          >
            Booking.com
          </MenubarTrigger>
          <MenubarContent>
            {!session?.user && (
              <Link href="/auth">
                <MenubarItem className="cursor-pointer">Sign in</MenubarItem>
              </Link>
            )}
            {session?.user && (
              <Link href="/dashboard">
                <MenubarItem className="cursor-pointer">Dashboard</MenubarItem>
              </Link>
            )}
            <Link href="/">
              <MenubarItem className="cursor-pointer">Home</MenubarItem>
            </Link>
            <MenubarItem className="cursor-pointer">About Music</MenubarItem>
            <MenubarSeparator />
            <MenubarItem className="cursor-pointer">
              Preferences... <MenubarShortcut>⌘</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
          </MenubarContent>
        </MenubarMenu>
        {session?.user && (
          <MenubarMenu>
            <MenubarTrigger className="relative cursor-pointer">
              Actions
            </MenubarTrigger>
            <MenubarContent>
              <MenubarSub>
                <MenubarSubTrigger className="cursor-pointer">
                  New
                </MenubarSubTrigger>
                <MenubarSubContent className="w-[230px]">
                  <MenubarItem className="cursor-pointer">
                    Reserve <MenubarShortcut>⌘N</MenubarShortcut>
                  </MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarSeparator />
              <MenubarItem className="cursor-pointer" onClick={logout}>
                Log out <MenubarShortcut>⌘P</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        )}
      </Menubar>

      {session?.user && (
        <TooltipProvider>
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <Avatar className="mb-2 cursor-pointer">
                <AvatarFallback>
                  {session?.user?.username?.charAt(0)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <p className="scroll-m-20 text-sm font-bold tracking-tight">
                User:
              </p>{" "}
              {session?.user?.username} - {session?.user?.role}
              <p className="scroll-m-20 text-sm font-bold tracking-tight">
                UserId:{" "}
              </p>{" "}
              {session?.user?.id}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}
