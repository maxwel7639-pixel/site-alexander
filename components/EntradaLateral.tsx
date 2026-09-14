'use client';

import { useEffect, useRef } from 'react';

type Props = {
  className?: string;
  children: React.ReactNode;
};

/**
 * Uma lista cujos itens entram de fora pra dentro conforme a página rola: os
 * da coluna da esquerda vêm da esquerda, os da direita vêm da direita. Pedido
 * do Maxwel em 13/09/2026 pros quatro sinais.
 *
 * PRESO À ROLAGEM, NÃO DISPARADO UMA VEZ: a posição de cada item sai de quanto
 * ele já subiu na tela. Rolando de volta, ele volta pra fora.
 *
 * O MOVIMENTO VAI NO <li>, NÃO NO CARTÃO: o cartão tem `transition` no
 * transform por causa do hover, e um transform escrito a cada quadro com
 * transição por cima fica atrasado em relação à rolagem.
 *
 * O EFEITO ENTRA PELO JS. O servidor entrega a lista parada e visível; sem JS,
 * ou com prefers-reduced-motion, os cartões simplesmente estão lá.
 */
export default function EntradaLateral({ className, children }: Props) {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const lista = ref.current;
    if (!lista || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const itens = Array.from(lista.children) as HTMLElement[];
    let quadro = 0;

    const desenha = () => {
      quadro = 0;
      const alturaTela = window.innerHeight;
      const largura = Math.min(window.innerWidth * 0.6, 520);
      // em duas colunas o lado sai da coluna; numa só, alterna
      const colunas = getComputedStyle(lista).gridTemplateColumns.split(' ').length;

      itens.forEach((item, i) => {
        const topo = item.getBoundingClientRect().top;
        // começa a entrar quando o topo aparece embaixo da tela, e chega no
        // lugar quando o topo passa de 55% da altura
        const p = Math.min(1, Math.max(0, (alturaTela - topo) / (alturaTela * 0.45)));
        const suave = 1 - Math.pow(1 - p, 3);
        const lado = colunas > 1 ? (i % colunas === 0 ? -1 : 1) : i % 2 === 0 ? -1 : 1;
        item.style.transform = `translate3d(${((1 - suave) * lado * largura).toFixed(1)}px, 0, 0)`;
        item.style.opacity = (0.1 + 0.9 * suave).toFixed(3);
      });
    };

    const pede = () => {
      if (!quadro) quadro = requestAnimationFrame(desenha);
    };

    itens.forEach((item) => (item.style.willChange = 'transform, opacity'));
    desenha();
    window.addEventListener('scroll', pede, { passive: true });
    window.addEventListener('resize', pede);
    return () => {
      cancelAnimationFrame(quadro);
      window.removeEventListener('scroll', pede);
      window.removeEventListener('resize', pede);
      itens.forEach((item) => {
        item.style.transform = '';
        item.style.opacity = '';
        item.style.willChange = '';
      });
    };
  }, []);

  return (
    <ul ref={ref} className={className}>
      {children}
    </ul>
  );
}
