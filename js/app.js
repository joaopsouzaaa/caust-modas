/* =============================================================
   CAUST — Lógica do site
   Não é preciso editar este arquivo no dia a dia.
   Tudo que muda está em js/dados.js
   ============================================================= */

(function () {
  "use strict";

  /* ---------- Estado ---------------------------------------- */

  let modo = "atacado";           // "atacado" | "varejo"
  let categoriaAtiva = "Todos";

  try {
    const salvo = localStorage.getItem("caust_modo");
    if (salvo === "atacado" || salvo === "varejo") modo = salvo;
  } catch (e) { /* navegação privada: segue com o padrão */ }

  /* ---------- Tema claro / escuro --------------------------- */
  /* Três estados:
       "auto"    segue o aparelho, via prefers-color-scheme no CSS
       "claro"   força claro mesmo com o celular no escuro
       "escuro"  força escuro mesmo com o celular no claro

     A troca visual é 100% do CSS. Este código só guarda a escolha,
     marca qual botão está ativo e acerta a cor da barra do
     navegador. O tema em si já foi aplicado pelo script inline no
     <head>, antes da página pintar — por isso não pisca.          */

  const TEMAS = ["auto", "claro", "escuro"];
  let tema = "auto";

  try {
    const salvo = localStorage.getItem("caust_tema");
    if (TEMAS.indexOf(salvo) >= 0) tema = salvo;
  } catch (e) { /* navegação privada */ }

  // Deixa a barra do navegador na mesma cor do cabeçalho.
  function corDaBarra() {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) return;
    const cor = getComputedStyle(document.documentElement)
      .getPropertyValue("--painel")
      .trim();
    if (cor) meta.setAttribute("content", cor);
  }

  function aplicarTema(novo, avisar) {
    if (TEMAS.indexOf(novo) < 0) novo = "auto";
    tema = novo;
    document.documentElement.setAttribute("data-tema", tema);

    try { localStorage.setItem("caust_tema", tema); } catch (e) { /* ok */ }

    $$("[data-tema-btn]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.temaBtn === tema));
    });

    corDaBarra();
    if (avisar) evento("EscolheuTema", { tema: tema });
  }

  // No modo automático, o aparelho pode mudar de tema com a página
  // aberta (modo noturno por horário). O CSS acompanha sozinho;
  // só a cor da barra do navegador precisa ser reavisada.
  function observarSistema() {
    if (!window.matchMedia) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const aoMudar = function () { if (tema === "auto") corDaBarra(); };
    if (mq.addEventListener) mq.addEventListener("change", aoMudar);
    else if (mq.addListener) mq.addListener(aoMudar);
  }

  /* ---------- Meta Pixel ------------------------------------ */
  /* Só carrega se houver um ID configurado em dados.js.        */

  function iniciarPixel() {
    const id = (LOJA.metaPixelId || "").trim();
    if (!id) return;

    /* eslint-disable */
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
    (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */

    fbq("init", id);
    fbq("track", "PageView");
  }

  // Dispara evento no Pixel sem quebrar o site quando ele não existe.
  function evento(nome, dados, padrao) {
    if (typeof fbq !== "function") return;
    fbq(padrao ? "track" : "trackCustom", nome, dados || {});
  }

  /* ---------- WhatsApp -------------------------------------- */

  // Monta o link. Com o número preenchido, já leva a mensagem escrita.
  // Sem o número, cai no link curto do Linktree (funciona, mas sem texto).
  function linkZap(qual, texto) {
    const canal = LOJA.whatsapp[qual] || LOJA.whatsapp.varejo;
    const numero = (canal.numero || "").replace(/\D/g, "");
    if (numero) {
      return "https://wa.me/" + numero + "?text=" + encodeURIComponent(texto || "");
    }
    return canal.linkCurto || "#";
  }

  // Qual conversa cada tipo de botão abre.
  function destinoZap(tipo) {
    if (tipo === "atacado") {
      return { canal: "atacado", texto: LOJA.mensagens.atacado };
    }
    if (tipo === "novidades") {
      return { canal: modo, texto: LOJA.mensagens.novidades };
    }
    return { canal: modo, texto: LOJA.mensagens[modo] };
  }

  // Escreve o href de verdade em cada botão de WhatsApp e de Instagram.
  // São links mesmo, não window.open. window.open é bloqueado por
  // bloqueador de pop-up, dentro de iframe e em parte dos navegadores
  // de celular — e é justamente no celular que está o tráfego do Meta.
  // Como link, também funciona "abrir em nova aba" e clique do meio.
  function atualizarLinks() {
    $$("[data-zap]").forEach(function (el) {
      if (el.id === "modalZap") return;      // esse muda a cada peça
      const d = destinoZap(el.dataset.zap);
      el.href = linkZap(d.canal, d.texto);
      el.target = "_blank";
      el.rel = "noopener";
    });

    $$("[data-instagram]").forEach(function (el) {
      el.href = "https://www.instagram.com/" + LOJA.instagram + "/";
      el.target = "_blank";
      el.rel = "noopener";
    });
  }

  // Só registra no Pixel. Quem navega é o próprio link.
  function rastrearZap(origem, peca) {
    const dados = { origem: origem, modo: modo };
    if (peca) dados.peca = peca;
    evento("Contact", dados, true);          // evento padrão do Meta
    evento("ClicouWhatsApp", dados, false);  // evento próprio, para o relatório
  }

  /* ---------- Utilidades ------------------------------------ */

  // O site não mostra preço nem tamanho: tudo é tratado no WhatsApp.
  const CONSULTA = "Tamanhos e valores no WhatsApp";

  // Capa de vídeo: mesmo nome do arquivo, com .jpg
  function capaDoVideo(src) {
    return src.replace(/\.[a-z0-9]+$/i, ".jpg");
  }

  // Fotos primeiro, depois os vídeos, na ordem do dados.js
  function midiasDaPeca(p) {
    const fotos = (p.fotos || []).map((src) => ({ tipo: "foto", src: src }));
    const videos = (p.videos || []).map((src) => ({
      tipo: "video",
      src: src,
      capa: capaDoVideo(src),
    }));
    return fotos.concat(videos);
  }

  function capaDaPeca(p) {
    if (p.fotos && p.fotos.length) return p.fotos[0];
    if (p.videos && p.videos.length) return capaDoVideo(p.videos[0]);
    return "";
  }

  // Espaço reservado elegante para quando ainda não temos a foto.
  function reservado(rotulo) {
    return (
      '<div class="reservado">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">' +
      '<rect x="3" y="3" width="18" height="18" rx="2"/>' +
      '<circle cx="8.5" cy="8.5" r="1.5"/>' +
      '<path d="m21 15-5-5L5 21" stroke-linejoin="round"/>' +
      "</svg>" +
      "<span>" + (rotulo || "Foto da peça") + "</span>" +
      "</div>"
    );
  }

  function midia(imagem, alt) {
    if (imagem) {
      return '<img src="' + imagem + '" alt="' + alt + '" loading="lazy">';
    }
    return reservado();
  }

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel, raiz) =>
    Array.prototype.slice.call((raiz || document).querySelectorAll(sel));

  /* ---------- Catálogo -------------------------------------- */
  /* Uma faixa por categoria, cada uma rolando na horizontal.
     Em grade vertical, 35 peças viravam 18 linhas de rolagem no
     celular. Em faixas viram 7. E arrastar para o lado é o gesto
     que a cliente já usa no Instagram e na Shopee.               */

  // Atalhos que levam até a faixa da categoria.
  function montarFiltros() {
    const alvo = $("#filtros");
    if (!alvo) return;

    const ativas = CATEGORIAS.filter((c) =>
      PRODUTOS.some((p) => p.categoria === c)
    );

    alvo.innerHTML = ativas
      .map(
        (c) =>
          '<a class="filtro" href="#cat-' + slug(c) + '">' + c + "</a>"
      )
      .join("");

    alvo.addEventListener("click", function (ev) {
      const a = ev.target.closest(".filtro");
      if (a) evento("FiltrouCatalogo", { categoria: a.textContent, modo: modo });
    });
  }

  function slug(texto) {
    return texto
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .toLowerCase()
      .replace(/^-|-$/g, "");
  }

  const ICONE_FOTO =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">' +
    '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="12" cy="12" r="3.2"/></svg>';
  const ICONE_PLAY =
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg>';

  // Selo no canto do card: avisa que tem mais foto e vídeo lá dentro.
  // Sem ele a cliente não descobre que dá para ver a peça de outros ângulos.
  function seloMidias(p) {
    const nFotos = (p.fotos || []).length;
    const nVideos = (p.videos || []).length;
    if (nFotos < 2 && !nVideos) return "";
    let html = '<span class="card__qtd">';
    if (nFotos > 1) html += ICONE_FOTO + nFotos;
    if (nVideos) html += ICONE_PLAY + (nVideos > 1 ? nVideos : "Vídeo");
    return html + "</span>";
  }

  function cardProduto(p) {
    const indice = PRODUTOS.indexOf(p);

    return (
      '<button class="card" type="button" data-produto="' + indice + '">' +
      '<div class="card__midia">' +
      midia(capaDaPeca(p), p.nome) +
      (p.novo ? '<span class="card__selo">Novidade</span>' : "") +
      seloMidias(p) +
      "</div>" +
      '<div class="card__corpo">' +
      '<h3 class="card__nome">' + p.nome + "</h3>" +
      '<div class="card__preco">Consulte<small>' + CONSULTA + "</small></div>" +
      "</div></button>"
    );
  }

  const SETA =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">' +
    '<path d="m9 18 6-6-6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function montarProdutos() {
    const alvo = $("#categorias");
    if (!alvo) return;

    const ativas = CATEGORIAS.filter((c) =>
      PRODUTOS.some((p) => p.categoria === c)
    );

    if (!ativas.length) {
      alvo.innerHTML =
        '<div class="container"><p class="vazio">Nenhuma peça cadastrada ainda. ' +
        "Chame a gente no WhatsApp que mostramos o que temos.</p></div>";
      return;
    }

    alvo.innerHTML = ativas
      .map(function (cat) {
        const lista = PRODUTOS.filter((p) => p.categoria === cat);
        const id = slug(cat);
        return (
          '<section class="faixa-cat" id="cat-' + id + '">' +
          '<div class="container faixa-cat__topo">' +
          "<h3>" + cat + "</h3>" +
          '<div class="faixa-cat__conta">' + lista.length +
          (lista.length === 1 ? " peça" : " peças") + "</div>" +
          '<div class="faixa-cat__setas">' +
          '<button type="button" class="carrossel__seta" data-ant="' + id +
          '" aria-label="Voltar em ' + cat + '">' + SETA + "</button>" +
          '<button type="button" class="carrossel__seta" data-prox="' + id +
          '" aria-label="Avançar em ' + cat + '">' + SETA + "</button>" +
          "</div></div>" +
          '<div class="carrossel__trilho faixa-cat__trilho" id="trilho-' + id +
          '" tabindex="0" role="region" aria-label="Peças em ' + cat + '">' +
          lista.map(cardProduto).join("") +
          "</div></section>"
        );
      })
      .join("");

    // Liga o carrossel de cada faixa
    ativas.forEach(function (cat) {
      const id = slug(cat);
      montarCarrossel(
        $("#trilho-" + id),
        null,
        $('[data-ant="' + id + '"]'),
        $('[data-prox="' + id + '"]')
      );
    });
  }

  /* ---------- Modal do produto ------------------------------ */

  /* ---------- Galeria de fotos e vídeos --------------------- */
  /* Usada em três lugares: dentro do modal da peça, no visor de
     tela cheia e nas fotos da loja. Rola com scroll-snap, então no
     celular é só arrastar com o dedo; setas e pontos são para o
     computador. Vídeo só carrega quando a cliente aperta o play
     (preload="none"): são 11 vídeos, e baixar todos de uma vez
     travaria o site no 4G.                                       */

  const SETA_ESQ =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">' +
    '<path d="m15 18-6-6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const SETA_DIR =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">' +
    '<path d="m9 18 6-6-6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function galeriaHTML(itens, alt) {
    if (!itens.length) return reservado();

    const slides = itens
      .map(function (m, i) {
        const rotulo = m.legenda || alt + " — " + (m.tipo === "video" ? "vídeo" : "foto " + (i + 1));
        const conteudo =
          m.tipo === "video"
            ? '<video src="' + m.src + '" poster="' + m.capa + '" controls playsinline ' +
              'preload="none" aria-label="' + rotulo + '"></video>'
            : '<img src="' + m.src + '" alt="' + rotulo + '"' + (i ? ' loading="lazy"' : "") + ">";
        return (
          '<div class="galeria__item galeria__item--' + m.tipo + '" data-i="' + i + '">' +
          conteudo + "</div>"
        );
      })
      .join("");

    if (itens.length === 1) {
      return '<div class="galeria"><div class="galeria__trilho">' + slides + "</div></div>";
    }

    const pontos = itens
      .map(function (m, i) {
        return (
          '<button type="button" class="galeria__ponto' +
          (m.tipo === "video" ? " galeria__ponto--video" : "") +
          '" data-ir="' + i + '" aria-label="Ver ' +
          (m.tipo === "video" ? "vídeo" : "foto " + (i + 1)) + '"></button>'
        );
      })
      .join("");

    return (
      '<div class="galeria">' +
      '<div class="galeria__trilho" tabindex="0">' + slides + "</div>" +
      '<button type="button" class="galeria__seta galeria__seta--ant" aria-label="Anterior">' + SETA_ESQ + "</button>" +
      '<button type="button" class="galeria__seta galeria__seta--prox" aria-label="Próxima">' + SETA_DIR + "</button>" +
      '<div class="galeria__pontos">' + pontos + "</div>" +
      '<span class="galeria__conta" aria-live="polite"></span>' +
      "</div>"
    );
  }

  function pausarVideos(raiz) {
    $$("video", raiz).forEach(function (v) { if (!v.paused) v.pause(); });
  }

  // Liga setas, pontos e contador. Devolve irPara(i) para quem abriu.
  function ligarGaleria(raiz) {
    const gal = raiz.querySelector(".galeria");
    if (!gal) return function () {};
    const trilho = gal.querySelector(".galeria__trilho");
    const itens = Array.prototype.slice.call(trilho.children);
    const conta = gal.querySelector(".galeria__conta");
    const ant = gal.querySelector(".galeria__seta--ant");
    const prox = gal.querySelector(".galeria__seta--prox");
    const pontos = $$(".galeria__ponto", gal);
    let atual = -1;

    function indice() {
      return Math.round(trilho.scrollLeft / (trilho.clientWidth || 1));
    }

    function irPara(i, suave) {
      const alvo = Math.max(0, Math.min(i, itens.length - 1));
      trilho.scrollTo({
        left: alvo * trilho.clientWidth,
        behavior: suave === false ? "auto" : "smooth",
      });
    }

    function atualizar() {
      const i = indice();
      if (i === atual) return;
      atual = i;
      pausarVideos(gal);   // trocou de slide, o vídeo anterior para
      pontos.forEach((b, n) => b.setAttribute("aria-current", String(n === i)));
      const eVideo = !!itens[i] && itens[i].classList.contains("galeria__item--video");
      gal.classList.toggle("galeria--no-video", eVideo);
      if (conta) conta.textContent = eVideo ? "Vídeo" : i + 1 + " / " + itens.length;
      if (ant) ant.disabled = i <= 0;
      if (prox) prox.disabled = i >= itens.length - 1;
    }

    if (ant) ant.addEventListener("click", () => irPara(indice() - 1));
    if (prox) prox.addEventListener("click", () => irPara(indice() + 1));
    pontos.forEach((b) =>
      b.addEventListener("click", () => irPara(Number(b.dataset.ir)))
    );

    trilho.addEventListener("keydown", function (ev) {
      if (ev.key === "ArrowRight") { ev.preventDefault(); irPara(indice() + 1); }
      if (ev.key === "ArrowLeft")  { ev.preventDefault(); irPara(indice() - 1); }
    });

    let esperando = false;
    trilho.addEventListener("scroll", function () {
      if (esperando) return;
      esperando = true;
      window.requestAnimationFrame(function () { atualizar(); esperando = false; });
    }, { passive: true });

    atualizar();
    return irPara;
  }

  /* ---------- Visor em tela cheia --------------------------- */
  /* Abre por cima de tudo. No modal a foto fica pequena de
     propósito (o botão do WhatsApp precisa aparecer), então quem
     quer ver o detalhe do tecido toca na foto e ela abre inteira. */

  let visorIrPara = null;
  let focoAntesDoVisor = null;

  function abrirVisor(itens, alt, inicio) {
    const visor = $("#visor");
    if (!visor || !itens.length) return;
    focoAntesDoVisor = document.activeElement;
    $("#visorMidia").innerHTML = galeriaHTML(itens, alt);
    visor.dataset.aberto = "true";
    document.body.classList.add("travado");
    visorIrPara = ligarGaleria($("#visorMidia"));
    visorIrPara(inicio || 0, false);
    const trilho = $("#visorMidia .galeria__trilho");
    if (trilho) trilho.focus({ preventScroll: true });
  }

  function fecharVisor() {
    const visor = $("#visor");
    if (!visor || visor.dataset.aberto !== "true") return false;
    pausarVideos(visor);
    visor.dataset.aberto = "false";
    $("#visorMidia").innerHTML = "";
    visorIrPara = null;
    // Se o modal da peça continua aberto por baixo, a página segue travada
    if ($("#modal").dataset.aberto !== "true") document.body.classList.remove("travado");
    if (focoAntesDoVisor && focoAntesDoVisor.focus) focoAntesDoVisor.focus({ preventScroll: true });
    return true;
  }

  /* ---------- Modal do produto ------------------------------ */

  let produtoAberto = null;

  function abrirModal(indice) {
    const p = PRODUTOS[indice];
    if (!p) return;
    produtoAberto = p;

    const itens = midiasDaPeca(p);
    const alvo = $("#modalMidia");
    alvo.innerHTML = galeriaHTML(itens, p.nome);
    ligarGaleria(alvo);

    // Tocar na foto abre em tela cheia, no mesmo ponto da sequência
    $$(".galeria__item--foto", alvo).forEach(function (el) {
      el.addEventListener("click", function () {
        abrirVisor(itens, p.nome, Number(el.dataset.i));
      });
    });

    $("#modalCategoria").textContent = p.categoria;
    $("#modalNome").textContent = p.nome;
    $("#modalPreco").textContent = "Consulte tamanhos e valores";
    $("#modalDescricao").textContent = p.descricao || "";
    $("#modalAtacado").textContent =
      LOJA.atacado.grade || "Grade e condições combinadas no WhatsApp";
    $("#modalPolitica").textContent = LOJA.politicaTrocas || "";

    const zap = $("#modalZap");
    zap.href = linkZap(modo, LOJA.mensagens.produto(p.nome, modo));
    zap.target = "_blank";
    zap.rel = "noopener";

    const modal = $("#modal");
    modal.dataset.aberto = "true";
    document.body.classList.add("travado");
    // Abre sempre do topo, com a foto à vista. Sem preventScroll o
    // foco no botão rolava a folha para baixo e cortava a foto.
    $(".modal__caixa").scrollTop = 0;
    $("#modalZap").focus({ preventScroll: true });

    evento(
      "ViewContent",
      {
        content_name: p.nome,
        content_category: p.categoria,
        content_type: "product",
        modo: modo,
      },
      true
    );
  }

  function fecharModal() {
    pausarVideos($("#modal"));
    $("#modalMidia").innerHTML = "";   // solta o vídeo, se estava tocando
    $("#modal").dataset.aberto = "false";
    document.body.classList.remove("travado");
    produtoAberto = null;
  }

  /* ---------- Modo atacado / varejo ------------------------- */

  const TEXTOS = {
    atacado: {
      hero:
        "Vestido de festa, body, peça country e look elegante direto do maior polo " +
        "de confecção de Goiás. Grade que gira, com novidade toda semana.",
      catalogo:
        "Uma amostra do que você leva para a sua loja. Clique na peça para ver " +
        "todas as fotos e vídeos e pedir tamanhos e valor de atacado no WhatsApp.",
      tituloFinal: "Pronta para renovar o estoque da sua loja?",
      textoFinal:
        "Chame a gente no WhatsApp e receba as novidades da semana com preço de " +
        "atacado. Respondemos rápido, no horário comercial.",
    },
    varejo: {
      hero:
        "Vestido de festa, body, peça country e look elegante escolhidos a dedo. " +
        "Venha conhecer a loja no Goiás Center Modas ou chame no WhatsApp.",
      catalogo:
        "Uma amostra do que você encontra na loja. Clique na peça para ver " +
        "todas as fotos e vídeos e consultar tamanhos e valores no WhatsApp.",
      tituloFinal: "Achou a peça certa?",
      textoFinal:
        "Chame a gente no WhatsApp para conferir tamanho e disponibilidade, ou " +
        "passe na loja para experimentar.",
    },
  };

  function aplicarModo(novo, avisar) {
    modo = novo;
    document.documentElement.dataset.modo = modo;

    try { localStorage.setItem("caust_modo", modo); } catch (e) { /* ok */ }

    $$("[data-modo-btn]").forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.modoBtn === modo))
    );

    const t = TEXTOS[modo];
    const heroP = $("[data-texto-hero]");
    const catP = $("[data-texto-catalogo]");
    const tFinal = $("[data-titulo-final]");
    const pFinal = $("[data-texto-final]");
    if (heroP) heroP.textContent = t.hero;
    if (catP) catP.textContent = t.catalogo;
    if (tFinal) tFinal.textContent = t.tituloFinal;
    if (pFinal) pFinal.textContent = t.textoFinal;

    montarProdutos();
    atualizarLinks();   // o modo decide para qual WhatsApp o botão leva

    if (avisar) evento("EscolheuModo", { modo: modo });
  }

  /* ---------- Condições de atacado -------------------------- */

  function montarPassos() {
    const alvo = $("#passosAtacado");
    const passos = LOJA.passosAtacado;
    if (!alvo) return;

    if (!passos || !passos.length) {
      const bloco = $(".atacado__como");
      if (bloco) bloco.hidden = true;
      return;
    }

    alvo.innerHTML = passos
      .map(function (p) {
        return (
          "<li><h4>" + p.titulo + "</h4><p>" + p.texto + "</p></li>"
        );
      })
      .join("");
  }

  function montarCondicoes() {
    const alvo = $("#condicoes");
    if (!alvo) return;

    const itens = [
      { rotulo: "Pedido mínimo", valor: LOJA.atacado.pedidoMinimo },
      { rotulo: "Pagamento", valor: LOJA.atacado.formasPagamento },
      { rotulo: "Envio", valor: LOJA.atacado.envio },
    ];

    alvo.innerHTML = itens
      .map(function (i) {
        const pendente = !i.valor;
        return (
          '<div class="condicao">' +
          '<span class="condicao__rotulo">' + i.rotulo + "</span>" +
          '<div class="condicao__valor" data-pendente="' + pendente + '">' +
          (i.valor || "Consultar no WhatsApp") +
          "</div></div>"
        );
      })
      .join("");
  }

  /* ---------- Depoimentos ----------------------------------- */

  function montarDepoimentos() {
    const secao = $("#secaoDepoimentos");
    const trilho = $("#depoimentos");
    if (!secao || !trilho || typeof DEPOIMENTOS === "undefined") return;

    // Fica oculta enquanto os depoimentos não forem reais.
    // Ver a explicação no topo do bloco DEPOIMENTOS em dados.js.
    const publicar =
      typeof DEPOIMENTOS_PUBLICADOS !== "undefined" &&
      DEPOIMENTOS_PUBLICADOS &&
      DEPOIMENTOS.length > 0;

    if (!publicar) {
      secao.hidden = true;
      return;
    }
    secao.hidden = false;

    trilho.innerHTML = DEPOIMENTOS.map(function (d) {
      // Só mostra a linha de quem escreveu se houver nome.
      const quem = [d.nome, d.cidade].filter(Boolean).join(" · ");
      return (
        '<figure class="depoimento">' +
        '<div class="depoimento__aspas" aria-hidden="true">&ldquo;</div>' +
        "<blockquote><p>" + d.texto + "</p></blockquote>" +
        '<figcaption class="depoimento__autora">' +
        (quem ? "<strong>" + quem + "</strong>" : "") +
        (d.tipo || "") +
        "</figcaption></figure>"
      );
    }).join("");

    montarCarrossel(trilho, $("#depoPontos"), $("#depoAnt"), $("#depoProx"));
  }

  /* ---------- Carrossel ------------------------------------- */
  /* Rola de verdade, com scroll-snap: no celular a pessoa arrasta
     com o dedo sem precisar de JavaScript nenhum. As setas e os
     pontos são um extra para quem está no computador.            */

  /* Arrastar com o mouse, como se fosse o dedo.
     Só para ponteiro de mouse: no celular a rolagem por toque já é
     nativa, e interferir nela só atrapalha. */
  function ligarArrasto(trilho) {
    let pressionado = false;
    let arrastou = false;
    let xInicial = 0;
    let scrollInicial = 0;

    trilho.addEventListener("pointerdown", function (ev) {
      if (ev.pointerType !== "mouse" || ev.button !== 0) return;
      pressionado = true;
      arrastou = false;
      xInicial = ev.clientX;
      scrollInicial = trilho.scrollLeft;
    });

    trilho.addEventListener("pointermove", function (ev) {
      if (!pressionado) return;
      const dx = ev.clientX - xInicial;

      // Só vira arrasto depois de 4px. Abaixo disso é clique com a
      // mão trêmula, e a peça tem que abrir normalmente.
      if (!arrastou && Math.abs(dx) > 4) {
        arrastou = true;
        trilho.classList.add("arrastando");
        // O scroll-snap briga com o arrasto: puxa de volta no meio
        // do movimento. Fica desligado enquanto o botão está preso.
        trilho.style.scrollSnapType = "none";
        try { trilho.setPointerCapture(ev.pointerId); } catch (e) { /* ok */ }
      }

      if (arrastou) {
        ev.preventDefault();
        trilho.scrollLeft = scrollInicial - dx;
      }
    });

    function soltar(ev) {
      if (!pressionado) return;
      pressionado = false;
      trilho.classList.remove("arrastando");
      // Religar o snap faz a faixa assentar na peça mais próxima.
      trilho.style.scrollSnapType = "";
      if (ev && ev.pointerId != null) {
        try { trilho.releasePointerCapture(ev.pointerId); } catch (e) { /* ok */ }
      }
    }

    trilho.addEventListener("pointerup", soltar);
    trilho.addEventListener("pointercancel", soltar);
    trilho.addEventListener("pointerleave", soltar);

    // Depois de arrastar, o clique que vem junto não pode abrir a
    // peça. Na fase de captura, para barrar antes de chegar no
    // handler que abre o modal.
    trilho.addEventListener("click", function (ev) {
      if (arrastou) {
        ev.preventDefault();
        ev.stopPropagation();
        arrastou = false;
      }
    }, true);

    // Sem isto o navegador tenta "arrastar a imagem" no meio do gesto
    trilho.addEventListener("dragstart", (ev) => ev.preventDefault());
  }

  function montarCarrossel(trilho, pontos, ant, prox) {
    const itens = Array.prototype.slice.call(trilho.children);
    if (!itens.length) return;

    ligarArrasto(trilho);

    function passo() {
      // largura de um item + o espaço entre eles
      if (itens.length < 2) return itens[0].offsetWidth;
      return itens[1].offsetLeft - itens[0].offsetLeft;
    }

    function indiceAtual() {
      const p = passo() || 1;
      return Math.round(trilho.scrollLeft / p);
    }

    function irPara(i) {
      const alvo = Math.max(0, Math.min(i, itens.length - 1));
      trilho.scrollTo({
        left: itens[alvo].offsetLeft - trilho.offsetLeft,
        behavior: "smooth",
      });
    }

    if (pontos) {
      pontos.innerHTML = itens
        .map(function (_, i) {
          return (
            '<button type="button" class="carrossel__ponto" data-i="' + i +
            '" aria-label="Ver depoimento ' + (i + 1) + '"></button>'
          );
        })
        .join("");

      pontos.addEventListener("click", function (ev) {
        const b = ev.target.closest("[data-i]");
        if (b) irPara(Number(b.dataset.i));
      });
    }

    if (ant) ant.addEventListener("click", () => irPara(indiceAtual() - 1));
    if (prox) prox.addEventListener("click", () => irPara(indiceAtual() + 1));

    // Setas do teclado, já que o trilho recebe foco
    trilho.addEventListener("keydown", function (ev) {
      if (ev.key === "ArrowRight") { ev.preventDefault(); irPara(indiceAtual() + 1); }
      if (ev.key === "ArrowLeft")  { ev.preventDefault(); irPara(indiceAtual() - 1); }
    });

    function atualizar() {
      const sobra = trilho.scrollWidth - trilho.clientWidth;
      trilho.classList.toggle("tem-rolagem", sobra > 4);

      const i = indiceAtual();
      if (pontos) {
        Array.prototype.forEach.call(pontos.children, function (b, n) {
          b.setAttribute("aria-current", String(n === i));
        });
      }
      const fim = trilho.scrollWidth - trilho.clientWidth;
      if (ant) ant.disabled = trilho.scrollLeft < 8;
      if (prox) prox.disabled = trilho.scrollLeft >= fim - 8;
    }

    let esperando = false;
    trilho.addEventListener("scroll", function () {
      if (esperando) return;
      esperando = true;
      window.requestAnimationFrame(function () {
        atualizar();
        esperando = false;
      });
    }, { passive: true });

    window.addEventListener("resize", atualizar, { passive: true });
    atualizar();
  }

  /* ---------- Localização e contato ------------------------- */

  function montarLocal() {
    const e = LOJA.endereco;

    const enderecoEl = $("#endereco");
    if (enderecoEl) {
      enderecoEl.innerHTML =
        "<strong>" + e.local + "</strong><br>" +
        e.sala + "<br>" +
        e.rua + " — " + e.bairro + "<br>" +
        e.cidade + "/" + e.estado + " · CEP " + e.cep;
    }

    const horariosEl = $("#horarios");
    if (horariosEl) {
      horariosEl.innerHTML = LOJA.horarios
        .map((h) => "<li><span>" + h.dias + "</span><span>" + h.horas + "</span></li>")
        .join("");
    }

    // Contato — só mostra o que já estiver preenchido em dados.js
    const linhas = [];
    if (LOJA.whatsapp.atacado.visivel)
      linhas.push("<strong>Atacado</strong> " + LOJA.whatsapp.atacado.visivel);
    if (LOJA.whatsapp.varejo.visivel)
      linhas.push("<strong>Varejo</strong> " + LOJA.whatsapp.varejo.visivel);
    if (LOJA.email) linhas.push(LOJA.email);
    linhas.push("@" + LOJA.instagram);

    const contatoEl = $("#contato");
    if (contatoEl) contatoEl.innerHTML = linhas.join("<br>");

    const rodapeEl = $("#rodapeContato");
    if (rodapeEl) {
      rodapeEl.innerHTML =
        '<li><a href="#" data-zap="principal">Falar no WhatsApp</a></li>' +
        '<li><a href="#" data-instagram>@' + LOJA.instagram + "</a></li>" +
        (LOJA.email ? '<li><a href="mailto:' + LOJA.email + '">' + LOJA.email + "</a></li>" : "") +
        "<li>" + e.local + " · " + e.sala + "</li>";
    }

    const busca = encodeURIComponent(LOJA.enderecoBusca);

    const mapa = $("#mapa");
    if (mapa) mapa.src = "https://www.google.com/maps?q=" + busca + "&output=embed";

    const rota = $("#btnRota");
    if (rota) {
      rota.href = "https://www.google.com/maps/dir/?api=1&destination=" + busca;
      rota.addEventListener("click", () => evento("ClicouRota", { modo: modo }));
    }

    const politica = $("#politica");
    if (politica) politica.textContent = LOJA.politicaTrocas || "";

    const ano = $("#ano");
    if (ano) ano.textContent = new Date().getFullYear();
  }

  /* ---------- Fotos da loja --------------------------------- */
  /* Seção "A loja". As duas primeiras fotos ficam ao lado do texto
     (a principal grande e a segunda sobreposta no canto); as outras
     formam a faixa "Por dentro da loja" logo abaixo. Qualquer uma
     abre no visor de tela cheia, e dali dá para passar por todas.  */

  function montarGaleriaLoja(lista) {
    const sobre = $("[data-foto-sobre]");
    const faixa = $("#galeriaLoja");
    const itens = lista.map((f) => ({ tipo: "foto", src: f.src, legenda: f.legenda }));

    function botao(f, i, classe) {
      return (
        '<button type="button" class="' + classe + '" data-foto-loja="' + i + '" ' +
        'aria-label="Ampliar: ' + f.legenda + '">' +
        '<img src="' + f.src + '" alt="' + f.legenda + '" loading="lazy"></button>'
      );
    }

    if (sobre) {
      if (lista.length) {
        sobre.classList.add("loja-galeria");   // add, não substitui:
        sobre.classList.remove("duplo__midia"); // senão apaga "revela"
        sobre.innerHTML =
          botao(lista[0], 0, "loja-galeria__principal") +
          (lista[1] ? botao(lista[1], 1, "loja-galeria__inset") : "");
      } else {
        sobre.innerHTML = reservado("Foto da loja");
      }
    }

    if (faixa) {
      const resto = lista.slice(2);
      if (resto.length) {
        faixa.innerHTML = resto
          .map((f, i) => botao(f, i + 2, "loja-foto"))
          .join("");
      } else {
        const bloco = $(".por-dentro");
        if (bloco) bloco.hidden = true;
      }
    }

    document.addEventListener("click", function (ev) {
      const b = ev.target.closest("[data-foto-loja]");
      if (!b) return;
      abrirVisor(itens, "Loja CAUST", Number(b.dataset.fotoLoja));
      evento("ViuFotoLoja", { foto: Number(b.dataset.fotoLoja) + 1 });
    });
  }

  /* ---------- Fotos do hero --------------------------------- */

  function montarHero() {
    const fotos = LOJA.fotos || {};

    // Mosaico do topo: usa as peças em destaque que já têm foto.
    const comFoto = PRODUTOS.filter((p) => p.destaque && capaDaPeca(p));

    $$("[data-foto-hero]").forEach(function (slot, i) {
      const p = comFoto[i];
      slot.innerHTML = p
        ? '<img src="' + capaDaPeca(p) + '" alt="' + p.nome + '">'
        : reservado("Foto " + (i + 1));
    });

    montarGaleriaLoja(fotos.galeriaLoja || []);

    // Faixa larga da loja. Fica desligada até existir uma foto de
    // pelo menos 1200px de largura: esticada, foto pequena borra.
    const faixa = $("#faixaLoja");
    const faixaImg = $("#faixaImg");
    if (faixa && faixaImg && fotos.faixaLarga) {
      faixaImg.src = fotos.faixaLarga;
      faixa.hidden = false;
    }

    // Foto de fundo no topo — só se estiver configurada.
    const hero = $(".hero");
    if (hero && fotos.fundoHero) {
      const fundo = document.createElement("div");
      fundo.className = "hero__fundo";
      fundo.setAttribute("aria-hidden", "true");
      fundo.innerHTML = '<img src="' + fotos.fundoHero + '" alt="">';
      hero.insertBefore(fundo, hero.firstChild);
      hero.classList.add("hero--com-foto");
    }
  }

  /* ---------- Aparecer ao rolar ----------------------------- */

  function observarRevelacao() {
    const alvos = $$(".revela");
    if (!alvos.length || !("IntersectionObserver" in window)) {
      alvos.forEach((a) => a.classList.add("visivel"));
      return;
    }

    const obs = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("visivel");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    alvos.forEach((a) => obs.observe(a));
  }

  /* ---------- Eventos gerais -------------------------------- */

  function ligarEventos() {
    // Seletor de tema
    $$("[data-tema-btn]").forEach(function (btn) {
      btn.addEventListener("click", () => aplicarTema(btn.dataset.temaBtn, true));
    });

    // Alternador atacado / varejo
    $$("[data-modo-btn]").forEach(function (btn) {
      btn.addEventListener("click", () => aplicarModo(btn.dataset.modoBtn, true));
    });

    // Menu mobile
    const menu = $("#menuMobile");
    const abrir = $("#abrirMenu");
    const fechar = $("#fecharMenu");

    function estadoMenu(aberto) {
      menu.dataset.aberto = String(aberto);
      menu.setAttribute("aria-hidden", String(!aberto));
      document.body.classList.toggle("travado", aberto);
    }

    if (abrir) abrir.addEventListener("click", () => estadoMenu(true));
    if (fechar) fechar.addEventListener("click", () => estadoMenu(false));
    if (menu) {
      menu.addEventListener("click", function (ev) {
        if (ev.target.closest("a")) estadoMenu(false);
      });
    }

    // Abrir produto
    document.addEventListener("click", function (ev) {
      const card = ev.target.closest("[data-produto]");
      if (card) abrirModal(Number(card.dataset.produto));
    });

    // Fechar modal
    $$("[data-fechar-modal]").forEach((el) =>
      el.addEventListener("click", fecharModal)
    );

    // Fechar visor de tela cheia
    $$("[data-fechar-visor]").forEach((el) =>
      el.addEventListener("click", fecharVisor)
    );

    document.addEventListener("keydown", function (ev) {
      if (ev.key !== "Escape") return;
      // O visor fica por cima do modal: o Esc fecha só ele primeiro
      if (fecharVisor()) return;
      if ($("#modal").dataset.aberto === "true") fecharModal();
      if (menu && menu.dataset.aberto === "true") estadoMenu(false);
    });

    // WhatsApp do modal
    const modalZap = $("#modalZap");
    if (modalZap) {
      modalZap.addEventListener("click", function () {
        if (produtoAberto) rastrearZap("modal_produto", produtoAberto.nome);
      });
    }

    // Botões de WhatsApp: sem preventDefault. Quem navega é o href
    // montado em atualizarLinks(); aqui só registramos a conversão.
    document.addEventListener("click", function (ev) {
      const el = ev.target.closest("[data-zap]");
      if (!el || el.id === "modalZap") return;
      rastrearZap(el.dataset.zap, null);
    });

    // Instagram — o href também vem de atualizarLinks()
    document.addEventListener("click", function (ev) {
      if (!ev.target.closest("[data-instagram]")) return;
      evento("ClicouInstagram", { modo: modo });
    });

    // Sombra no cabeçalho ao rolar
    const topo = $("#topo");
    let travado = false;
    window.addEventListener(
      "scroll",
      function () {
        if (travado) return;
        travado = true;
        window.requestAnimationFrame(function () {
          topo.classList.toggle("topo--rolado", window.scrollY > 12);
          travado = false;
        });
      },
      { passive: true }
    );
  }

  /* ---------- Início ---------------------------------------- */

  function iniciar() {
    // Liga as animacoes de entrada. Sem isso o conteudo ja nasce
    // visivel, que e o comportamento correto quando o JS falha.
    document.documentElement.classList.add("js");

    aplicarTema(tema, false);
    observarSistema();

    iniciarPixel();
    montarFiltros();
    montarHero();
    montarPassos();
    montarCondicoes();
    montarDepoimentos();
    montarLocal();
    aplicarModo(modo, false);
    ligarEventos();
    observarRevelacao();

    // Aviso no console para quem for publicar sem configurar.
    const faltando = [];
    if (!LOJA.whatsapp.atacado.numero && !LOJA.whatsapp.varejo.numero)
      faltando.push("número de WhatsApp (js/dados.js)");
    if (!LOJA.metaPixelId) faltando.push("ID do Meta Pixel (js/dados.js)");
    if (faltando.length) {
      console.warn("[CAUST] Ainda falta configurar: " + faltando.join(", "));
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
