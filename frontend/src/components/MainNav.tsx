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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";

const NAV_GROUPS = [
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

function DesktopMenuItem({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="block rounded px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-gray-900"
    >
      {children}
    </Link>
  );
}

function DesktopMenuGroup({ group }: { group: (typeof NAV_GROUPS)[0] }) {
  return (
    <Popover>
      <PopoverTrigger className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900 hover:underline">
        {group.title} <ChevronDown size={14} className="text-gray-500" />
      </PopoverTrigger>
      <PopoverContent
        className="w-[350px] p-3 bg-white border border-gray-200 shadow-lg rounded-md z-50"
        align="start"
        sideOffset={8}
      >
        <div className="space-y-1">
          {group.items.map((item) => (
            <DesktopMenuItem key={item.href} href={item.href}>
              {item.label}
            </DesktopMenuItem>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

// ——— MOBILE ———
function MobileMenuItem({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block py-2.5 text-base font-medium text-gray-900 transition hover:bg-gray-50 rounded-md px-2"
    >
      {children}
    </Link>
  );
}

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
    <div className="border-b border-gray-100 pb-5 last:border-0 last:pb-0">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">{title}</h3>
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

export default function MainNav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("admin_logged_in");
    if (token) setIsLoggedIn(true);
  }, []);

  // Tutup menu mobile setelah navigasi
  const handleMobileNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="w-full border-b border-gray-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center">
          <img src="/next.svg" alt="SecureRemote" className="h-8 w-auto" />
        </Link>

        <div className="hidden md:flex items-center gap-5">
          {NAV_GROUPS.map((group) => (
            <DesktopMenuGroup key={group.title} group={group} />
          ))}
          {isLoggedIn ? (
            <span className="text-sm font-medium text-gray-800">👤 Admin</span>
          ) : (
            <Link
              href="/login"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 hover:underline"
            >
              Login
            </Link>
          )}
        </div>

        <div className="md:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <MenuIcon className="h-5 w-5 text-gray-700" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="flex flex-col w-[300px] sm:w-[340px] p-0 bg-white border-r border-gray-200 shadow-xl"
            >
              {/* Header */}
              <SheetHeader className="p-5 pb-4 border-b border-gray-100">
                <SheetTitle className="text-lg font-bold text-gray-900">Menu</SheetTitle>
              </SheetHeader>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto max-h-[calc(100vh-140px)] p-5">
                <div className="flex flex-col gap-5">
                  {NAV_GROUPS.map((group) => (
                    <MobileSubmenu
                      key={group.title}
                      title={group.title}
                      items={group.items}
                      onItemClick={handleMobileNavClick}
                    />
                  ))}
                </div>
              </div>

              {/* Footer (Login/Admin) */}
              <div className="p-5 border-t border-gray-100">
                {isLoggedIn ? (
                  <span className="block text-sm font-medium text-gray-800">👤 Admin</span>
                ) : (
                  <Link
                    href="/login"
                    onClick={handleMobileNavClick}
                    className="inline-block w-full py-2 text-center text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md transition"
                  >
                    Login
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}