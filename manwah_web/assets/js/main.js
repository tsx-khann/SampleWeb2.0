(function(){
  // ===================== UTILITIES =====================
  function escapeHtml(s){
    return (s||'').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  function renderStars(r) {
    const full = Math.round(r);
    const fullStars = '★'.repeat(full);
    const emptyStars = '☆'.repeat(5 - full);
    return `<span style="color: gold;">${fullStars}</span><span style="color: #ccc;">${emptyStars}</span>`;
  }

  // ===================== IMAGE GENERATORS =====================
  function titleShortcut(title){
    return title.split(' ').map(w=>w[0].toLowerCase()).join('');
  }

  function generateCoverImage(title){
      const shortcut = titleShortcut(title);
      return `assets/images/series/covers/${shortcut}_cover.png`;
  }

  function generateChapters(title, chapterCount, pagesPerChapter = 15) {
    const shortcut = titleShortcut(title);
    const chapters = [];
    for (let c = 1; c <= chapterCount; c++) {
        const pages = [];
        for (let p = 1; p <= pagesPerChapter; p++) {
            pages.push(`assets/images/series/chapters/${shortcut}/cha${c}/${p}.webp`);
            pages.push(`assets/images/series/chapters/${shortcut}/cha${c}/${p}.jpg`);
        }
        chapters.push({
            id: `${shortcut}-c${c}`,
            title: `Chapter ${c}`,
            images: pages
        });
    }
    return chapters;
  }

  const MOCK_SERIES = [
    {
      id: 's1',
      title: 'The Knight King Who Returned with a God',
      desc: 'A returning knight...',
      cover: 'assets/images/series/covers/tkkwrwag_cover.webp',
      rating: 3.5,
      chapters: generateChapters('The Knight King Who Returned with a God', 12)
    },
    {
      id: 's2',
      title: 'A Mercenary’s Rebirth Among Nobles',
      desc: 'Read Full A Mercenary’s Rebirth Among Nobles / 환생했더니 대공의 셋째 아들 Manhwa... ',
      cover: 'assets/images/series/covers/amran_cover.webp',
      rating: 3.9,
      chapters: generateChapters('A Mercenary’s Rebirth Among Nobles', 6)
    },
    {
      id: 's3',
      title: 'The Regressed Extra Becomes a Genius',
      desc: 'The story delves into the life of Kim Seon-woo...',
      cover: 'assets/images/series/covers/rexbg_cover.webp',
      rating: 4,
      chapters: generateChapters('The Regressed Extra Becomes a Genius', 8)
    },
    {
      id: 's4',
      title: 'High Martiality: With One Hand, I Single-Handedly Repel Three Thousand Emperors!',
      desc: 'Read High Martiality: With One Hand...',
      cover: 'assets/images/series/covers/hmwohishrtte_cover.webp',
      rating: 4.4,
      chapters: generateChapters('High Martiality: With One Hand, I Single-Handedly Repel Three Thousand Emperors!', 21)
    },
    {
      id: 's5',
      title: 'Crimson Reset',
      desc: 'After half a year on the run, the vampire Eugene was ultimately killed...',
      cover: 'assets/images/series/covers/cr_cover.webp',
      rating: 4.1,
      chapters: generateChapters('Crimson Reset', 16)
    },
    {
      id: 's6',
      title: 'Villain To Kill',
      desc: '“You must become the greater evil to fight against the real evil!”...',
      cover: 'assets/images/series/covers/vtk_cover.webp',
      rating: 5,
      chapters: generateChapters('Villain To Kill', 14)
    },
    {
      id: 's7',
      title: 'The Ultimate Shut-In',
      desc: 'One day, the end of the world suddenly arrived...',
      cover: 'assets/images/series/covers/tusi_cover.webp',
      rating: 4.6,
      chapters: generateChapters('The Ultimate Shut-In', 12)
    },
    {
      id: 's8',
      title: 'Playing the Perfect Fox-Eyed Villain',
      desc: 'A crazed sociopath. A monster who wears human skin...',
      cover: 'assets/images/series/covers/ppfev_cover.webp',
      rating: 4.1,
      chapters: generateChapters('Playing the Perfect Fox-Eyed Villain', 15)
    }
  ];

  // ===================== HEADER TOGGLE =====================
  const headerToggleBtn = document.getElementById('headerToggleBtn');
  const headerToggleIcon = document.getElementById('headerToggleIcon');
  const header = document.querySelector('.site-header');

  if(headerToggleBtn && header && headerToggleIcon){
    headerToggleBtn.onclick = ()=>{
      header.classList.toggle('hidden-header');
      if(header.classList.contains('hidden-header')){
        headerToggleIcon.src='assets/images/icon/down.png';
        headerToggleIcon.style.bottom='-30px';
      }else{
        headerToggleIcon.src='assets/images/icon/up.png';
        headerToggleIcon.style.bottom='3px';
      }
    };
  }

  // ===================== LOCAL STORAGE DB =====================
  const DB = {
    get(key,fallback){
      try{return JSON.parse(localStorage.getItem(key)) ?? fallback;}catch(e){return fallback;}
    },
    set(key,val){localStorage.setItem(key,JSON.stringify(val));}
  };

  // ===================== GLOBAL APP =====================
  window.MANWAH = {
    series: MOCK_SERIES,
    db: DB,
    findSeries(id){return MOCK_SERIES.find(s=>s.id===id);}
  };

  // ===================== DOM READY =====================
  document.addEventListener('DOMContentLoaded',()=>{
    const path = location.pathname.split('/').pop();

    // Menu toggle
    const menuBtn = document.getElementById("menuBtn");
    if(menuBtn){
      menuBtn.addEventListener("click",()=>{
        const menuPanel=document.getElementById("menuPanel");
        if(menuPanel) menuPanel.classList.toggle("hidden");
      });
    }

    // Header bookmark link: prefer explicit id, fallback to anchor[href="bookmark.html"]
    const headerBookmarkLink = document.getElementById('bookmarkLink') ||
                               document.querySelector('a[href="bookmark.html"]');
    if (headerBookmarkLink) {
      headerBookmarkLink.addEventListener('click', (e) => {
        e.preventDefault();
        location.href = 'bookmark.html';
      });
    }

    // Page initialization
    if(path==='index.html' || path==='') initHome();
    if(path==='series.html') loadSeriesFromHash();
    if(path==='reader.html') loadReaderFromHash();
    if(path==='signin.html') initSignin();
    if(path==='signup.html') initSignup();
    if(path==='bookmark.html') initBookmarksPage();

    // Search input live dropdown
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      const dropdown = document.createElement('div');
      dropdown.className = 'search-dropdown';
      dropdown.style.position = 'absolute';
      dropdown.style.background = '#111';
      dropdown.style.border = '1px solid #111';
      dropdown.style.borderRadius = '6px';
      dropdown.style.width = searchInput.offsetWidth + 'px';
      dropdown.style.maxHeight = '250px';
      dropdown.style.overflowY = 'auto';
      dropdown.style.zIndex = '999';
      dropdown.style.display = 'none';

      // Position dropdown below the search bar
      dropdown.style.top = searchInput.offsetHeight + 5 + 'px';
      dropdown.style.left = '0';

      // Ensure parent is relative for proper alignment
      searchInput.parentNode.style.position = 'relative';
      searchInput.parentNode.appendChild(dropdown);

      // Live search
      searchInput.addEventListener('input', () => {
        const q = searchInput.value.toLowerCase();
        const matches = window.MANWAH.series.filter(s => s.title.toLowerCase().includes(q));

        dropdown.innerHTML = '';

        if (matches.length > 0 && q.length > 0) {
          matches.forEach(s => {
            const item = document.createElement('div');
            item.textContent = s.title;
            item.style.padding = '6px 10px';
            item.style.cursor = 'pointer';
            item.style.borderBottom = '1px solid #222';

            item.addEventListener('mouseover', () => {
              item.style.background = '#222';
            });
            item.addEventListener('mouseout', () => {
              item.style.background = 'transparent';
            });

            item.addEventListener('click', () => {
              location.href = 'series.html#' + s.id;
            });

            dropdown.appendChild(item);
          });

          dropdown.style.display = 'block';
        } else {
          dropdown.style.display = 'none';
        }
      });

      // Hide dropdown when clicking outside
      document.addEventListener('click', e => {
        if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
          dropdown.style.display = 'none';
        }
      });
    }

    // Update auth menu
    updateAuthMenu();
  });

  // ===================== AUTH MENU =====================
  function updateAuthMenu(){
    const auth=DB.get('auth',null);
    const menuPanel=document.getElementById("menuPanel");
    if(!menuPanel) return;
    menuPanel.querySelectorAll('.auth-link').forEach(el=>el.remove());

    const authLink=document.createElement('a');
    authLink.className='auth-link';
    authLink.href='#';
    if(auth && auth.user){
      authLink.textContent='Logout';
      authLink.onclick=(e)=>{
        e.preventDefault();
        DB.set('auth',null);
        location.reload();
      };
    }else{
      authLink.textContent='Sign In';
      authLink.onclick=(e)=>{
        e.preventDefault();
        location.href='signin.html';
      };
    }
    menuPanel.appendChild(authLink);
  }

  // ===================== HOME =====================
  function initHome() {
    const latest = document.getElementById('latestList');
    const featured = document.getElementById('featuredList');
    const recommended = document.getElementById('recommendedList');

    const series = window.MANWAH?.series || [];

    if (latest) {
      renderSeriesCards(series.slice(0, 6), latest);
    }

    if (featured) {
      const featuredSeries = [...series]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 8);
      renderSeriesCards(featuredSeries, featured);
    }

    if (recommended) {
      const shuffled = [...series].sort(() => 0.5 - Math.random());
      renderSeriesCards(shuffled.slice(0, 3), recommended);
    }
  }

  function renderSeriesCards(list,container){
    container.innerHTML='';
    list.forEach(s=>{
      const el=document.createElement('div'); el.className='series-card';
      el.innerHTML=`<img src="${s.cover}" alt="${s.title}"><strong>${escapeHtml(s.title)}</strong><div>${renderStars(s.rating)}</div>`;
      el.addEventListener('click',()=>{location.href='series.html#'+s.id;});
      container.appendChild(el);
    });
  }

  // ===================== SERIES PAGE =====================
  function loadSeriesFromHash(){
    const id=location.hash.replace('#','')||'s1';
    const s=window.MANWAH.findSeries(id)||window.MANWAH.series[0];
    if(!s) return;

    const elTitle=document.getElementById('seriesTitle');
    const elDesc=document.getElementById('seriesDesc');
    const elCover=document.getElementById('seriesCover');
    const elRating=document.getElementById('seriesRating');
    const chapterList=document.getElementById('chapterList');

    elTitle && (elTitle.textContent=s.title);
    elDesc && (elDesc.textContent=s.desc);
    elCover && (elCover.src=s.cover);
    elRating && (elRating.innerHTML=renderStars(s.rating));

    if(chapterList){
      chapterList.innerHTML='';
      s.chapters.forEach(ch=>{
        const li=document.createElement('li');
        li.innerHTML=`<a href="reader.html#${s.id}|${ch.id}">${escapeHtml(ch.title)}</a>`;
        chapterList.appendChild(li);
      });
    }

    // Comments
    const commentsSection=document.getElementById('commentsSection');
    commentsSection && (commentsSection.innerHTML='');
    const comments=DB.get('comments',{})[s.id]||[];
    comments.forEach(c=>{
      const div=document.createElement('div'); div.className='comment';
      div.innerHTML=`<strong>${escapeHtml(c.user||'Random_ppl')}</strong><div>${escapeHtml(c.text)}</div>`;
      commentsSection.appendChild(div);
    });

    // Bookmark toggle (runs in scope where s is defined)
    const bookmarkBtn=document.getElementById('bookmarkBtn');
    if(bookmarkBtn) {
      const updateBookmarkTextForSeries = () => {
        const bm = DB.get('bookmarks', []);
        const isBookmarked = bm.includes(s.id);
        bookmarkBtn.textContent = isBookmarked ? "Bookmarked ✓" : "Bookmark";
        if (isBookmarked) bookmarkBtn.classList.add('bookmarked');
        else bookmarkBtn.classList.remove('bookmarked');
      };

      // initialize text
      updateBookmarkTextForSeries();

      bookmarkBtn.onclick = (e) => {
        e.preventDefault();
        const bm = DB.get('bookmarks', []);
        let newBm;
        if (bm.includes(s.id)) {
          newBm = bm.filter(x => x !== s.id);
        } else {
          newBm = bm.concat(s.id);
        }
        DB.set('bookmarks', newBm);
        updateBookmarkTextForSeries();
      };
    }
  }

  // ===================== READER =====================
  window.loadReaderFromHash = function() {
    const raw = location.hash.replace('#','');
    const [sid, cid] = raw.split('|');
    const s = window.MANWAH.findSeries(sid) || window.MANWAH.series[0];
    const ch = (s && s.chapters.find(x => x.id === cid)) || s.chapters[0];

    // Update Series and Chapter Titles
    const readerSeriesTitle = document.getElementById('readerSeriesTitle');
    const readerChapterTitle = document.getElementById('readerChapterTitle');
    if(readerSeriesTitle) readerSeriesTitle.textContent = s.title;
    if(readerChapterTitle) readerChapterTitle.textContent = ch.title;

    // Render Chapter Images
    const readerContent = document.getElementById('readerContent');
    if(!readerContent) return;
    readerContent.innerHTML = '';
    (ch.images || []).forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        readerContent.appendChild(img);
    });

    // CREATE Previous / Next Buttons BELOW THE IMAGES
    const navContainer = document.createElement('div');
    navContainer.className = 'reader-nav';

    const chapterIndex = s.chapters.indexOf(ch);

    // Previous button
    const prevBtn = document.createElement('button');
    prevBtn.className = 'btn';
    prevBtn.textContent = 'Previous';
    prevBtn.disabled = chapterIndex === 0;
    prevBtn.onclick = () => {
        if(chapterIndex > 0) location.hash = `${s.id}|${s.chapters[chapterIndex - 1].id}`;
    };

    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'btn';
    nextBtn.textContent = 'Next';
    nextBtn.disabled = chapterIndex === s.chapters.length - 1;
    nextBtn.onclick = () => {
        if(chapterIndex < s.chapters.length - 1) location.hash = `${s.id}|${s.chapters[chapterIndex + 1].id}`;
    };

    navContainer.appendChild(prevBtn);
    navContainer.appendChild(nextBtn);

    // Append navigation below images
    readerContent.appendChild(navContainer);

    // Comments Section
    const readerComments = document.getElementById('readerComments');
    const allComments = DB.get('chapterComments', {});
    const key = ch.id;
    if(readerComments) {
        readerComments.innerHTML = '';
        (allComments[key] || []).forEach(c => {
            const d = document.createElement('div');
            d.className = 'comment';
            d.innerHTML = `<strong>${escapeHtml(c.user || 'Random_user')}</strong><div>${escapeHtml(c.text)}</div>`;
            readerComments.appendChild(d);
        });
    }

    const addBtn = document.getElementById('addReaderComment');
    if(addBtn){
        addBtn.onclick = () => {
            const txt = document.getElementById('readerCommentInput').value.trim();
            if(!txt) return alert('Please write a comment');

            allComments[key] = allComments[key] || [];
            allComments[key].push({user:'You', text:txt});
            DB.set('chapterComments', allComments);
            location.reload();
        };
    }
  };

  // ===================== SIGN-IN =====================
  function initSignin(){
    const form=document.getElementById('signinForm');
    if(!form) return;
    form.addEventListener('submit',(e)=>{
      e.preventDefault();
      const user=document.getElementById('signinUser').value.trim();
      DB.set('auth',{user});
      location.href='index.html';
    });
  }

  // ===================== SIGN-UP =====================
  function initSignup(){
    const btn=document.getElementById('signupBtn');
    if(!btn) return;
    btn.onclick=(e)=>{
      e.preventDefault();
      alert('Registration (demo) — ignoring inputs and redirecting to Sign in');
      location.href='signin.html';
    };
  }

  // ===================== SEARCH =====================
  function performSearch(q){
    q=(q||'').toLowerCase().trim();
    const results=window.MANWAH.series.filter(s=>s.title.toLowerCase().includes(q));
    if(results.length===0){
      alert('No results');
      return;
    }
    location.href='series.html#'+results[0].id;
  }

  // ===================== BOOKMARKS PAGE =====================
  function initBookmarksPage() {
    // matches your bookmark.html container id
    const container = document.getElementById('bookmarkList') || document.getElementById('bookmarkContainer') || document.getElementById('bookmarkListContainer');
    if (!container) return;

    container.innerHTML = ''; // clear

    const bm = DB.get('bookmarks', []);
    const seriesList = window.MANWAH.series || [];

    if (bm.length === 0) {
        container.innerHTML = "<p>No bookmarks yet</p>";
        return;
    }

    bm.forEach(id => {
        const s = seriesList.find(x => x.id === id);
        if (!s) return;

        const card = document.createElement('div');
        card.className = 'series-card';
        card.innerHTML = `
            <img src="${s.cover}" alt="${escapeHtml(s.title)}">
            <strong>${escapeHtml(s.title)}</strong>
            <div>${renderStars(s.rating)}</div>
        `;
        card.addEventListener('click', ()=> location.href = 'series.html#' + s.id);
        const removeBtn = document.createElement('button');
        removeBtn.className = 'btn remove-bookmark-btn'; 
        removeBtn.textContent = 'Remove';
        removeBtn.onclick = (e) => {
          e.stopPropagation();
          const newBm = DB.get('bookmarks', []).filter(x => x !== s.id);
          DB.set('bookmarks', newBm);
          card.remove();
          if (DB.get('bookmarks', []).length === 0) container.innerHTML = "<p>No bookmarks yet</p>";
        };
        card.appendChild(removeBtn);

        container.appendChild(card);
    });
  }

})();
