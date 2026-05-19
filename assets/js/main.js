// Category definitions with metadata (ORDERED as per spec)
const categoryDefs = [
  { id: 'hot', name: 'Trending', icon: '🔥', subCats: null, noTags: true },
  { id: 'ai-tools', name: 'AI Tools', icon: '🤖', subCats: ['Chat & Assistants','Image Generation','Video & Audio','Coding','Writing & Content','Research','Marketing','Design'] },
  { id: 'top-rated', name: 'Top Rated', icon: '👍', subCats: null },
  { id: 'movies', name: 'Free Movies', icon: '▶️', subCats: ['Watch Online','Download Movies','Subtitle Download','Aggregate Search','Anime Sites','Documentaries','TV Shows','Sports Live','VIP Video Parse'], more: true },
  { id: 'books', name: 'Free Books', icon: '📖', subCats: ['Ebook Download','Novel Download','Textbook Download','Magazine Read','Discount Books','Audiobooks','Free Comics'] },
  { id: 'music', name: 'Free Music', icon: '🎵', subCats: ['Listen Online','Music Download','Lyrics Download','Relaxing Music'] },
  { id: 'resources', name: 'Free Assets', icon: '📁', subCats: ['PPT Templates','Video Assets','Image Assets','Audio Assets','Color Palettes','Fonts','Emojis','Gifs','Icons','PSD/Vector','PNG Cutouts'] },
  { id: 'search', name: 'Search Tools', icon: '🔍', subCats: ['Cloud Search','Torrent Search','Search Engines','Google Mirrors','Resource Forums'] },
  { id: 'learning', name: 'Learning', icon: '📚', subCats: ['University MOOCs','Language Learning','Academic Tools','Software Tutorials','Paper Download','Medical Health','Lectures','Coding Practice','Comprehensive Platforms','Humanities','Science','K12 Courses','Music Learning'] },
  { id: 'software', name: 'Software', icon: '⬇️', subCats: ['PC/Android','Mac Software','Software Forums','General Recommendations','Browser Extensions','System ISO','IOS'], more: true },
  { id: 'image-tools', name: 'Image Tools', icon: '🖼️', subCats: ['HD Wallpapers','Background Remover','Image Download','Image Mockup','Image Collage','Online Design','Reverse Image Search','Format Conversion','Other Tools'] },
  { id: 'tool-sites', name: 'Tool Sites', icon: '🔧', subCats: ['PDF Tools','Digital Tools','Map Sites','File Transfer','Short Video Download','Webmaster Tools','System Tools','All-in-One Tools','Cloud Storage','Finance','Creator Tools','Audio Processing','Other Tools'] },
  { id: 'career', name: 'Career Tools', icon: '👔', subCats: ['Job Sites','Job Forums','Resume Tools'] },
  { id: 'entertainment', name: 'Entertainment', icon: '🎮', subCats: null },
  { id: 'reading', name: 'Communities', icon: '📰', subCats: ['Quality Forums','Rankings','News Aggregators'] },
];

let allTools = [];
let currentView = 'grid'; // 'grid' | 'list'
let activeSidebarSection = 'hot';

