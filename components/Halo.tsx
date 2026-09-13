'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import s from './Halo.module.css';

export type CartaHalo = {
  /** Caminho da foto. Sem ela, o cartão mostra o `rotulo`. */
  src?: string;
  rotulo?: string;
};

type Props = {
  cartas: CartaHalo[];
  /** O texto ao lado de cada cartão, na mesma ordem. Só o da frente aparece. */
  paineis: React.ReactNode[];
  /** Conteúdo fixo acima do texto que troca (a introdução, no espaço). */
  antes?: React.ReactNode;
  /** 'retrato' pros temas, 'paisagem' pras fotos da sala. */
  formato?: 'retrato' | 'paisagem';
  /** Quantas vezes cada item se repete no anel, pra ele ficar cheio. */
  repeticoes?: number;
  /**
   * Quantos cartões aparecem ao mesmo tempo, contando o da frente. Os outros
   * somem com um fade conforme se afastam. Sem isto, aparece o anel inteiro.
   */
  visiveis?: number;
  rotuloAnterior: string;
  rotuloProximo: string;
  /** Fotos com `sizes` coerente com o tamanho do cartão. */
  sizes?: string;
};

const TAU = Math.PI * 2;
/** Raio horizontal e vertical do anel, em fração do palco. */
const RAIO_X = 0.62;
const RAIO_Y = 0.38;
/** Escala do cartão no fundo do anel. */
const ESCALA_FUNDO = 0.42;
/** Tempo parado na frente: dá pra ler o texto antes de girar. */
const PARADO = 3800;
const GIRO = 800;

function pose(giro: number, i: number, passo: number, visiveis?: number) {
  const angulo = i * passo + giro;
  const c = Math.cos(angulo);
  const s = Math.sin(angulo);
  let o = 1;
  if (visiveis) {
    // distância angular até a frente, e o limite dos que ficam à vista: com 3,
    // o da frente e um vizinho de cada lado. Passou do limite, some em 60% de
    // um passo -- é o fade de quem sai enquanto o próximo entra.
    const distancia = Math.abs(Math.atan2(s, c));
    const limite = (passo * (visiveis - 1)) / 2;
    o = Math.min(1, Math.max(0, 1 - (distancia - limite) / (passo * 0.6)));
  }
  return { c, s, o, k: ESCALA_FUNDO + (1 - ESCALA_FUNDO) * ((c + 1) / 2) };
}

const suave = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

/**
 * Um anel de cartões com o texto do cartão da frente ao lado. Adaptado do Halo
 * Reel (Ruixen) em 13/09/2026, pedido do Maxwel: nasceu nos temas e foi pro
 * espaço no mesmo dia. O original é Tailwind + framer-motion; aqui é o mesmo
 * cálculo sem dependência nova, no padrão do resto do site.
 *
 * A GEOMETRIA: o cartão i fica no ângulo θ = i·passo + giro de uma elipse com
 * o centro na borda esquerda do palco. cos θ faz tudo: posiciona, dá a escala
 * e, pela escala, a ordem de empilhamento. O cartão com θ = 0 é o da frente.
 *
 * O ANEL REPETE OS ITENS (`repeticoes`). Com um cartão por item ele ficaria
 * ralo; repetido, fica cheio como na referência. Item da frente = vaga % N.
 *
 * O TEXTO DO ITEM DA FRENTE entra pela direita, o lado oposto ao anel, no
 * mesmo quadro em que a vaga da frente muda: por isso ele é trocado dentro de
 * `desenha`, e não num relógio à parte.
 *
 * POSIÇÃO EM CSS, NÃO EM PIXEL: o JS só escreve --c, --s e --k em cada cartão;
 * quem converte em pixel é o CSS, com cqw/cqh do palco. Assim o servidor já
 * entrega o anel montado (sem JS ele aparece parado, com o primeiro item) e
 * redimensionar a tela não precisa de conta nenhuma.
 *
 * TODOS OS TEXTOS ESTÃO NO HTML, empilhados na mesma célula: a busca lê todos,
 * e a troca não empurra o que vem embaixo.
 *
 * O GIRO SOZINHO É SÓ CONVITE: para com o mouse em cima, fora da tela, com a
 * aba escondida, e para de vez quando a pessoa usa as setas ou arrasta.
 * Com prefers-reduced-motion não gira sozinho e as setas trocam sem animar.
 */
