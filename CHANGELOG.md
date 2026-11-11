# Changelog

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
