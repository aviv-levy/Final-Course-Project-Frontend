interface Props {
    title: String;
    description?: String;
}

function Title({ title, description }: Props) {
    return (
        <div className="contianer-fluid mx-3 my-4">
            <h1>{title}</h1>
            <h4>{description}</h4>
            <hr />
        </div>
    );
}

export default Title;