export default function Halo({
  cartas,
  paineis,
  antes,
  formato = 'retrato',
  repeticoes = 2,
  visiveis,
  rotuloAnterior,
  rotuloProximo,
  sizes = '180px',
}: Props) {
  const N = cartas.length;
  const vagas = N * repeticoes;
  const passo = TAU / vagas;

  const palco = useRef<HTMLDivElement>(null);
  const elementos = useRef<(HTMLDivElement | null)[]>([]);
  const giro = useRef(0);
  const quadro = useRef(0);
  const tocou = useRef(false);
  const pausado = useRef(false);
  const reduzido = useRef(false);
  const arraste = useRef({ ativo: false, angulo: 0 });
  const [ativo, setAtivo] = useState(0);
  const ativoAtual = useRef(0);
  // Anuncia a troca pro leitor de tela só depois que a pessoa usou as setas:
  // anunciar o giro sozinho, a cada quatro segundos, seria ruído.
  const [anunciar, setAnunciar] = useState(false);

  const desenha = useCallback(
    (r: number) => {
      giro.current = r;
      elementos.current.forEach((el, i) => {
        if (!el) return;
        const p = pose(r, i, passo, visiveis);
        el.style.setProperty('--c', p.c.toFixed(4));
        el.style.setProperty('--s', p.s.toFixed(4));
        el.style.setProperty('--k', p.k.toFixed(4));
        el.style.setProperty('--o', p.o.toFixed(3));
        el.style.zIndex = String(Math.round(p.k * 1000));
      });
      const frente = ((Math.round(-r / passo) % vagas) + vagas) % vagas;
      const item = frente % N;
      if (item !== ativoAtual.current) {
        ativoAtual.current = item;
        setAtivo(item);
      }
    },
    [N, passo, vagas, visiveis],
  );

  const leva = useCallback(
    (alvo: number, ms: number, depois?: () => void) => {
      cancelAnimationFrame(quadro.current);
      if (ms <= 0 || reduzido.current) {
        desenha(alvo);
        depois?.();
        return;
      }
      const de = giro.current;
      const inicio = performance.now();
      const anda = (agora: number) => {
        const x = Math.min(1, (agora - inicio) / ms);
        desenha(de + (alvo - de) * suave(x));
        if (x < 1) quadro.current = requestAnimationFrame(anda);
        else depois?.();
      };
      quadro.current = requestAnimationFrame(anda);
    },
    [desenha],
  );

  const encaixado = () => Math.round(giro.current / passo) * passo;

  /** +1 traz o próximo item pra frente, -1 o anterior. */
  const gira = (direcao: number) => {
    tocou.current = true;
    setAnunciar(true);
    leva(encaixado() - direcao * passo, GIRO);
  };

  useEffect(() => {
    reduzido.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduzido.current) return;

    let relogio = 0;
    const agenda = () => {
      relogio = window.setTimeout(() => {
        if (tocou.current) return;
        const r = palco.current?.getBoundingClientRect();
        const fora = !r || r.bottom < 0 || r.top > window.innerHeight;
        if (pausado.current || arraste.current.ativo || document.hidden || fora) {
          agenda();
          return;
        }
        leva(encaixado() - passo, GIRO, agenda);
      }, PARADO);
    };
    agenda();

    return () => {
      window.clearTimeout(relogio);
      cancelAnimationFrame(quadro.current);
    };
  }, [leva, passo]);

  // ------------------------------------------------------------ arrastar
  const anguloDoPonteiro = (e: React.PointerEvent) => {
    const r = palco.current!.getBoundingClientRect();
    // dividir pelos raios desfaz o achatamento da elipse: arrastar no lado
    // largo gira o mesmo tanto que no lado estreito
    return Math.atan2(
      (e.clientY - r.top - r.height / 2) / (r.height * RAIO_Y || 1),
      (e.clientX - r.left) / (r.width * RAIO_X || 1),
    );
  };

  const soltar = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!arraste.current.ativo) return;
    arraste.current.ativo = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    // nunca descansa entre dois cartões
    leva(encaixado(), 500);
  };

  return (
    <div className={`${s.halo} ${s[formato]}`}>
      <div
        ref={palco}
        className={s.palco}
        style={{ '--rx': `${RAIO_X * 100}cqw`, '--ry': `${RAIO_Y * 100}cqh` } as React.CSSProperties}
        // O anel repete o que o texto ao lado já diz; pra leitor de tela ele é
        // decoração, e quem troca de item são as setas.
        aria-hidden="true"
        onPointerEnter={() => (pausado.current = true)}
        onPointerLeave={() => (pausado.current = false)}
        onPointerDown={(e) => {
          if (e.pointerType === 'mouse' && e.button !== 0) return;
          tocou.current = true;
          cancelAnimationFrame(quadro.current);
          arraste.current = { ativo: true, angulo: anguloDoPonteiro(e) };
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (!arraste.current.ativo) return;
          const angulo = anguloDoPonteiro(e);
          // embrulha em (-π, π]: cruzar a emenda atrás do anel é um passo
          // pequeno, não uma volta inteira ao contrário
          const delta = ((angulo - arraste.current.angulo + Math.PI * 3) % TAU) - Math.PI;
          arraste.current.angulo = angulo;
          desenha(giro.current + delta);
        }}
        onPointerUp={soltar}
        onPointerCancel={soltar}
      >
        {Array.from({ length: vagas }, (_, i) => {
          const carta = cartas[i % N];
          const p = pose(0, i, passo, visiveis);
          return (
            <div
              key={i}
              ref={(el) => {
                elementos.current[i] = el;
              }}
              className={s.carta}
              style={
                {
                  '--c': p.c.toFixed(4),
                  '--s': p.s.toFixed(4),
                  '--k': p.k.toFixed(4),
                  '--o': p.o.toFixed(3),
                  zIndex: Math.round(p.k * 1000),
                } as React.CSSProperties
              }
            >
              {carta.src ? (
                <Image
                  src={carta.src}
                  alt=""
                  fill
                  sizes={sizes}
                  draggable={false}
                  className={s.imagem}
                />
              ) : (
                <span className={s.espera}>{carta.rotulo}</span>
              )}
            </div>
          );
        })}
      </div>

      <div className={s.lado}>
        {antes}

        <div className={s.pilha} aria-live={anunciar ? 'polite' : 'off'}>
          {paineis.map((painel, i) => (
            <div
              key={i}
              className={i === ativo ? `${s.painel} ${s.ativo}` : s.painel}
              aria-hidden={i !== ativo}
            >
              {painel}
            </div>
          ))}
        </div>

        <div className={s.setas}>
          <button type="button" className={s.seta} onClick={() => gira(-1)} aria-label={rotuloAnterior}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <button type="button" className={s.seta} onClick={() => gira(1)} aria-label={rotuloProximo}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
