import { temas } from '@/lib/dados';
import Secao from './Secao';
import s from './Temas.module.css';

export default function Temas() {
  return (
    <Secao
      id="temas"
      etiqueta="O que ele atende"
      titulo="Os assuntos que aparecem com mais frequência"
    >
      <p className={s.introducao}>
        Estes são os temas sobre os quais ele já escreve e publica. Se o seu não
        estiver aqui, ainda assim vale conversar.
      </p>

      <ul className={s.grade}>
        {temas.map((tema) => (
          <li key={tema.titulo} className={s.cartao}>
            <h3 className={s.titulo}>{tema.titulo}</h3>
            <p className={s.texto}>{tema.texto}</p>
          </li>
        ))}
      </ul>
    </Secao>
  );
}
