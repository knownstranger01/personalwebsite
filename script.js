/* ===================================================
   Personal Website — script.js
   =================================================== */

// ── Loader ─────────────────────────────────────────
(function () {
  var loader = document.getElementById('loader');
  var btn    = document.getElementById('reelBtn');
  if (!loader || !btn) return;
  document.body.style.overflow = 'hidden';
  document.body.style.cursor   = 'default';
  btn.addEventListener('click', function () {
    loader.classList.add('done');
    document.body.style.overflow = '';
    document.body.style.cursor   = '';
    setTimeout(function () { if (loader.parentNode) loader.remove(); }, 650);
  });
}());

// ── Custom Cursor ──────────────────────────────────
(function () {
  var cur = document.getElementById('cursor');
  var fol = document.getElementById('cursorFollower');
  if (!cur || !fol) return;
  var mx = -100, my = -100, fx = -100, fy = -100, visible = false;
  cur.style.opacity = '0'; fol.style.opacity = '0';
  document.addEventListener('mousemove', function (e) {
    mx = e.clientX; my = e.clientY;
    cur.style.left = mx + 'px'; cur.style.top = my + 'px';
    if (!visible) { visible = true; cur.style.opacity = '1'; fol.style.opacity = '1'; }
  });
  document.addEventListener('mouseleave', function () {
    cur.style.opacity = '0'; fol.style.opacity = '0'; visible = false;
  });
  (function loop() {
    fx += (mx - fx) * 0.13; fy += (my - fy) * 0.13;
    fol.style.left = fx + 'px'; fol.style.top = fy + 'px';
    requestAnimationFrame(loop);
  }());
  document.querySelectorAll('a, button, .work-item, .service-item, .tool-tag, .testimonial-card, .portfolio-thumb, input, textarea').forEach(function (el) {
    el.addEventListener('mouseenter', function () { cur.classList.add('hovered'); fol.classList.add('hovered'); });
    el.addEventListener('mouseleave', function () { cur.classList.remove('hovered'); fol.classList.remove('hovered'); });
  });
}());

// ── Sticky Nav ─────────────────────────────────────
(function () {
  var nav = document.getElementById('nav');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });
}());

// ── Mobile Menu ────────────────────────────────────
(function () {
  var navToggle  = document.getElementById('navToggle');
  var mobileMenu = document.getElementById('mobileMenu');
  if (!navToggle || !mobileMenu) return;
  var open = false;
  navToggle.addEventListener('click', function () {
    open = !open;
    mobileMenu.classList.toggle('open', open);
    var spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = open ? 'rotate(45deg) translate(4px, 4px)'   : '';
    spans[1].style.transform = open ? 'rotate(-45deg) translate(4px, -4px)' : '';
  });
  mobileMenu.querySelectorAll('.mobile-link').forEach(function (link) {
    link.addEventListener('click', function () {
      open = false; mobileMenu.classList.remove('open');
      var spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = ''; spans[1].style.transform = '';
    });
  });
}());

// ── Typed Text ─────────────────────────────────────
(function () {
  var el = document.getElementById('typedText');
  if (!el) return;
  var phrases = ['Graphic Designer.','Video Editor.','Content Creator.','Visual Storyteller.','Brand Creator.','Motion Artist.'];
  var pi = 0, ci = 0, del = false;
  function tick() {
    var cur = phrases[pi];
    if (del) { el.textContent = cur.substring(0, --ci); if (ci < 0) { del = false; pi = (pi+1)%phrases.length; setTimeout(tick,400); return; } }
    else      { el.textContent = cur.substring(0, ++ci); if (ci > cur.length) { del = true; setTimeout(tick,2000); return; } }
    setTimeout(tick, del ? 50 : 90);
  }
  tick();
}());

