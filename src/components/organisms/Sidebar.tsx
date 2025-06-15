'use client'

import SidebarItem from '../molecules/sidebar/SidebarItem';
import Sidebarbrand from '../molecules/sidebar/Sidebarbrand';
import SidebarWrapper from '../templates/sidebar/SidebarWrapper';
import { useGlobalStore } from '@/store';

export default function Sidebar() {
  const { pages } = useGlobalStore();
  return (
    <SidebarWrapper>
      <div className="p-4 border-b border-primary-800">
        <Sidebarbrand icon="home" label="Dashboard" />
      </div>
      <nav className="p-4 space-y-2">
        {pages.map((item) => (
          <SidebarItem key={item.href} href={item.href} icon={item.icon} label={item.name} />
        ))}
      </nav>
    </SidebarWrapper>
  );
}