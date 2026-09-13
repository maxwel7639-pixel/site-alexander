import { servicos } from '@/lib/dados';
import s from './Faixa.module.css';

/**
 * A faixa que rola entre a abertura e o "sobre mim". Pedido do Maxwel em
 * 13/09/2026: uma faixa que escorre de lado, sem fim.
 *
 * O conteúdo é o que ele atende, tirado de `servicos`, mais onde atende. Não
 * é slogan nem promessa: é a mesma informação da página, dita de passagem,
 * pra quem rola rápido pegar o essencial sem parar.
 *
 * COMO O "SEM FIM" FUNCIONA: a lista aparece duas vezes seguidas, e o trilho
 * anda exatamente metade da própria largura. Quando a segunda cópia chega onde
 * a primeira começou, a animação recomeça e o olho não vê o salto. A segunda
 * cópia é `aria-hidden`: leitor de tela lê a lista uma vez só.
 *
 * Para no hover (quem quer ler, lê) e não anda com `prefers-reduced-motion`.
 */
const itens = [...servicos.map((servico) => servico.titulo), 'Presencial em Nova Iguaçu', 'Online'];

export default function Faixa() {
  return (
    <div className={s.faixa} role="region" aria-label="Formas de atendimento">
      <div className={s.trilho}>
        {[0, 1].map((copia) => (
          <ul key={copia} className={s.lista} aria-hidden={copia === 1 ? true : undefined}>
            {itens.map((item) => (
              <li key={item} className={s.item}>
                <span>{item}</span>
                <span className={s.separador} aria-hidden="true">Ψ</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
