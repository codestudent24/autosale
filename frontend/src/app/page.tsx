import PostForm from "@/components/PostForm";
import CarImage from "@/components/design/CarImage";
import LinesImage from "@/components/design/LinesImage";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Бесплатно проведём оценку и купим Ваш автомобиль в короткие сроки</h1>
      <h2>Оставьте заявку на сайте для обратной связи</h2>
      <PostForm />
      <h2>Или свяжитесь с нами одним из способов:</h2>
      <LinesImage />
      <CarImage />
    </main>
  );
}
