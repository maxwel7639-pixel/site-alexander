'use client';

import { useEffect, useRef } from 'react';
import s from './LivroPsi.module.css';

/*
 * O livro aberto com o Ψ em cima, no canto do Contato. Pedido do Maxwel em
 * 13/09/2026, com a referência de uma ilustração em malha brilhante (livro em
 * polígonos, psi facetado e uma nuvem de pontos). No lugar do azul da
 * referência, o ouro e o creme da paleta dele, que é o que existe sobre o
 * grafite do resto do site.
 *
 * TUDO É DESENHADO AQUI, sem imagem: o livro é uma malha 3D projetada com
 * perspectiva, o Ψ é uma malha de pontos dentro do caractere na fonte dos
 * títulos (o mesmo da marca d'água), e os pontos piscam. O livro e o Ψ são desenhados UMA vez em camadas fora da tela,
 * com o brilho (shadowBlur, que é caro); a cada quadro só se copia as camadas
 * e se desenha os pontos.
 *
 * Só anima com a seção à vista. Com prefers-reduced-motion fica um quadro só.
 * É decoração: aria-hidden no contentor da Secao.
 */

const OURO = '191, 154, 112';
const CREME = '241, 233, 218';

type P2 = [number, number];

function sementeira(a: number) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ------------------------------------------------------------------ o livro
const LARGURA_PAGINA = 0.8;
const FUNDO_PAGINA = 1.0;
const GUINADA = -0.32; // gira o livro um pouco, pra ver de três quartos
const INCLINACAO = 0.92; // olhando de cima

/** Altura da folha: sobe rápido saindo da lombada e desce até a borda. */
const alturaFolha = (u: number, v: number) =>
  0.22 * (1 - Math.pow(1 - u, 2.6)) * (1 - 0.5 * u) + 0.02 * Math.sin(v * Math.PI);

function projetor(W: number, H: number) {
  const escala = W * 0.32;
  const cx = W * 0.5;
  const cy = H * 0.71;
  const D = 3.2;
  const [cg, sg] = [Math.cos(GUINADA), Math.sin(GUINADA)];
  const [ci, si] = [Math.cos(INCLINACAO), Math.sin(INCLINACAO)];
  return (x: number, y: number, z: number): P2 => {
    const x1 = x * cg + z * sg;
    const z1 = -x * sg + z * cg;
    const y2 = y * ci + z1 * si;
    const z2 = -y * si + z1 * ci;
    const k = D / (D + z2);
    return [cx + x1 * k * escala, cy - y2 * k * escala];
  };
}

