import Link from "next/link";
import { DynamicIcon, IconName } from 'lucide-react/dynamic';
import { usePathname } from "next/navigation";
import clsx from "clsx";

type ItemProps = {
  href: string;
  label: string;
  icon: IconName;
};

export default function SidebarItem({ href, icon, label }: ItemProps) {
  const pathname = usePathname();
  return (
    <Link
      key={href}
      href={href}
      className={clsx("flex items-center space-x-3 p-2 rounded-lg text-primary-200 hover:bg-primary-800 hover:text-white transition-colors", pathname === href && 'bg-primary-800 text-white')}
    >
      <DynamicIcon name={icon} className={`h-5 w-5  ${pathname === href ? 'text-white' : 'text-primary-200'}`} />
      <span>{label}</span>
    </Link>
  )
}