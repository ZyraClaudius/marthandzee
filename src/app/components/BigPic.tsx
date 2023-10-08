import Image from "next/image";
import us from "~/app/components/us.gif";
import styles from "./BigPic.module.css";

export default function BigPic() {
  return (
    <div className={styles.BigPic}>
      <p className={styles.date} style={{ backgroundImage: `url(${us.src})` }}>
        06.07.24
      </p>
      <div className={styles.overlay}></div>
      <Image className={styles.Image} src={us} alt="Us hiking" fill />
    </div>
  );
}
