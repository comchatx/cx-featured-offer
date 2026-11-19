# Changelog

## 0.1.7

- The README, in English and Chinese, no longer names other plugins, as signed on 2026-11-18: the Overview's first paragraph drops its last sentence ("It needs Amazon Listing Playbook, Amazon SP-API and Scheduled Tasks, which Plugins installs with it."), and the sentence on Keepa and Feishu in the later paragraph is removed. The Plugins page draws what the package builds on from `comchatx.builds`.
- Each optional entry of `comchatx.builds` carries its reason in `why` (`en`, `zh`): `cx-keepa` 「用于让 cx 查原因时也看 Buy Box 的历史。」 / "Lets cx read the Buy Box's history as it looks for why.", `cx-feishu` 「用于让 cx 把检查结果发到你的飞书群。」 / "Sends each check's result to your Feishu group.", and a new optional `cx-amazon-seller` 「用于让 cx 从第一条消息起就知道你在亚马逊开店。」 / "Tells cx from the start that you sell on Amazon.".
- The template's line is the words signed on 2026-11-17, written as the seller's own message: its `description` is "Guard the Buy Box of [ASINs]. What you may change, and the lowest price: [instructions]" and `comchatx.prompts["featured-offer-guard"].zh` is 「守住【ASIN】的 Buy Box，可以改什么、最低价多少：【要求】」.

## 0.1.6

- The card's name is the one signed on 2026-11-17: "Amazon Buy Box Guard" on the English page (`comchatx.name`) and 「亚马逊 Buy Box 守护」 on the Chinese page (`comchatx.nameZh`).
- The README, in English and Chinese, calls each plugin of ours it names by the card's name signed on 2026-11-17.
- The README names each other plugin it speaks of by the card's name in its own language, a link to that plugin's page on npm, never by the npm name.

## 0.1.5

- The card's name is the one signed on 2026-11-11, "Amazon Buy Box Guard", in `comchatx.name`, the same on the Chinese and the English page.
- The README, in English and Chinese, calls each of our plugins by its card's name, not its npm name.

## 0.1.4

- The template's line is the words signed on 2026-11-10: its `description` is "Tell cx which listings' Buy Box to guard and what it may change.", in English only, and `comchatx.prompts["featured-offer-guard"].zh` is 「告诉 cx 守住哪些 listing 的 Buy Box，能改什么。」.
- `comchatx.tryIt` is removed: the template is the package's Try it example.

## 0.1.3

- The card's line and the Overview, in English and Chinese, are the words signed on 2026-11-10: "Has cx guard your Buy Box and fix what you allow when it's lost." as npm's `description`, and 「让 cx 守住 Buy Box，失去时在你允许的范围内修复，再告诉你。」 as `comchatx.about`. They said "Has cx guard your listings' Featured Offer (Buy Box): it fixes what you allowed, then reports." and 「让 cx 守住 Buy Box，失去时在你允许的范围内修复，再告诉你。」.

## 0.1.2

- The README in Chinese, `README.zh-CN.md`, which the Plugins page draws as the Overview in Chinese.
- `comchatx.description` is removed: the Plugins page never drew it, and the card's Chinese line is `about`.

## 0.1.1

- cx-feishu is optional: `comchatx.needs` names `@comchatx/cx-schedule` alone, and `builds` carries `{ "on": "cx-feishu", "need": "optional" }`, so the Plugins page no longer installs cx-feishu unless the seller wants it. Where the seller asked to be told in Feishu and cx-feishu is not installed, the template has cx tell them in the chat and say once that it installs from Plugins.

## 0.1.0

- `/featured-offer-guard`: the seller's standing instruction for guarding a listing's Featured Offer.
