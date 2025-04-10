import styles from "./List.module.css";

type ComicDetailListProps = {
  label: string;
  items: { name: string; role?: string }[];
};

const ComicDetailList = ({ label, items }: ComicDetailListProps) => {
  return (
    <div className={styles.ListWrapper}>
      <strong>{label}:</strong>
      <ul className={styles.List}>
        {items.map((item, index) => (
          <li key={index}>
            {"role" in item && item.role
              ? `${item.name} – ${item.role}`
              : item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComicDetailList;
