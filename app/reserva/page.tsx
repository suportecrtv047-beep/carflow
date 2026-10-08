"use client";

import { useState } from "react";
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
  if (!data) return "";

  const [ano, mes, dia] = data.split("-");

  return `${dia}/${mes}/${ano}`;
}

export default function ReservaPage() {
  const searchParams = useSearchParams();

  const carroId = searchParams.get("carro") || "corolla";

  const carro =
    carros[carroId as keyof typeof carros] || carros.corolla;

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

  const calcularDiarias = () => {
    if (!dataInicio || !dataFim) return 0;

    const inicio = new Date(`${dataInicio}T00:00:00`);
    const fim = new Date(`${dataFim}T00:00:00`);

    const diferenca = fim.getTime() - inicio.getTime();

    const dias = Math.ceil(diferenca / (1000 * 60 * 60 * 24));

    return dias > 0 ? dias : 0;
  };

  const diarias = calcularDiarias();
  const total = diarias * carro.preco;

  const continuarReserva = () => {
    setErro("");

    if (!nome.trim()) {
      setErro("Digite seu nome para continuar.");
      return;
    }

    if (!dataInicio || !dataFim) {
      setErro("Escolha a data de retirada e a data de devolução.");
      return;
    }

    if (diarias <= 0) {
      setErro(
        "A data de devolução precisa ser posterior à data de retirada."
      );
      return;
    }

    setConfirmando(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const confirmarReserva = () => {
    setErro("");

    if (formaPagamento === "cartao") {
      if (
        !numeroCartao.trim() ||
        !nomeCartao.trim() ||
        !validade.trim() ||
        !cvv.trim()
      ) {
        setErro("Preencha os dados demonstrativos do cartão.");
        return;
      }
    }

    setFinalizada(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (finalizada) {
    return (
      <main className="min-h-screen bg-gray-100">
        <header className="sticky top-0 z-50 border-b border-white/10 bg-black px-6 py-5 text-white shadow-lg">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <Link
              href="/"
              className="text-2xl font-black tracking-tight"
            >
              CarFlow
            </Link>

            <span className="rounded-full border border-white/20 px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-300">
              Projeto demonstrativo
            </span>
          </div>
        </header>

        <section className="flex min-h-[calc(100vh-85px)] items-center justify-center px-6 py-16">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-8 text-center shadow-xl md:p-12">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl">
              ✓
            </div>

            <p className="mt-6 text-sm font-black uppercase tracking-[0.2em] text-green-600">
              Reserva concluída
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-tight text-gray-900 md:text-5xl">
              Tudo certo, {nome.split(" ")[0]}!
            </h1>

            <p className="mx-auto mt-4 max-w-lg text-gray-500">
              Sua reserva demonstrativa foi registrada com sucesso.
              Este projeto não realiza cobranças ou reservas reais.
            </p>

            <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-6 text-left">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Veículo
                  </p>
                  <p className="mt-1 text-lg font-black text-gray-900">
                    {carro.nome}
                  </p>
                </div>

                <span className="rounded-full bg-black px-3 py-1 text-xs font-bold text-white">
                  {carro.categoria}
                </span>
              </div>

              <div className="my-5 h-px bg-gray-200" />

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Retirada
                  </p>
                  <p className="mt-1 font-bold text-gray-900">
                    {formatarData(dataInicio)}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Devolução
                  </p>
                  <p className="mt-1 font-bold text-gray-900">
                    {formatarData(dataFim)}
                  </p>
                </div>
              </div>

              <div className="my-5 h-px bg-gray-200" />

              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-500">
                  Total demonstrativo
                </span>

                <span className="text-2xl font-black text-gray-900">
                  R$ {total.toFixed(2).replace(".", ",")}
                </span>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border-2 border-yellow-300 bg-yellow-50 p-5 text-left">
              <p className="font-black text-yellow-900">
                ⚠️ Pagamento demonstrativo
              </p>

              <p className="mt-1 text-sm leading-relaxed text-yellow-800">
                Nenhum valor foi cobrado. Os dados de pagamento usados
                nesta página são apenas para simulação.
              </p>
            </div>

            <Link
              href="/"
              className="mt-8 inline-flex rounded-xl bg-black px-7 py-4 font-black text-white transition hover:bg-gray-800"
            >
              Voltar para o início
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black px-6 py-5 text-white shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-black tracking-tight"
          >
            CarFlow
          </Link>

          <span className="rounded-full border border-white/20 px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-300">
            Projeto demonstrativo
          </span>
        </div>
      </header>

      <section className="border-b border-gray-200 bg-white px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/"
            className="text-sm font-bold text-gray-500 transition hover:text-black"
          >
            ← Voltar para veículos
          </Link>

          <p className="mt-8 text-sm font-black uppercase tracking-[0.2em] text-gray-400">
            Faça sua simulação
          </p>

          <h1 className="mt-2 text-4xl font-black tracking-tight text-gray-900 md:text-5xl">
            Reserve seu veículo.
          </h1>

          <p className="mt-3 max-w-2xl text-gray-500">
            Preencha os dados abaixo para simular uma reserva completa.
          </p>

          <div className="mt-10 grid grid-cols-4 gap-2">
            {[
              ["01", "Carro"],
              ["02", "Datas"],
              ["03", "Dados"],
              ["04", "Pagamento"],
            ].map(([numero, texto], index) => {
              const ativo = confirmando
                ? index <= 3
                : index <= 2;

              return (
                <div key={numero}>
                  <div
                    className={`h-2 rounded-full ${
                      ativo ? "bg-black" : "bg-gray-200"
                    }`}
                  />

                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs font-black text-gray-400">
                      {numero}
                    </span>

                    <span className="hidden text-xs font-bold text-gray-500 sm:block">
                      {texto}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-10 md:py-14">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_360px]">
          <div className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
            {!confirmando ? (
              <>
                <div className="mb-8">
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-black uppercase tracking-wider text-gray-600">
                    Etapa 01 — Dados da reserva
                  </span>

                  <h2 className="mt-4 text-2xl font-black text-gray-900">
                    Vamos começar
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    Informe seus dados e escolha o período da reserva.
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="mb-2 block text-sm font-black text-gray-800">
                      Seu nome
                    </label>

                    <input
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Digite seu nome completo"
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-black text-gray-800">
                        Data de retirada
                      </label>

                      <input
                        type="date"
                        value={dataInicio}
                        onChange={(e) =>
                          setDataInicio(e.target.value)
                        }
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-black text-gray-800">
                        Data de devolução
                      </label>

                      <input
                        type="date"
                        value={dataFim}
                        onChange={(e) =>
                          setDataFim(e.target.value)
                        }
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
                      />
                    </div>
                  </div>

                  {erro && (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700">
                      ⚠️ {erro}
                    </div>
                  )}

                  <button
                    onClick={continuarReserva}
                    className="w-full rounded-xl bg-black px-6 py-4 font-black text-white transition hover:bg-gray-800"
                  >
                    Continuar para pagamento →
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-8">
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-black uppercase tracking-wider text-gray-600">
                    Etapa 04 — Pagamento
                  </span>

                  <h2 className="mt-4 text-2xl font-black text-gray-900">
                    Escolha a forma de pagamento
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    Esta etapa é totalmente demonstrativa.
                  </p>
                </div>

                <div className="rounded-2xl border-2 border-yellow-300 bg-yellow-50 p-5">
                  <p className="font-black text-yellow-900">
                    ⚠️ Pagamento demonstrativo
                  </p>

                  <p className="mt-1 text-sm leading-relaxed text-yellow-800">
                    Nenhum pagamento real será realizado. Os dados abaixo
                    existem somente para demonstrar como funcionaria a
                    interface de pagamento.
                  </p>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <button
                    onClick={() => setFormaPagamento("cartao")}
                    className={`rounded-2xl border-2 p-5 text-left transition ${
                      formaPagamento === "cartao"
                        ? "border-black bg-black text-white"
                        : "border-gray-200 bg-white hover:border-gray-400"
                    }`}
                  >
                    <div className="text-3xl">💳</div>

                    <p className="mt-3 font-black">
                      Cartão de crédito
                    </p>

                    <p
                      className={`mt-1 text-xs ${
                        formaPagamento === "cartao"
                          ? "text-gray-300"
                          : "text-gray-500"
                      }`}
                    >
                      Pagamento demonstrativo
                    </p>
                  </button>

                  <button
                    onClick={() => setFormaPagamento("pix")}
                    className={`rounded-2xl border-2 p-5 text-left transition ${
                      formaPagamento === "pix"
                        ? "border-black bg-black text-white"
                        : "border-gray-200 bg-white hover:border-gray-400"
                    }`}
                  >
                    <div className="text-3xl">📱</div>

                    <p className="mt-3 font-black">Pix</p>

                    <p
                      className={`mt-1 text-xs ${
                        formaPagamento === "pix"
                          ? "text-gray-300"
                          : "text-gray-500"
                      }`}
                    >
                      QR Code fictício
                    </p>
                  </button>

                  <button
                    onClick={() => setFormaPagamento("debito")}
                    className={`rounded-2xl border-2 p-5 text-left transition ${
                      formaPagamento === "debito"
                        ? "border-black bg-black text-white"
                        : "border-gray-200 bg-white hover:border-gray-400"
                    }`}
                  >
                    <div className="text-3xl">💵</div>

                    <p className="mt-3 font-black">
                      Cartão de débito
                    </p>

                    <p
                      className={`mt-1 text-xs ${
                        formaPagamento === "debito"
                          ? "text-gray-300"
                          : "text-gray-500"
                      }`}
                    >
                      Simulação de pagamento
                    </p>
                  </button>
                </div>

                <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-6">
                  {formaPagamento === "cartao" && (
                    <div>
                      <h3 className="text-lg font-black text-gray-900">
                        Dados do cartão
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Use qualquer dado fictício. Nada será enviado ou
                        cobrado.
                      </p>

                      <div className="mt-6 space-y-5">
                        <div>
                          <label className="mb-2 block text-sm font-black text-gray-800">
                            Número do cartão
                          </label>

                          <input
                            type="text"
                            inputMode="numeric"
                            value={numeroCartao}
                            onChange={(e) =>
                              setNumeroCartao(e.target.value)
                            }
                            placeholder="0000 0000 0000 0000"
                            maxLength={19}
                            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-black focus:ring-2 focus:ring-black/10"
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-sm font-black text-gray-800">
                            Nome no cartão
                          </label>

                          <input
                            type="text"
                            value={nomeCartao}
                            onChange={(e) =>
                              setNomeCartao(e.target.value)
                            }
                            placeholder="NOME DO CLIENTE"
                            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 uppercase outline-none focus:border-black focus:ring-2 focus:ring-black/10"
                          />
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                          <div>
                            <label className="mb-2 block text-sm font-black text-gray-800">
                              Validade
                            </label>

                            <input
                              type="text"
                              value={validade}
                              onChange={(e) =>
                                setValidade(e.target.value)
                              }
                              placeholder="MM/AA"
                              maxLength={5}
                              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-black focus:ring-2 focus:ring-black/10"
                            />
                          </div>

                          <div>
                            <label className="mb-2 block text-sm font-black text-gray-800">
                              CVV
                            </label>

                            <input
                              type="text"
                              inputMode="numeric"
                              value={cvv}
                              onChange={(e) =>
                                setCvv(e.target.value)
                              }
                              placeholder="123"
                              maxLength={4}
                              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-black focus:ring-2 focus:ring-black/10"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {formaPagamento === "pix" && (
                    <div className="text-center">
                      <h3 className="text-lg font-black text-gray-900">
                        Pagamento via Pix
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Este QR Code é apenas uma representação visual.
                      </p>

                      <div className="mx-auto mt-6 flex h-48 w-48 items-center justify-center rounded-2xl border-8 border-white bg-black text-center shadow-lg">
                        <div className="text-5xl leading-none">
                          ▦
                        </div>
                      </div>

                      <div className="mx-auto mt-6 max-w-md rounded-xl border border-dashed border-gray-300 bg-white p-4">
                        <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                          Código Pix demonstrativo
                        </p>

                        <p className="mt-2 break-all text-sm font-bold text-gray-600">
                          00020126580014BR.GOV.BCB.PIX
                          0136carflow.demonstrativo.pagamento
                        </p>
                      </div>
                    </div>
                  )}

                  {formaPagamento === "debito" && (
                    <div>
                      <h3 className="text-lg font-black text-gray-900">
                        Cartão de débito
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Informe dados fictícios para visualizar a
                        simulação.
                      </p>

                      <div className="mt-6 space-y-5">
                        <div>
                          <label className="mb-2 block text-sm font-black text-gray-800">
                            Número do cartão
                          </label>

                          <input
                            type="text"
                            inputMode="numeric"
                            value={numeroCartao}
                            onChange={(e) =>
                              setNumeroCartao(e.target.value)
                            }
                            placeholder="0000 0000 0000 0000"
                            maxLength={19}
                            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-black focus:ring-2 focus:ring-black/10"
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-sm font-black text-gray-800">
                            Nome do titular
                          </label>

                          <input
                            type="text"
                            value={nomeCartao}
                            onChange={(e) =>
                              setNomeCartao(e.target.value)
                            }
                            placeholder="NOME DO CLIENTE"
                            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 uppercase outline-none focus:border-black focus:ring-2 focus:ring-black/10"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {erro && (
                  <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700">
                    ⚠️ {erro}
                  </div>
                )}

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={() => {
                      setConfirmando(false);
                      setErro("");
                    }}
                    className="rounded-xl border border-gray-300 px-6 py-4 font-black text-gray-700 transition hover:bg-gray-50"
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
              </>
            )}
          </div>

          <aside className="h-fit rounded-3xl bg-black p-6 text-white shadow-xl lg:sticky lg:top-28">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">
              Resumo da reserva
            </p>

            <div className="mt-6">
              <p className="text-2xl font-black">{carro.nome}</p>

              <p className="mt-1 text-sm text-gray-400">
                {carro.marca} • {carro.categoria}
              </p>
            </div>

            <div className="my-6 h-px bg-white/10" />

            <div className="space-y-5">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-gray-400">
                  Valor da diária
                </span>

                <span className="font-bold">
                  R$ {carro.preco.toFixed(2).replace(".", ",")}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-gray-400">
                  Quantidade de diárias
                </span>

                <span className="font-bold">
                  {diarias || "—"}
                </span>
              </div>

              {dataInicio && (
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-gray-400">
                    Retirada
                  </span>

                  <span className="font-bold">
                    {formatarData(dataInicio)}
                  </span>
                </div>
              )}

              {dataFim && (
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-gray-400">
                    Devolução
                  </span>

                  <span className="font-bold">
                    {formatarData(dataFim)}
                  </span>
                </div>
              )}

              {confirmando && (
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-gray-400">
                    Pagamento
                  </span>

                  <span className="font-bold">
                    {formaPagamento === "cartao"
                      ? "Crédito"
                      : formaPagamento === "pix"
                        ? "Pix"
                        : "Débito"}
                  </span>
                </div>
              )}
            </div>

            <div className="my-6 h-px bg-white/10" />

            <div className="flex items-end justify-between gap-4">
              <span className="text-sm text-gray-400">
                Total
              </span>

              <span className="text-3xl font-black">
                R$ {total.toFixed(2).replace(".", ",")}
              </span>
            </div>

            <div className="mt-6 rounded-2xl border border-yellow-400/30 bg-yellow-400/10 p-4">
              <p className="text-sm font-black text-yellow-300">
                ⚠️ Projeto demonstrativo
              </p>

              <p className="mt-1 text-xs leading-relaxed text-gray-300">
                Esta página simula uma reserva e um pagamento. Nenhum
                valor real é processado.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}