/* ==========================================================================
   AJT SEGUROS · comportamento do site
   --------------------------------------------------------------------------
   Sem dependências, sem build. Basta este ficheiro.
   Não é preciso editar nada aqui para alterar textos do site.
   ========================================================================== */
(function () {
  'use strict';

  /* ---- 1 · Menu mobile ------------------------------------------------- */
  var botaoMenu = document.querySelector('.menu-botao');
  var navMovel = document.querySelector('.nav-movel');

  if (botaoMenu && navMovel) {
    botaoMenu.addEventListener('click', function () {
      var aberto = botaoMenu.getAttribute('aria-expanded') === 'true';
      botaoMenu.setAttribute('aria-expanded', String(!aberto));
      navMovel.classList.toggle('aberto', !aberto);
    });

    // Fechar ao clicar numa ligação
    navMovel.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        botaoMenu.setAttribute('aria-expanded', 'false');
        navMovel.classList.remove('aberto');
      }
    });
  }

  /* ---- 2 · Submenu "Seguros" (desktop) --------------------------------- */
  var grupos = document.querySelectorAll('.nav-grupo');

  Array.prototype.forEach.call(grupos, function (grupo) {
    var botao = grupo.querySelector('button');
    if (!botao) return;

    var adiar = null;

    function fechar() {
      if (adiar) { clearTimeout(adiar); adiar = null; }
      grupo.setAttribute('data-aberto', 'false');
      botao.setAttribute('aria-expanded', 'false');
    }

    function abrir() {
      if (adiar) { clearTimeout(adiar); adiar = null; }
      grupo.setAttribute('data-aberto', 'true');
      botao.setAttribute('aria-expanded', 'true');
    }

    /* Fechar com atraso: dá tempo a que o rato atravesse um canto ou volte
       atrás sem perder o menu. Se voltar a entrar, o fecho é cancelado. */
    function fecharComCalma() {
      if (adiar) clearTimeout(adiar);
      adiar = setTimeout(fechar, 240);
    }

    function alternar() {
      var aberto = grupo.getAttribute('data-aberto') === 'true';
      grupo.setAttribute('data-aberto', String(!aberto));
      botao.setAttribute('aria-expanded', String(!aberto));
    }

    botao.addEventListener('click', alternar);
    grupo.addEventListener('mouseenter', abrir);
    grupo.addEventListener('mouseleave', fecharComCalma);
    grupo.addEventListener('focusout', function (e) {
      if (!grupo.contains(e.relatedTarget)) fechar();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') fechar();
    });
  });

  /* ---- 3 · Animação de entrada ("surge") ------------------------------- */
  var animaveis = document.querySelectorAll('.surge');
  var reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!('IntersectionObserver' in window) || reduzirMovimento) {
    Array.prototype.forEach.call(animaveis, function (el) {
      el.classList.add('visivel');
    });
  } else {
    /* Só a partir daqui é que o script esconde o que vai revelar. */
    document.documentElement.classList.add('anima');

    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('visivel');
          observador.unobserve(entrada.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    Array.prototype.forEach.call(animaveis, function (el) {
      observador.observe(el);
    });

    /* E uma rede por baixo. Sem contas de posição: passados dois segundos,
       tudo o que ainda não foi revelado é revelado, esteja onde estiver.
       Um elemento que aparece cedo de mais é invisível para quem ainda não
       lá chegou; um elemento que nunca aparece é um site partido. Entre os
       dois riscos não há dúvida possível. */
    setTimeout(function () {
      var faltam = document.querySelectorAll('.surge:not(.visivel)');
      Array.prototype.forEach.call(faltam, function (el) { el.classList.add('visivel'); });
    }, 2000);
  }

  /* ---- 3b · Carrossel do cabeçalho ------------------------------------- */
  /* As imagens estão todas no HTML; aqui só se troca qual delas está visível.
     Sem JS, fica a primeira — o site não depende disto para funcionar. */
  var hero = document.querySelector('.hero');
  var imagens = hero ? hero.querySelectorAll('.hero-fundo') : [];
  var controlo = document.querySelector('[data-carrossel-controlo]');

  if (hero && imagens.length > 1 && controlo && !reduzirMovimento) {
    var INTERVALO = 6500;
    var actual = 0;
    var relogio = null;
    var pontos = controlo.querySelector('.hero-pontos');
    var botaoPausa = controlo.querySelector('.hero-pausa');

    hero.setAttribute('data-carrossel', 'pronto');
    controlo.hidden = false;

    function mostrar(i) {
      imagens[actual].classList.remove('actual');
      pontos.children[actual].setAttribute('aria-current', 'false');
      actual = (i + imagens.length) % imagens.length;
      imagens[actual].classList.add('actual');
      pontos.children[actual].setAttribute('aria-current', 'true');
    }

    function arrancar() {
      parar();
      relogio = setInterval(function () { mostrar(actual + 1); }, INTERVALO);
    }

    function parar() {
      if (relogio) { clearInterval(relogio); relogio = null; }
    }

    // um ponto por imagem
    Array.prototype.forEach.call(imagens, function (img, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-current', i === 0 ? 'true' : 'false');
      b.innerHTML = '<span class="visualmente-oculto">Imagem ' + (i + 1) + '</span>';
      b.addEventListener('click', function () {
        mostrar(i);
        if (botaoPausa.getAttribute('aria-pressed') !== 'true') { arrancar(); }
      });
      pontos.appendChild(b);
    });

    botaoPausa.addEventListener('click', function () {
      var parado = botaoPausa.getAttribute('aria-pressed') === 'true';
      botaoPausa.setAttribute('aria-pressed', parado ? 'false' : 'true');
      if (parado) { arrancar(); } else { parar(); }
    });

    // não gastar ciclos com o separador em segundo plano
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { parar(); }
      else if (botaoPausa.getAttribute('aria-pressed') !== 'true') { arrancar(); }
    });

    arrancar();
  }

  /* ---- 4 · Ano automático no rodapé ------------------------------------ */
  var anos = document.querySelectorAll('[data-ano]');
  Array.prototype.forEach.call(anos, function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---- 5 · Formulário de contacto -------------------------------------- */
  /* O formulário funciona de duas formas:
     a) Se o atributo action apontar para um serviço de formulários, o envio
        é tratado por esse serviço.
     b) Se o action for um endereço mailto, abrimos o programa de email do
        visitante com a mensagem preenchida. */
  var form = document.querySelector('form[data-formulario-contacto]');

  if (form) {
    form.addEventListener('submit', function (e) {
      var action = form.getAttribute('action') || '';
      var porConfigurar = action === '' || action.indexOf('mailto:') === 0;
      if (!porConfigurar) return; // deixa o serviço tratar do envio

      e.preventDefault();

      var d = new FormData(form);
      var destino = form.getAttribute('data-email') || 'geral@ajtseguros.pt';
      var assunto = 'Pedido de contacto pelo site — ' + (d.get('assunto') || 'Informação geral');
      var corpo =
        'Nome: ' + (d.get('nome') || '') + '\n' +
        'Email: ' + (d.get('email') || '') + '\n' +
        'Telefone: ' + (d.get('telefone') || '') + '\n' +
        'Assunto: ' + (d.get('assunto') || '') + '\n\n' +
        'Mensagem:\n' + (d.get('mensagem') || '') + '\n';

      window.location.href =
        'mailto:' + destino +
        '?subject=' + encodeURIComponent(assunto) +
        '&body=' + encodeURIComponent(corpo);

      var aviso = form.querySelector('[data-aviso]');
      if (aviso) {
        aviso.hidden = false;
        aviso.focus();
      }
    });
  }
})();

