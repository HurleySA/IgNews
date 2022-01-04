import { FaGithub} from 'react-icons/fa'
import { FiX} from 'react-icons/fi'
import styles from './styles.module.scss'
export function SignInButton(){
    const login = true;
    return login ? (
        <button type="button" className={styles.signInButton}>
            <FaGithub color='#DE9D18'/>
            Sign in with Github
            <FiX color="#737380" className={styles.closeIcon} />
        </button>
    ) : (
        <button type="button" className={styles.signInButton}>
            <FaGithub color='#04D361'/>
            Matheus Eduardo
            <FiX color="#737380" className={styles.closeIcon} />
        </button>
    )
}