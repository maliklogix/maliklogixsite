'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Settings, LogOut, ChevronRight, Mail, MessagesSquare, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/posts', label: 'Posts', icon: FileText, exact: false },
  { href: '/admin/partners', label: 'Partners', icon: Globe, exact: false },
  { href: '/admin/newsletter', label: 'Newsletter', icon: Mail, exact: false },
  { href: '/admin/contacts', label: 'Contacts', icon: MessagesSquare, exact: false },
  { href: '/admin/settings', label: 'Settings', icon: Settings, exact: false },
];

function AdminSidebar() {
  const pathname = usePathname();

  // Login page should not render admin sidebar chrome.
  if (pathname.startsWith('/admin/login')) return null;

  function logout() {
    document.cookie = 'ml_admin=; path=/; max-age=0';
    window.location.href = '/admin/login';
  }

  return (
    <aside className="hidden md:flex w-64 flex-col border-r border-[#E4E4EB] bg-white min-h-screen sticky top-0">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-[#E4E4EB]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0 bg-[#F0ECFF] border border-[#E4E4EB]">
            <Image
              src="/ml-logo.png?v=4"
              alt="MalikLogix"
              width={32}
              height={32}
              className="h-full w-full object-cover"
              priority
              unoptimized
            />
          </div>
          <div>
            <div className="font-heading text-sm font-extrabold text-[#0D0D12]">MalikLogix</div>
            <div className="text-[10px] text-[#6E6E82]">Admin Panel</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV.map(({ href, label, icon: Icon, exact }) => {
          const isActive = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className="relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all"
            >
              {isActive && (
                <motion.span
                  layoutId="adminSidebarActiveBg"
                  className="absolute inset-0 rounded-xl bg-[#F0ECFF] border border-[#5B3CF5]/20"
                />
              )}

              <Icon
                size={16}
                className={`relative flex-shrink-0 ${
                  isActive ? 'text-[#5B3CF5]' : 'text-[#6E6E82] group-hover:text-[#0D0D12]'
                }`}
              />
              <span
                className={`relative flex-1 ${
                  isActive ? 'text-[#5B3CF5] font-semibold' : 'text-[#6E6E82]'
                }`}
              >
                {label}
              </span>
              {isActive && <ChevronRight size={13} className="relative text-[#5B3CF5]" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-5 space-y-1">
        <div className="h-px bg-[#E4E4EB] mb-3" />
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs text-[#6E6E82] hover:text-[#0D0D12] hover:bg-[#F7F7FA] transition-all"
        >
          ← Back to site
        </Link>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs text-[#B42318] hover:bg-[#B42318]/10 hover:text-[#991B1B] transition-all"
        >
          <LogOut size={14} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginRoute = pathname.startsWith('/admin/login');

  if (isLoginRoute) {
    // Login should be a simple standalone page (no sidebar/dashboard chrome).
    return <div className="min-h-screen bg-[#F7F7FA] text-[#0D0D12]">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[#F7F7FA] text-[#0D0D12] flex">
      <AdminSidebar />
      <main className="flex-1 min-h-screen">{children}</main>
    </div>
  );
}
