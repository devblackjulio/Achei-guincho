import LegalPage from "./LegalPage";
import { PLAY_URL_PRESTADOR } from "../lib/data";

/**
 * Contato e suporte.
 *
 * Página de apoio: a Google Play exige que o desenvolvedor tenha um contato
 * público e funcional, mas usa a Política de Privacidade e a Exclusão de conta
 * como os dois links obrigatórios. Aqui os canais são reais (e-mail e
 * WhatsApp já usados no app); não há formulário porque não existe backend
 * para recebê-lo neste site.
 *
 * URL pública: /contato.html
 */
export default function ContatoPage() {
  return (
    <LegalPage
      title="Contato e suporte"
      description="Canais de contato e suporte dos apps Achei Guincho e Achei Guincho Prestador."
    >
      <p className="legal-lead">
        Fale com a equipe do Achei Guincho. Respondemos em dias úteis,
        normalmente em até 2 dias.
      </p>

      <h2>Suporte e atendimento</h2>
      <p>
        <a href="mailto:acheiguinchoapp@gmail.com">acheiguinchoapp@gmail.com</a>
        <br />
        Dúvidas dos apps, conta, atendimento e financeiro.
      </p>

      <h2>WhatsApp e telefone</h2>
      <p>
        <a href="https://wa.me/556294989472">+55 62 9498-9472</a>
        <br />
        Mensagem no WhatsApp ou ligação, de onde você estiver.
      </p>

      <h2>Privacidade e dados</h2>
      <p>
        <a href="mailto:acheiguinchoapp@gmail.com?subject=Privacidade">
          acheiguinchoapp@gmail.com
        </a>{" "}
        (assunto: <em>Privacidade</em>)
        <br />
        Pedidos de acesso, correção, exportação ou exclusão de dados.
      </p>

      <h2>Quer ser prestador?</h2>
      <p>
        Baixe o <a href={PLAY_URL_PRESTADOR} target="_blank" rel="noopener noreferrer">
          Achei Guincho Prestador
        </a> na Google Play e faça o cadastro pelo app — ele inclui a região de
        atendimento e sua tabela de preços.
      </p>

      <h2>Antes de escrever, veja se está aqui</h2>
      <table>
        <thead>
          <tr>
            <th>Assunto</th>
            <th>Página</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Como seus dados são tratados</td>
            <td>
              <a href="privacidade.html">Política de Privacidade</a>
            </td>
          </tr>
          <tr>
            <td>Como excluir sua conta</td>
            <td>
              <a href="exclusao-de-conta.html">Exclusão de conta</a>
            </td>
          </tr>
          <tr>
            <td>Regras de uso dos apps</td>
            <td>
              <a href="termos.html">Termos de uso</a>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="legal-callout">
        <p>
          <strong>Em situações de emergência na estrada</strong>, o atendimento
          do guincho é combinado diretamente com o prestador escolhido pelo app —
          chat e telefone ficam disponíveis durante o pedido.
        </p>
      </div>
    </LegalPage>
  );
}
