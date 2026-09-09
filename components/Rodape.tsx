import Image from 'next/image';
import { atendimento, endereco, profissional } from '@/lib/dados';
import s from './Rodape.module.css';

export default function Rodape() {
  const ano = new Date().getFullYear();

  return (
    <footer className={`${s.rodape} sobreEscuro`}>
      <div className={s.interno}>
        <div className={s.marca}>
          <Image
            src="/img/simbolo-psi.webp"
            alt=""
            width={56}
            height={56}
            className={s.logo}
          />
          <div>
            <p className={s.nome}>{profissional.nomeCompleto}</p>
            <p className={s.papel}>
              {profissional.titulo} · {profissional.crp}
            </p>
          </div>
        </div>

        <div className={s.colunas}>
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

        <p className={s.aviso}>
          Este site é informativo e não substitui uma consulta. Em situação de
          emergência, ligue para o CVV no 188, ligação gratuita e disponível 24
          horas, ou procure o serviço de saúde mais próximo.
        </p>

        <p className={s.creditos}>
          © {ano} {profissional.nomeCompleto}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
