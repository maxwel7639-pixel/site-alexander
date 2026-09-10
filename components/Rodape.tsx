import Image from 'next/image';
import { atendimento, endereco, marca, profissional } from '@/lib/dados';
import s from './Rodape.module.css';

/**
 * O rodape.
 *
 * ============================ O QUE MUDOU E POR QUE =========================
 * Ele era quatro faixas empilhadas -- marca, duas colunas, aviso, creditos --
 * cada uma ocupando a largura toda e nenhuma usando mais que metade dela. Num
 * monitor largo isso virava uma coluna estreita de texto com um campo escuro
 * vazio do lado direito, e uma altura que nao se justificava.
 *
 * Agora sao duas faixas. Em cima, tres colunas na mesma linha: a marca, o
 * consultorio e o atendimento. Embaixo, o aviso a esquerda e os creditos a
 * direita, lado a lado em vez de um sobre o outro.
 *
 * O AVISO DO CVV NAO ENCOLHEU. Ele e a unica informacao aqui que pode importar
 * numa emergencia, e continua com o mesmo corpo e a mesma linha de leitura. O
 * que saiu foi espaco vazio, nao texto.
 */
export default function Rodape() {
  const ano = new Date().getFullYear();

  return (
    <footer className={`${s.rodape} sobreEscuro`}>
      <div className={s.interno}>
        <div className={s.topo}>
          {/*
            A coluna da marca ganhou uma segunda linha. O Psi e o nome
            continuam exatamente onde estavam, na mesma linha e no mesmo
            tamanho; abaixo deles entra o divã do cartao de visita dele.

            Aqui ele pode ser maior que no topo -- 132px -- porque o rodape tem
            espaco e nao tem pressa. Ainda assim nao passa disso: o desenho saiu
            de uma foto de cartao, e ampliado demais a serrilha do JPEG original
            comeca a aparecer na borda do traco.
          */}
          <div className={s.colunaMarca}>
            <div className={s.marca}>
              <Image
                src="/img/simbolo-psi.webp"
                alt=""
                width={52}
                height={52}
                className={s.logo}
              />
              <div>
                <p className={s.nome}>{profissional.nomeCompleto}</p>
                <p className={s.papel}>
                  {profissional.titulo} · {profissional.crp}
                </p>
              </div>
            </div>

            <Image
              src={marca.diva.src}
              alt=""
              width={marca.diva.largura}
              height={marca.diva.altura}
              sizes="132px"
              className={s.diva}
            />
          </div>

          <div>
            <h2 className={s.titulo}>Consultório</h2>
            <p className={s.texto}>
              {endereco.logradouro}
              <br />
              {endereco.bairro}, {endereco.cidade}, {endereco.estado}
              <br />
              CEP {endereco.cep}
              <br />
              {endereco.referencia}
            </p>
          </div>

          <div>
            <h2 className={s.titulo}>Atendimento</h2>
            <p className={s.texto}>
              {atendimento.horario}
              <br />
              {atendimento.modalidades}
              <br />
              {profissional.telefone}
            </p>
          </div>
        </div>

        <div className={s.base}>
          <p className={s.aviso}>
            Este site é informativo e não substitui uma consulta. Em situação de
            emergência, ligue para o CVV no 188, ligação gratuita e disponível 24
            horas, ou procure o serviço de saúde mais próximo.
          </p>

          <div className={s.creditos}>
            <p>
              © {ano} {profissional.nomeCompleto}. Todos os direitos reservados.
            </p>
            <p>
              Site feito por{' '}
              <a
                href="https://mxdigital.ia.br"
                target="_blank"
                rel="noopener"
                className={s.mx}
              >
                MX Digital
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
