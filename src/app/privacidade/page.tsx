import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidade e Proteção de Dados",
  description:
    "Conheça como a Ana Paula RH coleta, usa e protege seus dados pessoais.",
};

export default function PrivacidadePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link
        href="/"
        className="text-sm font-medium text-zinc-900 hover:underline"
      >
        ← Voltar para o início
      </Link>

      <h1 className="mt-6 text-3xl font-bold tracking-tight text-zinc-900">
        Política de Privacidade e Proteção de Dados
      </h1>
      <p className="mt-2 text-sm text-zinc-500">
        Última atualização: 17 de agosto de 2026
      </p>

      <div className="mt-8 space-y-8 text-base leading-7 text-zinc-600">
        <p>
          Esta Política de Privacidade e Proteção de Dados explica como a{" "}
          <strong className="text-zinc-900">Ana Paula RH</strong> coleta,
          utiliza, armazena, compartilha e protege os dados pessoais fornecidos
          por candidatos que utilizam nossa plataforma de recrutamento.
        </p>
        <p>
          O tratamento dos dados pessoais é realizado em conformidade com a{" "}
          <strong className="text-zinc-900">
            Lei nº 13.709/2018 — Lei Geral de Proteção de Dados Pessoais
            (LGPD)
          </strong>{" "}
          e demais normas aplicáveis.
        </p>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900">
            1. Quem somos
          </h2>
          <p className="mt-2">
            O responsável pelo tratamento dos dados pessoais coletados por
            meio deste site é:
          </p>
          <p className="mt-2">
            <strong className="text-zinc-900">Responsável:</strong> Ana Paula
            Sousa Barbosa
            <br />
            <strong className="text-zinc-900">E-mail para contato:</strong>{" "}
            <a
              href="mailto:recrutamento.ap01@gmail.com"
              className="text-zinc-900 underline hover:no-underline"
            >
              recrutamento.ap01@gmail.com
            </a>
          </p>
          <p className="mt-2">
            Para questões relacionadas à privacidade e proteção de dados, o
            candidato poderá entrar em contato pelo e-mail informado acima.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900">
            2. Quais dados coletamos
          </h2>
          <p className="mt-2">
            Dependendo da utilização do site e da vaga pretendida, poderemos
            coletar:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Nome completo;</li>
            <li>Data de nascimento, quando necessária;</li>
            <li>E-mail;</li>
            <li>Número de telefone;</li>
            <li>Cidade e estado;</li>
            <li>Informações sobre formação acadêmica;</li>
            <li>Experiência profissional;</li>
            <li>Cursos e qualificações;</li>
            <li>Informações profissionais presentes no currículo;</li>
            <li>Currículo enviado pelo candidato;</li>
            <li>Informações fornecidas durante processos seletivos;</li>
            <li>Dados técnicos necessários para funcionamento e segurança do site.</li>
          </ul>
          <p className="mt-2">
            Recomendamos que o candidato <strong className="text-zinc-900">não envie informações pessoais que não sejam necessárias para sua candidatura</strong>, especialmente dados sensíveis que não tenham relação com o processo seletivo.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900">
            3. Como utilizamos os dados
          </h2>
          <p className="mt-2">
            Os dados pessoais poderão ser utilizados para:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Receber e analisar candidaturas;</li>
            <li>Avaliar a compatibilidade do candidato com determinada vaga;</li>
            <li>Entrar em contato com o candidato;</li>
            <li>Agendar entrevistas e demais etapas do processo seletivo;</li>
            <li>Encaminhar o candidato para oportunidades compatíveis;</li>
            <li>Manter registros relacionados aos processos seletivos;</li>
            <li>Melhorar nossos processos de recrutamento;</li>
            <li>Garantir a segurança e o funcionamento da plataforma;</li>
            <li>Cumprir obrigações legais ou regulatórias.</li>
          </ul>
          <p className="mt-2">
            Os dados não serão utilizados para finalidades incompatíveis com
            aquelas informadas nesta Política.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900">
            4. Envio e armazenamento de currículos
          </h2>
          <p className="mt-2">
            Ao enviar seu currículo pelo site, o candidato reconhece que as
            informações fornecidas poderão ser armazenadas em sistemas
            utilizados pela plataforma para permitir o funcionamento do processo
            de recrutamento.
          </p>
          <p className="mt-2">
            Os arquivos poderão ser armazenados em serviços de infraestrutura e
            armazenamento em nuvem utilizados pelo site.
          </p>
          <p className="mt-2">
            O acesso aos currículos deverá ser restrito às pessoas autorizadas e
            que tenham necessidade de utilizá-los para atividades relacionadas ao
            recrutamento e seleção.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900">
            5. Compartilhamento de dados
          </h2>
          <p className="mt-2">
            Os dados dos candidatos poderão ser compartilhados quando necessário
            para a realização do processo seletivo, inclusive com empresas
            contratantes ou responsáveis pela vaga para a qual o candidato se
            candidatou.
          </p>
          <p className="mt-2">
            Também poderemos utilizar fornecedores de tecnologia necessários
            para funcionamento da plataforma, como serviços de hospedagem,
            armazenamento, banco de dados, segurança e comunicação.
          </p>
          <p className="mt-2">
            Sempre que possível, serão adotadas medidas para garantir que os
            fornecedores tratem os dados de acordo com as finalidades
            estabelecidas e com a legislação aplicável.
          </p>
          <p className="mt-2">
            <strong className="text-zinc-900">
              Não comercializamos currículos ou dados pessoais dos candidatos.
            </strong>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900">
            6. Retenção dos dados
          </h2>
          <p className="mt-2">
            Os dados pessoais serão mantidos pelo período necessário para
            cumprir as finalidades descritas nesta Política, considerando também
            obrigações legais, regulatórias e a necessidade de defesa de
            direitos.
          </p>
          <p className="mt-2">
            Quando os dados não forem mais necessários, poderão ser excluídos,
            anonimizados ou mantidos somente quando houver fundamento legal que
            justifique sua conservação.
          </p>
          <p className="mt-2">
            O candidato também poderá solicitar a exclusão de seus dados,
            observadas as hipóteses em que a legislação permita ou exija sua
            conservação.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900">
            7. Exclusão de currículos
          </h2>
          <p className="mt-2">
            O candidato poderá solicitar a exclusão de seu currículo e dos dados
            pessoais associados à candidatura por meio do canal de contato
            informado nesta Política.
          </p>
          <p className="mt-2">
            Quando tecnicamente possível e juridicamente cabível, a exclusão
            poderá ser realizada dos sistemas utilizados para armazenamento.
          </p>
          <p className="mt-2">
            A exclusão poderá não ser realizada quando a manutenção dos dados for
            necessária para cumprimento de obrigação legal, exercício regular de
            direitos ou outra hipótese prevista na legislação.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900">
            8. Segurança dos dados
          </h2>
          <p className="mt-2">
            Adotamos medidas técnicas e administrativas destinadas a proteger os
            dados pessoais contra:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Acesso não autorizado;</li>
            <li>Perda;</li>
            <li>Destruição;</li>
            <li>Alteração;</li>
            <li>Divulgação indevida;</li>
            <li>Tratamento inadequado ou ilícito.</li>
          </ul>
          <p className="mt-2">
            O acesso administrativo aos currículos e informações dos candidatos
            deve ser limitado a usuários autorizados.
          </p>
          <p className="mt-2">
            Apesar das medidas de segurança adotadas, nenhum sistema conectado à
            Internet pode garantir segurança absoluta.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900">
            9. Direitos dos titulares
          </h2>
          <p className="mt-2">
            Nos termos da LGPD, o titular dos dados poderá solicitar, conforme
            aplicável:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Confirmação da existência de tratamento;</li>
            <li>Acesso aos dados pessoais;</li>
            <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
            <li>
              Anonimização, bloqueio ou eliminação de dados, quando cabível;
            </li>
            <li>Informação sobre compartilhamentos;</li>
            <li>
              Informação sobre a possibilidade de não fornecer determinados
              dados;
            </li>
            <li>
              Revogação do consentimento, quando o tratamento estiver baseado
              nessa hipótese;
            </li>
            <li>
              Portabilidade dos dados, quando aplicável e regulamentada;
            </li>
            <li>Outros direitos previstos na legislação.</li>
          </ul>
          <p className="mt-2">
            As solicitações poderão ser encaminhadas para:
          </p>
          <p className="mt-2">
            <strong className="text-zinc-900">E-mail:</strong>{" "}
            <a
              href="mailto:recrutamento.ap01@gmail.com"
              className="text-zinc-900 underline hover:no-underline"
            >
              recrutamento.ap01@gmail.com
            </a>
          </p>
          <p className="mt-2">
            Poderemos solicitar informações adicionais para confirmar a
            identidade do solicitante e evitar o acesso indevido aos dados.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900">
            10. Cookies e tecnologias semelhantes
          </h2>
          <p className="mt-2">
            O site poderá utilizar cookies e tecnologias semelhantes para:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Funcionamento da plataforma;</li>
            <li>Segurança;</li>
            <li>Preferências do usuário;</li>
            <li>Análise de utilização do site;</li>
            <li>Melhoria da experiência do usuário.</li>
          </ul>
          <p className="mt-2">
            Quando necessário, serão apresentadas opções para gerenciamento das
            preferências de cookies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900">
            11. Dados de menores de idade
          </h2>
          <p className="mt-2">
            O site de recrutamento é destinado, em regra, a pessoas que possam
            participar legalmente dos processos seletivos divulgados.
          </p>
          <p className="mt-2">
            Quando houver tratamento de dados pessoais de crianças ou
            adolescentes, serão observadas as regras específicas previstas na
            LGPD e demais normas aplicáveis.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900">
            12. Transferência internacional de dados
          </h2>
          <p className="mt-2">
            Alguns fornecedores de tecnologia utilizados pela plataforma poderão
            processar ou armazenar dados fora do Brasil.
          </p>
          <p className="mt-2">
            Quando houver transferência internacional de dados pessoais, serão
            observados os requisitos e mecanismos previstos na LGPD e nas
            regulamentações aplicáveis.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900">
            13. Alterações desta Política
          </h2>
          <p className="mt-2">
            Esta Política poderá ser atualizada para refletir alterações na
            legislação, nos serviços utilizados ou nas práticas de tratamento
            de dados.
          </p>
          <p className="mt-2">
            A versão mais recente estará sempre disponível nesta página,
            acompanhada da respectiva data de atualização.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900">14. Contato</h2>
          <p className="mt-2">
            Em caso de dúvidas, solicitações ou questões relacionadas ao
            tratamento de dados pessoais, entre em contato:
          </p>
          <p className="mt-2">
            <strong className="text-zinc-900">Responsável:</strong> Ana Paula
            Sousa Barbosa
            <br />
            <strong className="text-zinc-900">E-mail:</strong>{" "}
            <a
              href="mailto:recrutamento.ap01@gmail.com"
              className="text-zinc-900 underline hover:no-underline"
            >
              recrutamento.ap01@gmail.com
            </a>
            <br />
            <strong className="text-zinc-900">Telefone:</strong> 61 982473176
          </p>
        </section>

        <section className="rounded-xl border border-zinc-200 bg-zinc-50 p-6">
          <h2 className="text-xl font-semibold text-zinc-900">
            Declaração do candidato
          </h2>
          <p className="mt-2">
            Ao enviar seus dados e currículo por meio desta plataforma, o
            candidato declara que teve acesso a esta Política de Privacidade e
            compreende como seus dados poderão ser tratados para as finalidades
            relacionadas ao recrutamento e seleção.
          </p>
          <p className="mt-2 font-semibold text-zinc-900">
            Importante: o envio do currículo não garante a participação ou
            aprovação em qualquer processo seletivo.
          </p>
        </section>
      </div>
    </div>
  );
}
