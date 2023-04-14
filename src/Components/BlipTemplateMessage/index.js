import React, { useEffect, useState } from 'react';

import Card from '../Cards/cards'

function TemplatePreview({ data }) {


  return (

    <>

        <div class="blip-card" style={{width: '50%'}}>

          {
            data.value[0].type === 'HEADER' ? (
              <>
              <div class="blip-container plain-text">
                  <div class="bubble left">
                  {data.value[1].text.replace(/\\n/g, "\n").replace(/(\r\n|\n|\r)/gm, "\n")}
                  </div>
                  </div>
                  </>

            ) : (
              <>
                <div class="blip-container plain-text" >
                  <div class="bubble left">
                    {
                      data.value.length > 1 ? (<>
                      {data.value[0].text}
                        <div class="mt3 mb0 flex flex-wrap items-center justify-around bt bp-bc-neutral-medium-wave">

                          {
                            data.value !== 'No message selected' ?
                              data.value.filter(e => e.type === 'BUTTONS').map((b) => b.buttons.map((btn, idx) => {

                                return (
                                  <>
                                    <div key={idx} class="mt3 w-100 pa2 flex justify-center bp-bg-neutral-whisper br3 pa2">
                                      <span class="">{btn.text}</span>
                                    </div>
                                  </>
                                )

                              })) : (
                                <div>Nenhum template selecionado</div>
                              )
                          }
                        </div>
                      </>) : (
                        <div class="mt3 w-100 pa2 flex justify-center bp-bg-neutral-whisper br3 pa2" >
                          {data.value[0].text.replace(/\\n/g, "\n").replace(/(\r\n|\n|\r)/gm, "\n")}
                          </div>
                      )

                    }


                  </div>
                </div>
              </>
            )

          }

        </div>

    </>

  )

}


export default TemplatePreview;