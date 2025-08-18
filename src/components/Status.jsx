const Status = ({ text, icon: Icon, color, bgColor }) => {
  return (
    <div className={`flex items-center gap-1 px-2 py-1 rounded ${bgColor}`}>
      <Icon className={`w-4 h-4 ${color}`} />
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
}

export default Status;