//import frown from "../frown.webp"

const Card = (props) => {

    const name = props.name;
    const hobby = props.hobby;
    const age = props.age;
    const favColour = props.favColour;
    const pic = props.pic;
    const isActive = props.isActive;

    // if(isActive){
    //     //if true do this

        return(
            <div className="card">

                {/* <h6>{isActive && "Available"}</h6> */}
    
                <img className="card-image" src={pic} alt="" width="200px"/>
    
                {isActive ? <h5>Available</h5> : <h5>Unavailable</h5>}
                <h1>{name}, {age}</h1>
                <p>Hobby: {hobby}</p>
                <p>Colour: {favColour}</p>
    
            </div>
        );


    // } else{
    //     //if false do this

    //     return(
    //         <div className="card">

    //             <img src={frown} alt="" width="200px"/>
    //             <h1>NO NAME</h1>

    //         </div>

    //     );

    // }



    
};

export default Card;