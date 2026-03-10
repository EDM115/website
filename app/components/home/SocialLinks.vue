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
        :aria="`Link to EDM115's ${socialLink.text}`"
      />
    </template>
  </UiTooltip>
</template>

<script setup lang="ts">
import hugeSpotify from "~icons/hugeicons/spotify"
import simpleAppleMusic from "~icons/simple-icons/applemusic"
import simpleBuymeacoffee from "~icons/simple-icons/buymeacoffee"
import simpleDiscord from "~icons/simple-icons/discord"
import simpleDocker from "~icons/simple-icons/docker"
import simpleGithub from "~icons/simple-icons/github"
import simpleInstagram from "~icons/simple-icons/instagram"
import simplePaypal from "~icons/simple-icons/paypal"
import simpleReddit from "~icons/simple-icons/reddit"
import simpleSoundcloud from "~icons/simple-icons/soundcloud"
import simpleSpotify from "~icons/simple-icons/spotify"
import simpleStackOverflow from "~icons/simple-icons/stackoverflow"
import simpleSteam from "~icons/simple-icons/steam"
import simpleTelegram from "~icons/simple-icons/telegram"
import simpleWhatsapp from "~icons/simple-icons/whatsapp"
import simpleX from "~icons/simple-icons/x"
import simpleYoutube from "~icons/simple-icons/youtube"
import uniconsLinkedin from "~icons/uil/linkedin"

const socialLinks = [
  {
    icon: simpleGithub,
    text: "GitHub",
    url: "https://github.com/EDM115",
  },
  {
    icon: simpleTelegram,
    text: "Telegram",
    url: "https://t.me/EDM115",
  },
  {
    icon: simpleDiscord,
    text: "Discord",
    url: "https://discord.com/users/625240117560475658",
  },
  {
    icon: simpleSpotify,
    text: "Spotify",
    url: "https://open.spotify.com/user/6vfix5kti0ri2azoz1map7wg4",
  },
  {
    icon: uniconsLinkedin,
    text: "LinkedIn",
    url: "https://www.linkedin.com/in/edm115/",
  },
  {
    icon: simplePaypal,
    text: "PayPal",
    url: "https://paypal.me/8EDM115",
  },
  {
    icon: simpleBuymeacoffee,
    text: "BuyMeACoffee",
    url: "https://www.buymeacoffee.com/edm115",
  },
  {
    icon: simpleSteam,
    text: "Steam",
    url: "https://steamcommunity.com/id/EDM115/",
  },
  {
    icon: simpleReddit,
    text: "Reddit",
    url: "https://www.reddit.com/user/EDM115",
  },
  {
    icon: simpleX,
    text: "𝕏",
    url: "https://x.com/_EDM115",
  },
  {
    icon: simpleInstagram,
    text: "Instagram",
    url: "https://instagram.com/_edm1.15",
  },
  {
    icon: simpleStackOverflow,
    text: "StackOverflow",
    url: "https://stackoverflow.com/users/18644204",
  },
  {
    icon: simpleWhatsapp,
    text: "WhatsApp",
    url: "https://api.whatsapp.com/send?phone=33667980504",
  },
  {
    icon: simpleDocker,
    text: "Docker Hub",
    url: "https://hub.docker.com/u/edm115",
  },
  {
    icon: hugeSpotify,
    text: "Spotify artist",
    url: "https://open.spotify.com/artist/5O33If0zoso9G3RkEKrERI",
  },
  {
    icon: simpleAppleMusic,
    text: "Apple Music",
    url: "https://music.apple.com/fr/artist/edm115/1716756983",
  },
  {
    icon: simpleSoundcloud,
    text: "SoundCloud",
    url: "https://soundcloud.com/EDM115",
  },
  {
    icon: simpleYoutube,
    text: "YouTube",
    url: "https://youtube.com/@_EDM115",
  },
]
</script>

<style scoped lang="scss">
.socialsIcon {
  margin: 4px;
  transition: all 0.2s ease-in-out;
}

.socialsIcon:hover {
  color: var(--primary);
  transform: scale(1.2);
}
</style>
