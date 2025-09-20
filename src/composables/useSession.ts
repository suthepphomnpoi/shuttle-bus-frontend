import { reactive, computed } from "vue";
import { http } from "./../lib/http";

type User = { id: string; email: string } | null;

const state = reactive({
  user: null as User,
  loaded: false, // เช็คครั้งแรกเสร็จหรือยัง
  loading: false,
});

// เรียกครั้งแรกทันทีเมื่อ import module นี้
fetchMe();

export async function fetchMe() {
  if (state.loading) return;
  state.loading = true;
  try {
    const { data } = await http.get("/auth/users/me");

    // Accept multiple response shapes:
    // 1) { ok: true, user: { id|userId, email } }
    // 2) { user: { id|userId, email } }
    // 3) { id|userId, email }
    let normalized: User = null;
    const pickId = (obj: any) => obj?.id ?? obj?.userId ?? obj?.userID ?? obj?._id ?? obj?.uid;
    const pickEmail = (obj: any) => obj?.email ?? obj?.mail ?? obj?.username;

    if (data) {
      const source = data.user ?? data;
      const id = pickId(source);
      const email = pickEmail(source);
      if (id != null && email) {
        normalized = { id: String(id), email };
      }
    }

    state.user = normalized;
  } catch {
    state.user = null;
  } finally {
    state.loaded = true;
    state.loading = false;
  }
}

export function useSession() {
  return {
    user: computed(() => state.user),
    isLoggedIn: computed(() => !!state.user),
    loaded: computed(() => state.loaded),
    fetchMe,
    async logout() {
      try {
        await http.post("/auth/users/logout");
      } catch {}
      state.user = null;
    },
  };
}