// Search tab configurations with user-specified engines and exact URLs
const searchTabConfig = {
  site: {
    placeholder: 'Search site...',
    engines: [],
    engineUrls: {}
  },
  cloud: {
    placeholder: 'Search cloud drives...',
    engines: ['Google Drive','OneDrive','Dropbox','Mega','iCloud'],
    engineUrls: {
      'Google Drive': 'https://drive.google.com/drive/search?q=',
      'OneDrive': 'https://onedrive.live.com/search?q=',
      'Dropbox': 'https://www.dropbox.com/search?q=',
      'Mega': 'https://mega.nz/search?q=',
      'iCloud': 'https://www.icloud.com/search?q=',
    }
  },
  engines: {
    placeholder: 'Google web search',
    engines: ['Google','Bing','DuckDuckGo','Yahoo','Yandex','Brave Search'],
    engineUrls: {
      'Google': 'https://www.google.com/search?q=',
      'Bing': 'https://www.bing.com/search?q=',
      'DuckDuckGo': 'https://duckduckgo.com/?q=',
      'Yahoo': 'https://search.yahoo.com/search?p=',
      'Yandex': 'https://yandex.com/search/?text=',
      'Brave Search': 'https://search.brave.com/search?q=',
    }
  },
  video: {
    placeholder: 'YouTube search',
    engines: ['YouTube','TikTok','Vimeo','Twitch','Dailymotion'],
    engineUrls: {
      'YouTube': 'https://www.youtube.com/results?search_query=',
      'TikTok': 'https://www.tiktok.com/search?q=',
      'Vimeo': 'https://vimeo.com/search?q=',
      'Twitch': 'https://www.twitch.tv/search?term=',
      'Dailymotion': 'https://www.dailymotion.com/search/',
    }
  },
  movies: {
    placeholder: 'Enter movie or TV show name...',
    engines: ['Netflix','Disney+','Hulu','Prime Video','HBO Max','Apple TV+'],
    engineUrls: {
      'Netflix': 'https://www.netflix.com/search?q=',
      'Disney+': 'https://www.disneyplus.com/search?q=',
      'Hulu': 'https://www.hulu.com/search?q=',
      'Prime Video': 'https://www.amazon.com/s?k=',
      'HBO Max': 'https://www.max.com/search?q=',
      'Apple TV+': 'https://tv.apple.com/search?term=',
    }
  },
  music: {
    placeholder: 'Enter song or artist name...',
    engines: ['Spotify','Apple Music','YouTube Music','SoundCloud','Deezer'],
    engineUrls: {
      'Spotify': 'https://open.spotify.com/search/',
      'Apple Music': 'https://music.apple.com/search?term=',
      'YouTube Music': 'https://music.youtube.com/search?q=',
      'SoundCloud': 'https://soundcloud.com/search?q=',
      'Deezer': 'https://www.deezer.com/search/',
    }
  },
  shopping: {
    placeholder: 'Search products...',
    engines: ['Amazon','eBay','Walmart','Target','Best Buy','AliExpress'],
    engineUrls: {
      'Amazon': 'https://www.amazon.com/s?k=',
      'eBay': 'https://www.ebay.com/sch/i.html?_nkw=',
      'Walmart': 'https://www.walmart.com/search?q=',
      'Target': 'https://www.target.com/s?searchTerm=',
      'Best Buy': 'https://www.bestbuy.com/site/searchpage.jsp?st=',
      'AliExpress': 'https://www.aliexpress.com/w/wholesale-.html?SearchText=',
    }
  },
  community: {
    placeholder: 'Reddit search',
    engines: ['Reddit','X(Twitter)','Facebook','Discord','Quora','Stack Overflow'],
    engineUrls: {
      'Reddit': 'https://www.reddit.com/search?q=',
      'X(Twitter)': 'https://twitter.com/search?q=',
      'Facebook': 'https://www.facebook.com/search/top?q=',
      'Discord': 'https://discord.com/search?q=',
      'Quora': 'https://www.quora.com/search?q=',
      'Stack Overflow': 'https://stackoverflow.com/search?q=',
    }
  },
  lifestyle: {
    placeholder: 'Google Maps search',
    engines: ['Google Maps','Yelp','TripAdvisor','IMDb','Wikipedia'],
    engineUrls: {
      'Google Maps': 'https://www.google.com/maps/search/',
      'Yelp': 'https://www.yelp.com/search?find_desc=',
      'TripAdvisor': 'https://www.tripadvisor.com/Search?q=',
      'IMDb': 'https://www.imdb.com/find?q=',
      'Wikipedia': 'https://en.wikipedia.org/w/index.php?search=',
    }
  },
};

let currentSearchTab = 'site';
let currentSubEngine = null;

// Dynamic layout offset tracking
function updateLayoutOffsets() {
  const searchArea = document.getElementById('search-area');
  if (!searchArea) return;
  const h = searchArea.offsetHeight;
  const root = document.documentElement;
  const topbarH = parseInt(getComputedStyle(root).getPropertyValue('--topbar-height'));
  root.style.setProperty('--search-height', h + 'px');

}

