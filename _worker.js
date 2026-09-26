// ═══════════════════════════════════════════════════════════════
//  AMBER ROOM · Secure Gallery System & Animated Logo (Ultra Pro)
// ═══════════════════════════════════════════════════════════════

// --- 1. SHA-256 Hash Function for Secure Passwords ---
async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// --- 2. Logo & Branding Assets ---
const LOGO_MARK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Gallery Logo" class="logo-svg"><rect width="64" height="64" rx="14" fill="#070B12"/><path class="m-back" d="M19.57 52.57V24.29C19.57 15.29 26.86 8 35.86 8C44.85 8 52.14 15.29 52.14 24.29V52.57Z" fill="none" stroke="#2E4A66" stroke-width="1.4"/><path class="m-front" d="M11.86 56V27.71C11.86 18.72 19.15 11.43 28.14 11.43C37.14 11.43 44.43 18.72 44.43 27.71V56Z" fill="#070B12" stroke="#BFE9FF" stroke-width="2" pathLength="1"/><path class="m-photo" d="M14.86 53V27.71C14.86 20.38 20.81 14.43 28.14 14.43C35.48 14.43 41.43 20.38 41.43 27.71V53Z" fill="#8FD3F4"/><path class="m-sun" d="M37.57 28.57C37.57 30.47 36.04 32 34.14 32C32.25 32 30.71 30.47 30.71 28.57C30.71 26.68 32.25 25.14 34.14 25.14C36.04 25.14 37.57 26.68 37.57 28.57Z" fill="#DC143C"/><path class="m-far" d="M14.86 44C20 37.14 25.14 35.43 30.29 39.71C34.57 43.14 38 41.43 38V53H14.86Z" fill="#4FA3D1"/><path class="m-near" d="M14.86 53V46.57C20.86 43.14 26.86 44.86 32 48.29C35.43 50.43 38.86 49.14 41.43 47.43V53Z" fill="#123A5E"/></svg>`;

const LOGO_CSS = `
.logo-svg { display:block; width:100%; height:100%; filter:drop-shadow(0 15px 25px rgba(0,0,0,0.6)); }
.logo-svg .m-front { stroke-dasharray:1; animation:lg-draw 1.2s cubic-bezier(0.2,0.8,0.2,1) both; }
.logo-svg .m-back { animation:lg-slide 1s 0.3s cubic-bezier(0.2,0.8,0.2,1) both; }
.logo-svg .m-photo { animation:lg-fade 0.6s 0.7s ease-out both; }
.logo-svg .m-far, .logo-svg .m-near, .logo-svg .m-sun { transform-box:fill-box; }
.logo-svg .m-far, .logo-svg .m-near { transform-origin:50% 100%; }
.logo-svg .m-sun { transform-origin:50% 50%; }
.logo-svg .m-far { animation:lg-grow 0.8s 0.9s cubic-bezier(0.2,0.8,0.2,1) both, lg-breathe 5s 2.6s ease-in-out infinite; }
.logo-svg .m-near { animation:lg-grow 0.8s 1.1s cubic-bezier(0.2,0.8,0.2,1) both, lg-breathe 4s 2.8s ease-in-out infinite; }
.logo-svg .m-sun { animation:lg-rise 1s 1.3s cubic-bezier(0.2,0.8,0.2,1) both, lg-glow 4s 2.4s ease-in-out infinite; }

@keyframes lg-draw { from { stroke-dashoffset:1; } to { stroke-dashoffset:0; } }
@keyframes lg-slide { from { opacity:0; transform:translateX(-6px); } to { opacity:1; transform:none; } }
@keyframes lg-fade { from { opacity:0; } to { opacity:1; } }
@keyframes lg-grow { from { opacity:0; transform:scaleY(0.3); } to { opacity:1; transform:none; } }
@keyframes lg-breathe { 0%, 100% { transform:scaleY(1); } 50% { transform:scaleY(1.06); } }
@keyframes lg-rise { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:none; } }
@keyframes lg-glow { 0%, 100% { transform:scale(1); } 50% { transform:scale(1.12); } }
@media (prefers-reduced-motion:reduce) { .logo-svg * { animation:none !important; } }

.logo { display:flex; flex-direction:column; align-items:center; box-sizing:border-box; width:100%; text-align:center; padding: 10px 0; background:transparent; border:none; }
.logo .wm { font:400 clamp(20px, 6vw, 34px)/1 'GFS Baskerville',Baskerville,Georgia,serif; letter-spacing:0.25em; margin-right:-0.25em; color:#E8F7FF; text-shadow:0 4px 10px rgba(0,0,0,0.8); text-transform:uppercase; white-space:nowrap; margin-bottom: 8px; }
.logo .sub { font:500 13px/1 system-ui,-apple-system,sans-serif; letter-spacing:0.5em; margin-right:-0.5em; color:#DC143C; text-transform:uppercase; opacity:0.95; margin-bottom: 25px; text-shadow:0 2px 5px rgba(0,0,0,0.5); }
.logo .by { display:flex; flex-direction:column; align-items:center; gap:6px; width: 100%; animation:lg-fade 1s 2s ease-out both; }
.logo .by::before { content:""; display:block; width:60px; height:1px; background:rgba(143,211,244,0.3); margin:0 auto 6px; }
.logo .by-text { font:400 9px/1 system-ui,-apple-system,sans-serif; letter-spacing:0.3em; margin-right:-0.3em; color:#8FD3F4; text-transform:uppercase; opacity:0.9; }
.logo .by-name { font:500 14px/1.2 system-ui,-apple-system,sans-serif; letter-spacing:0.15em; color:#FFFFFF; text-transform:uppercase; text-shadow:0 2px 10px rgba(0,0,0,0.8); }

@media (max-width: 768px) {
  .logo .by-text { font-size: 8px; }
  .logo .by-name { font-size: 12px; }
}
`;

const logoHTML = (title, subtitle, showName = true) => `
<div class="logo">
  <div style="width: 140px; height: 140px; margin: 0 auto 15px;">
    ${LOGO_MARK}
  </div>
  <div class="wm">${title}</div>
  <div class="sub">${subtitle}</div>
  ${showName ? `
  <div class="by">
    <span class="by-text">Created by</span>
    <span class="by-name">Thiha Aung (Yone Man)</span>
  </div>` : ""}
</div>`;

function serveLogoAssets(url) {
  if (url.pathname !== "/favicon.svg") return null;
  return new Response(LOGO_MARK, {
    headers: {
      "content-type": "image/svg+xml; charset=utf-8",
      "cache-control": "public, max-age=86400",
    },
  });
}

// --- 3. Security Headers Helper ---
function getSecureHeaders(extraHeaders = {}) {
  return new Headers({
    'Content-Type': 'text/html; charset=utf-8',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Content-Security-Policy': "default-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com https://fonts.gstatic.com data: blob:;",
    ...extraHeaders
  });
}

