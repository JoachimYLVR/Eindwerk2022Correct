import { Button, Spacer } from '@nextui-org/react';
import styles from "../styles/Rewind.module.scss";

const Rewind = ({elements}) => {
  const phase = [
    "Input phase 1",
    "Assessment phase 1",
    "Input phase 2",
    "Assessment phase 2",
    "Input phase 3",
    "Assessment phase 3",
    "Input phase 3",
    "Assessment phase 3",
    "Input phase 4",
    "Assessment phase 4",
    "Input phase 5",
    "Assessment phase 5"
  ]
  return (
    <div className={styles.RewindList}>
      {elements.map((el) => 
        <div key={el.id}className={styles.Comment}>
          <p>{phase[el.PhaseId-1]}</p>
          <div>
            {el.Text}
          </div>
        </div>
      )}
    </div>
  )
}

export default Rewind
