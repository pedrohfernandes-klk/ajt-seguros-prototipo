# Guia de edição do site AJT Seguros

Este guia é para quem vai manter o site — **não é preciso saber programar**.

O site é feito de ficheiros de texto simples. Abre-os num editor
(o **Bloco de Notas** do Windows serve, mas o [VS Code](https://code.visualstudio.com/)
é gratuito e muito mais confortável), altera o texto, grava, e está feito.

---

## Regra de ouro

> **Só se altera o que está entre `>` e `<`.**

Exemplo — para mudar este título:

```html
<h1 class="titulo titulo-xl">O seguro certo, explicado <em>sem letra pequena.</em></h1>
```

altera-se **apenas** o texto legível:

```html
<h1 class="titulo titulo-xl">Seguros sem complicações <em>desde 2002.</em></h1>
```

Tudo o que tem `<` e `>` à volta é instrução para o computador. Se apagar um
`<` ou um `>` sem querer, a página parte. Se isso acontecer, feche **sem gravar**
e volte a abrir.

---

## Onde está cada coisa

| Quer mudar… | Abra este ficheiro |
|---|---|
| A página de entrada | `index.html` |
| Texto sobre seguro automóvel | `seguros/automovel.html` |
| Texto sobre seguro de casa | `seguros/habitacao.html` |
| Texto sobre seguro de saúde | `seguros/saude.html` |
| Texto sobre seguro de vida | `seguros/vida.html` |
| Texto sobre acidentes pessoais | `seguros/acidentes-pessoais.html` |
| Texto sobre seguros de empresa | `seguros/empresas.html` |
| A história da empresa | `sobre.html` |
| Moradas, telefones, formulário | `contactos.html` |
| O guia de sinistros | `sinistros.html` |
| Informação legal e privacidade | `informacao-legal.html` |

Dentro de cada ficheiro, os sítios editáveis estão marcados com **✏️ EDITAR**.
Use `Ctrl+F` e procure por `EDITAR` para os encontrar todos.

---

## ⚠️ O que NÃO deve alterar

| Ficheiro | Porquê |
|---|---|
| `assets/css/style.css` | Controla todo o aspecto visual do site. Um erro aqui afecta as 12 páginas. |
| `assets/js/main.js` | Faz funcionar o menu e o formulário. |
| O bloco `rodape-legal` no fim de cada página | É informação legal obrigatória de um mediador de seguros. |
| Os blocos `<script type="application/ld+json">` | São os dados que o Google lê. Se alterar textos visíveis das perguntas frequentes, altere aqui também (ver abaixo). |

---

## Tarefas mais comuns

### Mudar um número de telefone

O telefone aparece em vários sítios de cada página. Use **Substituir tudo**
(`Ctrl+H`) e faça duas substituições em **cada ficheiro**:

1. `212 348 047` → o número novo, com espaços
2. `+351212348047` → o número novo, sem espaços e com `+351` à frente

O segundo é o que faz o telemóvel ligar quando se toca no número.

---

### Acrescentar uma pergunta frequente

Nas páginas de seguros, procure `<div class="faq surge">`. Copie um bloco
inteiro e altere-o:

```html
<details>
  <summary>A pergunta vai aqui?</summary>
  <div><p>A resposta vai aqui.</p></div>
</details>
```

Para uma resposta com dois parágrafos, use dois `<p>...</p>` seguidos.

> **Importante:** se acrescentar ou alterar perguntas, faça o mesmo no bloco
> `"@type": "FAQPage"` no topo do ficheiro. É de lá que o Google tira as
> perguntas que mostra nos resultados de pesquisa. Se os dois textos não
> baterem certo, o Google ignora ambos.

---

### Trocar uma imagem

1. Grave a imagem nova em `assets/img/` com um nome sem espaços nem acentos
   (por exemplo `escritorio-alameda.jpg`).
2. No ficheiro HTML, procure o nome da imagem antiga e substitua pelo novo.
3. Actualize o texto do `alt="..."` para descrever a imagem nova — é o que
   leem as pessoas invisuais e é o que o Google usa.

Formatos recomendados: `.jpg` para fotografias, `.svg` para logótipos.
Largura ideal para fotografias grandes: 1600 px.

---

### Trocar o logótipo

Basta substituir estes quatro ficheiros, **mantendo exactamente os mesmos nomes**:

- `assets/img/marca-ajt.svg` — símbolo a cores (fundos claros)
- `assets/img/marca-ajt-branco.svg` — símbolo claro (fundos escuros)
- `assets/img/logo-ajt.svg` — logótipo completo com texto
- `assets/img/favicon.svg` — ícone do separador do browser

Não é preciso mexer em nenhum ficheiro HTML.

---

### Colocar avaliações reais de clientes

Na página `index.html`, procure `SUBSTITUIR POR UMA AVALIAÇÃO REAL`.

Para cada uma das três avaliações:

```html
<blockquote>Cole aqui o texto da avaliação, tal como o cliente o escreveu.</blockquote>
<figcaption><b>Nome do cliente</b>Avaliação no Google · Março de 2026</figcaption>
```

Se o cliente deu 4 estrelas em vez de 5, apague uma linha `<svg ...></svg>`
do bloco `avaliacao-estrelas` e corrija o `aria-label` para `4 em 5 estrelas`.

> ⚠️ **Nunca invente testemunhos.** Se ainda não houver avaliações reais,
> apague a secção inteira — desde `<!-- ══════════ AVALIAÇÕES ══════════` até
> ao `</section>` que fecha essa secção.

**Como conseguir avaliações:** peça-as ao balcão, logo a seguir a resolver um
sinistro bem. É o momento em que as pessoas estão mais disponíveis para o fazer.

---

### Fazer o formulário chegar ao email automaticamente

Neste momento o formulário abre o programa de email do visitante com a
mensagem já preenchida. Funciona sempre, mas obriga o visitante a carregar
outra vez em "enviar".

Para receber os pedidos directamente:

1. Vá a <https://formspree.io> e crie uma conta gratuita.
2. Crie um formulário novo e indique `geral@ajtseguros.pt` como destino.
3. O Formspree dá-lhe um endereço parecido com `https://formspree.io/f/abcdwxyz`.
4. Abra `contactos.html`, procure `COLOCAR-AQUI-O-ENDERECO-DO-SERVICO` e
   substitua por esse endereço.
5. Grave, publique e faça um teste a si próprio.

O plano gratuito chega para 50 mensagens por mês.

---

### Acrescentar uma página nova

1. Copie uma página existente parecida (por exemplo `seguros/saude.html`).
2. Dê-lhe um nome novo, sem espaços nem acentos.
3. Altere o `<title>`, a `<meta name="description">` e o `<link rel="canonical">`.
4. Acrescente a página ao menu — **em todos os 12 ficheiros HTML**, nos blocos
   `nav-submenu` e `nav-movel`.
5. Acrescente a página ao `sitemap.xml`.

> Este é o único inconveniente de um site sem sistema de gestão: o menu está
> repetido em cada página. Em contrapartida, o site não precisa de servidor,
> não parte com actualizações e não tem custos mensais.

---

## Publicar as alterações

O site está alojado no GitHub Pages. Depois de gravar os ficheiros:

```bash
git add .
git commit -m "Actualiza textos da página de saúde"
git push
```

As alterações ficam online passado um ou dois minutos.

Se preferir não usar a linha de comandos, pode editar os ficheiros
directamente no site do GitHub: abra o ficheiro, carregue no ícone do lápis,
altere e carregue em "Commit changes".

---

## Ver o site no computador antes de publicar

Na pasta do site:

```bash
node servidor-local.mjs
```

Depois abra <http://localhost:4321> no browser. Para parar, `Ctrl+C`.

(Também pode simplesmente fazer duplo-clique no `index.html`, mas assim
algumas ligações entre páginas podem não funcionar.)

---

## Se alguma coisa correr mal

Todas as versões antigas ficam guardadas no GitHub. Nada se perde
definitivamente. Para voltar atrás:

```bash
git log --oneline          # ver a lista de alterações
git revert <código>        # desfazer uma alteração específica
```

Em caso de dúvida, não apague nada — pergunte primeiro.
