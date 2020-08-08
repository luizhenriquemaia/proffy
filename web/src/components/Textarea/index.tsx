import React, { TextareaHTMLAttributes } from 'react'

import './style.css'

/* o Textarea pode receber todas as propriedades de um Textarea normal + name e label */
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: string
    label: string

}


const Textarea: React.FC<TextareaProps> = ({ label, name, ...rest }) => {
    return (
        <div className="textarea-block">
            <label htmlFor={name}>{label}</label>
            <textarea name={name} id={name} {...rest} />
        </div>
    )
}


export default Textarea