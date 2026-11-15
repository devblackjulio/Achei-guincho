export type Service = {
  icon: string;
  name: string;
  desc: string;
  eta: string;
};

export const SERVICES: Service[] = [
  {
    icon: "hook",
    name: "Guincho leve",
    desc: "Carros de passeio, SUVs e picapes. Plataforma ou reboque, você escolhe o que serve pro seu carro.",
    eta: "ETA ~22 min",
  },
  {
    icon: "heavy",
    name: "Guincho pesado & frota",
    desc: "Caminhões, ônibus, vans e máquinas. Equipamento pra eixo travado, tombamento e remoção técnica.",
    eta: "ETA ~40 min",
  },
  {
    icon: "moto",
    name: "Socorro moto",
    desc: "Moto caída, corrente, pane ou queda na serra. Guincheiro treinado pra não riscar nada.",
    eta: "ETA ~19 min",
  },
  {
    icon: "fuel",
    name: "Pane seca",
    desc: "Acabou o combustível no meio do nada? Levamos o suficiente pra você chegar ao posto mais próximo.",
    eta: "ETA ~25 min",
  },
  {
    icon: "battery",
    name: "Bateria & parte elétrica",
    desc: "Chupeta na hora, teste de alternador e troca de bateria com nota. Sem empurrar venda casada.",
    eta: "ETA ~20 min",
  },
  {
    icon: "tire",
    name: "Troca de pneu",
    desc: "Furou no acostamento? Trocamos pelo estepe ou levamos pra vulcanizar — com você junto, sempre.",
    eta: "ETA ~18 min",
  },
  {
    icon: "key",
    name: "Chaveiro automotivo",
    desc: "Chave trancada dentro, quebrada na ignição ou perdida. Abertura sem dano na maioria dos modelos.",
    eta: "ETA ~30 min",
  },
  {
    icon: "wrench",
    name: "Pequenos reparos no local",
    desc: "Mangueira solta, vela, fusível, rebite de para-choque. Se dá pra resolver na pista, resolve na pista.",
    eta: "ETA ~24 min",
  },
];

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: "Quanto custa? Tem taxa surpresa?",
    a: "Não. Você vê o preço fechado no app antes de confirmar o pedido — calculado pela distância real até o guincheiro mais próximo. O valor combinado é o valor cobrado, no app ou na maquininha. Se o atendimento ficar mais complexo no local, qualquer mudança de preço precisa da sua aprovação antes.",
  },
  {
    q: "Como eu acompanho o guincho depois de pedir?",
    a: "Assim que um parceiro aceita, você recebe nome, foto, placa do caminhão e nota dele. O deslocamento aparece em tempo real no mapa, com ETA atualizado a cada minuto e aviso quando ele está a menos de 500 metros.",
  },
  {
    q: "Atendem moto, caminhão e máquinas?",
    a: "Sim. Temos guincho leve, prancha pra moto, pesado com lança e munck pra caminhões e máquinas agrícolas. Na hora de pedir, você escolhe o tipo de veículo e o app só mostra parceiros equipados pra ele.",
  },
  {
    q: "E se eu estiver num lugar sem sinal de internet?",
    a: "Chame no WhatsApp +55 62 9498-9472 — é o mesmo número que aparece no rodapé do site e no app em Ajuda e Suporte. Se o atendimento já estiver aberto, o chat do pedido e o telefone do prestador ficam disponíveis durante todo o atendimento.",
  },
  {
    q: "Quais as formas de pagamento?",
    a: "Pix, cartão de crédito e débito no app, ou maquininha direto com o guincheiro. Empresas e frotistas podem faturar com boleto mensal. Nota fiscal chega por e-mail em todos os casos.",
  },
  {
    q: "Tenho um guincho. Como viro parceiro?",
    a: "Cadastre o veículo no site, mande os documentos (CNH EAR, CRLV, seguro) e passe pela checagem da equipe. A aprovação sai em até 48h úteis. Você escolhe região e horário, recebe repasse semanal e suporte de gente de verdade.",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  place: string;
  tag: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Pneu furado na Marginal Tietê, duas da manhã, chuva fina. Em dezenove minutos o Rafael encostou o guincho e ainda me ofereceu café da garrafa. Nunca vi atendimento tão humano.",
    name: "Marina C.",
    place: "São Paulo · SP",
    tag: "PNEU FURADO · 02H14",
  },
  {
    quote:
      "Minha moto apagou no meio da descida da serra. O guincheiro chegou com uma capa de chuva pra mim antes mesmo de cuidar da moto. Esse detalhe eu não esqueço.",
    name: "Diego F.",
    place: "Campos do Jordão · SP",
    tag: "SOCORRO MOTO · 17H40",
  },
  {
    quote:
      "Bateria arriada no estacionamento do mercado, domingo. Achei que ia perder a tarde inteira: em meia hora tava resolvido, pelo preço exato que o app mostrou antes.",
    name: "Cléber A.",
    place: "Belo Horizonte · MG",
    tag: "BATERIA · 11H05",
  },
  {
    quote:
      "Caminhão com eixo travado na BR-101, carga perecível. O guincho pesado chegou rápido e o motorista ficou comigo até a carga ser remanejada pra outro baú. Salvou meu contrato.",
    name: "Sueli R.",
    place: "Recife · PE",
    tag: "GUINCHO PESADO · 04H30",
  },
  {
    quote:
      "Já usei três vezes esse ano. Sempre chega antes do ETA do app, sempre mandam a foto do guincheiro antes. Pra quem viaja sozinha, isso não tem preço.",
    name: "Patrícia L.",
    place: "Curitiba · PR",
    tag: "GUINCHO LEVE · 22H10",
  },
];

