import { Comic, Price } from "../../types/types";
import styles from "./ComicCard.module.css";

type ComicCardProps = {
  comic: Comic;
  onMoreInfo: (id: number) => void;
};

export const ComicCard = ({ comic, onMoreInfo }: ComicCardProps) => {
  const thumbnail = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
  const price =
    comic.prices.length > 0
      ? Math.min(...comic.prices.map((p: Price) => p.price))
      : "N/A";

  return (
    <div className={styles.Card}>
      <img src={thumbnail} alt={comic.title} />
      <h4 className={styles.Title}>{comic.title}</h4>
      <div className={styles.PriceWrapper}>
        <p className={styles.Price}>Price: ${price}</p>
        <button className={styles.Button} onClick={() => onMoreInfo(comic.id)}>
          More Info
        </button>
      </div>
    </div>
  );
};
