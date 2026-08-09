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

O balcão da Alameda é da **A.J.T. — Sociedade de Mediação de Seguros, Lda**
(NIF 505991888). O balcão da Rua Carlos Manuel surge registado como
**AJT Mediação de Seguros Unipessoal, Lda**. Os dois representam agora a
mesma companhia, a Generali Tranquilidade.

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

## 🟠 5 · Imagens — reduzidas a seis

O site passou de doze ilustrações para seis. Muitas imagens espalhadas por
todas as páginas diluíam-se umas às outras e davam ao site um ar de banco de
imagens. Estas seis cobrem cinco momentos — as duas montras contam como um
par, porque são as duas portas da mesma casa — e cada uma aparece onde faz
falta:

| Ilustração | Onde aparece | Que trabalho faz |
|---|---|---|
| `estuario-tejo` | página inicial, fundo do cabeçalho | ancora a AJT em Alcochete |
| `escritorio-alameda` | página inicial, bloco dos dois balcões | a porta do n.º 97 |
| `escritorio-carlos-manuel` | página inicial, bloco dos dois balcões | a porta do n.º 229 |
| `atendimento` | `sobre.html` | mostra o que a AJT faz: explicar antes de vender |
| `peritagem-telhado` | `sinistros.html` | o momento em que o seguro conta |
| `automovel-assistencia` | `particulares/automovel.html` | o ramo mais procurado |

As páginas de ramo deixaram de ter imagem. Em vez dela, cada uma abre com o
símbolo do seu seguro no cabeçalho — dá identidade sem encher a página.

### 🟢 Montra da Alameda — resolvida

A ilustração antiga mostrava a fachada com a insígnia **Allianz** e foi
substituída. A nova imagem mostra a montra do n.º 97 com a insígnia actual
da Generali Tranquilidade, e foi retocada a partir de uma captura de rua —
sem os elementos de interface do Street View.

> ⚠️ Mesmo retocada, convém confirmar com o proprietário se prefere uma
> fotografia própria da fachada. Uma foto tirada no local, num dia de sol,
> não levanta nenhuma dúvida de origem.

**Também útil, se houver:** fotografias reais da equipa. Fotografias de
pessoas verdadeiras são dos elementos que mais aumentam a confiança num site
de serviços locais — mais até do que boas ilustrações.

---

## 🟢 6 · Logótipo — resolvido

O logótipo fornecido está integrado, recortado a partir do original:

- `assets/img/marca-ajt.png` — símbolo no cabeçalho e no rodapé
- `assets/img/favicon.png` — ícone do separador
- `assets/img/logo-ajt.jpg` — lockup completo, usado nas partilhas em redes sociais

**Melhoria futura:** se existir o ficheiro vetorial original (`.ai`, `.eps`
ou `.svg`), substituir os PNG por SVG. Fica nítido em qualquer resolução e
pesa menos.

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
- [ ] **O horário do balcão Generali está contraditório na fonte.** A página
      do agente indica "Segunda a sexta: 09:00–13:00 e 14:00–18:00", mas logo
      abaixo tem uma nota a dizer "Encerra para almoço das 13:00 às 15:00".
      O site usa a versão das 14:00 — confirmar qual está certa e corrigir a
      página do agente na Generali, se for o caso.
- [ ] Ao sábado abre? Uma fonte indicava sábados de manhã, outra encerrado.
      O site diz **encerrado ao fim-de-semana**.
- [ ] **A Generali Tranquilidade é agora a única companhia representada?**
      O site foi reescrito nesse pressuposto, depois de a relação com a
      Allianz ter terminado. Se houver outra, é preciso rever os textos.
- [ ] **A Generali cobre saúde e saúde dental?** As páginas
      `particulares/saude.html` e `empresas/saude-grupo.html` existem desde
      o tempo em que esses ramos vinham da Allianz. Se a Generali não os
      tiver, essas duas páginas prometem o que não se pode entregar.
- [ ] O telemóvel 964 036 313 é para publicar?
- [ ] A AJT quer aparecer também para Montijo, Samouco e São Francisco?
      (Já está assim nos dados estruturados.)

---

## Fontes dos dados já confirmados

Estes dados foram verificados em fontes públicas e **não** precisam de ser
inventados:

| Dado | Fonte |
|---|---|
| Morada, telefone, email e horário do balcão da Alameda | confirmar directamente com a AJT — a fonte anterior era a página de mediador da Allianz, que deixou de se aplicar |
| Morada, telefones e email do balcão Generali Tranquilidade | [agentes.tranquilidade.pt](https://agentes.tranquilidade.pt/alcochete/largo-da-revolucao--1910--loja-1) |
| NIF 505991888 e data de constituição (30/01/2002) | [Iberinform](https://www.iberinform.pt/empresa/21355973/a-j-t-sociedade-de-mediacao-de-seguros-lda) · [Racius](https://www.racius.com/a-j-t-sociedade-de-mediacao-de-seguros-lda/) |
| Ramos representados — auto, casa, acidentes pessoais, bicicleta, moto e três linhas de vida | [agentes.tranquilidade.pt](https://agentes.tranquilidade.pt/alcochete/largo-da-revolucao--1910--loja-1) |

> Nota: o endereço da página do agente Generali contém "largo-da-revolucao--1910--loja-1",
> mas o corpo da página indica **Rua Carlos Manuel Rodrigues Francisco, 229**.
> É essa a morada usada no site. O endereço da página parece ser um resto de
> uma localização anterior — vale a pena pedir à Generali que o corrija.