// ── Counter Animation ──────────────────────────────
(function () {
  var els = document.querySelectorAll('.stat-num');
  if (!els.length) return;
  function run(el) {
    var t = parseInt(el.getAttribute('data-target'),10), s = t/(1800/16), c = 0;
    var timer = setInterval(function () {
      c = Math.min(c+s,t); el.textContent = Math.floor(c);
      if (c >= t) clearInterval(timer);
    }, 16);
  }
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ run(e.target); obs.unobserve(e.target); } });
  },{ threshold:0.5 });
  els.forEach(function(el){ obs.observe(el); });
}());

// ── Scroll Reveal ──────────────────────────────────
(function () {
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } });
  },{ threshold:0.1 });
  document.querySelectorAll('.section-header,.work-item,.service-item,.testimonial-card,.about-content,.about-visual,.contact-left,.contact-form,.svc-card,.process-step,.about-stat,.portfolio-item').forEach(function(el,i){
    el.classList.add('reveal');
    if(i%3===1) el.classList.add('reveal-delay-1');
    if(i%3===2) el.classList.add('reveal-delay-2');
    obs.observe(el);
  });
}());

// ── Magnetic Buttons ───────────────────────────────
(function () {
  document.querySelectorAll('.magnetic').forEach(function(btn){
    btn.addEventListener('mousemove', function(e){
      var r = btn.getBoundingClientRect();
      btn.style.transform = 'translate('+((e.clientX-r.left-r.width/2)*0.3)+'px,'+((e.clientY-r.top-r.height/2)*0.3)+'px)';
    });
    btn.addEventListener('mouseleave', function(){ btn.style.transform=''; });
  });
}());

// ── Contact Form (mailto) ──────────────────────────
(function () {
  var form       = document.getElementById('contactForm');
  var submitBtn  = document.getElementById('submitBtn');
  var successBox = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var name    = (document.getElementById('cname')    || {}).value    || '';
    var email   = (document.getElementById('cemail')   || {}).value    || '';
    var subject = (document.getElementById('csubject') || {}).value    || 'Project Inquiry';
    var phone   = (document.getElementById('cphone')   || {}).value    || '';
    var message = (document.getElementById('cmessage') || {}).value    || '';

    // Validate required fields
    if (!name.trim() || !email.trim() || !message.trim()) {
      alert('Please fill in your name, email and message.');
      return;
    }

    // Build email body
    var body = 'Name: ' + name + '\n'
             + 'Email: ' + email + '\n'
             + (phone ? 'Phone: ' + phone + '\n' : '')
             + (subject ? 'Project Type: ' + subject + '\n' : '')
             + '\nMessage:\n' + message;

    var mailSubject = subject
      ? 'Project Inquiry: ' + subject + ' — from ' + name
      : 'Project Inquiry from ' + name;

    var mailto = 'mailto:sunil.paudel13@gmail.com'
               + '?subject=' + encodeURIComponent(mailSubject)
               + '&body='    + encodeURIComponent(body);

    // Open mail client
    window.location.href = mailto;

    // Show success state after short delay
    setTimeout(function () {
      form.style.display = 'none';
      if (successBox) {
        successBox.style.display = 'flex';
        successBox.querySelector('p').textContent =
          'Your email app has opened with the message pre-filled. Just hit Send!';
      }
    }, 500);
  });
}());

// ── Smooth Anchor Scroll ───────────────────────────
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var t = document.querySelector(a.getAttribute('href'));
      if(t){ e.preventDefault(); t.scrollIntoView({behavior:'smooth'}); }
    });
  });
}());

// ── Parallax Orbs ──────────────────────────────────
(function () {
  var orbs = document.querySelectorAll('.hero-orb');
  if(!orbs.length) return;
  window.addEventListener('scroll', function(){
    var sy = window.scrollY;
    orbs.forEach(function(o,i){ o.style.transform='translateY('+(sy*(0.1+i*0.05))+'px)'; });
  });
}());

