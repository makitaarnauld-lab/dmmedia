// Gestion des liens inactifs
    document.getElementById('instagram-link')?.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Cette plateforme n\'est pas disponible pour le moment.');
    });
    document.getElementById('tiktok-link')?.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Cette plateforme n\'est pas disponible pour le moment.');
    });

    // --- Fonction pour animer l'apparition des sections ---
    function animateSection(sectionId) {
      const section = document.querySelector(sectionId);
      if (section) {
        // Retirer la classe si elle existe déjà pour réinitialiser l'animation
        section.classList.remove('section-highlight');
        // Forcer le reflow pour que l'animation se relance
        void section.offsetWidth;
        section.classList.add('section-highlight');
        // Retirer la classe après l'animation
        setTimeout(() => {
          section.classList.remove('section-highlight');
        }, 700);
      }
    }

    // --- Gestion des clics sur les liens de navigation (ancres) ---
    function handleNavClick(e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href;
        const target = document.querySelector(targetId);
        if (target) {
          // Scroll fluide vers la section
          target.scrollIntoView({ behavior: 'smooth' });
          // Ajouter l'animation après le début du scroll
          setTimeout(() => {
            animateSection(targetId);
          }, 300); // Délai pour que le scroll ait commencé
        }
        // Fermer le menu burger sur mobile
        if (window.innerWidth <= 768) {
          document.querySelector('.nav-links').style.display = 'none';
        }
      }
    }

    // Ajouter l'écouteur à tous les liens de navigation (dans .nav-links et .hero-btn et footer)
    document.querySelectorAll('.nav-links a, .hero-btn, footer a[href^="#"]').forEach(link => {
      link.addEventListener('click', handleNavClick);
    });

    // --- Pour les boutons "Réserver" dans les cartes services ---
    document.querySelectorAll('.btn-reserver').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = '#reservation';
        const target = document.querySelector(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => {
            animateSection(targetId);
          }, 300);
        }
      });
    });

    // --- Si l'URL contient une ancre au chargement, on anime la section cible ---
    if (window.location.hash) {
      const hash = window.location.hash;
      const target = document.querySelector(hash);
      if (target) {
        setTimeout(() => {
          animateSection(hash);
        }, 500);
      }
    }

    // --- Formulaire de réservation (calcul automatique du total) ---
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
        'brazzaville': { coutumier: 150000, officiel: 195000, complet: 350000, montage: 30000, graphisme: 0, autre: 0 }
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

    // --- Formulaire de contact ---
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

      window.open(`https://wa.me/242064141818?text=${texte}`, '_blank');
    });

    // --- Chatbot (inchangé) ---
    const chatBtn = document.getElementById('chatBtn');
    const chatWindow = document.getElementById('chatWindow');
    const closeChat = document.getElementById('closeChat');
    const chatMessages = document.getElementById('chatMessages');
    const quickReplies = document.querySelectorAll('.quick-reply');
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendChat');

    const botKnowledge = [
      { keywords: ['bonjour','salut','hello','coucou','hey'], response: 'Bonjour ! Comment puis-je vous aider ?' },
      { keywords: ['prix','tarif','combien','coûte','coutumier','125000','125 000'], response: 'Le forfait **Mariage coutumier** (Pointe-Noire) est à **125 000 FCFA**. Il inclut reportage photo/vidéo, photos illimitées, 50 tirages 13x18, 50 invitations et clé USB 8Go.' },
      { keywords: ['prix','tarif','combien','coûte','coutumier','brazzaville','150000','150 000'], response: 'Le forfait **Mariage coutumier** (Brazzaville) est à **150 000 FCFA**. Il inclut reportage photo/vidéo, photos illimitées, 50 tirages 13x18, 50 invitations et clé USB 8Go.' },
      { keywords: ['prix','tarif','combien','coûte','officiel','195000','195 000'], response: 'Le forfait **Mariage officiel** est à **195 000 FCFA**. Prestations : reportage, photos illimitées, 100 tirages, 100 invitations, grand portrait, shooting pro, clé USB.' },
      { keywords: ['prix','tarif','combien','coûte','complet','pointe-noire','250000','250 000'], response: 'Le forfait **Complet** (Pointe-Noire) est à **250 000 FCFA**. Il inclut toutes les prestations des deux formules + couverture intégrale des trois cérémonies.' },
      { keywords: ['prix','tarif','combien','coûte','complet','brazzaville','350000','350 000'], response: 'Le forfait **Complet** (Brazzaville) est à **350 000 FCFA**. Il inclut toutes les prestations des deux formules + couverture intégrale des trois cérémonies.' },
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
        else txt = q;
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

    // --- Animation au défilement (reveal) ---
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

    // --- Burger menu avec animation ---
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
        navLinks.style.opacity = '0';
        navLinks.style.transform = 'translateY(-10px)';
        navLinks.offsetHeight;
        navLinks.style.transition = 'opacity 0.3s, transform 0.3s';
        navLinks.style.opacity = '1';
        navLinks.style.transform = 'translateY(0)';
      }
    });