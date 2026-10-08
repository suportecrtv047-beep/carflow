import Link from "next/link";

const carros = [
  {
    nome: "Toyota Corolla",
    categoria: "Sedan",
    preco: 180,
    imagem: "/cars/corolla.webp",
    link: "/carros/corolla",
    descricao: "Conforto e elegância para seus deslocamentos.",
  },
  {
    nome: "Honda HR-V",
    categoria: "SUV",
    preco: 220,
    imagem: "/cars/hrv.webp",
    link: "/carros/hrv",
    descricao: "Espaço, tecnologia e praticidade para qualquer viagem.",
  },
  {
    nome: "VW T-Cross",
    categoria: "SUV",
    preco: 200,
    imagem: "/cars/tcross.jpg",
    link: "/carros/tcross",
    descricao: "Um SUV moderno para acompanhar sua rotina.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-black px-6 py-4 text-white md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="text-2xl font-black tracking-tight">
            CarFlow
          </Link>

          <div className="hidden items-center gap-6 text-sm font-bold md:flex">
            <a href="#veiculos" className="transition hover:text-gray-300">
              Veículos
            </a>
            <a href="#sobre" className="transition hover:text-gray-300">
              Sobre
            </a>
            <a href="#contato" className="transition hover:text-gray-300">
              Contato
            </a>
          </div>

          <span className="rounded-full border border-white/20 px-3 py-1 text-xs font-bold text-white/70">
            Projeto demonstrativo
          </span>
        </div>
      </nav>

      {/* BANNER */}
      <div className="border-b-4 border-black bg-yellow-400 px-6 py-5 text-center shadow-lg">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-black/70">
          ⚠️ Atenção ⚠️
        </p>

        <p className="mt-1 text-2xl font-black uppercase tracking-wide text-black md:text-3xl">
          PROJETO TESTE: MANINHO TOP
        </p>

        <p className="mt-1 text-sm font-bold text-black/70">
          Site criado para fins de teste e aprendizado
        </p>
      </div>

      {/* DESTAQUES */}
      <section className="border-b border-gray-200 bg-white px-6 py-14 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-gray-500">
              Por que a CarFlow?
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
              Simples, rápida e direta.
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-gray-600">
              Uma experiência criada para deixar a simulação de aluguel
              de veículos fácil de entender e usar.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="group rounded-2xl border border-gray-200 bg-gray-50 p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-2xl">
                ⚡
              </div>

              <h3 className="mt-5 text-lg font-black">Reserva rápida</h3>

              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                Escolha o veículo e simule sua reserva de forma simples.
              </p>
            </div>

            <div className="group rounded-2xl border border-gray-200 bg-gray-50 p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-2xl">
                🛡️
              </div>

              <h3 className="mt-5 text-lg font-black">Processo simples</h3>

              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                Tudo organizado para você entender cada etapa da simulação.
              </p>
            </div>

            <div className="group rounded-2xl border border-gray-200 bg-gray-50 p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-2xl">
                💰
              </div>

              <h3 className="mt-5 text-lg font-black">
                Preços por diária
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                Consulte o valor de cada veículo de maneira clara.
              </p>
            </div>

            <div className="group rounded-2xl border border-gray-200 bg-gray-50 p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-2xl">
                🚘
              </div>

              <h3 className="mt-5 text-lg font-black">
                Veículos selecionados
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                Modelos diferentes para diferentes estilos de viagem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="border-b border-gray-200 bg-gray-50 px-6 py-14 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-gray-500">
              Como funciona?
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
              Alugar é simples.
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-gray-600">
              Confira as etapas para fazer sua simulação de reserva.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {/* PASSO 1 */}
            <div className="group rounded-2xl border border-gray-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-4xl font-black text-gray-200">
                  01
                </span>

                <span className="text-3xl">🚗</span>
              </div>

              <h3 className="mt-6 text-xl font-black">
                Escolha seu carro
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                Encontre o veículo que combina com sua viagem e confira os
                detalhes.
              </p>
            </div>

            {/* PASSO 2 */}
            <div className="group rounded-2xl border border-gray-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-4xl font-black text-gray-200">
                  02
                </span>

                <span className="text-3xl">📅</span>
              </div>

              <h3 className="mt-6 text-xl font-black">
                Escolha as datas
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                Informe a data de retirada e a data de devolução do veículo.
              </p>
            </div>

            {/* PASSO 3 */}
            <div className="group rounded-2xl border border-gray-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-4xl font-black text-gray-200">
                  03
                </span>

                <span className="text-3xl">💰</span>
              </div>

              <h3 className="mt-6 text-xl font-black">
                Confira o valor
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                Veja o total da simulação calculado de acordo com a quantidade
                de diárias.
              </p>
            </div>

            {/* PASSO 4 */}
            <div className="group rounded-2xl border border-gray-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-4xl font-black text-gray-200">
                  04
                </span>

                <span className="text-3xl">💳</span>
              </div>

              <h3 className="mt-6 text-xl font-black">
                Confirme e efetue o pagamento
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                Revise sua reserva e avance para a etapa de pagamento da
                simulação.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HERO */}
      <section className="bg-black px-6 py-20 text-white md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-black uppercase tracking-[0.25em] text-white/50">
              Mobilidade simples e prática
            </p>

            <h1 className="text-5xl font-black tracking-tight md:text-7xl">
              Mobilidade do seu jeito.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl">
              Escolha seu veículo, simule sua reserva e veja tudo de forma
              simples e transparente.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#veiculos"
                className="rounded-xl bg-white px-6 py-3 text-center font-black text-black transition hover:bg-gray-200"
              >
                Ver veículos
              </a>

              <span className="flex items-center justify-center rounded-xl border border-white/20 px-6 py-3 text-sm font-bold text-white/60">
                Reserva 100% demonstrativa
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* VEÍCULOS */}
      <section
        id="veiculos"
        className="px-6 py-16 md:px-8 md:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-gray-500">
                Nossa frota
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
                Escolha seu veículo
              </h2>
            </div>

            <p className="max-w-md text-sm leading-relaxed text-gray-500">
              Confira alguns dos modelos disponíveis neste projeto
              demonstrativo.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {carros.map((carro) => (
              <div
                key={carro.nome}
                className="group overflow-hidden rounded-3xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <img
                    src={carro.imagem}
                    alt={carro.nome}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-black px-3 py-1 text-xs font-black text-white">
                    {carro.categoria}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-black">
                    {carro.nome}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    {carro.descricao}
                  </p>

                  <div className="mt-6 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                        A partir de
                      </p>

                      <p className="mt-1 text-2xl font-black">
                        R$ {carro.preco}
                        <span className="text-sm font-bold text-gray-400">
                          /dia
                        </span>
                      </p>
                    </div>

                    <Link
                      href={carro.link}
                      className="rounded-xl bg-black px-4 py-3 text-sm font-black text-white transition hover:bg-gray-800"
                    >
                      Ver carro
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section
        id="sobre"
        className="border-t border-gray-200 bg-gray-50 px-6 py-16 md:px-8 md:py-20"
      >
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-gray-500">
              Sobre a CarFlow
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
              Um projeto feito para aprender.
            </h2>
          </div>

          <div className="text-gray-600">
            <p className="leading-relaxed">
              A CarFlow é um projeto fictício desenvolvido para testar
              tecnologias web, interfaces e fluxos de reserva de veículos.
            </p>

            <p className="mt-4 leading-relaxed">
              O objetivo é criar uma experiência moderna, simples e fácil de
              navegar.
            </p>
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section
        id="contato"
        className="px-6 py-16 md:px-8 md:py-20"
      >
        <div className="mx-auto max-w-7xl rounded-3xl bg-black px-6 py-10 text-white md:px-10 md:py-14">
          <div className="max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-white/50">
              Contato
            </p>

            <h2 className="mt-2 text-3xl font-black md:text-4xl">
              Tem alguma dúvida?
            </h2>

            <p className="mt-4 leading-relaxed text-white/60">
              Este projeto é apenas demonstrativo e não realiza locações reais.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 bg-white px-6 py-8 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-center text-sm text-gray-500 md:flex-row md:items-center md:justify-between md:text-left">
          <p>© 2026 CarFlow</p>

          <p>Este site é fictício e não realiza locações reais.</p>
        </div>
      </footer>
    </main>
  );
}