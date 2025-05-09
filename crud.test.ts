import { assertEquals, assertExists, assertNotEquals } from "@std/assert";

type UserValue = {
  name: string;
  age: number;
};

Deno.test("初期状態", async () => {
  // setされていないkeyでget: 値はnull
  const kv = await Deno.openKv(":memory:");

  const result = await kv.get(["user", "taro"]);
  console.log(result);

  assertEquals(result, {
    key: ["user", "taro"],
    value: null,
    versionstamp: null,
  });

  kv.close();
});

Deno.test("書き込み", async () => {
  // setした値が取得できる
  const kv = await Deno.openKv(":memory:");
  await kv.set(["user", "taro"], { name: "Taro", age: 20 });

  const result = await kv.get<UserValue>(["user", "taro"]);
  console.log(result);

  assertEquals(result.key, ["user", "taro"]);
  assertEquals(result.value, { name: "Taro", age: 20 });
  assertExists(result.versionstamp);

  // setした値で上書きされる, versionstampも変わっている
  await kv.set(["user", "taro"], "This is Taro");

  const result2 = await kv.get<string>(["user", "taro"]);
  console.log(result2);

  assertEquals(result2.key, ["user", "taro"]);
  assertEquals(result2.value, "This is Taro");
  assertExists(result2.versionstamp);
  assertNotEquals(result2.versionstamp, result.versionstamp);

  kv.close();
});

Deno.test("削除", async () => {
  const kv = await Deno.openKv(":memory:");
  await kv.set(["user", "taro"], { name: "Taro", age: 20 });

  const result = await kv.get<UserValue>(["user", "taro"]);
  console.log(result);

  assertEquals(result.key, ["user", "taro"]);
  assertEquals(result.value, { name: "Taro", age: 20 });
  assertExists(result.versionstamp);

  // deleteで削除される
  await kv.delete(["user", "taro"]);

  const result2 = await kv.get<UserValue>(["user", "taro"]);
  console.log(result2);

  assertEquals(result2.key, ["user", "taro"]);
  assertEquals(result2.value, null);
  assertEquals(result2.versionstamp, null);

  kv.close();
});
