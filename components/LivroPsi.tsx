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
 * perspectiva, o Ψ é uma fita de triângulos em volta dos traços da letra, e os
 * pontos piscam. O livro e o Ψ são desenhados UMA vez em camadas fora da tela,
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
/** Os traços da letra numa caixa de 100 por 120. */
function tracosDoPsi(): { pontos: P2[]; largura: number }[] {
  const reta = (a: P2, b: P2, n: number): P2[] =>
    Array.from({ length: n + 1 }, (_, i) => [a[0] + ((b[0] - a[0]) * i) / n, a[1] + ((b[1] - a[1]) * i) / n]);
  const bacia: P2[] = Array.from({ length: 13 }, (_, i) => {
    const t = (i / 12) * Math.PI;
    return [50 - 33 * Math.cos(t), 18 + 54 * Math.sin(t)];
  });
  return [
    { pontos: reta([50, 4], [50, 116], 11), largura: 8 },
    { pontos: bacia, largura: 7 },
    { pontos: reta([40, 4], [60, 4], 2), largura: 4 },
    { pontos: reta([34, 116], [66, 116], 3), largura: 4 },
    { pontos: reta([9, 18], [25, 18], 2), largura: 4 },
    { pontos: reta([75, 18], [91, 18], 2), largura: 4 },
  ];
}

function desenhaPsi(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const altura = H * 0.46;
  const k = altura / 120;
  // centrado sobre a lombada como ela aparece na tela (o livro está girado)
  const x0 = projetor(W, H)(0, 0.2, 0)[0] - 50 * k;
  const y0 = H * 0.06;
  const linhas: [P2, P2][] = [];
  const pontos: P2[] = [];

  for (const { pontos: traco, largura } of tracosDoPsi()) {
    const esquerda: P2[] = [];
    const direita: P2[] = [];
    traco.forEach((p, i) => {
      const a = traco[Math.max(0, i - 1)];
      const b = traco[Math.min(traco.length - 1, i + 1)];
      const tam = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
      const nx = (-(b[1] - a[1]) / tam) * (largura / 2);
      const ny = ((b[0] - a[0]) / tam) * (largura / 2);
      esquerda.push([x0 + (p[0] + nx) * k, y0 + (p[1] + ny) * k]);
      direita.push([x0 + (p[0] - nx) * k, y0 + (p[1] - ny) * k]);
    });
    for (let i = 0; i < traco.length; i++) {
      pontos.push(esquerda[i], direita[i]);
      linhas.push([esquerda[i], direita[i]]);
      if (i > 0) {
        linhas.push([esquerda[i - 1], esquerda[i]], [direita[i - 1], direita[i]]);
        linhas.push(i % 2 ? [esquerda[i - 1], direita[i]] : [direita[i - 1], esquerda[i]]);
      }
    }
  }

  // um halo atrás da letra, com raio que cabe no canvas (ver o brilho do livro)
  const hx = x0 + 50 * k;
  const hy = y0 + altura * 0.45;
  const raio = Math.min(hy, W * 0.4);
  const halo = ctx.createRadialGradient(hx, hy, 0, hx, hy, raio);
  halo.addColorStop(0, `rgba(${OURO}, 0.16)`);
  halo.addColorStop(1, `rgba(${OURO}, 0)`);
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(hx, hy, raio, 0, Math.PI * 2);
  ctx.fill();

  ctx.lineWidth = 1.1;
  ctx.shadowColor = `rgba(${OURO}, 1)`;
  ctx.shadowBlur = 10;
  ctx.strokeStyle = `rgba(${OURO}, 0.75)`;
  ctx.beginPath();
  for (const [a, b] of linhas) {
    ctx.moveTo(a[0], a[1]);
    ctx.lineTo(b[0], b[1]);
  }
  ctx.stroke();

  ctx.fillStyle = `rgba(${CREME}, 0.95)`;
  for (const [x, y] of pontos) {
    ctx.beginPath();
    ctx.arc(x, y, 1.2, 0, Math.PI * 2);
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
      psi = camada(desenhaPsi);
      pontos = espalhaPontos(W, H);
    };

    const pinta = (t: number) => {
      if (!livro || !psi) return;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(livro, 0, 0);
      // o Ψ flutua 3px pra cima e pra baixo, bem devagar
      const flutua = parado ? 0 : Math.sin(t / 1400) * 3 * dpr;
      ctx.drawImage(psi, 0, flutua);

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
