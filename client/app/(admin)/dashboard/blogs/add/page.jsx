import DashboardShell from "@/components/admin/DashboardShell";

export default function AddBlogsPage() {
  return (
    <DashboardShell title="Add Blogs" requiredPermission="blogs">
      <div className="rounded-[24px] border border-white/10 bg-black/20 p-8">
        <h2 className="text-[28px] font-semibold">This is Add Blogs page</h2>
      </div>
    </DashboardShell>
  );
}