function populateSidebarPreviews() {
  document.querySelectorAll('.sidebar-item').forEach(item => {
    const sectionId = item.dataset.section;
    const def = categoryDefs.find(d => d.id === sectionId);
    if (!def) return;
    const tools = filterByCategory(allTools, sectionId);
    if (!tools.length) return;

    const preview = document.createElement('div');
    preview.className = 'sidebar-preview';
    preview.innerHTML = tools.map(t => `
      <a href="${t.url}" target="_blank" rel="noopener" class="sidebar-preview-item">
        ${t.name}
      </a>
    `).join('');
    item.appendChild(preview);
  });
}

let searchResizeObserver = null;
function initLayoutObserver() {
  const searchArea = document.getElementById('search-area');
  if (!searchArea) return;
  searchResizeObserver = new ResizeObserver(() => updateLayoutOffsets());
  searchResizeObserver.observe(searchArea);
  updateLayoutOffsets();
}

(async () => {
  allTools = await loadTools();
  if (!allTools.length) return;
  renderAllSections();
  populateSidebarPreviews();
  initLayoutObserver();
  initSidebar();
  initSearchTabs();
  initSearch();
  initFloatingButtons();
  initScrollSpy();
  initMobileMenu();
})();

async function loadTools() {
  try {
    const res = await fetch('/tools.json');
    return await res.json();
  } catch (e) {
    console.error('Failed to load tools:', e);
    return [];
  }
}

function filterByCategory(tools, category) {
  return tools.filter(t => t.category === category);
}

// Friend links data
// ===== Render All Sections =====
function renderAllSections() {
  const container = document.getElementById('sections-container');
  if (!container) return;

  let html = '';
  categoryDefs.forEach(def => {

    const tools = filterByCategory(allTools, def.id);
    if (!tools.length) return;

    const hasSubCats = def.subCats && def.subCats.length > 1;
    html += `<section id="section-${def.id}" class="content-section">`;
    html += `<div class="section-header">`;
    html += `<h2 class="section-title">${def.icon} ${def.name} <span class="count">(${tools.length} tools)</span></h2>`;
    if (def.more) html += `<a href="#" class="more-link">more+</a>`;
    html += `</div>`;

    if (hasSubCats) {
      html += renderSubTabs(def.id, def.subCats);
      html += `<div class="tools-grid" id="grid-${def.id}" data-category="${def.id}" data-notags="${def.noTags || false}">`;
      html += tools.map(t => renderToolCard(t, def.noTags)).join('');
      html += `</div>`;
    } else {
      html += `<div class="tools-grid" id="grid-${def.id}" data-category="${def.id}" data-notags="${def.noTags || false}">`;
      html += tools.map(t => renderToolCard(t, def.noTags)).join('');
      html += `</div>`;
    }
    html += `</section>`;
  });

  container.innerHTML = html;

  // Bind sub-tab click handlers
  categoryDefs.forEach(def => {
    if (!def.subCats || def.subCats.length <= 1) return;
    const section = document.getElementById(`section-${def.id}`);
    if (!section) return;
    section.querySelectorAll('.sub-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        section.querySelectorAll('.sub-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        filterBySubTab(def.id, tab.dataset.sub);
      });
    });
  });
}

function renderSubTabs(catId, subCats) {
  let html = '<div class="sub-tabs">';
  html += `<span class="sub-tab active" data-sub="all">All</span>`;
  subCats.forEach(sub => {
    html += `<span class="sub-tab" data-sub="${sub.toLowerCase().replace(/\s+/g,'-')}">${sub}</span>`;
  });
  html += '</div>';
  return html;
}

function filterBySubTab(catId, subTab) {
  const grid = document.getElementById(`grid-${catId}`);
  if (!grid) return;
  const tools = filterByCategory(allTools, catId);
  const def = categoryDefs.find(d => d.id === catId);
  const noTags = def && def.noTags;

  if (subTab === 'all') {
    grid.innerHTML = tools.map(t => renderToolCard(t, noTags)).join('');
    return;
  }

  const filtered = tools.filter(t =>
    t.tags.some(tag => tag.toLowerCase().includes(subTab.replace(/-/g,' '))) ||
    t.description.toLowerCase().includes(subTab.replace(/-/g,' '))
  );
  grid.innerHTML = filtered.length
    ? filtered.map(t => renderToolCard(t, noTags)).join('')
    : '<div class="text-muted" style="grid-column:1/-1;padding:20px;text-align:center;color:var(--text-muted)">No tools match this filter</div>';
}

