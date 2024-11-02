---
title: Education to Pro - EDM115 blog
meta:
  - name: description
    content: How I successfully managed to make a Windows Education laptop free from school (so you don't struggle trying to)
---

# How I successfully managed to make a Windows Education laptop free from school (so you don't struggle trying to)
<br>

### Quick backstory
My gf have been given a laptop by her school. When she finished her studies, she was able to keep it. But it was still linked to an education account, managed by Intune/Azure ActiveDirectory and it was Windows Education. Here's how i turned it into a normal Windows machine \:)
<br>

## Prerequisites
The PC has to have an admin session. If you don't, try to find how to make yourself admin \:)
<br>

## Step 1 : The migration
01. Create a new local account and make it admin. Go on Settings => Accounts => Other users and add one. Make sure it's a local account, decline as much as possible any Microsoft related info.
02. Write somewhere all the apps that are installed. Some of them are system-wide but some may be just for the current user.
03. Zip every important folder. Documents, Downloads, Images, ... I also like to zip the Appdata folder just in case.
04. Open a cmd and type `echo %COMPUTERNAME%`. Write this somewhere ! Also your current account is very probably a cloud account, so open the settings and write down the email shown at the top under your username. If it doesn't show up, go on Settings => Accounts => Professional or School access and it should be there. If you close the session by mistake, this email will be the username to enter.
05. Lock the current session but DON'T CLOSE IT ! Connect to the other user, username will be `COMPUTERNAME\username` (backslash is important). Replace with your computer name and the username you have chosen.
06. Copy-paste all the previously zipped files, install any software that isn't present, re-log in if needed.
07. Do `Win + R` and type `systempropertiesadvanced`. Here, click on the "PC Name" tab, Edit, and change the PC name to something more fitting to you (mine is for example `Lenovo-EDM115`).
08. Go back on the previous user and log out after you made sure you backed up anything important (ex browser passwords, apps settings, ...)
09. If you are on Windows Pro, open the Control Panel => BitLocker Drive Encryption => Turn off BitLocker. This will take some time but your drive will be much faster afterwards
<br>

## Step 2 : The unlink
01. Disable Wifi (anything that connects to internet) and restart the PC
02. Once restarted, go on your new user (`UpdatedPcName\ChosenUsername`), and go to Settings => Accounts => Family & other users, and remove it. Go on Settings => Accounts => Professional or School access, click on the account, and disconnect. Now for some weird reason this should remove the existing user account but it doesn't work fully, so go on `C:\Users`. Try to go on the old account and confirm so it grants you the rights. Then go back and delete it.
03. Go on Settings => System => Activation => Change product key option => Change, and enter `VK7JG-NPHTM-C97JM-9MPGT-3V66T` (make sure you're offline !). This is a generic Windows 11 Pro key, so I guess it would be working only if you were on Windows 11 Pro Education. If your system is Windows 11 Education (check in Settings => System => System informations), use `YTMG3-N6DKC-DKB77-7M9GH-8HVX7` instead. Full list can be found at https://www.elevenforum.com/t/generic-product-keys-to-install-or-upgrade-windows-11-editions.3713/
04. Reconnect to the internet, open a PowerShell as admin, and enter `irm https://get.activated.win | iex`, then hit `1`, wait for it to be complete, `Enter`, `0`. You now have a genuine Windows licence.
05. Open the Task Manager (`Ctrl + Shift + Esc`) and close anything related to Intune. Now install Revo Uninstaller and remove softwares that you didn't installed yourself + some Intune related stuff (some are system stuff, if you see anything related to your PC manufacturer/Realtek/AMD/Intel, ..., keep it !). Take also a look at Windows apps, some are hidden there. Make sure you do an advanced scan and check the "Check on all windows accounts" checkbox. Then clean some remaining trash, probably at `C:\Intune`, `C:\Windows\Intune`, and similar folders.
06. Now do `Win + R`, `gpedit.msc`. Go to Computer Configuration => Administrative Templates => All settings, and click on the State column. Double click on anything that is marked as Enabled or Disabled, and select "Not configured".
07. Open a PowerShell as admin, and run the following lines one by one :
```powershell
reg delete "HKCU\Software\Microsoft\Windows\CurrentVersion\Policies" /f
reg delete "HKCU\Software\Microsoft\WindowsSelfHost" /f
reg delete "HKCU\Software\Policies" /f
reg delete "HKLM\Software\Microsoft\Policies" /f
reg delete "HKLM\Software\Microsoft\Windows\CurrentVersion\Policies" /f
reg delete "HKLM\Software\Microsoft\Windows\CurrentVersion\WindowsStore\WindowsUpdate" /f
reg delete "HKLM\Software\Microsoft\WindowsSelfHost" /f
reg delete "HKLM\Software\Policies" /f
reg delete "HKLM\Software\WOW6432Node\Microsoft\Policies" /f
reg delete "HKLM\Software\WOW6432Node\Microsoft\Windows\CurrentVersion\Policies" /f
reg delete "HKLM\Software\WOW6432Node\Microsoft\Windows\CurrentVersion\WindowsStore\WindowsUpdate" /f
reg delete "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Enrollments" /f
```
08. Restart the PC. You should now be able to login with just the username and without specifying the PC name. Open a cmd as admin and run `DSREGCMD /debug /leave` and then `DSREGCMD /debug /cleanupaccounts`. This will do its best to leave linked organizations.
09. Do `Win + R`, `regedit`, and click on `HKEY_CURRENT_USER` (so the search will start from here. click again on this when doing another search). You will now have to search for anything related to "Intune", "Enrollment" or the domain part of your school email that you noted prior (ex if it was `pc123456@school.country.com`, search for `school.country.com`). Delete the keys found (use common sense tho) to remove the last bits of organization links. You can backup the registry before if you think you will mess this up.
<br>

## Step 3 : Final touches and quick remarks
01. Open Windows Update an check for any updates available. Install them and restart as necessary. If some fail to install, it's probably because when on Intune, they restricted which versions could be installed (ex for my gf she could only install cumulative updates of every 3 month). To avoid further issues, open a cmd as admin and run the following (then check for updates again) :
```cmd
net stop wuauserv
net stop cryptSvc
net stop bits
net stop msiserver
rd /SQ "C:\Windows\SoftwareDistribution"
rd /SQ "C:\Windows\System32\catroot2"
net start wuauserv
net start cryptSvc
net start bits
net start msiserver
DISM /Online /Cleanup-Image /CheckHealth
DISM /Online /Cleanup-Image /ScanHealth
DISM /Online /Cleanup-Image /RestoreHealth
sfc /scannow
```
02. If some cumulative updates still fail, or if when doing `Win + R`, `winver` the version is lower than the current actual one (23H2 as I write this, will soon be 24H2), let's do an in-place upgrade. Go at https://www.microsoft.com/en-us/software-download/windows11 => Download Windows 11 Disk Image (ISO) for x64 devices, select the only choice then your language and click on 64-bit download. Once downloaded, right click the .iso => Properties => Check Unblock => Ok. Then do right click => Mount, and it should appear on the left of the file explorer as a DVD. Run `Setup.exe` => Next => Accept => Check that it says "Install Windows 11 (Pro)" and "Keep personal files and apps" (by default) => Install. The PC will be inaccessible and may restart several times. But it's finally over !
03. By now it should be fully unlocked and all settings should be accessible. Maybe go on Settings => Network and Internet => Wi-Fi => Manage known networks and remove anything linked to your school. The only setting that was locked for my gf was to change her lock screen image. To change this, copy-paste the image you want into `C:\Users\Public\Pictures` (avoid any spaces), then `Win + R`, `regedit`, paste on the top bar `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Personalization` and make the key `AllowPersonalization` to 1 (if it doesn't exist right click on Personalization folder => New => DWORD, it's hexadecimal). Then, a folder under should be called `PersonalizationDSP`. Paste the full path of your wanted lock screen background in the String keys `LockScreenImagePath` and `LockScreenImageUrl` (ex : `C:\Users\Public\Pictures\awesome_bg.png`), plus set the DWORD `LockScreenImageStatus` to 1
