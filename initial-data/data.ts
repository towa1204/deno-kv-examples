import { setIfNotExist } from "./main.test.ts";

export async function initialData(kv: Deno.Kv) {
  await setIfNotExist(kv, ["user", "taro"], { name: "Taro", age: 20 });
  await setIfNotExist(kv, ["user", "taro"], { name: "Taro", age: 25 });
}
