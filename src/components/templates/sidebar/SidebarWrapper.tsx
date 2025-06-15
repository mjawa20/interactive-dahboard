
export default function SidebarWrapper({ children }: { children: React.ReactNode }) {
  return (
    <aside className="min-w-64 bg-primary-900 border-r border-gray-200 h-screen hidden sm:block fixed top-0 left-0 z-10 sm:static sm:z-auto">
      {children}
    </aside>
  );
}
