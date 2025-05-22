"use client"

import { Brain } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="container flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6 sm:h-8 sm:w-8" />
          <span className="text-lg sm:text-xl font-bold">MockMate</span>
        </div>
        
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          <Link href="/schedule" className="text-sm font-medium transition-colors hover:text-primary">Schedule</Link>
          <Link href="/progress" className="text-sm font-medium transition-colors hover:text-primary">Progress</Link>
          <Link href="/flashcards" className="text-sm font-medium transition-colors hover:text-primary">Flashcards</Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeToggle />
          <Avatar className="h-8 w-8 sm:h-9 sm:w-9">
            <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100" />
            <AvatarFallback>TH</AvatarFallback>
          </Avatar>
          
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9">
                <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(300px,_85vw)]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-6">
                <Link href="/schedule" className="text-sm font-medium transition-colors hover:text-primary">Schedule</Link>
                <Link href="/progress" className="text-sm font-medium transition-colors hover:text-primary">Progress</Link>
                <Link href="/flashcards" className="text-sm font-medium transition-colors hover:text-primary">Flashcards</Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}