import { useState } from 'react';
import './App.css';
import { useParams } from 'react-router-dom';

function Result() {

    let { id, id2 } = useParams()
    let carList = JSON.parse(localStorage.getItem("cars")) || []
    let filteredList = [];
    console.log("id2",id2)

    carList.map((e) => {
        if (e.year > Number(id) && e.mile < Number(id2)) {
            filteredList.push(e)
            console.log(e.mile)
        }
    })

    return (
        <div className="App">
            Result
            {filteredList.map((e, index)=>
            <ul key={index}>
                <li><b>{e.model}</b></li>
                <li>YEAR:{e.year}</li>
                <li>MİLE:{e.mile}</li>
            </ul>
            )}
            <button onClick={() => window.location.href = '/filter'}> FİLTER PAGE</button>
            <button onClick={() => window.location.href = '/'}> home PAGE</button>

        </div>
    );
}

export default Result;
