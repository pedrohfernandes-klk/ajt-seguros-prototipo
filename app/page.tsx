"use client";

import { useState } from "react";

const Arrow = () => <span aria-hidden="true">&#8599;</span>;

const insurance = [
  { n: "01", title: "Automóvel", text: "Proteção à medida de cada viagem.", icon: "A" },
  { n: "02", title: "Habitação", text: "A sua casa, protegida por inteiro.", icon: "H" },
  { n: "03", title: "Saúde", text: "Cuidar hoje, com tranquilidade amanhã.", icon: "S" },
  { n: "04", title: "Vida", text: "Segurança para quem mais importa.", icon: "V" },
  { n: "05", title: "Empresas", text: "Soluções que acompanham o seu negócio.", icon: "E" },
  { n: "06", title: "Frotas", text: "Toda a mobilidade da empresa, coberta.", icon: "F" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main>
      <header className="nav-wrap">
        <a className="brand" href="#top" aria-label="AJT Seguros — início">
          <span className="brand-mark">AJT</span>
          <span className="brand-copy">SEGUROS<small>MEDIAÇÃO DE SEGUROS</small></span>
        </a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Abrir menu">
          <span></span><span></span>
        </button>
        <nav className={menuOpen ? "open" : ""} aria-label="Navegação principal">
          <a href="#seguros" onClick={() => setMenuOpen(false)}>Seguros</a>
          <a href="#ajt" onClick={() => setMenuOpen(false)}>A AJT</a>
          <a href="#processo" onClick={() => setMenuOpen(false)}>Como trabalhamos</a>
          <a href="#contactos" onClick={() => setMenuOpen(false)}>Contactos</a>
        </nav>
        <a className="nav-cta" href="#contactos">Pedir contacto <Arrow /></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy reveal">
          <p className="eyebrow"><span></span> Mediação de seguros · Alcochete</p>
          <h1>Seguros que<br />acompanham<br /><em>a sua vida.</em></h1>
          <p className="hero-intro">Há mais de duas décadas a proteger particulares e empresas com aconselhamento próximo, claro e feito à medida.</p>
          <div className="hero-actions">
            <a className="button primary" href="#contactos">Falar com um mediador <Arrow /></a>
            <a className="text-link" href="#seguros">Conhecer os seguros <span>↓</span></a>
          </div>
        </div>
        <div className="hero-image" role="img" aria-label="Paisagem tranquila junto ao Tejo em Alcochete">
          <div className="sun"></div><div className="shore"></div>
          <div className="image-label"><span>ALCOCHETE</span><small>38°45&apos;N · 8°57&apos;W</small></div>
          <div className="hero-note"><b>Proteção com presença.</b><span>Do primeiro conselho ao momento em que mais precisa.</span></div>
        </div>
      </section>

      <section className="trust-line" aria-label="Destaques">
        <span>Desde 2002</span><i></i><span>Atendimento local</span><i></i><span>Soluções multimarca</span><i></i><span>Acompanhamento de sinistros</span>
      </section>

      <section className="insurance section" id="seguros">
        <div className="section-head">
          <div><p className="eyebrow dark"><span></span> Proteção para cada etapa</p><h2>O que importa merece<br /><em>a escolha certa.</em></h2></div>
          <p>Comparamos soluções e explicamos cada detalhe, para que escolha com confiança — sem complicações, sem letra pequena.</p>
        </div>
        <div className="card-grid">
          {insurance.map((item) => (
            <a className="insurance-card" href="#contactos" key={item.title}>
              <div className="card-top"><span>{item.n}</span><b>{item.icon}</b></div>
              <div><h3>{item.title}</h3><p>{item.text}</p></div>
              <Arrow />
            </a>
          ))}
        </div>
        <a className="text-link all" href="#contactos">Ver todas as soluções <span>→</span></a>
      </section>

      <section className="why" id="ajt">
        <div className="why-image" role="img" aria-label="Detalhe arquitetónico de Alcochete"><div className="arch"></div><span>AJT · DESDE 2002</span></div>
        <div className="why-copy">
          <p className="eyebrow light"><span></span> Porquê a AJT</p>
          <h2>Mais do que seguros.<br /><em>Uma relação de confiança.</em></h2>
          <p className="why-lead">A tranquilidade não vem apenas da apólice. Vem de saber que há alguém disponível, que conhece o seu caso e que o acompanha de verdade.</p>
          <div className="why-list">
            <article><b>01</b><div><h3>Atendimento próximo</h3><p>Conhecemos os nossos clientes pelo nome e estamos presentes quando é preciso.</p></div></article>
            <article><b>02</b><div><h3>Aconselhamento claro</h3><p>Traduzimos o complexo e ajudamos a escolher a proteção realmente adequada.</p></div></article>
            <article><b>03</b><div><h3>Acompanhamento contínuo</h3><p>Da contratação à gestão de um sinistro, não fica sozinho.</p></div></article>
          </div>
        </div>
      </section>

      <section className="partners section">
        <p className="eyebrow dark"><span></span> Trabalhamos com referências</p>
        <div className="partner-row"><b>Allianz</b><b>GENERALI<br /><small>TRANQUILIDADE</small></b><b>Fidelidade</b><b>Zurich</b><b>MAPFRE</b></div>
        <p className="partner-note">Uma seleção de companhias sólidas para encontrarmos, em conjunto, a solução certa.</p>
      </section>

      <section className="process section" id="processo">
        <div className="process-title"><p className="eyebrow light"><span></span> Simples, do início ao fim</p><h2>Como cuidamos<br /><em>da sua proteção.</em></h2></div>
        <div className="timeline">
          <article><b>01</b><div className="dot"></div><h3>Ouvimos</h3><p>Começamos por perceber o que precisa de proteger.</p></article>
          <article><b>02</b><div className="dot"></div><h3>Analisamos</h3><p>Comparamos coberturas e condições adequadas ao seu perfil.</p></article>
          <article><b>03</b><div className="dot"></div><h3>Aconselhamos</h3><p>Explicamos as opções com clareza para decidir em confiança.</p></article>
          <article><b>04</b><div className="dot"></div><h3>Acompanhamos</h3><p>Continuamos presentes durante toda a vida do seu seguro.</p></article>
        </div>
      </section>

      <section className="metrics">
        <div><strong>20<sup>+</sup></strong><span>anos de experiência</span></div>
        <div><strong>2</strong><span>escritórios em Alcochete</span></div>
        <div><strong>4.8<sup>/5</sup></strong><span>avaliação dos clientes</span></div>
        <p>Experiência que se mede<br />em relações duradouras.</p>
      </section>

      <section className="contact section" id="contactos">
        <div className="contact-intro"><p className="eyebrow dark"><span></span> Estamos por perto</p><h2>Vamos falar sobre<br /><em>o que quer proteger?</em></h2><p>Visite-nos num dos nossos espaços em Alcochete ou deixe o seu contacto. Respondemos com brevidade.</p><a className="button primary" href="mailto:geral@ajtseguros.pt">Enviar mensagem <Arrow /></a></div>
        <div className="offices">
          <article><div className="office-head"><span>01</span><small>CANAL ALLIANZ</small></div><h3>Sede Principal</h3><address>Alameda do Grupo Desportivo<br />Alcochetense 97, 2890-110 Alcochete</address><a href="tel:+351212348047">+351 212 348 047</a><a href="mailto:geral@ajtseguros.pt">geral@ajtseguros.pt</a><p>Seg–Sex · 09:00–13:00 / 14:00–18:00</p><a className="map-link" href="https://maps.google.com" target="_blank">Ver no mapa <Arrow /></a></article>
          <article><div className="office-head"><span>02</span><small>GENERALI TRANQUILIDADE</small></div><h3>Balcão de Atendimento</h3><address>Rua Carlos Manuel Rodrigues<br />Francisco 229, 2890-042 Alcochete</address><a href="tel:+351210889917">+351 210 889 917</a><a href="mailto:geraltrq@ajtseguros.pt">geraltrq@ajtseguros.pt</a><p>Seg–Sex · 09:00–13:00 / 14:00–18:00</p><a className="map-link" href="https://maps.google.com" target="_blank">Ver no mapa <Arrow /></a></article>
        </div>
      </section>

      <footer><div className="footer-brand"><span className="brand-mark">AJT</span><p>Proteção para o que realmente importa.</p></div><div><b>Navegação</b><a href="#seguros">Seguros</a><a href="#ajt">A AJT</a><a href="#contactos">Contactos</a></div><div><b>Contactos</b><a href="tel:+351212348047">+351 212 348 047</a><a href="mailto:geral@ajtseguros.pt">geral@ajtseguros.pt</a><span>Alcochete, Portugal</span></div><div className="footer-end"><span>© 2026 AJT Seguros</span><span>Privacidade · Livro de Reclamações</span><small>Mediador registado na ASF</small></div></footer>
    </main>
  );
}
