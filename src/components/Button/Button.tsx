import styles from "./Button.module.css";

type ButtonProps = {
  clickHandler: () => void;
  label: string;
};

const Button = ({ clickHandler, label }: ButtonProps) => {
  return (
    <button className={styles.Button} onClick={() => clickHandler()}>
      {label}
    </button>
  );
};

export default Button;
