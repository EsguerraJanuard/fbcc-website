import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: admin } = await supabase.from('admins').select('id').eq('id', user.id).single();
  if (!admin) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex">
      <AdminSidebar />

      {/* Admin Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="h-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center px-8 justify-end shadow-sm">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Admin User
          </div>
        </header>
        <div className="flex-1 p-8 overflow-auto text-gray-900 dark:text-gray-100">
          {children}
        </div>
      </main>
    </div>
  );
}
