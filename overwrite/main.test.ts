import { assertEquals } from "@std/assert";

Deno.test("overwrite", async () => {
  const kv = await Deno.openKv(":memory:");

  /**
   * 1回目の書き込み
   */
  await kv.set(["key", "key2"], "value");
  const result = await kv.get(["key", "key2"]);

  assertEquals(result.key, ["key", "key2"]);
  assertEquals(result.value, "value");

  /**
   * 上書き
   */
  await kv.set(["key", "key2"], "overwrite");
  const result2 = await kv.get(["key", "key2"]);

  assertEquals(result2.key, ["key", "key2"]);
  assertEquals(result2.value, "overwrite");

  kv.close();
});
