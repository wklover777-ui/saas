import { SupabaseClient } from "@supabase/supabase-js";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { User } from "../../domain/entities/User";

export class SupabaseUserRepository implements UserRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async updateUserPlan(userId: string, plan: "free" | "pro" | "business"): Promise<void> {
    const { error } = await this.supabase
      .from("users")
      .update({ plan })
      .eq("id", userId);

    if (error) {
      throw new Error(`Failed to update user plan: ${error.message}`);
    }
  }

  async saveBillingKey(userId: string, customerKey: string, billingKey: string): Promise<void> {
    const { error } = await this.supabase
      .from("users")
      .update({ customer_key: customerKey, billing_key: billingKey })
      .eq("id", userId);

    if (error) {
      throw new Error(`Failed to save billing key: ${error.message}`);
    }
  }

  async getUser(userId: string): Promise<User | null> {
    const { data, error } = await this.supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error || !data) {
      return null;
    }

    return {
      id: data.id,
      email: data.email,
      name: data.full_name,
      plan: data.plan,
      customerKey: data.customer_key,
      billingKey: data.billing_key,
    };
  }

  async getUsersToBillToday(date: Date = new Date()): Promise<User[]> {
    const isoString = date.toISOString();
    
    // next_billing_date가 현재 시간보다 작거나 같은 유저 모두 조회 (빌링키 유무 무관)
    const { data, error } = await this.supabase
      .from("users")
      .select("*")
      .lte("next_billing_date", isoString)
      // .not("billing_key", "is", null); <- 이 조건 제거하여 구독 취소자도 가져오도록 함

    if (error || !data) {
      return [];
    }

    return data.map(user => ({
      id: user.id,
      email: user.email,
      name: user.full_name,
      plan: user.plan,
      customerKey: user.customer_key,
      billingKey: user.billing_key,
      nextBillingDate: user.next_billing_date ? new Date(user.next_billing_date) : undefined,
    }));
  }

  async updateNextBillingDate(userId: string, nextBillingDate: Date): Promise<void> {
    const { error } = await this.supabase
      .from("users")
      .update({ next_billing_date: nextBillingDate.toISOString() })
      .eq("id", userId);

    if (error) {
      throw new Error(`Failed to update next billing date: ${error.message}`);
    }
  }
}
