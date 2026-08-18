# -*- coding: utf-8 -*-
"""Revisao do texto do site: o que a maquina consegue mesmo verificar.

    python ferramentas/rever-texto.py            lista os avisos
    python ferramentas/rever-texto.py --frases   escreve FRASES-A-LER.md

Ha duas coisas diferentes aqui dentro.

A primeira sao regras: ortografia do Acordo de 1990, registo europeu,
burocratES, e uma lista negra de expressoes ja reprovadas. Isto e
verificavel e corre sozinho.

A segunda e a lista de frases curtas -- titulos, etiquetas, botoes,
legendas. Nenhum verificador percebe que "connosco por tras" soa mal:
isso e conotacao, e precisa de ouvido. O que a ferramenta faz e
reduzir o problema ao seu tamanho real, juntando num unico ficheiro
todas as frases onde esse tipo de erro pode acontecer -- que sao
poucas, e leem-se de uma assentada. O texto corrido nao entra: nunca
e ai que o erro aparece.
"""
import re, os, sys, glob, io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(RAIZ)

# ── 1 · lista negra ────────────────────────────────────────────────────────
# Cada linha e uma expressao que ja foi reprovada. Uma vez aqui, nao volta.
REPROVADAS = [
    ("por trás",        "duplo sentido; e soa a subalterno"),
    ("você",            "registo brasileiro — o site trata por «o senhor» implícito"),
    ("a gente",         "coloquial de mais para um mediador"),
    ("ao invés",        "brasileirismo; em pt-PT diz-se «em vez»"),
    ("por forma a",     "burocratês; «para»"),
    ("no sentido de",   "burocratês; diga o verbo"),
    ("em termos de",    "muleta sem conteúdo"),
    ("fazer com que",   "perífrase; use o verbo directo"),
    ("outrossim",       "arcaísmo"),
    ("não obstante",    "arcaísmo para este registo"),
    ("de modo a que",   "burocratês"),
    ("caro cliente",    "tratamento de circular"),
    ("solução à medida", "chavão comercial"),
    ("soluções à medida", "chavão comercial"),
    ("parceiro de confiança", "chavão comercial"),
    ("tranquilidade que merece", "chavão comercial"),
    ("na vanguarda",    "chavão comercial"),
    ("tranquilidade real", "chavão — e trocadilho involuntário com a companhia"),
    ("à sua medida",    "chavão comercial"),
    ("um mundo para",   "slogan abstracto; diga antes o que faz"),
    ("gama completa",   "chavão comercial"),
    ("lá dentro",       "sítio nenhum — numa apólice chamam-se coberturas"),
    ("pior comprado",   "julga a compra em vez do produto; «mais mal escolhido»"),
    ("mal comprado",    "julga a compra em vez do produto"),
    ("bem comprado",    "julga a compra em vez do produto"),
    ("na vila",         "registo de aldeia — Alcochete tem nome"),
    ("da vila",         "registo de aldeia — Alcochete tem nome"),
    ("ao balcão",       "soa a guichet e a senha; num mediador diz-se «escritório»"),
    ("vir ter connosco", "registo de aldeia"),
    ("cá estamos",      "registo de aldeia"),
    ("o dia mau",       "eufemismo folclórico; diga o que acontece"),
    # ── promessas que a AJT nao controla ────────────────────────────────
    ("24 horas úteis",  "prazo de resposta prometido — não depende só da AJT"),
    ("no mesmo dia útil", "prazo de resposta prometido"),
    ("na manhã seguinte", "prazo de resposta prometido"),
    ("do princípio ao fim", "promete a mesma pessoa; ninguém controla férias e baixas"),
    ("até ao fim",      "promete acompanhamento que pode não se cumprir"),
    ("garantimos",      "num mediador, garantir é da companhia"),
    ("avisamos sempre", "«sempre» é uma palavra que uma semana má desmente"),
]
EXCEPCOES = {"a gente": ["toda a gente", "muita gente", "pouca gente",
                          "tanta gente", "que gente"],
             # ler ate ao fim nao e prometer acompanhar ate ao fim
             "até ao fim": ["leu até ao fim", "ler até ao fim", "lê até ao fim"]}

