import React, { useState, useEffect } from 'react';
import { BdsInput } from 'blip-ds/dist/blip-ds-react';
import { Toaster, toast } from 'react-hot-toast';
import { teams, contact, ticket, context, message, managerQueue, stateBot, scheduleData } from '../../Services'
import { BdsSelect } from 'blip-ds/dist/blip-ds-react';

export default function Semaforo() {

    const [user, setUser] = useState("")
    const [config, setConfig] = useState([]);
    const [data, setData] = useState([])
    const [team, setTeams] = useState([])
    const [state, setState] = useState([])
    const [stateId, setStateId] = useState("")
    const [stateName, setStateName] = useState("Selecione um bloco")
    const [flowId, setFlowId] = useState("")
    const [placeOrigem, setPlaceOrigem] = useState("Selecione uma origem")
    const [placeDestino, setPlaceDestino] = useState("Selecione um destino")
    const [placeUpOrigem, setPlaceUpOrigem] = useState("Origem")
    const [placeUpDestino, setPlaceUpDestino] = useState("Destino")
    const [placeEquipes, setPlaceEquipes] = useState("Selecione uma equipe")
    const [keyDestino, setKeyDestino] = useState("")
    const [keyOrigem, setKeyOrigem] = useState("")
    const [botIdOrigem, setBotIdOrigem] = useState("")
    const [botIdDestino, setBotIdDestino] = useState("");
    const [isLoadingChangeQueue, setIsLoadingChangeQueue] = useState(false)



    const fnAux = async () => {
        const bots = [];
        const contract = localStorage.getItem('contract-plugin')
        const resultTransfer = await scheduleData(`${contract}/?app=Transferencia de tickets`);

        resultTransfer.data[0].listBots.map((bot) => {
            bots.push({ label: bot.displayName, value: { name: bot.displayName, key: bot.key, id: bot.id } })
        });

        setData(bots);
    }


    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        fnAux()

    }, [])


    const handleUser = (event) => {
        setUser(event.detail.value)
    }

    const handleSetEventOrigem = (event) => {

        setPlaceUpOrigem(event.detail.value.id)
        setPlaceOrigem(event.detail.value.name)
        setKeyOrigem(event.detail.value.key)
        setBotIdOrigem(event.detail.value.id)

    }

    const handleSetEventDestino = async (event) => {

        setPlaceUpDestino(event.detail.value.id)
        setPlaceDestino(event.detail.value.name)
        setKeyDestino(event.detail.value.key)
        setBotIdDestino(event.detail.value.id)

        const resultTeams = await teams(event.detail.value.key);

        const time = [];
        const equipes = []

        resultTeams.data.resource.items.map((team) => {
            time.push({ label: team.name, value: team.name })
            equipes.push(`#${team.name}`)
        });

        const resultQueue = await managerQueue.GetQueue(event.detail.value.key)

        if (resultQueue.data.status === 'failure') {

            const resultSetQueue = await managerQueue.SetQueue(event.detail.value.key, event.detail.value.id)
            await managerQueue.SetRules(event.detail.value.key, resultSetQueue.data.resource, equipes, event.detail.value.id)

        }

        let arrStates = []
        const resultState = await stateBot(event.detail.value.key, event.detail.value.id, btoa(atob(event.detail.value.key.split('Key')[1]).split(':')[1]));

        resultState.data.statesInformation.map((s) => {

            if (s.name === 'Pre-Transbordo') {

                arrStates.push({ label: s.name, value: { name: s.name, id: s.id } })
            }
        })

        setFlowId(resultState.data.flowId)
        setState(arrStates)
        setTeams(time);
    }

    const handleSetEventEquipes = (event) => {

        setPlaceEquipes(event.detail.value)
    }

    const handleSetEventState = (event) => {

        setStateId(event.detail.value.id)
        setStateName(event.detail.value.name)
    }

    const handleCreateTicket = async () => {

        let resultFilterContact;

        const contract = localStorage.getItem('contract-plugin')

        if (!user) {

            toast.error('Digite o id do usuário!')
            return false
        }

        if (!botIdOrigem) {
            toast.error('Selecione o chatbot origem!')
            return false
        }

        if (!botIdDestino) {
            toast.error('Selecione o chatbot destino!')
            return false
        }

        if (!stateName || stateName === 'Selecione um bloco') {
            toast.error('Selecione um bloco!')
            return false
        }

        if (!placeEquipes || placeEquipes === 'Selecione uma equipe') {
            toast.error('Selecione uma equipe de atendimento!')

            return false
        }
        setIsLoadingChangeQueue(true)

        const { identifier, accessKey } = JSON.parse(localStorage.getItem('parse-hub-config')).headers;

        const keyRouter = 'Key ' + btoa(`${identifier}:` + atob(accessKey));

        const resultContact = await contact.GetContact(keyOrigem, user, botIdOrigem);

        const resultTicketOpen = await ticket.TicketOpen(keyOrigem, contract)

        const ticketId = resultTicketOpen.data.resource.items.filter((t) => t.customerIdentity === resultContact.data.resource.identity)[0].id
        const originator = resultContact.data.resource.extras['tunnel.originator'];

        await context.SetMasterState(keyRouter, botIdDestino, originator, contract);

        await context.SetContext(keyRouter, originator, flowId, stateId, contract);

        await message.SendMessasge(placeEquipes, keyRouter, botIdDestino, originator, contract);

        let resultTicketOpenDestion;
        let retry = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        let looping = true

        for (const iterator of retry) {

            // eslint-disable-next-line no-loop-func
            setTimeout(async () => {

                resultTicketOpenDestion = await ticket.TicketWaiting(keyDestino, contract);

                if (resultTicketOpenDestion.data.resource.items.length > 0) {

                    resultFilterContact = await contact.GetContactFilter(keyDestino, originator.split('@')[0]);

                    if (resultFilterContact.data.resource?.items.length === 0) {

                        resultFilterContact = await contact.GetContactFilter(keyDestino, originator.split('@')[0].toString().substring(2));
                    }

                    const ticketIdDestino = resultTicketOpenDestion.data.resource.items.filter((t) => t.customerIdentity === resultFilterContact.data.resource?.items[0]?.identity)

                    if (ticketIdDestino.length > 0 && looping === true) {
                        // Encerra o ticket origem
                        await ticket.TicketClose(keyOrigem, ticketId, contract);
                        await finalyTransfer(contract, ticketIdDestino[0].id)

                        looping = false
                        return false;
                    }
                }
            }, 2000 * iterator)

        }

    }

    const finalyTransfer = async (contract, ticketIdDestino) => {

        await ticket.TransferTicket(keyDestino, ticketIdDestino, placeEquipes, contract);
        document.getElementsByClassName("bp-btn bp-btn--blip-light bp-btn--rounded")[1].click();
        handleClearContext(`Ticket transferido com sucesso!`, true)

    }

    const handleClearContext = (text, flag) => {


        setPlaceUpOrigem("Origem")
        setPlaceOrigem("Selecione uma origem")
        setPlaceUpDestino("Destino")
        setPlaceDestino("Selecione um destino")
        setIsLoadingChangeQueue(false)
        setPlaceEquipes("Selecione uma equipe")
        setStateName("Selecione um bloco")
        setUser("");

        setTimeout(() => {

            document.getElementById('my-extension-root').style.display = 'none';

        }, 1000)

        if (flag) {

            toast.success(text)
            return
        }
        toast.error(text)

    }


    return (
        <>

            {isLoadingChangeQueue && <><div style={{ display: 'flex', justifyContent: 'center', marginTop: '31px' }}>

                <bds-loading-spinner size="standard" color="main"></bds-loading-spinner>

            </div><div style={{ display: 'flex', justifyContent: 'center', marginTop: '5%' }}>
                    <bds-typo variant="fs-16" class="bp-fs-9 bp-fw-regular bp-c-rooftop w-100 tc">
                        Estamos transferindo o ticket. Por favor, aguarde...</bds-typo>
                </div></>}

            {!isLoadingChangeQueue && <div style={{ padding: '20px', marginTop: '18px', marginBottom: '10px' }}>

                <div >
                    <BdsInput
                        type="text"
                        name="value"
                        label="Identificação do usuário"
                        placeholder="Cole o id do cliente aqui!"
                        value={user}
                        icon="user-engaged"
                        onBdsChange={($event) => handleUser($event)}
                    />
                </div><br></br>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <BdsSelect
                        icon="robot"
                        label={placeUpOrigem}
                        searchable={true}
                        options={JSON.stringify(data)}
                        onBdsChange={($event) => handleSetEventOrigem($event)}
                        placeholder={placeOrigem}
                    />

                    <bds-icon name="transfer" theme="outline" aria-label="Transferencia" style={{ marginTop: '15px' }}></bds-icon>

                    <BdsSelect
                        icon="robot"
                        label={placeUpDestino}
                        searchable={true}
                        options={JSON.stringify(data)}
                        onBdsChange={($event) => handleSetEventDestino($event)}
                        placeholder={placeDestino}
                    />
                </div><br></br>

                <div>
                    <BdsSelect
                        icon="builder-new-state"
                        label="Bloco"
                        searchable={true}
                        options={JSON.stringify(state)}
                        onBdsChange={($event) => handleSetEventState($event)}
                        placeholder={stateName}
                    />
                </div>
                <br></br>

                <div>
                    <BdsSelect
                        icon="team"
                        label="Equipes"
                        searchable={true}
                        options={JSON.stringify(team)}
                        onBdsChange={($event) => handleSetEventEquipes($event)}
                        placeholder={placeEquipes}
                    />
                </div>


                <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                    <bds-button icon="send" size="short" onClick={handleCreateTicket} >Transferir</bds-button>

                </div>

            </div>}

            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </>
    );
}


