//'use client'

import Link from "next/link";

//import

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  return (
    <header className={`sticky top-0 bg-black p-4 text-center text-green-500`}>
      <Link href={`/`}>uheard</Link>
    </header>
  );
};

export default Header;
