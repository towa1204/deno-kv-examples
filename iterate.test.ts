import { assertEquals } from "@std/assert";

type User = {
  name: string;
  age: number;
  interests: string[];
};

const taro: User = {
  name: "Taro",
  age: 20,
  interests: ["music", "movie"],
};

const hanako: User = {
  name: "Hanako",
  age: 22,
  interests: ["book", "movie"],
};

Deno.test("overwrite", async () => {
  const kv = await Deno.openKv(":memory:");

  await kv.set(["user", taro.name], taro);
  await kv.set(["user", hanako.name], hanako);

  const entries = await kv.list({ prefix: ["user"] });
  for await (const entry of entries) {
    console.log(entry);
    if (entry.key[1] === taro.name) {
      assertEquals(entry.key, ["user", taro.name]);
      assertEquals(entry.value, taro);
    } else if (entry.key[1] === hanako.name) {
      assertEquals(entry.key, ["user", hanako.name]);
      assertEquals(entry.value, hanako);
    }
  }

  kv.close();
});
