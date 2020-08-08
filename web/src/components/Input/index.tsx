import React, { InputHTMLAttributes } from 'react'

import './style.css'

/* o input pode receber todas as propriedades de um input normal + name e label */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string
    label: string

}


const Input: React.FC<InputProps> = ({ label, name, ...rest }) => {
    return (
        <div className="input-block">
            <label htmlFor={name}>{label}</label>
            <input name={name} type="text" id={name} {...rest} />
        </div>
    )
}


export default Input