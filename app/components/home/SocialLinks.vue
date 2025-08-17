<template>
  <UiTooltip
    v-for="socialLink in socialLinks"
    :key="socialLink.text"
    location="top"
    :text="socialLink.text"
  >
    <template #activator="{ props }">
      <UiButton
        v-bind="props"
        :icon="socialLink.icon"
        class="socialsIcon"
        :link="socialLink.url"
        variant="flat"
      />
    </template>
  </UiTooltip>
</template>

<script setup lang="ts">
import hugeIconsSpotify from "~icons/hugeicons/spotify"
import icBaselineDiscord from "~icons/ic/baseline-discord"
import icBaselineTelegram from "~icons/ic/baseline-telegram"
import mdiDevTo from "~icons/mdi/devTo"
import mdiDocker from "~icons/mdi/docker"
import mdiGithub from "~icons/mdi/github"
import mdiInstagram from "~icons/mdi/instagram"
import mdiLinkedin from "~icons/mdi/linkedin"
import mdiPaypal from "~icons/mdi/paypal"
import mdiReddit from "~icons/mdi/reddit"
import mdiSoundcloud from "~icons/mdi/soundcloud"
import mdiSpotify from "~icons/mdi/spotify"
import mdiStackOverflow from "~icons/mdi/stackOverflow"
import mdiWhatsapp from "~icons/mdi/whatsapp"
import mdiYoutube from "~icons/mdi/youtube"
import pajamasTwitter from "~icons/pajamas/twitter"
import phGitlab from "~icons/ph/gitlab-logo"
import simpleIconsAppleMusic from "~icons/simple-icons/applemusic"
import simpleIconsBuymeacoffee from "~icons/simple-icons/buymeacoffee"
import simpleIconsHackthebox from "~icons/simple-icons/hackthebox"
import simpleIconsRootme from "~icons/simple-icons/rootme"

const socialLinks = ref([
  {
    icon: mdiGithub,
    text: "GitHub",
    url: "https://github.com/EDM115",
  },
  {
    icon: icBaselineTelegram,
    text: "Telegram",
    url: "https://t.me/EDM115",
  },
  {
    icon: icBaselineDiscord,
    text: "Discord",
    url: "https://discord.com/users/625240117560475658",
  },
  {
    icon: mdiSpotify,
    text: "Spotify",
    url: "https://open.spotify.com/user/6vfix5kti0ri2azoz1map7wg4",
  },
  {
    icon: mdiLinkedin,
    text: "LinkedIn",
    url: "https://www.linkedin.com/in/edm115/",
  },
  {
    icon: mdiPaypal,
    text: "PayPal",
    url: "https://paypal.me/8EDM115",
  },
  {
    icon: simpleIconsBuymeacoffee,
    text: "BuyMeACoffee",
    url: "https://www.buymeacoffee.com/edm115",
  },
  {
    icon: mdiReddit,
    text: "Reddit",
    url: "https://www.reddit.com/user/EDM115",
  },
  {
    icon: pajamasTwitter,
    text: "𝕏",
    url: "https://x.com/_EDM115",
  },
  {
    icon: mdiInstagram,
    text: "Instagram",
    url: "https://instagram.com/_edm1.15",
  },
  {
    icon: mdiStackOverflow,
    text: "StackOverflow",
    url: "https://stackoverflow.com/users/18644204",
  },
  {
    icon: phGitlab,
    text: "GitLab",
    url: "https://gitlab.com/EDM115",
  },
  {
    icon: mdiWhatsapp,
    text: "WhatsApp",
    url: "https://api.whatsapp.com/send?phone=33667980504",
  },
  {
    icon: mdiDevTo,
    text: "Dev.to",
    url: "https://dev.to/edm115",
  },
  {
    icon: mdiDocker,
    text: "Docker Hub",
    url: "https://hub.docker.com/u/edm115",
  },
  {
    icon: simpleIconsRootme,
    text: "RootMe",
    url: "https://www.root-me.org/EDM115?inc=info&lang=en",
  },
  {
    icon: simpleIconsHackthebox,
    text: "HackTheBox",
    url: "https://app.hackthebox.com/profile/975408",
  },
  {
    icon: hugeIconsSpotify,
    text: "Spotify artist",
    url: "https://open.spotify.com/artist/5O33If0zoso9G3RkEKrERI",
  },
  {
    icon: simpleIconsAppleMusic,
    text: "Apple Music",
    url: "https://music.apple.com/fr/artist/edm115/1716756983",
  },
  {
    icon: mdiSoundcloud,
    text: "SoundCloud",
    url: "https://soundcloud.com/EDM115",
  },
  {
    icon: mdiYoutube,
    text: "YouTube",
    url: "https://youtube.com/@_EDM115",
  },
])
</script>

<style scoped>
.socialsIcon {
  margin: 4px;
  transition: all 0.2s ease-in-out;
}

.socialsIcon:hover {
  color: var(--primary);
  transform: scale(1.2);
}
</style>
