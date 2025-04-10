import styles from "./RowInfo.module.css";

type RowInfoProps = {
  label: string;
  value: string | number;
};

const RowInfo = ({ label, value }: RowInfoProps) => {
  return (
    <p className={styles.RowInfo}>
      <strong>{label}:</strong> {value}
    </p>
  );
};

export default RowInfo;
