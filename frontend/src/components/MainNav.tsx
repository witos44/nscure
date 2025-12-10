"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";

// ——— Komponen MenuItem (digunakan di desktop & mobile) ———
function MenuItem({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="block rounded px-3 py-2 text-sm transition hover:bg-gray-100"
    >
      {children}
    </Link>
  );
}

// ——— Mobile Menu Item ———
function MobileMenuItem({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block py-2 text-base font-medium text-gray-900 hover:bg-gray-100 rounded"
    >
      {children}
    </Link>
  );
}

// ——— Mobile Submenu ———
function MobileSubmenu({
  title,
  items,
  onItemClick,
}: {
  title: string;
  items: { href: string; label: string }[];
  onItemClick?: () => void;
}) {
  return (
    <div className="border-b pb-4 last:border-0 last:pb-0">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">{title}</h3>
      <div className="space-y-1">
        {items.map((item) => (
          <MobileMenuItem key={item.href} href={item.href} onClick={onItemClick}>
            {item.label}
          </MobileMenuItem>
        ))}
      </div>
    </div>
  );
}

// ——— MainNav ———
export default function MainNav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("admin_logged_in");
    if (token) setIsLoggedIn(true);
  }, []);

  // Data navigasi — disusun agar mudah dipakai di mobile
  const navGroups = [
    {
      title: "Security Tools",
      items: [
        { href: "/vpn", label: "Best VPNs" },
        { href: "/password-managers", label: "Password Managers" },
        { href: "/antivirus", label: "Antivirus" },
        { href: "/secure-cloud", label: "Secure Cloud Storage" },
        { href: "/hardware-keys", label: "2FA Hardware Keys" },
        { href: "/secure-email", label: "Secure Email Providers" },
      ],
    },
    {
      title: "Work From Anywhere",
      items: [
        { href: "/remote-jobs", label: "Remote Job Boards" },
        { href: "/remote-tools", label: "Team Collaboration Tools" },
        { href: "/best-laptops", label: "Best Laptops for Remote Work" },
        { href: "/best-headsets", label: "Best Headsets & Webcams" },
      ],
    },
    {
      title: "Deals",
      items: [
        { href: "/deals/vpn", label: "VPN Deals" },
        { href: "/deals/software", label: "Software Discounts" },
        { href: "/deals/gear", label: "Remote Gear Deals" },
      ],
    },
    {
      title: "Guides",
      items: [
        { href: "/guides/cybersecurity-basics", label: "Cybersecurity Basics" },
        { href: "/guides/remote-work-starter", label: "Remote Work Starter Kit" },
        { href: "/guides/secure-setup", label: "Secure Remote Workspace" },
        { href: "/guides/privacy", label: "Privacy Essentials" },
      ],
    },
    {
      title: "Reviews",
      items: [
        { href: "/reviews/software", label: "Software Reviews" },
        { href: "/reviews/hardware", label: "Hardware Reviews" },
        { href: "/reviews/platforms", label: "Remote Job Platforms" },
      ],
    },
  ];

  return (
    <nav className="w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img src="/next.svg" alt="SecureRemote" className="h-8 w-auto" />
        </Link>

        {/* Desktop Navigation — hidden on mobile */}
        <div className="hidden md:flex items-center space-x-4">
          {navGroups.map((group) => (
            <DesktopMenuGroup key={group.title} group={group} />
          ))}

          {/* Login / Admin Status */}
          {isLoggedIn ? (
            <span className="text-sm font-medium">👤 Admin</span>
          ) : (
            <Link href="/login" className="text-sm font-medium hover:underline">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Trigger — only on small screens */}
        <div className="md:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[350px] p-4">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-6">
                {navGroups.map((group) => (
                  <MobileSubmenu
                    key={group.title}
                    title={group.title}
                    items={group.items}
                    onItemClick={() => setMobileMenuOpen(false)}
                  />
                ))}

                {/* Login / Admin di Mobile */}
                <div className="pt-4 border-t">
                  {isLoggedIn ? (
                    <span className="block text-sm font-medium">👤 Admin</span>
                  ) : (
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full text-left py-2 text-sm font-medium text-blue-600"
                    >
                      Login
                    </Link>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

// ——— Komponen Desktop Menu dengan Popover ———
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";

function DesktopMenuGroup({ group }: { group: { title: string; items: { href: string; label: string }[] } }) {
  return (
    <Popover>
      <PopoverTrigger className="flex items-center gap-1 text-sm font-medium hover:underline">
        {group.title} <ChevronDown size={14} />
      </PopoverTrigger>
      <PopoverContent className="w-[350px] p-4 bg-white" align="start">
        {group.items.map((item) => (
          <MenuItem key={item.href} href={item.href}>
            {item.label}
          </MenuItem>
        ))}
      </PopoverContent>
    </Popover>
  );
}