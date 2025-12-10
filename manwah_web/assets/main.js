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
 function generateChapters(title, chapterCount, pagesPerChapter=5){
    const shortcut = titleShortcut(title);
    const chapters = [];
    for(let c=1;c<=chapterCount;c++){
        const pages = [];
        for(let p=1;p<=pagesPerChapter;p++){
            pages.push(`assets/images/series/chapters/${shortcut}/cha${c}/${p}.webp`);
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
  desc: 'Read Full A Mercenary’s Rebirth Among Nobles / 환생했더니 대공의 셋째 아들 Manhwa. Because of my bloodline, I wasn’t able to rise in status and ended up dying as a mere mercenary. However, when I opened my eyes again, they told me I was an archduke’s son. Now that I finally have family, status, and even talent—things I’ve only dreamed about before—there’s only one thing left to do… climb to the top. The outrageous noble life of a former mercenary captain turned archduke’s third son begins now. A hardened mercenary reincarnated into a noble family...',
  cover: 'assets/images/series/covers/amran_cover.webp',
  rating: 3.9,
  chapters: generateChapters('A Mercenary’s Rebirth Among Nobles', 6)
},


  {
  id: 's3',
  title: 'The Regressed Extra Becomes a Genius',
  desc: 'The story delves into the life of Kim Seon-woo, who got pulled into a famous novel and decided to live a quiet life as a side character. One day, the protagonist of said novel died… “…Do you expect me to believe this?” He ends up regressing back in time – back to his first day within the novel.',
  cover: 'assets/images/series/covers/rexbg_cover.webp',
  rating: 4,
  chapters: generateChapters('The Regressed Extra Becomes a Genius', 8)
},


  {
  id: 's4',
  title: 'High Martiality: With One Hand, I Single-Handedly Repel Three Thousand Emperors!',
  desc: 'Read High Martiality: With One Hand, I Single-Handedly Repel Three Thousand Emperors! English. 高武：只手横推三千帝！High-Martial World: One Hand to Overwhelm Three Thousand Emperors! The Martial Way is undergoing a great resurgence — yet chaos reigns. Ferocious Beasts run rampant, and countless alien races invade, vying with humanity for dominance in this new era of strife. Amidst the turmoil, the young Su Hong awakens a mysterious system — and with it, a talent unmatched in ten thousand years. * C-rank martial arts? One second to Entry, two to Proficiency, three to Perfection! * SSS-rank martial techniques? One day to Entry, seven to Proficiency, one month to Great Accomplishment! But that’s not all — every enemy he defeats grants him Martial Value. By expending Martial Value, he can: ✓ Boost his Qi and Blood, ✓ Strengthen his bones, ✓ Forge a divine physique — step by step, ascending beyond mortal limits. Martial Value –1,000: Qi and Blood enhanced — Su Hong takes his first stride, stepping into the realm of the Martial Artist!',
  cover: 'assets/images/series/covers/hmwohishrtte_cover.webp',
  rating: 4.4,
  chapters: generateChapters('High Martiality: With One Hand, I Single-Handedly Repel Three Thousand Emperors!', 21)
},


  {
  id: 's5',
  title: 'Crimson Reset',
  desc: 'After half a year on the run, the vampire Eugene was ultimately killed, offered up as a sacrifice to boost a holy knight’s fame. Just as his life ended in bitter regret, a chance to return came to him. “I will never die like that again. If I’ve truly returned to the past, then I’ll never regret anything a second time… no matter what it may take.”',
  cover: 'assets/images/series/covers/cr_cover.webp',
  rating: 4.1,
  chapters: generateChapters('Crimson Reset', 16)
},
{
  id: 's6',
  title: 'Villain To Kill',
  desc: '“You must become the greater evil to fight against the real evil!” Cassian dies after being framed for the murder of a comrade. Just when he thought it was all over for him, his soul is transferred into a young boy…',
  cover: 'assets/images/series/covers/vtk_cover.webp',
  rating: 5,
  chapters: generateChapters('Villain To Kill', 14) 
},
{
  id: 's7',
  title: 'The Ultimate Shut-In',
  desc: 'One day, the end of the world suddenly arrived. [The Ultimate Shut-In cannot leave the house.] In order to save my family, I must survive… no matter what.',
  cover: 'assets/images/series/covers/tusi_cover.webp', 
  rating: 4.6,
  chapters: generateChapters('The Ultimate Shut-In', 12)
},
{
  id: 's8',
  title: 'Playing the Perfect Fox-Eyed Villain',
  desc: 'A crazed sociopath. A monster who wears human skin. The demon of the north’s frontlines. The smiling executioner. I have come to perfectly act as Julian, the insane fox-eyed character feared by the whole empire. [Character Trait] You speak in a formal manner to everyone regardless of age. “Isn’t it fine if I’m just talking to myself?”',
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
    // Menu toggle
    const menuBtn = document.getElementById("menuBtn");
    if(menuBtn){
      menuBtn.addEventListener("click",()=>{
        const menuPanel=document.getElementById("menuPanel");
        if(menuPanel) menuPanel.classList.toggle("hidden");
      });
    }

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

  // ⭐ Position dropdown below the search bar
  dropdown.style.top = searchInput.offsetHeight + 5 + 'px';
  dropdown.style.left = '0';

  // Ensure parent is relative for proper alignment
  searchInput.parentNode.style.position = 'relative';
  searchInput.parentNode.appendChild(dropdown);

  // Live search
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.toLowerCase();
    const matches = window.MANWAH.series.filter(s => 
      s.title.toLowerCase().includes(q)
    );

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


    // Bookmarks link
    const bookmarkLink=document.getElementById('bookmarkLink');
    if(bookmarkLink) bookmarkLink.addEventListener('click',showBookmarks);

    // Populate pages based on pathname
    const path=location.pathname.split('/').pop();
    if(path==='index.html'||path==='') initHome();
    if(path==='series.html') loadSeriesFromHash();
    if(path==='reader.html') loadReaderFromHash();
    if(path==='signin.html') initSignin();
    if(path==='signup.html') initSignup();

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

    // Bookmark
    const bookmarkBtn=document.getElementById('bookmarkBtn');
    if(bookmarkBtn) bookmarkBtn.addEventListener('click',()=>{
      const bm=DB.get('bookmarks',[]);
      if(!bm.includes(s.id)) bm.push(s.id);
      DB.set('bookmarks',bm);
      
    });
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

    // Comments Section (unchanged)
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

    const btn = document.getElementById('addReaderComment');
    if(btn){
        btn.onclick = () => {
            const txt = document.getElementById('readerCommentInput').value.trim();
            if(!txt) return alert('Please write a comment');

            allComments[key] = allComments[key] || [];
            allComments[key].push({user:'You', text:txt});
            DB.set('chapterComments', allComments);
            location.reload();
        };
    }
};




    // Comments
    const readerComments=document.getElementById('readerComments');
    const allComments=DB.get('chapterComments',{});
    const key=ch.id;
    readerComments.innerHTML='';
    (allComments[key]||[]).forEach(c=>{
      const d=document.createElement('div');
      d.className='comment';
      d.innerHTML=`<strong>${escapeHtml(c.user||'Random_user')}</strong><div>${escapeHtml(c.text)}</div>`;
      readerComments.appendChild(d);
    });

    const btn=document.getElementById('addReaderComment');
    if(btn){
      btn.onclick=()=>{
        const txt=document.getElementById('readerCommentInput').value.trim();
        if(!txt) return alert('Please write a comment');
        allComments[key]=allComments[key]||[];
        allComments[key].push({user:'You',text:txt});
        DB.set('chapterComments',allComments);
        location.reload();
      };
    }
  

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

  // ===================== BOOKMARK =====================
  function showBookmarks(e){
    if(e) e.preventDefault();
    const bm=DB.get('bookmarks',[]);
    if(bm.length===0) return alert('No bookmarks');
    location.href='series.html#'+bm[0];
  }

})();
