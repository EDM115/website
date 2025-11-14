---
title: EDM115 Telegram blog
meta:
  - name: article:published_time
    content: 2022-06-21T23:41:54Z
  - name: id
    content: 81
---

Requested `eu.org` domain  
↳ Added `ClouDNS` `NameServers` for temporary access  
↳ Request accepted  
↳ Changing `NS` to `CloudFlare` ones  
↳ Made email forwarding for whole domain (`MX` & `TXT` records done)  
↳ Tried to host the website to some free providers, but all of them asks for changing the `NS` (which will make me loose benefits of `CloudFlare`)  
↳ Found that `000webhost` can host a site without changing the `NS`, which seems cool  
↳ It needs to change the `CNAME` record, to make it pointing to the `000webhostapp` subdomain. It's like a redirection, or an iframe. It's one url, showing the content of another one  
↳ `CNAME` records are not allowed at the zone apex (`RFC 1034`), so `CNAME` flattening is applied by `CloudFlare`. They change the `CNAME` into an `A` and `AAAA` record (by retrieving IPv4 and IPv6 adresses). Problem : they can't be retrieved  
↳ `CNAME` record existing but invalid, so not allowed by `000webhost`

↳ And now I'm stuck :skull: Dunno what to do. Either changing the `NS` temporarily ? Using `CNAME` or even `Page Rules` to host everything into `workers.dev` or even `pages.dev` ? Having my own `Apache` server hosted somewhere ?  
I desperately need help, if anyone can help me, pls PM at @EDM115 :place_of_worship::pleading_face::heart:

*edit :* now working perfectly, will provide help to anyone needing
