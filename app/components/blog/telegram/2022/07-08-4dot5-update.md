---
title: EDM115 Telegram blog
meta:
  - name: article:published_time
    content: 2022-07-08T12:39:04Z
  - name: id
    content: 91
---

**BIG Update announcement** : `v4.5.0`

Visible changes on user side :  
• /me works  
• Error messages directly sent in logs  
• Typed wrong `/command` ? **Edit** your message, bot will handle it as a new one :relaxed:  
• Added logging (finally)  
• A lof of commands can now be **done everywhere**  
• Now handles **REPLY_MARKUP_TOO_LONG** error  
• /mode now **works correctly** and no longer add users to banned_db  
• Various **text changes**  
• Started the **CrowdIn** for internationalization  
• Added start message to logs (stop one still under construction)  
• Shifted nearly every print() to LOGGER  
• Tried to **automatically** /clean after an error  
• Made **empty keyboard** when bot isn't able to read the archive content  
• Added /restart, but I will search for a complete reboot, even if bot hangs up  
• ~~Attempt to add /merge and /cancel commands + linked callbacks~~ **THIS DOESN'T WORK**  
• Made a way more **permissive regex** for URL  
• Fixed **exceptions** on nearly all commands  
• Performing a /restart send the logs automatically  
• Way better handling of check_logs() on start  
• Fixed #NEW_USER name formatting  
• ~~If a file is above 2 Gb, it's uploaded to Bayfiles instead~~ **BROKEN**  
• Faster get_files()  
• Made /stats **working** for non owner  
• **Thumbnail support for most of files !** Nevertheless, it's removed at each restart  
• Keyboard now **refreshes correctly** after sending a file  
• Added /dbexport, /commands, /admincmd  
• Added exec and eval, but not usable now  
• Major **bug fixes**  
• Empty keyboard buttons are side to side  

**Track all changes from v3 in the [changelog](https://github.com/EDM115/unzip-bot/tree/beta/changelog.md)**  
Follow @EDM115bots for more :smiling_face_with_three_hearts:
