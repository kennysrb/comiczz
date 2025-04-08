import styles from "./Header.module.css";

type Props = {
  selectedFormat: string;
  onSelectFormat: (format: string) => void;
};

const formats = ["All", "Comic", "Magazine", "Hardcover", "Digest"];

export const Header = ({ selectedFormat, onSelectFormat }: Props) => {
  return (
    <header className={styles.Header}>
      {formats.map((format) => (
        <button
          key={format}
          className={selectedFormat === format ? styles.Active : ""}
          onClick={() => onSelectFormat(format)}
        >
          {format}
        </button>
      ))}
    </header>
  );
};
