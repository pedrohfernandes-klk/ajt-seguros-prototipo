# Briefing de imagem — o que falta desenhar

Estado a 19 de Agosto de 2026. O site tem **103 ficheiros de imagem** e
usa-os todos. As páginas de ramo estão completas: três vinhetas de
história, uma vinheta de acompanhamento e uma banda editorial, cada uma.

O que falta é o outro lado do site — as páginas por onde as pessoas
entram e decidem. Estão todas sem uma única imagem.

---

## Os três formatos que já existem

Qualquer imagem nova tem de caber num destes. Não inventar um quarto.

| formato | proporção | ficheiros | onde vive |
|---|---|---|---|
| **vinheta** | 3:5 ao alto | `-300.webp` e `-600.webp` | tiras de três, e acompanhamento de secção |
| **banda editorial** | 16:9 | `-800.webp` e `-1400.webp` | uma faixa de 560px, a meio da página |
| **fotografia de lugar** | 16:9 | `-800.jpg` e `-1400.jpg` | cabeçalhos e contactos |

Estilo: o mesmo das existentes — ilustração de banda desenhada, linha
fechada, cor chapada, luz do estuário. Sem gradientes, sem 3D
fotorrealista, sem stock.

**Enquadramento ao alto:** as vinhetas são recortadas a 3:5 e ampliadas
5,5% dentro da moldura, que se desloca com o ponteiro. Deixar respiração
de 8% à volta do motivo principal ou ele encosta à linha de tinta.

---

## Prioridade 1 · As páginas de entrada, que não têm nada

Estas quatro são por onde se entra e por onde se decide. Estão nuas.

### 1. `particulares/` — índice de seguros para particulares
**Uma banda editorial, 16:9.**
Uma família de três gerações num domingo em Alcochete: o carro à porta,
a casa atrás, um dos filhos a sair com a mochila do desporto. Tem de se
ver, numa imagem só, o carro, a casa e as pessoas — que são as três
coisas que a página vende.

### 2. `empresas/` — índice de seguros para empresas
**Uma banda editorial, 16:9.**
Uma rua comercial de Alcochete a abrir de manhã: um café a pôr as
cadeiras fora, uma carrinha de entregas a descarregar, um estaleiro
pequeno ao fundo. Negócios reais de vila, não escritórios de vidro.

### 3. `perguntas.html` — as perguntas frequentes
**Seis vinhetas ao alto, 3:5** — uma por tema, para abrir cada bloco.
São seis situações de dúvida, não de sinistro:
1. *O que muda com um mediador* — duas pessoas a comparar duas propostas em papel, à mesa.
2. *Antes de assinar* — o dedo a seguir uma linha das condições, com os óculos pousados.
3. *Quando corre mal* — o telemóvel na mão a fotografar um estrago, à chuva.
4. *Casa, carro e mota* — a chave de casa e a chave do carro no mesmo porta-chaves.
5. *Vida, saúde e família* — a sala de espera de uma clínica, vista de fora pela montra.
6. *Para quem tem negócio* — o livro de horas e a folha de férias em cima do balcão do café.

### 4. `simular.html` — simuladores
**Uma vinheta ao alto, 3:5.**
Alguém a fazer uma simulação no telemóvel na esplanada, com a AJT do
outro lado da rua, fora de foco. É a ideia da página: simula-se sozinho,
mas há alguém por perto.

---

## Prioridade 2 · Onde falta uma peça

### 5. `particulares/habitacao.html`
É a única página de ramo **sem banda editorial**. Precisa de uma, 16:9:
uma casa de Alcochete ao fim da tarde com as persianas a fechar e a luz
da cozinha acesa — a casa habitada, não a casa em obras.

### 6. `contactos.html` — os dois escritórios
As duas fotografias de montra que existem são **de dia, chapadas e sem
gente**. Duas novas, 16:9, com a porta aberta e alguém a entrar ou a
sair. Não é decoração: quem procura a porta precisa de a reconhecer.

### 7. `index.html` — a página inicial
O carrossel tem quatro imagens e três são de paisagem. Falta **uma de
trabalho**: a mediadora ao telefone com um processo aberto à frente, ao
fim do dia, com a luz baixa. É o que a AJT faz, e não aparece na abertura.

---

## Prioridade 3 · Os ramos que ainda não têm página

Existem no catálogo mas ainda sem página própria. Quando as houver, cada
uma leva o conjunto completo — três vinhetas, uma de acompanhamento, uma
banda. **Não desenhar já.** Fica registado para planeamento:

Clássicos · Empregados domésticos · Protecção de rendas · Saúde +55 ·
Saúde dentária · Animais de companhia · Viagem · Bicicleta e trotinete ·
Embarcações · Caça · Alojamento local · Condomínio · Cyber risks

---

## O que não é preciso

- **Ícones.** Os símbolos de cabeçalho são desenhados em código.
- **Fundos e texturas.** O tramado de meios-tons é gerado em CSS.
- **Versões em tamanhos intermédios.** Dois tamanhos por imagem chegam;
  o site escolhe.
- **Retratos da equipa**, para já. Enquanto não houver autorização
  escrita de todas as pessoas, não entram.

---

## Entrega

WebP para ilustração, JPEG para fotografia. Dois tamanhos por imagem,
com o sufixo no nome: `nome-300.webp` e `nome-600.webp` para vinhetas,
`nome-800.webp` e `nome-1400.webp` para bandas.

Convenção de nomes já em uso, a manter:
`vinheta-<ramo>-<n>` · `editorial-<ramo>` · `sin-<situação>`

Cada imagem precisa de **uma frase a descrever o que se vê** — vai para
o atributo `alt`, que é o que um leitor de ecrã lê e o que aparece se a
imagem não carregar. Descrever a cena, não o conceito: «a condutora ao
telefone junto ao carro parado na berma» e não «assistência em viagem».
