/* =============================================================
   CAUST — ARQUIVO DE CONFIGURAÇÃO
   -------------------------------------------------------------
   Este é o ÚNICO arquivo que precisa ser editado no dia a dia.
   Tudo marcado com  <<< CONFIRMAR  foi preenchido a partir do
   Instagram @caust_modas e precisa ser validado com a cliente.
   Tudo marcado com  <<< PREENCHER  ainda não temos.
   ============================================================= */

const LOJA = {
  nome: "CAUST",
  nomeCompleto: "Caust Modas",
  slogan: "Moda feminina direto do Goiás Center Modas",
  descricaoCurta:
    "Atacado e varejo em Goiânia. Novidades toda semana em vestido de festa, body, peça country e look elegante.",

  // --- WhatsApp ------------------------------------------------
  // numero: 55 + DDD + número, só dígitos. Ex: 5562999998888
  //   Com o número preenchido, o site consegue abrir a conversa
  //   JÁ COM a mensagem escrita (peça, tamanho, atacado/varejo).
  // linkCurto: fallback enquanto não temos o número. Funciona,
  //   mas NÃO consegue preencher a mensagem automaticamente.
  whatsapp: {
    atacado: {
      numero: "",                                      // <<< PREENCHER
      visivel: "",                                     // <<< PREENCHER ex: (62) 99999-8888
      linkCurto: "https://wa.me/message/3ZA3O7RIP27JK1", // "Caust 2" do Linktree
    },
    varejo: {
      numero: "",                                      // <<< PREENCHER
      visivel: "",                                     // <<< PREENCHER
      linkCurto: "https://wa.me/message/4YOBBJRAHBXCC1", // "Caust" do Linktree
    },
  },

  instagram: "caust_modas",
  email: "",                                           // <<< PREENCHER (ou deixe "")

  // --- Loja física ---------------------------------------------
  endereco: {
    local: "Goiás Center Modas",
    sala: "Sala 108 — Piso 1",
    rua: "Av. Goiás Norte, 4066",
    bairro: "Setor Crimeia Oeste",
    cidade: "Goiânia",
    estado: "GO",
    cep: "74563-220",
  },
  enderecoBusca:
    "Goiás Center Modas, Av. Goiás Norte, 4066, Setor Crimeia Oeste, Goiânia - GO",

  // Horários do shopping Goiás Center Modas.        <<< CONFIRMAR
  // Se a CAUST tiver horário próprio diferente, ajustar aqui.
  horarios: [
    { dias: "Segunda a sexta", horas: "08h às 18h" },
    { dias: "Sábado", horas: "08h às 12h" },
    { dias: "Domingo", horas: "Fechado" },
  ],

  // --- Condições de atacado ------------------------------------
  // Isto é o que a sacoleira quer saber ANTES de chamar no zap.
  // Responder isso no site reduz muito o custo por lead no Meta Ads.
  atacado: {
    pedidoMinimo: "",        // <<< PREENCHER ex: "10 peças" ou "R$ 500,00"
    formasPagamento: "",     // <<< PREENCHER ex: "Pix, débito e crédito em até 3x"
    envio: "",               // <<< PREENCHER ex: "Enviamos para todo o Brasil via transportadora e Correios"
    grade: "",               // <<< PREENCHER ex: "Grade fechada P/M/G ou peças avulsas"
    catalogoLink: "",        // <<< PREENCHER link do catálogo/Drive, se existir
  },

  // --- Fotos da loja física ------------------------------------
  // Coloque os arquivos em  site/img/loja/  e aponte o caminho aqui.
  fotos: {
    // Aparece GRANDE na seção "A loja", ao lado do texto.
    // É o melhor lugar para a foto do espaço: tamanho cheio,
    // sem texto por cima, e no contexto certo.
    loja: "img/loja/fachada.jpg",                // ex: "img/loja/fachada.jpg"

    // Segunda foto da loja, menor, sobreposta à principal na seção
    // "A loja". Use a foto de DENTRO, com as araras e a mesa cheia.
    interior: "img/loja/interior.jpg",            // ex: "img/loja/interior.jpg"

    // Fundo do topo do site. Deixe "" — ver comentário no README.
    // O topo já tem 4 fotos de peça; uma quinta imagem atrás do
    // título briga com elas e o véu necessário apaga a foto.
    fundoHero: "",
  },

  // --- Como funciona o atacado ---------------------------------
  // Aparece na coluna direita da seção de atacado.
  // <<< CONFIRMAR com a cliente: escrevi o fluxo que é padrão em
  // loja do Goiás Center Modas, mas o dela pode ser diferente.
  passosAtacado: [
    {
      titulo: "Chame no WhatsApp",
      texto: "Conte o que a sua cliente procura e a faixa de preço que você trabalha.",
    },
    {
      titulo: "Veja as peças",
      texto: "Mandamos foto e vídeo do que está na arara, inclusive o que ainda não foi para o site.",
    },
    {
      titulo: "Monte a sua grade",
      texto: "Você escolhe modelo, tamanho e cor. A grade é montada do jeito que gira na sua loja.",
    },
    {
      titulo: "Retire ou receba",
      texto: "Está em Goiânia? Retire na sala 108. De fora? Combinamos o envio na hora.",
    },
  ],

  // --- Políticas -----------------------------------------------
  // Está na bio do Instagram, precisa estar visível no site também.
  politicaTrocas: "Não realizamos trocas.",

  // --- Mensagens automáticas do WhatsApp -----------------------
  mensagens: {
    atacado:
      "Olá! Vim pelo site da CAUST e quero comprar no ATACADO. Pode me passar as condições?",
    varejo:
      "Olá! Vim pelo site da CAUST e gostaria de mais informações.",
    produto: (nome, modo) =>
      modo === "atacado"
        ? `Olá! Vim pelo site da CAUST. Tenho interesse na peça "${nome}" para ATACADO. Qual o valor e a grade?`
        : `Olá! Vim pelo site da CAUST e gostaria de saber mais sobre a peça "${nome}".`,
    novidades:
      "Olá! Quero receber as novidades da semana da CAUST.",
  },

  // --- Meta Ads ------------------------------------------------
  // Cole o ID do Pixel (só os números). Enquanto estiver vazio,
  // nenhum script do Facebook é carregado no site.
  metaPixelId: "",                                     // <<< PREENCHER
};

