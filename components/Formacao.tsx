import FotoProfundidade from './FotoProfundidade';
import { qualificacoes, reconhecimentos } from '@/lib/dados';
import Secao from './Secao';
import s from './Formacao.module.css';

export default function Formacao() {
  return (
    <Secao
      id="formacao"
      etiqueta="Formação e reconhecimento"
      titulo="O que está registrado"
      fundo="palha"
    >
      <div className={s.grade}>
        <div>
          <h3 className={s.subtitulo}>Formação</h3>
          <ul className={s.qualificacoes}>
            {qualificacoes.map((item) => (
              // Sem o Ψ na frente de cada linha desde 13/09/2026: ele achou
              // infantil repetido dez vezes. O símbolo segue na marca d'água.
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h3 className={s.subtitulo}>Reconhecimento</h3>
          <ul className={s.reconhecimentos}>
            {reconhecimentos.map((item) => (
              <li key={item.titulo} className={s.reconhecimento}>
                <strong>{item.titulo}</strong>
                <span className={s.orgao}>{item.orgao}</span>
                <span className={s.detalhe}>{item.detalhe}</span>
              </li>
            ))}
          </ul>
        </div>

        {/*
          Mesmo tratamento da foto do "sobre mim" desde 13/09/2026: inclina em
          3D com o mouse, sombra em camadas, e fica parada enquanto a lista de
          formação rola ao lado.
        */}
        <figure className={s.figura}>
          <FotoProfundidade
            src="/img/mocao-camara-nova-iguacu.webp"
            alt={
              'Alexander Barnabés no plenário da Câmara Municipal de Nova ' +
              'Iguaçu, ao lado de um vereador, segurando a Moção emoldurada. ' +
              'Atrás deles, as letras Poder Legislativo na parede de madeira.'
            }
            largura={1400}
            altura={933}
            sizes="(max-width: 899px) 100vw, 48vw"
          />
          <figcaption className={s.legenda}>
            Recebendo a Moção de Congratulações e Aplausos no plenário da Câmara
            Municipal de Nova Iguaçu, processo nº 881/2023.
          </figcaption>
        </figure>
      </div>
    </Secao>
  );
}
