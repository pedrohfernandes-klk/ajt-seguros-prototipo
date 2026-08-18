# -*- coding: utf-8 -*-
"""Gera perguntas.html — as perguntas que nos fazem mesmo.

Cada pergunta abre com tres canais ja preenchidos: o WhatsApp com a
pergunta escrita, o email com a pergunta no assunto, e o telefone. Quem
tem a duvida nao tem de a reescrever.
"""
import io, sys, os, re
from urllib.parse import quote

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
os.chdir(r"C:\Users\Utilizador\Desktop\DESIGN\ajt-seguros-prototipo")

WA_ALAMEDA = "351900000000"      # 🔴 por confirmar — ver DADOS-A-CONFIRMAR.md
WA_CARLOS = "351964036313"
TEL = "+351212348047"
MAIL = "geral@ajtseguros.pt"

T = [
("O que muda com um mediador", "ceu", [
 ("Pago mais por contratar através de um mediador?",
  "Não. O prémio é o da companhia — a nossa remuneração vem dela, não de si. "
  "O que muda é ter alguém que lê as condições consigo antes de assinar e que "
  "trata do processo no dia do sinistro."),
 ("Vocês trabalham com quantas companhias?",
  "Representamos a Generali Tranquilidade nos dois escritórios. Quando o caso pede "
  "uma solução que ela não cobre, dizemos isso com franqueza em vez de forçar "
  "o que temos."),
 ("Já tenho seguros noutro sítio. Vale a pena mudar?",
  "Só se compensar. Traga as apólices: comparamos, e se estiver bem servido "
  "dizemos isso e ficamos por ali. Perde-se uma venda, ganha-se um cliente."),
 ("Tenho de marcar hora?",
  "Não. Entra-se nos dois escritórios sem marcação, de segunda a sexta, das 09:00 "
  "às 13:00 e das 14:00 às 18:00. Se vier tratar de um assunto concreto, traga "
  "a apólice — poupa uma segunda viagem."),
  ("Posso tratar de tudo por WhatsApp?",
  "De quase tudo: dúvidas, envio de documentos, estado de um processo. A "
  "subscrição de um contrato tem passos que exigem assinatura, e esses "
  "fazem-se no escritório ou pela via digital da companhia."),
]),

("Antes de assinar", "sol", [
 ("O que é exatamente a franquia?",
  "É a parte do prejuízo que fica a seu cargo em cada sinistro. Com 250 euros "
  "de franquia e um arranjo de 900, a seguradora paga 650. Franquia mais alta "
  "baixa o prémio anual e sobe o que paga no dia do acidente."),
 ("E a carência?",
  "É o tempo que espera, depois de assinar, até uma cobertura funcionar. Varia "
  "com a solução e com a cobertura. Não é letra pequena maldosa — é como o "
  "produto funciona. Mas tem de o saber antes, não depois."),
 ("Porque é que duas apólices com o mesmo preço são tão diferentes?",
  "Porque o preço não diz qual é a franquia, se a assistência começa à porta "
  "de casa ou só a 25 km, nem quantos dias de viatura de substituição tem. É "
  "aí que se separam."),
 ("Tenho mesmo de declarar tudo?",
  "Sim, e é do seu interesse. Uma omissão descoberta no momento do sinistro "
  "pode anular o contrato inteiro. Mais vale declarar e negociar a aceitação "
  "do que ter uma apólice que falha quando é precisa."),
 ("O que é a rede convencionada?",
  "O conjunto de hospitais, clínicas e médicos com acordo com a seguradora, "
  "onde paga só uma pequena parte no ato. Fora da rede paga tudo e pede "
  "reembolso, em regra a uma percentagem inferior."),
 ("Quanto tempo demora a ter uma proposta?",
  "Nos ramos com simulador, minutos. Nos que se cotam caso a caso — acidentes "
  "de trabalho, frotas, multirriscos de empresa, responsabilidade civil — "
  "damos resposta em 24 horas úteis."),
]),

("Quando corre mal", "carmim", [
 ("Tive um acidente. O que faço primeiro?",
  "Se houver feridos, 112 antes de tudo. Depois: segurança no local, "
  "fotografias, identificações, declaração amigável. E ligue-nos assim que "
  "puder — orientamos a partir daí."),
 ("Quanto tempo tenho para participar?",
  "Em regra oito dias. Nos acidentes de trabalho, 24 horas. Ligue mesmo sem "
  "ter os documentos todos reunidos: o prazo conta a partir do dia do "
  "acidente, não do dia em que tem os papéis."),
 ("Posso mandar reparar antes da peritagem?",
  "Só o estritamente necessário para evitar que os danos piorem. Se mandar "
  "arranjar antes de o perito ver, fica sem forma de provar o prejuízo."),
 ("O outro condutor recusou-se a assinar a declaração amigável.",
  "Preencha a sua parte e escreva na descrição que ele recusou. Recolha "
  "matrícula, marca, modelo e contactos de testemunhas, e chame as "
  "autoridades se puder. Depois ligue-nos."),
 ("Participar um sinistro faz o meu seguro subir?",
  "Nem sempre. Depende da cobertura acionada e de quem foi o responsável. Se "
  "não teve culpa e a outra companhia assume, em regra não penaliza. Uma "
  "quebra de vidros isolada também não costuma penalizar."),
 ("A companhia recusou o meu sinistro. E agora?",
  "Primeiro percebemos o fundamento, que tem de lhe ser comunicado por "
  "escrito. Muitas recusas são informação em falta. Se a recusa se mantiver e "
  "não a acharmos justa, apoiamos a reclamação junto da companhia, da ASF ou "
  "do CIMPAS."),
]),

("Casa, carro e mota", "ceu", [
 ("Por quanto devo segurar a casa?",
  "Pelo custo de reconstrução, não pelo valor de mercado nem pelo que pagou "
  "por ela. Segurar a menos — infrasseguro — faz a seguradora pagar só na "
  "proporção, mesmo em prejuízos pequenos."),
 ("Sou inquilino. Preciso de seguro?",
  "O edifício é do senhorio, mas o recheio é seu e a apólice dele não o "
  "cobre. E se causar danos ao vizinho, quem responde é o inquilino. Um "
  "multirriscos de inquilino custa pouco e resolve os dois casos."),
 ("O banco pode obrigar-me a fazer os seguros com ele?",
  "Não. Pode exigir que exista seguro com certas coberturas, mas não pode "
  "impor a seguradora dele nem agravar o crédito por escolher outra com "
  "coberturas equivalentes."),
 ("Vale a pena ter danos próprios num carro antigo?",
  "Depende do valor e da franquia. Num carro de baixo valor comercial, o "
  "prémio pode aproximar-se do que receberia numa perda total. Fazemos a "
  "conta consigo antes de recomendar."),
 ("O seguro da mota cobre o passageiro?",
  "A responsabilidade civil obrigatória cobre os danos ao passageiro, que "
  "conta como terceiro. Não cobre as lesões do próprio condutor — para isso "
  "existe a proteção do condutor, que numa mota é a cobertura que mais "
  "importa."),
 ("Levo o meu bónus quando mudo de companhia?",
  "Leva. O histórico acompanha-o. Antes de mudar pedimos o extrato de "
  "sinistralidade, para que a nova seguradora reconheça o bónus a que tem "
  "direito."),
]),

("Vida, saúde e a família", "sol", [
 ("Posso tirar o seguro de vida do banco?",
  "Pode, e a qualquer momento. O Decreto-Lei n.º 222/2009 impede o banco de o "
  "obrigar a contratar na seguradora dele e anula as cláusulas que penalizem "
  "a escolha de outra com coberturas equivalentes. A conta tem é de ser feita inteira: prémio novo, prémio antigo e efeito no spread, porque a bonificação associada pode deixar de se aplicar."),
  ("Que capital de vida devo contratar?",
  "No crédito, no mínimo o capital em dívida — é o que a lei determina. Na "
  "proteção familiar, uma regra prática: some as despesas fixas de um ano e "
  "multiplique pelos anos que quer garantir, descontando poupanças."),
 ("Tenho uma doença. Posso fazer seguro de saúde?",
  "Pode candidatar-se. A companhia pode aceitar com exclusão dessa patologia, "
  "aceitar com agravamento, ou recusar. Declarar é a única via segura."),
 ("O seguro de saúde substitui o Serviço Nacional de Saúde?",
  "Não. Complementa. Continua a ter direito ao SNS; o seguro dá acesso mais "
  "rápido, escolha de médico e conforto, sobretudo em consultas de "
  "especialidade e exames."),
 ("O seguro do clube do meu filho não chega?",
  "O seguro desportivo obrigatório tem capitais mínimos definidos por lei e "
  "cobre sobretudo treinos e competições. A caminho do treino, na escola ou "
  "em casa, não responde."),
]),

("Para quem tem negócio", "carmim", [
 ("Tenho um só funcionário. Preciso mesmo de acidentes de trabalho?",
  "Precisa. A obrigação existe a partir do primeiro trabalhador, a tempo "
  "inteiro ou parcial, com contrato sem termo ou a prazo. E os trabalhadores "
  "independentes têm de o ter relativamente a si próprios."),
 ("O que acontece se declarar a massa salarial a menos?",
  "Parece poupança até haver um sinistro: a indemnização ao trabalhador é "
  "reduzida na mesma proporção, e a diferença sai da empresa."),
 ("A responsabilidade civil é obrigatória na minha atividade?",
  "Depende. É obrigatória em setores definidos por lei — construção, "
  "segurança privada, clínicas, advocacia, animação turística, entre outros. "
  "A lista completa está na ASF e verificamo-la consigo."),
 ("Já tenho acidentes de trabalho. Isso não chega?",
  "São coberturas distintas: os acidentes de trabalho respondem por danos aos "
  "seus trabalhadores; a responsabilidade civil responde por danos a "
  "terceiros. Uma não substitui a outra."),
 ("O que são perdas de exploração?",
  "É a cobertura que compensa o lucro que a empresa deixa de gerar enquanto "
  "está parada após um sinistro coberto, e os encargos fixos que continua a "
  "pagar: rendas, salários, prestações."),
]),
]

