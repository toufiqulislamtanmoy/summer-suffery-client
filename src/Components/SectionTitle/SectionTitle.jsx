const SectionTitle = ({ title }) => {
    return (
        <div className="text-center my-10">
            <div className="divider"></div> 
            <h2 className="text-5xl" style={{ fontFamily: 'Russo One, sans-serif' }}>{title}</h2>
            <div className="divider"></div> 
        </div>
    );
};

export default SectionTitle;