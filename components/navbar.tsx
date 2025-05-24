"use client";

import { Brain } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, LogOut, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
  const router = useRouter();
  const { user } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <nav className="fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="container flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Brain className="h-6 w-6 sm:h-8 sm:w-8" />
            <span className="text-lg sm:text-xl font-bold">MockMate</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          <Link
            href="/schedule"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Schedule
          </Link>
          <Link
            href="/progress"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Progress
          </Link>
          <Link
            href="/flashcards"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Flashcards
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-8 w-8 sm:h-9 sm:w-9 cursor-pointer">
                <AvatarFallback>
                  {user?.user_metadata.name?.charAt(0) || "?"}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>View Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/settings")}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 sm:h-9 sm:w-9"
              >
                <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(300px,_85vw)]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-6">
                <Link
                  href="/schedule"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Schedule
                </Link>
                <Link
                  href="/progress"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Progress
                </Link>
                <Link
                  href="/flashcards"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Flashcards
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
