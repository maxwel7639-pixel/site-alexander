import { depoimentos } from '@/lib/dados';
import Secao from './Secao';
import { IconeEstrela } from './Icones';
import s from './Depoimentos.module.css';

function Estrelas() {
  return (
    <span className={s.estrelas} role="img" aria-label="Cinco estrelas de cinco">
      {[0, 1, 2, 3, 4].map((i) => (
        <IconeEstrela key={i} />
      ))}
    </span>
  );
}

export default function Depoimentos() {
  return (
    <Secao
      id="depoimentos"
      etiqueta="Depoimentos"
      titulo="O que pacientes escreveram"
    >
      <p className={s.introducao}>
        Avaliações públicas deixadas por pacientes no perfil dele no Google,
        transcritas sem alteração.
      </p>

      <ul className={s.grade}>
        {depoimentos.map((depoimento) => (
          <li key={depoimento.nome} className={s.cartao}>
            <figure className={s.figura}>
              <Estrelas />
              <blockquote className={s.citacao}>
                <p>{depoimento.texto}</p>
              </blockquote>
              <figcaption className={s.autor}>{depoimento.nome}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Secao>
  );
}
