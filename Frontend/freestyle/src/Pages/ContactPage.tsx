import { FormEvent, useContext, useState } from "react";
import ContactPic from "../Images/contactUs.jpg";
import StyledInput from "../Components/StyledInput";
import { ContactUs } from "../Services/Interfaces";
import { sendSupportMail } from "../Services/ApiService";
import { toast } from "react-toastify";
import { supportMailValidation } from "../Services/Validations";
import { LoadingContext } from "../App";


function ContactPage() {

    const [contactMessage, setContactMessage] = useState<ContactUs>({} as ContactUs);
    const [errors, setError] = useState<string[]>([]);

    const loading = useContext(LoadingContext);

    async function handleSend(e: FormEvent) {
        e.preventDefault();
        if (!supportMailValidation(contactMessage, setError)) {
            return;
        }
        //api request
        loading?.setIsLoading(true);
        await sendSupportMail(contactMessage).then(() => {
            loading?.setIsLoading(false);
            toast.success('Your message has been sent to us');
            setContactMessage({} as ContactUs)
        }).catch((err) => {

            if (err) {
                toast.error('An error accoured while sending')
                return;
            }
        })
    }

    return (
        <>
            <div className="container my-5">
                <div className="text-center mt-5">
                    <h1 className=" mt-5">Contact Us</h1>
                    <div className="m-auto">
                        <p>
                            Provide better customer service, or all of the above! <br></br>
                            Here are some ways to contact us. <br></br>
                        </p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className="text-center">
                            <img src={ContactPic} alt="contact" className="img-thumbnail border-0" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <h2>Leave us a message</h2>
                        </div>
                        <form>

                            <StyledInput
                                inputParam="name"
                                placeholder="Name"
                                setValueFunc={setContactMessage}
                                type="text"
                                errorText={errors[0]}
                            />
                            <StyledInput
                                inputParam="email"
                                placeholder="Email"
                                setValueFunc={setContactMessage}
                                type="email"
                                errorText={errors[1]}
                            />
                            <StyledInput
                                inputParam="phone"
                                placeholder="Phone"
                                setValueFunc={setContactMessage}
                                type="text"
                                errorText={errors[2]}
                            />

                            <StyledInput
                                inputParam="message"
                                placeholder="Message"
                                setValueFunc={setContactMessage}
                                type="textArea"
                                errorText={errors[3]}
                            />

                            <div className="d-grid gap-2 ">
                                <button onClick={handleSend} className="btn btn-dark fs-6">Send</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


        </>
    );
}

export default ContactPage;