interface SectionDividerProps {
  className?: string;
}

const SectionDivider: React.FC<SectionDividerProps> = ({ className = "" }) => {
  return <div className={`h-6 w-[1px] bg-blue-300 ${className}`}></div>;
};

export default SectionDivider;
