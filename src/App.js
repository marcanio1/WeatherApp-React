import React from "react";
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather"
import './App.css';

const API_KEY = 'cf7d64cd54d692538eb58461fba8a742';

class App extends React.Component{
    state = {
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: undefined
    }

    //Arrow Function, bound to the component.
    getWeather = async (e) => {
        e.preventDefault(); //Prevent the default behav.
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;


        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);  //Async Await- Http call

        const data = await api_call.json(); //Converted json data from api_call

        //console.log(data);
        if(city){
            this.setState({
                temperature: data.main.temp,
                city: data.name,
                country: data.sys.country,
                humidity: data.main.humidity,
                description: data.weather[0].description,
                error: ""
            });
        }else{
            this.setState({
                temperature: undefined,
                city: undefined,
                country: undefined,
                humidity: undefined,
                description: undefined,
                error: "Please Enter Values"
            })
        }
    }

    render() {
        return ( 
          <div>
              <div className= "wrapper">
                  <div className="main">
                      <div className = "container">
                          <div className ="row">
                              <div className="col title-container">
                              <Titles />
                              </div>
                              <div className="col form-container">
                              <Form getWeather={this.getWeather}/>
                             <Weather 
                                temperature={this.state.temperature}
                                city={this.state.city}
                                country ={this.state.country}
                                humidity = {this.state.humidity}
                                description = {this.state.description}
                                error = {this.state.error}/>
                              </div>
                              
                          </div>
                      </div>
                  </div>
              </div>

          </div>

        );
    }
}


export default App;