// ── Video Modal ────────────────────────────────────
(function () {
  var modal    = document.getElementById('vidModal');
  var frame    = document.getElementById('vidFrame');
  var cat      = document.getElementById('vidCat');
  var title    = document.getElementById('vidTitle');
  var ytLink   = document.getElementById('vidYtLink');
  var closeBtn = document.getElementById('vidClose');
  var backdrop = document.getElementById('vidBackdrop');
  if (!modal || !frame) return;

  // Detect local file:// — YouTube embedding is blocked there
  var isLocal = window.location.protocol === 'file:';

  function openModal(videoId, category, videoTitle, ytUrl) {
    // On file:// protocol YouTube blocks embedding (Error 153)
    // Show a mini overlay with direct link instead
    if (isLocal) {
      // Create a simple overlay prompt
      var overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.92);z-index:99999;display:flex;align-items:center;justify-content:center;';
      overlay.innerHTML = '<div style="background:#111;border:1px solid #333;border-radius:20px;padding:2.5rem;max-width:420px;text-align:center;font-family:Arial,sans-serif;">'
        + '<div style="width:60px;height:60px;background:#ff0000;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 1.25rem;">'
        + '<svg viewBox="0 0 24 24" fill="white" width="24" height="24"><polygon points="5,3 19,12 5,21"/></svg></div>'
        + '<p style="color:#e8e0d5;font-size:0.95rem;margin-bottom:0.5rem;font-weight:600;">' + category + '</p>'
        + '<p style="color:#888;font-size:0.8rem;margin-bottom:1.5rem;">YouTube videos require an internet connection &amp; a web server to play inline. Click below to watch on YouTube.</p>'
        + '<a href="' + ytUrl + '" target="_blank" style="display:inline-flex;align-items:center;gap:0.5rem;background:#ff0000;color:#fff;padding:0.75rem 1.5rem;border-radius:8px;text-decoration:none;font-size:0.9rem;font-weight:700;margin-bottom:1rem;">'
        + '<svg viewBox="0 0 24 24" fill="white" width="18" height="18"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#ff0000"/></svg>'
        + 'Watch on YouTube</a>'
        + '<br><button onclick="this.closest(\'div[style]\').remove()" style="background:none;border:1px solid #333;color:#888;padding:0.4rem 1rem;border-radius:6px;cursor:pointer;font-size:0.8rem;margin-top:0.25rem;">Close</button>'
        + '</div>';
      document.body.appendChild(overlay);
      overlay.addEventListener('click', function(e) {
        if (e.target === overlay) overlay.remove();
      });
      return;
    }

    // On a real server — use nocookie embed
    frame.src = 'https://www.youtube-nocookie.com/embed/' + videoId
              + '?autoplay=1&rel=0&modestbranding=1&playsinline=1';

    if (cat)    cat.textContent   = category;
    if (title)  title.textContent = videoTitle;
    if (ytLink) ytLink.href       = ytUrl;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    frame.src = '';
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.portfolio-thumb-link[data-vid]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var vid = link.getAttribute('data-vid');
      var c   = link.getAttribute('data-cat')   || 'Video';
      var t   = link.getAttribute('data-title') || 'Video';
      var yt  = link.getAttribute('data-yt')    || ('https://www.youtube.com/watch?v=' + vid);
      openModal(vid, c, t, yt);
    });
  });

  if (closeBtn)  closeBtn.addEventListener('click',  closeModal);
  if (backdrop)  backdrop.addEventListener('click',  closeModal);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });
}());

