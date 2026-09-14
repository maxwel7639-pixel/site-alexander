import Image from 'next/image';
import { atendimento, endereco, profissional } from '@/lib/dados';
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
 * consultorio e o atendimento. Embaixo, os creditos.
 *
 * Desde 13/09/2026, a pedido do Maxwel, sem o telefone (o botao de WhatsApp
 * ja esta no Contato e na barra fixa) e sem o aviso de que o site nao substitui
 * consulta, que citava o CVV.
 */
export default function Rodape() {
  const ano = new Date().getFullYear();

  return (
    <footer className={`${s.rodape} sobreEscuro`}>
      <div className={s.interno}>
        <div className={s.topo}>
          {/* O divã que ficava embaixo do nome subiu pro Contato em 13/09/2026. */}
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
          </div>

          <div>
            <h2 className={s.titulo}>Consultório</h2>
            <p className={s.texto}>
              {endereco.logradouro}, {endereco.sala}
              <br />
              {endereco.bairro}, {endereco.cidade}, {endereco.estado}
              <br />
              CEP {endereco.cep}
            </p>
          </div>

          <div>
            <h2 className={s.titulo}>Atendimento</h2>
            <p className={s.texto}>
              {atendimento.horario}
              <br />
              {atendimento.modalidades}
            </p>
          </div>
        </div>

        <div className={s.base}>
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
