import styles from './Invite.module.css'
type Props = {
    admin: boolean
}

export default function Invite({admin}: Props) {
    return <p className={styles.invite}>Congratulations, you&apos;re {admin ? 'getting married' : 'invited to the wedding'}!</p>
}