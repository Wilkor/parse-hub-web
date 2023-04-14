import React, { useState } from 'react';
import { BdsButton } from 'blip-ds/dist/blip-ds-react';

export default function SideBar() {

    const [step, setStep] = useState(0);

    const handleNextStep = async () => {

        const stepperComponent = document.querySelector('bds-stepper');

        const activeStep = await stepperComponent.getActiveStep();

        stepperComponent.setActiveStep(activeStep + 1);

        stepperComponent.setCompletedStep(activeStep);

        setStep(activeStep + 1);
    };
    
    const handlePreviousStep = async () => {

        const stepperComponent = document.querySelector('bds-stepper');

        const activeStep = await stepperComponent.getActiveStep();

        stepperComponent.setActiveStep(activeStep - 1);

        setStep(activeStep - 1);
    };

    const getStepContentByIndex = (index) => {
        const content = {
            0: 'Step one',
            1: 'Step two',
            2: 'Step three',
        };

        return content[index];
    };


    return (
        <>
            <bds-stepper>
                <bds-step active="true">Step one 1</bds-step>
                <bds-step>Step two 2</bds-step>
                <bds-step>Step three 3</bds-step>
            </bds-stepper>
            <bds-paper elevation="secondary">
                {getStepContentByIndex(step)}
                {step === 3 && 'Finished!'}
            </bds-paper>
            <div style={{ display: 'flex' }}>
                {(step == 1 || step == 2) && (
                    <bds-button style={{ marginRight: '8px' }} onClick={handlePreviousStep}>
                        Previous step
                    </bds-button>
                )}
                {(step == 0 || step == 1) && <bds-button onClick={handleNextStep}>Next step</bds-button>}
                {step == 2 && <bds-button onClick={handleNextStep}>Finish</bds-button>}
            </div>
        </>
    );
}

