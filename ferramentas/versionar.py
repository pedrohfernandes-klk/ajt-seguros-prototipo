# -*- coding: utf-8 -*-
"""Carimba a folha de estilos e o script com a sua impressao digital.

    python ferramentas/versionar.py

O problema que isto resolve e concreto e ja aconteceu: publica-se uma
pagina nova, o browser do visitante traz o HTML novo do servidor mas
serve a folha de estilos que tem em cache -- e a pagina aparece com
metade das regras em falta. Uma imagem que devia ter 300px ocupa a
largura toda, um bloco que devia estar em duas colunas fica em uma.

A solucao e velha e nao falha: a ligacao passa a levar um numero que
muda sempre que o ficheiro muda. Cache diferente, pedido novo. E quando
o ficheiro nao muda, o numero tambem nao -- portanto quem ja o tem
continua a nao o voltar a pedir.

Corre-se antes de cada publicacao. Sem argumentos, sem configuracao.
"""
import hashlib
import glob
import io
import os
import re
import sys

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(RAIZ)

FICHEIROS = {
    "assets/css/style.css": "css",
    "assets/js/main.js": "js",
}


def impressao(caminho):
    """Oito caracteres do SHA-1 do ficheiro. Chega e sobra para distinguir
    duas versoes, e mantem as ligacoes legiveis."""
    with open(caminho, "rb") as fh:
        return hashlib.sha1(fh.read()).hexdigest()[:8]


carimbos = {c: impressao(c) for c in FICHEIROS}
for c, v in carimbos.items():
    print("  %-24s %s" % (c, v))

alterados = 0
for pagina in sorted(glob.glob("**/*.html", recursive=True)):
    original = open(pagina, encoding="utf-8").read()
    novo = original
    for caminho, v in carimbos.items():
        nome = os.path.basename(caminho)
        # apanha href/src com ou sem carimbo anterior, e com prefixo ../
        novo = re.sub(
            r'((?:href|src)="(?:\.\./)?assets/(?:css|js)/%s)(\?v=[0-9a-f]+)?"' % re.escape(nome),
            lambda m: '%s?v=%s"' % (m.group(1), v),
            novo,
        )
    if novo != original:
        open(pagina, "w", encoding="utf-8").write(novo)
        alterados += 1

print("\n%d páginas carimbadas" % alterados)

# Uma verificacao final: nao pode ficar nenhuma ligacao sem carimbo.
soltas = []
for pagina in glob.glob("**/*.html", recursive=True):
    s = open(pagina, encoding="utf-8").read()
    for m in re.finditer(r'(?:href|src)="(?:\.\./)?assets/(?:css|js)/[^"]+"', s):
        if "?v=" not in m.group(0):
            soltas.append((pagina, m.group(0)))
if soltas:
    print("\nLIGAÇÕES SEM CARIMBO:")
    for p, l in soltas:
        print("  %-40s %s" % (p, l))
    sys.exit(1)
print("nenhuma ligação ficou sem carimbo")
