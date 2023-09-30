import { FormEvent, useEffect, useState } from "react";
import '../CSS/pictures.css'
import StyledInput from "../Components/StyledInput";
import Title from "../Components/Title";
import { Address, User } from "../Services/Interfaces";
import { getUserDetails, updateAccount, updateProfileImg } from "../Services/ApiService";
import { isUpdateUserValid } from "../Services/Validations";
import CropperBox from "../Components/CropperBox";
import { fileToBase64 } from "../Utils/fileToString";
import { toast } from "react-toastify";

function EditUserPage() {

    const [user, setUser] = useState<User>({} as User);
    const [address, setAddress] = useState<Address>({} as Address);
    const [errors, setError] = useState<string[]>([]);

    const [showCropper, setShowCropper] = useState(false);
    const [uploadedImg, setUploadedImg] = useState('');

    const [isLoading, setIsLoading] = useState(true);

    async function fileRecieved(file: File) {
        const basedFile = await fileToBase64(file);
        setUploadedImg(basedFile)
        setShowCropper(true);
    }

    //Handle update click function
    async function handleEdit(e: FormEvent) {
        e.preventDefault();

        if (!isUpdateUserValid(user, setError))
            return;

        //api request
        await updateAccount(user)
            .then(() => {
                toast.success('Account has been updated');
            })
            .catch(err => {
                if (err)
                    toast.error('An error accourd');
            })
    }

    async function updateImgProfile() {
        await updateProfileImg(uploadedImg).then(() => {
            setUser({ ...user, img: uploadedImg })
            toast.success('Image has been updated');
        })
            .catch(err => {
                if (err)
                    toast.error('An error accourd');
            })
    }

    //Set address in user state when changed
    useEffect(() => {
        setUser({ ...user, address })
        // eslint-disable-next-line
    }, [address])

    //Get user details and put it in inputs
    useEffect(() => {
        const getDetails = async () => {
            const user = await getUserDetails();
            setUser(user)
            if (user.address)
                setAddress(user.address)

            setIsLoading(false)
        }

        getDetails().catch((err) => {
            if (err) {
                return;
            }
        });
        // eslint-disable-next-line
    }, [])

    return (

        <>
            {
                !isLoading &&
                <div>
                    <Title title='Edit Account' />
                    {
                        showCropper ?
                            <CropperBox uploadingImage={uploadedImg} setShowCropper={setShowCropper} setCroppedImage={setUploadedImg} updateImgServer={updateImgProfile} />
                            :
                            <div className="container mb-5">
                                <div className="d-flex justify-content-center">
                                    <div className="profile-pic">
                                        <label className="-label" htmlFor="file">
                                            <span className="glyphicon glyphicon-camera"></span>
                                            <span>Change Image</span>
                                        </label>
                                        <input className="d-none" id="file" type="file" accept="image/*" onChange={(e: any) => fileRecieved(e.target.files[0])} />
                                        <img src={user.img} alt="UserImage" className="accountPic" />
                                    </div>
                                </div>

                                <form className="mt-5">
                                    <div className="row">
                                        <div className="col-2"></div>
                                        <div className="col">
                                            <StyledInput inputParam="firstname" inputValue={user.firstname} placeholder="First Name" setValueFunc={setUser} type="text" errorText={errors[0]} />
                                        </div>
                                        <div className="col">
                                            <StyledInput inputParam="lastname" inputValue={user.lastname} placeholder="Last Name" setValueFunc={setUser} type="text" errorText={errors[1]} />
                                        </div>
                                        <div className="col-2"></div>
                                    </div>
                                    <div className="row">
                                        <div className="col-2"></div>
                                        <div className="col">
                                            <StyledInput inputParam="phone" inputValue={user.phone} placeholder="Phone" setValueFunc={setUser} type="text" errorText={errors[2]} />
                                        </div>
                                        <div className="col">
                                            <StyledInput inputParam="email" inputValue={user.email} placeholder="Email" setValueFunc={setUser} type="text" errorText={errors[3]} />
                                        </div>
                                        <div className="col-2"></div>
                                    </div>
                                    <div className="row">
                                        <div className="col-2"></div>
                                        <div className="col">
                                            <StyledInput inputParam="password" placeholder="New Password" setValueFunc={setUser} type="password" errorText={errors[4]} />
                                        </div>
                                        <div className="col">
                                            <StyledInput inputParam="city" inputValue={user.address?.city} placeholder="City" setValueFunc={setAddress} type="text" errorText={errors[5]} />
                                        </div>
                                        <div className="col-2"></div>
                                    </div>
                                    <div className="row">
                                        <div className="col-2"></div>
                                        <div className="col">
                                            <StyledInput inputParam="street" inputValue={user.address?.street} placeholder="Street" setValueFunc={setAddress} type="text" errorText={errors[6]} />
                                        </div>
                                        <div className="col">
                                            <StyledInput inputParam="housenum" inputValue={user.address?.housenum} placeholder="Houser Number" setValueFunc={setAddress} type="number" errorText={errors[7]} />
                                        </div>
                                        <div className="col-2"></div>
                                    </div>
                                    <div className="w-100 text-center">
                                        <button onClick={handleEdit} className="btn btn-dark">Update</button>
                                    </div>
                                </form>
                            </div>
                    }
                </div>
            }
        </>
    );
}

export default EditUserPage;