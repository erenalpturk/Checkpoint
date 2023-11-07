
import './App.css';
import { useEffect, useState } from "react";
import axios from 'axios';


function App() {

    const [carName, setCarName] = useState('')
    const [fullName, setFullName] = useState('')
    const [allPersons, setAllPersons] = useState([])
    const [allCars, setAllCars] = useState([])
    const [carId, setCarId] = useState([])
    const [ownerId, setOwnerId] = useState([])
    const [allOwners, setAllOwners] = useState([])


    const createCar = async () => {
        axios
            .post('http://localhost:3050/createCar', { carName })
            .then((response) => {
                console.log(response.data)
                console.log('car created', response)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const deleteCar = async () => {
        axios
            .post('http://localhost:3050/deleteCar', { carName })
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const createPerson = async () => {
        axios
            .post('http://localhost:3050/createPerson', { fullName })
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const deletePerson = async () => {
        axios
            .post('http://localhost:3050/deletePerson', { fullName })
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const getAllCars = async () => {
        axios.get('http://localhost:3050/getAllCars')
            .then(response => {
                // Handle the successful response here
                const cars = response.data; // Assuming the API returns an array of player objects
                console.log(cars);
                setAllCars(cars);
            })
            .catch(error => {
                // Handle any errors that occurred during the request
                console.error('Error fetching player data:', error);
            });
    }
    const sellCars = async () => {
        axios
            .post('http://localhost:3050/sellCars', { ownerId, carId })
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const getAllOwners = async () => {
        axios.get('http://localhost:3050/getAllOwners')
            .then(response => {
                // Handle the successful response here
                const cars = response.data; // Assuming the API returns an array of player objects
                console.log(cars);
                setAllOwners(cars);
            })
            .catch(error => {
                // Handle any errors that occurred during the request
                console.error('Error fetching player data:', error);
            });
    }



    return (
        <div className="App">
            <header className="App-header">
                <div>
                    <h1>CAR</h1>
                    <input onChange={(e) => { setCarName(e.target.value) }} type="text" placeholder='carname' name="" id="" />
                    <button onClick={() => createCar()}>create</button>
                    <button onClick={() => deleteCar()}>DELETE</button>
                </div>
                <div>
                    <h1>PERSON</h1>
                    <input onChange={(e) => { setFullName(e.target.value) }} type="text" placeholder='carname' name="" id="" />
                    <button onClick={() => createPerson()}>create</button>
                    <button onClick={() => deletePerson()}>DELETE</button>
                </div>
                <div>
                    <h1>SELL CAR</h1>
                    <input onChange={(e) => { setCarId(e.target.value) }} type="text" placeholder='carid' name="" id="" />
                    <input onChange={(e) => { setOwnerId(e.target.value) }} type="text" placeholder='personid' name="" id="" />
                    <button onClick={() => { sellCars() }}>SELL</button>
                </div>
                <div>
                    <button onClick={() => { getAllCars() }}>GET ALL CAR</button>
                    <div>
                    {allCars.map((cars) => {
                        return (
                            <div>
                                <h4>{cars.id}-{cars.carname}</h4>
                            </div>
                        )
                    })}
                    </div>
                </div>
                <div>
                    <button onClick={() => { getAllOwners() }}>GET ALL CAR OWNERS</button>
                    <div>
                    {allOwners.map((cars) => {
                        return (
                            <div>
                                <h4>{cars.fullname}-{cars.carname}</h4>
                            </div>
                        )
                    })}
                    </div>
                </div>
            </header>
        </div>
    );
}

export default App;
