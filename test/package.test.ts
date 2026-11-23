import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, it } from "vitest";
import { loadPackage, scratch, typed } from "./pi.js";

const SENTENCE = "Guard the Buy Box of [ASINs]. What you may change, and the lowest price: [instructions]";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const manifest = (): Record<string, any> => JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));

it("the pinned pi loads one template, /featured-offer-guard, one skill, guard-instruction, and no extension", async () => {
  const { loader } = await loadPackage(ROOT);
  const prompts = loader.getPrompts();
  expect(prompts.diagnostics).toEqual([]);
  expect(prompts.prompts.map((prompt) => [prompt.name, prompt.filePath])).toEqual([["featured-offer-guard", join(ROOT, "prompts", "featured-offer-guard.md")]]);
  const skills = loader.getSkills();
  expect(skills.diagnostics).toEqual([]);
  expect(skills.skills.map((skill) => [skill.name, skill.filePath])).toEqual([["guard-instruction", join(ROOT, "skills", "guard-instruction", "SKILL.md")]]);
  expect(loader.getExtensions().extensions).toEqual([]);
});

it("/featured-offer-guard reaches the model as its sentence, and with words after it as the sentence then the words", async () => {
  expect((await typed(ROOT, "/featured-offer-guard")).trim()).toBe(SENTENCE);
  expect((await typed(ROOT, "/featured-offer-guard B000123456,B000654321 丢了 Buy Box 先在底价以上修，修完在飞书告诉我")).trim()).toBe(`${SENTENCE} B000123456,B000654321 丢了 Buy Box 先在底价以上修，修完在飞书告诉我`);
});

it("the template's body is its description word for word, then the seller's own words", () => {
  const text = readFileSync(join(ROOT, "prompts", "featured-offer-guard.md"), "utf8");
  expect(text.replace(/^---\n[\s\S]*?\n---\n/, "")).toBe(`${JSON.parse(/^description: (".*")$/m.exec(text)![1]!) as string} $@\n`);
});

it("is @comchatx/cx-featured-offer; the Plugins page installs every borrowed plugin from builds, and needs names cx-schedule alone, cx-feishu optional", () => {
  expect([manifest()["name"], manifest()["repository"]["url"]]).toEqual(["@comchatx/cx-featured-offer", "git+https://github.com/comchatx/cx-featured-offer.git"]);
  expect(manifest()["comchatx"]["needs"]).toEqual(["@comchatx/cx-schedule"]);
  expect(manifest()["comchatx"]["builds"]).toEqual(["@comchatx/cx-schedule", { on: "cx-feishu", need: "optional", why: { en: "Sends each check's result to your Feishu group.", zh: "用于让 cx 把检查结果发到你的飞书群。" } }, "cx-listing-playbook", "cx-amazon-sp-api", { on: "cx-keepa", need: "optional", why: { en: "Lets cx read the Buy\u00a0Box's history as it looks for why.", zh: "用于让 cx 查原因时也看 Buy\u00a0Box 的历史。" } }, { on: "cx-amazon-seller", need: "optional", why: { en: "Tells cx from the start that you sell on Amazon.", zh: "用于让 cx 从第一条消息起就知道你在亚马逊开店。" } }]);
  expect(manifest()["pi"]).toEqual({ skills: ["./skills"], prompts: ["./prompts"] });
  for (const field of ["dependencies", "bundleDependencies", "bundledDependencies"]) expect(manifest()[field], field).toBeUndefined();
});

it("the tarball holds the template, the skill, the README and the licence alone", () => {
  const out = scratch();
  const [packed] = JSON.parse(execFileSync("npm", ["pack", "--dry-run", "--json", "--ignore-scripts", "--pack-destination", out], { cwd: ROOT, encoding: "utf8" })) as { files: { path: string }[] }[];
  expect(packed!.files.map((file) => file.path).sort()).toEqual(["LICENSE", "README.md", "README.zh-CN.md", "package.json", "prompts/featured-offer-guard.md", "skills/guard-instruction/SKILL.md"]);
}, 60_000);

it("the comchatx field carries no description, which the Plugins page never draws: the card's Chinese line is about", () => {
  const field = (JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8")) as { comchatx: Record<string, unknown> }).comchatx;
  expect(field["description"]).toBeUndefined();
  expect(field["about"]).toMatch(/[一-鿿]/);
});

it("the template's line is the signed words: English in its description, Chinese in comchatx.prompts, and no Try it example of its own", async () => {
  const { loader } = await loadPackage(ROOT);
  expect(loader.getPrompts().prompts.map((prompt) => prompt.description)).toEqual(["Guard the Buy Box of [ASINs]. What you may change, and the lowest price: [instructions]"]);
  expect(manifest()["comchatx"]["prompts"]).toEqual({ "featured-offer-guard": { zh: "守住【ASIN】的 Buy Box，可以改什么、最低价多少：【要求】" } });
  expect(manifest()["comchatx"]).not.toHaveProperty("tryIt");
});

it("the card's name is comchatx.name, the one signed on 2026-11-11", () => {
  const field = (JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8")) as { comchatx: { name?: unknown; nameZh?: unknown } }).comchatx;
  expect(field.name).toBe("Amazon Buy Box Guard");
  expect(field.nameZh).toBe("亚马逊 Buy Box 守护");
});

it("the README names no other plugin: what the package builds on is its manifest's builds, each optional one with its reason", () => {
  for (const readme of ["README.md", "README.zh-CN.md"]) expect(readFileSync(join(ROOT, readme), "utf8")).not.toMatch(/npmjs\.com\/package/);
});

it("the skill says where a listing's standing instruction is kept, that it holds the seller's own words, and that the seller can read and change it", () => {
  const text = readFileSync(join(ROOT, "skills", "guard-instruction", "SKILL.md"), "utf8");
  expect(text).toContain("/tenant/listings/<ASIN>/featured-offer.md");
  expect(text).toContain("The file holds the seller's own words for that listing.");
  expect(text).toContain("the seller can read it and change it.");
});
