# `EDM115/website`
Basically my website, hosted at [edm115.dev](https://edm115.dev) ([edm115.eu.org](https://edm115.eu.org) is a backup (also available at [old.edm115.dev](https://old.edm115.dev)), real-time preview of the latest commit at [edm115.netlify.app](https://edm115.netlify.app))

[![DeepSource](https://app.deepsource.com/gh/EDM115/website.svg/?label=active+issues&show_trend=true&token=N0wq5KKIR-8bZ-Jsa88xTbRm)](https://app.deepsource.com/gh/EDM115/website/)  
[![DeepSource](https://app.deepsource.com/gh/EDM115/website.svg/?label=resolved+issues&show_trend=true&token=N0wq5KKIR-8bZ-Jsa88xTbRm)](https://app.deepsource.com/gh/EDM115/website/)

## Contributing
Start :
```bash
git clone https://github.com/EDM115/website.git && cd website
pnpm i --frozen-lockfile
pnpm dev
```

Before commits :
```bash
pnpm lint:fix
pnpm format
```

Test builds :
```bash
pnpm build
pnpm start:ssr
```

Test the actual builds :
```bash
pnpm generate
pnpm start:ssg
```

---

### Status
+ **[Main website](https://edm115.dev) status :** [![Better Uptime Badge](https://betteruptime.com/status-badges/v1/monitor/n6oc.svg)](https://up.edm115.dev/)
+ **[Main website (backup)](https://edm115.eu.org) status :** [![Better Uptime Badge](https://betteruptime.com/status-badges/v1/monitor/iker.svg)](https://up.edm115.dev/)
+ **[Netlify preview](https://edm115.netlify.app) status :** ![Netlify Status](https://api.netlify.com/api/v1/badges/6ffb8504-c2c9-4482-a56c-0efd83a3a4d6/deploy-status)
+ **[Stats](https://stats.edm115.dev/api?username=EDM115&count_private=true&show_icons=true&cache_seconds=1800&bg_color=30,833ab4,fd1d1d,fcb045&include_all_commits=True&title_color=fff&icon_color=fff&border_color=000&text_color=70ffff) status :** [![Better Uptime Badge](https://betteruptime.com/status-badges/v1/monitor/loog.svg)](https://up.edm115.dev/)

---

## NGINX setup (on my VPS)
*(supposing that the repo is at `/home/edm115/website` and that it is built)*  
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

        # Also pass URL params
        if ($host ~* ^next\.) {
            return 301 https://edm115.netlify.app$request_uri;
        }

        root /home/edm115/website/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
}
```
