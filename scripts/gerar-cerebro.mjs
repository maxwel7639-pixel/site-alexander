/**
 * Gera o cérebro de fio da seção de serviços: `lib/cerebro.ts`.
 *
 * Rodar: node scripts/gerar-cerebro.mjs
 *
 * POR QUE UM FIO SÓ. O efeito é o cérebro se desenrolar com a rolagem, e só se
 * desenrola o que é uma linha contínua. Uma imagem não serve: ela só pode
 * aparecer ou sumir inteira.
 *
 * COMO O FIO É FEITO, sem desenhar à mão:
 *   1. o contorno visto de cima é uma elipse um pouco mais estreita na frente;
 *   2. cada hemisfério vira uma grade de células, e um labirinto aleatório
 *      (árvore geradora) liga todas elas;
 *   3. o contorno desse labirinto é UM laço fechado que passa por todas as
 *      células sem se cruzar -- são as dobras do cérebro;
 *   4. uma ponte embaixo, no meio, liga os dois hemisférios, e o laço é aberto
 *      ali: é por onde o fio entra e sai, como um tronco cerebral;
 *   5. os cantos são arredondados e o fio ganha uma onda lenta de lado, que
 *      é o que tira a cara de labirinto.
 *
 * A semente é fixa: rodar de novo dá o mesmo desenho. Trocar a SEMENTE dá
 * outro cérebro, com as mesmas proporções.
 */
import { writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SEMENTE = Number(process.argv[2] ?? 20260913);

function mulberry32(a) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const aleatorio = mulberry32(SEMENTE);

const LARGURA = 520;
const ALTURA = 470;
const CX = 260;
const CY = 205;
const RX = 214;
const RY = 186;
const CELULA = 24;
const Q = CELULA / 4;
// Cada hemisfério se afasta SULCO px do meio: sem isso a fenda entre os dois
// tem a largura de uma dobra qualquer e o cérebro vira uma bola.
const SULCO = 7;

// Visto de cima: a frente (em cima) é mais estreita que a nuca.
function dentro(x, y) {
  const v = (y - CY) / RY;
  const u = (x - CX) / (RX * (0.9 + 0.1 * v));
  return u * u + v * v <= 1;
}

// ------------------------------------------------------------------ células
const celulas = new Map();
const chave = (i, j) => `${i},${j}`;
const k = Math.ceil(RX / CELULA) + 1;
const m = Math.ceil(RY / CELULA) + 1;
for (let i = -k; i < k; i++) {
  for (let j = -m; j < m; j++) {
    const cx = CX + (i + 0.5) * CELULA;
    const cy = CY + (j + 0.5) * CELULA;
    const cantos = [
      [cx - Q, cy - Q],
      [cx + Q, cy - Q],
      [cx + Q, cy + Q],
      [cx - Q, cy + Q],
    ];
    if (cantos.every(([x, y]) => dentro(x, y))) {
      celulas.set(chave(i, j), { i, j, cx, cy, lado: i < 0 ? 'e' : 'd' });
    }
  }
}

const vizinhos = (c) =>
  [
    [c.i, c.j - 1],
    [c.i + 1, c.j],
    [c.i, c.j + 1],
    [c.i - 1, c.j],
  ]
    .map(([i, j]) => celulas.get(chave(i, j)))
    .filter((n) => n && n.lado === c.lado);

// Fica só o maior pedaço conectado de cada lado (a borda pode soltar célula).
for (const lado of ['e', 'd']) {
  const doLado = [...celulas.values()].filter((c) => c.lado === lado);
  const vistos = new Set();
  let maior = [];
  for (const c of doLado) {
    if (vistos.has(c)) continue;
    const grupo = [];
    const pilha = [c];
    vistos.add(c);
    while (pilha.length) {
      const atual = pilha.pop();
      grupo.push(atual);
      for (const n of vizinhos(atual)) {
        if (!vistos.has(n)) {
          vistos.add(n);
          pilha.push(n);
        }
      }
    }
    if (grupo.length > maior.length) maior = grupo;
  }
  const manter = new Set(maior);
  for (const c of doLado) if (!manter.has(c)) celulas.delete(chave(c.i, c.j));
}

// ---------------------------------------------------------------- labirinto
const arvore = new Set();
const aresta = (a, b) => [chave(a.i, a.j), chave(b.i, b.j)].sort().join('|');

for (const lado of ['e', 'd']) {
  const doLado = [...celulas.values()].filter((c) => c.lado === lado);
  const inicio = doLado[Math.floor(aleatorio() * doLado.length)];
  const visitadas = new Set([inicio]);
  const lista = [inicio];
  while (lista.length) {
    // 75% das vezes continua o corredor mais novo (dobras longas), 25% abre
    // um galho de qualquer ponto (dobras curtas).
    const idx = aleatorio() < 0.75 ? lista.length - 1 : Math.floor(aleatorio() * lista.length);
    const c = lista[idx];
    const livres = vizinhos(c).filter((n) => !visitadas.has(n));
    if (!livres.length) {
      lista.splice(idx, 1);
      continue;
    }
    const n = livres[Math.floor(aleatorio() * livres.length)];
    arvore.add(aresta(c, n));
    visitadas.add(n);
    lista.push(n);
  }
}

// A ponte: a linha mais baixa que tem célula dos dois lados do meio.
let ponteJ = null;
for (const c of celulas.values()) {
  if (c.i === -1 && celulas.has(chave(0, c.j)) && (ponteJ === null || c.j > ponteJ)) ponteJ = c.j;
}
const ponteE = celulas.get(chave(-1, ponteJ));
const ponteD = celulas.get(chave(0, ponteJ));
arvore.add(aresta(ponteE, ponteD));

const ligadas = (a, b) => !!b && arvore.has(aresta(a, b));

// --------------------------------------------------------- o laço em volta
// Cada célula tem 4 pontos (0 TL, 1 TR, 2 BR, 3 BL). Onde há passagem do
// labirinto o laço atravessa; onde há parede ele contorna.
const pontos = new Map();
const grafo = new Map();
const no = (c, q) => `${c.i},${c.j},${q}`;
function liga(a, b) {
  if (!grafo.has(a)) grafo.set(a, []);
  if (!grafo.has(b)) grafo.set(b, []);
  grafo.get(a).push(b);
  grafo.get(b).push(a);
}
for (const c of celulas.values()) {
  const x = c.cx + (c.lado === 'e' ? -SULCO : SULCO);
  pontos.set(no(c, 0), [x - Q, c.cy - Q]);
  pontos.set(no(c, 1), [x + Q, c.cy - Q]);
  pontos.set(no(c, 2), [x + Q, c.cy + Q]);
  pontos.set(no(c, 3), [x - Q, c.cy + Q]);
}
for (const c of celulas.values()) {
  const cima = celulas.get(chave(c.i, c.j - 1));
  const baixo = celulas.get(chave(c.i, c.j + 1));
  const esq = celulas.get(chave(c.i - 1, c.j));
  const dir = celulas.get(chave(c.i + 1, c.j));
  if (ligadas(c, cima)) {
    liga(no(c, 0), no(cima, 3));
    liga(no(c, 1), no(cima, 2));
  } else liga(no(c, 0), no(c, 1));
  if (!ligadas(c, baixo)) liga(no(c, 3), no(c, 2));
  if (ligadas(c, esq)) {
    liga(no(c, 0), no(esq, 1));
    liga(no(c, 3), no(esq, 2));
  } else liga(no(c, 0), no(c, 3));
  if (!ligadas(c, dir)) liga(no(c, 1), no(c, 2));
}
for (const [id, ns] of grafo) {
  if (ns.length !== 2) throw new Error(`nó ${id} com grau ${ns.length}`);
}

// Abre o laço embaixo da ponte.
const A = no(ponteE, 2);
const B = no(ponteD, 3);
grafo.set(A, grafo.get(A).filter((x) => x !== B));
grafo.set(B, grafo.get(B).filter((x) => x !== A));

const caminho = [A];
let anterior = null;
let atual = A;
while (atual !== B) {
  const proximo = grafo.get(atual).find((x) => x !== anterior);
  anterior = atual;
  atual = proximo;
  caminho.push(atual);
}
if (caminho.length !== grafo.size) {
  throw new Error(`o fio passou por ${caminho.length} de ${grafo.size} pontos`);
}

// ------------------------------------------------------------ arredondar
let linha = caminho.map((id) => pontos.get(id));
// só os cantos importam; ponto no meio de reta sai
linha = linha.filter((p, idx) => {
  if (idx === 0 || idx === linha.length - 1) return true;
  const [a, b] = [linha[idx - 1], linha[idx + 1]];
  return !((a[0] === p[0] && p[0] === b[0]) || (a[1] === p[1] && p[1] === b[1]));
});

// Chaikin: corta os cantos três vezes. Vira curva sem sair de dentro do
// canto, então nunca encosta na dobra vizinha.
for (let volta = 0; volta < 3; volta++) {
  const cortada = [linha[0]];
  for (let idx = 0; idx < linha.length - 1; idx++) {
    const [x0, y0] = linha[idx];
    const [x1, y1] = linha[idx + 1];
    cortada.push([x0 * 0.75 + x1 * 0.25, y0 * 0.75 + y1 * 0.25]);
    cortada.push([x0 * 0.25 + x1 * 0.75, y0 * 0.25 + y1 * 0.75]);
  }
  cortada.push(linha[linha.length - 1]);
  linha = cortada;
}

// Reamostra a cada PASSO px ao longo do fio e empurra cada ponto de lado numa
// onda lenta: é o que tira a cara de labirinto e dá cara de dobra.
const PASSO = 8;
const amostras = [linha[0]];
let sobra = 0;
for (let idx = 1; idx < linha.length; idx++) {
  const [x0, y0] = linha[idx - 1];
  const [x1, y1] = linha[idx];
  const trecho = Math.hypot(x1 - x0, y1 - y0);
  let s = PASSO - sobra;
  while (s <= trecho) {
    amostras.push([x0 + ((x1 - x0) * s) / trecho, y0 + ((y1 - y0) * s) / trecho]);
    s += PASSO;
  }
  sobra = trecho - (s - PASSO);
}
amostras.push(linha[linha.length - 1]);

const ONDA = 2.3;
const COMPRIMENTO_ONDA = 46;
const fase = aleatorio() * Math.PI * 2;
const onduladas = amostras.map(([x, y], idx) => {
  // as pontas ficam no lugar: é onde o fio de fora se encaixa
  if (idx < 3 || idx > amostras.length - 4) return [x, y];
  const [xa, ya] = amostras[idx - 1];
  const [xb, yb] = amostras[idx + 1];
  const tam = Math.hypot(xb - xa, yb - ya) || 1;
  const nx = -(yb - ya) / tam;
  const ny = (xb - xa) / tam;
  const desvio =
    ONDA * Math.sin((idx * PASSO * 2 * Math.PI) / COMPRIMENTO_ONDA + fase) +
    (aleatorio() - 0.5) * 0.9;
  return [x + nx * desvio, y + ny * desvio];
});

// Quadráticas pelos pontos médios: curva contínua, e metade do tamanho de
// uma Bézier cúbica no arquivo.
const f = (n) => Math.round(n * 10) / 10;
let d = `M${f(onduladas[0][0])} ${f(onduladas[0][1])}`;
for (let idx = 1; idx < onduladas.length - 1; idx++) {
  const [x, y] = onduladas[idx];
  const [xn, yn] = onduladas[idx + 1];
  d += `Q${f(x)} ${f(y)} ${f((x + xn) / 2)} ${f((y + yn) / 2)}`;
}
const ultimo = onduladas[onduladas.length - 1];
d += `L${f(ultimo[0])} ${f(ultimo[1])}`;
const [ax, ay] = pontos.get(A);
const [bx, by] = pontos.get(B);
const FIO_Y = Math.round(Math.max(ay, by) + 44);

const entrada =
  `M-4000 ${FIO_Y}L${f(ax - 64)} ${FIO_Y}` +
  `C${f(ax - 14)} ${FIO_Y} ${f(ax)} ${f(ay + 26)} ${f(ax)} ${f(ay)}`;

// Mesma curva que o JS desenha a partir de B no começo do desenrolar
// (components/Desenrolar.tsx): assim a troca do servidor pro JS não pisca.
const SAIDA_X = f(bx + 64);
const saida =
  `M${f(bx)} ${f(by)}C${f(bx)} ${f(by + 36)} ${f(SAIDA_X - 50)} ${FIO_Y} ${SAIDA_X} ${FIO_Y}` +
  `L4000 ${FIO_Y}`;

const arquivo = `// GERADO por scripts/gerar-cerebro.mjs (semente ${SEMENTE}). Não editar à mão.
// O fio passa por ${celulas.size} células; ${d.length} caracteres de caminho.

export const CEREBRO = {
  viewBox: '0 0 ${LARGURA} ${ALTURA}',
  /** O cérebro: um fio só, de A (entra) a B (sai), os dois embaixo, no meio. */
  caminho: '${d}',
  /** Da borda esquerda da tela até A. */
  entrada: '${entrada}',
  /** De B até a borda direita, em repouso. Enquanto desenrola, quem desenha é o JS. */
  saida: '${saida}',
  /** Altura do fio que atravessa a seção, e onde a saída encontra ele. */
  fioY: ${FIO_Y},
  saidaX: ${SAIDA_X},
} as const;
`;
writeFileSync(resolve(RAIZ, 'lib/cerebro.ts'), arquivo);
console.log(`semente ${SEMENTE}: células ${celulas.size}, pontos ${onduladas.length}, caminho ${d.length} chars`);
