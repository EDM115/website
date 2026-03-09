---
title: How I made Spendly - EDM115 blog
meta:
  - name: article:published_time
    content: 2026-02-15T20:46:00Z
  - name: description
    content: How I made a budget tracker for my gf because she kept complaining about Google Sheets
  - name: summary
    content: A breakdown of how Spendly grew from a spreadsheet replacement into a full web app with charts, exports, and shared budgets, all while using GitHub Copilot CLI to supercharge development and ship features at lightning speed.
  - name: tags
    content: project, copilot, devchallenge, nuxt
  - name: reading_time
    content: 11min 43s
---

[[toc]]

# How I made a budget tracker for my gf because she kept complaining about Google Sheets
[[drt]]
> [!NOTE]  
> This post was originally made as a submission for the [GitHub Copilot CLI Challenge](https://dev.to/challenges/github-2026-01-21) by DEV.  
> I ended up being part of the 25 runner-ups among 400+ submissions (which was very unexpected), and [I won](https://dev.to/devteam/congrats-to-the-github-copilot-cli-challenge-winners-2240) a badge and 1 year of GitHub Copilot Pro+ (worth 390$).  
> The entire post was mostly centered around Copilot due to the challenge, which explains in part the glaze. However I do mean what I said. No cashprize or reward will shift my honesty.  
> You can find the original link [here](https://dev.to/edm115/how-i-made-a-budget-tracker-for-my-gf-because-she-kept-complaining-about-google-sheets-49l3).

## Quick background
I'm a French dev who finished my studies, and I build random projects to keep sharpening my skills while I look for a job. As usual, my gf had some kind of issue and as a dev, I can cook something up to help. I already did something similar with [`Better Maps`](https://github.com/EDM115/better-maps), a webapp that uses the Google Maps API to display custom pinpoints on top of the map. I created it because we were moving in together to a city neither of us knew well.

## What I built (and how)
This time, she wanted a way to manage her finances. So far, she'd been doing it in a Google Sheet, which isn't a bad idea (I mean, accounting is one of the main reason spreadsheets exist, right ?) but isn't very practical, and for a few reasons :
- **Overkill** : Google Sheets has a load of features that she'll never use
- **Not mobile-friendly** : Although the Sheets app on Android is sleek and works well (props to the Google engineers for that 🙌), it isn't as good as on desktop. And like with `Better Maps`, she was also going to use it on her phone, so making the webapp responsive was a top priority
- **No stats, no analysis** : Sure, you *can* create formulas to compute what you need and display graphs, you have to set it all up manually, update them when needed, and duplicate all that work for every month's sheet

So naturally, she asked me to do the same kind of thing I did with `Better Maps`. Fortunately, that meant that I could reuse the codebase ☺️ (which I'd already partly reused back then from my website and a school project), do a few minor tweaks to host the data, and be done with it.  
At least, that's what I *thought* would happen...

## Wanna see a demo ?
If you want to skip the ramble, you can check the app at [spendly.edm115.dev](https://spendly.edm115.dev). There's a link to a fully fledged demo with sample data so you can see what's possible, along with a complete landing page (Google OAuth validation team said it wasn't complete enough... so I gave them all the details !). The app is public and ready to use, feel free to create an account, try it and give me feedback :\)  
The source code is available at [EDM115/Spendly](https://github.com/EDM115/Spendly).

## What I initially planned to do
The webapp is built with [Nuxt](https://nuxt.com), a [Vue.js](https://vuejs.org/) full-stack framework that solves a lot of pain points with a batteries-included approach (SSR, API, routing, crazy good DX, ...).  
Personal preference, but I prefer Vue over React, I feel like I can ship faster with it, and AI models give much more consistent results thanks to the way the ecosystem is structured (wanna do X ? here's the Y official solution that everyone uses and that's well documented !).  
The app is built and bundled in a Docker container, and it's linked to a volume containing an SQLite DB, because I couldn't be bothered to use either a cloud DB or run a separate MySQL server.  
So [3 months ago](https://github.com/EDM115/spendly/commit/5a2ab5dbc68df897fb48cfe572958013360b2ad8), I ported the code from `Better Maps` over to `Spendly`... and then didn't do anything for a month because I had other projects to work on.  
On December 2nd, 2025, I finally decided to sketch how the app would look, what the features would be (and to calm down my gf's unrealistic expectations lol), and... once again, other projects took priority.  
December 29th was the day where I finally locked in and created the first "working-ish" version of `Spendly`.  
Over January, I improved the app a bit, added a landing page (`Better Maps` didn't had one and threw you straight into the login page because it was only meant for private usage, the Google Maps API ain't free 😭 but here I wanted to make it public so landing page it is !), refined the visual style (I struggled quite some time with this 😅), some perf improvements, ...

## What does the app even do anyway ?
With `Spendly`, you can create "budgets". They can represent an actual bank account where you track your expenses, a trip you want to plan, a project with strict budgeting, ...  
Each budget has its own "categories", with a color and an icon, so you can (you guessed it) categorize expenses.  
Then you simply add the transactions (expense or income), their amount, associated category and date.  
You can then freely sort and search for them, filter by any date range, and most importantly get 4 pre-made charts to analyze the data (with a fully customizable time range as well) :
- **Evolution** : The balance over time. See how expenses/income/balance evolves over time
- **Repartition by category**: Check which category represents most of your expenses/income
- **Comparison** : Review whether you spent more money than you earned
- **Distribution** : The cashflow overview. Check the percentage of savings/deficit you have compared to income/expenses

You can also export your data at any time :
- Transactions : CSV/JSON
- Charts : SVG/PNG/PDF

Each budget can be shared with any number of other users, with roles (kinda like Google Drive) : viewer, editor, admin, and owner.
Finally, the app has desktop and mobile layouts, a light & dark theme, and is available in both English and French.

## How the GitHub Copilot CLI helped massively (and got me carried away)
So far, `Spendly` was developed in VS Code like usual, with the help of Copilot (I've been a very early adopter, part of the Technical Preview on April 2nd 2022, Copilot in the CLI on March 22nd 2023 and Copilot Chat private beta on May 26th 2023).  
On January 22nd, a friend told me about this challenge. I figured it was a good time to finally learn how to use the Copilot CLI, since I hadn't really tried any TUI-based AI tool. Time to catch up, I guess !  
And boy, did I ship.  
Before that date, the project had **+20 126 LoC** since inception, tho to be real it's closer to **+7 468 / -2 062 LoC** if you remove the `Better Maps` base, and that in 2 months.  
In comparison, in just 24 days, there were **+29 595 / -5 143 LoC**, and that's not just lockfile changes 😉 A lot of major features landed that I wouldn't have been able to implement in time without AI.  
To give you an overview of what shipped since I started using the Copilot CLI :
- **Better on mobile** : Virtualization, cards instead of a table, simplified charts, ...
- **Demo** : Add a complete set of demo data in 2 languages, covering 17 believable categories and 150 transactions over the course of 10 months
- **Icon search** : Rather than expecting users to know what MDI icons are, they can just search for what they need (with support for categories and aliases), yes, even `baguette` 🥖
- **Proper charts exports** : This was a pain point. Exports were low-res on image, and the SVG just embedded the PNG... Now it generates a proper SVG, and renders ultra high-quality images from that same SVG !
- **Database change (Drizzle ORM)** : Instead of raw SQL queries everywhere, we now have an ORM, migrations, easier queries, and more. This finally lets me do core changes to the app without resetting the DB lol. This change was massive and instrumental for the next change :
- **Auth change (Better Auth)** : The auth system used to be hand-rolled (bad idea, I know) : username/password login, JWT sessions and some requests validation. That was it. Now, thanks to this (massive too) change, we have proper username/email auth, OAuth (Google/GitHub), proper session management (no more random disconnects), proper admin management, captcha support (Cloudflare Turnstile), ... and most importantly : **the ability to signup** !
- **Emails (Resend)** : We can now send emails, for example on forgotten password, or even for admin actions (an user requests their data or want to delete their account)
- **Account page** : Since we have a proper auth, we can allow users to manage their account in a centralized place. It's also the place where they can donate if they want to 🫶
- **Admin rework** : After the DB & Auth changes it was broken, but Copilot restored it and improved it with a centralized place to handle user requests
- **PWA** : Finally, my gf wanted to "install" the app on her phone, so a PWA was the best choice. Copilot helped tremendously to fix some pesky install quirks and cache invalidation issues !

### Models used
I love tinkering with models to find out what they're good at (I might even have a [blog post](https://edm115.dev/blog) coming that compares all of them against a deceptively hard prompt... 🫣). Overall I used 3 models for `Spendly` :
- 🥇 **OpenAI's GPT 5.2-Codex** : The best one overall. Versatile, eager to tackle hard tasks, cheap, large context window, loves reading docs like me, reasons well and follows instructions very closely.
- 🥈 **Anthropic's Claude Opus 4.5** : Although I got hit with the `x3` multiplier 🥲 this model is really powerful. I mostly used it as a scaffolder for Codex : generate plans, implementation guidelines, the AI guidance, potential perf improvements, ... then handed off to Codex for the actual code changes.
- 🥉 **Google's Gemini 3 Pro** : I didn't used it a lot, only for UI changes (pick a style, refactor all components to match it, unify everything and make it look good on mobile). I found it to be better at UI/UX overall.

### What helped along the way
- **`AGENTS.md`** : I added this pretty late to the project, but having a centralized file that guides AI agents is a must. You can define your own rules, document the codebase so the LLM doesn't waste tokens exploring blindly, note gotchas or unique bits of the project, ... I already had some experience writing [one for my website](https://github.com/EDM115/website/blob/master/AGENTS.md), you can find `Spendly`'s one [here](https://github.com/EDM115/spendly/blob/master/AGENTS.md) (they all had been largely inspired by [Oxc's AI guidelines](https://github.com/oxc-project/oxc/blob/main/AGENTS.md)).
- **Skills** : Same story, I added them quite late. At first I didn't bought into the hype, because I thought (like MCPs) they'd eventually get used to fix problems they weren't meant for. But HOLY was I wrong. With a few simple skills (libraries, tool calling, search, brainstorming, ...) I got *crazy good* results with much less prompting ! Also thanks to the Copilot CLI team for supporting the `~/.agents` standard, so I don't have duplicated files everywhere 🙏

### An example : wide event logs
This is the perfect example of a feature that I didn't need, but got carried away because Copilot is too good 🐐  
So the app basically got no logs from the start (as `Better Maps` didn't either, since it was targeted at just me, my gf and my mom). But if I wanted the app to be public, I needed some insight, especially for failures or slow aah requests.  
Weeks prior, I read the excellent [Logging Sucks](https://loggingsucks.com/) article by Boris Tane, and it described exactly what I needed : wide event logs.  
Fortunately, he also provided a [skill](https://github.com/boristane/agent-skills/blob/main/skills/logging-best-practices/SKILL.md) that made implementing it much easier.  
Here's how I proceeded :
1. **Prepare**. I used ChatGPT's website with 5.2 Thinking (extended) & web search to review the website/skill, then explained my webapp and asked it to generate a complete prompt to hand off to an AI agent. I could've used the Plan mode inside the Copilot CLI (and I did for other complex tasks), but here I wanted sources checked first—and ChatGPT's web search is great for that.
2. **Implement**. GPT 5.2-Codex handled that. Thanks to the complex but detailed prompt + skills + tools, it was able to *one-shot it* (1 750 LoC changes across 32 files), all while staying under the context window !
3. **Refine**. Although it worked perfectly, I asked later to add guidance in the `AGENTS.md`, add implementation notes for features that weren't ready yet (like emails), ... Small touches on a working product.
4. **Over-obsess**. This is the part where I got carried away... 😅 After seeing how well it went, I asked for completely out-of-scope and unnecessary tools to accompany it. First a CLI tool to parse the logs and extract insights. And when it did make it in only 2 back-and-forth prompts, I turned the difficulty up and asked it to make a whole-ass TUI to dynamically browse logs and view metrics. Will I ever use it ? Probably not, but boy was it fun !

### My overall thoughts about AI usage in this project
I've used Copilot since the start of this project, just like with `Better Maps` before it, which let me move fast, iterate quickly, ship often, and explore ideas I wouldn't bother to consider otherwise.  
Switching to Copilot CLI was a breath of fresh air. Even though Copilot is very well integrated into VS Code, I had 2 big issues :
- **Performance** : VS Code is an Electron-based app. On my potato laptop, running Chrome + Discord + Spotify + VS Code + a dev server with HMR reloading on every keystroke doesn't help. Dropping one Electron app can make a real difference, and Copilot CLI is very well optimized, low on resources and quite snappy !
- **Code-first approach** : When I'm in VS Code, I'm a lot tempted to watch changes live and obsess over them. In a TUI, I only checked the diff and intervened when necessary. That more laid-back approach helped me relax a bit and stress less (though I wouldn't necessarily do this on other projects, here the result matters more than code quality).

Now, was Copilot (or, the 3 models I used) perfect ? No.  
I had some pain points that even prompting, reference files, documentation links, skills and `AGENTS.md` couldn't solve. For instance, the PNG generated from charts was around a megabyte. The PDF generated from the same chart (which just embeds that PNG) was... 77 Mb ! Copilot tried all sorts of techniques to reduce it, while all it needed was to enable 2 config flags in the library's config (that I found by reading the docs myself).  
So I still had to do some cleanup passes after AI edits, and I also enjoyed building some parts entirely by hand, but Copilot handled the heavy lifting and boilerplate.

## App screenshots
**The homepage**
![Homepage](/img/blog/2026/02-15-how-i-made-spendly-homepage.webp)
**Budget selector**
![Budget selector](/img/blog/2026/02-15-how-i-made-spendly-budget-selector.webp)
**Transactions list**
![Transactions list](/img/blog/2026/02-15-how-i-made-spendly-transactions-list.webp)
**Categories**
![Categories](/img/blog/2026/02-15-how-i-made-spendly-categories.webp)
**Evolution chart**
![Evolution chart](/img/blog/2026/02-15-how-i-made-spendly-evolution-chart.webp)
**Repartition chart**
![Repartition chart](/img/blog/2026/02-15-how-i-made-spendly-repartition-chart.webp)
**Comparison chart**
![Comparison chart](/img/blog/2026/02-15-how-i-made-spendly-comparison-chart.webp)
**Distribution chart**
![Distribution chart](/img/blog/2026/02-15-how-i-made-spendly-distribution-chart.webp)
**Login page**
![Login page](/img/blog/2026/02-15-how-i-made-spendly-login.webp)
**Account page**
![Account page](/img/blog/2026/02-15-how-i-made-spendly-account.webp)
**Light theme**
![Light theme](/img/blog/2026/02-15-how-i-made-spendly-light.webp)
**Transactions on mobile**
![Transactions on mobile](/img/blog/2026/02-15-how-i-made-spendly-mobile.webp)
**The overkill Logs viewer TUI**
<iframe width="960" height="540" src="https://www.youtube.com/embed/1QqQuLsBC0I?disablekb=1&rel=0" title="Spendly Logs viewer TUI - EDM115" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