/* ═══════════════════════════════════════════════════════════════════════════
   PRANCHA — o movimento das vinhetas
   ═══════════════════════════════════════════════════════════════════════════

   Quatro comportamentos, todos opcionais e todos desligáveis:

     inclinar   as vinhetas rodam conforme a posição do ponteiro
     assentar   entram em cascata quando chegam ao ecrã
     deslizar   as camadas de fundo movem-se menos do que a frente

   Nada disto é necessário para ler o site. Se o JavaScript não correr, se o
   ponteiro for um dedo, ou se o sistema estiver a pedir menos movimento, a
   página fica exactamente na mesma — apenas quieta.
   ───────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  var quieto = window.matchMedia('(prefers-reduced-motion: reduce)');
  var ponteiroFino = window.matchMedia('(hover: hover) and (pointer: fine)');

  /* ── 1 · inclinar ────────────────────────────────────────────────────────
     A vinheta roda para o lado onde está o ponteiro, no máximo 7 graus, e
     levanta-se 14px. O cálculo é feito uma vez por frame — não uma vez por
     evento de rato, que dispara dezenas de vezes por segundo. */
  function inclinar() {
    if (quieto.matches || !ponteiroFino.matches) return;

    document.querySelectorAll('.inclina').forEach(function (alvo) {
      var pendente = false, ultimo = null;

      function desenhar() {
        pendente = false;
        if (!ultimo) return;
        var c = alvo.getBoundingClientRect();
        var x = (ultimo.clientX - c.left) / c.width - 0.5;   /* -0.5 … 0.5 */
        var y = (ultimo.clientY - c.top) / c.height - 0.5;
        alvo.style.setProperty('--ry', (x * 14).toFixed(2) + 'deg');
        alvo.style.setProperty('--rx', (-y * 11).toFixed(2) + 'deg');
        alvo.style.setProperty('--lz', '14px');

        var brilho = alvo.querySelector('.vinheta-brilho');
        if (brilho) {
          brilho.style.backgroundPosition = (50 + x * 90).toFixed(0) + '% 50%';
        }
      }

      alvo.addEventListener('pointermove', function (e) {
        ultimo = e;
        if (!pendente) { pendente = true; requestAnimationFrame(desenhar); }
      });

      alvo.addEventListener('pointerleave', function () {
        ultimo = null;
        alvo.style.setProperty('--rx', '0deg');
        alvo.style.setProperty('--ry', '0deg');
        alvo.style.setProperty('--lz', '0px');
      });
    });
  }

  /* ── 2 · assentar ────────────────────────────────────────────────────────
     Cada vinheta entra quando chega ao ecrã. As que estão na mesma fila
     entram em cascata, com 90ms de intervalo, como quem pousa uma prancha.
     Depois de entrar, deixa de ser observada: não há trabalho a repetir. */
  function assentar() {
    var alvos = document.querySelectorAll('.entra');
    if (!alvos.length) return;

    if (quieto.matches || !('IntersectionObserver' in window)) {
      alvos.forEach(function (a) { a.classList.add('dentro'); });
      return;
    }

    /* Só agora se assume o controlo do que está visível. Até esta linha, as
       vinhetas estavam à vista — e é assim que ficam se algo falhar acima. */
    document.documentElement.classList.add('anima');

    /* A mesma rede: passados dois segundos, o que sobrar mostra-se. */
    setTimeout(function () {
      var faltam = document.querySelectorAll('.entra:not(.dentro)');
      Array.prototype.forEach.call(faltam, function (el) { el.classList.add('dentro'); });
    }, 2000);

    var observador = new IntersectionObserver(function (entradas) {
      var n = 0;
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        entrada.target.style.setProperty('--atraso', (n * 90) + 'ms');
        entrada.target.classList.add('dentro');
        observador.unobserve(entrada.target);
        n++;
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

    alvos.forEach(function (a) { observador.observe(a); });
  }

  /* ── 3 · deslizar ────────────────────────────────────────────────────────
     Parallax honesto: o elemento move-se uma fracção do que a página se
     moveu, e nunca mais do que 34px. Sem exageros — o que se pretende é
     que se sinta profundidade, não que se note o efeito. */
  function deslizar() {
    if (quieto.matches) return;
    var camadas = Array.prototype.slice.call(document.querySelectorAll('.camada'));
    if (!camadas.length) return;

    var pendente = false;

    function desenhar() {
      pendente = false;
      var meio = window.innerHeight / 2;
      camadas.forEach(function (c) {
        var caixa = c.getBoundingClientRect();
        if (caixa.bottom < -200 || caixa.top > window.innerHeight + 200) return;
        var centro = caixa.top + caixa.height / 2;
        var factor = parseFloat(c.dataset.deslize || '0.06');
        var d = Math.max(-34, Math.min(34, (meio - centro) * factor));
        c.style.setProperty('--deslize', d.toFixed(1) + 'px');
      });
    }

    window.addEventListener('scroll', function () {
      if (!pendente) { pendente = true; requestAnimationFrame(desenhar); }
    }, { passive: true });
    desenhar();
  }

  /* A onomatopeia de banda desenhada foi tentada aqui e retirada: num site
     de seguros, um «PAM!» a saltar do clique não é assinatura gráfica, é
     falta de compostura. A linguagem de BD fica nas molduras e na cor, que
     é onde ela trabalha a favor. */

  function arrancar() { inclinar(); assentar(); deslizar(); }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', arrancar);
  } else {
    arrancar();
  }
})();

