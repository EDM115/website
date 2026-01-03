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
- The blog posts written in Markdown, with custom theme, syntax highlighting, multiple plugins (headings anchor links, image lazyload, dynamic table of contents, ...). Posts from my Telegram channel have also been ported here
- Homemade blog posts fuzzy search with tags and date filtering + fast WASM-based keyword search powered by [docfind](https://github.com/microsoft/docfind)
- The projects page actually fetches the repo README at build time and pre-renders it with the above pipeline + some cleanup of GitHub-first Markdown quirks
- The "polychrome" effect on my logo (Balatro inspired) uses multiple layers (glow, color overlay and caustic waves) with usage of Web Workers and WASM for better performance. Check the code to find how to enable the alternative rendering :wink:
- Nice "liquid-esque" effect on the navbar buttons + stylish mobile menu
- The odometers have been created using a personal fork of an existing library to make it smaller and faster
- Every single UI component is custom made. No Vuetify, no Tailwind, no shadcn-vue, ...
- Everything has been optimized for performance and will continue to be !
- A job runs every week to update the Open Source contributions list, as well as another one to check the build status on PRs
- Local fonts with Country Flags polyfill for Windows and custom ligature sets
- Image optimization + lazyloading + progressive quality
- Working Open Graph with dynamically generated custom images at generation time
- Privacy-respectful analytics (Cloudflare Web Analytics) + any click outside of the banner is considered as reject \:)
- 100% Lighthouse score (desktop)
- Automatic redirection of URLs from the v1 website

---

## Contributing
Start :
```zsh
git clone https://github.com/EDM115/website.git && cd website
pnpm i --frozen-lockfile
pnpm install-docfind:linux # or windows
pnpm prebuild
pnpm dev
```

Before commits :
```zsh
pnpm format
pnpm lint:fix
```

Test builds :
```zsh
pnpm build
pnpm start:ssr
```

Test the actual rendered builds :
```zsh
pnpm generate
pnpm start:ssg
```

---

<details>
<summary>Considered additions</summary>

- Mermaid support in markdown-it
- Better GFM support (=> https://github.com/npm/marky-markdown#dependencies & https://github.github.com/gfm/ + https://mdxjs.com/guides/gfm/)

</details>

---

### Status
+ **[Main website](https://edm115.dev) status :** [![Better Uptime Badge](https://betteruptime.com/status-badges/v1/monitor/n6oc.svg)](https://up.edm115.dev/)
<!-- + **[Latest commit preview](https://edm115.netlify.app) status :** ![Netlify Status](https://api.netlify.com/api/v1/badges/6ffb8504-c2c9-4482-a56c-0efd83a3a4d6/deploy-status) -->
+ **[Main website (mirror)](https://edm115.eu.org) status :** [![Better Uptime Badge](https://betteruptime.com/status-badges/v1/monitor/iker.svg)](https://up.edm115.dev/)
+ **[Main website (GitHub Pages mirror)](https://edm115.github.io/website/) status :** [![Better Uptime Badge](https://betteruptime.com/status-badges/v1/monitor/27w6u.svg)](https://up.edm115.dev/)

---

### NGINX setup (on my VPS)
Install NGINX outside of the distro packages (to have the latest version). Ubuntu example : https://nginx.org/en/linux_packages.html#Ubuntu  
Install the needed dynamic module :
```zsh
sudo apt install nginx-module-njs
```
Then start it :
```zsh
sudo systemctl start nginx
sudo systemctl enable --now nginx
```
In `/etc/nginx/nginx.conf` :
```nginx
user  nginx;
worker_processes  auto;

error_log  /var/log/nginx/error.log notice;
pid        /run/nginx.pid;

load_module modules/ngx_http_js_module.so;

events {
    worker_connections  2048;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;
    tcp_nodelay     on;

    keepalive_timeout  30;

    gzip  on;

    include /etc/nginx/sites-available/*;
}
```
In `/etc/nginx/sites-available/default` :
```nginx
js_import blog from /etc/nginx/js/blog.js;
js_set $blog_search_redirect blog.blog_redirect;

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

    location ~ '^/blog(?:/telegram)?/\d{4}(?:/\d{2}(?:/\d{2})?)?/?$' {
        add_header X-Redirect $blog_search_redirect always;
        if ($blog_search_redirect = "") { return 500; }
        return 301 $scheme://$host$blog_search_redirect;
    }

    location / {
        # Redirects to handle the hosted bots
        # Hackish way to get the subdomains working with one IP
#        if ($host ~* ^foudre-vps\.) {
#            proxy_pass http://127.0.0.1:8989;
#            break;
#        }

        if ($host ~* ^jm-vps\.) {
            proxy_pass http://127.0.0.1:9898;
            break;
        }

#       if ($host ~* ^cursedchess-vps\.) {
#            proxy_pass http://127.0.0.1:6969;
#            break;
#        }

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
            break;
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
        try_files $uri $uri/index.html /404.html;
    }
}
```
In `/etc/nginx/js/blog.js` :
```javascript
function pad2(n) { return (n < 10 ? '0' : '') + n; }

function blog_redirect(r) {
  const uri = (r.uri || '').replace(/\/+$/, ''); // strip trailing slash
  const m = uri.match(/^\/blog(\/telegram)?\/(\d{4})(?:\/(\d{2})(?:\/(\d{2}))?)?$/);
  if (!m) {
    r.warn(`blog_redirect: no match for ${uri}`);
    return '/blog'; // safe default to avoid empty Location on 3xx
  }

  const sub = m[1] || '';          // '' or '/telegram'
  const y   = parseInt(m[2], 10);
  const mmS = m[3];                // 'MM' or undefined
  const ddS = m[4];                // 'DD' or undefined
  const base = `/blog${sub}`;

  if (ddS) {
    // /YYYY/MM/DD  -> ?search=at:YYYY-MM-DD
    return `${base}?search=at:${m[2]}-${mmS}-${ddS}`;
  }

  if (mmS) {
    // /YYYY/MM     -> ?search=before:YYYY-(MM+1)+after:YYYY-(MM-1)  (with year rollovers)
    const mm = parseInt(mmS, 10);

    const next = mm === 12 ? { y: y + 1, m: 1  } : { y, m: mm + 1 };
    const prev = mm === 1  ? { y: y - 1, m: 12 } : { y, m: mm - 1 };

    return `${base}?search=before:${next.y}-${pad2(next.m)}+after:${prev.y}-${pad2(prev.m)}`;
  }

  // /YYYY         -> ?search=before:(YYYY+1)+after:(YYYY-1)
  return `${base}?search=before:${y + 1}+after:${y - 1}`;
}

export default { blog_redirect };
```
Finally, set the correct permissions *(assuming that the repo is at `/home/edm115/website` and that it is built)* :
```zsh
sudo find /home/edm115/website/dist -type d -exec chmod 755 {} \;
sudo find /home/edm115/website/dist -type f -exec chmod 644 {} \;
sudo chmod -R 755 /home/edm115/website/dist
sudo chmod -R 755 /home/edm115/website
```
Test and restart :
```zsh
sudo nginx -t
sudo systemctl restart nginx
```
