import Link from "next/link";

export default function Navigation() {
  return (
    <ul>
      <li>
        <Link href="/">Dash board</Link>
      </li>
      <li>
        <Link href="/search">Search score</Link>
      </li>
      <li>
        <Link href="/report">Report</Link>
      </li>
      <li>
        <Link href="/settings">Settings</Link>
      </li>
    </ul>
  );
}
