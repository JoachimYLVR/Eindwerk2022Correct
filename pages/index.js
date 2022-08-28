import Head from 'next/head'
import Image from 'next/image'
import styles from "../styles/Home.module.scss"
import { Button, Input, Spacer } from '@nextui-org/react';

export default function Home() {
  return (
    <div className={styles.App}>
      <div className={styles.loginLeft}></div>
      <div className={styles.loginRight}>
        <div className={styles.loginScreen}>
          <form>
            <div className={styles.loginBrand}>Brandname</div>
            <Spacer y={1} />
            <Input clearable bordered labelPlaceholder="Username" width="100%" />
            <Spacer y={2} />
            <Input clearable bordered labelPlaceholder="Password" width="100%"/>
            <Spacer y={1} />
            <div className="retrieve">Retrieve your password?</div>
            <Button className={styles.loginButton} shadow color="primary" auto>
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
