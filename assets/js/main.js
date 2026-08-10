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
