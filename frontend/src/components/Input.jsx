import React, { useState } from 'react'

const Input = ({type, placeholder, id, name, labelClass, inputClass, label, value, onChange, readOnly, icon}) => {
  const [isVisible, setIsVisible] = useState(false);

  
  const togglePasswordVisibility = () => {
    setIsVisible(prev => !prev);
  }

  const inputType = type === 'password' && isVisible ? 'text' : type;
  

  return (
    <div className='relative'>
      <label htmlFor={id} className={`flex items-center mb-2 w-fit ${labelClass}`}>{label} {icon}</label>
      <input 
        className={inputClass}
        type={inputType}
        placeholder={placeholder}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        readOnly={readOnly}/> 
      {(type === 'password' && !readOnly) && (
        <i 
          onClick={togglePasswordVisibility}
          className={`fa-solid ${isVisible ? 'fa-eye-slash' : 'fa-eye'} absolute right-2 bottom-2 cursor-pointer`}></i>
      )}
    </div>
  )
}

export default Input