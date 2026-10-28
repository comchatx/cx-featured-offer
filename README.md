Have cx guard the Featured Offer (the Buy Box) of your listings. When an offer loses it, cx first fixes what you allowed it to fix, then tells you what it found, what it changed and how. What it cannot fix comes back to you as a plan that names who does what, and where.

## How it works

- Type `/featured-offer-guard` with the ASINs and what you want. cx asks only what your words leave open: how often to look, what it may change without asking you, the price it never goes below, and where to tell you.
- cx writes your words down as the instruction it follows for each listing, in your files, where you can read and change it.
- Some causes cx can fix in your store, such as a price above what wins the Featured Offer, or the quantity or handling time of an offer you ship yourself. Others need you or Amazon, such as restocking FBA, an account health appeal or a report through Brand Registry, and come back to you as a plan.

## What it uses

It uses cx-listing-playbook for what decides the Featured Offer, Amazon SP-API for your store, Keepa for the Featured Offer's history where you have it, cx-schedule for the times, and cx-feishu to tell you in Feishu. Plugins installs them with it.

## What it costs

Checks run only while cx's computer is on, and you pay for that time and for the data each check reads.
