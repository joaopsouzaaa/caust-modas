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
    pedidoMinimo: "Mínimo de 6 peças",
    formasPagamento: "Cartão, dinheiro e Pix",
    envio: "Feito por transportadoras",
    grade: "",               // <<< PREENCHER ex: "Grade fechada P/M/G ou peças avulsas"
    catalogoLink: "",        // <<< PREENCHER link do catálogo/Drive, se existir
  },

  // --- Fotos da loja física ------------------------------------
  // Coloque os arquivos em  site/img/loja/  e aponte o caminho aqui.
  fotos: {
    // Galeria da seção "A loja". A PRIMEIRA sai grande, as outras
    // em mosaico ao lado. Clicando, abre em tela cheia.
    // "legenda" vira o texto alternativo e aparece na foto ampliada.
    galeriaLoja: [
      { src: "img/loja/loja-01.jpg", legenda: "Vitrine da CAUST na sala 108 do Goiás Center Modas" },
      { src: "img/loja/loja-04.jpg", legenda: "Cantinho de espera com poltronas e espelho iluminado" },
      { src: "img/loja/loja-03.jpg", legenda: "Araras com as novidades da semana" },
      { src: "img/loja/loja-02.jpg", legenda: "Letreiro dourado na entrada da loja" },
      { src: "img/loja/loja-05.jpg", legenda: "Espelho iluminado para ver o look inteiro" },
      { src: "img/loja/loja-06.jpg", legenda: "Detalhe da decoração com o símbolo da CAUST" },
      { src: "img/loja/loja-07.jpg", legenda: "Prateleiras com a grade completa de cores" },
    ],

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
        : `Olá! Vim pelo site da CAUST e gostei da peça "${nome}". Quais tamanhos vocês têm e qual o valor?`,
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
   1. Salve as fotos em  site/img/produtos/  e os vídeos em  site/video/
   2. Copie um bloco abaixo e ajuste os campos.

   fotos  : lista de fotos DA MESMA PEÇA. A primeira é a capa do card;
            ao clicar, a cliente vê todas em sequência.
            Ex: ["img/produtos/vestido-01.jpg", "img/produtos/vestido-02.jpg"]
   videos : lista de vídeos da peça, aparecem depois das fotos.
            Cada vídeo precisa de uma imagem de capa com o MESMO nome
            e extensão .jpg ao lado dele (video/vestido.mp4 -> video/vestido.jpg).
            Peça só com vídeo usa essa capa no card.
            Deixe [] quando não houver.

   O site NÃO mostra preço nem tamanho, por decisão da loja: todo card
   e todo detalhe de peça diz "Tamanhos e valores no WhatsApp".
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

// novo: true  coloca o selo "Novidade" na foto. Use com parcimônia:
// se tudo é novidade, nada é, e a cliente para de reparar no selo.
// O ideal é manter entre 5 e 8 peças marcadas, e trocar quem está
// marcado conforme chega coleção nova.
const PRODUTOS = [
  {
    nome: "Vestido franzido frente única verde água",
    categoria: "Vestidos curtos",
    descricao: "Franzido no corpo inteiro, decote profundo com recorte e costas nuas com amarração.",
    fotos: ["img/produtos/vestido-franzido-frente-unica-verde-agua-01.jpg", "img/produtos/vestido-franzido-frente-unica-verde-agua-02.jpg"],
    videos: ["video/vestido-franzido-frente-unica-verde-agua.mp4"],
    novo: false,
    destaque: true,
  },
  {
    nome: "Vestido franzido frente única vermelho",
    categoria: "Vestidos curtos",
    descricao: "Franzido no corpo inteiro, decote profundo e costas nuas com amarração. Barra desfiada.",
    fotos: ["img/produtos/vestido-franzido-frente-unica-vermelho-01.jpg", "img/produtos/vestido-franzido-frente-unica-vermelho-02.jpg", "img/produtos/vestido-franzido-frente-unica-vermelho-03.jpg", "img/produtos/vestido-franzido-frente-unica-vermelho-04.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Vestido longo preto decote profundo",
    categoria: "Vestidos longos",
    descricao: "Manga longa, decote V profundo, modelagem justa e fenda lateral.",
    fotos: ["img/produtos/vestido-longo-preto-decote-profundo-01.jpg", "img/produtos/vestido-longo-preto-decote-profundo-02.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Conjunto top e saia franzida vermelho",
    categoria: "Conjuntos",
    descricao: "Top cortininha com gargantilha e saia curta franzida, com correntinha na cintura.",
    fotos: ["img/produtos/conjunto-top-e-saia-franzida-vermelho-01.jpg", "img/produtos/conjunto-top-e-saia-franzida-vermelho-02.jpg"],
    videos: ["video/conjunto-top-e-saia-franzida-vermelho.mp4"],
    novo: false,
    destaque: false,
  },
  {
    nome: "Vestido gola alta costas nuas marinho",
    categoria: "Vestidos curtos",
    descricao: "Gola alta, franzido que modela o corpo e costas totalmente abertas.",
    fotos: ["img/produtos/vestido-gola-alta-costas-nuas-marinho-01.jpg", "img/produtos/vestido-gola-alta-costas-nuas-marinho-02.jpg"],
    videos: ["video/vestido-gola-alta-costas-nuas-marinho.mp4"],
    novo: false,
    destaque: false,
  },
  {
    nome: "Vestido gola alta pink",
    categoria: "Vestidos curtos",
    descricao: "Gola alta, drapeado na frente e costas abertas com correntinha.",
    fotos: ["img/produtos/vestido-gola-alta-pink-01.jpg", "img/produtos/vestido-gola-alta-pink-02.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Vestido rosa gola alta com recortes",
    categoria: "Vestidos curtos",
    descricao: "Gola alta com decote gota, recortes na cintura e saia franzida.",
    fotos: ["img/produtos/vestido-rosa-gola-alta-com-recortes-01.jpg", "img/produtos/vestido-rosa-gola-alta-com-recortes-02.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Vestido corset com tule vermelho",
    categoria: "Vestidos curtos",
    descricao: "Corset tomara que caia com transparência de tule e saia justa.",
    fotos: ["img/produtos/vestido-corset-com-tule-vermelho-01.jpg", "img/produtos/vestido-corset-com-tule-vermelho-02.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Vestido corset com tule branco",
    categoria: "Vestidos curtos",
    descricao: "Corset tomara que caia com transparência de tule e saia franzida.",
    fotos: ["img/produtos/vestido-corset-com-tule-branco-01.jpg", "img/produtos/vestido-corset-com-tule-branco-02.jpg"],
    videos: ["video/vestido-corset-com-tule-branco.mp4"],
    novo: false,
    destaque: false,
  },
  {
    nome: "Conjunto top faixa e saia com strass",
    categoria: "Conjuntos",
    descricao: "Top faixa e saia curta preta, ligados por tiras de strass na cintura.",
    fotos: ["img/produtos/conjunto-top-faixa-e-saia-com-strass-01.jpg", "img/produtos/conjunto-top-faixa-e-saia-com-strass-02.jpg"],
    videos: ["video/conjunto-top-faixa-e-saia-com-strass.mp4"],
    novo: false,
    destaque: false,
  },
  {
    nome: "Vestido longo amarelo com flor",
    categoria: "Vestidos longos",
    descricao: "Frente única com flor aplicada no decote e saia longa com babado.",
    fotos: ["img/produtos/vestido-longo-amarelo-com-flor-01.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Vestido midi preto ombro único com laço",
    categoria: "Vestidos longos",
    descricao: "Um ombro só com laço, manga curta e fenda atrás. Elegante para evento.",
    fotos: ["img/produtos/vestido-midi-preto-ombro-unico-com-laco-01.jpg", "img/produtos/vestido-midi-preto-ombro-unico-com-laco-02.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Vestido longo vermelho manga única",
    categoria: "Vestidos longos",
    descricao: "Gola alta, uma manga só e franzido lateral. Modelagem justa até o tornozelo.",
    fotos: ["img/produtos/vestido-longo-vermelho-manga-unica-01.jpg", "img/produtos/vestido-longo-vermelho-manga-unica-02.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Vestido corset vinho com renda",
    categoria: "Vestidos curtos",
    descricao: "Decote coração com acabamento de renda na alça e na barra.",
    fotos: ["img/produtos/vestido-corset-vinho-com-renda-01.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Vestido country verde militar com amarração",
    categoria: "Vestidos curtos",
    descricao: "Manga longa, gola de camisa e ilhós com amarração no decote. Pede bota e chapéu.",
    fotos: ["img/produtos/vestido-country-verde-militar-com-amarracao-01.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Vestido longo estampado azul manga bufante",
    categoria: "Vestidos longos",
    descricao: "Estampa de folhas em azul e bege, decote quadrado, manga bufante e saia em camadas.",
    fotos: ["img/produtos/vestido-longo-estampado-azul-manga-bufante-01.jpg", "img/produtos/vestido-longo-estampado-azul-manga-bufante-02.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Vestido longo estampado verde manga babado",
    categoria: "Vestidos longos",
    descricao: "Estampa orgânica em verde e bege, manga de babado e faixa na cintura.",
    fotos: ["img/produtos/vestido-longo-estampado-verde-manga-babado-01.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Vestido longo vinho abotoado",
    categoria: "Vestidos longos",
    descricao: "Gola de camisa, botões de cima a baixo, recortes na cintura e fenda.",
    fotos: ["img/produtos/vestido-longo-vinho-abotoado-01.jpg", "img/produtos/vestido-longo-vinho-abotoado-02.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Conjunto colete e saia caramelo",
    categoria: "Conjuntos",
    descricao: "Colete cropped com zíper e saia curta com bolsos, em tecido texturizado.",
    fotos: ["img/produtos/conjunto-colete-e-saia-caramelo-01.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Vestido preto com bojo vazado",
    categoria: "Vestidos curtos",
    descricao: "Alça fina, bojo com recorte vazado no centro e saia justa.",
    fotos: ["img/produtos/vestido-preto-com-bojo-vazado-01.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Vestido preto drapeado com fivela",
    categoria: "Vestidos curtos",
    descricao: "Frente única com decote V drapeado, franzido no corpo e fivela na cintura.",
    fotos: ["img/produtos/vestido-preto-drapeado-com-fivela-01.jpg", "img/produtos/vestido-preto-drapeado-com-fivela-02.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Macaquinho rosa texturizado",
    categoria: "Macacões",
    descricao: "Tomara que caia com textura em relevo e decote coração.",
    fotos: ["img/produtos/macaquinho-rosa-texturizado-01.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Conjunto cropped e saia em crochê nude",
    categoria: "Conjuntos",
    descricao: "Cropped com bojo e saia curta em trama rendada, tom nude.",
    fotos: ["img/produtos/conjunto-cropped-e-saia-em-croche-nude-01.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Vestido amarelo com top de crochê",
    categoria: "Vestidos curtos",
    descricao: "Top de crochê frente única, cintura vazada e saia fluida.",
    fotos: ["img/produtos/vestido-amarelo-com-top-de-croche-01.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Vestido rosa com top de crochê",
    categoria: "Vestidos curtos",
    descricao: "Top de crochê frente única, cintura vazada e saia fluida de tule.",
    fotos: ["img/produtos/vestido-rosa-com-top-de-croche-01.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Conjunto top e calça listrada",
    categoria: "Conjuntos",
    descricao: "Top tomara que caia e calça jogger em listra fina.",
    fotos: ["img/produtos/conjunto-top-e-calca-listrada-01.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Vestido onça frente única",
    categoria: "Vestidos curtos",
    descricao: "Estampa de onça, decote V drapeado e argola dourada no pescoço.",
    fotos: ["img/produtos/vestido-onca-frente-unica-01.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Vestido longo floral terroso",
    categoria: "Vestidos longos",
    descricao: "Frente única, flores em tons terrosos e saia ampla.",
    fotos: ["img/produtos/vestido-longo-floral-terroso-01.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Macacão preto pantalona",
    categoria: "Macacões",
    descricao: "Frente única com decote V, cintura marcada e perna pantalona.",
    fotos: ["img/produtos/macacao-preto-pantalona-01.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Vestido amarelo com babado balonê",
    categoria: "Vestidos curtos",
    descricao: "Alça larga, laço no decote e saia com babado balonê.",
    fotos: ["img/produtos/vestido-amarelo-com-babado-balone-01.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Vestido marsala gola alta drapeado",
    categoria: "Vestidos curtos",
    descricao: "Gola alta, sem manga, com drapeado transpassado na saia.",
    fotos: ["img/produtos/vestido-marsala-gola-alta-drapeado-01.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Vestido preto frente única franzido",
    categoria: "Vestidos curtos",
    descricao: "Decote V drapeado, costas nuas e saia justa franzida.",
    fotos: ["img/produtos/vestido-preto-frente-unica-franzido-01.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Vestido vinho ombro a ombro",
    categoria: "Vestidos curtos",
    descricao: "Manga longa, decote ombro a ombro dobrado e franzido lateral.",
    fotos: ["img/produtos/vestido-vinho-ombro-a-ombro-01.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Vestido marrom frente única",
    categoria: "Vestidos curtos",
    descricao: "Gola de tiras, blusê soltinho e saia justa franzida.",
    fotos: ["img/produtos/vestido-marrom-frente-unica-01.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Vestido poá marrom alça fina",
    categoria: "Vestidos curtos",
    descricao: "Decote V, alça fina e saia em babados.",
    fotos: ["img/produtos/vestido-poa-marrom-alca-fina-01.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Vestido poá preto curto",
    categoria: "Vestidos curtos",
    descricao: "Sem manga, cintura baixa e saia com babado.",
    fotos: ["img/produtos/vestido-poa-preto-curto-01.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Vestido telha manga morcego",
    categoria: "Vestidos curtos",
    descricao: "Decote V, manga ampla e saia justa franzida.",
    fotos: ["img/produtos/vestido-telha-manga-morcego-01.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Conjunto poá marrom top e calça",
    categoria: "Conjuntos",
    descricao: "Top tomara que caia e calça pantalona em poá marrom e branco.",
    fotos: ["img/produtos/conjunto-poa-marrom-top-e-calca-01.jpg", "img/produtos/conjunto-poa-marrom-top-e-calca-02.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Vestido onça manga longa",
    categoria: "Vestidos curtos",
    descricao: "Manga longa, decote canoa e modelagem justa. Com bota fica pronto para o frio.",
    fotos: ["img/produtos/vestido-onca-manga-longa-01.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Conjunto poá cinza gola alta",
    categoria: "Conjuntos",
    descricao: "Cropped de gola alta com botões e calça pantalona com listra lateral.",
    fotos: ["img/produtos/conjunto-poa-cinza-gola-alta-01.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Conjunto poá marrom gola alta",
    categoria: "Conjuntos",
    descricao: "Cropped de gola alta com botões e calça pantalona com listra lateral.",
    fotos: ["img/produtos/conjunto-poa-marrom-gola-alta-01.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Conjunto poá branco gola alta",
    categoria: "Conjuntos",
    descricao: "Cropped de gola alta com botões e calça pantalona com listra lateral.",
    fotos: ["img/produtos/conjunto-poa-branco-gola-alta-01.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Conjunto cropped e saia longa off-white",
    categoria: "Conjuntos",
    descricao: "Cropped com decote V e saia longa ampla com estampa de linhas.",
    fotos: ["img/produtos/conjunto-cropped-e-saia-longa-off-white-01.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Vestido longo floral coral",
    categoria: "Vestidos longos",
    descricao: "Alça fina, costas abertas e saia em camadas.",
    fotos: ["img/produtos/vestido-longo-floral-coral-01.jpg", "img/produtos/vestido-longo-floral-coral-02.jpg"],
    videos: [],
    novo: false,
    destaque: true,
  },
  {
    nome: "Vestido longo flores azuis em camadas",
    categoria: "Vestidos longos",
    descricao: "Alça fina, decote V e saia ampla em camadas, fundo branco com flores azuis.",
    fotos: ["img/produtos/vestido-longo-flores-azuis-em-camadas-01.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Macacão poá branco tomara que caia",
    categoria: "Macacões",
    descricao: "Tomara que caia com cinto fino e calça de barra franzida.",
    fotos: ["img/produtos/macacao-poa-branco-tomara-que-caia-01.jpg", "img/produtos/macacao-poa-branco-tomara-que-caia-02.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Conjunto top amarração e saia longa branca",
    categoria: "Conjuntos",
    descricao: "Top com amarração nas costas e saia longa em camadas.",
    fotos: ["img/produtos/conjunto-top-amarracao-e-saia-longa-branca-01.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Vestido longo lilás com barrado",
    categoria: "Vestidos longos",
    descricao: "Alça larga, faixa bordada no busto e flor estampada na barra.",
    fotos: ["img/produtos/vestido-longo-lilas-com-barrado-01.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Conjunto cropped bordado e saia longa branca",
    categoria: "Conjuntos",
    descricao: "Cropped com bordado em relevo e saia longa em camadas.",
    fotos: ["img/produtos/conjunto-cropped-bordado-e-saia-longa-branca-01.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Conjunto cropped e jogger azul",
    categoria: "Conjuntos",
    descricao: "Cropped com bojo e alça de babado, calça jogger de cintura alta.",
    fotos: ["img/produtos/conjunto-cropped-e-jogger-azul-01.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Conjunto cropped e jogger rosa",
    categoria: "Conjuntos",
    descricao: "Cropped com bojo e alça de babado, calça jogger de cintura alta.",
    fotos: ["img/produtos/conjunto-cropped-e-jogger-rosa-01.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Conjunto cropped e jogger nude",
    categoria: "Conjuntos",
    descricao: "Cropped com bojo e alça de babado, calça jogger de cintura alta.",
    fotos: ["img/produtos/conjunto-cropped-e-jogger-nude-01.jpg", "img/produtos/conjunto-cropped-e-jogger-nude-02.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Conjunto listrado marrom e branco",
    categoria: "Conjuntos",
    descricao: "Cropped com decote V e saia longa ampla em listra diagonal.",
    fotos: ["img/produtos/conjunto-listrado-marrom-e-branco-01.jpg", "img/produtos/conjunto-listrado-marrom-e-branco-02.jpg", "img/produtos/conjunto-listrado-marrom-e-branco-03.jpg"],
    videos: [],
    novo: false,
    destaque: true,
  },
  {
    nome: "Conjunto cropped azul e saia longa com fenda",
    categoria: "Conjuntos",
    descricao: "Cropped azul bordado e saia off-white em camadas, com fenda.",
    fotos: ["img/produtos/conjunto-cropped-azul-e-saia-longa-com-fenda-01.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Vestido longo poá",
    categoria: "Vestidos longos",
    descricao: "Alça fina, decote V e corpo franzido. Sai em off-white e em marrom.",
    fotos: ["img/produtos/vestido-longo-poa-01.jpg", "img/produtos/vestido-longo-poa-02.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Conjunto cropped branco e saia listrada",
    categoria: "Conjuntos",
    descricao: "Cropped branco e saia longa ampla em listra fina azul.",
    fotos: ["img/produtos/conjunto-cropped-branco-e-saia-listrada-01.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Vestido chemise longo listrado azul",
    categoria: "Vestidos longos",
    descricao: "Gola de camisa, botões, recorte na cintura e listras em azul e branco.",
    fotos: ["img/produtos/vestido-chemise-longo-listrado-azul-01.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Vestido chemise longo rosa",
    categoria: "Vestidos longos",
    descricao: "Gola de camisa, recortes na cintura e fenda na frente.",
    fotos: ["img/produtos/vestido-chemise-longo-rosa-01.jpg", "img/produtos/vestido-chemise-longo-rosa-02.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Vestido longo estrelas frente única",
    categoria: "Vestidos longos",
    descricao: "Estampa de estrelas azuis, recortes na cintura e barra listrada.",
    fotos: ["img/produtos/vestido-longo-estrelas-frente-unica-01.jpg", "img/produtos/vestido-longo-estrelas-frente-unica-02.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Vestido corset com medalhão vermelho",
    categoria: "Vestidos curtos",
    descricao: "Corset tomara que caia, medalhão dourado na cintura e drapeado de tule que cai na lateral.",
    fotos: ["img/produtos/vestido-corset-com-medalhao-vermelho-01.jpg", "img/produtos/vestido-corset-com-medalhao-vermelho-02.jpg"],
    videos: ["video/vestido-corset-com-medalhao-vermelho.mp4"],
    novo: false,
    destaque: true,
  },
  {
    nome: "Vestido corset com medalhão azul",
    categoria: "Vestidos curtos",
    descricao: "Corset tomara que caia, medalhão dourado na cintura e drapeado de tule que cai na lateral.",
    fotos: ["img/produtos/vestido-corset-com-medalhao-azul-01.jpg", "img/produtos/vestido-corset-com-medalhao-azul-02.jpg", "img/produtos/vestido-corset-com-medalhao-azul-03.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Vestido corset com medalhão rosa",
    categoria: "Vestidos curtos",
    descricao: "Corset tomara que caia, medalhão dourado na cintura e saia drapeada.",
    fotos: [],
    videos: ["video/vestido-corset-com-medalhao-rosa.mp4"],
    novo: false,
    destaque: false,
  },
  {
    nome: "Vestido corset em tela rosa",
    categoria: "Vestidos curtos",
    descricao: "Corset em tela vazada com drapeado lateral longo.",
    fotos: ["img/produtos/vestido-corset-em-tela-rosa-01.jpg", "img/produtos/vestido-corset-em-tela-rosa-02.jpg", "img/produtos/vestido-corset-em-tela-rosa-03.jpg"],
    videos: [],
    novo: false,
    destaque: false,
  },
  {
    nome: "Vestido corset em tela branco",
    categoria: "Vestidos curtos",
    descricao: "Corset em tela vazada com drapeado lateral longo.",
    fotos: ["img/produtos/vestido-corset-em-tela-branco-01.jpg", "img/produtos/vestido-corset-em-tela-branco-02.jpg"],
    videos: ["video/vestido-corset-em-tela-branco.mp4"],
    novo: false,
    destaque: false,
  },
  {
    nome: "Vestido vermelho decote gota drapeado",
    categoria: "Vestidos curtos",
    descricao: "Frente única com decote profundo em gota, drapeado na frente e costas nuas com correntinha.",
    fotos: ["img/produtos/vestido-vermelho-decote-gota-drapeado-01.jpg", "img/produtos/vestido-vermelho-decote-gota-drapeado-02.jpg"],
    videos: ["video/vestido-vermelho-decote-gota-drapeado.mp4"],
    novo: false,
    destaque: false,
  },
  {
    nome: "Vestido pink com fivela dourada",
    categoria: "Vestidos curtos",
    descricao: "Decote V profundo preso por fivela dourada e modelagem justa.",
    fotos: [],
    videos: ["video/vestido-pink-com-fivela-dourada.mp4"],
    novo: false,
    destaque: false,
  },
  {
    nome: "Vestido verde menta com fivela dourada",
    categoria: "Vestidos curtos",
    descricao: "Decote V profundo preso por fivela dourada e modelagem justa.",
    fotos: [],
    videos: ["video/vestido-verde-menta-com-fivela-dourada.mp4"],
    novo: false,
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
