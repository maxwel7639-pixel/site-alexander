import Secao from './Secao';
import { explicando } from '@/lib/dados';
import s from './Explicando.module.css';

/**
 * "Explicando": o que é a psicoterapia, no texto que o Alexander escreveu
 * (14/09/2026). Vem logo depois dos quatro sinais: quem acabou de se
 * reconhecer em um deles pergunta "e como funciona?" antes de ver a formação.
 */
export default function Explicando() {
  return (
    <Secao id="explicando" etiqueta="Explicando" titulo="O que é a psicoterapia" fundo="claro">
      <div className={s.texto}>
        {explicando.map((paragrafo) => (
          <p key={paragrafo.slice(0, 24)}>{paragrafo}</p>
        ))}
      </div>
    </Secao>
  );
}
