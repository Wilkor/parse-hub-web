import React, { useState } from 'react';
import { BdsInput } from 'blip-ds/dist/blip-ds-react';
import { Toaster, toast } from 'react-hot-toast';
import { trafficLight } from '../../Services'

export default function Semaforo() {

    const [user, setUser] = useState('');
    const [faces, setFaces] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleUser = (e) => {

        setUser(e.detail.value);
    }

    const handleCloseWindow = () => {

        document.getElementById('my-extension-root').style.display = 'none'
    }

    const handleRecords = async (title) => {

        if (!user) {
            toast.error(`Informe o usuário que deseja cadastrar`)
            return
        }

        if (localStorage.getItem('user') === user) {
            toast.error(`Você já avaliou esse usuário`)
            return
        }

        const body = {
            user,
            "pouting-face": title === 'pouting-face' ? 1: 0,
            "neutral-face": title === 'neutral-face' ? 1: 0,
            "smiling-face": title === 'smiling-face' ? 1: 0,
            face: title
        }
        const resultCreateTrafficLight = await trafficLight.Create(body);

        if (resultCreateTrafficLight.status === 200) {
            localStorage.setItem('user', user)

            toast.success(`Cadastro realiado com sucesso!`)
            return
        }
        toast.error(`Erro ao cadastrar o cliente`)

    }

    const getTrafficLight = async () => {

        setLoading(true)
        if (!user) {
            toast.error(`Informe o usuário que deseja consultar`)
            setLoading(false)
            return
        }

        const resultGetTrafficLight = await trafficLight.List(user);

        if (resultGetTrafficLight.status === 404) {
            toast.error(`Cliente não encontrado!`)
            setLoading(false)
            return
        }
        
        setTimeout(() => {
          setFaces(resultGetTrafficLight.data.data)
          setLoading(false)
        }, 1000)


    }
    return (
        <>
   
                <bds-tabs>
                    <bds-tab group="tab121" label="Incluir"></bds-tab>
                    <bds-tab group="tab232" label="Consultar"></bds-tab>

                </bds-tabs>
                <bds-tab-panel group="tab121">

                    <div style={{ padding: '20px', marginTop: '18px', marginBottom: '10px' }}>

                        <BdsInput
                            type="text"
                            name="value"
                            label="Identificação do usuário"
                            placeholder="Cole o tunnel.originator aqui"
                            value={user}
                            icon="user-engaged"
                            onBdsChange={($event) => handleUser($event)}
                        />

                        <div style={{ marginTop: '30px' }}>

                            <div data-v-073c8162="" class="flex pv1 flex-row justify-between items-center">
                                <div data-v-073c8162="" class="bp-divider-h w-20 bp-bg-breeze"></div>
                                <span data-v-073c8162="" id="open-tickets-count" class="bp-fs-9 bp-fw-regular bp-c-rooftop w-100 tc">
                                    Termômetro do cliente
                                </span><div data-v-073c8162="" class="bp-divider-h w-20 bp-bg-breeze"></div></div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '31px', padding: '15px' }}>

                            <bds-tooltip position="top-center" tooltip-text="Nervoso">
                                <bds-icon style={{ cursor: 'pointer' }} name="pouting-face" type="emoji" aria-label="emoji de nerd" size="xxx-large" onClick={() => handleRecords('pouting-face')}></bds-icon>
                            </bds-tooltip>

                            <bds-tooltip position="top-center" tooltip-text="Neutro">
                                <bds-icon style={{ cursor: 'pointer' }} name="neutral-face" type="emoji" aria-label="emoji neutro" size="xxx-large" onClick={() => handleRecords('neutral-face')}></bds-icon>
                            </bds-tooltip>

                            <bds-tooltip position="top-center" tooltip-text="Satisfeito">
                                <bds-icon style={{ cursor: 'pointer' }} name="smiling-face" type="emoji" aria-label="emoji sorrindo" size="xxx-large" onClick={() => handleRecords('smiling-face')}></bds-icon>
                            </bds-tooltip>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>

                            <bds-button icon="exit" size="short" variant='tertiary' onClick={() => handleCloseWindow()}>Sair</bds-button>

                        </div>
                    </div>

                </bds-tab-panel>
                <bds-tab-panel group="tab232" >

                    <div style={{ padding: '20px', marginTop: '18px', marginBottom: '10px' }}>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                            <BdsInput
                                type="text"
                                name="value"
                                label="Identificação do usuário"
                                placeholder="Cole o Tunnel.originator aqui"
                                value={user}
                                icon="user-engaged"
                                onBdsChange={($event) => handleUser($event)} />

                            <bds-button style={{ marginTop: '3px', padding: '5px' }} icon="search" size="short" variant='primary' onClick={() => getTrafficLight()}>Buscar</bds-button>
                        </div>

                        <div style={{ marginTop: '30px' }}>

                            <div data-v-073c8162="" class="flex pv1 flex-row justify-between items-center">
                                <div data-v-073c8162="" class="bp-divider-h w-20 bp-bg-breeze"></div>
                                <span data-v-073c8162="" id="open-tickets-count" class="bp-fs-9 bp-fw-regular bp-c-rooftop w-100 tc">
                                    Humor do cliente
                                </span><div data-v-073c8162="" class="bp-divider-h w-20 bp-bg-breeze"></div></div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '31px', padding: '15px' }}>

                          {loading &&  <bds-loading-spinner size="standard" color="main"></bds-loading-spinner>}
                            { !loading && faces.map((face) => {

                                return (
                                    <>
                                        <bds-tooltip position="top-center" tooltip-text={face.title}>
                                            <bds-icon style={{ cursor: 'pointer' }}
                                                name={face.face}
                                                type="emoji"
                                                aria-label="emoji de nerd"
                                                size="xxx-large"
                                                key={face.face}
                                            ></bds-icon>

                                        </bds-tooltip>

                                        <h3 className="bp-fs-18 bp-c-city" style={{ marginTop: '11px', marginLeft: '-4px' }} key={face.total}>{face.total}</h3>
                                    </>
                                )
                            })}
                        </div>


                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>

                            <bds-button icon="exit" size="short" variant='tertiary' onClick={() => handleCloseWindow()}>Sair</bds-button>

                        </div>
                    </div>

                </bds-tab-panel>
                <bds-tab-panel group="tab34">

                </bds-tab-panel>

           
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </>
    );
}


