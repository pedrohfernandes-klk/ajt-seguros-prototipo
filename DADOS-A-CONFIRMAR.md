# Dados a confirmar antes de publicar

Este ficheiro lista tudo o que falta para o site poder ir para o ar.
Está por ordem de importância. Os pontos marcados **🔴 obrigatório** não são
opcionais: são exigências legais de um mediador de seguros registado na ASF.

---

## 🔴 1 · Número de registo e categoria na ASF

**Onde aparece:** no rodapé de **todas** as páginas, na página `sobre.html`
e na página `informacao-legal.html`.

**O que procurar nos ficheiros:** `[N.º DE REGISTO ASF]` e `[CATEGORIA]`

A categoria é uma destas, conforme o registo da AJT:
- Agente de seguros
- Mediador de seguros ligado
- Corretor de seguros

Confirmar em <https://www.asf.com.pt> ou no certificado de registo da empresa.

> **Porque é obrigatório:** um mediador tem de identificar-se e indicar o seu
> número de registo e categoria antes de qualquer contacto comercial.
> Sem isto, o site não deve ser publicado.

---

## 🔴 2 · Participações qualificadas

**Onde aparece:** `informacao-legal.html`, secção "Natureza da actividade".
**O que procurar:** `[A PREENCHER]`

Há que declarar:
- se a AJT detém participação **superior a 10 %** do capital ou dos direitos
  de voto de alguma empresa de seguros;
- se alguma empresa de seguros detém participação equivalente na AJT.

Se não existir nenhuma — que é o caso mais comum — a frase correcta é:

> A AJT não detém participação, directa ou indirecta, superior a 10 % nos
> direitos de voto ou no capital de qualquer empresa de seguros, nem existe
> empresa de seguros que detenha participação equivalente na AJT.

---

## 🔴 3 · Duas empresas, dois registos

O balcão da Alameda (Allianz) é da **A.J.T. — Sociedade de Mediação de
Seguros, Lda** (NIF 505991888).
O balcão da Rua Carlos Manuel (Generali Tranquilidade) surge registado como
**AJT Mediação de Seguros Unipessoal, Lda**.

**A confirmar com o proprietário:**
- São mesmo duas entidades jurídicas distintas?
- Cada uma tem o seu número de registo ASF?
- O rodapé deve mencionar as duas, ou apenas a principal?

Consoante a resposta, pode ser preciso acrescentar a segunda denominação e o
segundo número de registo ao rodapé.

---

## 🟠 4 · Domínio do site

Todos os endereços canónicos e o `sitemap.xml` assumem **`https://www.ajtseguros.pt`**
(deduzido do email `geral@ajtseguros.pt`).

**A confirmar:** o domínio existe e vai ser usado para o site?
Se for outro, é preciso substituir em:
- `sitemap.xml`
- `robots.txt`
- a etiqueta `<link rel="canonical">` de cada página
- as etiquetas `og:url` de cada página

---

## 🟠 5 · Fotografias reais

**Já resolvido:** as três ilustrações originais estão integradas —
estuário do Tejo (página inicial), marginal de Alcochete (`sobre.html`)
e acidente automóvel (`seguros/automovel.html` e `sinistros.html`).

**Ainda em falta — a fotografia da montra do balcão da Alameda.**

1. Gravar em `assets/img/escritorio-alameda.jpg` (largura ideal 1600 px).
2. Acrescentar a `contactos.html`, dentro do cartão do Balcão da Alameda,
   ou em `sobre.html` a seguir à ilustração da marginal:

```html
<figure class="figura">
  <img src="assets/img/escritorio-alameda.jpg"
       alt="Montra do balcão da AJT Seguros na Alameda do Grupo Desportivo Alcochetense, 97"
       width="1600" height="900" loading="lazy">
  <figcaption>O balcão da Alameda, no número 97. Entra-se sem marcação.</figcaption>
</figure>
```

