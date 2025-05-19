import React from 'react'

const Search = ({ placeholder, data, setData }) => {
  const searchFunction = (e) => {
    

    const value = e.target.value.toLowerCase();
    const filteredData = data.filter(item => {
      const name = `${item.firstname} ${item.lastname}`;
      
      return name.toLowerCase().includes(value) || item.id.toString().includes(value)});
    setData(filteredData);
  }
  return (
    <input 
      className='w-48 md:w-96 py-2 pl-2 pr-10 outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500'
      type="text" 
      placeholder={placeholder}
      onChange={searchFunction}/>
  )
}

export default Search