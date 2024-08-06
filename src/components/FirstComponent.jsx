const FirstComponent = () => {

    const name = "David McManus";
    const age = 31;
    const favFood = "Pizza";


    return(
        <div className="content">
            <h1>My name is {name}</h1>
            <h2>I am {age} years old</h2>
            <h3>I will be {age + 1} next year</h3>
            <p>My favourite food is {favFood}</p>
        </div>
    );

}

export default FirstComponent;