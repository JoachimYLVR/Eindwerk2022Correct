import Nav from "../components/Nav"
import styles from "../styles/About.module.scss";

const About = () => {
  return (
    <>
      <Nav />
      <div className={styles.about}>
        <div className={styles.story}>
          <div className={styles.image}>
            <img src="https://picsum.photos/id/1048/600" alt="About1" />
          </div>
          <div className={styles.text}>
            <h2>Mission</h2>
            <p>Duis eget elementum nisl. Nunc dictum eget augue ut porta. Quisque vulputate erat lorem, et imperdiet augue gravida consectetur. Nunc ut auctor orci. Donec pellentesque sagittis lectus et rhoncus. Sed efficitur iaculis mi, eu venenatis sem maximus non. Aliquam cursus justo ipsum, semper vulputate massa fermentum eu.</p>
            <p>Proin semper ipsum vel quam molestie, a lacinia est faucibus. Sed dui risus, cursus in augue nec, iaculis auctor libero. Fusce lobortis porttitor pretium. Mauris accumsan iaculis magna. Donec euismod mauris vel luctus varius. Nulla blandit gravida hendrerit. Ut nec urna lacus. Donec tempor felis et vulputate lacinia. Nunc et suscipit metus. Phasellus tortor orci, sodales ac justo id, lobortis accumsan risus. Aliquam id ante justo. Sed rutrum viverra vehicula. Donec eleifend ligula vel dolor lobortis rhoncus.</p>
            <h2>Values</h2>
            <p>Nullam in accumsan augue, luctus facilisis nisl. Donec dapibus, velit eget hendrerit iaculis, diam diam molestie mi, ac fringilla velit nulla in mi. Donec non vehicula nibh. Suspendisse consequat, lacus quis eleifend porta, libero ex ornare nisi, at pellentesque tellus arcu vitae lorem. Phasellus mattis imperdiet lectus feugiat hendrerit. Maecenas gravida, risus ut elementum suscipit, arcu ligula accumsan risus, ac pellentesque magna eros nec mi. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent non dui ornare, auctor tellus vel, ultricies massa. Donec eu nibh et elit ultricies maximus ut quis nisi. Suspendisse eu turpis et ipsum dictum condimentum. Donec congue nisl a sapien feugiat, eget faucibus velit scelerisque.</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default About