/* ═══════════════════════════════════════════════════════════════════════════
   A LUPA — clicar numa vinheta para a ver ao tamanho do desenho
   ═══════════════════════════════════════════════════════════════════════════
   As vinhetas são pequenas de propósito: ilustram sem ocupar a página. Mas
   as ilustrações têm detalhe a mais para 200px, e quem quiser ver merece
   poder ver. Um clique abre a vinheta grande; dentro de uma tira, as setas
   passam de uma para a seguinte, porque uma tira lê-se em três tempos.

   Se isto não correr, as vinhetas continuam vinhetas. Nada se perde.
   ───────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  if (!window.HTMLDialogElement) return;   /* sem <dialog>, fica como está */

  var LUPA = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="8.5" cy="8.5" r="5.5"/><path d="m12.8 12.8 4.2 4.2M8.5 6.2v4.6M6.2 8.5h4.6"/></svg>';
  var CRUZ = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M5 5l10 10M15 5 5 15"/></svg>';
  var SETA = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4l-6 6 6 6"/></svg>';

  var alvos = Array.prototype.slice.call(
    document.querySelectorAll('.vinheta img, .figura-lado img'));
  if (!alvos.length) return;

  /* Cada imagem torna-se um botão a sério: acessível por teclado, com nome
     próprio, e não um <div> que só reage ao rato. */
  alvos.forEach(function (img) {
    var fig = img.closest('figure, article');
    if (!fig) return;
    fig.classList.add('ampliavel');
    fig.setAttribute('role', 'button');
    fig.setAttribute('tabindex', '0');
    fig.setAttribute('aria-label', 'Ver maior: ' + (img.alt || 'ilustração'));
    var selo = document.createElement('span');
    selo.className = 'lupa-selo';
    selo.setAttribute('aria-hidden', 'true');
    selo.innerHTML = LUPA;
    fig.appendChild(selo);
  });

  /* Uma caixa só, reutilizada — não uma por imagem. */
  var caixa = document.createElement('dialog');
  caixa.className = 'lupa';
  caixa.innerHTML =
    '<figure class="lupa-caixa">' +
      '<button class="lupa-fechar" type="button" aria-label="Fechar">' + CRUZ + '</button>' +
      '<img alt="">' +
      '<figcaption></figcaption>' +
    '</figure>' +
    '<button class="lupa-passo lupa-anterior" type="button" aria-label="Vinheta anterior">' + SETA + '</button>' +
    '<button class="lupa-passo lupa-seguinte" type="button" aria-label="Vinheta seguinte" style="transform:translateY(-50%) rotate(180deg)">' + SETA + '</button>' +
    '<p class="lupa-conta" aria-live="polite"></p>';
  document.body.appendChild(caixa);

  var grande = caixa.querySelector('img');
  var legenda = caixa.querySelector('figcaption');
  var conta = caixa.querySelector('.lupa-conta');
  var antes = caixa.querySelector('.lupa-anterior');
  var depois = caixa.querySelector('.lupa-seguinte');

  var grupo = [], indice = 0, origem = null;

  /* A imagem grande é a maior do srcset, se houver. Assim a lupa mostra
     mesmo o desenho, e não a miniatura esticada. */
  function maior(img) {
    var set = img.getAttribute('srcset');
    if (!set) return img.currentSrc || img.src;
    var maiorLargura = 0, url = img.src;
    set.split(',').forEach(function (parte) {
      var p = parte.trim().split(/\s+/);
      var l = parseInt(p[1] || '0', 10);
      if (l >= maiorLargura) { maiorLargura = l; url = p[0]; }
    });
    return url;
  }

  function mostrar(i) {
    indice = (i + grupo.length) % grupo.length;
    var fig = grupo[indice];
    var img = fig.querySelector('img');
    var cap = fig.querySelector('figcaption');
    grande.src = maior(img);
    grande.alt = img.alt || '';
    legenda.textContent = cap ? cap.textContent.trim() : '';
    legenda.hidden = !legenda.textContent;
    var varios = grupo.length > 1;
    antes.hidden = depois.hidden = !varios;
    conta.textContent = varios ? (indice + 1) + ' de ' + grupo.length : '';
  }

  function abrir(fig) {
    var tira = fig.closest('.tira');
    grupo = tira ? Array.prototype.slice.call(tira.querySelectorAll('figure')) : [fig];
    origem = fig;
    mostrar(grupo.indexOf(fig));
    caixa.showModal();
  }

  document.addEventListener('click', function (e) {
    var fig = e.target.closest('.ampliavel');
    if (!fig || caixa.contains(e.target)) return;
    e.preventDefault();
    abrir(fig);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var fig = document.activeElement && document.activeElement.closest('.ampliavel');
    if (!fig || caixa.open) return;
    e.preventDefault();
    abrir(fig);
  });

  antes.addEventListener('click', function () { mostrar(indice - 1); });
  depois.addEventListener('click', function () { mostrar(indice + 1); });
  caixa.querySelector('.lupa-fechar').addEventListener('click', function () { caixa.close(); });

  /* Clicar fora da imagem fecha — o reflexo de toda a gente. */
  caixa.addEventListener('click', function (e) {
    if (e.target === caixa) caixa.close();
  });

  caixa.addEventListener('keydown', function (e) {
    if (grupo.length < 2) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); mostrar(indice + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); mostrar(indice - 1); }
  });

  /* Ao fechar, o foco volta de onde veio. Quem navega por teclado não fica
     perdido no início da página. */
  caixa.addEventListener('close', function () {
    if (origem) origem.focus();
    grande.removeAttribute('src');
  });
})();