ICO_WA = ('<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">'
          '<path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.6 0-3.2-.4-4.5-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5v-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4 0-.6.3a2.6 2.6 0 0 0-.8 1.9c0 1.1.8 2.2.9 2.4a9.2 9.2 0 0 0 3.6 3.2c1.3.5 1.8.6 2.4.5.4 0 1.2-.5 1.4-1 .2-.5.2-.9.1-1l-.3-.1Z"/></svg>')
ICO_TEL = ('<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">'
           '<path d="M17.5 14.2v2.3a1.5 1.5 0 0 1-1.6 1.5A14.8 14.8 0 0 1 2 3.6 1.5 1.5 0 0 1 3.5 2h2.3a1.5 1.5 0 0 1 1.5 1.3c.1.9.3 1.7.6 2.5a1.5 1.5 0 0 1-.3 1.6L6.6 8.4a12 12 0 0 0 5 5l1-1a1.5 1.5 0 0 1 1.6-.3c.8.3 1.6.5 2.5.6a1.5 1.5 0 0 1 1.3 1.5Z"/></svg>')
ICO_MAIL = ('<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">'
            '<path d="M2.5 5.5h15v10h-15z"/><path d="m2.5 6 7.5 5 7.5-5"/></svg>')


def canais(pergunta, n):
    """Os tres canais, ja preenchidos com a pergunta de quem clica."""
    msg = quote("Olá. Vi no site a pergunta «%s» e queria falar sobre isso." % pergunta)
    ass = quote("Dúvida: %s" % pergunta)
    return (
      '\n          <div class="resposta-canais">\n'
      '            <span>Falar sobre esta:</span>\n'
      '            <a class="rc rc-wa" href="https://wa.me/%s?text=%s" target="_blank" rel="noopener">%s WhatsApp</a>\n'
      '            <a class="rc rc-tel" href="tel:%s">%s Telefone</a>\n'
      '            <a class="rc rc-mail" href="mailto:%s?subject=%s">%s Email</a>\n'
      '          </div>\n' % (WA_CARLOS, msg, ICO_WA, TEL, ICO_TEL, MAIL, ass, ICO_MAIL))


