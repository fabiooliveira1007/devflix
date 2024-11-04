interface NavbarItemProps {
  label: string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label }) => {
  return (
    <div
      className=' 
        text-slate-100
        cursor-pointer
        hover:text-slate-300 
        transition 
        whitespace-nowrap
      '
    >
      {label}
    </div>
  );
};

export default NavbarItem;
