import { assertEquals } from "@std/assert";

Deno.test("initial-state", async () => {
  const kv = await Deno.openKv(":memory:");

  /**
   * 存在しないキーでの取得
   * この場合、value と versionstamp は null になる
   */
  const result = await kv.get(["key", "key2"]);

  assertEquals(result.key, ["key", "key2"]);
  assertEquals(result.value, null);
  assertEquals(result.versionstamp, null);

  kv.close();
});
