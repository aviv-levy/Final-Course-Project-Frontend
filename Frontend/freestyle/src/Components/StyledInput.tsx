import { useState } from 'react';
import '../CSS/inputs.css'
import { User } from '../Services/Interfaces';
import Error from './Error';

interface Props {
    type: "text" | "password" | "email" | "number" | "radio";
    inputValue?: string | number;
    placeholder: string;
    inputParam: string;
    setValueFunc: Function;
    id?: string;
    errorText?: string;
}

function StyledInput({ type, inputValue, placeholder, setValueFunc, inputParam, id, errorText }: Props) {

    const [inputValueState, setInputValueState] = useState(inputValue);

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
                    <div className="form-group input-block mb-4">
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
    );
}

export default StyledInput;