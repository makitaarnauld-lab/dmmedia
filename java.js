
    // Gestion des liens inactifs
    document.getElementById('instagram-link')?.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Cette plateforme n\'est pas disponible pour le moment.');
    });
    document.getElementById('tiktok-link')?.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Cette plateforme n\'est pas disponible pour le moment.');
    });

    // --- Galerie dynamique (inchangée) ---
    const galleryData = [
      { type: 'image', url: 'image/DSC_7800.JPG', title: 'Mariés' },
      { type: 'image', url: 'image/DSC_7801.JPG', title: 'Mariés' },
      { type: 'image', url: 'image/DSC_7806.JPG', title: 'Mariés' },
      { type: 'image', url: 'image/DSC_7832.JPG', title: 'Mariés' },
      { type: 'image', url: 'image/DSC_7933.JPG', title: 'Mariés' },
      { type: 'image', url: 'image/DSC_7977.JPG', title: 'Mariés' },
      { type: 'image', url: 'image/DSC_7997.JPG', title: 'Mariés' },
      { type: 'image', url: 'image/1768056452412.jpg', title: 'Mariés' },
      { type: 'image', url: 'image/IMG_0004.jpg', title: 'Mariés' },
      { type: 'image', url: 'image/DSC_5841.JPG', title: 'Mariés' },
      { type: 'image', url: 'image/DSC_5849.JPG', title: 'Mariés' },
      { type: 'image', url: 'image/DSC_5850.JPG', title: 'Mariés' },
      { type: 'image', url: 'image/DSC_5863.JPG', title: 'Mariés' },
      { type: 'image', url: 'image/1768990115242_1.jpg', title: 'Mariés' },
      { type: 'image', url: 'image/1768990104064_1.jpg', title: 'Mariés' },
      { type: 'image', url: 'image/1768990099198.jpg', title: 'Mariés' },
      { type: 'image', url: 'image/1768990095919.jpg', title: 'Mariés' },
      { type: 'image', url: 'image/1768990089172.jpg', title: 'Mariés' },
      { type: 'image', url: 'image/1768056458243.jpg', title: 'Mariés' },
      { type: 'image', url: 'image/1768990138862_1.jpg', title: 'Mariés' },
      { type: 'image', url: 'image/1768990136249_1.jpg', title: 'Mariés' },
      { type: 'image', url: 'image/1768990131101_1.jpg', title: 'Mariés' },
      { type: 'image', url: 'image/1768990129017_1.jpg', title: 'Mariés' },
      { type: 'image', url: 'image/1768990124295_1.jpg', title: 'Mariés' },
      { type: 'image', url: 'image/1768990119010_1.jpg', title: 'Mariés' },
      { type: 'image', url: 'image/1769012850799.jpg', title: 'Mariés' },
      { type: 'image', url: 'image/1768990199457_1.jpg', title: 'Mariés' },
      { type: 'image', url: 'image/1768990188773_1.jpg', title: 'Mariés' },
      { type: 'image', url: 'image/1768990173551_1.jpg', title: 'Mariés' },
      { type: 'image', url: 'image/1768990144169_1.jpg', title: 'Mariés' },
      { type: 'image', url: 'image/1768990141106_1.jpg', title: 'Mariés' },
      { type: 'image', url: 'image/DSC_0126.JPG', title: 'Mariés' },
      { type: 'image', url: 'image/DSC_0142.JPG', title: 'Mariés' },
      { type: 'image', url: 'image/DSC_0209.JPG', title: 'Mariés' },
      { type: 'image', url: 'image/DSC_0214.JPG', title: 'Mariés' },
      { type: 'image', url: 'image/DSC_0018.jpg', title: 'Mariés' },
      { type: 'image', url: 'image/DSC_0231.JPG', title: 'Mariés' },
      { type: 'image', url: 'image/aab461b873d8a64a07e2b615919706d2.jpg', title: 'Mariés' },
      { type: 'image', url: 'image/1769013999921.jpg', title: 'Mariés' },
      { type: 'video', videoId: 'v1MVV-Fzurs', title: 'Immersion' },
      { type: 'video', videoId: 'HUs90ELz0JM', title: 'Célébration' },
      { type: 'video', videoId: 'Q7kyDVs0R9w', title: 'Réalisation' },
      { type: 'video', videoId: 'YkyDgOnH23U', title: 'Mariage officiel' },
      { type: 'video', videoId: 'adHo8scLcbo', title: 'DM MÉDIA' },
      { type: 'image', url: 'image/DSC_0002.jpg', title: 'Traditionnel' },
      { type: 'image', url: 'image/30056bb935edfc8a1b1d7aeaded3ff9b.jpg', title: 'Mairie' }
    ];

    const galleryGrid = document.getElementById('galleryGrid');
    const ratings = JSON.parse(localStorage.getItem('dmmedia_ratings')) || {};

    function saveRatings() {
      localStorage.setItem('dmmedia_ratings', JSON.stringify(ratings));
    }

    function getAverageRating(itemId) {
      if (!ratings[itemId] || ratings[itemId].length === 0) return 0;
      const sum = ratings[itemId].reduce((a, b) => a + b, 0);
      return sum / ratings[itemId].length;
    }

    async function downloadImage(url, filename) {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = filename || 'dmmedia_image.jpg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(blobUrl);
      } catch (error) {
        alert('Impossible de télécharger l\'image.');
      }
    }

    function renderGallery() {
      galleryGrid.innerHTML = '';
      galleryData.forEach((item, index) => {
        const itemId = `item_${index}`;
        const avg = getAverageRating(itemId);
        const itemDiv = document.createElement('div');
        itemDiv.className = 'gallery-item';

        let mediaHtml = '';
        if (item.type === 'image') {
          mediaHtml = `<img src="${item.url}" alt="${item.title}">`;
        } else {
          mediaHtml = `
            <div style="position: relative; width: 100%; height: 100%;">
              <div style="position: absolute; top: 5px; left: 5px; background: rgba(0,0,0,0.7); color: #b8860b; padding: 4px 8px; border-radius: 4px; font-size: 0.7rem; z-index: 10;">DM MÉDIA</div>
              <iframe src="https://www.youtube.com/embed/${item.videoId}?autoplay=0&mute=1&loop=1&playlist=${item.videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width:100%; height:100%;"></iframe>
            </div>
          `;
        }

        const starsHtml = Array.from({ length: 5 }, (_, i) => {
          const filled = i < Math.round(avg) ? 'filled' : '';
          return `<span class="rating-star ${filled}" data-value="${i+1}">★</span>`;
        }).join('');

        itemDiv.innerHTML = `
          ${mediaHtml}
          <div class="gallery-overlay"><i class="fas fa-heart"></i></div>
          <div class="rating-container" data-item-id="${itemId}">
            ${starsHtml}
          </div>
          <div class="average-rating">${avg.toFixed(1)} ★</div>
          <div class="gallery-buttons">
            <button class="gallery-btn download-btn" data-url="${item.type === 'image' ? item.url : ''}" data-video-id="${item.videoId || ''}" data-type="${item.type}">
              <i class="fas fa-download"></i> Télécharger
            </button>
            <button class="gallery-btn subscribe-btn"><i class="fab fa-youtube"></i> S'abonner</button>
          </div>
        `;

        galleryGrid.appendChild(itemDiv);
      });

      document.querySelectorAll('.rating-star').forEach(star => {
        star.addEventListener('click', (e) => {
          e.stopPropagation();
          const container = star.closest('.rating-container');
          const itemId = container.dataset.itemId;
          const value = parseInt(star.dataset.value, 10);
          if (!ratings[itemId]) ratings[itemId] = [];
          ratings[itemId].push(value);
          saveRatings();
          const newAvg = getAverageRating(itemId);
          const stars = container.querySelectorAll('.rating-star');
          stars.forEach((s, i) => {
            if (i < Math.round(newAvg)) s.classList.add('filled');
            else s.classList.remove('filled');
          });
          container.nextElementSibling.textContent = `${newAvg.toFixed(1)} ★`;
        });
      });

      document.querySelectorAll('.download-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const type = btn.dataset.type;
          if (type === 'image') {
            const url = btn.dataset.url;
            const filename = url.split('/').pop().split('?')[0] || 'dmmedia_image.jpg';
            downloadImage(url, filename);
          } else {
            const videoId = btn.dataset.videoId;
            if (videoId) {
              window.open(`https://youtu.be/${videoId}`, '_blank');
            }
          }
        });
      });

      document.querySelectorAll('.subscribe-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          window.open('https://youtube.com/@dmmedia242?sub_confirmation=1', '_blank');
        });
      });
    }

    renderGallery();

    // --- Formulaire de réservation (inchangé) ---
    const serviceTypeSelect = document.getElementById('serviceType');
    const dureeSelect = document.getElementById('duree');
    const villeSelect = document.getElementById('ville');
    const totalDiv = document.getElementById('totalPrice');

    function calculerPrix() {
      const ville = villeSelect.value;
      const type = serviceTypeSelect.value;
      const duree = dureeSelect.value;

      if (!ville || !type || !duree) {
        totalDiv.textContent = 'Sélectionnez vos options';
        return 0;
      }

      const tarifs = {
        'pointe-noire': { coutumier: 125000, officiel: 195000, complet: 250000, montage: 25000, graphisme: 0, autre: 0 },
        'brazzaville': { coutumier: 150000, officiel: 220000, complet: 280000, montage: 30000, graphisme: 0, autre: 0 }
      };

      let prix = tarifs[ville][type] || 0;
      if ((type === 'coutumier' || type === 'officiel' || type === 'complet') && duree === 'demi-journee') {
        prix = Math.round(prix * 0.7);
      }
      totalDiv.textContent = `Total : ${prix.toLocaleString()} FCFA`;
      return prix;
    }

    serviceTypeSelect.addEventListener('change', calculerPrix);
    dureeSelect.addEventListener('change', calculerPrix);
    villeSelect.addEventListener('change', calculerPrix);

    document.getElementById('bookingForm').addEventListener('submit', function(e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const email = document.getElementById('email').value.trim();
      const date = document.getElementById('date').value;
      const heure = document.getElementById('heure').value;
      const lieu = document.getElementById('lieu').value;
      const serviceType = document.getElementById('serviceType').options[document.getElementById('serviceType').selectedIndex]?.text || '';
      const duree = document.getElementById('duree').options[document.getElementById('duree').selectedIndex]?.text || '';
      const live = document.getElementById('live').options[document.getElementById('live').selectedIndex]?.text || '';
      const ville = document.getElementById('ville').options[document.getElementById('ville').selectedIndex]?.text || '';
      const precisions = document.getElementById('precisions').value.trim();
      const prix = calculerPrix();

      const message = `*DM MÉDIA - Demande de réservation*%0A%0A` +
        `👤 *Nom* : ${name}%0A` +
        `📞 *Téléphone* : ${phone}%0A` +
        `📧 *Email* : ${email || 'Non renseigné'}%0A` +
        `📅 *Date* : ${date}%0A` +
        `⏰ *Heure* : ${heure}%0A` +
        `📍 *Lieu* : ${lieu}%0A` +
        `🎁 *Service* : ${serviceType}%0A` +
        `⏳ *Durée* : ${duree}%0A` +
        `📡 *Live* : ${live}%0A` +
        `🏙️ *Ville* : ${ville}%0A` +
        `💰 *Total* : ${prix} FCFA%0A` +
        `📝 *Précisions* : ${precisions || 'Aucune'}`;

      const numero = '242064141818';
      window.open(`https://wa.me/${numero}?text=${message}`, '_blank');
    });

    // --- Nouveau formulaire de contact (messagerie) ---
    document.getElementById('contactForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('contactName').value.trim();
      const phone = document.getElementById('contactPhone').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const subject = document.getElementById('contactSubject').value.trim();
      const message = document.getElementById('contactMessage').value.trim();

      const texte = `*DM MÉDIA - Message de contact*%0A%0A` +
        `👤 *Nom* : ${name}%0A` +
        `📞 *Téléphone* : ${phone}%0A` +
        `📧 *Email* : ${email}%0A` +
        `📝 *Sujet* : ${subject}%0A` +
        `💬 *Message* : ${message}`;

      const numero = '242064141818';
      window.open(`https://wa.me/${numero}?text=${texte}`, '_blank');
    });

    // --- Chatbot interactif ---
    const chatBtn = document.getElementById('chatBtn');
    const chatWindow = document.getElementById('chatWindow');
    const closeChat = document.getElementById('closeChat');
    const chatMessages = document.getElementById('chatMessages');
    const quickReplies = document.querySelectorAll('.quick-reply');
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendChat');

    const botKnowledge = [
      { keywords: ['bonjour','salut','hello','coucou','hey'], response: 'Bonjour ! Comment puis-je vous aider ?' },
      { keywords: ['prix','tarif','combien','coûte','coutumier','125000','125 000'], response: 'Le forfait **Mariage coutumier** est à **125 000 FCFA**. Il inclut reportage photo/vidéo, photos illimitées, 50 tirages 13x18, 50 invitations et clé USB 8Go.' },
      { keywords: ['prix','tarif','combien','coûte','officiel','195000','195 000'], response: 'Le forfait **Mariage officiel** est à **195 000 FCFA**. Prestations : reportage, photos illimitées, 100 tirages, 100 invitations, grand portrait, shooting pro, clé USB.' },
      { keywords: ['prix','tarif','combien','coûte','complet','coutumier+officiel','religieux','250000','250 000'], response: 'Le forfait **Complet (coutumier+officiel+religieux)** est à **250 000 FCFA**. Il inclut toutes les prestations des deux formules + couverture intégrale des trois cérémonies.' },
      { keywords: ['montage','vidéo','pro','25 000','25000'], response: 'Le service **Montage vidéo pro** commence à **25 000 FCFA** selon la durée et la complexité. Devis gratuit sur demande.' },
      { keywords: ['graphisme','graphique','flyer','carte','invitation','bâche','affiche'], response: 'Nous réalisons tous vos supports **graphiques** : flyers, cartes de visite, invitations, bâches, affiches. Devis personnalisé.' },
      { keywords: ['drone','aérien','vue du ciel','dron'], response: 'Oui, nous utilisons un **drone professionnel** pour des prises de vue aériennes (sous réserve d\'autorisation).' },
      { keywords: ['4k','qualité','hd','ultra hd'], response: 'Nous filmons en **4K** avec des caméras Sony et Blackmagic.' },
      { keywords: ['shooting','photo','portrait','séance'], response: 'Nos **shootings photo** sont réalisés en studio ou en extérieur.' },
      { keywords: ['contact','téléphone','appeler','joindre','whatsapp'], response: 'Vous pouvez nous joindre au **+242 06 41 41 81 8** ou **+242 06 47 05 28 2**.' },
      { keywords: ['horaire','heure','ouvert','disponible'], response: 'Notre équipe est disponible du lundi au samedi, de 9h à 19h.' },
      { keywords: ['adresse','où','localisation','map','venir','mawata'], response: 'Nous sommes situés à **Mawata, Pointe-Noire**, République du Congo.' },
      { keywords: ['galerie','photo','vidéo','exemple'], response: 'Découvrez nos réalisations dans la section **Galerie**.' },
      { keywords: ['réserver','réservation','book','devis','commander'], response: 'Pour réserver, rendez-vous dans la section **Réservation** et remplissez le formulaire.' },
      { keywords: ['merci','thanks'], response: 'Je vous en prie ! N’hésitez pas.' },
      { keywords: ['au revoir','bye','à bientôt'], response: 'Au revoir ! Passez une excellente journée.' }
    ];

    function getBotResponse(userText) {
      const lower = userText.toLowerCase();
      for (let item of botKnowledge) {
        for (let kw of item.keywords) {
          if (lower.includes(kw)) return item.response;
        }
      }
      return "Merci pour votre question ! Pour plus d'informations, consultez nos sections Services, Galerie ou appelez-nous au **+242 06 41 41 81 8**.";
    }

    function addMessage(text, sender) {
      const msgDiv = document.createElement('div');
      msgDiv.classList.add(sender === 'bot' ? 'bot-msg' : 'user-msg');
      msgDiv.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      chatMessages.appendChild(msgDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function handleUserMessage(message) {
      addMessage(message, 'user');
      const reply = getBotResponse(message);
      setTimeout(() => addMessage(reply, 'bot'), 500);
    }

    quickReplies.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const q = e.target.getAttribute('data-question');
        let txt = '';
        if (q === 'prix coutumier') txt = 'Quel est le prix du mariage coutumier ?';
        else if (q === 'prix officiel') txt = 'Prix du mariage officiel ?';
        else if (q === 'prix complet') txt = 'Combien coûte le forfait complet ?';
        else if (q === 'montage') txt = 'Combien coûte le montage vidéo pro ?';
        else if (q === 'graphisme') txt = 'Quels sont vos services graphiques ?';
        else if (q === 'contact') txt = 'Comment vous contacter ?';
        else txt == q;
        handleUserMessage(txt);
      });
    });

    sendBtn.addEventListener('click', () => {
      const msg = chatInput.value.trim();
      if (msg) handleUserMessage(msg);
      chatInput.value = '';
    });

    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendBtn.click();
    });

    chatBtn.addEventListener('click', () => {
      chatWindow.style.display = 'flex';
    });
    closeChat.addEventListener('click', () => {
      chatWindow.style.display = 'none';
    });

    // Animation au défilement
    const reveals = document.querySelectorAll('.reveal');
    function checkReveal() {
      for (let el of reveals) {
        const windowHeight = window.innerHeight;
        const revealTop = el.getBoundingClientRect().top;
        const revealPoint = 150;
        if (revealTop < windowHeight - revealPoint) el.classList.add('active');
        else el.classList.remove('active');
      }
    }
    window.addEventListener('scroll', checkReveal);
    checkReveal();

    // Burger menu
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    burger.addEventListener('click', () => {
      if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
      } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '70px';
        navLinks.style.right = '5%';
        navLinks.style.background = '#1a1a2e';
        navLinks.style.padding = '1.5rem';
        navLinks.style.borderRadius = '12px';
        navLinks.style.border = '1px solid #b8860b';
      }
    });

    // Smooth scroll
    document.querySelectorAll('.nav-links a, .hero-btn').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) target.scrollIntoView({ behavior: 'smooth' });
          if (window.innerWidth <= 768) navLinks.style.display = 'none';
        }
      });
    });