import React, { useState } from 'react';
import { protesto } from '../../Services';
import { Toaster, toast } from 'react-hot-toast';
import { BdsInput } from 'blip-ds/dist/blip-ds-react';
import { triggerBase64Download } from 'react-base64-downloader';
import utils from '../../utils/cpfCnpj'

export default function Protesto() {

    const [loading, setLoading] = useState(false);
    const [doc, setDoc] = useState("");
    const [strginQrcode, setStrginQrcode] = useState("");


    const consultaProtesto = async (e) => {


        const docCliente = utils.validateDoc(doc) ? utils.formatCnpjCpf(doc) : false;

        if (!docCliente) {
            toast.error(`Documento inválido!`)
            return false;
        }
        if (!loading) {
            setLoading(true)
            const resultDataImage = await protesto.Get(docCliente);

            if (resultDataImage) {

                setStrginQrcode(resultDataImage.data.data)
                setLoading(false)
                toast.success(`Consulta realizada com sucesso! Faça o download do arquivo o arquivo.`)
            } else {

                toast.error(`Erro ao gerar a consulta, tente novamente`)
            }
        }
    }

    const handleSetDoc = (e) => {

        setDoc(e.detail.value);
    }

    return (
        <>


            <div style={{ padding: '20px', marginTop: '18px', marginBottom: '10px' }}>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                    <BdsInput
                        type="text"
                        name="value"
                        label="Documento do cliente"
                        placeholder="Digite CPF ou CNPJ do cliente"
                        value={doc}
                        icon="user-engaged"
                        onBdsChange={($event) => handleSetDoc($event)} />

                    <bds-button style={{ marginTop: '3px', padding: '5px' }} icon="search" size="short" variant='primary' onClick={() => consultaProtesto()} disabled={loading}>Buscar</bds-button>
                </div>

                <div style={{ marginTop: '30px' }}>

                    <div data-v-073c8162="" class="flex pv1 flex-row justify-between items-center">
                        <div data-v-073c8162="" class="bp-divider-h w-20 bp-bg-breeze"></div>
                        <span data-v-073c8162="" id="open-tickets-count" class="bp-fs-9 bp-fw-regular bp-c-rooftop w-100 tc">
                            Consulta de protestos
                        </span><div data-v-073c8162="" class="bp-divider-h w-20 bp-bg-breeze"></div></div>
                </div>

                {loading && <><div style={{ display: 'flex', justifyContent: 'center', marginTop: '31px' }}>

                    <bds-loading-spinner size="standard" color="main"></bds-loading-spinner>

                </div><div style={{ display: 'flex', justifyContent: 'center', marginTop: '5%' }}>
                        <bds-typo variant="fs-16" class="bp-fs-9 bp-fw-regular bp-c-rooftop w-100 tc">
                            Estamos consultando todos os estados. Por favor, aguarde...</bds-typo>
                    </div></>}


                <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '31px', padding: '15px' }}>

                    {
                        strginQrcode && !loading ? (

                            <>
                                <bds-button icon="download" size="short" variant='primary' onClick={() => triggerBase64Download(strginQrcode, `consulta_${doc}`)} >Download do arquivo</bds-button>

                            </>
                        ) : ''
                    }


                </div>



            </div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </>
    );
}


