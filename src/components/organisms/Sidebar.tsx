import { ArrowLeft } from 'lucide-react';
import { Button } from '../atoms/Button';
import SidebarItem from '../molecules/sidebar/SidebarItem';
import Sidebarbrand from '../molecules/sidebar/Sidebarbrand';
import SidebarWrapper from '../templates/sidebar/SidebarWrapper';
import { useGlobalStore } from '@/store';

export default function Sidebar() {
  const { pages, setIsShowMobileSidebar } = useGlobalStore();
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
      <nav className="p-4 space-y-2 absolute bottom-0 inset-x-0 border-t lg:hidden border-primary-800">
        <Button fullWidth={true} onClick={() => setIsShowMobileSidebar(false)} variant="outline" size="sm" className="w-full bg-transparent! text-white!"  >
          <ArrowLeft className="h-5 w-5 mr-2" />Sembunyikan Sidebar</Button>
      </nav>
    </SidebarWrapper>
  );
}