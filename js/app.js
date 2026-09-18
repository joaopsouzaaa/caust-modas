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

  function preco(valor) {
    if (!valor || valor <= 0) return null;
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
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
  const $$ = (sel) => Array.prototype.slice.call(document.querySelectorAll(sel));

  /* ---------- Catálogo -------------------------------------- */

  function montarFiltros() {
    const alvo = $("#filtros");
    if (!alvo) return;

    const lista = ["Todos", "Novidades"].concat(
      CATEGORIAS.filter((c) => PRODUTOS.some((p) => p.categoria === c))
    );

    alvo.innerHTML = lista
      .map(
        (c) =>
          '<button type="button" class="filtro" data-cat="' + c + '"' +
          ' aria-pressed="' + (c === categoriaAtiva) + '">' + c + "</button>"
      )
      .join("");

    alvo.addEventListener("click", function (ev) {
      const btn = ev.target.closest(".filtro");
      if (!btn) return;
      categoriaAtiva = btn.dataset.cat;
      $$("#filtros .filtro").forEach((b) =>
        b.setAttribute("aria-pressed", String(b.dataset.cat === categoriaAtiva))
      );
      montarProdutos();
      evento("FiltrouCatalogo", { categoria: categoriaAtiva, modo: modo });
    });
  }

  function filtrar() {
    if (categoriaAtiva === "Todos") return PRODUTOS;
    if (categoriaAtiva === "Novidades") return PRODUTOS.filter((p) => p.novo);
    return PRODUTOS.filter((p) => p.categoria === categoriaAtiva);
  }

  function montarProdutos() {
    const alvo = $("#produtos");
    if (!alvo) return;

    const lista = filtrar();

    if (!lista.length) {
      alvo.innerHTML =
        '<p class="vazio">Nenhuma peça nesta categoria no momento. ' +
        "Chame a gente no WhatsApp que mostramos o que temos.</p>";
      return;
    }

    alvo.innerHTML = lista
      .map(function (p) {
        const indice = PRODUTOS.indexOf(p);
        const valor = modo === "atacado" ? p.precoAtacado : p.preco;
        const texto = preco(valor);
        const rotulo = modo === "atacado" ? "Preço de atacado" : "Preço de varejo";

        return (
          '<button class="card" type="button" data-produto="' + indice + '">' +
          '<div class="card__midia">' +
          midia(p.imagem, p.nome) +
          (p.novo ? '<span class="card__selo">Novidade</span>' : "") +
          "</div>" +
          '<div class="card__corpo">' +
          '<span class="card__categoria">' + p.categoria + "</span>" +
          '<h3 class="card__nome">' + p.nome + "</h3>" +
          '<div class="card__preco">' +
          (texto ? texto + "<small>" + rotulo + "</small>"
                 : "Consultar<small>Valores no WhatsApp</small>") +
          "</div></div></button>"
        );
      })
      .join("");
  }

  /* ---------- Modal do produto ------------------------------ */

  let produtoAberto = null;

  function abrirModal(indice) {
    const p = PRODUTOS[indice];
    if (!p) return;
    produtoAberto = p;

    const valor = modo === "atacado" ? p.precoAtacado : p.preco;
    const texto = preco(valor);

    $("#modalMidia").innerHTML = midia(p.imagem, p.nome);
    $("#modalCategoria").textContent = p.categoria;
    $("#modalNome").textContent = p.nome;
    $("#modalPreco").innerHTML = texto
      ? texto + ' <small style="font-size:.7rem;letter-spacing:.14em;' +
        'text-transform:uppercase;color:var(--tinta-suave)">' +
        (modo === "atacado" ? "atacado" : "varejo") + "</small>"
      : "Consultar valores";
    $("#modalDescricao").textContent = p.descricao || "";
    $("#modalTamanhos").textContent = p.tamanhos || "Consultar";
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
    $("#modalZap").focus();

    evento(
      "ViewContent",
      {
        content_name: p.nome,
        content_category: p.categoria,
        content_type: "product",
        value: valor || 0,
        currency: "BRL",
        modo: modo,
      },
      true
    );
  }

  function fecharModal() {
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
        "os detalhes e pedir o valor de atacado no WhatsApp.",
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
        "Uma amostra do que você encontra na loja. Clique na peça para ver os " +
        "detalhes e falar com a gente no WhatsApp.",
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
      { rotulo: "Grade", valor: LOJA.atacado.grade },
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

  function montarCarrossel(trilho, pontos, ant, prox) {
    const itens = Array.prototype.slice.call(trilho.children);
    if (!itens.length) return;

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

  /* ---------- Fotos do hero --------------------------------- */

  function montarHero() {
    const fotos = LOJA.fotos || {};

    // Mosaico do topo: usa as peças em destaque que já têm foto.
    const comFoto = PRODUTOS.filter((p) => p.destaque && p.imagem);

    $$("[data-foto-hero]").forEach(function (slot, i) {
      const p = comFoto[i];
      slot.innerHTML = p
        ? '<img src="' + p.imagem + '" alt="' + p.nome + '">'
        : reservado("Foto " + (i + 1));
    });

    // Seção "A loja": foto da fachada como principal e, sobreposta
    // num canto, a foto de dentro. A segunda entra pequena de
    // propósito — é onde a resolução dela se sustenta.
    const sobre = $("[data-foto-sobre]");
    if (sobre) {
      if (fotos.loja || fotos.interior) {
        sobre.classList.add("loja-galeria");   // add, não substitui:
        sobre.classList.remove("duplo__midia"); // senão apaga "revela"
        sobre.innerHTML =
          (fotos.loja
            ? '<div class="loja-galeria__principal">' +
              '<img src="' + fotos.loja + '" ' +
              'alt="Fachada da loja CAUST, sala 108 do Goiás Center Modas">' +
              "</div>"
            : "") +
          (fotos.interior
            ? '<div class="loja-galeria__inset">' +
              '<img src="' + fotos.interior + '" ' +
              'alt="Interior da loja CAUST, com as araras e a mesa de peças">' +
              "</div>"
            : "");
      } else {
        sobre.innerHTML = reservado("Foto da loja");
      }
    }

    // Faixa larga da loja. Fica desligada até existir uma foto de
    // pelo menos 1200px de largura: esticada, foto pequena borra.
    const faixa = $("#faixaLoja");
    const faixaImg = $("#faixaImg");
    if (faixa && faixaImg && fotos.faixaLarga) {
      faixaImg.src = fotos.interior;
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

    document.addEventListener("keydown", function (ev) {
      if (ev.key !== "Escape") return;
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