// ═══════════════════════════════════════════════════════════════
// WORKER MAIN EXPORT (ES MODULE SYNTAX)
// ═══════════════════════════════════════════════════════════════

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const albumQuery = url.searchParams.get('album');

    // Fetch dynamic titles from KV
    const siteTitle = await env.CONFIG_KV.get('SITE_TITLE') || 'AMBER';
    const siteSubtitle = await env.CONFIG_KV.get('SITE_SUBTITLE') || 'ROOM';

    const actualPassword = await env.CONFIG_KV.get('PASSWORD') || 'admin123';
    const secureHash = await sha256(actualPassword + "_amber_secure");

    // 0. Serve Favicon
    const asset = serveLogoAssets(url);
    if (asset) return asset;

    // 1. Serve Images securely from R2
    if (url.pathname.startsWith('/cdn/')) {
      const authCookie = request.headers.get('Cookie') || '';
      
      if (!authCookie.includes(`auth=${secureHash}`)) {
        return new Response('Unauthorized', { status: 401 });
      }

      const key = decodeURIComponent(url.pathname.substring(5));
      const object = await env.GALLERY_BUCKET.get(key);
      if (!object) return new Response('Not found', { status: 404 });
      
      const headers = new Headers();
      object.writeHttpMetadata(headers);
      headers.set('etag', object.httpEtag);
      headers.set('Cache-Control', 'public, max-age=31536000, immutable'); 
      return new Response(object.body, { headers });
    }

    // 2. PWA Assets (Optimized for all platforms)
    if (url.pathname === '/manifest.json') {
      const manifest = {
        name: siteTitle + " " + siteSubtitle,
        short_name: siteTitle, 
        start_url: "/",
        scope: "/",
        display: "standalone",
        background_color: "#04070a", 
        theme_color: "#04070a",
        orientation: "any",
        icons: [
          { src: "/favicon.svg", sizes: "192x192 512x512", type: "image/svg+xml", purpose: "any maskable" }
        ]
      };
      return new Response(JSON.stringify(manifest), { headers: { 'Content-Type': 'application/manifest+json; charset=utf-8' } });
    }

    // 3. Service Worker
    if (url.pathname === '/sw.js') {
      const swCode = `
        const CACHE_NAME = 'amber-room-v6';
        const ASSETS = ['/', '/manifest.json', '/favicon.svg'];
        
        self.addEventListener('install', (e) => {
          self.skipWaiting();
          e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
        });
        
        self.addEventListener('activate', (e) => {
          e.waitUntil(clients.claim());
          e.waitUntil(caches.keys().then(keys => Promise.all(
            keys.map(k => { if(k !== CACHE_NAME) return caches.delete(k); })
          )));
        });
        
        self.addEventListener('fetch', (e) => {
          if (e.request.method !== 'GET' || e.request.url.includes('/cdn/') || e.request.url.includes('api=true')) return;
          e.respondWith(
            fetch(e.request).catch(() => caches.match(e.request).then(res => res || new Response('Offline - Please connect to internet', {status: 503})))
          );
        });
      `;
      return new Response(swCode, { headers: { 'Content-Type': 'application/javascript; charset=utf-8' } });
    }

    // 4. Auth & Logout Handling
    const cookies = request.headers.get('Cookie') || '';
    const isAuthenticated = cookies.includes(`auth=${secureHash}`);

    if (url.pathname === '/logout') {
      return new Response('Logged out', {
        status: 302,
        headers: getSecureHeaders({
          'Location': '/',
          'Set-Cookie': `auth=; HttpOnly; Path=/; Max-Age=0; Secure; SameSite=Strict`
        })
      });
    }

    // Brute-Force Protection Login handling
    if (url.pathname === '/login') {
      const ip = request.headers.get('cf-connecting-ip') || 'unknown';
      const attemptKey = `rate_limit:${ip}`;

      if (request.method === 'POST') {
        let attempts = parseInt(await env.CONFIG_KV.get(attemptKey)) || 0;
        
        if (attempts >= 5) {
          return new Response(renderLoginHTML(true, siteTitle, siteSubtitle, "Security Lock: Too many attempts. Try again in 15 minutes."), { headers: getSecureHeaders() });
        }

        const formData = await request.formData();
        const pswd = formData.get('password');
        
        if (pswd === actualPassword) {
          await env.CONFIG_KV.delete(attemptKey); 
          return new Response('Logged in', {
            status: 302,
            headers: getSecureHeaders({
              'Location': '/',
              'Set-Cookie': `auth=${secureHash}; HttpOnly; Path=/; Max-Age=2592000; Secure; SameSite=Strict`
            })
          });
        } else {
          attempts++;
          await env.CONFIG_KV.put(attemptKey, attempts.toString(), { expirationTtl: 900 }); 
          const msg = attempts >= 5 ? "Security Lock: Too many attempts. Try again in 15 minutes." : "Incorrect passphrase.";
          return new Response(renderLoginHTML(true, siteTitle, siteSubtitle, msg), { headers: getSecureHeaders() });
        }
      } else {
        if (isAuthenticated) {
          return new Response('Redirecting', { status: 302, headers: getSecureHeaders({ 'Location': '/' }) });
        } else {
          return new Response(renderLoginHTML(false, siteTitle, siteSubtitle, ""), { headers: getSecureHeaders() });
        }
      }
    }

    if (!isAuthenticated) {
      return new Response(renderLoginHTML(false, siteTitle, siteSubtitle, ""), { headers: getSecureHeaders() });
    }

    // 5. Main Gallery Rendering (Optimized with Pagination)
    if (url.pathname === '/') {
      
      if (albumQuery) {
        const cursor = url.searchParams.get('cursor');
        const isApi = url.searchParams.get('api') === 'true';

        // Load 30 images per page to ensure fast load and smooth scrolling
        const listed = await env.GALLERY_BUCKET.list({ 
            prefix: `${albumQuery}/`, 
            cursor: cursor || undefined,
            limit: 30 
        });
        
        const images = listed.objects.filter(obj => obj.size > 0).map(obj => obj.key);
        const nextCursor = listed.truncated ? listed.cursor : null;

        if (isApi) {
            return new Response(JSON.stringify({ images, nextCursor }), { 
                headers: { 'Content-Type': 'application/json' } 
            });
        }
        
        return new Response(renderAppHTML(siteTitle, siteSubtitle, [], { [albumQuery]: { images, hasMore: !!nextCursor } }, albumQuery, nextCursor), { headers: getSecureHeaders() });
      
      } else {
        const listed = await env.GALLERY_BUCKET.list({ delimiter: '/' });
        const folders = listed.delimitedPrefixes; 
        
        const albums = {};
        const headerImages = [];

        await Promise.all(folders.map(async (folderPath) => {
          const folderName = folderPath.replace(/\/$/, '');

          if (folderName === 'Header') {
             const allHeadersList = await env.GALLERY_BUCKET.list({ prefix: folderPath, limit: 10 });
             headerImages.push(...allHeadersList.objects.filter(o => o.size > 0).map(o => o.key));
             return;
          }

          // Fetch limit to 1000 items to avoid CPU Timeout on gigantic folders
          const page = await env.GALLERY_BUCKET.list({ prefix: folderPath, limit: 1000 });
          const images = page.objects.filter(o => o.size > 0).map(o => o.key);
          
          if (images.length > 0) {
             albums[folderName] = {
                 images: images,
                 hasMore: page.truncated
             };
          }
        }));

        return new Response(renderAppHTML(siteTitle, siteSubtitle, headerImages, albums, null, null), { headers: getSecureHeaders() });
      }
    }

    return new Response('Page Not Found', { status: 404 });
  }
};

// --- HTML & CSS TEMPLATES ---

function getPWAMetaTags(title) {
  return `
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="${title}">
  `;
}

