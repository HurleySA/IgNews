import { signIn, useSession } from "next-auth/react"
import styles from "./styles.module.scss"
interface SubscribeButtonProps{
    priceId: String,
}
export function SubscribeButton({priceId} : SubscribeButtonProps){
    const {data: session} = useSession();

    const handleSubscribe = () => {
        if(!session){
            signIn('github');
            return;
        }

    }
    return(
        <button type="button" className={styles.subscribeButton} onClick={handleSubscribe}>
            Subscribe Now
        </button>
    )
}