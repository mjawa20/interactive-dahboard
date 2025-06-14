type HeadingProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Heading({ children, className = '' }: HeadingProps) {
  return (
    <h1 className={`text-2xl font-bold tracking-wider ${className}`}>
      {children}
    </h1>
  );
}