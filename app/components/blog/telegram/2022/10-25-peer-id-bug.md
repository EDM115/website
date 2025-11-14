---
title: EDM115 Telegram blog
meta:
  - name: article:published_time
    content: 2022-10-25T19:46:33Z
  - name: id
    content: 240
---

![peer-id-bug-1](/img/blog/2022/10-25-peer-id-bug-1.webp)  
:newspaper_roll: TELEGRAM NEWS :newspaper_roll:

Since few days, a weird behavior of the Telegram API have been reported (I also personally noticed it)  
Requesting to get infos through user ID may fail with some profiles  
However, doing the same with the username works fine

It also affects [Pyrogram](https://docs.pyrogram.org/api/types/User), no clue about Telethon yet

It gets problematic with some users which don't have usernames. Also bots can struggle with this, as shown here

![peer-id-bug-2](/img/blog/2022/10-25-peer-id-bug-2.webp)  
example :point_up_2:
