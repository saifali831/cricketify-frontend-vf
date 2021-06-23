import React from 'react'

export default function SearchForm(props) {
   const {search} = props
    return (
        <div className="post-form-container">
        <input 
        name="query"
        type="text" 
        placeholder="Search posts..."
        className="post-form-group"
        value={search.query}
        onChange={props.handleSearch}
        />
        <div className="filters">
            <p>Filter By:
                <label>
                <input
              type="radio"
              value="keyword"
              checked={search.selectedOption==="keyword"}
              onChange={props.handleRadioChange}
               />
                Key Words
                </label>
                <label>
                <input
              type="radio"
              value="username"
              checked={search.selectedOption==="username"}
              onChange={props.handleRadioChange}
               />
                User Name
                </label>
                <label>
                <input
              type="radio"
              value="all"
              checked={search.selectedOption==="all"}
              onChange={props.handleRadioChange}
               />
                All
                </label>
            </p>
        </div>
        <button onClick={()=>{props.getSearch()}}>Search</button>
    </div>
    )
}
