import { existsSync } from 'node:fs';
import path from 'node:path';
import { temas } from '@/lib/dados';
import HaloTemas from './HaloTemas';
import { Eco, Letreiro } from './Letreiro';
import s from './Temas.module.css';

/**
 * Os temas que aparecem com mais frequência.
 *
 * Desde 13/09/2026 abre com o mesmo letreiro de Serviços, agora com a palavra
 * "Psicologia", e os temas giram num anel de cartões (HaloTemas) em vez da
 * grade de três colunas. Pedido do Maxwel, com a referência do Halo Reel.
 *
 * As fotos dos cartões ainda não chegaram: cada tema já tem o nome do arquivo
 * em lib/dados.ts, e o cartão só usa a foto quando ela existe em
 * public/img/temas. Sem ela, o cartão mostra o nome do tema.
 */
export default function Temas() {
  return (
    <section id="temas" aria-labelledby="temas-titulo" className={s.temas}>
      <Eco palavra="psicologia" className={s.eco} />

      <div className={s.interno}>
        <Letreiro
          id="temas-titulo"
          etiqueta="Áreas de atendimento"
          faixa="Os assuntos que aparecem com mais frequência"
          palavra="Psicologia"
        >
          Alguns dos temas mais presentes no consultório. Se o que você está
          vivendo não aparece aqui, ainda assim vale conversar.
        </Letreiro>

        <HaloTemas
          itens={temas.map((tema) => ({
            ...tema,
            temFoto: existsSync(path.join(process.cwd(), 'public', 'img', 'temas', tema.imagem)),
          }))}
        />
      </div>
    </section>
  );
}
