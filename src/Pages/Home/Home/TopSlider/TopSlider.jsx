import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import img1 from "../../../../assets/Banner/1.png"
import img4 from "../../../../assets/Banner/4.png"
import img5 from "../../../../assets/Banner/5.png"

const TopSlider = () => {
    return (

       <div className="w-full max-w-full mx-auto">
         <AwesomeSlider className='flex lg:h-[100vh]'>
            <div  data-src={img4} />
            <div  data-src={img1} />
            <div  data-src={img5} />
        </AwesomeSlider>
        
       </div>

    );
};

export default TopSlider;