export type Driver = {
  name: string;
  vehicle: string;
  initials: string;
  jobs: number;
  rating: string;
};

export const DRIVERS: Driver[] = [
  { name: "Carlos Menezes", vehicle: "Ford F-4000 · RXT-4E27", initials: "CM", jobs: 1843, rating: "4,98" },
  { name: "Ana Paula Reis", vehicle: "MB Accelo · QNP-8B13", initials: "AR", jobs: 1207, rating: "4,97" },
  { name: "Jeferson Souza", vehicle: "VW Delivery · FGH-2C98", initials: "JS", jobs: 962, rating: "4,95" },
  { name: "Marcos Vidal", vehicle: "Hyundai HR · PLM-5D61", initials: "MV", jobs: 2310, rating: "4,99" },
  { name: "Roberto Lima", vehicle: "MB Atego · SDK-7A45", initials: "RL", jobs: 781, rating: "4,96" },
];

export const PHASES = [
  { label: "Chamado recebido", eta: 24 },
  { label: "Guincheiro aceitou", eta: 21 },
  { label: "A caminho do local", eta: 13 },
  { label: "Chegando — 400 m", eta: 4 },
  { label: "Atendimento concluído", eta: 0 },
];

export const CITIES = [
  "São Paulo",
  "Rio de Janeiro",
  "Belo Horizonte",
  "Curitiba",
  "Porto Alegre",
  "Brasília",
  "Goiânia",
  "Salvador",
  "Recife",
  "Fortaleza",
  "Belém",
  "Manaus",
  "Florianópolis",
  "Campinas",
  "Vitória",
];

// Canal REAL de atendimento — o mesmo e-mail/WhatsApp das páginas legais
// e do app (tela Ajuda e Suporte). Antes havia aqui um 0800 inventado,
// que o usuário discava e não existia: em site de emergência isso é o
// pior defeito possível.
export const PHONE = "+55 62 9498-9472";
export const PHONE_HREF = "https://wa.me/556294989472";
export const EMAIL = "acheiguinchoapp@gmail.com";
export const EMAIL_HREF = "mailto:acheiguinchoapp@gmail.com";

// ── Apps na Google Play ────────────────────────────────────────────
// O package name é a ÚNICA parte que identifica o app na loja; trocar uma
// letra aqui manda o visitante para "item não encontrado". Por isso mora
// num lugar só, e não espalhado dentro dos componentes.
//
// Só existe versão Android: não há app iOS publicado. O site não deve
// oferecer App Store até que exista.
export const PLAY_PACKAGE_CLIENTE = "com.devblack.acheiguincho.cliente";
export const PLAY_PACKAGE_PRESTADOR = "com.devblack.acheiguincho.prestador";

export const PLAY_URL_CLIENTE =
  `https://play.google.com/store/apps/details?id=${PLAY_PACKAGE_CLIENTE}`;
export const PLAY_URL_PRESTADOR =
  `https://play.google.com/store/apps/details?id=${PLAY_PACKAGE_PRESTADOR}`;
