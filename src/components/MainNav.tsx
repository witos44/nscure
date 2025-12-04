"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";

export default function MainNav() {
  return (
    <nav className="w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="text-xl font-semibold">
          SecureRemote
        </Link>

        <NavigationMenu>
          <NavigationMenuList className="space-x-4">

            {/* Security Tools */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Security Tools</NavigationMenuTrigger>
              <NavigationMenuContent className="grid w-[350px] gap-1 p-4">
                <MenuItem href="/vpn">Best VPNs</MenuItem>
                <MenuItem href="/password-managers">Password Managers</MenuItem>
                <MenuItem href="/antivirus">Antivirus</MenuItem>
                <MenuItem href="/secure-cloud">Secure Cloud Storage</MenuItem>
                <MenuItem href="/hardware-keys">2FA Hardware Keys</MenuItem>
                <MenuItem href="/secure-email">Secure Email Providers</MenuItem>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Remote Work */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Work From Anywhere</NavigationMenuTrigger>
              <NavigationMenuContent className="grid w-[350px] gap-1 p-4">
                <MenuItem href="/remote-jobs">Remote Job Boards</MenuItem>
                <MenuItem href="/remote-tools">Team Collaboration Tools</MenuItem>
                <MenuItem href="/best-laptops">Best Laptops for Remote Work</MenuItem>
                <MenuItem href="/best-headsets">Best Headsets & Webcams</MenuItem>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Deals */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Deals</NavigationMenuTrigger>
              <NavigationMenuContent className="grid w-[300px] gap-1 p-4">
                <MenuItem href="/deals/vpn">VPN Deals</MenuItem>
                <MenuItem href="/deals/software">Software Discounts</MenuItem>
                <MenuItem href="/deals/gear">Remote Gear Deals</MenuItem>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Guides */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Guides</NavigationMenuTrigger>
              <NavigationMenuContent className="grid w-[350px] gap-1 p-4">
                <MenuItem href="/guides/cybersecurity-basics">Cybersecurity Basics</MenuItem>
                <MenuItem href="/guides/remote-work-starter">Remote Work Starter Kit</MenuItem>
                <MenuItem href="/guides/secure-setup">Secure Remote Workspace</MenuItem>
                <MenuItem href="/guides/privacy">Privacy Essentials</MenuItem>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Reviews */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Reviews</NavigationMenuTrigger>
              <NavigationMenuContent className="grid w-[350px] gap-1 p-4">
                <MenuItem href="/reviews/software">Software Reviews</MenuItem>
                <MenuItem href="/reviews/hardware">Hardware Reviews</MenuItem>
                <MenuItem href="/reviews/platforms">Remote Job Platforms</MenuItem>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Regular Links */}
            <NavigationMenuItem>
              <Link href="/resources" className="px-2 py-1 text-sm">
                Resources
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/blog" className="px-2 py-1 text-sm">
                Blog
              </Link>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}

/* Small helper component */
function MenuItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="rounded-md px-3 py-2 text-sm transition hover:bg-gray-100"
    >
      {children}
    </Link>
  );
}
