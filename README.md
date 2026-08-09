# AJT Seguros — sítio institucional

Sítio da **A.J.T. — Sociedade de Mediação de Seguros, Lda**, mediador de
seguros em Alcochete desde 2002.

HTML e CSS estáticos. Sem build, sem dependências, sem servidor aplicacional.

---

## Ver o site localmente

```bash
node servidor-local.mjs
```

Depois abrir <http://localhost:4321>. Requer Node.js 22 ou superior — mas
apenas para o servidor de desenvolvimento: **o site publicado não usa Node.**

---

## Estrutura

```
├── index.html                    página de entrada
├── seguros/
│   ├── automovel.html            uma página por ramo, para SEO local
│   ├── habitacao.html
│   ├── saude.html
│   ├── vida.html
│   ├── acidentes-pessoais.html
│   └── empresas.html
├── sobre.html                    a empresa
├── contactos.html                balcões + formulário
├── sinistros.html                guia prático de participação
├── informacao-legal.html         deveres de informação, RGPD, reclamações
├── 404.html
├── assets/
│   ├── css/style.css             sistema visual completo (ficheiro único)
│   ├── js/main.js                menu, animações, formulário (sem bibliotecas)
│   └── img/                      logótipo, favicon, ilustrações
├── sitemap.xml · robots.txt · .nojekyll
├── GUIA-DE-EDICAO.md             ⭐ para quem vai manter o site
├── DADOS-A-CONFIRMAR.md          ⭐ o que falta antes de publicar
└── servidor-local.mjs            servidor de desenvolvimento (não é publicado)
```

---

## Decisões técnicas

**Porquê HTML estático e não React, Next.js ou WordPress?**

O destinatário é um mediador de seguros, não uma equipa de programadores.
Um site estático:

- não parte com actualizações de dependências;
- não tem custos mensais de alojamento;
- carrega em menos de um segundo;
- não tem superfície de ataque (sem base de dados, sem painel de administração);
- pode ser editado com o Bloco de Notas;
- publica-se em GitHub Pages, Netlify, Cloudflare Pages ou em qualquer
  alojamento partilhado português, sem alterações.

O custo é a duplicação do cabeçalho e do rodapé pelas 12 páginas. Para um
site desta dimensão, é um preço baixo pela robustez que se ganha.

**Sem cookies, sem rastreio.** O site não instala qualquer identificador.
A única ligação externa é ao Google Fonts.

**Acessibilidade.** Todos os pares de cor foram medidos e cumprem o rácio
de contraste 4.5:1 da norma WCAG 2.1 AA. Os alvos de toque respeitam o
mínimo de 24 px do critério 2.5.8 da WCAG 2.2. Navegação completa por
teclado, link de salto para o conteúdo, e `prefers-reduced-motion` respeitado.

**SEO.** Uma página por ramo de seguro, com dados estruturados
`InsuranceAgency`, `BreadcrumbList` e `FAQPage`, canónicos, Open Graph e
sitemap.

---

## Sistema visual — "Maré"

Referência local: o estuário do Tejo e as salinas de Alcochete.

| Símbolo | Cor | Uso |
|---|---|---|
| `--tinta` | `#0d2233` | azul-noite institucional |
| `--mare` | `#33718f` | azul-maré, ligações e acentos |
| `--areia` / `--areia-2` | `#ece3d3` / `#f5efe4` | fundos alternados |
| `--papel` | `#fbf9f5` | fundo geral |
| `--cobre` | `#8f5527` | acento quente, com parcimónia |

Tipografia: **Fraunces** (serifa editorial, com os eixos `SOFT` e `WONK` a
dar o itálico característico) e **Public Sans** (texto corrido).

---

## Antes de publicar

Ler o **[DADOS-A-CONFIRMAR.md](DADOS-A-CONFIRMAR.md)**. Há campos legalmente
obrigatórios por preencher — nomeadamente o **número de registo na ASF** e a
**categoria de mediador** — sem os quais o site não deve ir para o ar.

---

## Estado

Protótipo. Construído como oferta ao proprietário da AJT Seguros.
Os dados de contacto, moradas, NIF e data de constituição foram verificados
em fontes públicas (Generali Tranquilidade, Iberinform, Racius) e
estão listados no fim do `DADOS-A-CONFIRMAR.md`.
