import React, {useState, useEffect} from 'react';


export default function Contratar() {

    const [url, setUrl] = useState()

    
    useEffect(() => {
    const tenant  = window.location.host.split('.')[0];

    setUrl(`https://${tenant}.blip.ai/blip-store`);
    
    }, [])

    const handleCloseWindow = () => {
        document.getElementById('my-extension-root').style.display = 'none'
    }

    return (
        <>
            <bds-grid container style={{ padding: '50px', width: '100%' }}>
                <bds-paper style={{ width: '100%', padding: '15px' }} class="bp-fs-9 bp-fw-regular bp-c-rooftop w-100 tc">
                    <div>
                        <div className='bp-fs-9 bp-fw-regular bp-c-rooftop w-100 tc'>
                            Para contratar as funcionalidades dessa extenção, acesse a
                            <a href={url} target="_blank" > Blip Store </a>
                            ou fale com a <a href='https://bit.ly/parse-extensoes' target="_blank">.parse()</a>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                        <bds-button icon="logout" size="short" onClick={handleCloseWindow} >Sair</bds-button>
                    </div>
                </bds-paper>
            </bds-grid>
        </>
    );
}