function getDomain(url) {
  try { return new URL(url).hostname.replace('www.', ''); } catch(e) { return ''; }
}

const iconColors = ['#e53935','#1e88e5','#43a047','#fb8c00','#8e24aa','#00acc1','#d81b60','#3949ab','#6d4c41','#00897b','#c0ca33','#f4511e'];

function renderToolCard(tool, noTags) {
  const domain = getDomain(tool.url);
  const favicon = domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=32` : '';
  const letter = tool.name.charAt(0).toUpperCase();
  const color = iconColors[tool.name.length % iconColors.length];

  return `
    <a href="${tool.url}" target="_blank" rel="noopener noreferrer" class="tool-card">
      ${tool.hot ? '<span class="hot-badge">HOT</span>' : ''}
      <div class="tool-card-icon">
        <img src="${favicon}" alt="" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"
             style="width:28px;height:28px">
        <span class="icon-letter" style="display:none;background:${color}">${letter}</span>
      </div>
      <div class="tool-card-body">
        <div class="tool-card-name">${tool.name}</div>
        <div class="tool-card-desc">${tool.description}</div>
      </div>
    </a>
  `;
}

// ===== Sidebar Navigation =====
function initSidebar() {
  const items = document.querySelectorAll('.sidebar-item');
  items.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById(`section-${item.dataset.section}`);
      if (target) {
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--topbar-height'))
          + parseInt(getComputedStyle(document.documentElement).getPropertyValue('--search-height')) + 20;
        window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
      }
      setActiveSidebar(item.dataset.section);
      // Close mobile sidebar if open
      document.getElementById('sidebar')?.classList.remove('open');
      document.getElementById('mobile-overlay')?.classList.remove('open');
    });
  });
}

function setActiveSidebar(sectionId) {
  activeSidebarSection = sectionId;
  document.querySelectorAll('.sidebar-item').forEach(item => {
    item.classList.toggle('active', item.dataset.section === sectionId);
  });
}

// ===== Scroll Spy =====
function initScrollSpy() {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateActiveOnScroll();
        ticking = false;
      });
      ticking = true;
    }
  });
}

function updateActiveOnScroll() {
  const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--topbar-height'))
    + parseInt(getComputedStyle(document.documentElement).getPropertyValue('--search-height')) + 80;

  let current = 'hot';
  categoryDefs.forEach(def => {
    const el = document.getElementById(`section-${def.id}`);
    if (el && el.getBoundingClientRect().top < offset) {
      current = def.id;
    }
  });
  if (current !== activeSidebarSection) {
    setActiveSidebar(current);
  }
}

// ===== Search Tabs =====
function moveSearchArrow() {
  const arrow = document.getElementById('search-arrow');
  const subBar = document.getElementById('sub-search-bar');
  if (!arrow) return;

  if (subBar && subBar.classList.contains('active')) {
    const activeLink = subBar.querySelector('.sub-search-link.active');
    if (activeLink) {
      const subRect = subBar.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      const searchRow = document.querySelector('.search-box-row');
      const rowRect = searchRow.getBoundingClientRect();
      const arrowLeft = linkRect.left + linkRect.width / 2 - rowRect.left;
      arrow.style.left = arrowLeft + 'px';
      arrow.style.transform = 'translateX(-50%)';
      return;
    }
  }
  arrow.style.left = '50%';
  arrow.style.transform = 'translateX(-50%)';
}

function initSearchTabs() {
  const tabs = document.querySelectorAll('.search-tab');
  const input = document.getElementById('main-search-input');
  const subBar = document.getElementById('sub-search-bar');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabId = tab.dataset.tab;
      currentSearchTab = tabId;
      currentSubEngine = null;
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const config = searchTabConfig[tabId];
      if (input) input.placeholder = config.placeholder;

      if (subBar && config.engines.length) {
        subBar.innerHTML = config.engines.map((e, i) =>
          `<span class="sub-search-link${i === 0 ? ' active' : ''}" data-engine="${e}">${e}</span>`
        ).join('');
        subBar.classList.add('active');
        currentSubEngine = config.engines[0];

        // Bind sub-engine clicks
        subBar.querySelectorAll('.sub-search-link').forEach(link => {
          link.addEventListener('click', () => {
            subBar.querySelectorAll('.sub-search-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            currentSubEngine = link.dataset.engine;
            moveSearchArrow();
          });
        });
      } else if (subBar) {
        subBar.classList.remove('active');
        currentSubEngine = null;
      }

      moveSearchArrow();
      setTimeout(updateLayoutOffsets, 50);
    });
  });

  window.addEventListener('resize', moveSearchArrow);
}

// ===== Search =====
function initSearch() {
  const mainInput = document.getElementById('main-search-input');
  const mainBtn = document.getElementById('main-search-btn');
  const globalBtn = document.getElementById('global-search-btn');

  if (mainInput) {
    mainInput.addEventListener('input', debounce(doSearch, 200));
    mainInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') executeSearch(); });
  }
  if (mainBtn) mainBtn.addEventListener('click', executeSearch);
  if (globalBtn) globalBtn.addEventListener('click', () => {
    document.getElementById('main-search-input')?.focus();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Close results on outside click
  document.addEventListener('click', (e) => {
    const results = document.getElementById('search-results');
    if (results && !e.target.closest('#main-search-input') && !e.target.closest('#search-results')) {
      results.classList.remove('active');
    }
  });
}

function executeSearch() {
  const input = document.getElementById('main-search-input');
  const query = input?.value?.trim();
  if (!query) {
    input?.focus();
    input?.classList.add('shake');
    setTimeout(() => input?.classList.remove('shake'), 400);
    return;
  }

  // Site search or cloud drive: local tools search
  if (currentSearchTab === 'site' || currentSearchTab === 'cloud') {
    doSearch();
    return;
  }

  // External engine search
  const config = searchTabConfig[currentSearchTab];
  let searchUrl;
  if (currentSubEngine && config.engineUrls) {
    searchUrl = config.engineUrls[currentSubEngine] + encodeURIComponent(query);
  } else if (config.engines.length && config.engineUrls) {
    searchUrl = config.engineUrls[config.engines[0]] + encodeURIComponent(query);
  } else {
    doSearch();
    return;
  }

  window.open(searchUrl, '_blank', 'noopener');
}

function doSearch() {
  const input = document.getElementById('main-search-input');
  const q = input?.value?.trim().toLowerCase();
  if (!q || q.length < 2) {
    document.getElementById('search-results')?.classList.remove('active');
    return;
  }

  const matches = allTools.filter(t =>
    t.name.toLowerCase().includes(q) ||
    t.description.toLowerCase().includes(q) ||
    t.tags.some(tag => tag.toLowerCase().includes(q))
  ).slice(0, 15);

  let results = document.getElementById('search-results');
  if (!results) {
    results = document.createElement('div');
    results.id = 'search-results';
    input.parentElement.style.position = 'relative';
    input.parentElement.appendChild(results);
  }

  if (matches.length) {
    results.innerHTML = matches.map(t => `
      <a href="${t.url}" target="_blank" rel="noopener noreferrer" class="search-result-item">
        <div class="search-result-name">${t.name}</div>
        <div class="search-result-desc">${t.description.slice(0, 100)}</div>
      </a>
    `).join('');
  } else {
    results.innerHTML = '<div style="padding:12px 16px;color:var(--text-muted);font-size:13px">No results found</div>';
  }
  results.classList.add('active');
}

// ===== Floating Button =====
function initFloatingButtons() {
  document.getElementById('btn-back-to-top')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== Mobile Menu =====
function initMobileMenu() {
  let btn = document.getElementById('mobile-menu-btn');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'mobile-menu-btn';
    btn.className = 'topbar-icon';
    btn.innerHTML = '☰';
    btn.title = 'Menu';
    document.querySelector('.topbar-right')?.prepend(btn);
  }

  let overlay = document.getElementById('mobile-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'mobile-overlay';
    document.body.appendChild(overlay);
  }

  btn.addEventListener('click', () => {
    const sidebar = document.getElementById('sidebar');
    sidebar?.classList.toggle('open');
    overlay.classList.toggle('open');
  });

  overlay.addEventListener('click', () => {
    document.getElementById('sidebar')?.classList.remove('open');
    overlay.classList.remove('open');
  });
}

// ===== Utilities =====
function debounce(fn, ms) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}
