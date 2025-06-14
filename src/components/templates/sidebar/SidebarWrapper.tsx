
export default function SidebarWrapper({ children }: { children: React.ReactNode }) {
  return (
    // fixed top-0 left-0 z-10
    <aside className="w-64 bg-primary-900 border-r border-gray-200 h-screen ">
      {children}
    </aside>
  );
}