// ── Known Stranger Chatbot v2 ──────────────────────
(function () {
  var toggle     = document.getElementById('ksToggle');
  var chat       = document.getElementById('ksChat');
  var closeBtn   = document.getElementById('ksClose');
  var clearBtn   = document.getElementById('ksClear');
  var input      = document.getElementById('ksInput');
  var sendBtn    = document.getElementById('ksSend');
  var messages   = document.getElementById('ksMessages');
  var suggestBox = document.getElementById('ksSuggestions');
  var suggests   = document.querySelectorAll('.ks-suggest');
  if (!toggle || !chat || !input || !sendBtn || !messages) return;

  var isOpen = false;

  // ── Knowledge base ─────────────────────────────
  var kb = [
    {
      keys: ['service','offer','what do','provide','speciali','help','can you'],
      reply: ['Sunil offers these creative services:', '**Graphic Design** &mdash; Brand identity, logos, print design', '**Video Editing** &mdash; Films, reels, color grading', '**Motion Graphics** &mdash; Animated intros, explainers', '**Content Creation** &mdash; Social media visuals, thumbnails', '**Print &amp; Poster Design** &mdash; Event posters, packaging', 'Which one interests you most?']
    },
    {
      keys: ['hire','book','collab','work with','start','project','commission'],
      reply: ['To hire Sunil, you have two options:', '1. Fill out the **Contact form** on the Contact page', '2. Email directly at **sunil.paudel13@gmail.com**', 'Include your project brief, timeline and budget for a faster response. He typically replies within **24 hours**.']
    },
    {
      keys: ['price','cost','rate','charge','fee','budget','how much','pricing','quote'],
      reply: ['Pricing depends on the scope and complexity of each project.', '**Logo design** &mdash; starts from a project-based rate', '**Brand identity** &mdash; varies by deliverables', '**Video editing** &mdash; based on footage length and complexity', '**Content packages** &mdash; monthly retainer options available', 'Email **sunil.paudel13@gmail.com** with your brief to get a custom quote!']
    },
    {
      keys: ['turnaround','deadline','time','fast','quick','delivery','how long','days','week'],
      reply: ['Here are typical timelines:', '&#9642; **Logo design** &mdash; 3&ndash;5 business days', '&#9642; **Brand identity** &mdash; 1&ndash;2 weeks', '&#9642; **Video editing** &mdash; 2&ndash;7 days (depends on length)', '&#9642; **Motion graphics** &mdash; 3&ndash;7 days', '&#9642; **Social media kit** &mdash; 2&ndash;4 days', 'Rush delivery is available on request!']
    },
    {
      keys: ['brand','logo','identity','rebrand','visual'],
      reply: ['Brand identity is one of Sunil\'s core strengths.', 'He designs logos, complete brand systems, color palettes, typography guides, and all brand assets &mdash; from concept to a full brand toolkit.', 'He has rebranded studios, artists, businesses, and startups across Nepal and beyond.']
    },
    {
      keys: ['video','edit','footage','reel','film','cinema','color','grade','post','production'],
      reply: ['Sunil edits everything from short-form social reels to full cinematic productions.', 'His toolkit: **Premiere Pro** for editing, **DaVinci Resolve** for professional color grading, and **After Effects** for motion elements.', 'He handles cuts, transitions, pacing, color, and audio polish.']
    },
    {
      keys: ['music','lyrical','song'],
      reply: ['Yes! Sunil has directed and edited **music videos** and **lyrical videos**.', 'You can watch his music video work on the **Work** page or directly on his YouTube channel.', 'He handles the full post-production pipeline &mdash; edit, color, and motion graphics.']
    },
    {
      keys: ['short film','short','film','documentary','narrative'],
      reply: ['Sunil has worked on multiple **short films** as editor and colorist.', 'His short film portfolio includes cinematic narratives, documentaries, and experimental pieces.', 'Check out the **Work** page to watch them directly!']
    },
    {
      keys: ['content','creator','social media','tiktok','youtube','instagram','reel','reels','thumbnail'],
      reply: ['As a content creator, Sunil produces platform-optimized visuals for:', '&#9642; **Instagram** &mdash; feed posts, stories, reels', '&#9642; **TikTok** &mdash; short-form video editing', '&#9642; **YouTube** &mdash; thumbnails, banners, channel art', 'Consistent, on-brand, and scroll-stopping &mdash; every time.']
    },
    {
      keys: ['motion','animation','after effect','animated','intro','explainer','lower third'],
      reply: ['Motion graphics is a key part of Sunil\'s craft.', 'He creates **animated intros &amp; outros**, lower thirds, logo animations, explainer videos, and kinetic typography using **After Effects**.', 'He also does full motion sequences for product launches and brand campaigns.']
    },
    {
      keys: ['tool','software','app','use','program','skill','photoshop','illustrator','figma','premiere','davinci'],
      reply: ['Sunil\'s full creative toolkit:', '&#9642; **Photoshop** &mdash; Photo editing &amp; compositing', '&#9642; **Illustrator** &mdash; Vector &amp; logo design', '&#9642; **Premiere Pro** &mdash; Video editing', '&#9642; **After Effects** &mdash; Motion graphics', '&#9642; **Figma** &mdash; UI/UX &amp; design systems', '&#9642; **DaVinci Resolve** &mdash; Color grading']
    },
    {
      keys: ['contact','email','reach','touch','message','talk','find','where'],
      reply: ['You can reach Sunil through:', '&#9642; **Email:** sunil.paudel13@gmail.com', '&#9642; **Instagram:** @knownstranger01', '&#9642; **Facebook:** /knownstranger01', '&#9642; **LinkedIn:** /in/knownstranger01', 'He responds to emails within **24 hours**.']
    },
    {
      keys: ['experience','year','background','portfolio','about','who','sunil'],
      reply: ['Sunil Paudel is a **Graphic Designer, Video Editor &amp; Content Creator** based in Kathmandu, Nepal.', '&#9642; **5+ years** of professional experience', '&#9642; **80+ projects** completed', '&#9642; **40+ happy clients** worldwide', 'He specializes in visual storytelling through design and cinematic video.']
    },
    {
      keys: ['facebook','instagram','linkedin','youtube','twitter','x ','social','follow'],
      reply: ['Find and follow Sunil on:', '&#9642; **Facebook:** facebook.com/knownstranger01', '&#9642; **Instagram:** @knownstranger01', '&#9642; **X (Twitter):** @sunilpaudel2051', '&#9642; **LinkedIn:** /in/knownstranger01', '&#9642; **YouTube:** @sunilpaudel.official']
    },
    {
      keys: ['available','free','open','slot','booking','busy'],
      reply: ['Sunil is currently **available for new projects**!', 'To check availability for your specific timeline, email **sunil.paudel13@gmail.com** with your project details and preferred start date.']
    },
    {
      keys: ['nepal','kathmandu','location','based','where'],
      reply: ['Sunil is based in **Kathmandu, Nepal** and works with clients both locally and internationally.', 'Remote collaboration is seamless &mdash; he has worked with clients across Nepal, India, and beyond.']
    },
    {
      keys: ['revision','edit','change','update','modify'],
      reply: ['Sunil includes revision rounds in all his packages.', 'The number of revisions depends on the project type. For specific revision policies, mention it when you send your brief to **sunil.paudel13@gmail.com**.']
    },
    {
      keys: ['hello','hi','hey','sup','yo','howdy','good morning','good evening','good afternoon','namaste'],
      reply: ['Hey there! \uD83D\uDC4B Welcome! I\'m **Known Stranger**, Sunil\'s AI assistant.', 'I\'m here to help with any questions about his creative work, services, or how to get in touch.', 'What would you like to know?']
    },
    {
      keys: ['thank','thanks','appreciate','great','awesome','perfect','good','nice','wonderful','excellent'],
      reply: ['You\'re very welcome! \uD83D\uDE0A', 'If you have any other questions, feel free to ask. Or reach Sunil directly at **sunil.paudel13@gmail.com**.']
    },
    {
      keys: ['bye','goodbye','see you','later','ciao','take care'],
      reply: ['Talk soon! \uD83D\uDC4B', 'Come back anytime. You can also reach Sunil at **sunil.paudel13@gmail.com**.']
    },
  ];

  function getReply(text) {
    var lower = text.toLowerCase().trim();
    for (var i = 0; i < kb.length; i++) {
      if (kb[i].keys.some(function(k){ return lower.indexOf(k) !== -1; })) {
        var lines = kb[i].reply;
        return Array.isArray(lines) ? lines : [lines];
      }
    }
    return ['That\'s a great question! For the most accurate answer, email Sunil at **sunil.paudel13@gmail.com** \u2014 he\'ll get back to you quickly.'];
  }

  function fmt(str) {
    return str
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/&mdash;/g, '&mdash;')
      .replace(/&ndash;/g, '&ndash;')
      .replace(/&amp;/g, '&amp;');
  }

  function timeStr() {
    var d = new Date();
    var h = d.getHours(), m = d.getMinutes();
    var ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return h + ':' + (m < 10 ? '0' : '') + m + ' ' + ampm;
  }

  function addMsg(lines, type) {
    var wrap = document.createElement('div');
    wrap.className = 'ks-msg ks-msg--' + type;

    if (type === 'bot') {
      var av = document.createElement('div');
      av.className = 'ks-msg-avatar'; av.textContent = 'KS';
      wrap.appendChild(av);
    }

    var bubble = document.createElement('div');
    bubble.className = 'ks-msg-bubble';

    if (Array.isArray(lines)) {
      lines.forEach(function(line) {
        var p = document.createElement('p');
        p.innerHTML = fmt(line);
        bubble.appendChild(p);
      });
    } else {
      var p = document.createElement('p');
      p.innerHTML = fmt(lines);
      bubble.appendChild(p);
    }

    var time = document.createElement('span');
    time.className = 'ks-msg-time'; time.textContent = timeStr();
    bubble.appendChild(time);

    wrap.appendChild(bubble);
    messages.appendChild(wrap);
    messages.scrollTop = messages.scrollHeight;
  }

  function showTyping() {
    var wrap = document.createElement('div');
    wrap.className = 'ks-typing-wrap'; wrap.id = 'ksTyping';
    var av = document.createElement('div');
    av.className = 'ks-typing-avatar'; av.textContent = 'KS';
    var dots = document.createElement('div');
    dots.className = 'ks-typing';
    dots.innerHTML = '<span></span><span></span><span></span>';
    wrap.appendChild(av); wrap.appendChild(dots);
    messages.appendChild(wrap);
    messages.scrollTop = messages.scrollHeight;
  }

  function removeTyping() {
    var t = document.getElementById('ksTyping');
    if (t) t.remove();
  }

  function send(text) {
    text = (text || '').trim();
    if (!text) return;
    addMsg([text], 'user');
    input.value = '';
    if (suggestBox) suggestBox.style.display = 'none';
    showTyping();
    var delay = 700 + Math.random() * 600;
    setTimeout(function() {
      removeTyping();
      addMsg(getReply(text), 'bot');
    }, delay);
  }

  function toggleChat() {
    isOpen = !isOpen;
    chat.classList.toggle('open', isOpen);
    var iconChat  = toggle.querySelector('.ks-icon-chat');
    var iconClose = toggle.querySelector('.ks-icon-close');
    if (iconChat && iconClose) {
      iconChat.style.display  = isOpen ? 'none'  : '';
      iconClose.style.display = isOpen ? ''      : 'none';
    }
    if (isOpen) {
      setTimeout(function(){ input.focus(); }, 400);
    }
  }

  function clearChat() {
    messages.innerHTML = '';
    addMsg(['Chat cleared. How can I help you?'], 'bot');
    if (suggestBox) suggestBox.style.display = '';
  }

  // Wire events
  toggle.addEventListener('click', toggleChat);
  if (closeBtn) closeBtn.addEventListener('click', function(){ if(isOpen) toggleChat(); });
  if (clearBtn) clearBtn.addEventListener('click', clearChat);

  sendBtn.addEventListener('click', function(){ send(input.value); });
  input.addEventListener('keydown', function(e){ if(e.key === 'Enter') send(input.value); });

  if (suggests.length) {
    suggests.forEach(function(btn) {
      btn.addEventListener('click', function(){
        // strip emoji prefix before sending
        var txt = btn.textContent.replace(/^[^\w]+/, '').trim();
        send(txt);
      });
    });
  }

  // Close on outside click
  document.addEventListener('click', function(e){
    if (isOpen && !chat.contains(e.target) && !toggle.contains(e.target)) {
      toggleChat();
    }
  });
}());
