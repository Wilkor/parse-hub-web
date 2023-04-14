import React, { useState, useEffect } from 'react';

import { Scrollbar } from 'react-scrollbars-custom';
import Home from "../../SendNotification/sendNotification"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const PlugIn = () => {

  const [url1, setUrl1] = useState("")
  const [url2, setUrl2] = useState("")
  const [url3, setUrl3] = useState("")
  const [url4, setUrl4] = useState("")
  const [url5, setUrl5] = useState("")
  const [url6, setUrl6] = useState("")
  const [url7, setUrl7] = useState("")
  const [url8, setUrl8] = useState("")
  const [url9, setUrl9] = useState("")


  useEffect(() => {
    const tenant = window.location.host.split('.')[0] || "pontoparse";

    setUrl1(`https://${tenant}.blip.ai/blip-store/extensions/ca5903f7-cc8f-41bb-b94b-f0a03c20a860`);
    setUrl2(`https://${tenant}.blip.ai/blip-store/extensions/f54f5909-71b5-4e6a-b19a-b8f21a896116`);
    setUrl3(`https://${tenant}.blip.ai/blip-store/extensions/e29826ff-cf80-4760-82cb-bbf8fdad94e7`);
    setUrl4(`https://${tenant}.blip.ai/blip-store/extensions/1f51a33c-1db8-4db9-9b6b-85aa0c0bdc59`);
    setUrl5(`https://${tenant}.blip.ai/blip-store/extensions/dcf06765-cbd1-439f-81c1-7b9880aaf1e3`);
    setUrl6(`https://${tenant}.blip.ai/blip-store/extensions/10ea481e-bb17-4b68-a525-3669c50b2dcc`);
    setUrl7(`https://${tenant}.blip.ai/blip-store/extensions/69461578-02b6-42b1-b812-314071f52564`);
    setUrl8(`https://${tenant}.blip.ai/blip-store/extensions/bf98fde8-4139-4291-80f1-c75dc22c3e4b`);
    setUrl9(`https://${tenant}.blip.ai/blip-store/extensions/75091535-a68d-4a6d-b4c5-e187f011da54`);

  }, [])

  return (
    <>

      <Scrollbar style={{ width: '100%', height: 480 }}>


        <bds-accordion-group collapse='single'>

          <bds-accordion>
            <bds-accordion-header accordion-title="Agenda" icon="tag"
              avatar-name="Lucas Murta" avatar-thumb="https://raw.githubusercontent.com/Wilkor/img-clonebots/main/logoParseHub.jpeg">
            </bds-accordion-header>
            <bds-accordion-body>
              <bds-typo variant="fs-16">
                <bds-typo variant="fs-14" bold="bold" class="hydrated">Sobre</bds-typo><br></br><br></br>
                <bds-typo variant="fs-14" data-testid="extension-card-description-typo" class="hydrated">
                  Se você precisa agendar um retorno com seu cliente durante o atendimento de um ticket, essa é a extensão que precisa, com ela o seu atendente agenda um disparo ativo para o cliente conforme combinado, isso facilita o dia a dia e garante que o cliente receberá sua comunicação no dia e hora combinados, não é fantástico? 😍
                  <br></br><br></br>
                  Esqueça as planilhas e lembretes na sua agenda, torne o retorno com os clientes mais dinâmico e versátil, além de agendar, você pode enviar informações extras em um contato existente, ou até mesmo criar um contato novo, com isso quando o cliente responder e cair no atendimento as informações necessárias já estarão disponíveis para realizar o atendimento. É muita comodidade! 😎
                  <br></br><br></br>
                  Imagine o cenário, o seu atendente está prestes a concluir a venda, mas o cliente está indeciso e pede para retornar outro dia, é nesse momento que você aproveita e já agenda o retorno com seu cliente, passando as informações necessárias para continuar a venda.
                  <br></br><br></br>
                  Resultados esperados 🚀🚀🚀<br></br>
                  ✅ Envio de notificação garantida;<br></br>
                  ✅ Aumento da conversão no retorno do cliente;<br></br>
                  ✅ Redução operacional de disparos;<br></br>
                  ✅ Otimização no tempo de atendimento;<br></br>
                  ✅ Autonomia do atendente.<br></br><br></br>

                  Aumente a produtividade do seu time de atendimento, <a href={url1} target="_blank">contrate agora nossa extensão! 😍</a>

                </bds-typo>
              </bds-typo>
            </bds-accordion-body>
          </bds-accordion>

          <bds-accordion>
            <bds-accordion-header accordion-title="Message Desk" icon="tag"
              avatar-name="Lucas Murta" avatar-thumb="https://raw.githubusercontent.com/Wilkor/img-clonebots/main/logoParseHub.jpeg">
            </bds-accordion-header>
            <bds-accordion-body>
              <bds-typo variant="fs-16">
                <bds-typo variant="fs-14" bold="bold" class="hydrated">Sobre</bds-typo><br></br><br></br>
                <bds-typo variant="fs-14" data-testid="extension-card-description-typo" class="hydrated">
                  Notifique sua equipe de atendimento diretamente pelo Desk! 💬<br></br><br></br>

                  Você poderá enviar mensagens para sua equipe de atendimento para informar sobre alguma campanha, falha no sistema, alerta de fraudes, entre outras comunicações, tudo isso, sem o atendente precisar sair do atendimento.<br></br><br></br>

                  Traga mais agilidade e produtividade para sua equipe, instale agora o Message Desk no seu Contato Inteligente e leve o seu Desk para outro patamar. 🚀🚀🚀<br></br>
                  <br></br>
                  <a href={url2} target="_blank">contrate agora nossa extensão! 😍</a>
                </bds-typo>
              </bds-typo>
            </bds-accordion-body>
          </bds-accordion>

          <bds-accordion>
            <bds-accordion-header accordion-title="MkSolutions" icon="tag"
              avatar-name="Lucas Murta" avatar-thumb="https://raw.githubusercontent.com/Wilkor/img-clonebots/main/logoParseHub.jpeg">
            </bds-accordion-header>
            <bds-accordion-body>
              <bds-typo variant="fs-16">
                <bds-typo variant="fs-14" bold="bold" class="hydrated">Sobre</bds-typo><br></br><br></br>
                <bds-typo variant="fs-14" data-testid="extension-card-description-typo" class="hydrated">
                  Essa extensão é ideal para quem visa automatizar seus serviços e dar mais autonomia ao seu cliente!<br></br><br></br>

                  Focado no segmento de Telecom, seu cliente poderá:<br></br><br></br>
                  📲 Realizar a identificação positiva;<br></br>
                  📲 Obter uma 2ª via de fatura;<br></br>
                  📲 Efetuar o Desbloqueio de confiança.<br></br><br></br>

                  Resultados esperados 🚀🚀🚀<br></br><br></br>
                  ✅ Satisfação do Cliente;<br></br>
                  ✅ Aumento da conversão dos pagamentos de fatura;<br></br>
                  ✅ Redução no custo do atendimento;<br></br>
                  ✅ Otimização no tempo de atendimento;<br></br>
                  ✅ Autonomia do Cliente<br></br><br></br>

                  Aumente a produtividade do seu time de atendimento, <a href={url3} target="_blank">contrate agora nossa extensão! 😍</a>
                </bds-typo>
              </bds-typo>
            </bds-accordion-body>
          </bds-accordion>


          <bds-accordion>
            <bds-accordion-header accordion-title="Movidesk" icon="tag"
              avatar-name="Lucas Murta" avatar-thumb="https://raw.githubusercontent.com/Wilkor/img-clonebots/main/logoParseHub.jpeg">
            </bds-accordion-header>
            <bds-accordion-body>
              <bds-typo variant="fs-16">
                <bds-typo variant="fs-14" bold="bold" class="hydrated">Sobre</bds-typo><br></br><br></br>
                <bds-typo variant="fs-14" data-testid="extension-card-description-typo" class="hydrated">
                  Se precisa integrar o seu Movidesk com a Take Blip essa é a extensão perfeita para você! 😉

                  Com a extensão Movidesk você poderá:<br></br>
                  ✅  Realizar a identificação positiva do cliente;<br></br>
                  ✅  Abrir tickets direto no Movidesk;<br></br>
                  ✅  Importar histórico da conversa na Take Blip para o Movidesk.<br></br><br></br>

                  Gerencie seus tickets de forma assíncrona e tenha mais agilidade e possibilidades para responder seus clientes. <a href={url4} target="_blank">contrate agora nossa extensão! 😍</a>
                </bds-typo>

              </bds-typo>
            </bds-accordion-body>
          </bds-accordion>

          <bds-accordion>
            <bds-accordion-header accordion-title="Notificação de inatividade" icon="tag"
              avatar-name="Lucas Murta" avatar-thumb="https://raw.githubusercontent.com/Wilkor/img-clonebots/main/logoParseHub.jpeg">
            </bds-accordion-header>
            <bds-accordion-body>
              <bds-typo variant="fs-14" bold="bold" class="hydrated">Sobre</bds-typo><br></br><br></br>
              <bds-typo variant="fs-14" data-testid="extension-card-description-typo" class="hydrated">

                Com essa extensão, será possível enviar até 3 mensagens diferentes para os clientes que ficarem inativos no atendimento humano, não é demais? Além disso, caso o cliente não responda a terceira mensagem, o atendimento é finalizado garantindo seu nível de serviço!
                <br></br><br></br>
                Resultados esperados 🚀🚀🚀 <br></br>
                ✅ Transparência na comunicação; <br></br>
                ✅ Redução de atendimentos que ficam parados; <br></br>
                ✅ Melhora engajamento dos clientes; <br></br>
                ✅ Melhora nos relatórios de performance de atendimento.  <br></br><br></br>

                <a href={url5} target="_blank"> Quer saber mais? Então fale conosco!</a>

              </bds-typo>
            </bds-accordion-body>
          </bds-accordion>

          <bds-accordion>
            <bds-accordion-header accordion-title="QR Code" icon="tag"
              avatar-name="Lucas Murta" avatar-thumb="https://raw.githubusercontent.com/Wilkor/img-clonebots/main/logoParseHub.jpeg">
            </bds-accordion-header>
            <bds-accordion-body>
              <bds-typo variant="fs-16">
                <bds-typo variant="fs-14" bold="bold" class="hydrated">Sobre</bds-typo><br></br><br></br>
                <bds-typo variant="fs-14" data-testid="extension-card-description-typo" class="hydrated">
                  Se você quer aumentar a conversão de suas campanhas ou direcionar um cliente para um ponto específico diretamente de uma página do seu site, essa é a extensão para atender suas necessidades. 😃
                  <br></br><br></br>
                  ⏹️ Crie QR Codes com textos específicos e tenha o cliente onde você deseja no fluxo;<br></br>
                  ⏹️ Utilize os QR Codes para segmentar campanhas em locais específicos, virtuais, como: sites, tvs, entre outros,  ou aplique em pontos físicos, como: lojas, ponto de ônibus, Metrô e muitos outros.<br></br>
                  <br></br><br></br>
                  📲 Facilite a comunicação do cliente com sua Marca, instale agora o “Extensão QR Codes”  e tenha uma conversa iniciada em um click!<br></br>
                  <a href={url6} target="_blank">contrate agora nossa extensão! 😍</a>

                  

                </bds-typo>
              </bds-typo>
            </bds-accordion-body>
          </bds-accordion>

          <bds-accordion>
            <bds-accordion-header accordion-title="Semáforo de Sentimento" icon="tag"
              avatar-name="Lucas Murta" avatar-thumb="https://raw.githubusercontent.com/Wilkor/img-clonebots/main/logoParseHub.jpeg">
            </bds-accordion-header>
            <bds-accordion-body>
              <bds-typo variant="fs-16">
                <bds-typo variant="fs-14" bold="bold" class="hydrated">Sobre</bds-typo><br></br><br></br>
                <bds-typo variant="fs-14" data-testid="extension-card-description-typo" class="hydrated">

                  Semáforo de Sentimento
                  <br></br><br></br>
                  Saber o sentimento do cliente ao iniciar é imprescindível para que o atendente conduza da melhor maneira possível o atendimento, pensando nisso, desenvolvemos a possibilidade do atendente definir qual é o sentimento do cliente durante o atendimento, ele poderá escolher 3 tipos de estado:  Nervoso, Neutro e Satisfeito e cada escolha o percentual entre eles se altera, com isso será possível visualizar qual o estado atual de sentimento que o cliente está, e assim, entender se precisa de um atendimento prioritário ou específico de uma equipe, ajudando a evitar que esse cliente procure outras plataformas para expor seu problema.
                  <br></br><br></br>
                  📲 Facilite a identificação do perfil do seu cliente e traga mais resultados para a sua jornada.
                  <br></br><br></br>
                  Resultados esperados 🚀🚀🚀
                  <br></br>
                  ✅ Satisfação do cliente;<br></br>
                  ✅ Transparência sobre o sentimento do cliente;<br></br>
                  ✅ Redução na reclamação;<br></br>
                  ✅ Otimização na comunicação com clientes detratores;<br></br>
                  ✅ Autonomia do atendente.<br></br><br></br>

                  Melhore a satisfação do seu cliente, <a href={url7} target="_blank">contrate agora nossa extensão! 😍</a>

                </bds-typo>

              </bds-typo>
            </bds-accordion-body>
          </bds-accordion>

          <bds-accordion>
            <bds-accordion-header accordion-title="Tray" icon="tag"
              avatar-name="Lucas Murta" avatar-thumb="https://raw.githubusercontent.com/Wilkor/img-clonebots/main/logoParseHub.jpeg">
            </bds-accordion-header>
            <bds-accordion-body>
              <bds-typo variant="fs-16">

                <bds-typo variant="fs-14" bold="bold" class="hydrated">Sobre</bds-typo><br></br><br></br>
                <bds-typo variant="fs-14" data-testid="extension-card-description-typo" class="hydrated">

                  Integre a sua plataforma Tray na Take Blip! 📳<br></br>

                  Com a integração da Tray é possível realizar notificações ativas para seus clientes sobre:<br></br>
                  ⏹️  Status do pedido;
                  ⏹️ Envio de nota fiscal.<br></br><br></br>

                  Além disso, é possível realizar consultas do seu pedido diretamente pelo WhatsApp, onde e quando precisar, muito mais agilidade e comodidade para o dia a dia dos seus clientes.
                  <br></br>
                  Resultados esperados 🚀🚀🚀<br></br>
                  ✅ Satisfação do cliente;<br></br>
                  ✅ Transparência na comunicação;<br></br>
                  ✅ Redução de atendimentos humanos sobre status do pedido e nota fiscal;<br></br>
                  ✅ Redução no custo do atendimento;<br></br><br></br>

                  Bora otimizar seu atendimento, <a href={url8} target="_blank">contrate agora nossa extensão! 😍</a>

                </bds-typo>

              </bds-typo>
            </bds-accordion-body>
          </bds-accordion>

          <bds-accordion>
            <bds-accordion-header accordion-title="VTEX" icon="tag"
              avatar-name="Lucas Murta" avatar-thumb="https://raw.githubusercontent.com/Wilkor/img-clonebots/main/logoParseHub.jpeg">
            </bds-accordion-header>
            <bds-accordion-body>

              <div class="sc-hOGkXu fkRAao">
                <bds-typo variant="fs-14" bold="bold" class="hydrated">Sobre</bds-typo><br></br><br></br>
                <bds-typo variant="fs-14" data-testid="extension-card-description-typo" class="hydrated">
                  Integre a sua plataforma VTEX na Take Blip! 📳 <br></br>

                  Com a integração da VTEX é possível realizar notificações  ativas para seus clientes sobre:<br></br><br></br>
                  ⏹️  Status do pedido;<br></br>
                  ⏹️ Envio de boleto;<br></br><br></br>

                  📲 Mantenha sempre atualizada a comunicação da sua Marca com o cliente!<br></br><br></br>

                  Resultados esperados 🚀🚀🚀<br></br>
                  ✅ Satisfação do cliente;<br></br>
                  ✅ Aumento da conversão dos pagamentos de boletos;<br></br>
                  ✅ Redução no custo do atendimento;<br></br><br></br>

                  <a href={url9} target="_blank">contrate agora nossa extensão! 😍</a>
                </bds-typo>
              </div>


            </bds-accordion-body>
          </bds-accordion>

        </bds-accordion-group>

      </Scrollbar>

    </>
  );

}


export default PlugIn;