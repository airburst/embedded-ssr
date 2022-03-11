import { ReactElement } from "react";
import styles from "./Loader.module.css"

type LoaderProps = {
  message?: string;
}

const Loader = (props: LoaderProps): ReactElement => {
  const { message } = props;

  return (
    <div className={styles.wrapper}>
      <div className={styles.ldsRing}><div></div><div></div><div></div><div></div></div>
      {message && <div className={styles.message}>{message}</div>}
    </div>
  )
};

export default Loader;