/* =============================================================
   CATÁLOGO DE PEÇAS
   -------------------------------------------------------------
   Categorias vindas dos destaques do Instagram.

   Como adicionar uma peça:
   1. Salve a foto em  site/img/produtos/  (ex: vestido-linho.jpg)
   2. Copie um bloco abaixo e ajuste os campos.

   preco        : preço de VAREJO. Use 0 para mostrar "Consultar".
   precoAtacado : preço de atacado. Use 0 para mostrar "Consultar".
                  (só aparece quando o visitante está no modo Atacado)
   imagem       : "img/produtos/arquivo.jpg" — deixe "" para mostrar
                  um espaço reservado elegante no lugar da foto.
   ============================================================= */

const CATEGORIAS = [
  "Vestidos curtos",
  "Vestidos longos",
  "Conjuntos",
  "Macacões",
  "Bodys",
  "Cropped",
  "Calças",
  "Saias",
];

// Os filtros do site só mostram as categorias que TÊM peça cadastrada.
// Então pode deixar a lista acima completa: conforme as fotos chegarem,
// a categoria aparece sozinha no site.

// ATENÇÃO — tamanhos e preços abaixo são SUPOSIÇÃO, precisam ser
// confirmados com a cliente. Preço 0 faz o card mostrar "Consultar".
const PRODUTOS = [
  {
    nome: "Vestido country camurça com franjas",
    categoria: "Vestidos curtos",
    preco: 0,
    precoAtacado: 0,
    descricao: "Camurça preta com gola frente única, barra de franjas e tachas douradas. A peça de rodeio que mais sai.",
    tamanhos: "P, M, G",
    imagem: "img/produtos/vestidos-curtos-01.jpg",
    novo: true,
    destaque: true,
  },
  {
    nome: "Vestido franzido ombro único",
    categoria: "Vestidos curtos",
    preco: 0,
    precoAtacado: 0,
    descricao: "Malha marrom com franzido lateral que modela o corpo e acompanha echarpe no ombro.",
    tamanhos: "P, M, G",
    imagem: "img/produtos/vestidos-curtos-02.jpg",
    novo: true,
    destaque: false,
  },
  {
    nome: "Vestido country camurça marrom",
    categoria: "Vestidos curtos",
    preco: 0,
    precoAtacado: 0,
    descricao: "Camurça marrom com alças, tachas douradas e franjas na barra. Combina com bota e chapéu.",
    tamanhos: "P, M, G",
    imagem: "img/produtos/vestidos-curtos-03.jpg",
    novo: true,
    destaque: false,
  },
  {
    nome: "Vestido pedraria gola alta",
    categoria: "Vestidos curtos",
    preco: 0,
    precoAtacado: 0,
    descricao: "Bordado inteiro em pedraria sobre base preta, gola alta e cavas nos ombros. Peça de festa.",
    tamanhos: "P, M, G",
    imagem: "img/produtos/vestidos-curtos-04.jpg",
    novo: true,
    destaque: true,
  },
  {
    nome: "Vestido tomara que caia com luvas",
    categoria: "Vestidos curtos",
    preco: 0,
    precoAtacado: 0,
    descricao: "Preto liso e justo, acompanha par de luvas longas em pedraria. Sai muito para casamento e formatura.",
    tamanhos: "P, M, G",
    imagem: "img/produtos/vestidos-curtos-05.jpg",
    novo: true,
    destaque: false,
  },
  {
    nome: "Vestido country gola alta com franjas",
    categoria: "Vestidos curtos",
    preco: 0,
    precoAtacado: 0,
    descricao: "Camurça preta sem manga, com tachas e franjas na barra. Versão mais fechada do country.",
    tamanhos: "P, M, G",
    imagem: "img/produtos/vestidos-curtos-06.jpg",
    novo: true,
    destaque: false,
  },
  {
    nome: "Vestido com mangas de tule",
    categoria: "Vestidos curtos",
    preco: 0,
    precoAtacado: 0,
    descricao: "Tomara que caia preto e justo, com mangas longas de tule bordadas em strass.",
    tamanhos: "P, M, G",
    imagem: "img/produtos/vestido-tule-01.jpg",
    novo: true,
    destaque: false,
  },
  {
    nome: "Vestido gola halter com strass",
    categoria: "Vestidos curtos",
    preco: 0,
    precoAtacado: 0,
    descricao: "Decote em strass com zíper aparente, corpo liso e modelagem justa.",
    tamanhos: "P, M, G",
    imagem: "img/produtos/vestido-brilho-01.jpg",
    novo: true,
    destaque: false,
  },
  {
    nome: "Vestido curto todo em brilho",
    categoria: "Vestidos curtos",
    preco: 0,
    precoAtacado: 0,
    descricao: "Gola alta, costas nuas e brilho na peça inteira. Feito para balada.",
    tamanhos: "P, M, G",
    imagem: "img/produtos/vestido-brilho-02.jpg",
    novo: true,
    destaque: false,
  },
  {
    nome: "Vestido longo floral azul",
    categoria: "Vestidos longos",
    preco: 0,
    precoAtacado: 0,
    descricao: "Estampa de flor em azul e rosa, alça fina, decote V e saia rodada.",
    tamanhos: "P, M, G",
    imagem: "img/produtos/vestido-longo-01.jpg",
    novo: true,
    destaque: true,
  },
  {
    nome: "Vestido longo com zíper frontal",
    categoria: "Vestidos longos",
    preco: 0,
    precoAtacado: 0,
    descricao: "Tom caramelo, zíper de cima a baixo, bolsos laterais e fenda. Veste do dia à noite.",
    tamanhos: "P, M, G",
    imagem: "img/produtos/vestido-longo-02.jpg",
    novo: true,
    destaque: false,
  },
  {
    nome: "Vestido longo com flor 3D",
    categoria: "Vestidos longos",
    preco: 0,
    precoAtacado: 0,
    descricao: "Flor aplicada no busto, alça fina e fenda lateral. Sai em rosa e preto.",
    tamanhos: "P, M, G",
    imagem: "img/produtos/vestido-longo-03.jpg",
    novo: true,
    destaque: false,
  },
  {
    nome: "Vestido longo pink com vivo",
    categoria: "Vestidos longos",
    preco: 0,
    precoAtacado: 0,
    descricao: "Pink com vivo dourado, zíper frontal e bolsos. Alfaiataria leve.",
    tamanhos: "P, M, G",
    imagem: "img/produtos/vestido-longo-04.jpg",
    novo: true,
    destaque: false,
  },
  {
    nome: "Conjunto cropped e saia longa cru",
    categoria: "Conjuntos",
    preco: 0,
    precoAtacado: 0,
    descricao: "Tecido texturizado em tom cru, cropped com decote V e saia longa evasê.",
    tamanhos: "P, M, G",
    imagem: "img/produtos/conjunto-saia-longa-01.jpg",
    novo: true,
    destaque: false,
  },
  {
    nome: "Conjunto listrado azul",
    categoria: "Conjuntos",
    preco: 0,
    precoAtacado: 0,
    descricao: "Listra azul e branca, cropped com amarração no ombro e saia longa rodada com bolsos.",
    tamanhos: "P, M, G",
    imagem: "img/produtos/conjunto-saia-longa-02.jpg",
    novo: true,
    destaque: false,
  },
  {
    nome: "Conjunto vermelho gola halter",
    categoria: "Conjuntos",
    preco: 0,
    precoAtacado: 0,
    descricao: "Cropped tomara que caia com gola halter e saia longa abotoada na frente.",
    tamanhos: "P, M, G",
    imagem: "img/produtos/conjunto-saia-longa-03.jpg",
    novo: true,
    destaque: false,
  },
  {
    nome: "Conjunto com faixa de renda",
    categoria: "Conjuntos",
    preco: 0,
    precoAtacado: 0,
    descricao: "Cintura marcada por faixa de renda. Sai em quatro cores: cru, rosa, branco e verde claro.",
    tamanhos: "P, M, G",
    imagem: "img/produtos/conjunto-saia-longa-04.jpg",
    novo: true,
    destaque: false,
  },
  {
    nome: "Conjunto listrado rosa",
    categoria: "Conjuntos",
    preco: 0,
    precoAtacado: 0,
    descricao: "Listra rosa e branca, decote halter e saia longa com fenda.",
    tamanhos: "P, M, G",
    imagem: "img/produtos/conjunto-saia-longa-05.jpg",
    novo: true,
    destaque: true,
  },
  {
    nome: "Conjunto canelado preto",
    categoria: "Conjuntos",
    preco: 0,
    precoAtacado: 0,
    descricao: "Malha canelada com franzido na saia. Modela o corpo e acompanha o movimento.",
    tamanhos: "P, M, G",
    imagem: "img/produtos/conjunto-saia-longa-06.jpg",
    novo: true,
    destaque: false,
  },
  {
    nome: "Conjunto de renda preto",
    categoria: "Conjuntos",
    preco: 0,
    precoAtacado: 0,
    descricao: "Cropped de gola alta com manga bufante e saia longa de renda. Peça de festa.",
    tamanhos: "P, M, G",
    imagem: "img/produtos/conjunto-saia-longa-07.jpg",
    novo: true,
    destaque: false,
  },
  {
    nome: "Conjunto vermelho com nervuras",
    categoria: "Conjuntos",
    preco: 0,
    precoAtacado: 0,
    descricao: "Alça fina e nervuras na saia, em vermelho vivo. Caimento leve.",
    tamanhos: "P, M, G",
    imagem: "img/produtos/conjunto-saia-longa-08.jpg",
    novo: true,
    destaque: false,
  },
  {
    nome: "Conjunto floral azul",
    categoria: "Conjuntos",
    preco: 0,
    precoAtacado: 0,
    descricao: "Fundo branco com flor azul, amarração no busto e manga bufante. Barra com faixa estampada.",
    tamanhos: "P, M, G",
    imagem: "img/produtos/conjunto-saia-longa-09.jpg",
    novo: true,
    destaque: false,
  },
  {
    nome: "Body strass alça larga",
    categoria: "Bodys",
    preco: 0,
    precoAtacado: 0,
    descricao: "Coberto de strass, alça larga e decote reto. Fica pronto só de jogar com uma calça.",
    tamanhos: "P, M, G",
    imagem: "img/produtos/bodys-01.jpg",
    novo: true,
    destaque: false,
  },
  {
    nome: "Body strass nadador",
    categoria: "Bodys",
    preco: 0,
    precoAtacado: 0,
    descricao: "Decote nadador com aplicação de strass. Sai em 6 cores: preto, off-white, marrom claro, marrom, bege e vermelho.",
    tamanhos: "P, M, G",
    imagem: "img/produtos/bodys-02.jpg",
    novo: true,
    destaque: false,
  },
  {
    nome: "Body tule manga bufante",
    categoria: "Bodys",
    preco: 0,
    precoAtacado: 0,
    descricao: "Tule preto com decote V, franzido na cintura e manga longa bufante.",
    tamanhos: "P, M, G",
    imagem: "img/produtos/bodys-03.jpg",
    novo: true,
    destaque: false,
  },
  {
    nome: "Body strass manga longa",
    categoria: "Bodys",
    preco: 0,
    precoAtacado: 0,
    descricao: "Manga longa com peito em strass e gola. Disponível em preto e branco.",
    tamanhos: "P, M, G",
    imagem: "img/produtos/bodys-04.jpg",
    novo: true,
    destaque: false,
  },
  {
    nome: "Cropped regata com strass",
    categoria: "Cropped",
    preco: 0,
    precoAtacado: 0,
    descricao: "Base preta coberta de strass, decote quadrado e alça larga.",
    tamanhos: "P, M, G",
    imagem: "img/produtos/croppeds-01.jpg",
    novo: true,
    destaque: false,
  },
  {
    nome: "Cropped tomara que caia com tachas",
    categoria: "Cropped",
    preco: 0,
    precoAtacado: 0,
    descricao: "Tachas metálicas sobre base preta, com amarração nas laterais.",
    tamanhos: "P, M, G",
    imagem: "img/produtos/croppeds-02.jpg",
    novo: true,
    destaque: false,
  },
  {
    nome: "Corselet de renda com bojo",
    categoria: "Cropped",
    preco: 0,
    precoAtacado: 0,
    descricao: "Renda com bojo estruturado. Grade larga de cores: preto, branco, azul, pink, vermelho, rosa, verde e marrom.",
    tamanhos: "P, M, G",
    imagem: "img/produtos/croppeds-03.jpg",
    novo: true,
    destaque: false,
  },
  {
    nome: "Corselet de strass com alça",
    categoria: "Cropped",
    preco: 0,
    precoAtacado: 0,
    descricao: "Alça larga e strass por toda a peça. Sai em dez cores.",
    tamanhos: "P, M, G",
    imagem: "img/produtos/croppeds-04.jpg",
    novo: true,
    destaque: false,
  },
  {
    nome: "Corselet tomara que caia com strass",
    categoria: "Cropped",
    preco: 0,
    precoAtacado: 0,
    descricao: "Estruturado com barbatanas e coberto de strass. Sai em doze cores.",
    tamanhos: "P, M, G",
    imagem: "img/produtos/croppeds-05.jpg",
    novo: true,
    destaque: false,
  },
  {
    nome: "Top triângulo estampado",
    categoria: "Cropped",
    preco: 0,
    precoAtacado: 0,
    descricao: "Top triângulo com estampa monogramada e argola central.",
    tamanhos: "P, M, G",
    imagem: "img/produtos/croppeds-06.jpg",
    novo: true,
    destaque: false,
  },
  {
    nome: "Top de correntes metalizado",
    categoria: "Cropped",
    preco: 0,
    precoAtacado: 0,
    descricao: "Malha de correntes com decote drapeado. Sai em dourado e prata.",
    tamanhos: "Único",
    imagem: "img/produtos/croppeds-07.jpg",
    novo: true,
    destaque: false,
  },
  {
    nome: "Legging cirrê com recortes",
    categoria: "Calças",
    preco: 0,
    precoAtacado: 0,
    descricao: "Cintura alta com recortes em cirrê nas laterais. Modela e não marca.",
    tamanhos: "P, M, G",
    imagem: "img/produtos/calca-cirre-01.jpg",
    novo: true,
    destaque: false,
  },
  {
    nome: "Saia curta com fivela",
    categoria: "Saias",
    preco: 0,
    precoAtacado: 0,
    descricao: "Transpassada, com fivela dourada na cintura. Foto tirada na própria loja.",
    tamanhos: "P, M, G",
    imagem: "img/produtos/saia-fivela-01.jpg",
    novo: true,
    destaque: false,
  },
];

