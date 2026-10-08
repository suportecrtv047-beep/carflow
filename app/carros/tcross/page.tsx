import Link from "next/link";

export default function TCross() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">

      <header className="sticky top-0 z-50 border-b border-white/10 bg-black text-white shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-8">

          <Link
            href="/"
            className="text-2xl font-black tracking-tight"
          >
            Car<span className="text-gray-400">Flow</span>
          </Link>

          <Link
            href="/"
            className="text-sm font-semibold text-gray-300 transition hover:text-white"
          >
            ← Voltar
          </Link>

        </div>
      </header>

      <section className="px-6 py-10 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">

          <div className="mb-8">
            <p className="text-sm font-bold uppercase tracking-widest text-gray-500">
              Veículo
            </p>

            <h1 className="mt-2 text-4xl font-black tracking-tight md:text-5xl">
              VW T-Cross
            </h1>
          </div>

          <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">

            <div className="grid md:grid-cols-2">

              <div className="relative min-h-[320px] bg-gray-200 md:min-h-[620px]">

                <img
                  src="/cars/tcross.jpg"
                  alt="VW T-Cross"
                  className="h-full w-full object-cover"
                />

                <span className="absolute left-6 top-6 rounded-full bg-black/80 px-4 py-2 text-sm font-bold text-white backdrop-blur">
                  SUV
                </span>

              </div>

              <div className="flex flex-col justify-between p-7 md:p-10">

                <div>

                  <div className="flex items-center justify-between gap-4">

                    <div>
                      <p className="text-sm font-semibold text-gray-500">
                        Volkswagen
                      </p>

                      <h2 className="mt-1 text-3xl font-black">
                        T-Cross
                      </h2>
                    </div>

                    <span className="rounded-full bg-green-100 px-3 py-1.5 text-xs font-bold text-green-700">
                      Disponível
                    </span>

                  </div>

                  <p className="mt-6 text-lg leading-relaxed text-gray-600">
                    Um SUV moderno, versátil e confortável para acompanhar
                    sua rotina e suas viagens.
                  </p>

                  <div className="mt-8 grid grid-cols-2 gap-4">

                    <div className="rounded-2xl bg-gray-100 p-5">
                      <p className="text-sm text-gray-500">
                        Câmbio
                      </p>
                      <p className="mt-1 font-bold">
                        Automático
                      </p>
                    </div>

                    <div className="rounded-2xl bg-gray-100 p-5">
                      <p className="text-sm text-gray-500">
                        Capacidade
                      </p>
                      <p className="mt-1 font-bold">
                        5 pessoas
                      </p>
                    </div>

                    <div className="rounded-2xl bg-gray-100 p-5">
                      <p className="text-sm text-gray-500">
                        Combustível
                      </p>
                      <p className="mt-1 font-bold">
                        Flex
                      </p>
                    </div>

                    <div className="rounded-2xl bg-gray-100 p-5">
                      <p className="text-sm text-gray-500">
                        Categoria
                      </p>
                      <p className="mt-1 font-bold">
                        SUV
                      </p>
                    </div>

                  </div>

                </div>

                <div className="mt-10 border-t border-gray-200 pt-7">

                  <p className="text-sm font-medium text-gray-500">
                    A partir de
                  </p>

                  <p className="mt-1 text-4xl font-black">
                    R$ 200
                    <span className="text-base font-normal text-gray-500">
                      {" "}
                      / dia
                    </span>
                  </p>

                  <Link
                    href="/reserva?carro=tcross"
                    className="mt-6 block w-full rounded-xl bg-black px-6 py-4 text-center font-bold text-white transition hover:bg-gray-800"
                  >
                    Alugar este carro
                  </Link>

                </div>

              </div>

            </div>

          </div>

          <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 text-center text-sm text-gray-500">
            Projeto demonstrativo — este site é fictício e não realiza locações reais.
          </div>

        </div>
      </section>

    </main>
  );
}