// Conteudo real do Alexander, levantado em 08/09/2026 a partir do material
// que ele mandou. Nada aqui e inventado. O que falta esta marcado com TODO.

/*
 * ================= ESTE ENDERECO NAO E COSMETICO ==========================
 * Ele manda no canonical, no og:image, no @id e no `url` do JSON-LD, no
 * sitemap.xml e na linha de Sitemap do robots.txt. Errado, todos apontam pro
 * lugar errado ao mesmo tempo.
 *
 * E estava errado. Ate 09/09/2026 ele dizia `site-alexander.vercel.app`, que
 * NAO E DESTE PROJETO: aquele subdominio ja pertence a outra conta da Vercel e
 * serve um curso de edicao de video. O nome estava tomado, entao a Vercel deu
 * a este projeto o sufixo `-mu`.
 *
 * O estrago, medido: /og-image.jpg naquele dominio devolvia 404, ou seja
 * nenhum link deste site abria com imagem no WhatsApp; e o canonical, o @id e
 * o sitemap declaravam ao Google um dominio de terceiro.
 *
 * PENDENTE: dominio proprio. `.vercel.app` num site de profissional de saude
 * e fraco pra confianca e pra busca local, e o dia em que ele comprar um, esta
 * linha e a unica que muda.
 * ========================================================================== */
export const SITE_URL = 'https://site-alexander-mu.vercel.app';

export const profissional = {
  nome: 'Alexander Barnabés',
  nomeCompleto: 'Alexander de Paula Barnabés',
  titulo: 'Psicólogo e Psicanalista',
  crp: 'CRP 05/55353',
  telefone: '(21) 96498-3557',
  telefoneE164: '+5521964983557',
  email: 'drbarnabess@hotmail.com',
  instagram: 'https://instagram.com/psicologoalexanderbarnabes',
  instagramHandle: '@psicologoalexanderbarnabes',
};

/*
 * A MARCA DELE, os arquivos que vieram em 09/09/2026.
 *
 * `logo-psi.jpg` e o Psi dourado sobre grafite com o nome completo. E de onde
 * saiu o valor do --grafite e, desde 09/09, o do --tiara: os dois foram
 * amostrados pixel a pixel nesse arquivo.
 *
 * `diva.png` e o divã do cartao de visita, ja recortado e com o fundo branco
 * removido -- 1348x712 com canal alfa, tinta em #9d9876, um caqui esverdeado
 * que e praticamente a Folha de Mate da paleta dele. Sobre o --grafite ele da
 * 5,18:1, entao aparece sem precisar de brilho nem de sombra.
 *
 * `cartao-diva.jpg` NAO ENTRA NA PAGINA e nao esta declarado aqui de
 * proposito: e o cartao inteiro, com e-mail, telefone e endereco queimados na
 * imagem. Publicar o cartao seria publicar dado de contato num formato que
 * ninguem consegue corrigir depois. Ele fica no repositorio so como
 * referencia de onde o divã foi recortado.
 */
export const marca = {
  diva: {
    src: '/marca/diva.png',
    largura: 1348,
    altura: 712,
  },
};

const mensagemWhatsApp =
  'Oi, vim pelo site e gostaria de agendar uma consulta.';

/** Monta o link do WhatsApp com um texto ja escrito na caixa de mensagem. */
export const whatsappCom = (mensagem: string) =>
  `https://wa.me/5521964983557?text=${encodeURIComponent(mensagem)}`;

export const whatsappUrl = whatsappCom(mensagemWhatsApp);

export const endereco = {
  // PENDENCIA: o numero da sala tem tres versoes no material dele.
  // Cartao de visita impresso e contrato MX-0908 dizem Sala 605.
  // Post de contato mais recente diz sala 704.
  // Post "onde estamos" nao traz sala nenhuma.
  // Decisao de 08/09/2026: publicar so a rua ate ele confirmar, porque
  // endereco errado manda paciente pra porta errada.
  // TODO: confirmar a sala com o Alexander e acrescentar aqui.
  logradouro: 'Rua Coronel Francisco Soares, 71',
  bairro: 'Centro',
  cidade: 'Nova Iguaçu',
  estado: 'RJ',
  cep: '26220-030',
  referencia: 'Prédio do Laboratório Dr. Emerson',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Rua+Coronel+Francisco+Soares%2C+71%2C+Centro%2C+Nova+Igua%C3%A7u%2C+RJ%2C+26220-030',
};

