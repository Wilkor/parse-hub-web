import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { login, resource, scheduleData, menuServices } from '../Services';


import Home from "../SendNotification/sendNotification";
import Semaforo from "../Components/Semaforo";
import Contratar from '../Components/Contratar';
import Transferencia from '../Components/Transferencia';
import PlugIn from '../Components/Plugin';
import Sobre from '../Components/Sobre';
import Protesto from '../Components/ProtestoBr';
import Fatura from '../Components/7azFaturas';
import MovideskView from '../Components/Movidesk'

const Rotas = () => {
    
    const [system, setSystem] = useState([]);
    const [room, setRoom] = useState("");
    const [key, setKey] = useState("")
    const [config, setConfig] = useState()

    useEffect(() => {


        const room = window.location.host.split('.')[0];
        localStorage.setItem('contract-plugin', room)

        const loginService = async () => {

            const resultLogin = await login(room, room);
            const resultResource = await resource(room, resultLogin.data.token)
            const resultResourceSchedule = await scheduleData(room)
            const resultMenuService = await menuServices(room, resultLogin.data.token)

            if (resultResource.data.data?.resource){

                const { headers } = resultResource.data.data?.resource
    
                const KEY = 'Key ' + btoa(`${headers.identifier}:` + atob(headers.accessKey));
    
                localStorage.setItem('parse-hub-key', KEY)
            }
     
            if (resultMenuService.data === 0) {

                setSystem([{ "url": "/contratar", "index": "tab1", "label": "Contratar", "icon": "voip" }])
                return
            }

            setSystem(resultMenuService.data)
        };

        loginService()

    }, [])


    return (<>
        <Router>
            <div style={{ background: 'white', boxShadow: 'rgb(7 71 166 / 16%) 0px 16px 20px', borderRadius: '7px' }}>

                <div style={{ display: 'flex', justifyContent: 'space-around' }}>

                    <bds-tooltip position="top-center" tooltip-text="Extensões" >
                        <Link to="/extensoes" style={{ textDecoration: 'none' }} class="bds-tab hydrated" >
                            <bds-icon class="cor_exemplo" name="plugin" theme="outline">
                            </bds-icon>
                        </Link>
                    </bds-tooltip>

                 
                    {system.map((e) => {
                        return (

                            <bds-tooltip position="top-center" tooltip-text={e.label}>
                                <Link to={e.url} style={{ textDecoration: 'none' }} class="bds-tab hydrated">
                                    <bds-icon class="cor_exemplo" name={e.icon} theme="outline">
                                    </bds-icon>
                                </Link>
                            </bds-tooltip>

                        )

                    })}


                    <bds-tooltip position="top-center" tooltip-text="Sobre nós">
                        <Link to="/sobre" style={{ textDecoration: 'none' }} class="bds-tab hydrated">
                            <bds-icon class="cor_exemplo" name="company" theme="outline">
                            </bds-icon>
                        </Link>
                    </bds-tooltip>

                </div>
            </div>
            <div className="dt dt--fixed">
                <div className="bp-divider-h"></div>
            </div>

            <Switch>

                <Route exact path="/contratar">
                    <Contratar />
                </Route>
                <Route exact path="/agenda">
                    <Home data={config} key={key} />
                </Route>
                <Route exact path="/semaforo">
                    <Semaforo />
                </Route>
                <Route exact path="/ticket">
                    <Transferencia />
                </Route>
                <Route exact path="/extensoes">
                    <PlugIn />
                </Route>
                <Route exact path="/sobre">
                    <Sobre />
                </Route>

                <Route exact path="/protesto">
                    <Protesto />
                </Route>
                <Route exact path="/fatura">
                    <Fatura />
                </Route>
                <Route exact path="/movidesk">
                    <MovideskView/>
                </Route>
            </Switch>
        </Router>
    </>
    )
}

export default Rotas;