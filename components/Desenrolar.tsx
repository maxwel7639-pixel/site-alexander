'use client';

import { useEffect, useRef } from 'react';

type Props = {
  /** Altura do fio que atravessa a seção, no sistema do viewBox. */
  fioY: number;
  /** Onde a saída encontra o fio, quando o cérebro ainda está inteiro. */
  saidaX: number;
  className?: string;
  children: React.ReactNode;
};

/**
 * Desenrola o cérebro de fio da seção de serviços conforme a rolagem.
 *
 * O DESENHO VEM DO SERVIDOR, inteiro, e este componente só mexe nele: procura
 * `[data-cerebro]` e `[data-saida]` dentro de si e o `[data-trilho]` acima.
 * Assim os 20 KB do caminho ficam no HTML e não entram também no JS, e sem JS
 * (ou com prefers-reduced-motion) o cérebro aparece inteiro, parado.
 *
 * COMO DESENROLA: o fio é apagado de trás pra frente (stroke-dasharray) e,
 * do ponto onde o apagado chegou, uma linha esticada desce até o fio que
 * atravessa a seção. Parece o fio sendo puxado pela ponta; no fim sobra só a
 * linha reta, com a pequena subida no meio de onde ele saiu.
 *
 * O progresso é quanto do trilho já passou enquanto o painel está parado
 * (sticky). Os primeiros 10% não mexem em nada: a pessoa vê o cérebro inteiro
 * antes de ele começar a se desfazer.
 */
export default function Desenrolar({ fioY, saidaX, className, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const raiz = ref.current;
    if (!raiz || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const trilho = raiz.closest<HTMLElement>('[data-trilho]');
    const cerebro = raiz.querySelector<SVGPathElement>('[data-cerebro]');
    const saida = raiz.querySelector<SVGPathElement>('[data-saida]');
    if (!trilho || !cerebro || !saida) return;

    const total = cerebro.getTotalLength();
    let quadro = 0;
    let ultimo = -1;

    const desenha = () => {
      quadro = 0;
      const r = trilho.getBoundingClientRect();
      const percurso = r.height - window.innerHeight;
      const bruto = percurso > 0 ? -r.top / percurso : 0;
      const p = Math.min(1, Math.max(0, (bruto - 0.1) / 0.8));
      if (p === ultimo) return;
      ultimo = p;

      const resta = total * (1 - p);
      cerebro.style.strokeDasharray = `${resta} ${total + 1}`;

      const q = cerebro.getPointAtLength(resta);
      const desce = Math.max(36, (fioY - q.y) * 0.6);
      // quando o ponto está à direita do encontro, o encontro anda junto, pra
      // linha não fazer gancho voltando pra esquerda
      const x = Math.max(saidaX, q.x + 50);
      saida.setAttribute(
        'd',
        `M${q.x} ${q.y}C${q.x} ${q.y + desce} ${x - 50} ${fioY} ${x} ${fioY}L4000 ${fioY}`,
      );
    };

    const pede = () => {
      if (!quadro) quadro = requestAnimationFrame(desenha);
    };

    desenha();
    window.addEventListener('scroll', pede, { passive: true });
    window.addEventListener('resize', pede);
    return () => {
      cancelAnimationFrame(quadro);
      window.removeEventListener('scroll', pede);
      window.removeEventListener('resize', pede);
    };
  }, [fioY, saidaX]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
