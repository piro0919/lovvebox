import { useLockBodyScroll } from "@custom-react-hooks/use-lock-body-scroll";
import dynamic from "next/dynamic";
import { Dela_Gothic_One as DelaGothicOne } from "next/font/google";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";
import { SocialIcon } from "react-social-icons";
import validUrl from "valid-url";
import { useShallow } from "zustand/shallow";
import styles from "./style.module.css";
import useDrawerStore from "@/stores/useDrawerStore";
import menuList from "@/utils/menuList";

const delaGothicOne = DelaGothicOne({ subsets: ["latin"], weight: "400" });
const ReactModernDrawer = dynamic(() => import("react-modern-drawer"), {
  ssr: false,
});

export default function Drawer(): JSX.Element {
  const { setIsOpen, toggled } = useDrawerStore(
    useShallow((state) => ({
      setIsOpen: state.setIsOpen,
      toggled: state.toggled,
    })),
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
              target={validUrl.isWebUri(href) ? "_blank" : "_self"}
            >
              <span>{text}</span>
              {validUrl.isWebUri(href) ? <FaExternalLinkAlt size={18} /> : null}
            </Link>
          </li>
        ))}
      </ul>
      <ul className={styles.iconList}>
        <li>
          <SocialIcon
            bgColor="#f89eac"
            className={styles.socialIcon}
            fgColor="#fff"
            target="_blank"
            url="https://www.youtube.com/@lovvebox"
          />
        </li>
        <li>
          <SocialIcon
            bgColor="#f89eac"
            className={styles.socialIcon}
            fgColor="#fff"
            target="_blank"
            url="https://x.com/lovvebox"
          />
        </li>
      </ul>
    </ReactModernDrawer>
  );
}
