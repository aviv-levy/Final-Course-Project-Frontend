import '../CSS/inputs.css'
import { User } from '../Services/Interfaces';
import Error from './Error';

interface Props {
    type: "text" | "password" | "email" | "number";
    placeholder: string;
    inputParam: string;
    setValueFunc: Function;
    errorText?: string;
}

function StyledInput({ type, placeholder, setValueFunc, inputParam, errorText }: Props) {

    return (
        <div className="form-group input-block mb-4">
            <input
                type={type}
                onChange={(e) => setValueFunc((prevState: User) => ({ ...prevState, [inputParam]: type === 'number' ? +e.target.value : e.target.value }))}
                required />
            <span className="placeholderr mx-2">{placeholder}</span>
            <Error errorText={errorText} />
        </div>
    );
}

export default StyledInput;