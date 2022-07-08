import Link from 'next/link';

function Header() {
  return (
    <nav>
      <div className="flex flex-row px-4 h-12 items-center  justify-between shadow-md">
        <Link href="/">
          <a className="text-lg font-bold">Home</a>
        </Link>
        <div className="nav_link_right">
          <Link href="/cart">
            <a>Cart</a>
          </Link>
          <Link href="/login">
            <a>Login</a>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
