import { useState, FormEvent, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { setToken } from '../auth/TokenManager';
import { isEmailValid } from '../Services/Validations';
import Error from '../Components/Error';
import { login } from '../Services/ApiService';
import { UserContext } from '../App';
import StyledInput from '../Components/StyledInput';
import { LoginUser } from '../Services/Interfaces';

function LoginPage() {

    const [user, setUser] = useState<LoginUser>({ email: '' });
    const [errors, setError] = useState<string[]>([]);
    const [serverError, setServerError] = useState('');
    const [isForgotPassword, setForgotPassword] = useState(false);

    const isLoggedIn = useContext(UserContext);
    const userDetails = useContext(UserContext);

    const navigate = useNavigate();


    //Validate Login Form
    function validate(): boolean {
        const errArray: Array<string> = [];
        isEmailValid(user?.email) ?
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
        await login(user).then((user) => {
            setToken(user.token)
            delete user.token;
            isLoggedIn?.setIsLoggedIn(true);
            userDetails?.setUserDetails(user.userDetails);

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
            <div className="container-fluid mb-5">
                <div className="row justify-content-center">
                    <div className="col-sm-6 col-md-4 mt-5">
                        {
                            !isForgotPassword ?
                                <>
                                    <div className="text-center mt-5">

                                        <h1>Login</h1>
                                    </div>
                                    <form className='mt-4'>
                                        <StyledInput
                                            type='text'
                                            placeholder='Email'
                                            setValueFunc={setUser}
                                            inputParam='email'
                                            errorText={errors[0]} />

                                        <StyledInput
                                            type='password'
                                            placeholder='Password'
                                            setValueFunc={setUser}
                                            inputParam='password'
                                            errorText={errors[1]} />

                                        <button onClick={() => setForgotPassword(true)} className='btn border-0 p-0 text-dark '><u>Forgot password?</u></button>

                                        <div className="d-grid gap-2 mt-2">
                                            <button onClick={handleClick} className="btn btn-dark">Login</button>
                                        </div>
                                        <div className="text-center">

                                            <Error errorText={serverError} />
                                        </div>
                                    </form>
                                </>
                                :
                                <>
                                    <div className="text-center mt-5">

                                        <h1>Account Recovery</h1>
                                        <span>Recover you FreeStyle Account</span>
                                    </div>
                                    <div className='mt-3'>
                                        <StyledInput
                                            type='text'
                                            placeholder='Email'
                                            setValueFunc={setUser}
                                            inputParam='email'
                                            errorText={errors[0]} />
                                    </div>

                                    <div className='d-flex justify-content-between'>

                                        <Link to={'/contact-us'} className='text-dark align-self-center'>Forgot Email?</Link>
                                        <button className="btn btn-dark px-4">Next</button>
                                    </div>
                                </>
                        }
                    </div>
                </div >
            </div >
        </>
    );
}

export default LoginPage;