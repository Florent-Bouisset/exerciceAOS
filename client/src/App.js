import React, { Component } from 'react';
import LogoAOS from './logoAOS.png'
import ReactDOM from 'react-dom';

import './App.css';


function createElementFromHTML(myHtmlString) {
  return (
    <div dangerouslySetInnerHTML={{ __html: myHtmlString }} />
  )
}

class App extends Component {

  constructor(props) {
    super(props); {
    }
  }

  callAPI(jsonData) {
    fetch('http://localhost:9000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: jsonData,
    })

      .then(async response => {
        const string = await response.json();
        const divID = string.divID;
        const text = string.text;
        const htmlElement = createElementFromHTML(text);
        ReactDOM.render(htmlElement, document.getElementById(divID));
      })

    //.then(async string => createElementFromHTML(string))
    //.then(async html => ReactDOM.render(html, document.getElementById("mainContent")));

  }



  formToJson(form) {
    const data = new FormData(form);

    var object = {};
    data.forEach(function (value, key) {
      object[key] = value;
    });

    var json = JSON.stringify(object);

    return json;
  }

  submitHandler = (event) => {
    event.preventDefault();
    const form = document.getElementById('form01');
    const json = this.formToJson(form);
    this.callAPI(json);

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={LogoAOS} alt="Logo de AOS" />
        </header>

        <div id="mainContent" className="Content">

          <h2>
            Identification
        </h2>

          <form id="form01" onSubmit={this.submitHandler}>
            <label htmlFor="email">Adresse email : </label>
            <input type="text" id="email" name="email" />

            <label htmlFor="">Mot de passe : </label>
            <input type="password" id="password" name="password" />

            <br />
            <input type="submit" value="Se connecter" />
            <div id="errorMessage"></div>
          </form>

        </div>
      </div>
    );
  }


}

export default App;
