import { FormEvent, useState } from "react";
import StyledInput from "../Components/StyledInput";
import { User } from "../Services/Interfaces";
import { isRegisterUserValid } from "../Services/Validations";
import { addNewUser } from "../Services/ApiService";
import Error from "../Components/Error";
import { useNavigate } from "react-router-dom";

function RegisterPage() {

    const [user, setUser] = useState<User>({} as User);
    const [errors, setError] = useState<string[]>([]);
    const [serverError, setServerError] = useState('');

    const navigate = useNavigate();

    //Handle Register button
    async function handleClick(e: FormEvent) {
        e.preventDefault();
        if (!isRegisterUserValid(user, setError))
            return;

        //api request
        await addNewUser(user).then(() => {
            //created React Alert
            navigate('/login');

        }).catch((err) => {
            if (err) {
                setServerError(err);
                return;
            }
        })

    }



    return (
        <>
            <div className="container-fluid mb-5">
                <div className="row justify-content-center">
                    <div className="col-sm-6 col-md-4 mt-2">
                        <div className="text-center mt-5">

                            <h1>Register</h1>
                        </div>
                        <form className='mt-4'>
                            <StyledInput
                                type="text"
                                placeholder="First Name"
                                setValueFunc={setUser}
                                inputParam="firstname"
                                errorText={errors[0]} />

                            <StyledInput
                                type="text"
                                placeholder="Last Name"
                                setValueFunc={setUser}
                                inputParam="lastname"
                                errorText={errors[1]} />

                            <StyledInput
                                type="text"
                                placeholder="Email"
                                setValueFunc={setUser}
                                inputParam="email"
                                errorText={errors[2]} />

                            <StyledInput
                                type="text"
                                placeholder="Phone"
                                setValueFunc={setUser}
                                inputParam="phone"
                                errorText={errors[3]} />

                            <StyledInput
                                type="password"
                                placeholder="Password"
                                setValueFunc={setUser}
                                inputParam="password"
                                errorText={errors[4]} />

                            <div className="form-group ">
                                <input
                                    id="biz"
                                    type='checkbox'
                                    checked={user.biz}
                                    onChange={() => setUser({ ...user, biz: !user.biz })} />
                                <label htmlFor="biz" className="mx-2">Signup as business </label>
                            </div>

                            <div className="d-grid gap-2 mt-4">
                                <button onClick={handleClick} className="btn btn-dark">Register</button>
                                <Error errorText={serverError} />
                            </div>
                            <div className="text-center">
                            </div>
                        </form>
                    </div>
                </div >
            </div >
        </>
    );
}

export default RegisterPage;