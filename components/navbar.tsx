"use client";

import { Brain } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/utils/supabase";

export function Navbar() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to log out",
      });
    } else {
      toast({
        title: "Success",
        description: "Logged out successfully",
      });
      router.push("/login");
    }
  };

  const name = user?.user_metadata?.name || "User";
  const initials = name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase();

  return (
    <nav className="fixed top-0 w-full border-b bg-background/95 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60 z-50 transition-all duration-200">
      <div className="flex h-16 items-center justify-between w-full max-w-[2000px] mx-auto px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <Brain className="h-8 w-8" />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            MockMate
          </span>
        </Link>

        {user ? (
          <>
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/subjects"
                className="text-sm font-medium transition-colors hover:text-primary relative group"
              >
                Subjects
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform" />
              </Link>
              <Link
                href="/schedule"
                className="text-sm font-medium transition-colors hover:text-primary relative group"
              >
                Schedule
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform" />
              </Link>
              <Link
                href="/progress"
                className="text-sm font-medium transition-colors hover:text-primary relative group"
              >
                Progress
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform" />
              </Link>
              <Link
                href="/flashcards"
                className="text-sm font-medium transition-colors hover:text-primary relative group"
              >
                Flashcards
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform" />
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <ThemeToggle />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={user.user_metadata.avatar_url}
                        alt={name}
                      />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Sheet>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon" className="shrink-0">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[80vw] sm:w-[350px]">
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-4 mt-6">
                    <Link
                      href="/subjects"
                      className="text-sm font-medium transition-colors hover:text-primary"
                    >
                      Subjects
                    </Link>
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
                    <Button
                      variant="ghost"
                      className="justify-start p-0"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/login">
              <Button
                variant="ghost"
                className="hidden sm:inline-flex transition-colors hover:bg-primary/10"
              >
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="shadow-lg hover:shadow-primary/25 transition-all">
                Sign up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
