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
- Blog posts written in Markdown, with custom theme, syntax highlighting, multiple plugins (headings anchor links, image lazyload, dynamic table of contents, ...). Posts from my Telegram channel have also been ported here
- Homemade blog posts fuzzy search with tags and date filtering + fast WASM-based keyword & full-text search powered by [docfind](https://github.com/microsoft/docfind) and [pagefind](https://pagefind.app/)
- The projects page actually fetches the repo README at build time and pre-renders it with the above pipeline + some cleanup of GitHub-first Markdown quirks
- The "polychrome" effect on my logo (Balatro inspired) uses multiple layers (glow, color overlay and caustic waves) with usage of Web Workers and WASM for better performance. Check the code to find how to enable the alternative rendering :wink:
- Nice "liquid-esque" effect on the navbar buttons + stylish mobile menu
- The odometers have been created using a personal fork of an existing library to make it smaller and faster
- Every single UI component is custom made. No Vuetify, no Tailwind, no shadcn-vue, ...
- Everything has been optimized for performance and will continue to be !
- A job runs every week to update the Open Source contributions list, as well as another one to check the build status on PRs
- Local fonts with Country Flags polyfill for Windows and custom ligature sets
- Image optimization + lazyloading + progressive quality
- Working Open Graph with dynamically generated custom images at build time
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
- **[Main website](https://edm115.dev) status :** [![Better Uptime Badge](https://betteruptime.com/status-badges/v1/monitor/n6oc.svg)](https://up.edm115.dev/)
- **[Latest commit preview](https://edm115.netlify.app) status :** ![Netlify Status](https://api.netlify.com/api/v1/badges/6ffb8504-c2c9-4482-a56c-0efd83a3a4d6/deploy-status)
- **[Main website (mirror)](https://edm115.eu.org) status :** [![Better Uptime Badge](https://betteruptime.com/status-badges/v1/monitor/iker.svg)](https://up.edm115.dev/)
- **[Main website (GitHub Pages mirror)](https://edm115.github.io/website/) status :** [![Better Uptime Badge](https://betteruptime.com/status-badges/v1/monitor/27w6u.svg)](https://up.edm115.dev/)

---

### NGINX setup (on my VPS)
Install NGINX outside of the distro packages (to have the latest version). Ubuntu example : https://nginx.org/en/linux_packages.html#Ubuntu  
Install the needed dynamic module :
```zsh
sudo apt install nginx-module-njs
```
Prepare for Brotli compression (optional but recommended) :
```zsh
sudo apt install brotli build-essential git ca-certificates wget libpcre2-dev zlib1g-dev libssl-dev
# Get NGINX's version
nginx -V  # here 1.28.2, note the flags
mkdir -p /tmp/nginx-brotli-build
cd /tmp/nginx-brotli-build
wget http://nginx.org/download/nginx-1.28.2.tar.gz
tar xf nginx-1.28.2.tar.gz
git clone https://github.com/google/ngx_brotli.git
cd ngx_brotli
git submodule update --init --recursive
cd ..
# Run configure with the EXACT flags you had, plus the brotli module on top
# Check for "adding module in /tmp/nginx-brotli-build/ngx_brotli" & "+ ngx_brotli was configured" in the output. Example :
cd /tmp/nginx-brotli-build/nginx-1.28.2
./configure \
  --prefix=/etc/nginx \
  --sbin-path=/usr/sbin/nginx \
  --modules-path=/usr/lib/nginx/modules \
  --conf-path=/etc/nginx/nginx.conf \
  --error-log-path=/var/log/nginx/error.log \
  --http-log-path=/var/log/nginx/access.log \
  --pid-path=/run/nginx.pid \
  --lock-path=/run/nginx.lock \
  --http-client-body-temp-path=/var/cache/nginx/client_temp \
  --http-proxy-temp-path=/var/cache/nginx/proxy_temp \
  --http-fastcgi-temp-path=/var/cache/nginx/fastcgi_temp \
  --http-uwsgi-temp-path=/var/cache/nginx/uwsgi_temp \
  --http-scgi-temp-path=/var/cache/nginx/scgi_temp \
  --user=nginx \
  --group=nginx \
  --with-compat \
  --with-file-aio \
  --with-threads \
  --with-http_addition_module \
  --with-http_auth_request_module \
  --with-http_dav_module \
  --with-http_flv_module \
  --with-http_gunzip_module \
  --with-http_gzip_static_module \
  --with-http_mp4_module \
  --with-http_random_index_module \
  --with-http_realip_module \
  --with-http_secure_link_module \
  --with-http_slice_module \
  --with-http_ssl_module \
  --with-http_stub_status_module \
  --with-http_sub_module \
  --with-http_v2_module \
  --with-http_v3_module \
  --with-mail \
  --with-mail_ssl_module \
  --with-stream \
  --with-stream_realip_module \
  --with-stream_ssl_module \
  --with-stream_ssl_preread_module \
  --with-cc-opt='-g -O2 -fno-omit-frame-pointer -mno-omit-leaf-frame-pointer -ffile-prefix-map=/home/builder/debuild/nginx-1.28.2/debian/debuild-base/nginx-1.28.2=. -flto=auto -ffat-lto-objects -fstack-protector-strong -fstack-clash-protection -Wformat -Werror=format-security -fcf-protection -fdebug-prefix-map=/home/builder/debuild/nginx-1.28.2/debian/debuild-base/nginx-1.28.2=/usr/src/nginx-1.28.2-1~noble -fPIC' \
  --with-ld-opt='-Wl,-Bsymbolic-functions -flto=auto -ffat-lto-objects -Wl,-z,relro -Wl,-z,now -Wl,--as-needed -pie' \
  --add-dynamic-module=/tmp/nginx-brotli-build/ngx_brotli
make modules
# Install the files
sudo cp objs/ngx_http_brotli_filter_module.so /usr/lib/nginx/modules/
sudo cp objs/ngx_http_brotli_static_module.so /usr/lib/nginx/modules/
```
> [!CAUTION]  
> You will need to redo all that on **each NGINX update** !

Then start NGINX :
```zsh
sudo systemctl start nginx
sudo systemctl enable --now nginx
```

#### `/etc/nginx/nginx.conf`
```nginx
user nginx;
worker_processes auto;
worker_rlimit_nofile 65535;

error_log /var/log/nginx/error.log notice;
pid       /run/nginx.pid;

load_module modules/ngx_http_js_module.so;
# Only if you built Brotli support
load_module modules/ngx_http_brotli_filter_module.so;
load_module modules/ngx_http_brotli_static_module.so;

events {
  worker_connections 2048;
}


http {
  include      /etc/nginx/mime.types;
  default_type application/octet-stream;

  log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                  '$status $body_bytes_sent "$http_referer" '
                  '"$http_user_agent" "$http_x_forwarded_for"';

  access_log /var/log/nginx/access.log main;

  sendfile        on;
  # tcp_nopush    on;
  tcp_nodelay     on;

  keepalive_timeout 30;

  gzip on;
  gzip_vary on;
  # Only if Brotli is available
  brotli on;
  brotli_static on;
  brotli_comp_level 6;
  brotli_types
    text/plain
    text/css
    # text/html
    text/xml
    application/xml
    application/json
    application/javascript
    image/svg+xml;
  #

  server_tokens off;

  # pcre_jit on;

  include /etc/nginx/sites-available/*;
}
```

#### `/etc/nginx/snippets/ssl-cloudflare-origin.conf`
```nginx
ssl_certificate     /home/edm115/.secure/cloudflare-origin-server.pem;
ssl_certificate_key /home/edm115/.secure/cloudflare-origin-server.key;
```

#### `/etc/nginx/snippets/proxy-common.conf`
```nginx
proxy_http_version 1.1;

proxy_set_header Host              $host;
proxy_set_header X-Real-IP         $remote_addr;
proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
proxy_set_header X-Forwarded-Host  $host;

proxy_connect_timeout 10s;
proxy_send_timeout    60s;
proxy_read_timeout    60s;
```

#### `/etc/nginx/snippets/static-edm115-site.conf`
```nginx
root /home/edm115/website/dist;
index index.html;

location ^~ /_nuxt/ {
  try_files $uri =404;

  expires 1d;
  add_header Cache-Control "public, max-age=86400" always;

  access_log off;
  log_not_found off;
}

location ~* \.(?:js|mjs|css|map|json|txt|xml|webmanifest|png|jpe?g|gif|webp|avif|svg|ico|woff2?|ttf|otf|eot)$ {
  try_files $uri =404;

  expires 1d;
  add_header Cache-Control "public, max-age=86400" always;

  access_log off;
  log_not_found off;
}

location = /index.html {
  try_files $uri =404;
  add_header Cache-Control "no-cache, must-revalidate" always;
}

location ~* \.html$ {
  try_files $uri =404;
  add_header Cache-Control "no-cache, must-revalidate" always;
}

location / {
  try_files $uri $uri/ /404.html;
}
```

#### `/etc/nginx/sites-available/00-http-redirect.conf`
```nginx
server {
  listen 80;
  listen [::]:80;
  server_name edm115.dev *.edm115.dev;

  return 301 https://$host$request_uri;
}
```

#### `/etc/nginx/sites-available/10-edm115-static.conf`
```nginx
js_import blog from /etc/nginx/js/blog.js;
js_set $blog_search_redirect blog.blog_redirect;

server {
  listen 443 ssl;
  listen [::]:443 ssl;
  http2 on;

  server_name edm115.dev www.edm115.dev;
  include /etc/nginx/snippets/ssl-cloudflare-origin.conf;

  include /etc/nginx/mime.types;
  default_type application/octet-stream;

  location ~ '^/blog(?:/telegram)?/\d{4}(?:/\d{2}(?:/\d{2})?)?/?$' {
    add_header X-Redirect $blog_search_redirect always;

    if ($blog_search_redirect = "") {
      return 500;
    }

    return 301 $scheme://$host$blog_search_redirect;
  }

  include /etc/nginx/snippets/static-edm115-site.conf;
}
```

#### `/etc/nginx/sites-available/20-proxies.conf`
```nginx
# jm-vps.edm115.dev -> :9898
server {
  listen 443 ssl;
  listen [::]:443 ssl;
  http2 on;
  server_name jm-vps.edm115.dev;
  include /etc/nginx/snippets/ssl-cloudflare-origin.conf;

  location / {
    include /etc/nginx/snippets/proxy-common.conf;
    proxy_pass http://127.0.0.1:9898;
  }
}

# dicewizard-vps.edm115.dev -> :8686
server {
  listen 443 ssl;
  listen [::]:443 ssl;
  http2 on;
  server_name dicewizard-vps.edm115.dev;
  include /etc/nginx/snippets/ssl-cloudflare-origin.conf;

  location / {
    include /etc/nginx/snippets/proxy-common.conf;
    proxy_pass http://127.0.0.1:8686;
  }
}

# edm115-discord-vps.edm115.dev -> :8888
server {
  listen 443 ssl;
  listen [::]:443 ssl;
  http2 on;
  server_name edm115-discord-vps.edm115.dev;
  include /etc/nginx/snippets/ssl-cloudflare-origin.conf;

  location / {
    include /etc/nginx/snippets/proxy-common.conf;
    proxy_pass http://127.0.0.1:8888;
  }
}

# logs-vps.edm115.dev -> :10000
server {
  listen 443 ssl;
  listen [::]:443 ssl;
  http2 on;
  server_name logs-vps.edm115.dev;
  include /etc/nginx/snippets/ssl-cloudflare-origin.conf;

  location / {
    include /etc/nginx/snippets/proxy-common.conf;
    proxy_pass http://127.0.0.1:10000;
  }
}

# maps.edm115.dev -> :27400
server {
  listen 443 ssl;
  listen [::]:443 ssl;
  http2 on;
  server_name maps.edm115.dev;
  include /etc/nginx/snippets/ssl-cloudflare-origin.conf;

  location / {
    include /etc/nginx/snippets/proxy-common.conf;
    proxy_pass http://127.0.0.1:27400;
  }
}

# spendly.edm115.dev -> :60000
server {
  listen 443 ssl;
  listen [::]:443 ssl;
  http2 on;
  server_name spendly.edm115.dev;
  include /etc/nginx/snippets/ssl-cloudflare-origin.conf;

  location / {
    include /etc/nginx/snippets/proxy-common.conf;
    proxy_pass http://127.0.0.1:60000;
  }
}

# senescalade.edm115.dev -> github redirect
server {
  listen 443 ssl;
  listen [::]:443 ssl;
  http2 on;
  server_name senescalade.edm115.dev;
  include /etc/nginx/snippets/ssl-cloudflare-origin.conf;

  return 301 https://github.com/EDM115-org/Senescalade;
}

# next.edm115.dev -> netlify redirect
server {
  listen 443 ssl;
  listen [::]:443 ssl;
  http2 on;
  server_name next.edm115.dev;
  include /etc/nginx/snippets/ssl-cloudflare-origin.conf;

  return 301 https://edm115.netlify.app$request_uri;
}

## defunct services
# foudre-vps.edm115.dev -> :8989
# cursedchess-vps.edm115.dev -> :6969
# trackfit.edm115.dev -> :56000
# trackfit-api.edm115.dev -> :56001
```

#### `/etc/nginx/sites-available/99-catchall-ssl.conf`
```nginx
# Catch-all requests, can be used for unparked subdomains or redirect old URLs
server {
  listen 443 ssl default_server;
  listen [::]:443 ssl default_server;
  http2 on;
  server_name _;

  include /etc/nginx/snippets/ssl-cloudflare-origin.conf;

  return 301 https://edm115.dev;
}
```

#### `/etc/nginx/js/blog.js`
```javascript
function pad2(n) {
  return (
    n < 10
      ? "0"
      : ""
    ) + n
}

function blog_redirect(r) {
  // strip trailing slash
  const uri = (r.uri || "").replace(/\/+$/, "")
  const m = uri.match(/^\/blog(\/telegram)?\/(\d{4})(?:\/(\d{2})(?:\/(\d{2}))?)?$/)

  if (!m) {
    r.warn(`blog_redirect : no match for ${uri}`)

    // safe default to avoid empty Location on 3xx
    return "/blog"
  }

  // "" or "/telegram"
  const sub = m[1] || ""
  const y = parseInt(m[2], 10)
  // "MM" or undefined
  const mmS = m[3]
  // "DD" or undefined
  const ddS = m[4]
  const base = `/blog${sub}`

  if (ddS) {
    // /YYYY/MM/DD -> ?search=at:YYYY-MM-DD
    return `${base}?search=at:${m[2]}-${mmS}-${ddS}`
  }

  if (mmS) {
    // /YYYY/MM -> ?search=before:YYYY-(MM+1)+after:YYYY-(MM-1)  (with year rollovers)
    const mm = parseInt(mmS, 10)

    const next = mm === 12
      ? {
          y: y + 1,
          m: 1,
        }
      : {
          y,
          m: mm + 1,
        }
    const prev = mm === 1
      ? {
          y: y - 1,
          m: 12,
        }
      : {
          y,
          m: mm - 1,
        }

    return `${base}?search=before:${next.y}-${pad2(next.m)}+after:${prev.y}-${pad2(prev.m)}`
  }

  // /YYYY -> ?search=before:(YYYY+1)+after:(YYYY-1)
  return `${base}?search=before:${y + 1}+after:${y - 1}`
}

export default { blog_redirect }
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
