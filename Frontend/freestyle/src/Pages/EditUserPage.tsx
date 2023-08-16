import { FormEvent, useEffect, useState } from "react";
import StyledInput from "../Components/StyledInput";
import Title from "../Components/Title";
import { Address, User } from "../Services/Interfaces";

function EditUserPage() {

    const [user, setUser] = useState<User>({ firstname: '', lastname: '', email: '', phone: '', password: '' });
    const [address, setAddress] = useState<Address>({ city: '', street: '' })

    function handleEdit(e: FormEvent) {
        e.preventDefault();
        console.log(user);
    }

    useEffect(() => {
        setUser({ ...user, address })
    }, [address])
    return (
        <>
            <Title title='Edit Account' />
            <div className="container mb-5">
                <div className="text-center">
                    <img src="https://brsc.sa.edu.au/wp-content/uploads/2018/09/placeholder-profile-sq.jpg" alt="UserImage" className="accountPic p-3 rounded-circle" />
                </div>
                <form className="mt-5">
                    <div className="row">
                        <div className="col-2"></div>
                        <div className="col">
                            <StyledInput inputParam="firstname" placeholder="First Name" setValueFunc={setUser} type="text" />
                        </div>
                        <div className="col">
                            <StyledInput inputParam="lastname" placeholder="Last Name" setValueFunc={setUser} type="text" />
                        </div>
                        <div className="col-2"></div>
                    </div>
                    <div className="row">
                        <div className="col-2"></div>
                        <div className="col">
                            <StyledInput inputParam="phone" placeholder="Phone" setValueFunc={setUser} type="text" />
                        </div>
                        <div className="col">
                            <StyledInput inputParam="email" placeholder="Email" setValueFunc={setUser} type="text" />
                        </div>
                        <div className="col-2"></div>
                    </div>
                    <div className="row">
                        <div className="col-2"></div>
                        <div className="col">
                            <StyledInput inputParam="password" placeholder="Password" setValueFunc={setUser} type="password" />
                        </div>
                        <div className="col">
                            <StyledInput inputParam="city" placeholder="City" setValueFunc={setAddress} type="text" />
                        </div>
                        <div className="col-2"></div>
                    </div>
                    <div className="row">
                        <div className="col-2"></div>
                        <div className="col">
                            <StyledInput inputParam="street" placeholder="Street" setValueFunc={setAddress} type="text" />
                        </div>
                        <div className="col">
                            <StyledInput inputParam="housenum" placeholder="Houser Number" setValueFunc={setAddress} type="number" />
                        </div>
                        <div className="col-2"></div>
                    </div>
                    <div className="w-100 text-center">
                        <button onClick={handleEdit} className="btn btn-dark">Update</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default EditUserPage;