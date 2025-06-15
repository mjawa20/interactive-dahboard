type SummaryCardProps = {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
};

export function SummaryCard({ title, value, icon, color }: SummaryCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 flex items-center">
      <div className={`${color} p-3 rounded-full text-white mr-4`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  );
}