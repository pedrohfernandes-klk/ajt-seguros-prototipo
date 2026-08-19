# Ilustrações — o que está a falhar

Revisão de 19 de Agosto de 2026, feita imagem a imagem. Por ordem de
gravidade. O ponto 1 é o que mais custa ao site; o resto são casos
isolados.

---

## 🔴 1 · Há dois estilos de ilustração no site, e não combinam

Este é o problema grande, e nenhum ajuste de posição o resolve.

**Estilo A — banda desenhada.** As tiras de vinhetas: automóvel,
motociclo, água, saúde, acidentes, responsabilidade civil familiar,
acidentes de trabalho, frotas, multirriscos, RC empresas, saúde de grupo,
vida, acidentes pessoais de empresa.

> Linha de contorno preta fechada, cor chapada sem gradiente, sombra
> simples, enquadramento ao alto. É o que o site inteiro foi construído
> a acompanhar — as molduras de tinta, a retícula de meios-tons, o campo
> Ben-Day, o cartucho amarelo. Tudo isso é linguagem de prancha.

**Estilo B — pintura realista.** As bandas `editorial-*` e a série
`vinheta-vidaemp-*`.

> Sem contorno, rendering suave, paleta dessaturada, luz fotográfica,
> profundidade de campo. São bonitas — e são de outro sítio.

**Porque é que isto se nota tanto:** as duas aparecem na mesma página,
com poucos centímetros entre elas, e dentro da mesma moldura de tinta
grossa. A moldura funciona à volta de uma vinheta de BD; à volta de uma
pintura realista parece um erro de montagem.

### São 22 imagens, não 14

O número que dei antes estava errado. Contadas uma a uma, as imagens de
estilo B **actualmente em uso** são estas:

| grupo | quantas | quais |
|---|---|---|
| bandas nas páginas de produto | **13** | `acidentes` `actrab` `apemp` `auto` `frotas` `moto` `multirriscos` `rcemp` `rcfam` `saude` `saudegrupo` `vida` `vidaemp` |
| bandas nas páginas gerais | **6** | `particulares` `empresas` `perguntas` `simular` `atendimento` `equipa` |
| vinhetas da tira de Vida Empresas | **3** | `vinheta-vidaemp-1` a `-3` |
| | **22** | |

As seis bandas das páginas gerais são as que faltavam à minha conta:
estão nos índices de Particulares e de Empresas, nas Perguntas, no
Simulador e duas no Sobre nós. São as páginas por onde se entra.

Existe ainda `vinheta-vidaemp-4`, que **não precisa de ser redesenhada**:
saiu do site com as outras quartas vinhetas e o ficheiro fica no
repositório por precaução.

**O que peço:** redesenhar as 22 na linguagem do estilo A. Se for muito
de uma vez, esta é a ordem:

1. `vinheta-vidaemp-1` a `-3` — são a tira inteira de uma página, sem
   nenhuma vinheta de BD ao lado. O contraste é imediato e não tem
   disfarce;
2. `editorial-particulares` e `editorial-empresas` — estão nos índices,
   que são as páginas mais vistas depois da inicial;
3. as restantes quatro das páginas gerais — `perguntas`, `simular`,
   `atendimento`, `equipa`;
4. as treze das páginas de produto, que podem ir saindo ao ritmo que
   der: cada uma vive sozinha na sua página.

---

## 🔴 2 · Um erro de desenho: a bola dentro de uma vitrina fechada a cadeado

**`vinheta-rcfam-3`** — Responsabilidade Civil Família, terceira vinheta.

A história é: o rapaz remata mal, parte o vidro do vizinho, o seguro
paga. Na terceira vinheta, enquanto o vidraceiro instala o vidro novo, a
bola aparece **fechada dentro de uma caixa de acrílico transparente, com
um cadeado dourado**, pousada no passeio.

Não é uma piada, não é um objecto que exista, e não se percebe o que
está lá a fazer. Lê-se como um erro de geração.

**O que peço:** mesma cena, mesma composição, mas a bola simplesmente
pousada no chão ao lado do rapaz, ou debaixo do braço dele.

---

## 🔴 3 · A vinheta das meias — retirada do site, à espera de substituta

**`vinheta-saude-3`** — Saúde, terceira vinheta.

A história é: dores de cabeça ao fim do dia → consulta e exame de vista →
**?** → óculos novos numa esplanada.

A terceira mostrava a mulher a descobrir, debaixo da manta do sofá, **uma
pilha enorme de meias coloridas que o cão tinha escondido**. A intenção
percebe-se — agora vê o que antes lhe escapava — mas não se lê assim: é
uma piada de outro registo, ocupava a vinheta central de uma história
sobre saúde, e uma montanha de meias não diz seguro a ninguém.

**Foi retirada do site.** A tira ficou com três painéis e a história
continua a fechar: dores de cabeça → consulta e exame → óculos novos. Não
fica nada por explicar, e é melhor uma tira de três do que uma de quatro
com um quadrado a mais.

**O que peço:** uma vinheta nova para o lugar do meio, com a mesma
personagem e o mesmo cão. Duas sugestões:

- a mulher à saída da clínica, com a receita na mão e a marcação
  seguinte já agendada;
- a mulher a escolher armações ao balcão da ótica, com a médica ao lado.

Qualquer das duas mantém a continuidade da personagem e diz o que a
página vende: acesso rápido a consulta e exame.

## 🟡 4 · Coisas menores, para quando houver oportunidade

**`vinheta-actrab-1`** — o homem está de pé numa cadeira de rodízios com
um escadote encostado à parede a um metro dele. A leitura é correcta
(fez asneira tendo alternativa), mas o escadote está tão em foco e tão
perto que parece que alguém o pôs ali de propósito para a fotografia. Se
for redesenhada, afastá-lo ou pô-lo dobrado a um canto torna a cena mais
natural.

**Fundos de estaleiro e porto** aparecem em várias `vidaemp` e
`editorial-*`. Alcochete tem estuário, salinas e a ponte Vasco da Gama —
vale a pena que o horizonte seja reconhecível, já que o site inteiro
insiste em ser daqui.

---

## O que já foi tratado deste lado

Não precisa de desenho novo:

- **as quartas vinhetas saíram todas.** Eram doze, e eram sempre o
  desfecho da mesma história: a condutora que retoma a viagem, a jogadora
  que volta ao campo, a frota que sai revista. Um desfecho não é um tempo
  da narrativa — percebe-se sem ser preciso mostrar, e o quarto quadrado
  só diluía os três que interessam. As tiras voltam a ser de três;
- as **legendas** desceram de 41 para 26 caracteres de média. Uma legenda
  de vinheta é um cartucho de três a cinco palavras, não uma nota de
  rodapé;
- os **tamanhos declarados** estavam errados em dezanove páginas: o
  browser descarregava sempre o ficheiro grande;
- a **banda editorial** desceu de 800 para 560px, e passou a assentar em
  faixa de tom em vez de flutuar sobre branco.

---

## Para as imagens novas: o que o site precisa

O formato e a convenção de nomes estão no `BRIEFING-IMAGENS.md`. Duas
notas técnicas que valem para tudo o que vier:

**Respiração.** As vinhetas são ampliadas 5,5% dentro da moldura, para o
efeito de janela que segue o ponteiro. O motivo principal precisa de 8%
de folga à volta, ou encosta à linha de tinta.

**Contorno.** A moldura do site é uma linha de 2,5px de tinta quase
preta. Uma ilustração sem contorno próprio fica a competir com ela.
Desenhar com linha fechada, como nas tiras que já existem.
