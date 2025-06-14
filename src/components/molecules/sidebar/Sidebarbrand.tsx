import Link from "next/link";
import { IconName } from 'lucide-react/dynamic';
import { DynamicIcon } from 'lucide-react/dynamic';

type SidebarbrandProps = {
  icon: IconName;
  label:  string;
};

export default function Sidebarbrand({ icon, label }: SidebarbrandProps) {
  return (
    <Link href="/" className="flex items-center justify-center space-x-2">
      <DynamicIcon name={icon} className="h-5 w-5 text-white" />
      <span className="text-xl font-semibold text-white">{label}</span>
    </Link>
  )
}