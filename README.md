# `EDM115/website`
Basically my website, hosted at [edm115.dev](https://edm115.dev), real-time preview of the latest commit at [next.edm115.dev](https://next.edm115.dev)

[![DeepSource - Active issues](https://app.deepsource.com/gh/EDM115/website.svg/?label=active+issues&show_trend=true&token=N0wq5KKIR-8bZ-Jsa88xTbRm)](https://app.deepsource.com/gh/EDM115/website/) [![DeepSource - Resolved issues](https://app.deepsource.com/gh/EDM115/website.svg/?label=resolved+issues&show_trend=true&token=N0wq5KKIR-8bZ-Jsa88xTbRm)](https://app.deepsource.com/gh/EDM115/website/)

---

## Overview
### Technologies used
- Nuxt 4 (Vue 3, Vite 7)
- Typescript
- SCSS
- Markdown-it
- highlight.js
- WASM (assemblyscript)
- Vueuse
- OxLint + EsLint (Stylistic)
- PNPM

### Interesting features
- Static Site Generation (SSG) to ship smaller and faster pages
- Automatic light/dark mode + switch animation
- Automatic EN/FR language detection
- Fully responsive design
- The blog posts written in Markdown, with custom theme, syntax highlighting, multiple plugins (headings anchor links, image lazyload, ...). My posts of my Telegram channel have also been ported here
- Homemade blog posts fuzzy search with tags and date filtering
- The projects page actually fetches the repo README at build time and pre-renders it with the above pipeline + some cleanup of GitHub-first Markdown quirks
- The "polychrome" effect on my logo (Balatro inspired) uses multiple layers (glow, color overlay and caustic waves) with usage of Web Workers and WASM for better performance. Check the code to find how to enable the alternative rendering :wink:
- Nice "liquid-esque" effect on the navbar buttons
- The odometers have been created using a personal fork of an existing library to make it smaller and faster
- Every single UI component is custom made. No Vuetify, no Tailwind, no shadcn-vue, ...
- Everything has been optimized for performance and will continue to be !
- A job runs every week to update the Open Source contributions list, as well as another one to check the build status on PRs
- Local font caching with Country Flags polyfill for Windows
- Image optimization + lazyloading + progressive quality
- Working Open Graph
- Privacy-respectful analytics (Cloudflare Web Analytics) + any click outside of the banner is considered as reject \:)
- 100% Lighthouse score (desktop)
- Automatic redirection of URLs from the v1 website

---

## Contributing
Start :
```bash
git clone https://github.com/EDM115/website.git && cd website
pnpm i --frozen-lockfile
pnpm wasm
pnpm dev
```

Before commits :
```bash
pnpm format
pnpm lint:fix
```

Test builds :
```bash
pnpm build
pnpm start:ssr
```

Test the actual rendered builds :
```bash
pnpm generate
pnpm start:ssg
```

---

### Status
+ **[Main website](https://edm115.dev) status :** [![Better Uptime Badge](https://betteruptime.com/status-badges/v1/monitor/n6oc.svg)](https://up.edm115.dev/)
+ **[Latest commit preview](https://edm115.netlify.app) status :** ![Netlify Status](https://api.netlify.com/api/v1/badges/6ffb8504-c2c9-4482-a56c-0efd83a3a4d6/deploy-status)
+ **[Main website (mirror)](https://edm115.eu.org) status :** [![Better Uptime Badge](https://betteruptime.com/status-badges/v1/monitor/iker.svg)](https://up.edm115.dev/)
+ **[Main website (GitHub Pages mirror)](https://edm115.github.io/website/) status :** [![Better Uptime Badge](https://betteruptime.com/status-badges/v1/monitor/27w6u.svg)](https://up.edm115.dev/)

---

### NGINX setup (on my VPS)
*(assuming that the repo is at `/home/edm115/website` and that it is built)*  
```bash
sudo find /home/edm115/website/dist -type d -exec chmod 755 {} \;
sudo find /home/edm115/website/dist -type f -exec chmod 644 {} \;
sudo chmod -R 755 /home/edm115/website/dist
sudo chmod -R 755 /home/edm115/website
```
In `/etc/nginx/sites-available/default` :
```nginx
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    # Only if you have a certificate
    # Don't forget to also run sudo chmod -R 755 /home/edm115/.secure
    ssl_certificate /home/edm115/.secure/cloudflare-origin-server.pem;
    ssl_certificate_key /home/edm115/.secure/cloudflare-origin-server.key;

    listen 80;
    listen [::]:80;

    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    location / {
        # Redirects to handle the hosted bots
        # Hackish way to get the subdomains working with one IP
        if ($host ~* ^jm-vps\.) {
            proxy_pass http://127.0.0.1:9898;
            break;
        }

        if ($host ~* ^dicewizard-vps\.) {
            proxy_pass http://127.0.0.1:8686;
            break;
        }

        if ($host ~* ^edm115-discord-vps\.) {
            proxy_pass http://127.0.0.1:8888;
            break;
        }

        if ($host ~* ^logs-vps\.) {
            proxy_pass http://127.0.0.1:10000;
            break;
        }

        if ($host ~* ^maps\.) {
            proxy_pass http://127.0.0.1:27400;
        }

        if ($host ~* ^senescalade\.) {
            return 301 https://github.com/EDM115-org/Senescalade;
        }

        # Also pass URL params
        if ($host ~* ^next\.) {
            return 301 https://edm115.netlify.app$request_uri;
        }

        root /home/edm115/website/dist;
        index index.html;
        try_files $uri $uri/index.html /index.html;
    }
}
```
