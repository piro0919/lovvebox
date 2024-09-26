import { Dela_Gothic_One as DelaGothicOne } from "next/font/google";
import Link from "next/link";
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import ReactModernDrawer from "react-modern-drawer";
import { useShallow } from "zustand/shallow";
import styles from "./style.module.css";
import useDrawerStore from "@/stores/useDrawerStore";

const delaGothicOne = DelaGothicOne({ subsets: ["latin"], weight: "400" });

export default function Drawer(): JSX.Element {
  const { setIsOpen, toggled } = useDrawerStore(
    useShallow((state) => ({
      setIsOpen: state.setIsOpen,
      toggled: state.toggled,
    }))
  );

  return (
    <ReactModernDrawer
      className={styles.drawer}
      direction="top"
      onClose={() => setIsOpen(false)}
      open={toggled}
    >
      <ul className={styles.list}>
        <li>
          <Link
            className={`${delaGothicOne.className} ${styles.link}`}
            href="/news"
          >
            NEWS
          </Link>
        </li>
        <li>
          <Link
            className={`${delaGothicOne.className} ${styles.link}`}
            href="/member"
          >
            MEMBER
          </Link>
        </li>
        <li>
          <Link
            className={`${delaGothicOne.className} ${styles.link}`}
            href="https://lovvebox.booth.pm/"
            target="_blank"
          >
            <span>STORE</span>
            <FaExternalLinkSquareAlt size={18} />
          </Link>
        </li>
        <li>
          <Link
            className={`${delaGothicOne.className} ${styles.link}`}
            href="/contact"
          >
            CONTACT
          </Link>
        </li>
      </ul>
    </ReactModernDrawer>
  );
}
