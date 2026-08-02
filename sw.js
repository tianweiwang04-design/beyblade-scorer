/* 陀螺對戰計分板 — Service Worker
   應用本體離線可開；零件照片看過一次之後也會留在裝置上 */

const VERSION = 'v1';
const SHELL   = 'bey-shell-' + VERSION;   // 應用本體
const PHOTOS  = 'bey-photos-' + VERSION;  // 零件照片（第三方圖床）
const PHOTO_LIMIT = 900;                  // 照片快取上限，避免無限長大

const SHELL_FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(SHELL)
      .then(c => c.addAll(SHELL_FILES))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())   // 少一個檔也不要卡住安裝
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== SHELL && k !== PHOTOS).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

/* 照片快取滿了就丟掉最舊的 */
async function trim(cacheName, limit) {
  const c = await caches.open(cacheName);
  const keys = await c.keys();
  if (keys.length <= limit) return;
  for (const k of keys.slice(0, keys.length - limit)) await c.delete(k);
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  /* 零件照片：先給快取、背景更新 */
  if (url.hostname === 'i.ibb.co') {
    e.respondWith((async () => {
      const c = await caches.open(PHOTOS);
      const hit = await c.match(req);
      const net = fetch(req).then(res => {
        if (res && (res.ok || res.type === 'opaque')) {
          c.put(req, res.clone()).then(() => trim(PHOTOS, PHOTO_LIMIT));
        }
        return res;
      }).catch(() => null);
      return hit || (await net) || Response.error();
    })());
    return;
  }

  if (url.origin !== self.location.origin) return;

  /* 進入頁面：先連網拿最新版，失敗才用快取 —— 更新才不會卡住 */
  if (req.mode === 'navigate') {
    e.respondWith((async () => {
      try {
        const res = await fetch(req);
        const c = await caches.open(SHELL);
        c.put('./index.html', res.clone());
        return res;
      } catch (err) {
        const c = await caches.open(SHELL);
        return (await c.match(req)) || (await c.match('./index.html')) ||
               new Response('離線且尚未快取', { status: 503 });
      }
    })());
    return;
  }

  /* 其餘同源檔案：先給快取 */
  e.respondWith((async () => {
    const c = await caches.open(SHELL);
    const hit = await c.match(req);
    if (hit) return hit;
    try {
      const res = await fetch(req);
      if (res && res.ok) c.put(req, res.clone());
      return res;
    } catch (err) {
      return new Response('', { status: 504 });
    }
  })());
});
