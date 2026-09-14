import FotoProfundidade from './FotoProfundidade';
import Secao from './Secao';
import { sobre } from '@/lib/dados';
import s from './ComoTrabalha.module.css';

export default function ComoTrabalha() {
  return (
    <Secao
      id="atendimento"
      etiqueta="Sobre mim"
      titulo="Quem vai te escutar"
      fundo="palha"
      lateral={
        /*
          O retrato que estava na abertura, desde 13/09/2026. A foto anterior
          tinha o fundo refeito no ChatGPT e saiu: a MX não edita foto do
          cliente com IA (fica artificial e mostra uma sala que não é a dele).

          Aparece INTEIRA e fica AO LADO do título, parada enquanto o texto
          rola. Ver a prop `lateral` em Secao.tsx.
        */
        <figure className={s.figura}>
          <FotoProfundidade
            src="/img/alexander-barnabes-retrato.webp"
            alt={
              'Alexander Barnabés sentado em um sofá, de blazer branco e ' +
              'calça mostarda, com a mão no queixo, olhando para a câmera.'
            }
            largura={1296}
            altura={864}
            sizes="(max-width: 899px) 100vw, 56vw"
            // Sem foto na abertura, esta é a maior imagem da primeira tela no
            // desktop: o Next aponta ela como LCP.
            preload
          />
        </figure>
      }
    >
      <div className={s.texto}>
        {/* O texto mora em lib/dados.ts, com a explicacao de por que ele
            nao foi copiado do site de referencia. E a unica secao do site em
            primeira pessoa: aqui quem fala e ele. */}
        {sobre.map((paragrafo) => (
          <p key={paragrafo.slice(0, 24)}>{paragrafo}</p>
        ))}

        <ul className={s.formatos}>
          <li>Individual</li>
          <li>Casal</li>
          <li>Familiar</li>
          <li>Online</li>
        </ul>
      </div>
    </Secao>
  );
}