/* =============================================================
   DEPOIMENTOS
   -------------------------------------------------------------
   A seção só aparece no site quando PUBLICADOS estiver true.

   Está false porque os textos abaixo são EXEMPLOS escritos por
   nós, não comentários de clientes reais. Publicar depoimento
   inventado com nome de pessoa é propaganda enganosa (CDC art.
   37) e o risco é da loja. Fora isso, sacoleira reconhece elogio
   fabricado na hora, e aí o site inteiro perde credibilidade.

   COMO LIGAR, em 2 minutos:
   1. Peça os prints de WhatsApp e os comentários do Instagram
   2. Substitua os blocos abaixo pelos textos reais, com o
      primeiro nome e a cidade de quem escreveu
   3. Troque PUBLICADOS para true

   Três reais valem mais que dez inventados. O carrossel funciona
   com qualquer quantidade.
   ============================================================= */

const DEPOIMENTOS_PUBLICADOS = false;

const DEPOIMENTOS = [
  {
    texto:
      "Compro para revender e as peças têm um giro muito bom. Toda semana tem novidade.",
    nome: "",              // <<< primeiro nome de quem escreveu
    cidade: "",            // <<< ex: "Anápolis, GO"
    tipo: "Atacado",       // "Atacado" ou "Varejo"
  },
  {
    texto:
      "Atendimento atencioso, me ajudaram a escolher a grade certa para a minha loja.",
    nome: "",
    cidade: "",
    tipo: "Atacado",
  },
  {
    texto:
      "Qualidade das peças muito acima do preço. Sempre saio de lá com sacola cheia.",
    nome: "",
    cidade: "",
    tipo: "Varejo",
  },
];
