'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import s from './HaloTemas.module.css';

export type ItemTema = {
  titulo: string;
  texto: string;
  imagem?: string;
  temFoto: boolean;
};

const TAU = Math.PI * 2;
/** Raio horizontal e vertical do anel, em fração do palco. */
const RAIO_X = 0.62;
const RAIO_Y = 0.38;
/** Escala do cartão no fundo do anel. */
const ESCALA_FUNDO = 0.42;
/** Tempo parado na frente: dá pra ler as duas frases do tema antes de girar. */
const PARADO = 3800;
const GIRO = 800;

function pose(giro: number, i: number, passo: number) {
  const angulo = i * passo + giro;
  const c = Math.cos(angulo);
  return { c, s: Math.sin(angulo), k: ESCALA_FUNDO + (1 - ESCALA_FUNDO) * ((c + 1) / 2) };
}

const suave = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

/**
 * Os temas num anel de cartões, adaptado do Halo Reel (Ruixen) em 13/09/2026,
 * pedido do Maxwel. O original é Tailwind + framer-motion; aqui é o mesmo
 * cálculo sem dependência nova, no padrão do resto do site.
 *
 * A GEOMETRIA: o cartão i fica no ângulo θ = i·passo + giro de uma elipse com
 * o centro na borda esquerda do palco. cos θ faz tudo: posiciona, dá a escala
 * e, pela escala, a ordem de empilhamento. O cartão com θ = 0 é o da frente.
 *
 * O ANEL TEM O DOBRO DE VAGAS QUE TEMAS. Com um cartão por tema ele ficaria
 * ralo; repetido, fica cheio como na referência. Tema da frente = vaga % N.
 *
 * O TEXTO DO TEMA DA FRENTE entra pela direita, o lado oposto ao anel, no
 * mesmo quadro em que a vaga da frente muda: por isso ele é trocado dentro de
 * `desenha`, e não num relógio à parte.
 *
 * POSIÇÃO EM CSS, NÃO EM PIXEL: o JS só escreve --c, --s e --k em cada cartão;
 * quem converte em pixel é o CSS, com cqw/cqh do palco. Assim o servidor já
 * entrega o anel montado (sem JS ele aparece parado, com o primeiro tema) e
 * redimensionar a tela não precisa de conta nenhuma.
 *
 * O GIRO SOZINHO É SÓ CONVITE: para com o mouse em cima, fora da tela, com a
 * aba escondida, e para de vez quando a pessoa usa as setas ou arrasta.
 * Com prefers-reduced-motion não gira sozinho e as setas trocam sem animar.
 */
export default function HaloTemas({ itens }: { itens: ItemTema[] }) {
  const N = itens.length;
  const vagas = N * 2;
  const passo = TAU / vagas;

  const palco = useRef<HTMLDivElement>(null);
  const cartas = useRef<(HTMLDivElement | null)[]>([]);
  const giro = useRef(0);
  const quadro = useRef(0);
  const tocou = useRef(false);
  const pausado = useRef(false);
  const reduzido = useRef(false);
  const arraste = useRef({ ativo: false, angulo: 0 });
  const [ativo, setAtivo] = useState(0);
  // Anuncia a troca pro leitor de tela só depois que a pessoa usou as setas:
  // anunciar o giro sozinho, a cada quatro segundos, seria ruído.
  const [anunciar, setAnunciar] = useState(false);
  const ativoAtual = useRef(0);

  const desenha = useCallback(
    (r: number) => {
      giro.current = r;
      cartas.current.forEach((el, i) => {
        if (!el) return;
        const p = pose(r, i, passo);
        el.style.setProperty('--c', p.c.toFixed(4));
        el.style.setProperty('--s', p.s.toFixed(4));
        el.style.setProperty('--k', p.k.toFixed(4));
        el.style.zIndex = String(Math.round(p.k * 1000));
      });
      const frente = ((Math.round(-r / passo) % vagas) + vagas) % vagas;
      const tema = frente % N;
      if (tema !== ativoAtual.current) {
        ativoAtual.current = tema;
        setAtivo(tema);
      }
    },
    [N, passo, vagas],
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

  /** +1 traz o próximo tema pra frente, -1 o anterior. */
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
    <div className={s.halo}>
      <div
        ref={palco}
        className={s.palco}
        style={{ '--rx': `${RAIO_X * 100}cqw`, '--ry': `${RAIO_Y * 100}cqh` } as React.CSSProperties}
        // Os cartões repetem os títulos que o texto ao lado já diz; pra leitor
        // de tela o anel é decoração, e quem troca de tema são as setas.
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
          const item = itens[i % N];
          const p = pose(0, i, passo);
          return (
            <div
              key={i}
              ref={(el) => {
                cartas.current[i] = el;
              }}
              className={s.carta}
              style={
                {
                  '--c': p.c.toFixed(4),
                  '--s': p.s.toFixed(4),
                  '--k': p.k.toFixed(4),
                  zIndex: Math.round(p.k * 1000),
                } as React.CSSProperties
              }
            >
              {item.temFoto && item.imagem ? (
                <Image
                  src={`/img/temas/${item.imagem}`}
                  alt=""
                  fill
                  sizes="180px"
                  draggable={false}
                  className={s.imagem}
                />
              ) : (
                // sem foto ainda: o nome do tema no próprio cartão
                <span className={s.espera}>{item.titulo}</span>
              )}
            </div>
          );
        })}
      </div>

      <div className={s.lado}>
        {/* Todos os temas estão no HTML, empilhados na mesma célula; só o da
            frente aparece. Assim o texto dos oito continua na página pra
            busca, e a troca não empurra o que vem embaixo. */}
        <div className={s.pilha} aria-live={anunciar ? 'polite' : 'off'}>
          {itens.map((item, i) => (
            <article
              key={item.titulo}
              className={i === ativo ? `${s.tema} ${s.ativo}` : s.tema}
              aria-hidden={i !== ativo}
            >
              <h3 className={s.titulo}>{item.titulo}</h3>
              <p className={s.texto}>{item.texto}</p>
            </article>
          ))}
        </div>

        <div className={s.setas}>
          <button type="button" className={s.seta} onClick={() => gira(-1)} aria-label="Tema anterior">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <button type="button" className={s.seta} onClick={() => gira(1)} aria-label="Próximo tema">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
