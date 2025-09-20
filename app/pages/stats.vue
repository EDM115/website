<template>
  <UiContainer
    id="main-stats"
    style="display:flex; flex-direction: column; gap: 1.5rem; align-items: center; text-align: center; min-width: 90%;"
  >
    <h1>{{ t("stats.title") }}</h1>

    <NuxtImg
      preload
      alt="EDM115's GitHub stats"
      src="https://stats.edm115.dev/api?username=EDM115&show=reviews,discussions_started,discussions_answered,prs_merged,prs_merged_percentage&count_private=true&include_all_commits=true&show_icons=true&bg_color=00040e&title_color=eae7de&icon_color=eae7de&text_color=eae7de&ring_color=ffb86c&hide_border=true&border_radius=20&custom_title=EDM115's%20GitHub%20stats"
      placeholder
      loading="lazy"
    />
    <NuxtImg
      preload
      alt="EDM115's Most used languages"
      src="https://stats.edm115.dev/api/top-langs/?username=EDM115&langs_count=20&layout=compact&bg_color=00040e&title_color=eae7de&icon_color=eae7de&text_color=eae7de&hide_border=true&border_radius=20&custom_title=Most%20used%20languages&size_weight=0.6&count_weight=0.4"
      placeholder
      loading="lazy"
    />
    <NuxtImg
      preload
      alt="EDM115's GitHub stats"
      src="https://raw.githubusercontent.com/EDM115/gs/refs/heads/master/generated/overview.svg"
      placeholder
      loading="lazy"
    />
    <NuxtImg
      preload
      alt="EDM115's Most used languages"
      src="https://raw.githubusercontent.com/EDM115/gs/refs/heads/master/generated/languages.svg"
      placeholder
      loading="lazy"
    />
    <NuxtImg
      preload
      alt="EDM115's GitHub metrics"
      src="https://raw.githubusercontent.com/EDM115/gs2/refs/heads/main/github-metrics.svg"
      placeholder
      loading="lazy"
    />
    <NuxtImg
      preload
      alt="EDM115's WakaTime stats"
      src="https://stats.edm115.dev/api/wakatime?username=EDM115&bg_color=00040e&title_color=ffb86c&icon_color=eae7de&text_color=eae7de&hide_border=true&border_radius=20&custom_title=WakaTime%20stats%20(last%20year)"
      placeholder
      loading="lazy"
    />
    <NuxtImg
      preload
      alt="EDM115's GitHub activity graph"
      src="https://github-readme-activity-graph.vercel.app/graph?username=EDM115&theme=dracula&line=ffb86c&point=bd93f9&area_color=ffb86c&bg_color=00040e&color=eae7de&title_color=eae7de&area=true&hide_border=true&radius=20&custom_title=EDM115's%20contribution%20graph"
      placeholder
      loading="lazy"
    />
    <NuxtImg
      preload
      alt="GitHub streak"
      src="http://github-readme-streak-stats.herokuapp.com/?user=EDM115&theme=dracula&hide_border=true&border_radius=20&date_format=j%20M%5B%20Y%5D&background=00040E&stroke=EAE7DE&ring=FFB86C&fire=FFB86C&currStreakNum=BD93F9&sideNums=BD93F9&currStreakLabel=EAE7DE&sideLabels=EAE7DE&dates=FF79C6"
      placeholder
      loading="lazy"
    />
    <NuxtImg
      preload
      alt="Spotify activity"
      src="https://spotify-github-profile.kittinanx.com/api/view?uid=6vfix5kti0ri2azoz1map7wg4&cover_image=true&theme=default&show_offline=true&background_color=00040e&interchange=true&bar_color=ffb86c&bar_color_cover=false"
      placeholder
      loading="lazy"
    />
    <NuxtImg
      preload
      alt="Discord presence"
      src="https://lanyard.cnrad.dev/api/625240117560475658?borderRadius=20px&bg=00040e&idleMessage=No%20RPC%20activity%20detected&showDisplayName=true&theme=dark"
      placeholder
      loading="lazy"
    />
    <NuxtImg
      preload
      alt="GitHub trophy"
      src="https://github-profile-trophy.vercel.app/?username=EDM115&theme=dracula&no-bg=true&no-frame=true"
      placeholder
      loading="lazy"
    />
  </UiContainer>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>

<style lang="scss">
#main-stats img {
  width: 75%;
}
</style>
