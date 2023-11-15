import { useState } from 'react';
import '../CSS/inputs.css'
import { User } from '../Services/Interfaces';
import Error from './Error';

interface Props {
    type: "text" | "password" | "email" | "number" | "radio" | 'textArea';
    inputValue?: string | number;
    placeholder: string;
    inputParam: string;
    setValueFunc: Function;
    id?: string;
    errorText?: string;
    checked?: boolean;
}

function StyledInput({ type, inputValue, placeholder, setValueFunc, inputParam, id, errorText, checked }: Props) {

    const [inputValueState, setInputValueState] = useState(inputValue);
    const [check,setCheck] = useState(checked)

    return (
        <>
            {
                type === 'radio' ?
                    <div>
                        <input
                            className='form-check-input border-dark-subtle'
                            type={type}
                            name={inputParam}
                            value={placeholder}
                            id={id}
                            onChange={(e) => setValueFunc((prevState: User) => ({ ...prevState, [inputParam]: e.target.value }))}
                        />
                        <label className="form-check-label me-2" htmlFor={id}>{placeholder}</label>
                    </div>

                    :
                    <>
                        {
                            type === 'textArea' ?
                                <div className="form-group input-block mb-3">
                                    <textarea placeholder='' rows={5} className='h-50'
                                        value={inputValueState || ''}
                                        onChange={(e) => {
                                            setInputValueState(e.target.value)
                                            setValueFunc((prevState: any) => ({ ...prevState, [inputParam]: e.target.value }))
                                        }}
                                        required></textarea>
                                    <span className="placeholderr mx-2">{placeholder}</span>
                                    <Error errorText={errorText} />
                                </div>
                                :
                                <div className="form-group input-block mb-3">
                                    <input
                                        type={type}
                                        value={inputValueState || ''}
                                        onChange={(e) => {
                                            setInputValueState(e.target.value)
                                            setValueFunc((prevState: User) => ({ ...prevState, [inputParam]: type === 'number' ? +e.target.value : e.target.value }))
                                        }}
                                        required />
                                    <span className="placeholderr mx-2">{placeholder}</span>
                                    <Error errorText={errorText} />
                                </div>
                        }
                    </>
            }
        </>
    );
}

export default StyledInput;