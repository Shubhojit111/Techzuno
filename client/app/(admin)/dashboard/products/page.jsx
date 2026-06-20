import DashboardShell from "@/components/admin/DashboardShell";

export default function ProductsPage() {
  return (
    <DashboardShell title="Products">
      <div className="rounded-[24px] border border-white/10 bg-black/20 p-8">
        <h2 className="text-[28px] font-semibold">This is Products page</h2>
      </div>
    </DashboardShell>
  );
}

