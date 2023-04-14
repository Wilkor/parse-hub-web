import React, { useState, useEffect } from 'react';
import { BdsInput } from 'blip-ds/dist/blip-ds-react';
import { Toaster, toast } from 'react-hot-toast';
import { Movidesk } from '../../Services'
import { BdsSelect } from 'blip-ds/dist/blip-ds-react';
import { Scrollbar } from 'react-scrollbars-custom';
import {scheduleData } from '../../Services';

import * as moment from 'moment';


export default function MovideskView() {

    const [user, setUser] = useState("");
    const [userName, setUserName] = useState("");
    const [config] = useState(localStorage.getItem('parse-hub-config'));
    const [relationships, setRelationships] = useState("");
    const [data, setData] = useState([]);
    const [dataCategory, setDataCategory] = useState([]);

    const [state, setState] = useState([
        { label: "Interno", value: { name: "Interno", id: 1 } },
        { label: "Externno", value: { name: "Externo", id: 2 } }
    ]);
    const [stateId, setStateId] = useState("");
    const [stateName, setStateName] = useState("Selecione um tipo");
    const [placeOrigem, setPlaceOrigem] = useState("Selecione um serviço")
    const [placeDestino, setPlaceDestino] = useState("Selecione uma categoria");
    const [placeBot, setPlaceBot] = useState("Selecione um chatbot");
    const [placeUpOrigem, setPlaceUpOrigem] = useState("Urgência do Serviço");
    const [placeUpDestino, setPlaceUpDestino] = useState("Cartegoria");

    const [keyDestino, setKeyDestino] = useState("");
    const [keyOrigem, setKeyOrigem] = useState("");
    const [botIdOrigem, setBotIdOrigem] = useState("");
    const [botIdDestino, setBotIdDestino] = useState("");
    const [isLoadingChangeQueue, setIsLoadingChangeQueue] = useState(false)
    const [isLoadingChangeQueue2, setIsLoadingChangeQueue2] = useState(false)
    const [email, setEmail] = useState("");
    const [createdBy, setCreateBy] = useState({
        id: '',
        personType: '' || 1,
        profileType: '' || 2,
        businessName: '',
        email: '',
        phone: ''
    });
    const [dataClient, setDataClient] = useState({
        id: '',
        personType: '' || 2,
        profileType: '' || 2,
        businessName: '',
        email: '',
        phone: ''
    });
    const [textArea, setTextArea] = useState("");
    const [protocolo, setProtocolo] = useState("");
    const [botsAttendance, setBotAttendance] = useState([]);
    const [keyBot, setKeyBot] = useState("");
    const [keyBotRouter, setKeyBotRouter] = useState("");
    const [ticketNumber, setTicketNumber] = useState("");
    const [listTickets, setListTickets] = useState([]);
    const [modal, setModal] = useState(false)
    const [infoModal, setInfoModal] = useState({});
    const [flagEmail, setFlagEmail] = useState(false)
    const [tokenConfig, setTokenConfig] = useState("");


    const fnAuxAsync = async () => {

        const contract = localStorage.getItem('contract-plugin')
        const resultTransfer = await scheduleData(`${contract}/?app=Movidesk`);


        const token = resultTransfer.data[0].appKey;
        setTokenConfig(resultTransfer.data[0].appKey)
        const botRouter = resultTransfer.data[0].botRouter;
        setKeyBotRouter(botRouter)
        let resultBotsAttendance = resultTransfer.data[0].bots;
        let arrayBotsAttendance = [];
        resultBotsAttendance.map((bot) => {
            arrayBotsAttendance.push({ label: bot.displayName, value: { name: bot.displayName, id: bot.key } })
        });

        setBotAttendance(arrayBotsAttendance);

        const bots = [];
        const resultServiceMovidesk = await Movidesk.GetMovideskServices(token)

        resultServiceMovidesk.data.map((info, index) => {
            if (info.defaultUrgency !== null)
                bots.push({ label: info.name, value: { name: info.name, id: info.defaultUrgency }, categories: info.categories })
        });

        setData(bots);

        try {

            const { email } = JSON.parse(window.localStorage.ajs_user_traits);
            setEmail(email)

        } catch (e) {

            const emailValid = window.localStorage.apc_user_id;
            setEmail(emailValid)

        }

        const resultGetCreateBy = await Movidesk.GetPerson(token, email);

        if (resultGetCreateBy.data.length > 0) {

            setCreateBy({
                id: resultGetCreateBy.data[0].id,
                personType: resultGetCreateBy.data[0].personType || 1,
                profileType: resultGetCreateBy.data[0].profileType || 2,
                businessName: resultGetCreateBy.data[0].businessName,
                email: resultGetCreateBy.data[0].emails[0].email,
                phone: ''
            })
        } else {
            setFlagEmail(true)
            toast.error('Não foi possivel localizar os dados do agente Movidesk')
            return false
        }
    }
    useEffect(() => {

        fnAuxAsync()

    }, [])


    const handleUser = (event) => {
        setUser(event.detail.value)
    }
    const handleTicketNumber = (event) => {
        setTicketNumber(event.detail.value)
    }

    const handleSetEventOrigem = (event) => {

        let arrayCategories = [];

        setPlaceUpOrigem("Urgência: " + event.detail.value.id)

        let resultFilterSevices = data.filter((c) => c.label === event.detail.value.name)[0].categories;

        if (resultFilterSevices.length > 0) {

            resultFilterSevices.forEach(element => {
                arrayCategories.push({ label: element, value: { name: element, id: element } })
            });

        } else {
            arrayCategories.push({ label: 'Default', value: { name: 'Default', id: 'Default' } })
        }



        setDataCategory(arrayCategories)
        setPlaceOrigem(event.detail.value.name)
        setKeyOrigem(event.detail.value.key)
        setBotIdOrigem(event.detail.value.id)

    }

    const handleSetEventDestino = async (event) => {

        setPlaceDestino(event.detail.value.name)
        setKeyDestino(event.detail.value.key)
        setBotIdDestino(event.detail.value.id)


    }
    const handleSetEventBot = async (event) => {

        setPlaceBot(event.detail.value.name)
        setKeyBot(event.detail.value.id)


    }


    const handleSetEventState = (event) => {

        setStateId(event.detail.value.id)
        setStateName(event.detail.value.name)
    }

    const handleCreateTicket = async () => {

        const token = tokenConfig

        if(flagEmail) return 

        if (!user) {

            toast.error('Digite um telefone ou email!')
            return false
        }


        if (!stateName || stateName === 'Selecione um tipo') {
            toast.error('Selecione um tipo!')
            return false
        }
        if (!botIdOrigem) {
            toast.error('Selecione um serviço!')
            return false
        }


        if (!ticketNumber) {
            toast.error('Digite o número do ticket!')
            return false
        }


        if (!placeBot || placeBot === "Selecione um chatbot") {
            toast.error('Selecione um bot de atendimento!')
            return false
        }

        if(!placeDestino || placeDestino === "Selecione uma categoria") {
            toast.error('Selecione uma categoria!')
            return false
        }

        setIsLoadingChangeQueue(true)


        const payload = {
            type: stateId,
            subject: `Novo ticket - ${userName} - ${user}`,
            category: placeDestino,
            urgency: placeUpOrigem.split(":")[1].trim(),
            status: "novo",
            baseStatus: "novo",
            origin: "18",
            originEmailAccount: dataClient.email,
            tags: [],
            createdBy,
            clients: [dataClient],
            actions: [
                {
                    id: "1",
                    type: "2",
                    origin: "18",
                    description: "",
                    status: 'novo',
                    justification: null,
                    isDeleted: false,
                }
            ]
        }

        const resultGetAccount = await Movidesk.CreateTicket(token, payload, ticketNumber, keyBotRouter, keyBot);

        if (resultGetAccount.status === 200) {
            handleClearContext(resultGetAccount.data.id)
        } else {
            toast.error('Erro ao registar o ticket, tente novamente!')
            setIsLoadingChangeQueue(false);

        }


    }

    const handleGetAccount = async () => {

        const token = tokenConfig

         if(flagEmail) return 

        if (!user) {
            toast.error('Digite um telefone ou email!')
            return false
        }

        const resultGetAccount = await Movidesk.GetPerson(token, user);

        if (resultGetAccount.data.length === 0) {

            toast.error('Usuário não encontrado, tente novamente!')
            setUser("")
            return false

        } else {

            setDataClient({
                id: resultGetAccount.data[0].id,
                personType: resultGetAccount.data[0].personType || 2,
                profileType: resultGetAccount.data[0].profileType || 2,
                businessName: resultGetAccount.data[0].businessName,
                email: resultGetAccount.data[0].emails[0].email,
                phone: ''
            })
            setUserName(resultGetAccount.data[0].businessName)
            setRelationships(resultGetAccount.data[0].relationships[0].name)

        }


    }

    const handleGetAccountTickets = async () => {
        setIsLoadingChangeQueue2(true);

        const token = tokenConfig

        if (!user) {
            toast.error('Digite um telefone ou email!')
            setIsLoadingChangeQueue2(false);
            return false
        }

        const resultGetAccount = await Movidesk.GetPerson(token, user);

        if (resultGetAccount.data.length === 0) {

            toast.error('Usuário não encontrado, tente novamente!')
            setUser("")
            setIsLoadingChangeQueue2(false);
            return false

        } else {

            const resultTicketsByUser = await Movidesk.getTicketByUser(token, resultGetAccount.data[0].id);

           if (resultTicketsByUser.data.length === 0 ) {
            toast.error('Usuário não possui ticket!')
            setUser("")
            setIsLoadingChangeQueue2(false);
             return 
           }
            setListTickets(resultTicketsByUser.data.reverse())
            setIsLoadingChangeQueue2(false);
        }


    }


    const handleClearContext = (id) => {

        setPlaceUpOrigem("Origem");
        setPlaceOrigem("Selecione um serviço");
        setPlaceUpDestino("Destino");
        setPlaceDestino("Selecione uma categoria");
        setIsLoadingChangeQueue(false);
        setStateName("Selecione um tipo");
        setPlaceBot("Selecione um chatbot")
        setUser("");
        setTextArea("")
        setProtocolo(id)
        setUserName("")
        setRelationships("")
        setTicketNumber("")
        setPlaceBot("")
        toast.success("Ticket registrado com sucesso!");
        

    }

    const copyText = (id, message) => {

        let copyText = document.getElementById(id);
        copyText.select();
        navigator.clipboard.writeText(copyText.value);
        toast.success(`${message} copiado para área de transferência`)
        document.getElementsByClassName("w-100 ma0 bn bp-c-rooftop")[0].value = 'Segue número do seu protocolo: ' + copyText.value
        setProtocolo(null)
    }
    const handleOpenModal = async (id) => {

        const token = JSON.parse(config).system.filter((e) => e.label === 'Movidesk')[0].appKey;
        const resultTicketsById = await Movidesk.getTicketById(token, id);

        setInfoModal(resultTicketsById.data)
        setModal(true)

    }


    return (

        <>
            <bds-tabs>

                <bds-tab group="tab12" label="Cadastrar Ticket"></bds-tab>
                <bds-tab group="tab23" label="Consultar Tickets"></bds-tab>

            </bds-tabs>
            {isLoadingChangeQueue && <><div style={{ display: 'flex', justifyContent: 'center', marginTop: '31px' }}>

                <bds-loading-spinner size="standard" color="main"></bds-loading-spinner>

            </div><div style={{ display: 'flex', justifyContent: 'center', marginTop: '5%' }}>
                    <bds-typo variant="fs-16" class="bp-fs-9 bp-fw-regular bp-c-rooftop w-100 tc">
                        Estamos registrando seu ticket. Por favor, aguarde...</bds-typo>
                </div></>}


            <bds-tab-panel group="tab12">
                {!isLoadingChangeQueue && <div style={{ padding: '20px', marginTop: '18px', marginBottom: '10px' }}>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>

                        <BdsInput
                            type="text"
                            name="value"
                            label="Identificação do cliente"
                            placeholder="Digite telefone ou email"
                            value={user}
                            icon="user-engaged"
                            onBdsChange={($event) => handleUser($event)} />

                        <bds-button style={{ marginTop: '3px', padding: '5px' }} icon="search" size="short" variant='primary' onClick={handleGetAccount} disabled={flagEmail}>Buscar</bds-button>

                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>


                        <BdsInput
                            type="text"
                            name="value"
                            label="Nome do Cliente"
                            value={userName}
                            icon="avatar-user"
                            readonly={true} /><br />

                        <bds-icon name="arrow-right" theme="outline" style={{ marginTop: '15px' }}></bds-icon>

                        <BdsInput
                            type="text"
                            name="value"
                            label="Relacionamento"
                            value={relationships}
                            icon="company"
                            readonly={true} /><br />

                    </div>


                    <div>
                        <BdsSelect
                            icon="builder-new-state"
                            label="Tipo"
                            searchable={true}
                            options={JSON.stringify(state)}
                            onBdsChange={($event) => handleSetEventState($event)}
                            placeholder={stateName}
                        />
                    </div><br></br>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>


                        <BdsSelect
                            icon="settings-builder"
                            label={placeUpOrigem}
                            searchable={true}
                            options={JSON.stringify(data)}
                            onBdsChange={($event) => handleSetEventOrigem($event)}
                            placeholder={placeOrigem}
                        />

                        <bds-icon name="arrow-right" theme="outline" aria-label="Transferencia" style={{ marginTop: '15px' }}></bds-icon>

                        <BdsSelect
                            icon="guide"
                            label={placeUpDestino}
                            searchable={true}
                            options={JSON.stringify(dataCategory)}
                            onBdsChange={($event) => handleSetEventDestino($event)}
                            placeholder={placeDestino}
                        />
                    </div><br></br>

                    <div>

                        <BdsInput
                            type="number"
                            name="value"
                            label="Numero do ticket"
                            placeholder="Exemplo: 431"
                            value={ticketNumber}
                            icon="ticket"
                            onBdsChange={($event) => handleTicketNumber($event)} /><br></br>
                      

                        <BdsSelect
                            icon="robot"
                            label="Selecione o bot de atendimento"
                            searchable={true}
                            options={JSON.stringify(botsAttendance)}
                            onBdsChange={($event) => handleSetEventBot($event)}
                            placeholder={placeBot}
                        />
                    </div>

                    <div>

                    </div><br></br>


                    {protocolo && <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2px' }} class="bp-fs-9 bp-fw-regular bp-c-rooftop w-100 tc">

                        <input type="hidden" value={protocolo} id={`input_${protocolo}`}></input>
                        <bds-typo variant="fs-14" value={protocolo}><strong>Protocolo:</strong> {protocolo}
                            <bds-icon name="copy" theme="outline" aria-label="Copiar para área de transferência" style={{ cursor: 'pointer' }} onClick={() => copyText(`input_${protocolo}`, 'protocolo')}></bds-icon></bds-typo>

                    </div>}



                    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>

                        <bds-button icon="save-disk" size="short" onClick={handleCreateTicket}  disabled={flagEmail}>Criar ticket</bds-button>

                    </div>

                </div>}

            </bds-tab-panel>

            <bds-tab-panel group="tab23">

                {isLoadingChangeQueue2 && <><div style={{ display: 'flex', justifyContent: 'center', marginTop: '31px' }}>

                    <bds-loading-spinner size="standard" color="main"></bds-loading-spinner>

                </div><div style={{ display: 'flex', justifyContent: 'center', marginTop: '5%' }}>
                        <bds-typo variant="fs-16" class="bp-fs-9 bp-fw-regular bp-c-rooftop w-100 tc">
                            Estamos buscado tickets para esse usuário. Por favor, aguarde...</bds-typo>
                    </div></>}

                {!isLoadingChangeQueue2 && <div style={{ padding: '20px', marginTop: '18px', marginBottom: '10px' }}>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>

                        <BdsInput
                            type="text"
                            name="value"
                            label="Identificação do cliente"
                            placeholder="Digite telefone ou email"
                            value={user}
                            icon="user-engaged"
                            onBdsChange={($event) => handleUser($event)} />

                        <bds-button style={{ marginTop: '3px', padding: '5px' }} icon="search" size="short" variant='primary' onClick={handleGetAccountTickets}>Buscar</bds-button>

                    </div>

                    <Scrollbar style={{ width: '100%', height: 400 }}>

                        {listTickets.map((ticket) => {

                            return (<>
                                <bds-grid container style={{ padding: '5px', width: '100%', cursor: 'pointer' }} onClick={() => handleOpenModal(ticket.id)}>

                                    <bds-paper style={{ width: '100%', padding: '15px' }} class="bp-fs-9 bp-fw-regular bp-c-rooftop">
                                        <bds-icon name="tag" theme="outline"></bds-icon>
                                        <bds-typo variant="fs-14" ><strong>Protocolo:</strong> {ticket.protocol}</bds-typo>

                                        <bds-typo variant="fs-14" value={ticket.status}><strong>status:</strong> {ticket.status}</bds-typo>

                                        <bds-typo variant="fs-14" value={ticket.id}><strong>Id:</strong>{ticket.id}</bds-typo>

                                    </bds-paper>

                                </bds-grid>
                            </>)

                        })}

                    </Scrollbar>
                </div>}

            </bds-tab-panel>

            <bds-modal open={modal} close-button={() => setModal(false)}>

                <div data-v-073c8162="" class="flex pv1 flex-row justify-between items-center">
                    <div data-v-073c8162="" class="bp-divider-h w-20 bp-bg-breeze"></div>
                    <span data-v-073c8162="" id="open-tickets-count" class="bp-fs-9 bp-fw-regular bp-c-rooftop w-100 tc">
                        Informações sobre o ticket Movidesk
                    </span><div data-v-073c8162="" class="bp-divider-h w-20 bp-bg-breeze"></div></div>

                <bds-modal-action>

                    <bds-grid container style={{ padding: '5px', width: '100%' }} >
                        <bds-paper style={{ width: '100%', padding: '15px' }} class="bp-fs-9 bp-fw-regular bp-c-rooftop">


                            <bds-typo variant="fs-14" >
                                <strong>Protocolo: </strong> {infoModal?.protocol || 'Sem protocolo'}
                            </bds-typo>
                            <bds-typo variant="fs-14" >
                                <strong>ID: </strong> {infoModal?.id || 'Sem ID'}
                            </bds-typo>

                            <bds-typo variant="fs-14" >
                                <strong>Assunto: </strong> {infoModal?.subject || 'Sem Assunto'}
                            </bds-typo>

                            <bds-typo variant="fs-14" >
                                <strong>Urgência: </strong>{infoModal?.urgency || 'Sem urgência'}

                            </bds-typo>

                            <bds-typo variant="fs-14" >
                                <strong>Categoria: </strong>{infoModal?.category || 'Sem categoria'}
                            </bds-typo>

                            <bds-typo variant="fs-14" >
                                <strong>None do responsável: </strong>{infoModal?.owner?.businessName || 'Sem responsável'}
                            
                            </bds-typo>
                            <bds-typo variant="fs-14" >
                                <strong>Email do responsável: </strong>{infoModal?.owner?.email || 'Sem responsável'}
                            </bds-typo>
                            <bds-typo variant="fs-14" >
                                <strong>Time Responsável: </strong>{infoModal?.ownerTeam || 'Sem time responsável'}
                            </bds-typo>
                            <bds-typo variant="fs-14" >
                                <strong>Status: </strong>{infoModal?.status || 'Sem stauts'}
                            </bds-typo>
                            <bds-typo variant="fs-14" >
                                <strong>Última atualização: </strong>{moment(infoModal?.lastUpdate).format('DD/MM/YYYY HH:mm:ss')|| 'Sem atualização'}
                            </bds-typo>

                        </bds-paper>

                    </bds-grid>



                </bds-modal-action>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>

                    <bds-button onClick={() => setModal(false)}>Fechar</bds-button>

                </div>
            </bds-modal>

            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </>
    );
}


