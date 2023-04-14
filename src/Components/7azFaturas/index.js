import React, { useState, useEffect } from 'react';
import { faturas } from '../../Services';
import { Toaster, toast } from 'react-hot-toast';
import { BdsInput } from 'blip-ds/dist/blip-ds-react';
import { triggerBase64Download } from 'react-base64-downloader';
import { Scrollbar } from 'react-scrollbars-custom';
import { scheduleData } from '../../Services'


import utils from '../../utils/cpfCnpj'

export default function Fatura() {

    const [loading, setLoading] = useState(false);
    const [doc, setDoc] = useState("");
    const [strginQrcode, setStrginQrcode] = useState("");
    const [config, setConfig] = useState(localStorage.getItem('parse-hub-config'))
    const [listFaturas, setListFaturas] = useState([{ erpInvoiceId: '' }]);
    const [infoFatura, setInfoFatura] = useState([]);
    const [tokenConfig, setTokenConfig] = useState("");


    const fnAux = async () => {

        const contract = localStorage.getItem('contract-plugin')
        const resultTransfer = await scheduleData(`${contract}/?app=Faturas`);

        console.log(resultTransfer.data[0].appKey)

        setTokenConfig(resultTransfer.data[0].appKey)
    }


    useEffect(() => {
        fnAux()

    }, [])


    const consultaProtesto = async (e) => {

        const filterResultKey = tokenConfig


        if (!doc) {
            toast.error(`Digite um documento!`)
            return false;
        }


        const docCliente = utils.validateDoc(doc) ? utils.formatCnpjCpf(doc) : false;

        if (!docCliente) {
            toast.error(`Documento inválido!`)
            return false;
        }

        setLoading(true)
        const resultFaturas = await faturas.GetInvoicesByDoc(doc, filterResultKey);

        if (resultFaturas.data.data.length === 0) {
            toast.error(`Não foi encontrada nenhuma cobrança para esse usuário!`);
            setLoading(false)
            setInfoFatura([])
            return false;
        }

        setInfoFatura(resultFaturas.data.data.reverse())
        setLoading(false)
        toast.success(`Consulta realizada com sucesso!`)


    }


    const handleSetDoc = (e) => {

        setDoc(e.detail.value);
    }

    const conpyText = (id, message) => {

        let copyText = document.getElementById(id);
        copyText.select();
        navigator.clipboard.writeText(copyText.value);
        toast.success(`${message} copiado para área de transferência`)
    }

    return (
        <>


            <div style={{ padding: '20px', marginTop: '18px', marginBottom: '10px' }}>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                    <BdsInput
                        type="text"
                        name="value"
                        label="Documento do cliente"
                        placeholder="Digite CPF do cliente"
                        value={doc}
                        icon="user-engaged"
                        onBdsChange={($event) => handleSetDoc($event)} />

                    <bds-button style={{ marginTop: '3px', padding: '5px' }} icon="search" size="short" variant='primary' onClick={() => consultaProtesto()} disabled={loading}>Buscar</bds-button>
                </div>

                <div style={{ marginTop: '30px' }}>

                    <div data-v-073c8162="" class="flex pv1 flex-row justify-between items-center">
                        <div data-v-073c8162="" class="bp-divider-h w-20 bp-bg-breeze"></div>
                        <span data-v-073c8162="" id="open-tickets-count" class="bp-fs-9 bp-fw-regular bp-c-rooftop w-100 tc">
                            Lista de boletos
                        </span><div data-v-073c8162="" class="bp-divider-h w-20 bp-bg-breeze"></div></div>
                </div>

                {loading && <><div style={{ display: 'flex', justifyContent: 'center', marginTop: '31px' }}>

                    <bds-loading-spinner size="standard" color="main"></bds-loading-spinner>

                </div><div style={{ display: 'flex', justifyContent: 'center', marginTop: '5%' }}>
                        <bds-typo variant="fs-16" class="bp-fs-9 bp-fw-regular bp-c-rooftop w-100 tc">
                            Estamos consultando todos os boletos em aberto. Por favor, aguarde...</bds-typo>
                    </div></>}


                <div style={{ display: 'flex', justifyContent: 'start', marginTop: '31px', padding: '15px' }}>


                    <Scrollbar style={{ width: '100%', height: 480 }}>

                        {!loading && infoFatura.map((e, index) => {


                            return (
                                <>
                                    <bds-grid container style={{ padding: '5px', width: '100%' }}>
                                        <bds-paper style={{ display: 'flex', justifyContent: 'start', flexWrap: 'wrap', width: '100%', padding: '15px' }} class="bp-fs-9 bp-fw-regular bp-c-rooftop">
                                            <bds-typo variant="fs-14" ><strong>Vencimento:</strong> {e.dueDate.split("T")[0].split("-").reverse().join("/")}</bds-typo><br></br>


                                            <input type="hidden" value={e.billetDigitableLine} id={`input_${index}`}></input>
                                            {e.billetDigitableLine !== null ? <><bds-typo variant="fs-14" value={e.billetDigitableLine}><strong>Código de Barras:</strong> {e.billetDigitableLine}
                                                <bds-icon name="copy" theme="outline" aria-label="Copiar para área de transferência" style={{ cursor: 'pointer' }} onClick={() => conpyText(`input_${index}`, 'Código de barras')}></bds-icon></bds-typo><br></br></> : <br></br>}

                                            <input type="hidden" value={e.pixCode} id={`input_pix_${index}`}></input>
                                            {e.pixCode !== null ? <><bds-typo variant="fs-14" value={e.pixCode}><strong>Código pix:</strong> {`${e.pixCode.split('qrcodepix')[0]}...`}
                                                <bds-icon name="copy" theme="outline" aria-label="Copiar para área de transferência" style={{ cursor: 'pointer' }} onClick={() => conpyText(`input_pix_${index}`, 'Código pix')}></bds-icon></bds-typo><br></br></> : <br></br>}

                                            <bds-typo variant="fs-14" ><strong>QRCode: </strong>
                                                <bds-tooltip position="top-left" tooltip-text="Download do QRCode">
                                                    <bds-icon class="cor_exemplo" name="download" theme="outline" onClick={() => triggerBase64Download('data:image/png;base64,' + e.pixQrCodeBase64, `pix_pagamento${e.dueDate.split("T")[0].split("-").reverse().join("/")}`)} >{e.dueDate.split("T")[0].split("-").reverse().join("/")}></bds-icon>
                                                </bds-tooltip><br></br>

                                                <bds-typo variant="fs-14" ><strong>Valor:</strong> {e.valor}</bds-typo><br></br>

                                            </bds-typo>

                                        </bds-paper>

                                    </bds-grid>
                                </>
                            )

                        })}
                    </Scrollbar>



                </div>


            </div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </>
    );
}


