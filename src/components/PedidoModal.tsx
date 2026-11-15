import { useEffect, useState } from "react";
import {
  IconClose,
  IconHook,
  IconFuel,
  IconBattery,
  IconTire,
  IconKey,
  IconWrench,
  IconPin,
  IconCheck,
  IconPhone,
  IconStar,
  IconArrow,
} from "./Icons";
import { DRIVERS, PHONE_HREF } from "../lib/data";

const ISSUES = [
  { id: "guincho", label: "Preciso de guincho", icon: IconHook },
  { id: "pane", label: "Pane seca", icon: IconFuel },
  { id: "bateria", label: "Bateria", icon: IconBattery },
  { id: "pneu", label: "Pneu furado", icon: IconTire },
  { id: "chave", label: "Chaveiro", icon: IconKey },
  { id: "outro", label: "Outro aperto", icon: IconWrench },
];

const VTYPES = ["Carro", "Moto", "Caminhão / Van"];

type Coords = { lat: number; lng: string; approx?: boolean };

export default function PedidoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [issue, setIssue] = useState<string | null>(null);
  const [vtype, setVtype] = useState(VTYPES[0]);
  const [plate, setPlate] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [coords, setCoords] = useState<Coords | null>(null);
  const [locating, setLocating] = useState(false);
  const [refPoint, setRefPoint] = useState("");
  const [protocol, setProtocol] = useState("");
  const [driver, setDriver] = useState(DRIVERS[0]);

  const reset = () => {
    setStep(0);
    setIssue(null);
    setVtype(VTYPES[0]);
    setPlate("");
    setName("");
    setPhone("");
    setCoords(null);
    setLocating(false);
    setRefPoint("");
    setProtocol("");
  };

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        reset();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const locate = () => {
    setLocating(true);
    const fallback = () =>
      setCoords({ lat: -23.5505, lng: "-46.6333", approx: true });

    if (!("geolocation" in navigator)) {
      setTimeout(() => {
        fallback();
        setLocating(false);
      }, 700);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude.toFixed(5),
        });
        setLocating(false);
      },
      () => {
        fallback();
        setLocating(false);
      },
      { timeout: 6000 },
    );
  };

  const confirm = () => {
    const p = `AG-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setProtocol(p);
    setDriver(DRIVERS[Math.floor(Math.random() * DRIVERS.length)]);
    setStep(3);
  };

  const canNext =
    step === 0 ? !!issue
    : step === 1 ? plate.trim() && name.trim() && phone.trim()
    : !!coords || refPoint.trim().length > 3;

  const fmtLat = coords
    ? `${Math.abs(typeof coords.lat === "number" ? coords.lat : 0).toFixed(5)}° ${coords.lat < 0 ? "S" : "N"}, ${String(coords.lng).replace("-", "")}° O`
    : "";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/50 p-0 backdrop-blur-[3px] sm:items-center sm:p-6"
      onClick={() => {
        onClose();
        reset();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Pedir socorro"
    >
      <div
        className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-2xl border-2 border-ink bg-paper shadow-hard-lg sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* cabeçalho */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b-2 border-ink bg-amber px-5 py-3.5">
          <p className="flex items-center gap-2.5 font-display text-lg font-extrabold">
            <span className="grid h-8 w-8 place-items-center rounded-md border-2 border-ink bg-paper">
              <IconHook className="h-4.5 w-4.5" />
            </span>
            {step === 3 ? "Pedido confirmado" : "Pedir socorro"}
          </p>
          <button
            onClick={() => {
              onClose();
              reset();
            }}
            aria-label="Fechar"
            className="grid h-9 w-9 place-items-center rounded-lg border-2 border-ink bg-paper transition-colors hover:bg-ink hover:text-amber"
          >
            <IconClose className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* progresso */}
        {step < 3 && (
          <div className="flex gap-1.5 px-5 pt-4">
            {[0, 1, 2].map((s) => (
              <span
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${
                  s <= step ? "bg-amber" : "bg-line"
                }`}
              />
            ))}
          </div>
        )}

        <div className="p-5 sm:p-6">
          {step === 0 && (
            <>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-mut">
                Passo 1 de 3 · O que aconteceu?
              </p>
              <h3 className="mt-1.5 font-display text-2xl font-extrabold tracking-tight">
                Calma. Primeiro, o problema:
              </h3>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {ISSUES.map((it) => (
                  <button
                    key={it.id}
                    onClick={() => setIssue(it.id)}
                    className={`flex items-center gap-3 rounded-lg border-2 p-3.5 text-left transition-all duration-200 ${
                      issue === it.id
                        ? "border-ink bg-amber shadow-hard-sm"
                        : "border-line bg-paper hover:border-ink hover:bg-ambersoft/60"
                    }`}
                  >
                    <it.icon className="h-5.5 w-5.5 shrink-0" />
                    <span className="text-sm font-semibold leading-tight">{it.label}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-mut">
                Passo 2 de 3 · Seu veículo e contato
              </p>
              <h3 className="mt-1.5 font-display text-2xl font-extrabold tracking-tight">
                Agora, quem precisa de ajuda:
              </h3>
              <div className="mt-5 flex gap-2">
                {VTYPES.map((v) => (
                  <button
                    key={v}
                    onClick={() => setVtype(v)}
                    className={`rounded-lg border-2 px-3.5 py-2 text-sm font-semibold transition-all ${
                      vtype === v ? "border-ink bg-amber shadow-hard-sm" : "border-line hover:border-ink"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
              <div className="mt-4 space-y-3">
                <label className="block">
                  <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-mut">
                    Placa do veículo
                  </span>
                  <input
                    value={plate}
                    onChange={(e) => setPlate(e.target.value.toUpperCase())}
                    placeholder="ABC-1D23"
                    maxLength={8}
                    className="w-full rounded-lg border-2 border-line bg-paper px-4 py-3 font-mono tracking-[0.2em] outline-none transition-colors placeholder:text-mut/50 focus:border-amber2"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-mut">
                    Seu nome
                  </span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Como podemos te chamar?"
                    className="w-full rounded-lg border-2 border-line bg-paper px-4 py-3 outline-none transition-colors placeholder:text-mut/50 focus:border-amber2"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-mut">
                    WhatsApp / telefone
                  </span>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(11) 9 9999-0000"
                    inputMode="tel"
                    className="w-full rounded-lg border-2 border-line bg-paper px-4 py-3 font-mono outline-none transition-colors placeholder:text-mut/50 focus:border-amber2"
                  />
                </label>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-mut">
                Passo 3 de 3 · Onde você está?
              </p>
              <h3 className="mt-1.5 font-display text-2xl font-extrabold tracking-tight">
                Onde a gente te encontra:
              </h3>
              <button
                onClick={locate}
                disabled={locating}
                className="mt-5 flex w-full items-center justify-center gap-2.5 rounded-lg border-2 border-ink bg-amber py-3.5 font-display font-bold shadow-hard-sm transition-all duration-200 hover:translate-y-0.5 hover:shadow-none disabled:opacity-60"
              >
                <IconPin className="h-5 w-5" />
                {locating ? "Localizando…" : coords ? "Localizar novamente" : "Usar minha localização"}
              </button>
              {coords && (
                <p className="mt-3 rounded-lg border border-line bg-paper2 px-4 py-2.5 text-center font-mono text-[11px] tracking-wider text-ink2">
                  COORD · {fmtLat}
                  {coords.approx && (
                    <span className="block text-[9.5px] text-mut">
                      localização aproximada — capriche na referência abaixo
                    </span>
                  )}
                </p>
              )}
              <label className="mt-4 block">
                <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-mut">
                  Ponto de referência
                </span>
                <input
                  value={refPoint}
                  onChange={(e) => setRefPoint(e.target.value)}
                  placeholder="Ex.: Rod. Castello Branco, km 42, sentido capital"
                  className="w-full rounded-lg border-2 border-line bg-paper px-4 py-3 outline-none transition-colors placeholder:text-mut/50 focus:border-amber2"
                />
              </label>
              <div className="mt-4 rounded-lg border border-line bg-ambersoft/70 px-4 py-3 text-[13px] leading-relaxed text-ink2">
                Preço estimado pra <strong className="font-semibold">{vtype}</strong>:{" "}
                <strong className="font-semibold">R$ 189 – R$ 247</strong>, fechado antes de
                confirmar. Sem taxa de chamada.
              </div>
            </>
          )}

          {step === 3 && (
            <div className="text-center">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border-2 border-ink bg-amber shadow-hard-sm">
                <IconCheck className="h-7 w-7" />
              </span>
              <h3 className="mt-4 font-display text-[1.7rem] font-extrabold leading-tight tracking-tight">
                {name.split(" ")[0] || "Motorista"}, respira:
                <br />
                o socorro já foi despachado.
              </h3>
              <p className="mt-2 font-mono text-[11px] tracking-[0.18em] text-mut">
                PROTOCOLO <span className="font-semibold text-ink">{protocol}</span> · CHEGADA EM ~18 MIN
              </p>
              <div className="mt-5 flex items-center gap-3 rounded-lg border-2 border-ink bg-paper2 p-3.5 text-left">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-ink bg-amber font-display text-sm font-extrabold">
                  {driver.initials}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-display font-bold">{driver.name}</p>
                  <p className="truncate font-mono text-[10px] tracking-wider text-mut">
                    {driver.vehicle} · {driver.jobs.toLocaleString("pt-BR")} corridas
                  </p>
                </div>
                <span className="ml-auto flex shrink-0 items-center gap-1 rounded border border-line bg-paper px-1.5 py-0.5 font-mono text-[10px] font-semibold text-amber2">
                  <IconStar className="h-2.5 w-2.5" />
                  {driver.rating}
                </span>
              </div>
              <p className="mt-4 text-[13px] leading-relaxed text-ink2">
                Você vai receber o deslocamento em tempo real por SMS e WhatsApp. Qualquer coisa, a
                central está a uma ligação de distância.
              </p>
              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                <a
                  href={PHONE_HREF}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-ink bg-paper px-4 py-3 font-semibold transition-colors hover:bg-ambersoft"
                >
                  <IconPhone className="h-4 w-4" /> Ligar pra central
                </a>
                <button
                  onClick={() => {
                    onClose();
                    reset();
                  }}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-ink bg-ink px-4 py-3 font-semibold text-paper transition-colors hover:bg-ink2"
                >
                  Fechar <IconArrow className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* rodapé de navegação */}
          {step < 3 && (
            <div className="mt-6 flex items-center justify-between gap-3">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="rounded-lg border-2 border-line px-4 py-2.5 text-sm font-semibold text-mut transition-colors hover:border-ink hover:text-ink disabled:invisible"
              >
                ← Voltar
              </button>
              {step < 2 ? (
                <button
                  onClick={() => canNext && setStep((s) => s + 1)}
                  disabled={!canNext}
                  className="rounded-lg border-2 border-ink bg-amber px-6 py-2.5 font-display font-bold shadow-hard-sm transition-all duration-200 hover:translate-y-0.5 hover:shadow-none disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
                >
                  Continuar →
                </button>
              ) : (
                <button
                  onClick={confirm}
                  disabled={!canNext}
                  className="sos-ring rounded-lg border-2 border-ink bg-ink px-6 py-2.5 font-display font-bold text-amber transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Confirmar socorro
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
