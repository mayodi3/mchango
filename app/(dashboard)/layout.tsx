import NavContent from "../components/navigation/NavContent";
import NavContentMobile from "../components/navigation/NavContentMobile";
import SignOut from "../components/navigation/SignOut";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      {/* Sidebar */}
      <aside className="hidden md:block w-64 bg-white shadow-md">
        <nav className="p-4 space-y-2">
          <NavContent />
        </nav>
      </aside>

      <div className="md:hidden">
        <NavContentMobile />
        <div className="absolute right-3 top-3">
          <SignOut />
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
