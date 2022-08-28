import styles from "../styles/Nav.module.scss"
import { User, css } from '@nextui-org/react';
import Link from "next/link"
import { useRouter } from "next/router";

const Nav = () => {
    const router = useRouter();
    return (
    <nav className={styles.Nav}>
        <div className={styles.Brand}>
            <Link href="/projects">
                <a>Brandname</a>
            </Link>
        </div>
        <div className={router.pathname == "/projects" || router.pathname.slice(0, 10) == "/projects/" ? `${styles.Link} ${styles.active}` : `${styles.Link}`}>
            <Link href="/projects">
                <a>Projects</a>
            </Link>
        </div>
        <div className={router.pathname == "/users" ? `${styles.Link} ${styles.active}` : `${styles.Link}`}>
            <Link href="/users">
                <a>Users</a>
            </Link>
        </div>
        <div className={router.pathname == "/about" ? `${styles.Link} ${styles.active}` : `${styles.Link}`}>
            <Link href="/about">
                <a>About</a>
            </Link>
        </div>
        <div className={styles.MyProfile}>
            <Link href="/users/userDetail">
                <User
                css={{
                    'span': {
                        color: "#FFFFFF",
                    }
                }}
                bordered
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                name="Username"
                />
            </Link>
            
        </div>
    </nav>
  )
}

export default Nav