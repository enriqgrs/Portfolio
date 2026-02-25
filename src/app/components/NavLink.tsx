"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
    isSpecial?: boolean;
}

export function NavLink({ href, children, isSpecial = false }: NavLinkProps) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={`nav-tab ${isActive ? "nav-tab-active" : "nav-tab-inactive"}`}
        >
            {children}
        </Link>
    );
}
