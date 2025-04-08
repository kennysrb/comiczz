import { useEffect, useState } from "react";
import styles from "./Header.module.css";

type Props = {
  selectedFormat: string;
  onSelectFormat: (format: string) => void;
};

const formats = ["All", "Comic", "Magazine", "Hardcover", "Digest"];

export const Header = ({ selectedFormat, onSelectFormat }: Props) => {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setVisible(currentY < lastScrollY || currentY < 10);
      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`${styles.Header} ${!visible ? styles.Hidden : ""}`}>
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
