---
title: Google ending shared drives - EDM115 blog
meta:
  - name: article:published_time
    content: 2022-05-15T22:53:00Z
  - name: description
    content: Google ending Edu shared drives, everything you need to know
  - name: summary
    content: Google is ending its Education Shared Drives unlimited storage offering as part of a broader storage policy change effective July 2022, a decision driven by widespread abuse and rapidly rising storage use. Find out why this happened, its implications for users and alternative cloud storage solutions.
  - name: tags
    content: google, cloud, storage
---

[[toc]]

# Google ending Edu shared drives : everything you need to know

**As you may know, Google is ending their Edu shared drive plan.**  
**On this article, we are going to see why, what would be the consequences for you and which solutions you may use.**
![Google Shared Drives](/img/blog/2022/05-15-google-ending-shared-drives.webp)

## 1) Is it serious ?
Yes it is, and to be honest it didn't surprise me...  
Google have [announced it](https://support.google.com/a/answer/10403871#expand-all), but it was said nearly nowhere else (that is why I'm writing this article)  
This follow their new storage policy, which is going to take effect in July (theorically on 1st July, but it may take some days to be effective). Also, some Shared Drives may be deleted from June (Google Admin already provide a [solution to delete them](https://telegra.ph/Deleting-Shared-Drives-from-Google-Admin-panel-05-15))

## 2) A bit of chronology...
+ 24th April 2014 : Creation of Google Drive, formerly known as [project Platypus](https://chiefmarketer.com/googles-platypus-is-gdrive/) ([original blog post](http://cocaman.ch/wp/2006/07/google-testing-gdrive-codename-platypus/?/wp-content/uploads/2006/07/Platypus1152508704685.png))
+ September 2016 : Creation of Team Drives
+ 29th April 2019 : Renaming them to Shared Drives
+ In the end of 2019, proof [here](https://www.google.com/search?q=free+team+drive+generator&sxsrf=ALiCzsbOIkd6ekfBu7vqC0ptClmI6xfH0w%3A1652628214232&tbs=cdr%3A1%2Ccd_min%3A1%2F1%2F2019%2Ccd_max%3A12%2F31%2F2020&tbm) : Creation of Team Drives generators
+ 18th February 2022 : Google announcing changing their storage policy

## 3) What are Team/Shared Drives ?
> In September 2016, Google announced Team Drives, later renamed Shared Drives, as a new way for Google Workspace teams to collaborate on documents and store files. In Shared Drives, file/folder sharing and ownership are assigned to a team rather than to an individual user. Since 2020, Shared Drives had an ability to assign different access levels to files and folders to different users and teams, and an ability to share a folder publicly. Unlike individual Google Drive, Shared Drives offer unlimited storage.  

They provided unlimited cloud storage for schools and enterprises that needed it

## 4) What caused this ending ?
People were seriously abusing it...  
While some people needed it, using it as a backup of their data, or because they have some files that were above the 15 Gb limit ; others overused it. Among them, people that runs Telegram mirror groups. Because a lot of users mirror a lot of files to Google Drive, and because making such groups is easier than ever thanks to Heroku, the number of files uploaded to Shared Drives exponentially raised.  
As Google saw the storage consumption growing up, and as people were only abusing Edu Drives, they decided to "end" this offer.  
Plus, let me tell you something from my experience. For the context, I'm in over 250 shared drives that host around 5 Pb of data. If I search for one file (let's say `After Effects 2022`), I have hundred of results, most of the time the *exact same file*, just on several drives...

## 5) Which solutions remains for schools ?
In facts, they still can use their Edu plan. But this time, the storage is pooled with a baseline of 100 TB for all users, no longer unlimited. Meaning that administrators of schools will be more attentives to what happen on their drives, and the creation of Shared Drives will seriously be resricted.  
The real problem may come for schools like Harvard or the MIT, them needing to store huge amount of data. The solution for them could be either buying an upper Drive plan, or having ther own servers.

## 6) What are the consequences for the average user ?
If like me, you're in a lot of Shared Drives, they will nearly all disappear from [your drive](https://drive.google.com/drive/u/0/shared-drives).  
If you're running one, it would be better to inform your users that the storage may end very soon, and telling them to backup their files as soon as possible.  
If you still need to have a cloud storage, keep reading.
All the links that leads to files/folders on those drives will no longer work, and mirror bots will probably no longer work.
TeamDrives generator such as the one of [MSGsuite](https://msgsuite.eu.org/) will need to shut down their services.

## 7) You need to store your files on the cloud ?
Here are the best free solutions for you :  

| Name | Storage offered for free | Features and limits | Link |
| :-----: | :-----: | :-----: | :-----: |
| **BayFiles** | 20 Gb per file maximum | No need to signup. The files are stored forever unless it's reported. Check their [FAQ](https://bayfiles.com/faq) for the limits | *https://bayfiles.com* |
| **Mediafire** | 10 Gb of storage (up to 50 Gb with referrals), 4 Gb per file max | Need to create an account. Ads. [FAQ here](https://mediafire.zendesk.com/hc/en-us/) | *https://www.mediafire.com* |
| **Anonfiles** | Same as for BayFiles | It's basically BayFiles on another domain | *https://anonfiles.com* |
| **GoFile** | Unlimited | Still on beta-staging. No need to sign up. Files are deleted after 10 days if they haven't been downloaded. [FAQ](https://gofile.io/faq) | *https://gofile.io/uploadFiles* |
| **Transfer.sh** | Unlimited | Command-Line service. Files stored for 2 weeks. [Open-Source](https://github.com/dutchcoders/transfer.sh) | *https://transfer.sh* |
| **Degoo** | 100 Gb with an account + 500 Gb of theoric referral bonus | The team behind InstaBridge. 1-year timeout of inactivity. Ads | *https://degoo.com/* |
| **LetsUpload** | 15 Gb per file max | Inbuilt search engine. 15 days retention. Can be used as guest | *https://letsupload.io/* |
| **TeraBox** | 1 Tb of storage space, 4 Gb per file/300 files at a time | Get more informations [here](https://www.terabox.com/help-center?from=web_login) | *https://www.terabox.com/* |
| **TeraTransfer** | 50 Gb max for files/folders | Limited open-beta from TeraBox, better check their website for additional informations | *https://www.terabox.com/transfer* |
| **1fichier** | 300 Gb per file, retention of 15-30 days for inactivity, 1 Tb storage if you have an account | Can be used as guest. [FAQ](https://1fichier.info/en/) | *https://1fichier.com/?lg=en* |
| **SubyShare** | Their offer is quite hard to understand, [check that](https://subyshare.com/premium) | Here is their [FAQ](https://subyshare.com/help/faq) | *http://subyshare.com* |
| **WeTransfer** | 2 Gb per file | Link expire after 7 days. [FAQ here](https://wetransfer.zendesk.com/hc/en-us) | *https://wetransfer.com/* |
| **MyAirBridge** | 20 Gb per file max | Can be used as guest. Files no longer exist after 3 days. [FAQ](https://info.myairbridge.com/en/faq) | *https://www.myairbridge.com/en/* |
| **TeraShare** | Unlimited | Kinda the sucessor of ToutBox.fr, uses the torrent protocol. Files under 10 Gb are uploaded to the cloud, above it uses P2P (so keep the file on your computer). Folder support. You need to install the desktop client, but then the web interface can be used (you can check [this](http://terashare.net/technology) for more informations) | *http://terashare.net/* |
| **WormHole** | 5 Gb per file/10 Gb on P2P | Files are kept for 24h. [Infos here](https://wormhole.app/faq) | *https://wormhole.app/* |
| **Smash** | Unlimited | Files available for 7 days. [Check the features page](https://en.fromsmash.com/features) | *https://fromsmash.com/* |
| **SwissTranfer** | 50 Gb per file max | Custom retention date up to 30 days, password protection, ... | *https://www.swisstransfer.com/en* |  

## Sources
+ [Google](https://support.google.com/a/answer/10403871#expand-all)
+ Universities that uses Drive :
  + [NCKU](https://cc.ncku.edu.tw/p/16-1002-218008.php?Lang=en)
  + [Minnesota](https://it.umn.edu/planned-changes/sustainable-storage-program/google-drive-storage-changes)
  + [Northern Iowa](https://it.uni.edu/updates/google-changes-rules-storage-google-workspace-education)
  + [Stanford](https://uit.stanford.edu/service/gsuite/shareddrives)
  + [Alabama](https://www.uah.edu/announcements/16929-google-storage-changes)
  + [a lot of others...](https://www.google.com/search?q=shared+drives+july+2022&sxsrf=ALiCzsaGOQ212uHO3dVClcr6W5zZ0mabMg%3A1652629168902&ved=0ahUKEwi487q06-H3AhUq5IUKHQFpCKYQ4dUDCA4&uact=5&oq=shared+drives+july+2022&sclient=gws-wiz)
+ [HashHackers](https://t.me/HashHackers)

### Keep in touch with me :smiling_face_with_three_hearts:
https://github.com/EDM115
https://t.me/EDM115
