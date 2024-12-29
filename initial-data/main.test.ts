import { assertEquals } from "@std/assert/equals";
import { initialData } from "./data.ts";

// すでにデータがある場合は上書きしない
export async function setIfNotExist(
  kv: Deno.Kv,
  key: Deno.KvKey,
  value: unknown,
) {
  const existingValue = await kv.get(key);
  if (existingValue.value != null) return;

  const result = await kv.set(key, value);
  if (!result.ok) throw new Error("Failed to set value");
}

Deno.test("すでに存在したら初回setの値がsetされる", async () => {
  const kv = await Deno.openKv(":memory:");
  await initialData(kv);

  const result = await kv.get(["user", "taro"]);
  assertEquals(result.value, { name: "Taro", age: 20 });

  kv.close();
});
