import React from 'react'
import Proptypes from 'prop-types'
import { BdsIcon } from 'blip-ds/dist/blip-ds-react';

export const PageHeaderComponent = ({ title, logo }) => (
    <>

        <div className="header">
            <div className="dt dt--fixed">
                <div className="dtc tl v-mid w-90" style={{ display: 'flex', justifyContent: 'space-around', margin: '27px' }}>
                    <img src='https://raw.githubusercontent.com/Wilkor/img-clonebots/main/logoParseHub.jpeg' style={{ width: '36px', position:'fixed', top:'9px', marginLeft:'-74px'}}></img>
                    <bds-icon name="transfer" theme="outline" style={{ color: 'black', width: '3px', position:'fixed', top:'15px',  marginLeft:'-6px'}}></bds-icon>
                    <bds-illustration type="blip-solid" name="wink" style={{ width: '40px', position:'fixed', top:'5px', marginLeft:'69px'}}></bds-illustration>
                </div>
                
            </div>
            <div className="dt dt--fixed">
                <div className="bp-divider-h"></div>
            </div>
        </div>
        


    </>
)

PageHeaderComponent.propTypes = {
    title: Proptypes.string,
}
