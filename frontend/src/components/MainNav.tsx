// src/app/layout.tsx atau MainNav.tsx — sesuaikan dengan strukturmu
"use client";

import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";

export default function MainNav() {
  return (
    <nav className="w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="text-xl font-semibold">
          Net Scure
        </Link>

        <div className="flex items-center space-x-4">
          {/* Security Tools */}
          <Popover>
            <PopoverTrigger className="flex items-center gap-1 text-sm font-medium hover:underline">
              Security Tools <ChevronDown size={14} />
            </PopoverTrigger>
            <PopoverContent className="w-[350px] p-4 bg-white" align="start">
              <MenuItem href="/vpn">Best VPNs</MenuItem>
              <MenuItem href="/password-managers">Password Managers</MenuItem>
              <MenuItem href="/antivirus">Antivirus</MenuItem>
              <MenuItem href="/secure-cloud">Secure Cloud Storage</MenuItem>
              <MenuItem href="/hardware-keys">2FA Hardware Keys</MenuItem>
              <MenuItem href="/secure-email">Secure Email Providers</MenuItem>
            </PopoverContent>
          </Popover>

          {/* Remote Work */}
          <Popover>
            <PopoverTrigger className="flex items-center gap-1 text-sm font-medium hover:underline">
              Work From Anywhere <ChevronDown size={14} />
            </PopoverTrigger>
            <PopoverContent className="w-[350px] p-4 bg-white" align="start">
              <MenuItem href="/remote-jobs">Remote Job Boards</MenuItem>
              <MenuItem href="/remote-tools">Team Collaboration Tools</MenuItem>
              <MenuItem href="/best-laptops">Best Laptops for Remote Work</MenuItem>
              <MenuItem href="/best-headsets">Best Headsets & Webcams</MenuItem>
            </PopoverContent>
          </Popover>

          {/* Deals */}
          <Popover>
            <PopoverTrigger className="flex items-center gap-1 text-sm font-medium hover:underline">
              Deals <ChevronDown size={14} />
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-4 bg-white" align="start">
              <MenuItem href="/deals/vpn">VPN Deals</MenuItem>
              <MenuItem href="/deals/software">Software Discounts</MenuItem>
              <MenuItem href="/deals/gear">Remote Gear Deals</MenuItem>
            </PopoverContent>
          </Popover>

          {/* Guides */}
          <Popover>
            <PopoverTrigger className="flex items-center gap-1 text-sm font-medium hover:underline">
              Guides <ChevronDown size={14} />
            </PopoverTrigger>
            <PopoverContent className="w-[350px] p-4 bg-white" align="start">
              <MenuItem href="/guides/cybersecurity-basics">Cybersecurity Basics</MenuItem>
              <MenuItem href="/guides/remote-work-starter">Remote Work Starter Kit</MenuItem>
              <MenuItem href="/guides/secure-setup">Secure Remote Workspace</MenuItem>
              <MenuItem href="/guides/privacy">Privacy Essentials</MenuItem>
            </PopoverContent>
          </Popover>

          {/* Reviews */}
          <Popover>
            <PopoverTrigger className="flex items-center gap-1 text-sm font-medium hover:underline">
              Reviews <ChevronDown size={14} />
            </PopoverTrigger>
            <PopoverContent className="w-[350px] p-4 bg-white" align="start">
              <MenuItem href="/reviews/software">Software Reviews</MenuItem>
              <MenuItem href="/reviews/hardware">Hardware Reviews</MenuItem>
              <MenuItem href="/reviews/platforms">Remote Job Platforms</MenuItem>
            </PopoverContent>
          </Popover>

          {/* === MENU LOGIN DITAMBAHKAN DI SINI === */}
          <Link href="/login" className="text-sm font-medium hover:underline">
            Login
          </Link>

          {/* ❌ HAPUS Resources dan Blog dari navbar */}
          {/* <Link href="/resources" className="text-sm font-medium hover:underline">
            Resources
          </Link>
          <Link href="/blog" className="text-sm font-medium hover:underline">
            Blog
          </Link> */}

        </div>
      </div>
    </nav>
  );
}

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