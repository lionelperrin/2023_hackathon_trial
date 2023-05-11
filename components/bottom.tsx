import Link from "next/link";
import Image from 'next/image';
import styles from "./bottom.module.css";
import packageJSON from "../package.json";
import { Container, Footer, rem} from "@mantine/core";

const FOOTER_HEIGHT=rem(60);

export default function Bottom() {
  return (
    <Footer height={FOOTER_HEIGHT}>
      <Container className={styles.container}>
      <Image
        src="/moodys.png"
        width={143}
        height={60}
        alt="Moody's analytics logo"
      />
      <Image
        src="/hackathon.png"
        width={254}
        height={40}
        alt="Hackathon logo"
      />
      </Container>
    </Footer>
  )
}
