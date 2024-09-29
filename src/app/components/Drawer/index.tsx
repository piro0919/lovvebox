import { useLockBodyScroll } from "@custom-react-hooks/use-lock-body-scroll";
import { Dela_Gothic_One as DelaGothicOne } from "next/font/google";
import Link from "next/link";
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import ReactModernDrawer from "react-modern-drawer";
import { SocialIcon } from "react-social-icons";
import { useShallow } from "zustand/shallow";
import styles from "./style.module.css";
import useDrawerStore from "@/stores/useDrawerStore";
import menuList from "@/utils/menuList";

const delaGothicOne = DelaGothicOne({ subsets: ["latin"], weight: "400" });

export default function Drawer(): JSX.Element {
  const { setIsOpen, toggled } = useDrawerStore(
    useShallow((state) => ({
      setIsOpen: state.setIsOpen,
      toggled: state.toggled,
    }))
  );

  useLockBodyScroll(toggled);

  return (
    <ReactModernDrawer
      className={styles.drawer}
      direction="top"
      onClose={() => setIsOpen(false)}
      open={toggled}
    >
      <ul className={styles.list}>
        {menuList.map(({ href, text }) => (
          <li key={href}>
            <Link
              className={`${delaGothicOne.className} ${styles.link}`}
              href={href}
              target={href.startsWith("http") ? "_blank" : "_self"}
            >
              <span>{text}</span>
              {href.startsWith("http") ? (
                <FaExternalLinkSquareAlt size={18} />
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
      <ul className={styles.iconList}>
        <li>
          <SocialIcon
            className={styles.socialIcon}
            target="_blank"
            url="https://www.youtube.com/@lovvebox"
          />
        </li>
        <li>
          <SocialIcon
            className={styles.socialIcon}
            target="_blank"
            url="https://x.com/lovvebox"
          />
        </li>
      </ul>
    </ReactModernDrawer>
  );
}
