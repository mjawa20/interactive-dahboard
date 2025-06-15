'use client';

import { Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <div className='flex items-center gap-3 bg-white space-y-3 p-3 shadow'>
      <button className='bg-white p-2 '>
        <Menu className='h-5 w-5' />
      </button>
      <div>
        <h1 className="text-xl font-semibold">Products</h1>
      </div>
    </div>
  );
}