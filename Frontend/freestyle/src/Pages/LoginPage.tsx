import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { setToken } from '../auth/TokenManager';
import { isEmailValid } from '../Services/Validations';
import Error from '../Components/Error';
import { login } from '../Services/ApiService';

function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setError] = useState<string[]>([]);
    const [serverError, setServerError] = useState('');


    const navigate = useNavigate();


    //Validate Login Form
    function validate(): boolean {
        const errArray: Array<string> = [];
        isEmailValid(email) ?
            errArray[0] = 'Email is not valid' :
            errArray[0] = ''

        setError(errArray)

        if (errArray.find(err => err !== '') !== undefined)//Find if there is a validation error
            return false;

        return true;
    }

    //Handle Login button
    async function handleClick(e: FormEvent) {
        e.preventDefault();
        if (!validate()) {
            return;
        }
        //api request
        await login({ email, password }).then((user) => {
            setToken(user.token)
            delete user.token;
            // isLoggedIn?.setIsLoggedIn(true);
            // userDetails?.setUserDetails(user.userDetails);

            navigate('/');

        }).catch((err) => {

            if (err) {
                setServerError(err);
                return;
            }
        })
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row justify-content-center mt-3">
                    <div className="col-sm-6 col-md-4 mt-5">
                        <div className="text-center mt-5">

                            <h1>Login</h1>
                        </div>
                        <form>
                            <div className="form-group mb-3">
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    value={email}
                                    className="form-control"
                                    id="email"
                                    placeholder="Email"
                                    onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <Error errorText={errors[0]} />

                            <div className="form-group mb-3">
                                <label htmlFor="password">Password:</label>
                                <input
                                    type="password"
                                    value={password}
                                    className="form-control"
                                    id="password"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <Error errorText={errors[1]} />
                            <div className="d-grid gap-2 mt-4">
                                <button onClick={handleClick} className="btn btn-dark">Login</button>
                            </div>
                            <div className="text-center">
                                <Error errorText={serverError} />
                            </div>
                        </form>
                    </div>
                </div >
            </div >
        </>
    );
}

export default LoginPage;