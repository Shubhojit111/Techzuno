import DashboardShell from "@/components/admin/DashboardShell";

export default function DashboardPage() {
  return (
    <DashboardShell title="Dashboard Overview">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="rounded-[24px] border border-white/10 bg-black/20 p-6">
          <p className="text-white/50 text-sm">Products</p>
          <h2 className="mt-3 text-3xl font-semibold">Manage Catalog</h2>
        </div>
        <div className="rounded-[24px] border border-white/10 bg-black/20 p-6">
          <p className="text-white/50 text-sm">Orders</p>
          <h2 className="mt-3 text-3xl font-semibold">Track Requests</h2>
        </div>
        <div className="rounded-[24px] border border-white/10 bg-black/20 p-6">
          <p className="text-white/50 text-sm">Users</p>
          <h2 className="mt-3 text-3xl font-semibold">View Accounts</h2>
        </div>
      </div>

      <div className="mt-8 rounded-[24px] border border-white/10 bg-black/20 p-8">
        <p className="text-[#38FFF2] text-[12px] uppercase tracking-[0.22em]">
          Welcome
        </p>
        <h3 className="mt-4 text-[24px] md:text-[32px] font-semibold">
          This is Dashboard page
        </h3>
        <p className="mt-4 max-w-2xl text-white/65 leading-relaxed">
          Use the sidebar to open Products, Orders, Users, Admins, and Settings.
          The Admins page is only visible to admin head accounts.
        </p>
      </div>
    </DashboardShell>
  );
}
