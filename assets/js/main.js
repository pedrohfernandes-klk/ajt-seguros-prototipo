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

    function fechar() {
      grupo.setAttribute('data-aberto', 'false');
      botao.setAttribute('aria-expanded', 'false');
    }

    function alternar() {
      var aberto = grupo.getAttribute('data-aberto') === 'true';
      grupo.setAttribute('data-aberto', String(!aberto));
      botao.setAttribute('aria-expanded', String(!aberto));
    }

    botao.addEventListener('click', alternar);
    grupo.addEventListener('mouseenter', function () {
      grupo.setAttribute('data-aberto', 'true');
      botao.setAttribute('aria-expanded', 'true');
    });
    grupo.addEventListener('mouseleave', fechar);
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

  /* ---- 4 · Ano automático no rodapé ------------------------------------ */
  var anos = document.querySelectorAll('[data-ano]');
  Array.prototype.forEach.call(anos, function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---- 5 · Formulário de contacto -------------------------------------- */
  /* O formulário funciona de duas formas:
     a) Se o atributo action apontar para um serviço (Formspree, Web3Forms,
        Formsubmit...), o envio é feito por esse serviço.
     b) Se o action ainda for o marcador "COLOCAR-AQUI-O-ENDERECO-DO-SERVICO",
        abrimos o programa de email do visitante com a mensagem preenchida.
        Assim o site funciona desde o primeiro dia, sem configuração. */
  var form = document.querySelector('form[data-formulario-contacto]');

  if (form) {
    form.addEventListener('submit', function (e) {
      var action = form.getAttribute('action') || '';
      var porConfigurar = action.indexOf('COLOCAR-AQUI') !== -1 || action === '';
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
