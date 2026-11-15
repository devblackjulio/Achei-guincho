import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, Check, LocateFixed, X } from "lucide-react";

export type Mode = "cliente" | "parceiro";

const SERVICES = [
  "Guincho",
  "Pane seca",
  "Bateria",
  "Troca de pneu",
  "Chaveiro",
  "Moto",
];

const input =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] text-ink placeholder:text-muted/70 outline-none transition focus:border-ink focus:ring-4 focus:ring-ink/5";

export default function RequestModal({ mode, onClose }: { mode: Mode; onClose: () => void }) {
  const [service, setService] = useState("Guincho");
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [locating, setLocating] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const locate = () => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (p) => {
        setPlace(`Minha localização (${p.coords.latitude.toFixed(4)}, ${p.coords.longitude.toFixed(4)})`);
        setLocating(false);
      },
      () => setLocating(false),
      { timeout: 8000 }
    );
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const first = name.trim().split(" ")[0];
  const isClient = mode === "cliente";

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
    >
      <div className="pop relative max-h-[94vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-paper p-6 shadow-2xl sm:rounded-3xl sm:p-8">
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-muted transition hover:bg-sand hover:text-ink"
        >
          <X size={18} />
        </button>

        {sent ? (
          <div className="py-6 text-center">
            <div className="relative mx-auto mb-6 grid h-16 w-16 place-items-center">
              <span className="pulse-ring absolute inset-0 rounded-full bg-accent/30" />
              <span className="relative grid h-16 w-16 place-items-center rounded-full bg-ink text-white">
                <Check size={26} />
              </span>
            </div>
            <h3 className="font-display text-2xl font-semibold">
              {isClient
                ? `Pronto${first ? `, ${first}` : ""}. Já estamos nisso.`
                : `Que bom ter você com a gente${first ? `, ${first}` : ""}!`}
            </h3>
            <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-muted">
              {isClient
                ? "Avisamos os parceiros mais próximos de você. Fique com o celular por perto: em instantes alguém liga para confirmar o valor e o tempo de chegada."
                : "Recebemos seu cadastro. Uma pessoa do nosso time vai falar com você em até 1 dia útil para combinar os próximos passos."}
            </p>
            <p className="mx-auto mt-4 max-w-sm text-xs text-muted/80">
              (Este é um site de demonstração — nenhum pedido real foi enviado.)
            </p>
            <button
              onClick={onClose}
              className="mt-7 rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition hover:bg-black"
            >
              Fechar
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-5">
            <div className="pr-8">
              <h3 className="font-display text-2xl font-semibold leading-tight">
                {isClient ? "Conta pra gente o que aconteceu" : "Vamos trabalhar juntos"}
              </h3>
              <p className="mt-1.5 text-[15px] text-muted">
                {isClient
                  ? "Leva menos de um minuto. Respira, a gente cuida do resto."
                  : "Preencha o básico e a gente entra em contato."}
              </p>
            </div>

            {isClient && (
              <div>
                <label className="mb-2 block text-sm font-medium">Do que você precisa?</label>
                <div className="flex flex-wrap gap-2">
                  {SERVICES.map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setService(s)}
                      className={`rounded-full border px-4 py-2 text-sm transition ${
                        service === s
                          ? "border-ink bg-ink text-white"
                          : "border-line bg-white text-ink hover:border-ink/40"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium" htmlFor="nome">
                  Seu nome
                </label>
                <input
                  id="nome"
                  required
                  className={input}
                  placeholder="Como podemos te chamar?"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium" htmlFor="tel">
                  WhatsApp
                </label>
                <input id="tel" required type="tel" className={input} placeholder="(00) 90000-0000" />
              </div>
            </div>

            {isClient ? (
              <>
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label className="text-sm font-medium" htmlFor="local">
                      Onde você está?
                    </label>
                    <button
                      type="button"
                      onClick={locate}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                    >
                      <LocateFixed size={14} />
                      {locating ? "Procurando…" : "Usar minha localização"}
                    </button>
                  </div>
                  <input
                    id="local"
                    required
                    className={input}
                    placeholder="Rua, número, km da rodovia ou referência"
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium" htmlFor="veic">
                    Qual é o veículo?
                  </label>
                  <input id="veic" className={input} placeholder="Ex.: Onix branco, 2019" />
                </div>
              </>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium" htmlFor="cid">
                    Cidade de atuação
                  </label>
                  <input id="cid" required className={input} placeholder="Ex.: Campinas, SP" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium" htmlFor="tipo">
                    Tipo de guincho
                  </label>
                  <select id="tipo" className={input} defaultValue="Plataforma">
                    <option>Plataforma</option>
                    <option>Reboque simples</option>
                    <option>Guincho de moto</option>
                    <option>Pesado</option>
                  </select>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 text-[15px] font-medium text-white transition hover:bg-black"
            >
              {isClient ? "Chamar ajuda agora" : "Enviar meu cadastro"}
              <ArrowRight size={18} className="transition group-hover:translate-x-0.5" />
            </button>
            <p className="text-center text-xs text-muted">
              Você só paga depois de combinar o valor. Sem surpresas.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