def escapa(t):
    return t.replace("&", "&amp;").replace("<", "&lt;")


blocos, faq_ld, n = [], [], 0
for titulo, cor, perguntas in T:
    itens = []
    for p, r in perguntas:
        n += 1
        faq_ld.append('    {\n      "@type": "Question",\n      "name": %s,\n'
                      '      "acceptedAnswer": { "@type": "Answer", "text": %s }\n    }'
                      % (__import__("json").dumps(p, ensure_ascii=False),
                         __import__("json").dumps(re.sub(r"\s+", " ", r), ensure_ascii=False)))
        itens.append(
          '        <details class="pergunta">\n'
          '          <summary><span class="pergunta-n">%02d</span>%s</summary>\n'
          '          <div class="pergunta-corpo">\n            <p>%s</p>%s          </div>\n'
          '        </details>\n' % (n, escapa(p), escapa(re.sub(r"\s+", " ", r)),
                                    canais(p, n)))
    blocos.append(
      '      <section class="tema tema-%s entra" aria-labelledby="tema-%d">\n'
      '        <h2 class="tema-titulo" id="tema-%d">%s</h2>\n%s      </section>\n'
      % (cor, len(blocos) + 1, len(blocos) + 1, titulo, "".join(itens)))

print("%d perguntas em %d temas" % (n, len(T)))

CABECA = open("sinistros.html", encoding="utf-8").read()
cabecalho = CABECA[CABECA.find("<body>"):CABECA.find("<main")]
rodape = CABECA[CABECA.find("</main>") + len("</main>"):]
# o rodape traz o marcador de pagina activa da pagina anterior
rodape = rodape.replace(' class="activo"', "")
cabecalho = cabecalho.replace(' class="activo"', "")

