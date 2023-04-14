import React from 'react';
import { Link } from 'react-router-dom';

export default function Main() {

    return (
        <>

            <bds-grid direction="column" xxs="12">
                <bds-grid container flex-wrap="wrap">
                    <bds-grid xxs="6" md="8" margin="y-2">
                        <bds-paper>
                            <bds-typo><Link to="/sobre">Sobre</Link></bds-typo>
                        </bds-paper>
                    </bds-grid>

                    <bds-grid xxs="6" md="4" margin="y-2">
                        <bds-paper>
                            <bds-typo>Tray</bds-typo>
                        </bds-paper>
                    </bds-grid>
                </bds-grid>

                <bds-grid container flex-wrap="wrap">
                    <bds-grid xxs="6" md="4">
                        <bds-paper>
                            <bds-typo>RdStation</bds-typo>
                        </bds-paper>
                    </bds-grid>

                    <bds-grid xxs="6" md="8">
                        <bds-paper>
                            <bds-typo>Movidesk</bds-typo>
                        </bds-paper>
                    </bds-grid>
                </bds-grid>
            </bds-grid>
        </>
    );
}


