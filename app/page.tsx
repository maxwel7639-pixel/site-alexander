import Abertura from '@/components/Abertura';
import BarraFixa from '@/components/BarraFixa';
import Cabecalho from '@/components/Cabecalho';
import ComoTrabalha from '@/components/ComoTrabalha';
import Contato from '@/components/Contato';
import Depoimentos from '@/components/Depoimentos';
import Espaco from '@/components/Espaco';
import Formacao from '@/components/Formacao';
import Local from '@/components/Local';
import QuandoProcurar from '@/components/QuandoProcurar';
import Rodape from '@/components/Rodape';
import Temas from '@/components/Temas';

export default function Pagina() {
  return (
    <>
      <Cabecalho />
      <main id="conteudo">
        <Abertura />
        <ComoTrabalha />
        <Temas />
        <QuandoProcurar />
        <Formacao />
        <Depoimentos />
        {/*
          Entre o depoimento e o endereco, de proposito. A pessoa acabou de ler
          alguem dizendo que foi bem atendido; a pergunta seguinte e "e como e
          la?", e so depois vem "como eu chego".
        */}
        <Espaco />
        <Local />
        <Contato />
      </main>
      <Rodape />
      <BarraFixa />
    </>
  );
}
