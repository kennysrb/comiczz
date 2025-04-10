import { Comic } from "../../types/types";
import { getLowestPrice } from "../../utils/helpers";
import Button from "../Button/Button";
import styles from "./ComicCard.module.css";

type ComicCardProps = {
  comic: Comic;
  onMoreInfo: (id: number) => void;
};

export const ComicCard = ({ comic, onMoreInfo }: ComicCardProps) => {
  const thumbnail = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
  const price = getLowestPrice(comic.prices);

  return (
    <div className={styles.Card}>
      <img src={thumbnail} alt={comic.title} />
      <div className={styles.ComicDetails}>
        <p className={styles.Title}>{comic.title}</p>
        <div className={styles.PriceWrapper}>
          <p className={styles.Price}>Price: {price} €</p>
          <Button label="More Info" clickHandler={() => onMoreInfo(comic.id)} />
        </div>
      </div>
    </div>
  );
};
