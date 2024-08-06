
import Alert from "../components/eventcomponent/Alert"
import addConfetti from '../components/eventcomponent/AddConfetti';

export default function AboutPage() {
    return(
        <div>
            <h1>THIS IS THE ABOUT PAGE</h1>
            <p>Info about us here</p>

            <button onClick={addConfetti}>Confetti Time!</button>
        </div>
    )
}