export const atendimento = {
  horario: 'Segunda a sexta, das 7h às 19h',
  horarioCurto: '7h às 19h',
  // 'Baixada Fluminense' estava em `keywords` e em `areaServed` do JSON-LD e
  // aparecia ZERO vez no texto da página. Pela regra que o próprio projeto
  // escreveu, palavra que promete o que o texto não entrega não ajuda. Agora
  // a região é dita onde ela é verdade, e esta linha aparece em três lugares:
  // a seção de local, o rodapé e o `additionalProperty` dos dados estruturados.
  modalidades: 'Presencial em Nova Iguaçu, Baixada Fluminense, e online',
};

/*
 * ===================== SERVICO NAO E TEMA, E NAO E CANAL ====================
 * Pedido dele em 09/09/2026: "acrescentar em algum lugar Coaching de
 * relacionamentos e Consultorias".
 *
 * Nao cabia em `temas`, que e o que DOI em quem procura -- escrito na voz de
 * quem sente. E nao cabia em `atendimento.modalidades`, que ate aqui era o
 * unico lugar do site onde algo parecido com oferta aparecia, e que na verdade
 * diz CANAL ("presencial e online"), nao servico.
 *
 * Entao virou lista propria: o que ele faz, dito na terceira pessoa e em uma
 * frase cada.
 *
 * ========================= O QUE NAO ENTRA NESTAS FRASES ====================
 * Preco, duracao, numero de sessoes e qualquer promessa de resultado. Ele nao
 * disse nada disso, e promessa de resultado em site de profissional de saude e
 * assunto de conselho profissional, nao de copy.
 *
 * PENDENCIA: as duas primeiras frases sao remontagem do que o material dele ja
 * afirma. As duas ultimas descrevem apenas o que as palavras "coaching de
 * relacionamentos" e "consultorias" significam -- ele mandou os dois nomes e
 * mais nada. TODO: pedir a ele uma linha sobre cada um.
 */
export const servicos = [
  {
    titulo: 'Psicoterapia individual',
    texto:
      'Um espaço próprio, conduzido pela psicanálise ou pela psicoterapia ' +
      'breve, conforme o que a pessoa traz e o tempo de que dispõe.',
  },
  {
    titulo: 'Terapia de casal',
    texto:
      'Os dois na mesma sala, com alguém de fora para mediar a conversa que ' +
      'em casa não anda.',
  },
  {
    titulo: 'Coaching de relacionamentos',
    texto:
      'Um acompanhamento voltado a objetivos combinados na vida afetiva. ' +
      'É outro formato de trabalho, e não substitui a psicoterapia.',
  },
  {
    titulo: 'Consultorias',
    texto:
      'Uma conversa profissional sobre uma questão específica, para quem ' +
      'procura orientação pontual e não um processo de terapia.',
  },
];

// Os temas vem dos posts que ele mesmo ja escreveu. Nenhum foi acrescentado.
export const temas = [
  {
    titulo: 'Ansiedade',
    texto:
      'Quando a preocupação passa a ocupar o dia inteiro e o corpo não desliga.',
  },
  {
    titulo: 'Depressão',
    texto:
      'Tristeza profunda que se prolonga, com perda de interesse pelo que antes dava prazer.',
  },
  /*
   * Este e o unico tema que NAO saiu de um post dele: veio do pedido de
   * 09/09/2026 para acrescentar a especialidade em alcool e outras drogas.
   *
   * Entra aqui em terceiro, colado na Depressao, e nao no fim da lista: os
   * temas vao do mais pesado ao mais leve, e chegar depois de "aprender a
   * dizer nao" faria dele um adendo.
   *
   * A PALAVRA "VICIO" NAO APARECE, e a frase nao acusa ninguem. Ele atendeu no
   * servico publico de saude mental, onde a pessoa costuma chegar depois de
   * muita gente ja ter dito o que ela e. A frase descreve o que a pessoa
   * sente, no lugar de nomear o que ela tem.
   */
  {
    titulo: 'Álcool e outras drogas',
    texto:
      'Quando a bebida ou outra substância passa a ocupar espaço demais no ' +
      'dia, e tentar parar sozinho não tem dado certo.',
  },
  {
    titulo: 'Relacionamentos',
    texto:
      'Conflitos que se repetem, frustração recorrente e distância de quem está perto.',
  },
  {
    titulo: 'Terapia de casal',
    texto:
      'Um espaço para os dois falarem e serem ouvidos, com alguém de fora mediando.',
  },
  {
    titulo: 'Procrastinação',
    texto:
      'Adiar o que precisa ser feito e conviver com a cobrança que vem depois.',
  },
  {
    titulo: 'Decisões difíceis',
    texto:
      'Momentos de escolha em que pensar junto com alguém ajuda a enxergar melhor.',
  },
  {
    titulo: 'Aprender a dizer não',
    texto:
      'Colocar limites sem se sentir culpado por isso.',
  },
];

