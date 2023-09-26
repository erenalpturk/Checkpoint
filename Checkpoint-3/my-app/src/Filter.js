import { useState } from 'react';
import './App.css';
import { useParams } from 'react-router-dom';

function Filter() {

    let [year, setYear] = useState("-")
    let [mile, setMile] = useState("-")

    return (
        <div className="App">
            HELLO filt
            <input required onChange={(e) => setYear(e.target.value)} placeholder='year'></input>
            <input required onChange={(e) => setMile(e.target.value)} placeholder='mile'></input>

            <button onClick={() => window.location.href = '/'}> home PAGE</button>
            <button onClick={() => window.location.href = `/result/${year.split('-').join('0')}/${mile.split('-').join('99999999')}`}>SEARCH</button>
        </div>
    )
}

export default Filter;
