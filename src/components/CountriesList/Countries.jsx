import "./styles.css";
import '../../global.css'
import { useState } from 'react'
import axios from "axios";

//4- custom hook
import { useFetch } from "../../hooks/useFetch";
import { Loading } from "../Loading/Loading";

const urlBase = "http://localhost:3001/api/countries";

export function Countries() {
  //4- custom hook
  const { data: myCountries, loading, error, refetchData } = useFetch(urlBase)

  const [name, setName] = useState(''); 
  const [population, setPopulation] = useState('');
  const [flag, setFlag] = useState('');

  //2- Add countries
  const handleSubmit = async (e) => {
    e.preventDefault()

    const country = {
      name, 
      population,
      flag
    }

    try {
      const response = await axios.post(urlBase, country)

      if (response.status === 201) {
        console.log('Country added successfully!')
        refetchData();
      } else {
        console.error('Failed to add country')
      }

    } catch(error) {
      console.error("ERROR:", error);
    }

    //Reset states of input
    setName("")
    setPopulation("")
    setFlag("")
  }

  const deleteCountry = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/countries/${id}`
      );

      if (response.status === 200) {
        console.log('Country deleted successfully')
        refetchData(); //Delete Dynamic
      } 

    } catch(error) {
      console.error('Error deleting country ')
    }
  }

  return (
    <section>
      <header className="header-container">
        <h1>Countries of the World! &#x1F30E;</h1>
        <div className="add-country">
          <form
            autoComplete="off"
            onSubmit={handleSubmit}
            className="form-container"
          >
            <div>
              <label>
                Name:
                <input
                  className="input-text"
                  type="text"
                  value={name}
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                Population:
                <input
                  className="input-text"
                  type="text"
                  value={population}
                  name="population"
                  onChange={(e) => setPopulation(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                Flag:
                <input
                  className="input-text"
                  type="text"
                  value={flag}
                  name="flag"
                  onChange={(e) => setFlag(e.target.value)}
                />
              </label>
            </div>
            <div>
              {/* 7- state of loading in post */}
              {loading && (
                <input
                  className="button"
                  type="submit"
                  disabled
                  value="Please wait"
                />
              )}
              {!loading && (
                <input className="button" type="submit" value="Create" />
              )}
            </div>
          </form>
        </div>
      </header>

      <div className="container-card">
        {/* // 6 - Loading */}
        {loading && <Loading />}
        {error && (
          <div className="container-error">
            <h3>{error}</h3>
          </div>
        )}
        {!error && (
          <ul className="grid-container">
            {myCountries &&
              myCountries.map((country) => (
                <li key={country.id} className="grid-item">
                  <h3>{country.name} </h3>
                  <p>Population - {country.population} million </p>
                  <img src={country.flag} alt="" />
                  <button
                    onClick={() => deleteCountry(country.id)}
                    className="button-delete"
                  >
                    delete
                  </button>
                </li>
              ))}
          </ul>
        )}
      </div>
    </section>
  );
}