/*
 * Os quatro sinais, transcritos exatamente como ele publica no card dele.
 *
 * ===================== CADA UM LEVA A PROPRIA MENSAGEM ======================
 * Desde 09/09/2026 eles nao sao mais uma lista pra ler: cada um e um link que
 * abre o WhatsApp com o assunto JA ESCRITO. A ideia e do Maxwel, e ela resolve
 * as duas pontas de uma vez.
 *
 * Do lado de quem chega: a parte mais dificil de procurar um psicologo nao e
 * achar o numero, e escrever a primeira frase. Aqui ela ja vem pronta, e a
 * pessoa so precisa apertar enviar.
 *
 * Do lado dele: a conversa comeca sabendo do que se trata, em vez de um "oi"
 * seco que exige tres mensagens ate chegar no assunto.
 *
 * ============================ COMO O TEXTO E ESCRITO ========================
 * PRIMEIRA PESSOA, e com as palavras dela e nao com as do card. "Voce nao
 * consegue superar uma tristeza" e uma frase que ele diz SOBRE alguem; ninguem
 * manda isso pra si mesmo. Vira "tem uma tristeza que eu nao estou conseguindo
 * superar".
 *
 * E nenhuma delas afirma diagnostico nem pede consulta: todas terminam em
 * "queria conversar sobre isso". Quem esta mal precisa de uma porta, nao de um
 * compromisso assinado antes de falar.
 */
export const sinais = [
  {
    texto: 'Você não consegue superar uma tristeza',
    mensagem:
      'Oi. Vim pelo site. Tem uma tristeza que eu não estou conseguindo ' +
      'superar e queria conversar sobre isso.',
  },
  {
    texto: 'Você está constantemente desanimado',
    mensagem:
      'Oi. Vim pelo site. Ando desanimado o tempo todo e queria conversar ' +
      'sobre isso.',
  },
  {
    texto: 'Você deseja tomar uma decisão importante',
    mensagem:
      'Oi. Vim pelo site. Preciso tomar uma decisão importante e queria ' +
      'conversar sobre isso.',
  },
  {
    texto: 'Você está enfrentando dificuldades nos relacionamentos',
    mensagem:
      'Oi. Vim pelo site. Estou enfrentando dificuldades nos meus ' +
      'relacionamentos e queria conversar sobre isso.',
  },
];

// PENDENCIA resolvida em 08/09/2026: ele tem dois cards com listas que nao
// batem. Um traz Teologo, Coaching e PNL, o outro traz Hipnologo. Publicamos
// apenas o que aparece nas DUAS listas, para nao criar uma terceira versao.
// TODO: quando ele disser qual lista vale, acrescentar os itens que faltam.
// A ultima entrou em 09/09/2026, dita por ele: "na area de atuacao acrescentar
// especialidade em alcool e outras drogas". Nao veio de card nenhum, veio dele.
export const qualificacoes = [
  'Psicólogo',
  'Psicanalista',
  'Professor de Psicanálise',
  'Especializado em Psicoterapia Breve',
  'Especialista em álcool e outras drogas',
  'Técnico em Saúde Mental',
];

/*
 * ONDE ELE JA ATUOU. Lista nova, e separada das qualificacoes de proposito:
 * uma credencial e o que ele E hoje, e um servico onde ele trabalhou e o que
 * ele FEZ. Misturar os dois numa lista so faria o CAPS-AD parecer um diploma.
 *
 * O texto esta no passado porque e passado. Ele mandou o nome e o lugar, e nao
 * mandou o periodo -- entao "atuou" e o mais preciso que da pra dizer sem
 * inventar data. TODO: pedir os anos a ele.
 */
