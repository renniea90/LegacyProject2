
import Alert from "../components/eventcomponent/Alert"
import addConfetti from '../components/eventcomponent/AddConfetti';

export default function CartPage() {
    return(
        <div>
            <h1>Items Currently in Your Cart</h1>
           

            <button onClick={addConfetti}>Confetti Time!</button>
        </div>
    )
}