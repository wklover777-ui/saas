import PaymentWidget from "../../src/presentation/components/PaymentWidget";
import { createClient } from "../../src/infrastructure/supabase/server";
import { redirect } from "next/navigation";

export default async function PaymentPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <PaymentWidget userCustomerKey={user.id} />
    </div>
  );
}