pagina = '''<!doctype html>
<html lang="pt-PT">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#10202c">

<title>Perguntas frequentes — AJT Seguros</title>
<meta name="description" content="As perguntas que nos fazem mais vezes, respondidas sem segurês. Franquias, carências, prazos de sinistro, seguro de vida do banco, acidentes de trabalho. Fale connosco por WhatsApp, telefone ou email.">

<link rel="canonical" href="https://www.ajtseguros.pt/perguntas.html">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_PT">
<meta property="og:site_name" content="AJT Seguros">
<meta property="og:title" content="Perguntas frequentes — AJT Seguros">
<meta property="og:description" content="As perguntas que nos fazem mais vezes, respondidas sem segurês.">
<meta property="og:url" content="https://www.ajtseguros.pt/perguntas.html">
<meta property="og:image" content="https://www.ajtseguros.pt/assets/img/logo-ajt.jpg">
<meta name="twitter:card" content="summary_large_image">

<link rel="icon" href="assets/img/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400..700;1,6..72,400..700&family=Instrument+Sans:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/style.css">

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
__FAQ__
  ]
}
</script>
</head>
__CABECALHO__<main id="conteudo">

  <section class="hero-interior claro tramado">
    <div class="envelope">
      <nav class="migalhas" aria-label="Percurso">
        <a href="index.html">Início</a>
        <svg viewBox="0 0 8 12" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m1.5 1 5 5-5 5"/></svg>
        <span aria-current="page">Perguntas</span>
      </nav>
      <span class="hero-simbolo" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M9.1 9a3 3 0 1 1 4.4 3.2c-.9.5-1.5 1.2-1.5 2.1v.4"/><path d="M12 18h0"/><circle cx="12" cy="12" r="9.2"/></svg></span>
      <h1 class="titulo titulo-xl">As perguntas<br><em>mais frequentes.</em></h1>
      <p class="lede">Não foram inventadas para encher a página: são as que nos fazem há mais de vinte anos. As respostas são as mesmas que damos ao telefone.</p>

      <div class="canais" style="margin-top:clamp(28px,3vw,36px)">
        <a class="canal canal-whatsapp" href="https://wa.me/__WA_CARLOS__?text=__WA_MSG__" target="_blank" rel="noopener">__ICO_WA__<span><b>WhatsApp</b><span>Resposta no mesmo dia útil</span></span></a>
        <a class="canal canal-telefone" href="tel:__TEL__">__ICO_TEL__<span><b>212 348 047</b><span>Segunda a sexta, 9h–18h</span></span></a>
        <a class="canal canal-email" href="mailto:__MAIL__">__ICO_MAIL__<span><b>Escrever-nos</b><span>__MAIL__</span></span></a>
      </div>
    </div>
  </section>

  <section class="secao">
    <div class="envelope prancha">
      <p class="nota" style="max-width:60ch;margin-bottom:clamp(30px,4vw,44px)">Cada resposta abre com os três canais já preenchidos: o WhatsApp leva a pergunta escrita, o email leva-a no assunto. Não tem de a repetir.</p>
__BLOCOS__    </div>
  </section>

  <section class="secao secao-tinta claro">
    <div class="envelope" style="text-align:center">
      <h2 class="titulo titulo-l">A sua não estava<br><em>aqui?</em></h2>
      <p class="lede" style="margin:24px auto 34px;max-width:52ch">Esta lista tem as mais frequentes, e vai crescendo. A que faltar responde-se ao telefone em dois minutos.</p>
      <div class="accoes" style="justify-content:center">
        <a class="botao botao-primario" href="tel:__TEL__" data-estrondo="TRIM!">__ICO_TEL__ Ligar 212 348 047</a>
        <a class="botao botao-secundario" href="https://wa.me/__WA_CARLOS__" target="_blank" rel="noopener">Falar por WhatsApp</a>
      </div>
    </div>
  </section>

</main>__RODAPE__'''

pagina = (pagina
  .replace("__FAQ__", ",\n".join(faq_ld))
  .replace("__CABECALHO__", cabecalho)
  .replace("__BLOCOS__", "".join(blocos))
  .replace("__RODAPE__", rodape)
  .replace("__WA_CARLOS__", WA_CARLOS)
  .replace("__WA_MSG__", quote("Olá. Tenho uma dúvida sobre seguros."))
  .replace("__TEL__", TEL)
  .replace("__MAIL__", MAIL)
  .replace("__ICO_WA__", ICO_WA)
  .replace("__ICO_TEL__", ICO_TEL)
  .replace("__ICO_MAIL__", ICO_MAIL))

open("perguntas.html", "w", encoding="utf-8").write(pagina)
print("perguntas.html escrito — %d bytes" % len(pagina))