# ── 2 · ortografia ────────────────────────────────────────────────────────
# Palavras que o Acordo de 1990 mudou e que reaparecem por distraccao.
PRE_ACORDO = [
    "actividade", "activo", "actual", "acção", "accionar", "afecta",
    "correcção", "directo", "directa", "direcção", "efectiv", "electr",
    "éctric", "exact", "excepção", "excepto", "extracto", "factor",
    "factura", "fractura", "objectiv", "objecto", "projecto", "protecção",
    "respectiv", "sector", "tecto", "trajecto", "carácter", "óptim",
    "aspecto", "baptis", "adoptar",
]
# … e as que a norma europeia MANTEM, para nao haver correccoes a mais.
MANTEM = ["facto", "contacto", "impacto", "opção", "opcional", "optar",
          "adaptar", "compacto", "intacto", "pacto", "tacto"]

# ── 3 · onde vivem as frases que precisam de ouvido ───────────────────────
SELECTORES = [
    (r"<h1[^>]*>(.*?)</h1>",                       "título de página"),
    (r'<h2[^>]*class="titulo[^"]*"[^>]*>(.*?)</h2>', "título de secção"),
    (r"<h3[^>]*>(.*?)</h3>",                       "subtítulo"),
    (r'<p class="etiqueta"[^>]*>(.*?)</p>',        "etiqueta"),
    (r'<summary[^>]*>(.*?)</summary>',             "pergunta"),
    (r"<figcaption[^>]*>(.*?)</figcaption>",       "legenda"),
    (r'<a class="botao[^"]*"[^>]*>(.*?)</a>',      "botão"),
    (r'<b>(.*?)</b>',                              "destaque"),
]

limpa = lambda t: re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", t)).strip()


def ficheiros():
    return sorted(glob.glob("**/*.html", recursive=True))


def texto_visivel(html):
    html = re.sub(r"<(script|style)\b.*?</\1>", "", html, flags=re.S)
    return " ".join(re.findall(r">([^<]+)<", html))


def regras():
    avisos = []
    for f in ficheiros():
        html = open(f, encoding="utf-8").read()
        txt = texto_visivel(html).lower()
        for expr, porque in REPROVADAS:
            # fronteira de palavra a serio: "muita gente" nao contem "a gente"
            padrao = r"(?<![\wÀ-ɏ])%s(?![\wÀ-ɏ])" % re.escape(expr)
            for m in re.finditer(padrao, txt):
                volta = txt[max(0, m.start() - 34):m.end() + 34]
                if any(e in volta for e in EXCEPCOES.get(expr, [])):
                    continue
                avisos.append((f, "reprovada", "«%s» — %s" % (expr, porque), volta))
        for p in PRE_ACORDO:
            for m in re.finditer(r"(?<![\wÀ-ɏ])[\wÀ-ɏ]*%s" % p, txt):
                palavra = re.search(r"[\wàáâãéêíóôõúç]*%s[\wàáâãéêíóôõúç]*" % p,
                                    txt[m.start():m.end() + 12])
                inteira = palavra.group(0) if palavra else p
                if any(k in inteira for k in MANTEM):
                    continue
                avisos.append((f, "ortografia", "«%s» é grafia anterior a 1990" % inteira, ""))
    return avisos


# ── 4 · verificacoes de estrutura ─────────────────────────────────────────
# Nasceram de erros reais. A comparacao com 24 sites portugueses do sector
# -- Generali, Fidelidade, Ageas, Allianz, Lusitania, Mapfre, Medis,
# Multicare, Victoria, Prevoir, Real Vida, Caravela, Seguro Directo, Sosel,
# R2, Credimedia, Publisegur, SegurVida, ActivoBank, Moey, DECO, ASF,
# Comparamais, Lusitania Vida -- mostrou tres regras que o mercado inteiro
# cumpre e que este site tinha quebrado.

PARAGENS = set("""a o as os um uma de do da dos das em no na nos nas para por
com e ou que se seu sua seus suas ao aos as e é são meu minha só mais""".split())

_pal = lambda t: {w for w in re.findall(r"[^\W\d_]+", limpa(t).lower(), re.UNICODE)
                  if w not in PARAGENS and len(w) > 3}