**Também úteis, se houver:** fotografia do segundo balcão e uma fotografia
da equipa. Fotografias reais de pessoas e do espaço são dos elementos que mais
aumentam a confiança num site de serviços locais.

---

## 🟠 6 · Logótipo em vetor

O símbolo actual (`assets/img/marca-ajt.svg` e `marca-ajt-branco.svg`) é uma
**vetorização feita a partir do papel timbrado** — aproximada, não oficial.

Quando houver o ficheiro original (`.ai`, `.eps`, `.pdf` ou `.svg`), substituir:

- `assets/img/marca-ajt.svg` — símbolo a cores, para fundos claros
- `assets/img/marca-ajt-branco.svg` — símbolo claro, para fundos escuros
- `assets/img/logo-ajt.svg` — lockup completo com o texto
- `assets/img/favicon.svg` — ícone do separador do browser

Não é preciso mexer no HTML: basta manter os mesmos nomes de ficheiro.

---

## 🟠 7 · Avaliações de clientes

A secção "O que dizem de nós" na página inicial tem **texto de marcação**,
não avaliações reais.

**Duas opções:**
1. Recolher avaliações reais no Google e copiá-las para lá (ver `GUIA-DE-EDICAO.md`).
2. Apagar a secção inteira até as haver.

> ⚠️ **Nunca publicar testemunhos inventados.** Além de enganar o cliente, é
> publicidade enganosa e pode dar origem a coima.

---

## 🟡 8 · Perfil no Google

O site tem uma ligação para "Ver todas as avaliações no Google" que aponta
para uma pesquisa genérica.

**A fazer:** reclamar / verificar o perfil de empresa no Google
(Google Business Profile) para os dois balcões, e substituir a ligação em
`index.html` pelo endereço do perfil.

Para um negócio local isto pesa mais no número de contactos do que qualquer
outra coisa do site.

---

## 🟡 9 · Formulário de contacto

Neste momento o formulário abre o programa de email do visitante com a
mensagem preenchida. **Funciona desde o primeiro dia, sem configuração.**

Se preferir receber os pedidos directamente na caixa de correio, ver a secção
"Formulário" do `GUIA-DE-EDICAO.md` (leva cinco minutos, é gratuito).

---

## 🟡 10 · Confirmações de conteúdo com o proprietário

- [ ] Os ramos listados estão completos? (Falta responsabilidade civil de caça,
      animais de companhia, viagem, náutica?)
- [ ] O horário está certo? Uma fonte indicava sábados de manhã, outra indicava
      encerrado. O site diz **encerrado ao fim-de-semana**.
- [ ] Há mais companhias representadas além da Allianz e da Generali
      Tranquilidade? O site menciona apenas estas duas, por serem as únicas
      confirmadas.
- [ ] O telemóvel 964 036 313 é para publicar?
- [ ] A AJT quer aparecer também para Montijo, Samouco e São Francisco?
      (Já está assim nos dados estruturados.)

---

## Fontes dos dados já confirmados

Estes dados foram verificados em fontes públicas e **não** precisam de ser
inventados:

| Dado | Fonte |
|---|---|
| Morada, telefone, email e horário do balcão Allianz | [allianz.pt/mediador/ajtseguros](https://www.allianz.pt/mediador/ajtseguros.html) |
| Morada, telefones e email do balcão Generali Tranquilidade | [agentes.tranquilidade.pt](https://agentes.tranquilidade.pt/alcochete/largo-da-revolucao--1910--loja-1) |
| NIF 505991888 e data de constituição (30/01/2002) | [Iberinform](https://www.iberinform.pt/empresa/21355973/a-j-t-sociedade-de-mediacao-de-seguros-lda) · [Racius](https://www.racius.com/a-j-t-sociedade-de-mediacao-de-seguros-lda/) |
| Ramos comercializados | [allianz.pt/mediador/ajtseguros](https://www.allianz.pt/mediador/ajtseguros.html) |
