import LegalPage from "./LegalPage";

/**
 * Termos de Uso.
 *
 * Conteúdo da versão HTML publicada, com uma pendência herdada mantida como
 * está: o foro ainda não foi definido pela empresa (item 10). Não inventei
 * uma cidade — cláusula de foro com comarca errada é pior que pendência
 * sinalizada, e quem publica precisa escolher.
 *
 * URL pública: /termos.html
 */
export default function TermosPage() {
  return (
    <LegalPage
      title="Termos de Uso"
      description="Termos de uso dos aplicativos Achei Guincho e Achei Guincho Prestador."
      updated="12 de outubro de 2026"
    >
      <p className="legal-lead">
        Estes Termos regem o uso dos aplicativos <strong>Achei Guincho</strong> e{" "}
        <strong>Achei Guincho Prestador</strong> e do serviço que os conecta. Ao
        criar uma conta ou usar os apps, você declara estar de acordo com eles e
        com a <a href="privacidade.html">Política de Privacidade</a>.
      </p>

      <h2>1. O que é o serviço</h2>
      <p>
        A plataforma Achei Guincho é um{" "}
        <strong>intermediário tecnológico</strong>: mostra ao cliente os
        prestadores de guincho e reboque disponíveis na região, com estimativa de
        valor e acompanhamento no mapa, e envia ao prestador as solicitações de
        quem está por perto. O contrato de transporte/reboque é firmado{" "}
        <strong>entre cliente e prestador</strong> — a plataforma não executa o
        guincho.
      </p>

      <h2>2. Conta e acesso</h2>
      <ul>
        <li>Somente maiores de 18 anos podem criar conta.</li>
        <li>
          Você é responsável por manter o acesso ao seu e-mail/telefone em sigilo
          e por avisar qualquer uso indevido.
        </li>
        <li>
          Uma pessoa por conta; contas falsas ou que falsifiquem dados de
          veículo/documentos podem ser suspensas.
        </li>
        <li>
          Credenciais de demonstração usadas na revisão da loja não devem ser
          compartilhadas.
        </li>
      </ul>

      <h2>3. Do lado do cliente</h2>
      <ul>
        <li>Informe origem, destino e dados do veículo com precisão.</li>
        <li>
          Compare valor estimado, avaliação e tempo de chegada antes de
          solicitar.
        </li>
        <li>
          O pagamento é combinado diretamente com o prestador (Pix, cartão ou
          dinheiro); a plataforma registra o método e o valor do atendimento.
        </li>
        <li>
          Cancelamentos e reagendamentos seguem as regras exibidas no app no
          momento do pedido.
        </li>
      </ul>

      <h2>4. Do lado do prestador</h2>
      <ul>
        <li>
          Informe com honestidade os serviços que realiza, sua tabela e a região
          de atendimento.
        </li>
        <li>
          Mantenha documentos, CNH e dados do veículo atualizados — podem ser
          conferidos pela plataforma.
        </li>
        <li>
          A posição do veículo é publicada no mapa{" "}
          <strong>apenas enquanto você estiver online</strong>.
        </li>
        <li>
          Aceite só chamadas que puder atender; desistências repetidas podem
          limitar a prioridade de envio.
        </li>
      </ul>

      <h2>5. Conduta proibida</h2>
      <ul>
        <li>
          Usar os apps para fim ilícito, fraude, golpe ou cobrança de valores não
          combinados.
        </li>
        <li>Manipular localização, avaliação ou qualquer dado do serviço.</li>
        <li>Coletar dados de outros usuários fora dos canais do app.</li>
        <li>
          Tentar acessar áreas restritas, copiar ou revender o código do serviço.
        </li>
      </ul>

      <h2>6. Avaliações e conteúdos</h2>
      <p>
        Avaliações e mensagens devem ser verdadeiras e respeitosas. Conteúdo
        ofensivo, discriminatório ou falso pode ser removido. Você mantém a
        propriedade do que escreve e concede o uso necessário para exibir dentro
        do serviço.
      </p>

      <h2>7. Suspensão e encerramento</h2>
      <p>
        Podemos suspender ou encerrar contas que violem estes Termos, mediante
        comunicação sempre que possível. Você pode encerrar sua conta a qualquer
        momento pelo procedimento da página{" "}
        <a href="exclusao-de-conta.html">Exclusão de conta</a>.
      </p>

      <h2>8. Responsabilidade</h2>
      <p>
        A plataforma se esforça para manter disponibilidade, precisão de
        estimativas e segurança, mas não garante tempo exato de chegada nem
        resultado do atendimento — são fatores de trânsito, clima e
        disponibilidade do prestador. Na máxima extensão permitida pela lei, a
        plataforma não responde por lucros cessantes ou danos indiretos
        decorrentes do uso do serviço.
      </p>

      <h2>9. Alterações destes Termos</h2>
      <p>
        Podemos atualizar estes Termos; a data da última revisão aparece no topo.
        Mudanças relevantes serão comunicadas no app. O uso continuado após a
        mudança significa aceite da nova versão.
      </p>

      <h2>10. Foro e legislação aplicável</h2>
      <p>
        Estes Termos são regidos pelas leis brasileiras. Ficam eleitos os foros
        da comarca de <strong>[cidade/UF do prestador do serviço]</strong> para
        dirimir controvérsias, sem prejuízo do foro do domicílio do consumidor.
      </p>

      <p>
        Dúvidas? Acesse a <a href="contato.html">página de contato</a>.
      </p>
    </LegalPage>
  );
}
