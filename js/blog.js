// ── Blog: manifest + query-param routing ───────────────────────────────────
//
// How to add a new post (no build step):
//   1. Write your post as plain Markdown in blog/posts/<slug>.md
//      (just the body — no frontmatter, marked renders the file as-is).
//   2. Add one entry to the POSTS array below with a matching `slug`.
//      `tags` must be drawn from TAG_HUES below — the filter bar in
//      personalblog.html is static, so a tag outside that set would show up
//      on the entry but have no button to filter by.
//   3. Commit both files. That's it — personalblog.html?post=<slug> will
//      fetch and render it, and it'll show up in the index sorted by date.
//
// Read time is deliberately *not* stored on a post: the single-post view
// already fetches the Markdown, so the word count is free there and can never
// drift when a post is edited. The index omits read time entirely so it never
// has to fetch every post just to render the list.
//
// Views:
//   personalblog.html               → index list of all posts (newest first)
//   personalblog.html?post=<slug>   → that single post
//
(function () {

  // ── Topic taxonomy ────────────────────────────────────────────────────
  // Tag → hue slug. The slug drives the [data-hue] ramps in css/blog.css and
  // must match the data-hue on the corresponding .filter-btn.
  const TAG_HUES = {
    'Research':  'research',
    'Build Log': 'build-log',
    'ML Notes':  'ml-notes',
    'Career':    'career',
  };

  const WORDS_PER_MINUTE = 220;

  // ── Post manifest ─────────────────────────────────────────────────────
  const POSTS = [
    {
      slug: 'flexible-wisdom',
      title: 'Starting the Thesis: Human vs. LLM Ensembles',
      date: '2026-08-06',
      excerpt: 'Kicking off a research log for my honors thesis on collective intelligence — why I’m comparing human and LLM ensembles, and what I expect to find.',
      tags: ['Research'],
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

  function tagChip(tag) {
    const hue = TAG_HUES[tag];
    return `<span class="tag"${hue ? ` data-hue="${hue}"` : ''}>${escapeHtml(tag)}</span>`;
  }

  // ── Index view ───────────────────────────────────────────────────────
  function logEntry(post) {
    const tags = post.tags || [];
    // The entry's rail takes the hue of its first tag.
    const hue = tags.length ? TAG_HUES[tags[0]] : null;
    return `
      <a class="log-entry fade-up" href="personalblog.html?post=${encodeURIComponent(post.slug)}"
         data-tags="${escapeHtml(tags.join('|'))}"${hue ? ` data-hue="${hue}"` : ''}>
        <span class="log-date">${escapeHtml(post.date)}</span>
        <div class="log-body">
          <h3>${escapeHtml(post.title)}</h3>
          <p>${escapeHtml(post.excerpt)}</p>
          ${tags.length ? `<div class="tags">${tags.map(tagChip).join('')}</div>` : ''}
        </div>
      </a>
    `;
  }

  function renderIndex() {
    const list = document.getElementById('blog-list');
    if (!list) return;

    const posts = sortedPosts();
    if (posts.length === 0) {
      list.innerHTML = '<p class="placeholder">No posts yet — check back soon.</p>';
      return;
    }

    // Posts are already newest-first, so consecutive runs of the same year
    // are exactly the year groups.
    const groups = [];
    for (const post of posts) {
      const year = post.date.slice(0, 4);
      const last = groups[groups.length - 1];
      if (last && last.year === year) last.posts.push(post);
      else groups.push({ year, posts: [post] });
    }

    list.innerHTML = groups.map(group => `
      <section class="log-group">
        <div class="log-year">
          <span class="log-year-num">${group.year}</span>
          <span class="log-year-rule"></span>
          <span class="log-year-count">${group.posts.length} ${group.posts.length === 1 ? 'entry' : 'entries'}</span>
        </div>
        <div class="log-list">${group.posts.map(logEntry).join('')}</div>
      </section>
    `).join('');

    // Same .hidden toggle as projects.html, but wired up here rather than in
    // the page because the entries only exist after this injection.
    initFilter(list);
  }

  function initFilter(list) {
    const btns = document.querySelectorAll('.blog-filter .filter-btn');
    if (!btns.length) return;

    const entries = list.querySelectorAll('.log-entry');
    const empty = document.getElementById('blog-empty');

    function apply(tag) {
      entries.forEach(entry => {
        const tags = (entry.dataset.tags || '').split('|');
        entry.classList.toggle('hidden', tag !== 'all' && !tags.includes(tag));
      });
      // A year header has nothing to head once its group filters out.
      list.querySelectorAll('.log-group').forEach(group => {
        group.hidden = !group.querySelector('.log-entry:not(.hidden)');
      });
      if (empty) empty.hidden = !!list.querySelector('.log-entry:not(.hidden)');
    }

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        apply(btn.dataset.tag);
      });
    });

    const active = document.querySelector('.blog-filter .filter-btn.active');
    apply(active ? active.dataset.tag : 'all');
  }

  // ── Single-post view ─────────────────────────────────────────────────
  function renderPostHeader(post) {
    const tags = post.tags || [];
    return `
      <header class="post-header">
        <h1 class="post-title">${escapeHtml(post.title)}</h1>
        <div class="post-meta">
          <span class="post-date">${formatDate(post.date)}</span>
          <span class="meta-sep" id="readtime-sep" hidden>&middot;</span>
          <span id="post-readtime" hidden></span>
          ${tags.length ? `<span class="meta-sep">&middot;</span><span class="tags post-tags">${tags.map(tagChip).join('')}</span>` : ''}
        </div>
      </header>
    `;
  }

  function postNavLink(dir, post) {
    const label = dir === 'prev' ? '&larr; Previous' : 'Next &rarr;';
    if (!post) {
      const msg = dir === 'prev' ? 'Oldest post — no previous entry' : 'Newest post — no next entry';
      return `
        <span class="post-nav-link ${dir} disabled">
          <span class="post-nav-label">${label}</span>
          <span class="post-nav-title">${msg}</span>
        </span>
      `;
    }
    return `
      <a class="post-nav-link ${dir}" href="personalblog.html?post=${encodeURIComponent(post.slug)}">
        <span class="post-nav-label">${label}</span>
        <span class="post-nav-title">${escapeHtml(post.title)}</span>
      </a>
    `;
  }

  function renderPostNav(post) {
    // sortedPosts() is newest-first, so the older post sits one index later.
    const posts = sortedPosts();
    const i = posts.findIndex(p => p.slug === post.slug);
    const older = i >= 0 && i < posts.length - 1 ? posts[i + 1] : null;
    const newer = i > 0 ? posts[i - 1] : null;
    return `<nav class="post-nav">${postNavLink('prev', older)}${postNavLink('next', newer)}</nav>`;
  }

  function showReadTime(markdown) {
    const words = markdown.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE));
    const slot = document.getElementById('post-readtime');
    const sep = document.getElementById('readtime-sep');
    if (!slot || !sep) return;
    slot.textContent = `${minutes} min read`;
    slot.hidden = false;
    sep.hidden = false;
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
    // Prev/next is manifest-derived, so it renders up front and survives a
    // failed fetch — the reader always has somewhere to go.
    body.innerHTML = renderPostHeader(post)
      + '<article class="post-content" id="post-article">Loading…</article>'
      + renderPostNav(post);
    const article = document.getElementById('post-article');

    let markdown;
    try {
      const res = await fetch(`blog/posts/${encodeURIComponent(post.slug)}.md`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      markdown = await res.text();
    } catch (err) {
      // No Markdown means no word count, so read time stays out of .post-meta
      // rather than being rendered as zero.
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
    showReadTime(markdown);
  }

  // ── Reading progress (post view only) ────────────────────────────────
  function initReadingProgress() {
    const bar = document.getElementById('reading-progress');
    const fill = document.getElementById('reading-progress-fill');
    if (!bar || !fill) return null;

    bar.hidden = false;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? window.scrollY / max : 0;
      fill.style.width = (Math.min(1, Math.max(0, ratio)) * 100).toFixed(2) + '%';
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
    return update;
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
      const update = initReadingProgress();
      // Re-measure once the post body lands and the page has its real height.
      renderPost(slug).then(() => { if (update) update(); });
    } else {
      postView.hidden = true;
      indexView.hidden = false;
      document.title = 'Blog — Adam Rychtecky';
      renderIndex();
    }
  }

  route();
})();
