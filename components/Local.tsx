import { atendimento, endereco } from '@/lib/dados';
import Secao from './Secao';
import { IconeLocal, IconeRelogio } from './Icones';
import s from './Local.module.css';

/**
 * Onde fica.
 *
 * Refeita em 13/09/2026 a pedido dele. A versão anterior abria com "quem chega
 * de ônibus procura o prédio, não o número" e mostrava a fachada do
 * laboratório vizinho. Ele apontou o erro de leitura do público: quem faz
 * terapia com ele chega de carro ou de Uber, e aplicativo precisa do número.
 *
 * Agora é o endereço, o horário, dois caminhos (Google Maps e Uber) e o mapa.
 * O mapa substitui a foto da fachada: mostra onde é sem associar o consultório
 * à marca de outro negócio.
 */
export default function Local() {
  return (
    <Secao
      id="local"
      etiqueta="Onde fica"
      titulo="No Centro de Nova Iguaçu"
      fundo="palha"
    >
      <div className={s.grade}>
        <div>
          <p className={s.aviso}>
            O consultório fica no Centro de Nova Iguaçu, com acesso fácil de
            carro, de aplicativo ou de transporte público.
          </p>

          <address className={s.endereco}>
            <p className={s.linha}>
              <IconeLocal className={s.icone} />
              <span>
                {endereco.logradouro}, {endereco.sala}
                <br />
                {endereco.bairro}, {endereco.cidade}, {endereco.estado}
                <br />
                CEP {endereco.cep}
              </span>
            </p>
            <p className={s.linha}>
              <IconeRelogio className={s.icone} />
              <span>
                {atendimento.horario}
                <br />
                {atendimento.modalidades}
              </span>
            </p>
          </address>

          <div className={s.acoes}>
            <a
              href={endereco.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={s.mapa}
            >
              Abrir no Google Maps
            </a>
            <a
              href={endereco.uberUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={s.mapa}
            >
              Ir de Uber
            </a>
          </div>
        </div>

        <div className={s.moldura}>
          <iframe
            src={endereco.mapsEmbed}
            title={`Mapa: ${endereco.logradouro}, ${endereco.bairro}, ${endereco.cidade}`}
            className={s.mapaEmbutido}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </Secao>
  );
}
