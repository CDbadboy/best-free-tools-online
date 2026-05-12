// Best Free Tools Online - Shared JavaScript
// Loads tools from tools.json and renders them

const categories = {
  'ai-chat': { name: 'AI Chatbots', icon: '💬', slug: 'ai-chat' },
  'ai-image': { name: 'AI Image Generators', icon: '🎨', slug: 'ai-image' },
  'ai-code': { name: 'AI Coding Tools', icon: '⚡', slug: 'ai-code' },
  'developer': { name: 'Developer Tools', icon: '💻', slug: 'developer' },
  'design': { name: 'Design Resources', icon: '🖌️', slug: 'design' },
  'learning': { name: 'Learning Resources', icon: '📚', slug: 'learning' },
  'productivity': { name: 'Productivity Tools', icon: '🚀', slug: 'productivity' }
};

function renderToolCard(tool) {
  const cat = categories[tool.category];
  return `
    <div class="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-600 transition-all duration-300 group">
      <div class="flex items-start justify-between mb-3">
        <div>
          <h3 class="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
            <a href="${tool.url}" target="_blank" rel="noopener noreferrer">${tool.name}</a>
          </h3>
          <span class="text-xs text-gray-500">${cat ? cat.icon + ' ' + cat.name : ''}</span>
        </div>
        <a href="${tool.url}" target="_blank" rel="noopener noreferrer"
           class="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-500 transition-colors whitespace-nowrap">
          Visit →
        </a>
      </div>
      <p class="text-gray-400 text-sm mb-3 leading-relaxed">${tool.description}</p>
      <div class="flex items-center justify-between">
        <span class="text-green-400 text-xs font-medium">✅ ${tool.free}</span>
        <div class="flex gap-1.5 flex-wrap">
          ${tool.tags.map(t => `<span class="px-2 py-0.5 bg-gray-800 text-gray-400 text-xs rounded-full">${t}</span>`).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderCategoryCard(cat) {
  return `
    <a href="${cat.slug}.html" class="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-blue-500 hover:bg-gray-800/50 transition-all duration-300 group block">
      <div class="text-3xl mb-3">${cat.icon}</div>
      <h3 class="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">${cat.name}</h3>
      <p class="text-gray-500 text-sm mt-1" id="count-${cat.slug}"></p>
    </a>
  `;
}

function renderHomeToolCard(tool) {
  return `
    <div class="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-600 transition-all duration-300">
      <div class="flex items-start justify-between mb-2">
        <h3 class="font-bold text-white">
          <a href="${tool.url}" target="_blank" rel="noopener noreferrer" class="hover:text-blue-400 transition-colors">${tool.name}</a>
        </h3>
        <a href="${tool.url}" target="_blank" rel="noopener noreferrer"
           class="px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-500 transition-colors whitespace-nowrap ml-3">
          Visit →
        </a>
      </div>
      <p class="text-gray-400 text-sm mb-2">${tool.description}</p>
      <span class="text-green-400 text-xs">✅ ${tool.free}</span>
    </div>
  `;
}

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

function getFeaturedTools(tools) {
  const featured = ['chatgpt', 'gemini', 'github-copilot', 'figma', 'vercel', 'notion'];
  return tools.filter(t => featured.includes(t.id));
}

// Mobile menu toggle
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-button');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => menu.classList.toggle('hidden'));
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => menu.classList.add('hidden'));
  });
}

// Search functionality
function initSearch(tools) {
  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');
  if (!input || !results) return;

  let debounce;
  input.addEventListener('input', () => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      const q = input.value.trim().toLowerCase();
      if (q.length < 2) { results.classList.add('hidden'); return; }
      const matches = tools.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some(tag => tag.toLowerCase().includes(q))
      ).slice(0, 6);
      if (matches.length > 0) {
        results.innerHTML = matches.map(t => `
          <a href="${t.url}" target="_blank" rel="noopener noreferrer"
             class="block px-4 py-3 hover:bg-gray-800 transition-colors border-b border-gray-800 last:border-0">
            <div class="text-white text-sm font-medium">${t.name}</div>
            <div class="text-gray-500 text-xs mt-0.5">${t.description.slice(0, 80)}...</div>
          </a>
        `).join('');
        results.classList.remove('hidden');
      } else {
        results.innerHTML = '<div class="px-4 py-3 text-gray-500 text-sm">No tools found</div>';
        results.classList.remove('hidden');
      }
    }, 200);
  });

  document.addEventListener('click', (e) => {
    if (!input.contains(e.target) && !results.contains(e.target)) {
      results.classList.add('hidden');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => initMobileMenu());
