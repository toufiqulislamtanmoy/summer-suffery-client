
const InstractorRow = ({instractor}) => {
    const {email,name,photo} = instractor;
    return (
        <tr>
            <td>
                <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                        <img src={photo} alt="Not Found" />
                    </div>
                </div>
            </td>
            <td>
                {name}

            </td>
            <td>{email}</td>

        </tr>
    );
};

export default InstractorRow;