function desenhaLivro(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const proj = projetor(W, H);
  const acaso = sementeira(1309);

  // Brilho no chão, embaixo do livro: uma elipse achatada que termina ANTES
  // da borda do canvas. Um gradiente que passa da borda é cortado reto e vira
  // um retângulo claro em volta do desenho.
  const [bx, by] = proj(0, 0, 0);
  ctx.save();
  ctx.translate(bx, by);
  ctx.scale(1, 0.34);
  const brilho = ctx.createRadialGradient(0, 0, 0, 0, 0, W * 0.4);
  brilho.addColorStop(0, `rgba(${OURO}, 0.22)`);
  brilho.addColorStop(1, `rgba(${OURO}, 0)`);
  ctx.fillStyle = brilho;
  ctx.beginPath();
  ctx.arc(0, 0, W * 0.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  const linhas: [P2, P2][] = [];
  const pontos: P2[] = [];

  // capa: um retângulo um pouco maior que as folhas, logo abaixo delas
  const cw = LARGURA_PAGINA + 0.05;
  const cd = FUNDO_PAGINA / 2 + 0.04;
  const capa = [
    proj(-cw, -0.06, -cd),
    proj(cw, -0.06, -cd),
    proj(cw, -0.06, cd),
    proj(-cw, -0.06, cd),
  ];
  for (let i = 0; i < 4; i++) linhas.push([capa[i], capa[(i + 1) % 4]]);

  // as duas folhas, em malha
  const NU = 8;
  const NV = 6;
  for (const lado of [-1, 1]) {
    const grade: P2[][] = [];
    for (let i = 0; i <= NU; i++) {
      grade[i] = [];
      for (let j = 0; j <= NV; j++) {
        const u = i / NU;
        const v = j / NV;
        const borda = i === 0 || i === NU || j === 0 || j === NV;
        const tremor = borda ? 0 : (acaso() - 0.5) * 0.03;
        const x = lado * u * LARGURA_PAGINA + tremor;
        const z = (v - 0.5) * FUNDO_PAGINA + (borda ? 0 : (acaso() - 0.5) * 0.03);
        grade[i][j] = proj(x, alturaFolha(u, v), z);
        pontos.push(grade[i][j]);
      }
    }
    for (let i = 0; i <= NU; i++) {
      for (let j = 0; j <= NV; j++) {
        if (i < NU) linhas.push([grade[i][j], grade[i + 1][j]]);
        if (j < NV) linhas.push([grade[i][j], grade[i][j + 1]]);
        // a diagonal alterna de sentido: é o que dá cara de polígono
        if (i < NU && j < NV) {
          linhas.push((i + j) % 2 ? [grade[i][j], grade[i + 1][j + 1]] : [grade[i + 1][j], grade[i][j + 1]]);
        }
      }
    }
    // a borda de fora da folha desce até a capa
    linhas.push([grade[NU][0], proj(lado * cw, -0.06, -cd)]);
    linhas.push([grade[NU][NV], proj(lado * cw, -0.06, cd)]);
  }

  // o maço de folhas visto pela frente
  for (const d of [0.025, 0.05]) {
    let anterior: P2 | null = null;
    for (let i = -8; i <= 8; i++) {
      const u = Math.abs(i) / 8;
      const p = proj(Math.sign(i) * u * LARGURA_PAGINA, alturaFolha(u, 0) * (1 - d * 5) - d, -FUNDO_PAGINA / 2 - d * 0.4);
      if (anterior) linhas.push([anterior, p]);
      anterior = p;
    }
  }

  ctx.lineWidth = 1;
  ctx.shadowColor = `rgba(${OURO}, 0.9)`;
  ctx.shadowBlur = 6;
  ctx.strokeStyle = `rgba(${OURO}, 0.5)`;
  ctx.beginPath();
  for (const [a, b] of linhas) {
    ctx.moveTo(a[0], a[1]);
    ctx.lineTo(b[0], b[1]);
  }
  ctx.stroke();

  ctx.shadowBlur = 8;
  ctx.fillStyle = `rgba(${CREME}, 0.85)`;
  for (const [x, y] of pontos) {
    ctx.beginPath();
    ctx.arc(x, y, 1.3, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.shadowBlur = 0;
}

// --------------------------------------------------------------------- o Ψ
/*
 * O MESMO Ψ DA MARCA D'ÁGUA. A marca de fundo é o caractere Ψ na fonte dos
 * títulos (Cormorant Garamond); aqui ele é desenhado com a mesma fonte, e a
 * malha brilhante nasce DENTRO da letra: pontos sorteados sobre o desenho do
 * caractere, ligados aos vizinhos só quando o meio da linha também cai dentro
 * dele. Assim a silhueta é a da fonte, e não uma letra redesenhada à mão.
 */
function desenhaPsi(ctx: CanvasRenderingContext2D, W: number, H: number, familia: string) {
  const altura = H * 0.5;
  const cx = projetor(W, H)(0, 0.2, 0)[0];
  const y0 = H * 0.04;

  // tamanho da fonte que dá a altura pedida ao desenho da letra
  const teste = document.createElement('canvas').getContext('2d')!;
  teste.font = `500 100px ${familia}`;
  const m = teste.measureText('Ψ');
  const alto100 = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent || 70;
  const tamanho = (altura / alto100) * 100;
  const fonte = `500 ${tamanho}px ${familia}`;

  // a letra numa máscara, na resolução lógica
  const mw = Math.ceil(W);
  const mh = Math.ceil(H);
  const mascara = document.createElement('canvas');
  mascara.width = mw;
  mascara.height = mh;
  const mc = mascara.getContext('2d')!;
  mc.font = fonte;
  mc.textAlign = 'center';
  mc.textBaseline = 'alphabetic';
  const base = y0 + (m.actualBoundingBoxAscent / 100) * tamanho;
  mc.fillText('Ψ', cx, base);
  const alfa = mc.getImageData(0, 0, mw, mh).data;
  const dentro = (x: number, y: number) => {
    const xi = Math.round(x);
    const yi = Math.round(y);
    return xi >= 0 && yi >= 0 && xi < mw && yi < mh && alfa[(yi * mw + xi) * 4 + 3] > 110;
  };

  // pontos: um por célula da grade, na borda da letra e no miolo
  const acaso = sementeira(515);
  const pontos: P2[] = [];
  const passo = Math.max(6, tamanho / 22);
  for (let y = 0; y < mh; y += passo) {
    for (let x = 0; x < mw; x += passo) {
      for (let tentativa = 0; tentativa < 6; tentativa++) {
        const px = x + acaso() * passo;
        const py = y + acaso() * passo;
        if (dentro(px, py)) {
          pontos.push([px, py]);
          break;
        }
      }
    }
  }

  // cada ponto liga nos três vizinhos mais perto, se a linha não sair da letra
  const linhas: [P2, P2][] = [];
  const alcance = passo * 1.9;
  pontos.forEach((a, i) => {
    const vizinhos = pontos
      .map((b, j) => [j, Math.hypot(b[0] - a[0], b[1] - a[1])] as [number, number])
      .filter(([j, d]) => j > i && d < alcance)
      .sort((x, y) => x[1] - y[1])
      .slice(0, 3);
    for (const [j] of vizinhos) {
      const b = pontos[j];
      if (dentro((a[0] + b[0]) / 2, (a[1] + b[1]) / 2)) linhas.push([a, b]);
    }
  });

  // um halo atrás da letra, com raio que cabe no canvas (ver o brilho do livro)
  const hy = y0 + altura * 0.45;
  const raio = Math.min(hy, W * 0.4);
  const halo = ctx.createRadialGradient(cx, hy, 0, cx, hy, raio);
  halo.addColorStop(0, `rgba(${OURO}, 0.16)`);
  halo.addColorStop(1, `rgba(${OURO}, 0)`);
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(cx, hy, raio, 0, Math.PI * 2);
  ctx.fill();

  // a própria letra, bem de leve, pra silhueta ler inteira
  ctx.font = fonte;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = `rgba(${OURO}, 0.12)`;
  ctx.fillText('Ψ', cx, base);
  ctx.shadowColor = `rgba(${OURO}, 1)`;
  ctx.shadowBlur = 12;
  ctx.lineWidth = 1;
  ctx.strokeStyle = `rgba(${OURO}, 0.55)`;
  ctx.strokeText('Ψ', cx, base);

  ctx.shadowBlur = 8;
  ctx.lineWidth = 0.9;
  ctx.strokeStyle = `rgba(${OURO}, 0.6)`;
  ctx.beginPath();
  for (const [a, b] of linhas) {
    ctx.moveTo(a[0], a[1]);
    ctx.lineTo(b[0], b[1]);
  }
  ctx.stroke();

  ctx.fillStyle = `rgba(${CREME}, 0.95)`;
  for (const [x, y] of pontos) {
    ctx.beginPath();
    ctx.arc(x, y, 1.1, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.shadowBlur = 0;
}

// ---------------------------------------------------------------- os pontos
type Ponto = { x: number; y: number; r: number; fase: number; ritmo: number };

function espalhaPontos(W: number, H: number): Ponto[] {
  const acaso = sementeira(88);
  return Array.from({ length: 90 }, (_, i) => {
    // quatro de cada cinco à esquerda do Ψ, mais densos perto dele, como a
    // nuvem da referência; o resto espalhado do outro lado
    const lado = i % 5 === 4 ? 1 : -1;
    const afastamento = 0.09 + Math.pow(acaso(), 1.7) * (lado < 0 ? 0.42 : 0.3);
    return {
      x: W * (0.5 + lado * afastamento),
      y: H * (0.04 + acaso() * 0.58),
      r: 0.5 + acaso() * 1.3,
      fase: acaso() * Math.PI * 2,
      ritmo: 0.6 + acaso() * 1.4,
    };
  });
}

export default function LivroPsi() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const parado = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W = 0;
    let H = 0;
    let dpr = 1;
    let livro: HTMLCanvasElement | null = null;
    let psi: HTMLCanvasElement | null = null;
    let pontos: Ponto[] = [];
    let quadro = 0;
    let visivel = false;

    // a família que o next/font deu à fonte dos títulos, a mesma da marca d'água
    const familia = getComputedStyle(canvas).getPropertyValue('--fonte-titulo').trim() || 'Georgia, serif';
    let fonteCarregada = false;

    const camada = (desenha: (c: CanvasRenderingContext2D, w: number, h: number) => void) => {
      const c = document.createElement('canvas');
      c.width = Math.round(W * dpr);
      c.height = Math.round(H * dpr);
      const cc = c.getContext('2d')!;
      cc.scale(dpr, dpr);
      desenha(cc, W, H);
      return c;
    };

    const monta = () => {
      const r = canvas.getBoundingClientRect();
      if (!r.width) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width;
      H = r.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      livro = camada(desenhaLivro);
      psi = fonteCarregada ? camada((c, w, h) => desenhaPsi(c, w, h, familia)) : null;
      pontos = espalhaPontos(W, H);
    };

    const pinta = (t: number) => {
      if (!livro) return;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(livro, 0, 0);
      // o Ψ flutua 3px pra cima e pra baixo, bem devagar
      const flutua = parado ? 0 : Math.sin(t / 1400) * 3 * dpr;
      if (psi) ctx.drawImage(psi, 0, flutua);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.shadowColor = `rgba(${OURO}, 1)`;
      ctx.shadowBlur = 5;
      for (const p of pontos) {
        const brilho = parado ? 0.7 : 0.25 + 0.75 * (0.5 + 0.5 * Math.sin((t / 1000) * p.ritmo + p.fase));
        const deriva = parado ? 0 : Math.sin((t / 2600) * p.ritmo + p.fase) * 2;
        ctx.fillStyle = `rgba(${CREME}, ${brilho.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y + deriva, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    };

    const anima = (t: number) => {
      pinta(t);
      quadro = visivel ? requestAnimationFrame(anima) : 0;
    };

    monta();
    pinta(0);
    // o Ψ espera a fonte: desenhado antes dela, sairia na fonte reserva
    document.fonts.load(`500 100px ${familia}`).finally(() => {
      fonteCarregada = true;
      monta();
      pinta(performance.now());
    });

    const tamanho = new ResizeObserver(() => {
      monta();
      pinta(performance.now());
    });
    tamanho.observe(canvas);

    const vista = new IntersectionObserver(([entrada]) => {
      visivel = entrada.isIntersecting;
      if (visivel && !parado && !quadro) quadro = requestAnimationFrame(anima);
    });
    vista.observe(canvas);

    return () => {
      cancelAnimationFrame(quadro);
      tamanho.disconnect();
      vista.disconnect();
    };
  }, []);

  return <canvas ref={ref} className={s.livro} />;
}
