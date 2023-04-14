import React from 'react';
import ReactDOM from 'react-dom';


import App from './App';



class Main extends React.Component {
  render() {
    return (
      
      <>
        <App ></App>
      </>)
  }
}

const app = document.createElement('div');
app.id = "my-extension-root";

document.body.appendChild(app);
ReactDOM.render(<Main></Main>, app);

app.style.display = "none";

setTimeout(() => {

  const buttonsList = document.querySelector('#container')
  const buttonsList1 = document.querySelector('#container')

  const blipsDiv = document.createElement('div');
  const blipsDiv1 = document.createElement('div');

  blipsDiv.setAttribute('id', 'button-integration');
  blipsDiv.onclick = () => { toggle() }
  blipsDiv.innerHTML = `<bds-tooltip position="right-center" tooltip-text="Integrações">
  <bds-icon style="margin-top:16px" name="settings-general" theme="outline"></bds-icon>
</bds-tooltip>`

  blipsDiv1.setAttribute('id', 'button-integration-two');
  blipsDiv1.onclick = () => { toggle() }
  blipsDiv1.innerHTML = `<bds-tooltip position="right-center" tooltip-text="Integrações .parse()">
<bds-icon style="margin-top:16px" name="settings-adjusments" theme="outline"></bds-icon>
</bds-tooltip>`

  buttonsList.appendChild(blipsDiv);
  buttonsList1.appendChild(blipsDiv1);

}, 3000);



function toggle() {

  if (app.style.display === "none") {
    app.style.display = "block";

  } else {

    app.style.display = "none";
  }
}
