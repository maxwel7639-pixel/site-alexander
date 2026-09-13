import Halo from './Halo';
import Secao from './Secao';
import { espaco } from '@/lib/dados';
import s from './Espaco.module.css';

/**
 * O espaco onde ele atende.
 *
 * ============================== POR QUE EXISTE ==============================
 * O site mostrava a fachada e um retrato na poltrona. Faltava a sala. Quem vai
 * a terapia pela primeira vez chega com uma pergunta que ninguem faz em voz
 * alta -- "como e la dentro?" -- e ela some quando a pessoa ja viu o lugar.
 *
 * ============================ O ANEL DE FOTOS ===============================
 * Desde 13/09/2026 as tres fotos giram no mesmo anel dos temas (Halo), em
 * tamanho menor, no lugar da foto grande com tira de miniaturas. A introducao
 * fica fixa ao lado, e embaixo dela troca a legenda da foto da frente.
 *
 * O anel e decoracao pra leitor de tela, entao a descricao de cada foto (o
 * `alt`) vai junto da legenda, escondida so da vista.
 */
export default function Espaco() {
  return (
    <Secao id="espaco" etiqueta="O espaço" titulo={espaco.titulo} fundo="claro">
      <Halo
        formato="paisagem"
        // tres fotos repetidas tres vezes: nove vagas enchem o anel sem que a
        // mesma foto apareca colada nela mesma
        repeticoes={3}
        sizes="(max-width: 899px) 160px, 220px"
        rotuloAnterior="Foto anterior"
        rotuloProximo="Próxima foto"
        cartas={espaco.fotos.map((foto) => ({ src: `/img/${foto.arquivo}` }))}
        antes={<p className={s.introducao}>{espaco.texto}</p>}
        paineis={espaco.fotos.map((foto) => (
          <p key={foto.arquivo} className={s.legenda}>
            {foto.legenda}
            <span className={s.soLeitor}> {foto.alt}</span>
          </p>
        ))}
      />
    </Secao>
  );
}