def estrutura():
    avisos = []
    for f in ficheiros():
        if f in ("404.html", "sobre.html", "informacao-legal.html"):
            continue
        html = open(f, encoding="utf-8").read()
        # so as paginas de produto: os indices, o sobre nos, os sinistros e
        # o simulador nao vendem um produto e o mercado da-lhes titulo livre
        de_produto = ("particulares" in f or "empresas" in f) and "index" not in f

        # (1) O titulo tem de dizer o nome do produto. Nenhum dos 24 sites
        #     poe a frase bonita no <h1> e esconde o produto: a frase
        #     bonita vive na linha de baixo.
        h1 = re.search(r"<h1[^>]*>((?:(?!</h1>).)*)</h1>", html, re.S)
        mig = re.findall(r'<span aria-current="page">([^<]+)</span>', html)
        if de_produto and h1 and mig and _pal(h1.group(1)) and _pal(mig[0]):
            if not (_pal(h1.group(1)) & _pal(mig[0])):
                avisos.append((f, "título", "«%s» não repete nada de «%s» — quem vem do menu perde o fio"
                               % (limpa(h1.group(1)), mig[0].strip()), ""))

        # (2) Titulos repetidos dentro da MESMA pagina. Entre paginas e
        #     consistencia; dentro de uma so, e descuido.
        vistos = {}
        for t in re.findall(r'<h2[^>]*class="titulo[^"]*"[^>]*>((?:(?!</h2>).)*)</h2>', html, re.S):
            t = limpa(t)
            k = " ".join(t.split()[:3]).lower()
            if k in vistos:
                avisos.append((f, "repetição", "«%s» e «%s» começam igual, na mesma página"
                               % (vistos[k], t), ""))
            vistos[k] = t

        # (3) A quebra de linha tem de deixar peso no italico: duas
        #     palavras abertas por preposicao poem a enfase em cima de nada.
        for m in re.finditer(r"<(h1|h2)[^>]*>((?:(?!</>).)*)</>", html, re.S):
            partes = m.group(2).split("<br>")
            if len(partes) == 2:
                seg = limpa(partes[1]).split()
                if seg and len(seg) < 3 and seg[0].lower().strip(".,?") in PARAGENS:
                    avisos.append((f, "quebra", "«%s / %s» — o itálico fica sem peso"
                                   % (limpa(partes[0]), limpa(partes[1])), ""))
    return avisos


def frases():
    saida, vistas = [], set()
    for f in ficheiros():
        html = open(f, encoding="utf-8").read()
        corpo = re.search(r"<main.*</main>", html, re.S)
        if not corpo:
            continue
        corpo = re.sub(r"<svg.*?</svg>", "", corpo.group(0), flags=re.S)
        for padrao, tipo in SELECTORES:
            for m in re.finditer(padrao, corpo, re.S):
                t = limpa(m.group(1))
                if not t or len(t) > 90 or (t, tipo) in vistas:
                    continue
                vistas.add((t, tipo))
                saida.append((f, tipo, t))
    return saida


# As frases inventadas -- as que alguem teve de escrever de raiz -- sao
# onde o erro de sonoridade mora. As perguntas e os subtitulos sao quase
# sempre nomes de coisas, e o risco e baixo.
INVENTADAS = {"título de página", "título de secção", "legenda", "etiqueta", "destaque"}

if "--frases" in sys.argv:
    fs = frases()
    a = [x for x in fs if x[1] in INVENTADAS]
    b = [x for x in fs if x[1] not in INVENTADAS]

    def bloco(fh, lista):
        atual = None
        for f, tipo, t in lista:
            if f != atual:
                fh.write("\n### %s\n\n" % f.replace("\\", "/"))
                atual = f
            fh.write("- *%s* — %s\n" % (tipo, t))

    with open("FRASES-A-LER.md", "w", encoding="utf-8") as fh:
        fh.write("# Frases a ler em voz alta\n\n")
        fh.write("O texto corrido não está aqui de propósito. O erro de sonoridade\n"
                 "aparece sempre nas frases curtas — nas que alguém teve de inventar —\n"
                 "e nunca nos parágrafos, que se limitam a explicar.\n\n"
                 "O que soar mal, diga. Vai para a lista negra em\n"
                 "`ferramentas/rever-texto.py` e não volta a aparecer em lado nenhum.\n")
        fh.write("\n## Primeiro: as inventadas (%d)\n\n"
                 "Títulos, etiquetas, legendas e destaques. São estas que arriscam.\n" % len(a))
        bloco(fh, a)
        fh.write("\n\n## Depois: as descritivas (%d)\n\n"
                 "Perguntas e subtítulos. Quase sempre nomes de coisas — risco baixo,\n"
                 "mas ficam aqui para leitura completa.\n" % len(b))
        bloco(fh, b)
    print("FRASES-A-LER.md — %d inventadas, %d descritivas" % (len(a), len(b)))
else:
    av = regras() + estrutura()
    for f, cat, o_que, volta in av:
        print("%-40s %-11s %s" % (f, cat, o_que))
        if volta:
            print(" " * 53 + "…%s…" % volta.strip())
    print("\n%d avisos" % len(av) if av else "\nSem avisos.")
    sys.exit(1 if av else 0)
