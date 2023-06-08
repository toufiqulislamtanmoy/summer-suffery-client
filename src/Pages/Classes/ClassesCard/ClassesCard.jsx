import ButtonPrivet from "../../../Components/ButtonPrivet/ButtonPrivet";


const ClassesCard = ({ approvedClasses }) => {
    const { price, seats, instructor, name, image } = approvedClasses;
    console.log(approvedClasses)
    return (
        <div className={`card w-96 ${seats === 0 ? 'bg-red-500 text-white' : 'bg-base-100'} shadow-xl`}>
            <figure><img src={image} alt="not found" /></figure>
            <div className="card-body">
                <h2 className="card-title">
                    {name}
                    <div className="badge badge-secondary">{
                        seats === 0 ? "Enroll Expire" : "Available"
                    }</div>
                </h2>
                <p><span>Instructor :</span>{instructor}</p>
                <p><span>Remaining seats :</span>{seats}</p>
                <p><span>Price :</span>{price} TK</p>
                <div className="card-actions justify-end">
                    <ButtonPrivet />
                </div>
            </div>
        </div>
    );
};

export default ClassesCard;