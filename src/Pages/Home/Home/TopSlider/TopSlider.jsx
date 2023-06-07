import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import img1 from "../../../../assets/Banner/1.png"
import img2 from "../../../../assets/Banner/2.png"
import img3 from "../../../../assets/Banner/3.png"

const TopSlider = () => {
    return (

       <div className="w-full max-w-full mx-auto">
         <AwesomeSlider className='flex lg:h-[760px]'>
            <div  data-src={img1} />
            <div  data-src={img2} />
            <div  data-src={img3} />
        </AwesomeSlider>
        
       </div>

    );
};

export default TopSlider;