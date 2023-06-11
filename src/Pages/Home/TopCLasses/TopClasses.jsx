import { useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import ClassesCard from "../../Classes/ClassesCard/ClassesCard";

const TopClasses = () => {
    
    const [popularClass,setPopularCLasses] =useState([]);
    useEffect(()=>{
        fetch('https://summer-suffry-server-6jyo24tbl-toufiqulislamtanmoy.vercel.app/popularClass').then(res =>res.json()).then(data => {
            setPopularCLasses(data);
            console.log(data)
        })
    },[])

    return (
        <div className="my-20">
            <SectionTitle title="Popular Classes"/>
            <div className="my-20 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2  gap-5 lg:px-10 px-5 lg:max-w-[80vw] mx-auto">
                {
                    popularClass.slice(0,6).map(pclass => <ClassesCard key={pclass._id} approvedClasses={pclass}/>)
                }
            </div>
        </div>
    );
};

export default TopClasses;