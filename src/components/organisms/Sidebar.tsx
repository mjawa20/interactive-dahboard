'use client';

import SidebarItem from '../molecules/sidebar/SidebarItem';
import Link from 'next/link';
import { IconName } from 'lucide-react/dynamic';
import { DynamicIcon } from 'lucide-react/dynamic';
import Sidebarbrand from '../molecules/sidebar/Sidebarbrand';
import SidebarWrapper from '../templates/sidebar/SidebarWrapper';

type NavItem = {
  label: string;
  href: string;
  icon: IconName;
};

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/', icon: 'layout-dashboard' },
  { label: 'Products', href: '/products', icon: 'shopping-cart' },
  { label: 'Recipes', href: '/recipes', icon: 'utensils' },
  { label: 'Carts', href: '/carts', icon: 'shopping-cart' },
  { label: 'Posts', href: '/posts', icon: 'file-text' },
];

export default function Sidebar() {
  return (
    <SidebarWrapper>
      <div className="p-4 border-b border-primary-800">
        <Sidebarbrand icon="home" label="Dashboard" />
      </div>
      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <SidebarItem key={item.href} href={item.href} icon={item.icon} label={item.label} />
        ))}
      </nav>
    </SidebarWrapper>
  );
}