import styles from "./RowInfo.module.css";

type RowInfoProps = {
  label: string;
  value: string | number;
};

const RowInfo = ({ label, value }: RowInfoProps) => {
  return (
    <p className={styles.RowInfo}>
      <span className={styles.Label}>{label}:</span> {value}
    </p>
  );
};

export default RowInfo;
