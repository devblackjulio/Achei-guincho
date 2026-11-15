import type { ReactNode } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import "./legais.css";

/**
 * Casca comum das quatro páginas legais.
 *
 * Elas compartilham nav e rodapé com a home (mesma marca, mesmos destinos),
 * mas o miolo é prosa em coluna estreita — quem lê política de privacidade
 * está lendo, não explorando uma landing page.
 *
 * O rodapé recebe onSOS vazio de propósito: nas páginas legais não existe o
 * modal de pedido, e um botão que abre um modal inexistente seria um link
 * morto. O telefone da central continua no rodapé.
 */
export default function LegalPage({
  title,
  description,
  updated,
  children,
}: {
  title: string;
  description: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <div className="legal relative min-h-screen">
      <Nav onSOS={() => {}} />
      <main className="legal-prose">
        <h1>{title}</h1>
        {updated && <p className="legal-updated">Última atualização: {updated}</p>}
        <p className="sr-only">{description}</p>
        {children}
      </main>
      <Footer onSOS={() => {}} />
    </div>
  );
}
