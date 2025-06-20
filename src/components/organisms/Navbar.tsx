import { Menu } from 'lucide-react';
import { useGlobalStore } from '@/store';

export default function Navbar() {
  const { activePage, setIsShowMobileSidebar, isShowMobileSidebar } = useGlobalStore();
  return (
    <div className='flex items-center gap-3 bg-white p-3 shadow'>
      <button className='bg-white p-2 cursor-pointer' onClick={() => { setIsShowMobileSidebar(!isShowMobileSidebar) }}>
        <Menu className='h-5 w-5' />
      </button>
      <h1 className="text-xl font-semibold">{activePage?.name}</h1>
    </div>
  );
}