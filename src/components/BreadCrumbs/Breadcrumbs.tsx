import { pluralize } from "../../utils/helpers";
import styles from "./Breadcrumbs.module.css";

type Props = {
  format: string;
  onHomeClick: () => void;
};

export const Breadcrumbs = ({ format, onHomeClick }: Props) => {
  return (
    <nav className={styles.Breadcrumbs}>
      <span className={styles.Link} onClick={onHomeClick}>
        Home
      </span>{" "}
      / <strong>{pluralize(format)}</strong>
    </nav>
  );
};
