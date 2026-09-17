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
 * RESOLVIDO em 17/09/2026: dominio proprio no ar, e esta linha foi mesmo a
 * unica que mudou. Com `www` de proposito -- e o que a Vercel serve com 200;
 * `alexander.inf.br` sem www devolve 308 pra ca. Canonical tem que apontar pro
 * endereco que responde, nao pro que redireciona, senao o Google recebe uma
 * indirecao a toa em cada pagina.
 *
 * O `.vercel.app` antigo continua respondendo e nao foi removido do projeto:
 * link velho ja compartilhado no WhatsApp segue abrindo.
 * ========================================================================== */
export const SITE_URL = 'https://www.alexander.inf.br';

export const profissional = {
  nome: 'Alexander Barnabés',
  nomeCompleto: 'Alexander de Paula Barnabés',
  titulo: 'Psicólogo e Psicanalista',
  // A especialidade em álcool e outras drogas saiu da abertura em 14/09/2026,
  // pedido dele por escrito ("retire do topo"). Continua na formação e no
  // "sobre mim", junto do CAPSad.
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
// Desde 13/09/2026 o divã não aparece em lugar nenhum do site: saiu do rodapé
// (foi pro Contato e depois virou o livro com o Ψ) e saiu da pílula do topo. O
// dado fica aqui pra quando ele voltar a ser usado.
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
  // RESOLVIDO em 11/09/2026, por audio dele: "a sala hoje e 605".
  // O post que dizia 704 e antigo -- ele estava naquela sala quando publicou.
  // As tres versoes que existiam no material: cartao impresso e contrato
  // MX-0908 diziam 605, um post dizia 704, e o post "onde estamos" nao dizia
  // sala nenhuma. Ficou o que ele confirmou agora.
  logradouro: 'Rua Coronel Francisco Soares, 71',
  sala: 'Sala 605',
  bairro: 'Centro',
  cidade: 'Nova Iguaçu',
  estado: 'RJ',
  cep: '26220-030',
  // SEM "Prédio do Laboratório Dr. Emerson" desde 13/09/2026, a pedido dele:
  // "é colocado diversas vezes no endereço... vamos colocar o endereço
  // normal". E o argumento dele é bom: o público chega de carro ou de Uber, e
  // aplicativo precisa do número, não do letreiro do vizinho.
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Rua+Coronel+Francisco+Soares%2C+71%2C+Centro%2C+Nova+Igua%C3%A7u%2C+RJ%2C+26220-030',
  // O mapa embutido não precisa de chave: é o mesmo endereço em modo embed.
  mapsEmbed:
    'https://www.google.com/maps?q=Rua+Coronel+Francisco+Soares%2C+71%2C+Centro%2C+Nova+Igua%C3%A7u%2C+RJ&output=embed',
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
 * As frases foram conferidas por ele em 11/09/2026. A de Consultorias ganhou o
 * publico, que era a duvida: ele confirmou que atende "pessoa fisica, empresa,
 * escola ou outro profissional". As demais ele leu e aprovou como estavam.
 *
 * Atendimento familiar entrou na mesma conversa, a pedido dele. Ja aparecia em
 * "como ele trabalha" e nao estava na lista de servicos, porque no cartao de
 * visita ele nao constava.
 */
/*
 * IMAGEM POR SERVICO, pedido dele em 13/09/2026 (itens 2 e 12): "quando citar
 * terapia individual e outras coloque uma figura... só para ilustrar". Casal:
 * "um discutindo com o outro, ou virado um para o lado na cama". Coaching: uma
 * palestra, que ele pode mandar dele mesmo.
 *
 * `imagem` é o nome do arquivo em /public/img/servicos/. O componente confere,
 * na hora do build, se o arquivo existe: enquanto não existe, o cartão mostra
 * um quadro tonal com o Ψ no lugar da foto. Dá pra subir uma de cada vez sem
 * deixar cartão quebrado no ar -- é só salvar com o nome que está aqui. Foto de banco de imagem com licença de uso livre, ou
 * dele; nunca rosto de paciente.
 */
export const servicos: { titulo: string; texto: string; imagem?: string; alt?: string }[] = [
  {
    titulo: 'Psicoterapia individual',
    imagem: 'psicoterapia-individual.webp',
    alt: 'Mulher recostada numa poltrona, de olhos fechados, enquanto quem conduz a sessão faz anotações.',
    texto:
      'Um espaço próprio, conduzido pela psicanálise ou pela psicoterapia ' +
      'breve, conforme o que a pessoa traz e o tempo de que dispõe.',
  },
  {
    titulo: 'Terapia de casal',
    imagem: 'terapia-de-casal.webp',
    alt: 'Casal sentado no sofá durante a sessão, com quem conduz a conversa anotando em primeiro plano.',
    texto:
      'Os dois na mesma sala, com alguém de fora para mediar a conversa que ' +
      'em casa não anda.',
  },
  {
    titulo: 'Coaching de relacionamentos',
    imagem: 'coaching-de-relacionamentos.webp',
    alt: 'Casal de idosos caminhando de braços dados na praia, sob o título relacionamento amoroso.',
    texto:
      'Um acompanhamento voltado a objetivos combinados na vida afetiva. ' +
      'É outro formato de trabalho, e não substitui a psicoterapia.',
  },
  {
    titulo: 'Consultorias',
    imagem: 'consultorias.webp',
    alt: 'Duas poltronas e uma mesinha diante de uma parede com silhuetas de rosto e o símbolo da psicologia.',
    texto:
      'Uma conversa profissional sobre uma questão específica, para quem ' +
      'procura orientação pontual e não um processo de terapia. Atende ' +
      'pessoa física, empresa, escola e outros profissionais.',
  },
  {
    titulo: 'Atendimento familiar',
    imagem: 'atendimento-familiar.webp',
    alt: 'Família sentada no sofá conversando com quem conduz o atendimento.',
    texto:
      'A família na mesma sala, quando o que precisa ser dito envolve mais ' +
      'de duas pessoas.',
  },
];

/*
 * ============================ O "SOBRE MIM" ================================
 * Pedido dele em 11/09/2026, por audio: queria um texto na primeira pessoa,
 * como o de um site de outro psicologo que ele mandou de referencia, e
 * sugeriu "copiar aquela fala dele colocando o meu nome".
 *
 * NAO FOI COPIADO, e isso e deliberado. Texto de outro profissional descreve a
 * trajetoria de outro profissional -- num site com CRP visivel, passa a
 * afirmar sobre o Alexander coisas que nao sao dele. E nao precisava: o
 * material que ele mesmo mandou da de sobra.
 *
 * Cada linha aqui sai de um fato que ele enviou: o CRP do contrato, o CAPS-AD
 * da mensagem dele, as duas abordagens dos cards, os tres formatos do cartao.
 * Nenhuma inventa sentimento, historia ou tempo de casa.
 *
 * A VOZ MUDA AQUI, e so aqui. O resto do site fala dele na terceira pessoa;
 * esta secao e a unica em que ele fala. E o que o site de referencia faz, e e
 * o que aproxima quem esta lendo.
 *
 * O que NAO entrou de proposito: Teologo, Coach e PNL. Estao na secao de
 * formacao, onde sao credencial. No meio de um texto sobre o trabalho clinico
 * eles embaralham o que ele faz no consultorio.
 *
 * Desde 14/09/2026 o texto abaixo e o que ELE escreveu (ver o comentario logo
 * acima do array). Este bloco fica como historia de por que nao se copiou.
 * ========================================================================== */
// O TEXTO DELE, desde 14/09/2026. Ele mandou o "Sobre mim" escrito (como na
// época da revista: ele redige, a gente produz a arte). Revisão só de
// pontuação e repetição ("medos" aparecia duas vezes); as palavras são dele.
// O CAPS entra como ele pediu no item 7: "Além de atender no consultório,
// atuei na rede pública de saúde mental". O tempo de atuação é "mais de 25
// anos", pedido do item 6 (30 com a psicanálise, quase 20 com a psicologia).
export const sobre = [
  'Seja muito bem-vindo(a) ao meu espaço virtual dedicado ao cuidado da saúde ' +
    'mental. Sou Alexander Barnabés, psicanalista e psicólogo, com uma paixão ' +
    'profunda por auxiliar pessoas a alcançarem o equilíbrio emocional e o bem-estar.',
  'Minha escolha pela psicologia nasceu do desejo de compreender melhor as ' +
    'pessoas e auxiliá-las no enfrentamento de seus desafios de forma mais ' +
    'consciente e saudável.',
  'Acredito que cada fase da vida traz suas próprias demandas. Por isso, ' +
    'trabalho com adultos, adolescentes, jovens, casais e idosos, sempre ' +
    'respeitando a individualidade e a história de cada pessoa. São mais de 25 ' +
    'anos, sempre com um olhar atento, ético e fundamentado na ciência.',
  'Além de atender no consultório, atuei na rede pública de saúde mental: ' +
    'foram 6 anos no CAPSad (Centro de Atenção Psicossocial Álcool e outras ' +
    'Drogas), onde me especializei no manejo e na clínica de adictos, o que me ' +
    'capacitou a traçar projetos terapêuticos a favor do usuário de entorpecentes.',
  'Mais do que técnicas, valorizo uma escuta qualificada que acolhe, ' +
    'compreende e favorece processos de reflexão. Aqui você encontrará um espaço ' +
    'de escuta acolhedora, onde, trabalhando juntos, conseguiremos auxiliá-lo(a) ' +
    'a encontrar clareza, desenvolver a autoaceitação e construir estratégias ' +
    'para enfrentar os desafios da vida.',
  'Acredito que cuidar da mente não se limita ao tratamento de dificuldades, ' +
    'mas pode contribuir para o desenvolvimento de uma vida com mais consciência, ' +
    'equilíbrio e propósito.',
];

/** A introdução de Serviços, no texto dele (14/09/2026). */
export const servicosIntro =
  'Atuo no atendimento psicológico online ou presencial, ajudando a lidar com ' +
  'questões como ansiedade, depressão, baixa autoestima, fobias, crises de ' +
  'pânico, medos, obsessões, insônia, angústias, tristezas, compulsões e ' +
  'dificuldades nos relacionamentos interpessoais e conjugais, entre outras.';

/** "Quando procurar ajuda", no texto dele (14/09/2026). */
export const quandoProcurarIntro = [
  'A psicoterapia e a psicanálise são caminhos que favorecem o autoconhecimento ' +
    'e a compreensão mais profunda de si mesmo, possibilitando novas formas de ' +
    'lidar com os relacionamentos, as emoções e os desafios da vida.',
  'Atendo a todos, exceto crianças, respeitando a singularidade de cada pessoa e ' +
    'construindo em conjunto um processo terapêutico pautado na confiança, no ' +
    'sigilo e no compromisso com o cuidado.',
  'Se você sente que é o momento de olhar para si, será um prazer te acolher em ' +
    'meu consultório. Entre em contato para agendar uma conversa inicial e tirar ' +
    'suas dúvidas.',
];

/** A seção "Explicando", nova em 14/09/2026, com o texto dele. */
export const explicando = [
  'A psicoterapia é um espaço de escuta, acolhimento e reflexão, no qual você ' +
    'pode falar sobre aquilo que vivencia, sente e pensa, encontrando um ambiente ' +
    'seguro e livre de julgamentos.',
  'Por meio do diálogo, é possível compreender melhor os aspectos da sua própria ' +
    'história, reconhecer repetições de comportamento e relacionamento, elaborar ' +
    'conflitos e desenvolver novas formas de lidar com as situações que provocam ' +
    'sofrimento ou insegurança.',
  'O processo psicoterapêutico respeita o tempo e a subjetividade de cada pessoa. ' +
    'Não se trata de oferecer respostas prontas, mas de construir um espaço que ' +
    'possibilite a você compreender suas questões e atribuir novos sentidos às ' +
    'suas experiências.',
  'A psicoterapia pode ser procurada em diferentes momentos da vida: diante de ' +
    'períodos de sofrimento emocional e de mudanças.',
];

// Os temas vem dos posts que ele mesmo ja escreveu; "Alcool e outras drogas"
// veio do pedido de 09/09/2026.
//
// TEXTOS REESCRITOS em 13/09/2026, a pedido dele ("os amigos colocaram de forma
// muito simples, teria como colocar um texto mais significativo"). Cada um tem
// agora duas frases: o que a pessoa vive, e o que a terapia faz com isso.
//
// A SEGUNDA FRASE DESCREVE O PROCESSO, NUNCA O RESULTADO. "Ajuda a compreender",
// "oferece um espaço", "olhar para" -- e nao "resolve", "supera" ou "cura". O
// Conselho Federal de Psicologia veda promessa de resultado, e um texto mais
// bonito nao pode ser o que coloca o CRP dele em risco.
//
// `imagem` desde 13/09/2026: a foto do cartão no anel de temas. O arquivo mora
// em public/img/temas; enquanto não existe, o cartão mostra o nome do tema.
export const temas = [
  {
    titulo: 'Ansiedade',
    imagem: 'ansiedade.webp',
    texto:
      'Preocupação constante, pensamentos acelerados e um corpo que não ' +
      'consegue desligar. Na terapia, a ansiedade deixa de ser só um sintoma ' +
      'a controlar e passa a ser compreendida dentro da história de cada pessoa.',
  },
  {
    titulo: 'Depressão',
    imagem: 'depressao.webp',
    texto:
      'Tristeza que se prolonga, cansaço e perda de interesse pelo que antes ' +
      'fazia sentido. O acompanhamento oferece um espaço de escuta para ' +
      'compreender esse sofrimento, no tempo de cada um.',
  },
  /*
   * Colado na Depressao de proposito: os temas vao do mais pesado ao mais
   * leve. A palavra "vicio" continua de fora, e a frase nao acusa ninguem.
   */
  {
    titulo: 'Álcool e outras drogas',
    imagem: 'alcool-e-outras-drogas.webp',
    texto:
      'Quando a bebida ou outra substância passa a ocupar espaço demais e ' +
      'tentar parar sozinho não tem dado certo. O atendimento acolhe a pessoa ' +
      'e também a família, sem julgamento.',
  },
  {
    titulo: 'Relacionamentos',
    imagem: 'relacionamentos.webp',
    texto:
      'Conflitos que se repetem, dificuldade de diálogo e a sensação de ' +
      'distância de quem está perto. A terapia ajuda a reconhecer esses ' +
      'padrões e o lugar que cada um ocupa na relação.',
  },
  {
    titulo: 'Terapia de casal',
    imagem: 'terapia-de-casal.webp',
    texto:
      'Um espaço mediado para que os dois possam falar e ser ouvidos, olhar ' +
      'para a história construída juntos e pensar, com mais clareza, nos ' +
      'próximos passos.',
  },
  {
    titulo: 'Procrastinação',
    imagem: 'procrastinacao.webp',
    texto:
      'Adiar o que é importante e conviver com a culpa que vem depois. Mais do ' +
      'que falta de organização, a procrastinação costuma falar de medos e ' +
      'expectativas que vale a pena compreender.',
  },
  {
    titulo: 'Decisões difíceis',
    imagem: 'decisoes-dificeis.webp',
    texto:
      'Mudança de carreira, fim de um relacionamento, escolhas que envolvem a ' +
      'família. Pensar junto com um profissional ajuda a separar o que se ' +
      'deseja do que se teme.',
  },
  {
    titulo: 'Aprender a dizer não',
    imagem: 'aprender-a-dizer-nao.webp',
    texto:
      'Colocar limites sem culpa, respeitando o próprio tempo e as próprias ' +
      'necessidades. Um trabalho sobre autoestima e sobre a forma de se ' +
      'relacionar com os outros.',
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
 *
 * ============================== A EXPLICACAO ================================
 * Desde 13/09/2026 cada sinal tem uma frase embaixo, pedido do Maxwel: o
 * titulo e curto demais pra pessoa se reconhecer nele. A frase descreve a
 * situacao, nao diagnostica nem promete o que a conversa vai resolver.
 * TODO: o Alexander precisa ler e aprovar -- os titulos sao dele, estas nao.
 */
export const sinais = [
  {
    texto: 'Você não consegue superar uma tristeza',
    explicacao:
      'Uma perda, uma mudança ou uma fase difícil que continua pesando por ' +
      'semanas e já atrapalha o sono, o trabalho ou a vontade de estar com as pessoas.',
    mensagem:
      'Oi. Vim pelo site. Tem uma tristeza que eu não estou conseguindo ' +
      'superar e queria conversar sobre isso.',
  },
  {
    texto: 'Você está constantemente desanimado',
    explicacao:
      'Falta energia para o que antes dava prazer, e os dias parecem iguais, ' +
      'mesmo sem um motivo claro.',
    mensagem:
      'Oi. Vim pelo site. Ando desanimado o tempo todo e queria conversar ' +
      'sobre isso.',
  },
  {
    texto: 'Você deseja tomar uma decisão importante',
    explicacao:
      'Mudar de carreira, terminar ou começar uma relação, uma escolha que ' +
      'envolve a família. Pensar junto com alguém de fora abre espaço para ' +
      'separar o que você quer do que você teme.',
    mensagem:
      'Oi. Vim pelo site. Preciso tomar uma decisão importante e queria ' +
      'conversar sobre isso.',
  },
  {
    texto: 'Você está enfrentando dificuldades nos relacionamentos',
    explicacao:
      'Brigas que se repetem, distância de quem está perto ou dificuldade de ' +
      'dizer o que sente, no casal, na família ou no trabalho.',
    mensagem:
      'Oi. Vim pelo site. Estou enfrentando dificuldades nos meus ' +
      'relacionamentos e queria conversar sobre isso.',
  },
];

// A duvida das duas listas foi fechada em 11/09/2026, por audio dele: vale a
// que traz "Teologo, Coach e PNL", mais "terapeuta familiar". HIPNOLOGO NAO
// ENTRA -- estava so no outro card, e ele nao o citou ao escolher.
//
// Ate aqui o site publicava apenas o que aparecia nas DUAS listas, para nao
// inventar uma terceira versao. Agora ele disse qual vale, e os itens que
// faltavam entram.
//
// A especialidade em alcool e outras drogas entrou em 09/09/2026, tambem dita
// por ele: "na area de atuacao acrescentar especialidade em alcool e outras
// drogas". Nao veio de card nenhum, veio dele.
export const qualificacoes = [
  'Psicólogo',
  'Psicanalista',
  'Professor de Psicanálise',
  'Especializado em Psicoterapia Breve',
  'Especialista em álcool e outras drogas',
  'Terapeuta familiar',
  'Técnico em Saúde Mental',
  'Teólogo',
  'Coach',
  'Praticante de PNL',
];

// A lista `experiencia` (CAPS-AD Vanderlei Marins, 2018 a 2023) saiu em
// 13/09/2026 a pedido dele: "tire por favor os campos de exclusividade que
// trabalhei no CAPS-AD. Eu citei no corpo do texto que irei enviar". A
// passagem pelo CAPS continua no "sobre mim" e vai para o texto dele.

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
    // Os numeros vieram da folha de metodologia que ele fotografou em
    // 11/09/2026. Sao eles que transformam "ganhou um premio" em algo que
    // alguem pode conferir: pesquisa telefonica com 1.575 entrevistas em Nova
    // Iguacu, resposta espontanea (sem lista de nomes na frente), e o primeiro
    // lugar definido por 37% das citacoes.
    //
    // O numero vale mais que a foto. Premio sem metodologia todo mundo diz que
    // tem; com margem de erro e tamanho de amostra, poucos.
    detalhe:
      'Categoria Psicólogo e Psicanalista, Nova Iguaçu, Rio de Janeiro. ' +
      'Pesquisa do Instituto Otimiza com 1.575 entrevistas na cidade, ' +
      'de resposta espontânea, com margem de erro de 2,4%.',
    // TODO: a foto do certificado em si continua faltando. O que chegou foi a
    // folha de metodologia, fotografada torta e com a margem direita cortada.
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
  // Reescrito em 13/09/2026. A versão anterior ("poltrona, sofá, planta e
  // estante, e não o consultório branco") ele não entendeu, e com razão: listava
  // móveis e comparava com um consultório imaginário.
  texto:
    'Um consultório reservado e acolhedor no Centro de Nova Iguaçu, com luz ' +
    'natural e um ambiente preparado para que a conversa aconteça com ' +
    'privacidade e conforto.',
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
