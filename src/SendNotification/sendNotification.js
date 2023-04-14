import React, { useState, useEffect } from 'react';
import { BdsInput, BdsSelect, BdsInputPhoneNumber, BdsSwitch, BdsSelectChips } from 'blip-ds/dist/blip-ds-react';
import TemplatePreview from '../Components/BlipTemplateMessage';
import { login, resource, templates, schedule, campaigns, renewScheduleAPi, scheduleData } from '../Services';
import Select from '../Components/Select/index'
import { Toaster, toast } from 'react-hot-toast';
import { Scrollbar } from 'react-scrollbars-custom';
import * as moment from 'moment'

function App() {

  const [nameApp, setNameApp] = useState("pontoparse");
  const [roomApp, setRoomApp] = useState("pontoparse");
  const [config, setConfig] = useState(JSON.parse(localStorage.getItem("parse-hub-config-schedule")));
  const [dataLanguage, Language] = useState([{ label: 'Português', value: 'pt_BR' }, { label: 'Inglês', value: 'en_US' }]);
  const [data, setData] = useState([]);
  const [templateName, setTemplateName] = useState('Template');
  const [message, setMessage] = useState([]);
  const [key, setKey] = useState(localStorage.getItem('parse-hub-key'));
  const [configTemplate, setConfigTemplate] = useState({ value: "No message selected", config: "" });
  const [inputListTemplate, setInputListTemplate] = useState([{ value: "" }]);
  const [showTemplateItem, setShowTemplateItem] = useState(false);
  const [inputPhoneNumber, setInputPhoneNumber] = useState('');
  const [isShowDate, setIsShowDate] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [inputDate, setInputDate] = useState("");
  const [inputHour, setInputHour] = useState("");
  const [email, setEmail] = useState("");
  const [contactName, setContactName] = useState("");
  const [inputList, setInputList] = useState([]);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [listSchedule, setListSchedule] = useState([]);
  const [listScheduleAux, setListScheduleAux] = useState([]);
  const [isShowLoadingList, setIsShowLoadingList] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [btnRouter, setBtnRouter] = useState([]);
  const [modal, setModal] = useState(false);
  const [routerName, setRouterName] = useState("");
  const [modalSchedule, setModalSchedule] = useState(false);
  const [resourceNewSchedule, setResourceNewSchedule] = useState({});
  const [modalScheduleCancel, setModalScheduleCancel] = useState(false);
  const [cancelId, setCancelId] = useState("");
  const [cancelToken, setCancelToken] = useState("");
  const [loadingButtonCancel, setLoadingButtonCancel] = useState(false);
  
  const fnAuxTemplates = async (event) => {

    if (!event) return false;

 
    const arrayTemplates = [];
    const response = await templates(event);

    const resultFilterTemplates = response.data.resource.data.filter((t) => t.name.split('_')[0] !== 'sample' && t.status === 'APPROVED');


    resultFilterTemplates.map((template) => {
      arrayTemplates.push({ label: template.name, value: template.name })
    });

    setData(arrayTemplates);
    setMessage(resultFilterTemplates);

  }

  const handleInputChangeTemplate = (e, index, name) => {

    const list = [...inputListTemplate];

    list[index][name] = e.detail.value;
    setInputListTemplate(list);

  };

  const handleSetEvent = (event) => {


    const templateName = event?.detail?.value;

    const resultFilterTemplateByName = message.filter((m) => m.name === templateName);

    const config = resultFilterTemplateByName;
    if (!templateName)
      setShowTemplateItem(false)
    if (event && templateName) {

      setConfigTemplate({ value: config[0]?.components });
    }
    setTemplateName(templateName);

    let variables = [];
    let arr = [];

    if (config[0]?.components.length > 0) {
      setShowTemplateItem(true)

      variables = config[0]?.components.map((e) => {

        return e.text !== undefined ? e.text.match(/{{2}\d{0,2}}{2}/igm) : '';

      }).join().split(',').filter((e) => e !== '');

      for (const iterator of variables) {

        arr.push({ value: '' });

      }
      setInputListTemplate(arr);
      setModal(true)
    }

  }

  useEffect(() => {

    fnRouterBots();

    try {

      const { email } = JSON.parse(window.localStorage.ajs_user_traits);
      setEmail(email);

    } catch (e) {

      const emailValid = window.localStorage.apc_user_id;
      setEmail(emailValid);

    }

  }, [])

  const handleSetEventRouter = (event) => {

    setRouterName(event?.detail?.value);
    const resultFilterBotRouter = btnRouter.filter((f) => f.label === event?.detail?.value)

    fnAuxTemplates(resultFilterBotRouter[0]?.value)

  }

  const fnRouterBots = async () => {
    let arrayRouters = [];
    const contract = localStorage.getItem('contract-plugin')
    const resultTransfer = await scheduleData(`${contract}/?app=Agenda`);
    setConfig(resultTransfer.data)

    resultTransfer.data.map((e) => {

      arrayRouters.push({ label: e.router, value: e.routerKey })
    });
    setBtnRouter(arrayRouters)
  }

  const handleCloseWindow = () => {

    document.getElementById('my-extension-root').style.display = 'none'

  }

  const handleSendMessage = async () => {

    setIsLoadingForm(true)

    if (!contactName) {
      toast.error(`O campo nome precisa ser preenchido`);
      return false;
    }


    let arrayAux = []
    inputListTemplate.forEach((e, index) => { arrayAux.push(`${index}=${e.value}`) })
    const params = arrayAux.join(";")
    const emailEncode = encodeURIComponent(email) + "@blip.ai";

    let extras = {}
    // eslint-disable-next-line array-callback-return
    inputList.map((e, i) => {
      extras[`var${i}`] = e.var
    })

      console.log(config)

    const resultScheduel = await schedule.Create({
      inputDate,
      inputHour,
      inputPhoneNumber,
      templateName,
      params,
      isChecked,
      emailEncode,
      key: config.filter((e) => e.router === routerName)[0].routerKey,
      config: config.filter((e) => e.router === routerName),
      contactName,
      extras,
      contract: localStorage.getItem('contract-plugin')
    });


    if (resultScheduel.status === 200) {

      if (resultScheduel.data.isAttendant) {
        toast.success(`${resultScheduel.data.message}`);
        setIsLoadingForm(false)
        setInputList([])
        setInputListTemplate([])
        setIsShowDate(false)
        setIsChecked(false)
        setShowTemplateItem(false)
        setTemplateName("Selecione um template")
        return
      }
      toast.success("Processo realizado com sucesso!")
      setIsLoadingForm(false)
      setInputList([])
      setInputListTemplate([])
      setIsShowDate(false)
      setIsChecked(false)
      setShowTemplateItem(false)
      setTemplateName("Selecione um template")


    } else {

      toast.error(`Erro ao processar a requisção`);
      setIsLoadingForm(false)
      setInputList([])
      setInputListTemplate([])
      setIsShowDate(false)
      setIsChecked(false)
      setShowTemplateItem(false)
      setTemplateName("Selecione um template")

    }

  }

  const handleSetPhone = (e) => {

    const { value, code } = e.detail

    localStorage.setItem('plugin-phone', `${code}${value}`)
    setInputPhoneNumber(localStorage.getItem('plugin-phone'))

  }

  const handleChangeSwitch = (e) => {

    if (e.detail.checked) {
      setIsChecked(true)
      setIsShowDate(true)
    } else {
      setIsChecked(false)
      setIsShowDate(false)
    }
  }

  const handleDate = (e) => {
    setInputDate(e.detail.value)
  }

  const handleHours = (e) => {
    setInputHour(e.detail.value)
  }

  const handleSetName = (e) => {

    setContactName(e.detail.value)
  }

  const handleAddClick = () => {

    if (inputList.length >= 3) {
      toast.error('Não é possivel incluir mais extras!');
      return
    }
    setInputList([...inputList, {
      var: ""
    }
    ]);
  };

  const handleInputChangeStatus = (e, index) => {

    const list = [...inputList];

    list[index].var = e.detail.value;
    setInputList(list);
  };


  const handleRemoveClick = index => {

    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleGetSchedule = async (query) => {

    setIsShowLoadingList(true)

    let contrato = localStorage.getItem('contract-plugin');

    const emailEncode = encodeURIComponent(email)
    const resultListScheduel = await schedule.List(emailEncode, contrato, query);

    const data = resultListScheduel.data
    let listAux = []
    for (const iterator of data) {

      const { data: { resource } } = await campaigns(iterator.key, iterator.id);

      if (moment(resource.scheduled).format('DD/MM/YYYY HH:mm:ss') > moment().format('DD/MM/YYYY HH:mm:ss')) {
        listAux.push(resource)
      } else {
        schedule.Delete(resource.id)
      }
    }

    setListSchedule(listAux)
    setListScheduleAux(listAux)

    setIsShowLoadingList(false)

  }
  const deleteSchedule = async (id, token) => {

    setModalScheduleCancel(true)
    setCancelId(id)
    setCancelToken(token)

  }

  const deleteModalSchedule = async () => {

    if (!cancelId || !cancelToken) {

      toast.error('Não foi possível cancelar esse agendamento!');
      return;
    }
    setLoadingButtonCancel(true)

    const resultDelete = await schedule.DeleteSchedule(cancelId, cancelToken);

    if (resultDelete.status === 202) {

      toast.success('Agendamento cancelado com sucesso!');
      handleGetSchedule()
      setLoadingButtonCancel(false)
      setModalScheduleCancel(false)
      return
    }
    toast.error('Não foi possível cancelar esse agendamento!');
  }


  const renewSchedule = async (id, token) => {
    setModalSchedule(true)
    const { data: { resource } } = await campaigns(token, id);

    setResourceNewSchedule(resource)
  }

  const newSchedule = async (data) => {

    if (!inputDate) {
      toast.error('Informe uma nova data!');
      return
    }

    if (!inputHour) {
      toast.error('Informe uma nova hora!');
      return
    }


    data.scheduled = `${inputDate}T${inputHour}:00.000Z`

    const resultRenewSchedule = await renewScheduleAPi(data);

    if (resultRenewSchedule.status === 200) {

      toast.success('Reagendamento realizado com sucesso');
      setModalSchedule(false)
      setTimeout(() => handleGetSchedule(), 2000);
      setInputDate("")
      setInputHour("")
      return
    }

    toast.error('Não foi possível reagendar!');
  }

  const handleFilterSchedule = (event) => {

    const query = event.detail.value;

    let updatedList = [...listSchedule];

    updatedList = updatedList.filter((item) => {
      return item.name.split('-')[0].toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });

    setListScheduleAux(updatedList);


  }

  return (
    <>
      {isLoadingForm && <>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10%' }}>
          <bds-loading-spinner size="standard" color="main"></bds-loading-spinner>
        </div><div style={{ display: 'flex', justifyContent: 'center', marginTop: '5%' }}>
          <bds-typo variant="fs-16" class="bp-fs-9 bp-fw-regular bp-c-rooftop w-100 tc" >Enviando a mensagem. Por favor, aguarde...</bds-typo></div>
      </>}
      {!isLoadingForm && <>
        <bds-tabs>
          <bds-tab group="tab12" label="Audiência"></bds-tab>
          <bds-tab group="tab23" label="Dados do template"></bds-tab>
          <bds-tab group="tab34" label="Dados do envio"></bds-tab>
          <bds-tab group="tab45" label="Agendamentos"></bds-tab>
        </bds-tabs>
        <bds-tab-panel group="tab12">

          <div style={{ padding: '20px', marginTop: '18px', marginBottom: '10px' }}>

            <BdsInput icon="contact" label="Nome do cliente" onBdsChange={($event) => { handleSetName($event) }}></BdsInput><br></br>

            <BdsInputPhoneNumber label="Telefone do cliente" onBdsPhoneNumberChange={($event) => { handleSetPhone($event) }}></BdsInputPhoneNumber><br></br>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <bds-button icon="add" size="short" onClick={handleAddClick} >Adicionar Extras</bds-button>

            </div>
          </div>

          {inputList.length > 0 && <div>
            <div data-v-073c8162="" class="flex pv1 flex-row justify-between items-center">
              <div data-v-073c8162="" class="bp-divider-h w-20 bp-bg-breeze"></div>
              <span data-v-073c8162="" id="open-tickets-count" class="bp-fs-9 bp-fw-regular bp-c-rooftop w-100 tc">
                Extras do contato
              </span><div data-v-073c8162="" class="bp-divider-h w-20 bp-bg-breeze"></div>
            </div>
          </div>}



          {inputList.map((x, i) => {
            return (

              <>
                <div style={{ display: 'flex', justifyContent: 'space-around', padding: '5px' }}>

                  <BdsInput
                    icon="user-default"
                    name="var"
                    label="Valor extra"
                    onBdsChange={($event) => handleInputChangeStatus($event, i)}
                  />
                  <bds-icon name="trash" color="red" style={{ cursor: 'pointer', marginTop: '15px' }} onClick={() => handleRemoveClick(i)} role="img" class="bds-icon bds-icon__size--medium hydrated" aria-label="trash" theme="outline"></bds-icon>

                </div>

              </>


            );
          })}



        </bds-tab-panel>
        <bds-tab-panel group="tab23" >

          <div style={{ padding: '20px', marginTop: '18px', marginBottom: '10px' }}>
            <BdsSelectChips
              icon="robot"
              name="Roteador"
              label="Selecione um bot roteador"
              searchable={false}
              options={JSON.stringify(btnRouter)}
              onBdsChangeChips={($event) => handleSetEventRouter($event)}

            /><br></br>
            <BdsSelectChips
              icon="filter"
              label="Template que será enviado"
              searchable={false}
              options={JSON.stringify(data)}
              onBdsChangeChips={($event) => handleSetEvent($event)}
            />

          </div>

        </bds-tab-panel>
        <bds-tab-panel group="tab34">


          <bds-accordion-group collapse='single'>
            <bds-accordion>
              <bds-accordion-header accordion-title={contactName} icon="avatar-user" avatar-name=""
                avatar-thumb="">
              </bds-accordion-header>
              <bds-accordion-body>
                <bds-typo variant="fs-16">
                  Telefone: {inputPhoneNumber}
                  {inputList.map((e, index) => {
                    return (
                      <h5 className="bp-fs-18 bp-c-city">
                        Extras-{index + 1}: {e.var}
                      </h5>
                    )
                  })}
                </bds-typo>
              </bds-accordion-body>
            </bds-accordion>

            <bds-accordion>
              <bds-accordion-header accordion-title={templateName} icon="megaphone" avatar-name=""
                avatar-thumb="">
              </bds-accordion-header>
              <bds-accordion-body>
                <bds-typo variant="fs-16">
                  Variaveis que foram digitadas:
                  <br></br>
                  {inputListTemplate.map((t, index) => {
                    return (

                      <h5 className="bp-fs-18 bp-c-city">
                        Variavel-{index + 1}: {t.value}
                      </h5>

                    )
                  })}
                </bds-typo>
              </bds-accordion-body>
            </bds-accordion>
            <bds-accordion>
              <bds-accordion-header accordion-title={email} icon="agent" avatar-name=""
                avatar-thumb="">
              </bds-accordion-header>
              <bds-accordion-body>
                <bds-typo variant="fs-16">
                  Email do agente que receberá o ticket
                </bds-typo>
              </bds-accordion-body>
            </bds-accordion>
          </bds-accordion-group>

          <br></br>
          {/* <div>
          <div data-v-073c8162="" class="flex pv1 flex-row justify-between items-center">
              <div data-v-073c8162="" class="bp-divider-h w-20 bp-bg-breeze"></div>
              <span data-v-073c8162="" id="open-tickets-count" class="bp-fs-9 bp-fw-regular bp-c-rooftop w-100 tc">
                Deseja fazer um transferencia direta ?
              </span><div data-v-073c8162="" class="bp-divider-h w-20 bp-bg-breeze"></div>
            </div>  
        
            <bds-radio-group style={{ display: 'flex', justifyContent: 'space-around' }}>
            <bds-radio value="radio1" onClick="" label="Sim" checked></bds-radio>
            <bds-radio value="radio2" onClick="" label="Não"></bds-radio>
          </bds-radio-group>
          </div> */}

          <br></br>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>

            <div style={{ padding: '20px', marginTop: '-28px', width: '100%' }}>
              <h5 className="bp-fs-18 bp-c-city">
                Clique para agendar uma mensagem
              </h5>
              <BdsSwitch name="string" disabled="false" checked={isChecked} onBdsChange={($event) => { handleChangeSwitch($event) }}></BdsSwitch>
            </div>
        
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>


            {isShowDate && <BdsInput icon='calendar' label='Data' type='date' onBdsChange={($event) => { handleDate($event) }}></BdsInput>}
            {isShowDate && <BdsInput icon='clock' label='hora' type='time' onBdsChange={($event) => { handleHours($event) }}></BdsInput>}
  


          </div>

          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px', marginBottom: '10px' }}>
            <bds-button icon="send" size="short" variant='primary' onClick={() => handleSendMessage()}>Enviar</bds-button>
            <bds-button icon="exit" size="short" variant='tertiary' onClick={() => handleCloseWindow()}>Sair</bds-button>
          </div><br></br>
        </bds-tab-panel>
        <bds-tab-panel group="tab45">

          <bds-radio-group style={{ display: 'flex', justifyContent: 'space-around', marginTop: '5px' }}>
            <bds-radio value="radio1" onClick={() => handleGetSchedule('1')} label="Os meus"></bds-radio>
            <bds-radio value="radio2" onClick={() => handleGetSchedule('2')} label="Todos"></bds-radio>
          </bds-radio-group>

          <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
            {listSchedule.length !== 0 && <><BdsInput icon="contact" label="Telefone do cliente" onBdsChange={($event) => { handleFilterSchedule($event) }}></BdsInput><br></br></>}

            {/* <bds-button icon="list" size="short" onClick={handleGetSchedule} >Carregar lista</bds-button> */}

          </div>

          <div data-v-073c8162="" class="flex pv1 flex-row justify-between items-center">
            <div data-v-073c8162="" class="bp-divider-h w-20 bp-bg-breeze"></div>
            <span data-v-073c8162="" id="open-tickets-count" class="bp-fs-9 bp-fw-regular bp-c-rooftop w-100 tc">
              {listSchedule.length === 0 ? 'Você não possui agendamentos' : 'Lista de agendamentos'}
            </span><div data-v-073c8162="" class="bp-divider-h w-20 bp-bg-breeze"></div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>

            {isShowLoadingList && <div style={{ marginLeft: '40%' }}>
              <bds-loading-spinner size="standard" color="main"></bds-loading-spinner>
            </div>}


            <Scrollbar style={{ width: 360, height: 370 }}>

              {!isShowLoadingList && listScheduleAux.map((e) => {
                return (
                  <>
                    <bds-grid container style={{ padding: '5px', width: '100%' }}>
                      <bds-paper style={{ width: '100%', padding: '15px' }} class="bp-fs-9 bp-fw-regular bp-c-rooftop w-100 tc">
                        <bds-icon name="contact" theme="outline"></bds-icon>
                        <bds-typo variant="fs-16" >Telefone: {e.name.split('-')[0]}</bds-typo>
                        <bds-typo variant="fs-16" >Agendado: {moment(e.scheduled).format('DD/MM/YYYY HH:mm:ss')}</bds-typo>
                        <bds-typo variant="fs-16" >Status: {e.status === 'scheduling' ? 'Agendado' : e.status === 'failed' ? 'Falha' : e.status}</bds-typo>
                        <bds-typo variant="fs-16" >Origem:  {atob(e.key.split('Key')[1]).split(":")[0]}</bds-typo>
                        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '5px' }}>

                          <bds-button icon="refresh" size="short" variant='secondary' onClick={() => renewSchedule(e.id, e.key)}>Atualizar</bds-button>
                          <bds-button icon="delete" size="short" variant='delete' onClick={() => deleteSchedule(e.id, e.key)}>Cancelar</bds-button>

                        </div>
                      </bds-paper>
                    </bds-grid>

                  </>
                )
              })}
            </Scrollbar>
          </div>


        </bds-tab-panel></>
      }


      <bds-modal open={modal} close-button={() => setModal(false)} size="dynamic">


        <div data-v-073c8162="" class="flex pv1 flex-row justify-between items-center">
          <div data-v-073c8162="" class="bp-divider-h w-20 bp-bg-breeze"></div>
          <span data-v-073c8162="" id="open-tickets-count" class="bp-fs-9 bp-fw-regular bp-c-rooftop w-100 tc">
            Informações sobre o template
          </span><div data-v-073c8162="" class="bp-divider-h w-20 bp-bg-breeze"></div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-around' }}>

          <TemplatePreview data={configTemplate} templateValue={inputListTemplate} />
          {showTemplateItem && <>

            <Scrollbar style={{ width: '50%', height: 400 }}>

              {inputListTemplate.map((x, i) => {
                return (
                  <>
                    <BdsInput
                      type="text"
                      name="value"
                      label={i + 1}
                      placeholder="Variavel"
                      value={x.value}
                      onBdsChange={($event) => handleInputChangeTemplate($event, i, 'value')}
                    /><br></br>
                  </>
                );
              })}
            </Scrollbar>

          </>}

        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center' }}>

          <bds-button icon="arrow-right" onClick={() => setModal(false)}>Continuar</bds-button>

        </div>

      </bds-modal>


      <bds-modal open={modalSchedule} close-button={() => setModalSchedule(false)} size="dynamic">

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '50%' }}>
            <bds-illustration type="default" name="boy-computer" style={{ width: '50px' }}></bds-illustration>
          </div>

          <div style={{ display: 'flex', alignItems: 'stretch', width: '100%' }}>
            <div>
              <div data-v-073c8162="" class="flex pv1 flex-row justify-between items-center">

                <span data-v-073c8162="" id="open-tickets-count" class="bp-fs-9 bp-fw-regular bp-c-rooftop w-100 tc">
                  Agendado para: {moment(resourceNewSchedule.scheduled).format('DD/MM/YYYY HH:mm:ss')}
                </span>
              </div>

              <div data-v-073c8162="" class="flex pv1 flex-row justify-between items-center">

                <span data-v-073c8162="" id="open-tickets-count" class="bp-fs-9 bp-fw-regular bp-c-rooftop w-100 tc">
                  Nova data:
                </span>
              </div><br></br>
              <bds-typo variant="fs-14" bold="regular">

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>


                  <BdsInput icon='calendar' label='Data' type='date' onBdsChange={($event) => { handleDate($event) }}></BdsInput>
                  <BdsInput icon='clock' label='hora' type='time' onBdsChange={($event) => { handleHours($event) }}></BdsInput>


                </div>

              </bds-typo>
            </div>
          </div>

        </div>

        <bds-modal-action>

        </bds-modal-action>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>

          <bds-button icon="refresh" onClick={() => newSchedule(resourceNewSchedule)}>Atualizar</bds-button>
          <bds-button icon="exit" size="short" variant='secondary' onClick={() => setModalSchedule(false)}>Fechar</bds-button>

        </div>
      </bds-modal>

      <bds-modal open={modalScheduleCancel} close-button={() => setModalScheduleCancel(false)}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '50%' }}>
            <bds-illustration type="default" name="faq" style={{ width: '50px' }}></bds-illustration>
          </div>
          <div data-v-073c8162="" class="flex pv1 flex-row justify-between items-center">

            <span data-v-073c8162="" id="open-tickets-count" class="bp-fs-9 bp-fw-regular bp-c-rooftop w-100 tc">
              Você realmente deseja cancelar esse agendamento?
            </span>
          </div>

        </div>
        <bds-modal-action style={{ display: 'flex', justifyContent: 'space-around' }}>
          <bds-button bds-loading={loadingButtonCancel} icon="refresh" variant="secondary" onClick={() => deleteModalSchedule()}>Sim</bds-button>
          <bds-button icon="close" onClick={() => setModalScheduleCancel(false)}>Não</bds-button>
        </bds-modal-action>
        <div>

        </div>

      </bds-modal>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />


    </>

  );
}
export default App;