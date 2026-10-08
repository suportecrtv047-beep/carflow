"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const carros = {
  corolla: {
    nome: "Toyota Corolla",
    marca: "Toyota",
    categoria: "Sedan",
    preco: 180,
  },
  hrv: {
    nome: "Honda HR-V",
    marca: "Honda",
    categoria: "SUV",
    preco: 220,
  },
  tcross: {
    nome: "VW T-Cross",
    marca: "Volkswagen",
    categoria: "SUV",
    preco: 200,
  },
};

function formatarData(data: string) {
  if (!data) return "-";

  const [ano, mes, dia] = data.split("-");

  return `${dia}/${mes}/${ano}`;
}

function calcularDias(inicio: string, fim: string) {
  if (!inicio || !fim) return 0;

  const dataInicio = new Date(`${inicio}T00:00:00`);
  const dataFim = new Date(`${fim}T00:00:00`);

  const diferenca = dataFim.getTime() - dataInicio.getTime();
  const dias = Math.ceil(diferenca / (1000 * 60 * 60 * 24));

  return dias > 0 ? dias : 0;
}

function ReservaConteudo() {
  const searchParams = useSearchParams();

  const carroSelecionado =
    searchParams.get("carro")?.toLowerCase() || "corolla";

  const carro =
    carros[carroSelecionado as keyof typeof carros] || carros.corolla;

  const [nome, setNome] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");

  const [formaPagamento, setFormaPagamento] = useState<
    "cartao" | "pix" | "debito"
  >("cartao");

  const [numeroCartao, setNumeroCartao] = useState("");
  const [nomeCartao, setNomeCartao] = useState("");
  const [validade, setValidade] = useState("");
  const [cvv, setCvv] = useState("");

  const [confirmando, setConfirmando] = useState(false);
  const [finalizada, setFinalizada] = useState(false);
  const [erro, setErro] = useState("");

  const dias = calcularDias(dataInicio, dataFim);
  const total = dias * carro.preco;

  function continuarReserva() {
    setErro("");

    if (!nome.trim()) {
      setErro("Digite seu nome para continuar.");
      return;
    }

    if (!dataInicio || !dataFim) {
      setErro("Escolha a data de retirada e a data de devolução.");
      return;
    }

    if (dias <= 0) {
      setErro(
        "A data de devolução precisa ser posterior à data de retirada."
      );
      return;
    }

    setConfirmando(true);
  }

  function confirmarReserva() {
    setErro("");

    if (formaPagamento === "cartao") {
      if (!numeroCartao.trim() || !nomeCartao.trim()) {
        setErro("Preencha os dados do cartão de crédito.");
        return;
      }

      if (!validade.trim() || !cvv.trim()) {
        setErro("Preencha a validade e o CVV do cartão.");
        return;
      }
    }

    if (formaPagamento === "debito") {
      if (!numeroCartao.trim() || !nomeCartao.trim()) {
        setErro("Preencha os dados do cartão de débito.");
        return;
      }
    }

    setFinalizada(true);
  }

  if (finalizada) {
    return (
      <main className="min-h-screen bg-gray-50">
        <header className="sticky top-0 z-50 border-b border-gray-800 bg-black px-6 py-4 text-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <Link href="/" className="text-2xl font-black tracking-tight">
              CarFlow
            </Link>

            <Link
              href="/"
              className="text-sm font-bold text-gray-300 transition hover:text-white"
            >
              Voltar para o início
            </Link>
          </div>
        </header>

        <section className="px-6 py-16 md:py-24">
          <div className="mx-auto max-w-2xl">
            <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm md:p-12">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl">
                ✓
              </div>

              <p className="mt-6 text-sm font-black uppercase tracking-[0.2em] text-green-600">
                Reserva concluída
              </p>

              <h1 className="mt-2 text-4xl font-black tracking-tight">
                Tudo certo, {nome.split(" ")[0]}!
              </h1>

              <p className="mx-auto mt-4 max-w-lg leading-relaxed text-gray-500">
                Sua reserva demonstrativa foi registrada com sucesso.
              </p>

              <div className="mt-8 rounded-2xl bg-gray-50 p-6 text-left">
                <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                  <span className="text-sm text-gray-500">Veículo</span>
                  <span className="font-black">{carro.nome}</span>
                </div>

                <div className="flex items-center justify-between border-b border-gray-200 py-4">
                  <span className="text-sm text-gray-500">Retirada</span>
                  <span className="font-bold">
                    {formatarData(dataInicio)}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-gray-200 py-4">
                  <span className="text-sm text-gray-500">Devolução</span>
                  <span className="font-bold">{formatarData(dataFim)}</span>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <span className="text-sm text-gray-500">Total</span>
                  <span className="text-2xl font-black">
                    R$ {total.toFixed(2).replace(".", ",")}
                  </span>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-yellow-300 bg-yellow-50 p-5 text-left">
                <p className="font-black text-yellow-900">
                  ⚠️ Projeto demonstrativo
                </p>

                <p className="mt-1 text-sm leading-relaxed text-yellow-800">
                  Nenhum valor foi cobrado. Este site é fictício e todos os
                  pagamentos são apenas uma simulação para fins de teste e
                  aprendizado.
                </p>
              </div>

              <Link
                href="/"
                className="mt-8 inline-flex rounded-xl bg-black px-7 py-4 font-black text-white transition hover:bg-gray-800"
              >
                Voltar para o início
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 border-b border-gray-800 bg-black px-6 py-4 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="text-2xl font-black tracking-tight">
            CarFlow
          </Link>

          <Link
            href="/"
            className="text-sm font-bold text-gray-300 transition hover:text-white"
          >
            Voltar para o início
          </Link>
        </div>
      </header>

      <section className="px-6 py-10 md:py-14">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-gray-500">
              Faça sua simulação
            </p>

            <h1 className="mt-2 text-4xl font-black tracking-tight md:text-5xl">
              Reserve seu veículo.
            </h1>

            <p className="mt-3 max-w-2xl text-gray-500">
              Preencha os dados abaixo para simular sua reserva de forma rápida
              e simples.
            </p>
          </div>

          <div className="mb-10 grid grid-cols-4 gap-2">
            <div
              className={`rounded-xl px-3 py-3 text-center ${
                !confirmando
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              <p className="text-xs font-black">01</p>
              <p className="mt-1 text-xs font-bold md:text-sm">Carro</p>
            </div>

            <div
              className={`rounded-xl px-3 py-3 text-center ${
                !confirmando
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              <p className="text-xs font-black">02</p>
              <p className="mt-1 text-xs font-bold md:text-sm">Datas</p>
            </div>

            <div
              className={`rounded-xl px-3 py-3 text-center ${
                confirmando
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              <p className="text-xs font-black">03</p>
              <p className="mt-1 text-xs font-bold md:text-sm">Dados</p>
            </div>

            <div
              className={`rounded-xl px-3 py-3 text-center ${
                confirmando
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              <p className="text-xs font-black">04</p>
              <p className="mt-1 text-xs font-bold md:text-sm">Resumo</p>
            </div>
          </div>

          {!confirmando ? (
            <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
                <div className="mb-8">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">
                    Veículo selecionado
                  </p>

                  <div className="mt-4 flex items-center justify-between rounded-2xl bg-gray-50 p-5">
                    <div>
                      <p className="text-xl font-black">{carro.nome}</p>
                      <p className="mt-1 text-sm text-gray-500">
                        {carro.marca} · {carro.categoria}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-black">
                        R$ {carro.preco}
                      </p>
                      <p className="text-xs text-gray-500">por diária</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="mb-2 block text-sm font-black">
                      Seu nome
                    </label>

                    <input
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Digite seu nome"
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                    />
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-black">
                        Data de retirada
                      </label>

                      <input
                        type="date"
                        value={dataInicio}
                        onChange={(e) => setDataInicio(e.target.value)}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-black">
                        Data de devolução
                      </label>

                      <input
                        type="date"
                        value={dataFim}
                        onChange={(e) => setDataFim(e.target.value)}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                      />
                    </div>
                  </div>
                </div>

                {erro && (
                  <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700">
                    {erro}
                  </div>
                )}

                <button
                  onClick={continuarReserva}
                  className="mt-8 w-full rounded-xl bg-black px-6 py-4 font-black text-white transition hover:bg-gray-800"
                >
                  Continuar para o resumo →
                </button>
              </div>

              <aside className="h-fit rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">
                  Resumo
                </p>

                <h2 className="mt-2 text-2xl font-black">
                  Sua reserva
                </h2>

                <div className="mt-6 space-y-4">
                  <div className="flex justify-between gap-4">
                    <span className="text-sm text-gray-500">Veículo</span>
                    <span className="text-right text-sm font-black">
                      {carro.nome}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-sm text-gray-500">Diária</span>
                    <span className="text-sm font-black">
                      R$ {carro.preco}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-sm text-gray-500">Diárias</span>
                    <span className="text-sm font-black">{dias}</span>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="font-black">Total</span>
                      <span className="text-2xl font-black">
                        R$ {total.toFixed(2).replace(".", ",")}
                      </span>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">
                    Dados da reserva
                  </p>

                  <h2 className="mt-2 text-3xl font-black">
                    Confira e escolha o pagamento
                  </h2>
                </div>

                <div className="mt-6 rounded-2xl bg-gray-50 p-5">
                  <div className="flex justify-between gap-4 border-b border-gray-200 pb-4">
                    <span className="text-sm text-gray-500">Cliente</span>
                    <span className="text-right font-black">{nome}</span>
                  </div>

                  <div className="flex justify-between gap-4 border-b border-gray-200 py-4">
                    <span className="text-sm text-gray-500">Veículo</span>
                    <span className="text-right font-black">
                      {carro.nome}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4 pt-4">
                    <span className="text-sm text-gray-500">Período</span>
                    <span className="text-right font-black">
                      {formatarData(dataInicio)} → {formatarData(dataFim)}
                    </span>
                  </div>
                </div>

                <div className="mt-8">
                  <p className="text-lg font-black">Forma de pagamento</p>

                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    <button
                      onClick={() => setFormaPagamento("cartao")}
                      className={`rounded-2xl border p-4 text-left transition ${
                        formaPagamento === "cartao"
                          ? "border-black bg-black text-white"
                          : "border-gray-200 bg-white hover:border-gray-400"
                      }`}
                    >
                      <p className="text-2xl">💳</p>
                      <p className="mt-2 font-black">Cartão</p>
                      <p
                        className={`mt-1 text-xs ${
                          formaPagamento === "cartao"
                            ? "text-gray-300"
                            : "text-gray-500"
                        }`}
                      >
                        Crédito
                      </p>
                    </button>

                    <button
                      onClick={() => setFormaPagamento("pix")}
                      className={`rounded-2xl border p-4 text-left transition ${
                        formaPagamento === "pix"
                          ? "border-black bg-black text-white"
                          : "border-gray-200 bg-white hover:border-gray-400"
                      }`}
                    >
                      <p className="text-2xl">📱</p>
                      <p className="mt-2 font-black">Pix</p>
                      <p
                        className={`mt-1 text-xs ${
                          formaPagamento === "pix"
                            ? "text-gray-300"
                            : "text-gray-500"
                        }`}
                      >
                        Pagamento instantâneo
                      </p>
                    </button>

                    <button
                      onClick={() => setFormaPagamento("debito")}
                      className={`rounded-2xl border p-4 text-left transition ${
                        formaPagamento === "debito"
                          ? "border-black bg-black text-white"
                          : "border-gray-200 bg-white hover:border-gray-400"
                      }`}
                    >
                      <p className="text-2xl">💵</p>
                      <p className="mt-2 font-black">Débito</p>
                      <p
                        className={`mt-1 text-xs ${
                          formaPagamento === "debito"
                            ? "text-gray-300"
                            : "text-gray-500"
                        }`}
                      >
                        Cartão de débito
                      </p>
                    </button>
                  </div>
                </div>

                {formaPagamento === "cartao" && (
                  <div className="mt-6 space-y-5 rounded-2xl border border-gray-200 p-5">
                    <div>
                      <label className="mb-2 block text-sm font-black">
                        Número do cartão
                      </label>

                      <input
                        type="text"
                        value={numeroCartao}
                        onChange={(e) => setNumeroCartao(e.target.value)}
                        placeholder="0000 0000 0000 0000"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-black">
                        Nome no cartão
                      </label>

                      <input
                        type="text"
                        value={nomeCartao}
                        onChange={(e) => setNomeCartao(e.target.value)}
                        placeholder="NOME COMPLETO"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                      />
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-black">
                          Validade
                        </label>

                        <input
                          type="text"
                          value={validade}
                          onChange={(e) => setValidade(e.target.value)}
                          placeholder="MM/AA"
                          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-black">
                          CVV
                        </label>

                        <input
                          type="text"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          placeholder="123"
                          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {formaPagamento === "pix" && (
                  <div className="mt-6 rounded-2xl border border-gray-200 p-6">
                    <div className="flex flex-col items-center text-center">
                      <p className="text-lg font-black">
                        QR Code demonstrativo
                      </p>

                      <div className="mt-5 flex h-44 w-44 items-center justify-center border-8 border-black bg-white">
                        <div className="grid grid-cols-5 gap-2">
                          {Array.from({ length: 25 }).map((_, index) => (
                            <div
                              key={index}
                              className={`h-5 w-5 ${
                                index % 2 === 0 ||
                                index % 5 === 0 ||
                                index === 12
                                  ? "bg-black"
                                  : "bg-white"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <p className="mt-5 text-sm text-gray-500">
                        Código Pix demonstrativo
                      </p>

                      <div className="mt-2 rounded-xl bg-gray-100 p-4 text-xs font-bold text-gray-600">
                        carflow-pagamento-demonstrativo-2026
                      </div>
                    </div>
                  </div>
                )}

                {formaPagamento === "debito" && (
                  <div className="mt-6 space-y-5 rounded-2xl border border-gray-200 p-5">
                    <div>
                      <label className="mb-2 block text-sm font-black">
                        Número do cartão
                      </label>

                      <input
                        type="text"
                        value={numeroCartao}
                        onChange={(e) => setNumeroCartao(e.target.value)}
                        placeholder="0000 0000 0000 0000"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-black">
                        Nome no cartão
                      </label>

                      <input
                        type="text"
                        value={nomeCartao}
                        onChange={(e) => setNomeCartao(e.target.value)}
                        placeholder="NOME COMPLETO"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                      />
                    </div>
                  </div>
                )}

                <div className="mt-6 rounded-2xl border border-yellow-300 bg-yellow-50 p-5">
                  <p className="font-black text-yellow-900">
                    💳 Pagamento demonstrativo
                  </p>

                  <p className="mt-1 text-sm leading-relaxed text-yellow-800">
                    Nenhum pagamento real será realizado. Esta etapa existe
                    apenas para demonstrar como funcionaria um fluxo de
                    pagamento em um projeto de estudo.
                  </p>
                </div>

                {erro && (
                  <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700">
                    {erro}
                  </div>
                )}

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={() => {
                      setConfirmando(false);
                      setErro("");
                    }}
                    className="rounded-xl border border-gray-300 px-6 py-4 font-black transition hover:bg-gray-100"
                  >
                    ← Voltar e editar
                  </button>

                  <button
                    onClick={confirmarReserva}
                    className="flex-1 rounded-xl bg-black px-6 py-4 font-black text-white transition hover:bg-gray-800"
                  >
                    Confirmar reserva e pagamento →
                  </button>
                </div>
              </div>

              <aside className="h-fit rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">
                  Total
                </p>

                <h2 className="mt-2 text-2xl font-black">
                  Resumo do pedido
                </h2>

                <div className="mt-6 space-y-4">
                  <div className="flex justify-between gap-4">
                    <span className="text-sm text-gray-500">Veículo</span>
                    <span className="text-right text-sm font-black">
                      {carro.nome}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-sm text-gray-500">Diárias</span>
                    <span className="text-sm font-black">{dias}</span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-sm text-gray-500">Pagamento</span>
                    <span className="text-right text-sm font-black">
                      {formaPagamento === "cartao"
                        ? "Cartão de crédito"
                        : formaPagamento === "pix"
                          ? "Pix"
                          : "Cartão de débito"}
                    </span>
                  </div>

                  <div className="border-t border-gray-200 pt-5">
                    <p className="text-sm text-gray-500">Total</p>

                    <p className="mt-1 text-4xl font-black">
                      R$ {total.toFixed(2).replace(".", ",")}
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default function ReservaPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-gray-50">
          <p className="font-bold text-gray-500">
            Carregando reserva...
          </p>
        </main>
      }
    >
      <ReservaConteudo />
    </Suspense>
  );
}