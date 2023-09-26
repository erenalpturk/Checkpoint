import { useState } from 'react';
import './App.css';

function Homepage() {

    let [model, setModel] = useState("")
    let [year, setYear] = useState("")
    let [mile, setMile] = useState("")

    let carsLS = JSON.parse(localStorage.getItem("cars")) || []
    let cars = []

    let addFunc = () => {
        if (model != "" && year != "" && mile != "") {
            cars.push(
                {
                    model: model,
                    year: year,
                    mile: mile,
                }
            )
            localStorage.setItem("cars", JSON.stringify(cars))
            alert("saved")
        } else {
            alert("fill blank")
        }
        
    }

    if (cars != null) {
        cars = [...carsLS]
    }

    return (
        <div className="App">
            hellohome
            <input required onChange={(e) => setModel(e.target.value)} placeholder='model'></input>
            <input required onChange={(e) => setYear(e.target.value)} placeholder='year'></input>
            <input required onChange={(e) => setMile(e.target.value)} placeholder='mile'></input>
            <button onClick={addFunc}>ADD</button>
            <button onClick={()=>window.location.href='/filter'}> FİLTER PAGE</button>
        </div>
    );
}


export default Homepage;
