interface Props {
    errorText?: string;
}

function Error({ errorText }: Props) {
    return (
        <div className="text-danger">
            {errorText}
        </div>
    );
}

export default Error;