import { useState, useEffect } from 'react'
import countriesService from './services/countries'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

const CountryList = ({countries}) => {
	const [countryToShow, setCountryToShow] = useState(null)
	console.log('length', countries.length)

	useEffect(() => {
		setCountryToShow(null)
	}, [countries])

	const handleShowCountryDetailOf = (countryCommonName) => {
		const countryObject = countries.find(c => c.name.common == countryCommonName)
		setCountryToShow(countryObject)
	}

	if (countries.length <= 10 && countries.length > 1) {
		return (
			<div>
				<ul>
				{
					countries.map(country => 
						<CountryItem key={country.name.common} country={country} handleShowCountryDetail={() => handleShowCountryDetailOf(country.name.common)}/>
					)
				}
				</ul>
				<CountryDetail country={countryToShow}/>
			</div>
		)
	}
	else if (countries.length == 1) {
		console.log('detail', countries[0])
		return (
			<CountryDetail country={countries[0]}/>
		)
	}
	else {
		return 'Too many matches, specify another filter'
	}
}

const CountryItem = ({country, handleShowCountryDetail}) => {
	return (
		<li>{country.name.common} <button onClick={handleShowCountryDetail}>show</button></li>
	)
}

const CountryDetail = ({country}) => {
	if (country) {
		return (
			<div>
				<h1>{country.name.common}</h1>
				<div>capital: {country.capital[0]}</div>
				<div>area: {country.area}</div>
				<h2>languages</h2>
				<ul>
					{
						Object.entries(country.languages).map(([key, value]) =>
							<li key={key}>{value}</li>
						)
					}
				</ul>
				<div>
					<img src={country.flags.png}></img>
				</div>
			</div>
		)
	}
	return null
}

const App = () => {
	const [countries, setCountries] = useState([])
	const [filteredCountries, setFilteredCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState('')

	useEffect(() => {
		console.log('effect')
		countriesService.getAll()
			.then(countriesData => {
				setCountries(countriesData)
			})
	}, [])

	const handlecountryFilterChange = (event) => {
		setCountryFilter(event.target.value)
		setFilteredCountries(countries.filter(c => c.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
	}

	// console.log("countries", countries)
	console.log("filteredCountries", filteredCountries)

  return (
    <>
			<div>
				find countries <input onChange={handlecountryFilterChange} value={countryFilter}/>
			</div>
			<CountryList countries={filteredCountries}/>
    </>
  )
}

export default App