
import addConfetti from '../components/AddConfetti';

export default function CartPage() {
    return(
        <div>
            <h1>Items Currently in Your Cart</h1>
           

            <button onClick={addConfetti}>Confetti Time!</button>
        </div>
    )
}