function renderLoginHTML(hasError, title, subtitle, errorMsg) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
    <meta name="theme-color" content="#04070a">
    ${getPWAMetaTags(title)}
    <link rel="manifest" href="/manifest.json">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="apple-touch-icon" href="/favicon.svg">
    <title>${title} ${subtitle} - Login</title>
    <link href="https://fonts.googleapis.com/css2?family=GFS+Baskerville&family=Montserrat:wght@200;300;400;500&display=swap" rel="stylesheet">
    <style>
      ${LOGO_CSS}
      :root { 
        --brand-white: #E8F7FF;
        --brand-red: #DC143C;
        --brand-blue: #8FD3F4;
        --brand-dark-blue: #2E4A66;
        --brand-mid-blue: #4FA3D1;
        --brand-deep: #123A5E;
      }
      * { box-sizing: border-box; cursor: none !important; -webkit-tap-highlight-color: transparent; }
      
      html, body { 
        margin: 0; padding: 0; width: 100%; height: 100%; 
        color: var(--brand-white); font-family: 'Montserrat', sans-serif; 
        overflow: hidden; background-color: transparent; 
      }
      
      .custom-cursor { 
        position: fixed; top: 0; left: 0; width: 20px; height: 20px; 
        background: var(--brand-blue); border-radius: 50%; pointer-events: none; 
        z-index: 10000; mix-blend-mode: difference; display: none; 
      }
      @media (pointer: fine) { .custom-cursor { display: block; } }
      @media (pointer: coarse) { * { cursor: auto !important; } }

      .bg-container {
        position: fixed; top: 0; left: 0; right: 0; bottom: 0; 
        background-color: #04070a; z-index: -10; overflow: hidden;
      }

      .orb { 
        position: absolute; border-radius: 50%; filter: blur(80px); 
        will-change: transform; pointer-events: none; opacity: 0.55; mix-blend-mode: screen;
      }
      .orb-1 { width: 70vmin; height: 70vmin; background: var(--brand-mid-blue); top: -10%; left: -10%; animation: float1 25s ease-in-out infinite alternate; }
      .orb-2 { width: 55vmin; height: 55vmin; background: var(--brand-red); bottom: -10%; right: -10%; animation: float2 30s ease-in-out infinite alternate; animation-delay: -5s; }
      .orb-3 { width: 65vmin; height: 65vmin; background: var(--brand-deep); top: 30%; left: 30%; animation: float3 35s ease-in-out infinite alternate; opacity: 0.8; }
      
      @keyframes float1 { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(15vw, 15vh) scale(1.15); } }
      @keyframes float2 { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(-15vw, -10vh) scale(1.1); } }
      @keyframes float3 { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(10vw, -15vh) scale(1.2); } }

      .bg-vignette { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: radial-gradient(circle at center, transparent 20%, rgba(4,7,10,0.85) 100%); pointer-events: none; }
      .bg-noise { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: url('data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E'); opacity: 0.05; mix-blend-mode: overlay; pointer-events: none; }

      .ui-wrapper {
        position: relative; width: 100%; height: 100%; 
        display: flex; align-items: center; justify-content: center; z-index: 10;
      }

      .login-box { 
        position: relative;
        background: linear-gradient(135deg, rgba(46,74,102,0.15) 0%, rgba(7,11,18,0.5) 100%);
        backdrop-filter: blur(25px); -webkit-backdrop-filter: blur(25px);
        border-radius: 24px; border: 1px solid rgba(143,211,244,0.15); 
        box-shadow: 0 40px 80px -20px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.08);
        max-width: 750px; width: 90%; 
        animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        display: flex; align-items: center; justify-content: space-between;
        padding: 50px 60px; gap: 60px; opacity: 0; transform: translateY(40px);
      }
      .login-box::before {
        content: ''; position: absolute; top: 8px; left: 8px; right: 8px; bottom: 8px;
        border: 1px solid rgba(143,211,244,0.1); border-radius: 16px; pointer-events: none; z-index: -1;
      }
      @keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }

      .login-left { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; border-right: 1px solid rgba(143,211,244,0.15); padding-right: 50px; }
      .login-right { flex: 1; width: 100%; display: flex; flex-direction: column; justify-content: center; }

      .form-group { margin-bottom: 20px; }
      
      input[type="password"] { 
        width: 100%; box-sizing: border-box; background: rgba(7,11,18,0.6); 
        border: 1px solid rgba(143,211,244,0.2); color: var(--brand-white); 
        padding: 18px 20px; border-radius: 12px; font-family: 'Montserrat', sans-serif; font-size: 0.95rem; font-weight: 300;
        outline: none; transition: all 0.4s ease; text-align: center; letter-spacing: 4px;
        box-shadow: inset 0 2px 10px rgba(0,0,0,0.6); margin-bottom: 25px;
      }
      input[type="password"]:focus { 
        border-color: var(--brand-blue); background: rgba(7,11,18,0.9);
        box-shadow: inset 0 2px 10px rgba(0,0,0,0.6), 0 0 20px rgba(143, 211, 244, 0.25); 
      }
      input[type="password"]::placeholder { color: rgba(232,247,255,0.3); }
      
      button.magnetic { 
        width: 100%; background: linear-gradient(135deg, rgba(143, 211, 244,0.15) 0%, transparent 100%); 
        color: var(--brand-white); border: 1px solid rgba(143, 211, 244,0.5); 
        padding: 18px; border-radius: 12px; font-family: 'Montserrat', sans-serif; font-weight: 500; font-size: 0.85rem; letter-spacing: 3px; 
        transition: transform 0.2s ease-out, background 0.4s, color 0.4s; text-transform: uppercase;
        backdrop-filter: blur(5px); display: block;
      }
      button.magnetic:hover { 
        background: var(--brand-blue); color: #070B12; 
        box-shadow: 0 10px 25px rgba(143, 211, 244, 0.5); border-color: var(--brand-blue); 
      }
      
      .error { color: var(--brand-white); font-size: 0.75rem; margin-bottom: 20px; font-weight: 400; text-align: center; letter-spacing: 1px; animation: shake 0.5s; background: rgba(220,20,60,0.3); padding: 10px; border-radius: 8px; border: 1px solid rgba(220,20,60,0.5); }
      @keyframes shake { 0%, 100% {transform: translateX(0);} 25% {transform: translateX(-5px);} 75% {transform: translateX(5px);} }

      @media (max-width: 768px) {
        .login-box { flex-direction: column; max-width: 380px; padding: 40px 30px; gap: 30px; }
        .login-left { padding-right: 0; width: 100%; border-right: none; border-bottom: 1px solid rgba(143,211,244,0.15); padding-bottom: 30px; }
      }
    </style>
  </head>
  <body>
    <div class="custom-cursor" id="cursor"></div>
    <div class="bg-container">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>
      <div class="bg-vignette"></div>
      <div class="bg-noise"></div>
    </div>

    <div class="ui-wrapper">
      <div class="login-box">
        <div class="login-left">
          ${logoHTML(title, subtitle, true)}
        </div>
        <div class="login-right">
          ${hasError ? `
            <div class="error">${errorMsg}</div>
            <script>if(navigator.vibrate) navigator.vibrate([100, 50, 100]);</script>
          ` : ''}
          <form method="POST" action="/login">
            <div class="form-group">
              <input type="password" name="password" required autofocus placeholder="Passphrase">
            </div>
            <button type="submit" class="magnetic">Unlock</button>
          </form>
        </div>
      </div>
    </div>
    
    <script>
      const cursor = document.getElementById('cursor');
      let targetX = 0, targetY = 0;
      let cursorX = 0, cursorY = 0;
      
      if (window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener('mousemove', e => {
          targetX = e.clientX;
          targetY = e.clientY;
        });

        const animateCursor = () => {
          cursorX += (targetX - cursorX) * 0.2;
          cursorY += (targetY - cursorY) * 0.2;
          cursor.style.transform = \`translate(\${cursorX - 10}px, \${cursorY - 10}px)\`;
          requestAnimationFrame(animateCursor);
        };
        requestAnimationFrame(animateCursor);

        document.querySelectorAll('.magnetic').forEach(btn => {
          btn.addEventListener('mousemove', e => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = \`translate(\${x * 0.3}px, \${y * 0.3}px)\`;
          });
          btn.addEventListener('mouseleave', () => {
            btn.style.transform = \`translate(0px, 0px)\`;
          });
        });
      }

      // PWA Service Worker Registration
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/sw.js', { scope: '/' });
        });
      }
    </script>
  </body>
  </html>
  `;
}

function renderAppHTML(title, subtitle, headerImages, albumsData, currentAlbum, nextCursor) {
  const isAlbumView = currentAlbum !== null;
  const currentAlbumData = isAlbumView ? albumsData[currentAlbum] : { images: [] };
  const currentAlbumImages = currentAlbumData.images || [];
  
  const heroImagesHTML = headerImages.map((key, index) => 
    `<img data-hero src="/cdn/${encodeURIComponent(key)}" class="${index === 0 ? 'active' : ''}" alt="Hero Image">`
  ).join('');

  let contentHTML = '';

  const emptyStateHTML = `
    <div class="empty-state fade-in-up">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
      <h3>No Memories Yet</h3>
      <p>The collection is waiting to be filled.</p>
    </div>
  `;

  if (isAlbumView) {
    contentHTML += `
      <div class="album-header fade-in">
        <a href="/" class="back-btn magnetic"><span>&#8592;</span> Back to Collections</a>
        <h2 class="album-title">${currentAlbum.toUpperCase()}</h2>
      </div>
      <div class="masonry-grid" id="masonry-grid">
        ${currentAlbumImages.length > 0 ? currentAlbumImages.map((key, index) => `
          <div class="masonry-item fade-in-up magnetic-card" style="animation-delay: ${(index % 10) * 0.05}s">
            <div class="skeleton"></div>
            <img data-src="/cdn/${encodeURIComponent(key)}" loading="lazy" data-idx="${index}" alt="${currentAlbum} image" oncontextmenu="return false;" draggable="false">
          </div>
        `).join('') : emptyStateHTML}
        
        <!-- Pagination / Load More Integration -->
        ${nextCursor ? `
          <div id="load-more-container" style="text-align: center; margin-top: 40px; width: 100%; grid-column: 1 / -1; display: flex; justify-content: center; align-items: center; padding-bottom: 20px;">
            <button id="load-more-btn" data-cursor="${nextCursor}" data-album="${currentAlbum}" class="magnetic">Load More</button>
          </div>
        ` : `<div id="load-more-container" style="display:none;"></div>`}
      </div>
    `;
  } else {
    let foldersHTML = '';
    let totalPhotos = 0;
    let i = 0;
    for (const [folder, data] of Object.entries(albumsData)) {
      const keys = data.images;
      const coverImg = keys[0]; 
      const photoCount = keys.length;
      const plus = data.hasMore ? '+' : '';
      totalPhotos += photoCount;
      foldersHTML += `
        <a href="/?album=${encodeURIComponent(folder)}" class="folder-card fade-in-up magnetic-card" style="animation-delay: ${i * 0.1}s">
          <div class="folder-img-wrapper">
            <div class="skeleton"></div>
            <img data-src="/cdn/${encodeURIComponent(coverImg)}" loading="lazy" alt="${folder} cover" oncontextmenu="return false;" draggable="false">
          </div>
          <div class="folder-info">
            <h3>${folder.toUpperCase()}</h3>
            <span class="folder-count">${photoCount}${plus} Photo${photoCount === 1 && !data.hasMore ? '' : 's'}</span>
          </div>
        </a>
      `;
      i++;
    }
    
    const folderCount = Object.keys(albumsData).length;
    contentHTML += `
      <div class="section-header fade-in">
        <h2 class="section-title">Curated Collections</h2>
        <p class="section-meta">${folderCount} Collection${folderCount === 1 ? '' : 's'} &middot; ${totalPhotos}+ Photo${totalPhotos === 1 ? '' : 's'} Total</p>
      </div>
      <div class="folder-grid">
        ${foldersHTML || emptyStateHTML}
      </div>
    `;
  }

  // Safe JSON encoding for attribute
  const imagesJsonSafe = JSON.stringify(currentAlbumImages).replace(/'/g, "&#39;");

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
    <meta name="theme-color" content="#04070a">
    ${getPWAMetaTags(title)}
    <link rel="manifest" href="/manifest.json">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="apple-touch-icon" href="/favicon.svg">
    <title>${title} ${subtitle}</title>
    <link href="https://fonts.googleapis.com/css2?family=GFS+Baskerville&family=Montserrat:wght@200;300;400;500&display=swap" rel="stylesheet">
    
    <script>
      const navEntries = performance.getEntriesByType("navigation");
      if (navEntries.length > 0 && navEntries[0].type === "reload") {
          window.location.replace("/logout");
      }
    </script>

    <style>
      ${LOGO_CSS}
      :root { 
        --brand-white: #E8F7FF;
        --brand-red: #DC143C;
        --brand-blue: #8FD3F4;
        --brand-dark-blue: #2E4A66;
        --brand-mid-blue: #4FA3D1;
        --brand-deep: #123A5E;
        --surface: rgba(46, 74, 102, 0.15); 
        --surface-border: rgba(143, 211, 244, 0.1);
        --text-muted: #8DB2CC;
      }
      
      * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; cursor: none !important; }
      @media (pointer: coarse) { * { cursor: auto !important; } }
      
      html, body { 
        margin: 0; padding: 0; width: 100%; height: 100%; 
        color: var(--brand-white); font-family: 'Montserrat', sans-serif; 
        overflow-x: hidden; background-color: transparent; 
      }
      h1, h2, h3 { font-family: 'GFS Baskerville', serif; font-weight: 400; margin: 0; }
      a { text-decoration: none; }
      
      /* Custom Cursor */
      .custom-cursor { position: fixed; top: 0; left: 0; width: 20px; height: 20px; background: var(--brand-blue); border-radius: 50%; pointer-events: none; z-index: 10000; mix-blend-mode: difference; display: none; }
      @media (pointer: fine) { .custom-cursor { display: block; } }

      ::-webkit-scrollbar { width: 8px; }
      ::-webkit-scrollbar-track { background: #04070a; }
      ::-webkit-scrollbar-thumb { background: rgba(143, 211, 244, 0.15); border-radius: 10px; }
      ::-webkit-scrollbar-thumb:hover { background: rgba(143, 211, 244, 0.5); }

      .bg-container {
        position: fixed; top: 0; left: 0; right: 0; bottom: 0; 
        background-color: #04070a; z-index: -10; overflow: hidden;
      }
      .orb { 
        position: absolute; border-radius: 50%; filter: blur(80px); 
        will-change: transform; pointer-events: none; opacity: 0.8; mix-blend-mode: screen;
      }
      .orb-1 { width: 75vmin; height: 75vmin; background: rgba(79, 163, 209, 0.4); top: -15%; left: -10%; animation: float1 25s ease-in-out infinite alternate; }
      .orb-2 { width: 60vmin; height: 60vmin; background: rgba(220, 20, 60, 0.35); bottom: -15%; right: -10%; animation: float2 30s ease-in-out infinite alternate; animation-delay: -5s; }
      .orb-3 { width: 70vmin; height: 70vmin; background: rgba(18, 58, 94, 0.7); top: 30%; left: 30%; animation: float3 35s ease-in-out infinite alternate; }
      
      @keyframes float1 { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(15vw, 15vh) scale(1.15); } }
      @keyframes float2 { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(-15vw, -10vh) scale(1.1); } }
      @keyframes float3 { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(10vw, -15vh) scale(1.2); } }

      .bg-vignette { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: radial-gradient(circle at center, transparent 30%, rgba(4,7,10,0.85) 100%); pointer-events: none; }
      .bg-noise { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: url('data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E'); opacity: 0.05; mix-blend-mode: overlay; pointer-events: none; }

      .fade-in { animation: fadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      .fade-in-up { opacity: 0; animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
      
      .skeleton { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(90deg, rgba(255,255,255,0.02) 25%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.02) 75%); background-size: 200% 100%; animation: loading 2s infinite; z-index: 1; }
      @keyframes loading { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

      .main-content { position: relative; z-index: 5; }

      .site-header { position: relative; display: flex; align-items: center; justify-content: center; padding: 40px 20px 30px; background: linear-gradient(to bottom, rgba(4,7,10,0.9), transparent); }
      .site-header::after { content: ''; position: absolute; bottom: 0; left: 10%; width: 80%; height: 1px; background: linear-gradient(90deg, transparent, rgba(143,211,244,0.15), transparent); }
      
      .brand { display:inline-flex; align-items:center; gap:15px; text-decoration:none; text-shadow:0 5px 15px rgba(0,0,0,0.8); }
      .brand-text { display: flex; flex-direction: column; align-items: flex-start; justify-content: center; }
      .brand-title { color: var(--brand-white); font: 400 24px/1.2 'GFS Baskerville', serif; letter-spacing: 0.25em; text-transform: uppercase; white-space: nowrap; }
      .brand-subtitle { color: var(--brand-red); font: 500 11px/1 system-ui, -apple-system, sans-serif; letter-spacing: 0.5em; text-transform: uppercase; margin-top: 4px; opacity: 0.95; }
      
      .brand svg { display:block; width:65px; height:65px; filter:drop-shadow(0 8px 16px rgba(0,0,0,0.7)); transition:all 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
      .brand:hover svg { transform:scale(1.1) translateY(-4px); filter:drop-shadow(0 12px 20px rgba(143, 211, 244, 0.4)); }

      @media (max-width: 768px) {
        .brand-title { font-size: 18px; letter-spacing: 0.2em; }
        .brand-subtitle { font-size: 9px; letter-spacing: 0.4em; }
        .brand svg { width: 50px; height: 50px; }
      }

      .exit-btn {
        position: absolute; top: 45px; right: 40px; background: rgba(143,211,244,0.05); color: var(--text-muted);
        border: 1px solid rgba(143,211,244,0.15); padding: 10px 22px; border-radius: 8px;
        font-family: 'Montserrat', sans-serif; font-size: 0.7rem; letter-spacing: 3px; font-weight: 500;
        transition: transform 0.2s ease-out, background 0.4s, color 0.4s, box-shadow 0.4s; backdrop-filter: blur(10px); display: block;
      }
      .exit-btn:hover { color: var(--brand-red); border-color: var(--brand-red); background: rgba(220,20,60,0.1); box-shadow: 0 8px 20px rgba(220,20,60,0.25); }

      .hero { position: relative; height: 60vh; overflow: hidden; display: ${isAlbumView ? 'none' : 'block'}; background: transparent; }
      .hero::after { content: ''; position: absolute; bottom: 0; left: 0; width: 100%; height: 60%; background: linear-gradient(to top, #04070a 0%, transparent 100%); z-index: 5; }
      
      /* Parallax base container */
      .hero-parallax-wrapper { width: 100%; height: 100%; position: absolute; top: 0; left: 0; will-change: transform; }
      .hero img { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; object-position: top center; opacity: 0; transition: opacity 2s ease-in-out; filter: brightness(0.7) contrast(1.1) saturate(1.1); transform: scale(1.05); }
      .hero img.active { opacity: 1; transform: scale(1.05); } 

      .container { max-width: 1440px; margin: 0 auto; padding: 60px 40px 100px; min-height: 50vh; position: relative; z-index: 5; transition: all 0.4s ease; }
      
      .section-header { text-align: center; margin-bottom: 60px; }
      .section-title { color: var(--brand-white); font-size: 1.5rem; letter-spacing: 4px; font-weight: 500; display: inline-block; position: relative; padding-bottom: 15px; text-transform: uppercase; font-family: 'Montserrat', sans-serif;}
      .section-title::after { content: ''; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 30px; height: 2px; background: var(--brand-blue); opacity: 0.8; border-radius: 2px; }
      .section-meta { color: var(--text-muted); font-size: 0.75rem; letter-spacing: 3px; font-weight: 400; text-transform: uppercase; margin: 14px 0 0; font-family: 'Montserrat', sans-serif; }

      .empty-state { text-align: center; padding: 80px 20px; background: var(--surface); border-radius: 16px; border: 1px solid var(--surface-border); box-shadow: 0 15px 35px rgba(0,0,0,0.4); grid-column: 1 / -1; backdrop-filter: blur(20px); }
      .empty-state svg { width: 64px; height: 64px; fill: var(--brand-blue); margin-bottom: 20px; filter: drop-shadow(0 5px 10px rgba(143, 211, 244, 0.4)); opacity: 0.9; }
      .empty-state h3 { color: var(--brand-white); font-family: 'GFS Baskerville', serif; font-size: 1.8rem; margin: 0 0 10px 0; letter-spacing: 4px; text-transform: uppercase; }
      .empty-state p { color: var(--text-muted); font-size: 0.85rem; letter-spacing: 2px; margin: 0; text-transform: uppercase; }

      .folder-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 40px; }
      .folder-card { 
        display: block; background: var(--surface); 
        backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
        border-radius: 16px; overflow: hidden; transition: transform 0.3s ease-out, box-shadow 0.6s, border-color 0.6s; 
        border: 1px solid var(--surface-border); box-shadow: 0 15px 35px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05); 
      }
      .folder-card:hover { box-shadow: 0 30px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1); border-color: rgba(143, 211, 244, 0.3); }
      
      .folder-img-wrapper { aspect-ratio: 4/3; overflow: hidden; position: relative; }
      
      .folder-img-wrapper img, .masonry-item img {
        width: 100%; height: 100%; object-fit: cover; object-position: top center; 
        display: block; opacity: 0; filter: blur(15px) brightness(0.85) grayscale(20%); transform: scale(1.05);
        transition: opacity 0.8s ease, filter 0.8s ease, transform 0.8s ease; 
      }
      
      .folder-img-wrapper img.loaded, .masonry-item img.loaded { 
        opacity: 1; filter: blur(0px) brightness(0.85) grayscale(20%); transform: scale(1.01); 
      }
      .masonry-item img.loaded { grayscale: 0; filter: blur(0px) brightness(0.85) saturate(0.9); }

      .folder-card:hover .folder-img-wrapper img.loaded { transform: scale(1.08); filter: brightness(1.05) grayscale(0%); }
      .masonry-item:hover img.loaded { transform: scale(1.05); filter: brightness(1.1) saturate(1.1); }

      .folder-img-wrapper::after { content: ''; position: absolute; top:0; left:0; width:100%; height:100%; background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%); opacity: 1; transition: opacity 0.5s ease; pointer-events: none; }
      .folder-card:hover .folder-img-wrapper::after { opacity: 0.2; }
      
      .folder-info { padding: 35px 30px; text-align: center; }
      .folder-info h3 { color: var(--brand-white); font-size: 1.4rem; letter-spacing: 2px; transition: color 0.4s ease; margin-bottom: 10px; font-weight: 500; font-family: 'Montserrat', sans-serif;}
      .folder-card:hover .folder-info h3 { color: var(--brand-blue); }
      .folder-count { display: inline-block; color: var(--text-muted); font-size: 0.7rem; letter-spacing: 2px; text-transform: uppercase; opacity: 0.85; font-family: 'Montserrat', sans-serif; transition: color 0.4s ease, opacity 0.4s ease; }
      .folder-card:hover .folder-count { color: var(--brand-blue); opacity: 1; }

      .album-header { text-align: center; margin-bottom: 60px; position: relative; }
      .back-btn { display: inline-flex; align-items: center; color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 30px; transition: transform 0.2s ease-out, background 0.4s, border-color 0.4s, color 0.4s; font-weight: 500; background: rgba(143,211,244,0.05); padding: 12px 25px; border-radius: 30px; border: 1px solid rgba(143,211,244,0.1); backdrop-filter: blur(10px); }
      .back-btn span { margin-right: 10px; font-size: 1.2rem; transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); line-height: 1; }
      .back-btn:hover { color: var(--brand-white); border-color: rgba(143,211,244,0.4); background: rgba(143,211,244,0.15); box-shadow: 0 8px 25px rgba(0,0,0,0.4); }
      .back-btn:hover span { transform: translateX(-5px); }
      .album-title { color: var(--brand-white); font-size: 3.5rem; letter-spacing: 8px; font-weight: 400; text-transform: uppercase; text-shadow: 0 5px 20px rgba(0,0,0,0.5); }
      .album-title::after { content: ''; display: block; width: 50px; height: 2px; background: var(--brand-blue); margin: 25px auto 0; opacity: 0.8; border-radius: 2px; }

      .masonry-grid { column-count: 3; column-gap: 35px; padding-top: 10px; }
      .masonry-item {
        break-inside: avoid; margin-bottom: 35px; border-radius: 12px;
        background: var(--surface); position: relative;
        border: 1px solid var(--surface-border); overflow: hidden;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5); transition: transform 0.3s ease-out, box-shadow 0.6s, border-color 0.6s;
      }
      .masonry-item:hover { box-shadow: 0 30px 60px rgba(0,0,0,0.7); border-color: rgba(143, 211, 244, 0.3); z-index: 2; }
      .masonry-item::after { content: ''; position: absolute; top:0; left:0; width:100%; height:100%; z-index: 2; pointer-events: none; box-shadow: inset 0 0 20px rgba(0,0,0,0.3); transition: box-shadow 0.4s ease; }
      .masonry-item:hover::after { box-shadow: inset 0 0 0 rgba(0,0,0,0); }

      /* Load More Button Styles */
      #load-more-btn {
        background: rgba(143,211,244,0.1); color: var(--brand-white); padding: 15px 40px; border-radius: 25px; 
        border: 1px solid rgba(143,211,244,0.3); font-family: 'Montserrat', sans-serif; cursor: none; 
        letter-spacing: 2px; text-transform: uppercase; font-size: 0.8rem; transition: all 0.3s ease;
      }
      #load-more-btn:hover { 
        background: var(--brand-blue); color: #04070a; box-shadow: 0 10px 25px rgba(143,211,244,0.4); 
        border-color: var(--brand-blue); transform: translateY(-3px); 
      }

      .lightbox { 
        position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
        background: radial-gradient(circle at center, rgba(46,74,102,0.85) 0%, rgba(4,7,10,0.98) 100%); 
        display: flex; flex-direction: column; z-index: 9999; opacity: 0; pointer-events: none; 
        transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1); backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px);
      }
      .lightbox.active { opacity: 1; pointer-events: auto; touch-action: none; }
      .lb-ui { transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); opacity: 1; transform: translateY(0); }
      .lb-ui.hidden { opacity: 0; pointer-events: none; transform: translateY(15px); }
      .lightbox-close.hidden { transform: translateY(-15px); }

      .lightbox-close { 
        position: absolute; top: 30px; right: 40px; color: #fff; font-size: 32px; 
        background: rgba(255,255,255,0.05); width: 55px; height: 55px; border-radius: 50%; 
        display: flex; align-items: center; justify-content: center; z-index: 1010; 
        transition: transform 0.2s ease-out, background 0.4s, color 0.4s; border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(10px);
      }
      .lightbox-close:hover { background: var(--brand-white); color: #04070a; border-color: var(--brand-white); box-shadow: 0 0 25px rgba(255,255,255,0.4); }

      .lightbox-main { flex: 1; width: 100%; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; }
      .img-container { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; will-change: transform; }
      #lightbox-img { max-width: 100%; max-height: 100%; object-fit: contain; cursor: grab !important; transition: opacity 0.5s ease; opacity: 0; filter: drop-shadow(0 20px 50px rgba(0,0,0,0.8)); }
      #lightbox-img:active { cursor: grabbing !important; }
      #lightbox-img.loaded { opacity: 1; }
      
      .lb-vault-info { position: absolute; bottom: 180px; left: 40px; color: rgba(143,211,244,0.6); font-size: 11px; font-weight: 500; letter-spacing: 4px; z-index: 1010; font-family: 'Montserrat', sans-serif; text-shadow: 0 2px 5px rgba(0,0,0,0.8); border-left: 2px solid var(--brand-red); padding-left: 12px; pointer-events: none; text-transform: uppercase;}

      .watermark { position: absolute; bottom: 180px; right: 40px; pointer-events: none; user-select: none; z-index: 10; text-align: right; text-transform: uppercase; text-shadow: 0 2px 10px rgba(0,0,0,0.5); }
      .wm-title { font-family: 'GFS Baskerville', serif; color: var(--brand-white); font-size: 2rem; letter-spacing: 8px; font-weight: 600; margin-bottom: 5px; }
      .wm-sub { font-family: system-ui, -apple-system, sans-serif; color: var(--brand-red); font-size: 0.8rem; letter-spacing: 6px; font-weight: 500; opacity: 0.9; }

      .lightbox-thumb-wrapper {
        height: 160px; width: 100%; background: linear-gradient(to top, rgba(4,7,10,0.95) 20%, transparent);
        position: absolute; bottom: 0; left: 0; display: flex; align-items: center; z-index: 1005;
      }
      .lightbox-thumb-strip { 
        display: flex; gap: 25px; padding: 40px 50vw; overflow-x: auto; scroll-behavior: smooth; white-space: nowrap; width: 100%; align-items: center; -ms-overflow-style: none; scrollbar-width: none; scroll-snap-type: x mandatory;
      }
      .lightbox-thumb-strip::-webkit-scrollbar { display: none; }
      
      .thumb-wrapper {
        position: relative; height: 75px; width: 75px; border-radius: 50%;
        opacity: 0.4; transition: transform 0.2s ease-out, opacity 0.5s, box-shadow 0.5s;
        flex-shrink: 0; scroll-snap-align: center; transform: scale(0.85); box-shadow: 5px 5px 15px rgba(0,0,0,0.9), -2px -2px 10px rgba(255,255,255,0.05); overflow: hidden; 
      }
      .thumb-wrapper img { width: 100%; height: 100%; object-fit: cover; object-position: top center; display: block; filter: grayscale(40%); transition: filter 0.5s ease; }

      .thumb-overlay {
        position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 50%; pointer-events: none;
        border: 2px solid transparent; transition: all 0.5s ease; box-shadow: inset 3px 3px 6px rgba(255,255,255,0.3), inset -4px -4px 10px rgba(0,0,0,0.8);
      }
      .thumb-wrapper:hover { opacity: 0.8; }
      .thumb-wrapper.active { opacity: 1; transform: scale(1.15) translateY(-5px); box-shadow: 0 20px 40px rgba(0,0,0,1), 0 0 30px rgba(143, 211, 244, 0.5); z-index: 10; }
      .thumb-wrapper.active img { filter: grayscale(0%); }
      .thumb-wrapper.active .thumb-overlay { border-color: rgba(208, 240, 253, 0.8); box-shadow: inset 0 0 15px rgba(143, 211, 244, 0.6); }

      @media (max-width: 768px) {
        .site-header { padding: 35px 20px 25px; }
        .exit-btn { top: 25px; right: 20px; padding: 8px 16px; font-size: 0.65rem; border-radius: 6px; }
        .hero { height: 45vh; } 
        .container { padding: 40px 20px 80px; }
        .section-title { font-size: 1.3rem; letter-spacing: 3px; }
        .section-meta { font-size: 0.65rem; letter-spacing: 2px; }
        .album-title { font-size: 2rem; letter-spacing: 3px; }
        .empty-state { padding: 60px 20px; }
        .empty-state svg { width: 48px; height: 48px; }
        .empty-state h3 { font-size: 1.4rem; }
        .folder-grid { grid-template-columns: 1fr; gap: 30px; } 
        .masonry-grid { column-count: 2; column-gap: 20px; }
        .masonry-item { margin-bottom: 20px; }
        .lightbox-close { top: 20px; right: 20px; width: 45px; height: 45px; font-size: 24px; }
        .lightbox-thumb-wrapper { height: 140px; padding-bottom: 0; }
        .lightbox-thumb-strip { padding: 35px 50vw; gap: 15px; }
        .thumb-wrapper { height: 60px; width: 60px; }
        .watermark { bottom: 150px; right: 20px; }
        .wm-title { font-size: 1.2rem; letter-spacing: 4px; }
        .wm-sub { font-size: 0.65rem; letter-spacing: 3px; }
        .lb-vault-info { bottom: 150px; left: 20px; font-size: 9px; padding-left: 8px; }
      }
    </style>
  </head>
  <body>
    <div class="custom-cursor" id="cursor"></div>
    <div class="bg-container">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>
      <div class="bg-vignette"></div>
      <div class="bg-noise"></div>
    </div>

    <div class="main-content">
      <header class="site-header">
        <a href="/logout" class="exit-btn magnetic">Exit</a>
        <div style="display: flex; justify-content: center; padding-top: 5px;">
          <a class="brand" href="/">
            ${LOGO_MARK}
            <div class="brand-text">
              <span class="brand-title">${title}</span>
              <span class="brand-subtitle">${subtitle}</span>
            </div>
          </a>
        </div>
      </header>

      <div class="hero" id="hero-section">
        <div class="hero-parallax-wrapper" id="hero-parallax">
          ${heroImagesHTML}
        </div>
      </div>

      <div class="container" id="app-container" data-images='${imagesJsonSafe}'>
        ${contentHTML}
      </div>
    </div>

    <div class="lightbox" id="lightbox">
      <div class="lb-vault-info lb-ui">HIGH RESOLUTION SECURE VAULT</div>
      <div class="watermark lb-ui">
        <div class="wm-title">${title}</div>
        <div class="wm-sub">${subtitle}</div>
      </div>
      <div class="lightbox-close lb-ui magnetic" id="lb-close">&times;</div>
      <div class="lightbox-main" id="lightbox-main">
        <div class="img-container" id="img-container">
          <img id="lightbox-img" src="" alt="View" oncontextmenu="return false;" draggable="false">
        </div>
      </div>
      <div class="lightbox-thumb-wrapper lb-ui">
        <div class="lightbox-thumb-strip" id="lightbox-thumb-strip"></div>
      </div>
    </div>

    <script>
      /* --- GLOBAL STATE & CLEANUP --- */
      let imagesData = [];
      let heroInterval, parallaxRAF, cursorRAF;
      let activeObservers = [];
      let imageObserver;

      /* --- CORE APP LOGIC --- */
      function initApp() {
        const container = document.getElementById('app-container');
        imagesData = JSON.parse(container.dataset.images || '[]');
        
        // 1. Intersection Observer for Lazy Loading
        const lazyImages = document.querySelectorAll('img[data-src]');
        imageObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              img.src = img.dataset.src;
              img.onload = () => {
                if (img.previousElementSibling && img.previousElementSibling.classList.contains('skeleton')) {
                  img.previousElementSibling.style.display = 'none';
                }
                img.classList.add('loaded');
              };
              observer.unobserve(img);
            }
          });
        }, { rootMargin: "150px 0px" });
        
        lazyImages.forEach(img => {
          imageObserver.observe(img);
          activeObservers.push({ obs: imageObserver, el: img });
        });

        // 2. Setup Gallery Click Events
        document.querySelectorAll('.masonry-item img').forEach(img => {
          img.onclick = () => openLightbox(parseInt(img.dataset.idx));
        });

        // 2.1 Setup Load More Pagination Logic
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.onclick = async (e) => {
                e.preventDefault();
                const cursor = loadMoreBtn.dataset.cursor;
                const album = loadMoreBtn.dataset.album;
                const originalText = loadMoreBtn.innerText;
                loadMoreBtn.innerText = 'LOADING...';
                loadMoreBtn.style.opacity = '0.5';
                
                try {
                    const res = await fetch(\`/?album=\${encodeURIComponent(album)}&cursor=\${encodeURIComponent(cursor)}&api=true\`);
                    if (!res.ok) throw new Error('Network error');
                    const data = await res.json();
                    
                    const grid = document.getElementById('masonry-grid');
                    const containerElement = document.getElementById('load-more-container');
                    
                    data.images.forEach(src => {
                        const idx = imagesData.length;
                        imagesData.push(src);
                        
                        const div = document.createElement('div');
                        div.className = 'masonry-item fade-in-up magnetic-card';
                        div.innerHTML = \`<div class="skeleton"></div><img data-src="/cdn/\${encodeURIComponent(src)}" loading="lazy" data-idx="\${idx}" alt="image" oncontextmenu="return false;" draggable="false">\`;
                        
                        grid.insertBefore(div, containerElement);
                        
                        const img = div.querySelector('img');
                        imageObserver.observe(img);
                        activeObservers.push({ obs: imageObserver, el: img });
                        
                        img.onclick = () => openLightbox(idx);
                    });
                    
                    if (data.nextCursor) {
                        loadMoreBtn.dataset.cursor = data.nextCursor;
                        loadMoreBtn.innerText = originalText;
                        loadMoreBtn.style.opacity = '1';
                    } else {
                        containerElement.style.display = 'none';
                    }
                    
                    if (isGalleryOpen) initGallery();
                    
                } catch (err) {
                    loadMoreBtn.innerText = 'ERROR. TRY AGAIN';
                    loadMoreBtn.style.opacity = '1';
                    setTimeout(() => loadMoreBtn.innerText = originalText, 3000);
                }
            };
        }

        // 3. Hero Interval setup
        clearInterval(heroInterval);
        const heroImages = document.querySelectorAll('.hero img');
        if (heroImages.length > 1) {
          let curr = 0;
          heroInterval = setInterval(() => {
            heroImages[curr].classList.remove('active');
            curr = (curr + 1) % heroImages.length;
            heroImages[curr].classList.add('active');
          }, 5000);
        } else if (heroImages.length === 1) {
          heroImages[0].classList.add('active');
        }
      }

      function cleanupApp() {
        activeObservers.forEach(({obs, el}) => obs.unobserve(el));
        activeObservers = [];
        clearInterval(heroInterval);
      }

      window.addEventListener('DOMContentLoaded', initApp);

      /* --- SPA ROUTING --- */
      document.addEventListener('click', async (e) => {
        const link = e.target.closest('a[href^="/?album="], a.back-btn, a.brand');
        if (link && link.href) {
          e.preventDefault();
          const url = new URL(link.href);
          const container = document.getElementById('app-container');
          const hero = document.getElementById('hero-section');
          
          container.style.opacity = '0'; 
          container.style.transform = 'translateY(30px)';
          
          try {
            const res = await fetch(url.toString());
            const html = await res.text();
            const doc = new DOMParser().parseFromString(html, 'text/html');
            
            setTimeout(() => {
              cleanupApp(); 
              
              const newContainer = doc.getElementById('app-container');
              container.innerHTML = newContainer.innerHTML;
              container.dataset.images = newContainer.dataset.images;
              hero.style.display = url.searchParams.has('album') ? 'none' : 'block';
              
              window.history.pushState({}, '', url.toString());
              window.scrollTo({ top: 0, behavior: 'smooth' });
              
              initApp(); 
              
              container.style.opacity = '1'; 
              container.style.transform = 'translateY(0)';
            }, 400);
          } catch (err) { 
            window.location.href = url.toString(); 
          }
        }
      });
      
      window.addEventListener('popstate', () => window.location.reload());

      /* --- PERFORMANCE ANIMATIONS --- */
      const cursor = document.getElementById('cursor');
      let tX = 0, tY = 0, cX = 0, cY = 0;
      
      if (window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener('mousemove', e => { 
          tX = e.clientX; 
          tY = e.clientY; 
        });
        
        const animateCursor = () => {
          cX += (tX - cX) * 0.2; 
          cY += (tY - cY) * 0.2;
          cursor.style.transform = \`translate(\${cX - 10}px, \${cY - 10}px)\`;
          cursorRAF = requestAnimationFrame(animateCursor);
        };
        cursorRAF = requestAnimationFrame(animateCursor);
        
        document.addEventListener('mousemove', e => {
          const mag = e.target.closest('.magnetic, .magnetic-card');
          if (mag) {
            const rect = mag.getBoundingClientRect();
            const intensity = mag.classList.contains('magnetic-card') ? 0.15 : 0.3;
            mag.style.transform = \`translate(\${(e.clientX - rect.left - rect.width/2)*intensity}px, \${(e.clientY - rect.top - rect.height/2)*intensity}px)\`;
          }
        }, {passive: true});
        
        document.addEventListener('mouseout', e => {
          const mag = e.target.closest('.magnetic, .magnetic-card');
          if (mag) mag.style.transform = 'translate(0px, 0px)';
        });
      }

      let scrollY = 0, isTicking = false;
      window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
        if (!isTicking) {
          parallaxRAF = requestAnimationFrame(() => {
            const parallax = document.getElementById('hero-parallax');
            if (parallax && document.getElementById('hero-section').style.display !== 'none') {
              parallax.style.transform = \`translateY(\${scrollY * 0.4}px)\`;
            }
            isTicking = false;
          });
          isTicking = true;
        }
      }, {passive: true});

      // PWA Service Worker Registration
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/sw.js', { scope: '/' });
        });
      }

      /* --- LIGHTBOX & SWIPE LOGIC --- */
      let currentIdx = 0, isGalleryOpen = false, uiTimeout;
      const lightbox = document.getElementById('lightbox'), 
            mainImg = document.getElementById('lightbox-img'), 
            imgContainer = document.getElementById('img-container'), 
            thumbStrip = document.getElementById('lightbox-thumb-strip'), 
            uiElements = document.querySelectorAll('.lb-ui');

      document.addEventListener('keydown', (e) => { 
        if (!isGalleryOpen) return;
        if (e.key === 'ArrowRight') goToImage(currentIdx + 1); 
        if (e.key === 'ArrowLeft') goToImage(currentIdx - 1); 
        if (e.key === 'Escape') closeLightbox({target: {id: 'lightbox'}}); 
      });

      function showUI() { 
        uiElements.forEach(el => el.classList.remove('hidden')); 
        clearTimeout(uiTimeout); 
        uiTimeout = setTimeout(() => { 
          if (scale === 1) uiElements.forEach(el => el.classList.add('hidden')); 
        }, 4000); 
      }
      
      lightbox.addEventListener('mousemove', showUI); 
      lightbox.addEventListener('touchstart', showUI, {passive: true}); 
      lightbox.addEventListener('click', showUI);

      function initGallery() {
        thumbStrip.innerHTML = '';
        imagesData.forEach((src, idx) => {
          const w = document.createElement('div'); 
          w.className = 'thumb-wrapper magnetic'; 
          w.dataset.idx = idx; 
          w.oncontextmenu = () => false;
          w.onclick = (e) => { 
            e.stopPropagation(); 
            if (currentIdx !== idx) goToImage(idx, true); 
          };
          w.innerHTML = \`<img src="/cdn/\${encodeURIComponent(src)}"><div class="thumb-overlay"></div>\`;
          thumbStrip.appendChild(w);
        });
      }

      let thumbScrollTimeout;
      thumbStrip.addEventListener('scroll', () => {
        if (!isGalleryOpen) return;
        clearTimeout(thumbScrollTimeout);
        thumbScrollTimeout = setTimeout(() => {
          if (isAnim) return;
          const stripRect = thumbStrip.getBoundingClientRect();
          const stripCenter = stripRect.left + stripRect.width / 2;
          let closestIdx = currentIdx;
          let minDiff = Infinity;

          Array.from(thumbStrip.children).forEach((thumb) => {
            const rect = thumb.getBoundingClientRect();
            const thumbCenter = rect.left + rect.width / 2;
            const diff = Math.abs(stripCenter - thumbCenter);
            if (diff < minDiff) {
              minDiff = diff;
              closestIdx = parseInt(thumb.dataset.idx);
            }
          });

          if (closestIdx !== currentIdx && minDiff < (stripRect.width / 2)) {
            goToImage(closestIdx, false);
          }
        }, 150);
      }, { passive: true });

      let isAnim = false;
      function goToImage(idx, scrollToThumb = true) {
        if (idx < 0 || idx >= imagesData.length || isAnim) return;
        isAnim = true; 
        currentIdx = idx; 
        resetZoom();
        
        if (navigator.vibrate) navigator.vibrate(15);
        mainImg.classList.remove('loaded');
        
        setTimeout(() => {
          const temp = new Image();
          temp.onload = () => { 
            mainImg.src = temp.src; 
            requestAnimationFrame(() => { 
              mainImg.classList.add('loaded'); 
              setTimeout(() => isAnim = false, 400); 
            }); 
          };
          temp.src = '/cdn/' + encodeURIComponent(imagesData[idx]);
        }, 300);

        Array.from(thumbStrip.children).forEach((thumb, i) => {
          if (i === idx) {
            thumb.classList.add('active'); 
            thumb.style.transform = 'scale(1.15)';
            if (scrollToThumb) {
              thumbStrip.scrollTo({ 
                left: thumb.offsetLeft - (thumbStrip.clientWidth / 2) + (thumb.clientWidth / 2), 
                behavior: 'smooth' 
              });
            }
          } else { 
            thumb.classList.remove('active'); 
            thumb.style.transform = 'scale(0.85)'; 
          }
        });
      }

      function openLightbox(idx) { 
        isGalleryOpen = true; 
        lightbox.classList.add('active'); 
        document.body.style.overflow = 'hidden'; 
        if (thumbStrip.children.length !== imagesData.length) initGallery(); 
        showUI(); 
        goToImage(idx, true); 
      }
      
      function closeLightbox(e) { 
        if (['lightbox', 'lightbox-main', 'lb-close'].includes(e.target.id)) { 
          isGalleryOpen = false; 
          lightbox.classList.remove('active'); 
          document.body.style.overflow = 'auto'; 
          clearTimeout(uiTimeout); 
          setTimeout(resetZoom, 500); 
        } 
      }
      
      document.getElementById('lb-close').onclick = closeLightbox;
      lightbox.onclick = closeLightbox;

      // Responsive Swipe Logic
      let scale = 1, pX = 0, pY = 0, start = {x:0, y:0}, panning = false, initialDist = null, touchStartX = 0, touchStartTime = 0;
      const SWIPE_THRESHOLD = window.innerWidth * 0.15;

      function setTransform(anim = false) { 
        imgContainer.style.transition = anim ? 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' : 'none'; 
        if (scale === 1) { pX = 0; pY = 0; } 
        imgContainer.style.transform = \`translate(\${pX}px, \${pY}px) scale(\${scale})\`; 
      }
      
      function resetZoom() { 
        scale = 1; pX = 0; pY = 0; 
        setTransform(true); 
      }

      imgContainer.ondblclick = (e) => { 
        e.preventDefault(); 
        scale = scale === 1 ? 2.5 : 1; 
        setTransform(true); 
      };
      
      imgContainer.onmousedown = (e) => { 
        e.preventDefault(); 
        if (scale > 1) { 
          start = { x: e.clientX - pX, y: e.clientY - pY }; 
          panning = true; 
        } else { 
          touchStartX = e.clientX; 
          touchStartTime = Date.now(); 
        }
      };
      
      window.onmouseup = (e) => { 
        panning = false; 
        if (scale === 1 && touchStartX > 0) { 
          const diff = touchStartX - e.clientX; 
          const t = Date.now() - touchStartTime; 
          if (diff > SWIPE_THRESHOLD || (diff > 20 && t < 200)) goToImage(currentIdx + 1); 
          if (diff < -SWIPE_THRESHOLD || (diff < -20 && t < 200)) goToImage(currentIdx - 1); 
          touchStartX = 0; 
        }
      };
      
      window.onmousemove = (e) => { 
        if (!panning) return; 
        pX = e.clientX - start.x; 
        pY = e.clientY - start.y; 
        setTransform(false); 
      };

      imgContainer.ontouchstart = (e) => { 
        if (e.touches.length === 2) {
          initialDist = Math.hypot(e.touches[0].pageX - e.touches[1].pageX, e.touches[0].pageY - e.touches[1].pageY); 
        } else if (e.touches.length === 1) { 
          if (scale > 1) { 
            start = { x: e.touches[0].pageX - pX, y: e.touches[0].pageY - pY }; 
            panning = true; 
          } else { 
            touchStartX = e.touches[0].pageX; 
            touchStartTime = Date.now(); 
          }
        }
      };
      
      imgContainer.ontouchmove = (e) => { 
        if (e.touches.length === 2) { 
          e.preventDefault(); 
          const cDist = Math.hypot(e.touches[0].pageX - e.touches[1].pageX, e.touches[0].pageY - e.touches[1].pageY); 
          if (initialDist) { 
            scale = Math.min(Math.max(1, scale * (cDist / initialDist)), 4); 
            initialDist = cDist; 
            setTransform(false); 
          }
        } else if (e.touches.length === 1 && panning) { 
          e.preventDefault(); 
          pX = e.touches[0].pageX - start.x; 
          pY = e.touches[0].pageY - start.y; 
          setTransform(false); 
        }
      };
      
      imgContainer.ontouchend = (e) => { 
        panning = false; 
        initialDist = null; 
        if (scale < 1) return resetZoom(); 
        
        if (scale === 1 && touchStartX > 0 && e.changedTouches.length > 0) { 
          const diff = touchStartX - e.changedTouches[0].pageX; 
          const t = Date.now() - touchStartTime; 
          if (diff > SWIPE_THRESHOLD || (diff > 20 && t < 250)) goToImage(currentIdx + 1); 
          if (diff < -SWIPE_THRESHOLD || (diff < -20 && t < 250)) goToImage(currentIdx - 1); 
          touchStartX = 0; 
        }
      };
    </script>
  </body>
  </html>
  `;
}