export const experiencia = [
  {
    titulo: 'Atuou no CAPS-AD Vanderlei Marins',
    // Grafia copiada da mensagem dele, entre parenteses, sem corrigir para
    // o nome oficial do servico: quem nomeia onde trabalhou e ele.
    orgao: 'Centro de Atenção Psicossocial de Álcool e outras drogas',
    detalhe: 'Austin, Nova Iguaçu (RJ). Serviço público de saúde mental.',
  },
];

export const reconhecimentos = [
  {
    titulo: 'Moção de Congratulações e Aplausos',
    orgao: 'Câmara Municipal de Nova Iguaçu',
    detalhe:
      'Processo nº 881/2023, por indicação do vereador Maurício Morais Lopes.',
  },
  {
    titulo: 'Certificado de Qualidade 2025',
    orgao: 'Otimiza Pesquisas',
    detalhe:
      'Categoria Psicólogo e Psicanalista, Nova Iguaçu, Rio de Janeiro.',
    // TODO: o arquivo que veio nomeado como certificado e, na verdade, a foto
    // do verso do cartao de visita. Pedir ao Alexander a foto do certificado.
  },
];

// Comentarios publicos do perfil dele no Google, republicados por ele no
// Instagram. Transcritos sem alteracao. Publicacao autorizada em 08/09/2026.
export const depoimentos = [
  {
    nome: 'Niuan Lucas',
    texto:
      'Excelente profissional, super recomendo. Estava passando por um momento muito difícil e o psicólogo Alexander me acolheu e ajudou a resolver a situação.',
  },
  {
    nome: 'Francisco Xavier',
    texto:
      'Sou extremamente grato ao suporte que o dr. meu deu quando mais precisei. Foram meses difíceis e intensos de terapia, mas que eu pudesse entender e alcançar a paz. Gratidão eterna a esse grande homem.',
  },
];

/*
 * As fotos da sala, enviadas por ele em 09/09/2026.
 *
 * Vieram onze; ficaram TRES. Havia cinco do mesmo canto com pequenas variacoes
 * de enquadramento -- galeria com cinco versoes da mesma vista nao mostra cinco
 * coisas, mostra uma cinco vezes. Ficaram fora tambem a da escrivaninha, onde a
 * mesa cheia e a cadeira de escritorio contam uma historia de trabalho e nao de
 * escuta, e a da sala de espera, com luz chapada e um tapete de exercicio no
 * chao.
 *
 * O texto nao promete nada sobre o atendimento, so descreve o lugar: e o que o
 * Conselho pede e e o que a pessoa quer saber.
 */
export const espaco = {
  titulo: 'Onde a conversa acontece',
  texto:
    'Uma sala com janela, no Centro de Nova Iguaçu. Poltrona, sofá, planta e ' +
    'estante, e não o consultório branco que costuma vir à cabeça. Ver o lugar ' +
    'antes de entrar nele tira uma dúvida a menos de quem vai pela primeira vez.',
  fotos: [
    {
      arquivo: 'espaco-1-poltrona.webp',
      legenda: 'A poltrona e a janela, com a luz da manhã.',
      alt:
        'Sala de atendimento com poltrona estampada à esquerda, sofá à ' +
        'direita, tapete escuro no centro e uma janela ampla ao fundo com ' +
        'plantas no parapeito.',
    },
    {
      arquivo: 'espaco-2-sala.webp',
      legenda: 'A sala inteira, vista de quem entra.',
      alt:
        'A mesma sala vista da porta: prateleira de livros no alto, quadros ' +
        'na parede da direita, mesas de apoio e o sofá em primeiro plano.',
    },
    {
      arquivo: 'espaco-3-balcao.webp',
      legenda: 'O balcão ao fundo e a profundidade da sala.',
      alt:
        'Vista da sala em direção ao balcão de madeira ao fundo, com plantas ' +
        'altas, mesa de apoio redonda e uma almofada amarela sobre o sofá.',
    },
  ],
};

export const navegacao = [
  { href: '#atendimento', label: 'Atendimento' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#temas', label: 'Temas' },
  { href: '#formacao', label: 'Formação' },
  { href: '#espaco', label: 'O espaço' },
  { href: '#local', label: 'Onde fica' },
  { href: '#contato', label: 'Contato' },
];
