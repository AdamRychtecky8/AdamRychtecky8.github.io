// ── Blog: manifest + query-param routing ───────────────────────────────────
//
// How to add a new post (no build step):
//   1. Write your post as plain Markdown in blog/posts/<slug>.md
//      (just the body — no frontmatter, marked renders the file as-is).
//   2. Add one entry to the POSTS array below with a matching `slug`.
//   3. Commit both files. That's it — personalblog.html?post=<slug> will
//      fetch and render it, and it'll show up in the index sorted by date.
//
// Views:
//   personalblog.html               → index list of all posts (newest first)
//   personalblog.html?post=<slug>   → that single post
//
(function () {

  // ── Post manifest ─────────────────────────────────────────────────────
  const POSTS = [
    {
      slug: 'flexible-wisdom',
      title: 'Starting the Thesis: Human vs. LLM Ensembles',
      date: '2026-08-06',
      excerpt: 'Kicking off a research log for my honors thesis on collective intelligence — why I’m comparing human and LLM ensembles, and what I expect to find.',
      tags: ['Research', 'Honors Thesis', 'LLMs'],
    },
  ];

  // ── Helpers ──────────────────────────────────────────────────────────
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function formatDate(iso) {
    const d = new Date(iso + 'T00:00:00');
    if (isNaN(d)) return iso;
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  function sortedPosts() {
    return [...POSTS].sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  // ── Index view ───────────────────────────────────────────────────────
  function renderIndex() {
    const list = document.getElementById('blog-list');
    if (!list) return;

    const posts = sortedPosts();
    if (posts.length === 0) {
      list.innerHTML = '<p class="placeholder">No posts yet — check back soon.</p>';
      return;
    }

    list.innerHTML = posts.map(post => `
      <a class="blog-card fade-up" href="personalblog.html?post=${encodeURIComponent(post.slug)}">
        <span class="blog-card-date">${formatDate(post.date)}</span>
        <h3>${escapeHtml(post.title)}</h3>
        <p>${escapeHtml(post.excerpt)}</p>
        ${post.tags && post.tags.length ? `<div class="tags">${post.tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('')}</div>` : ''}
      </a>
    `).join('');
  }

  // ── Single-post view ─────────────────────────────────────────────────
  function renderPostHeader(post) {
    return `
      <header class="post-header">
        <h1 class="post-title">${escapeHtml(post.title)}</h1>
        <div class="post-meta">${formatDate(post.date)}</div>
        ${post.tags && post.tags.length ? `<div class="tags post-tags">${post.tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('')}</div>` : ''}
      </header>
    `;
  }

  async function renderPost(slug) {
    const post = POSTS.find(p => p.slug === slug);
    const body = document.getElementById('blog-post-body');

    // Unknown slug — not a fetch problem, the manifest just has no such post.
    if (!post) {
      body.innerHTML = '<header class="post-header"><h1 class="post-title">Post not found</h1></header>'
        + `<p class="placeholder">No post found for "${escapeHtml(slug)}". It may have been moved or the link is wrong.</p>`;
      document.title = 'Post not found — Adam Rychtecky Blog';
      return;
    }

    document.title = post.title + ' — Adam Rychtecky Blog';
    body.innerHTML = renderPostHeader(post) + '<article class="post-content" id="post-article">Loading…</article>';
    const article = document.getElementById('post-article');

    let markdown;
    try {
      const res = await fetch(`blog/posts/${encodeURIComponent(post.slug)}.md`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      markdown = await res.text();
    } catch (err) {
      article.classList.add('placeholder');
      article.textContent = `Couldn’t load this post (${err.message}). Try refreshing, or check back later.`;
      return;
    }

    if (typeof marked !== 'undefined') {
      article.innerHTML = marked.parse(markdown);
    } else {
      // marked didn't load (CDN blocked/offline) — fall back to plain text
      // rather than showing raw, unstyled Markdown as broken HTML.
      article.classList.add('plain-fallback');
      article.textContent = markdown;
    }
  }

  // ── Routing ──────────────────────────────────────────────────────────
  function route() {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('post');

    const indexView = document.getElementById('blog-index');
    const postView = document.getElementById('blog-post');

    if (slug) {
      indexView.hidden = true;
      postView.hidden = false;
      renderPost(slug);
    } else {
      postView.hidden = true;
      indexView.hidden = false;
      document.title = 'Blog — Adam Rychtecky';
      renderIndex();
    }
  }

  route();
})();
