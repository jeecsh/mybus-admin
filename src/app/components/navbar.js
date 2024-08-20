import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SegmentOutlinedIcon from "@mui/icons-material/SegmentOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import styles from "./nav.module.css";
import Image from 'next/image'; 

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.wrapper}>
      <div className={styles.top}>
        <Image src="/BUSS3.png" alt="mybus Admin" width={100} height={100} className={styles.logo} /> 
        {/* Adjust width and height as needed */}
      </div>
      <div className={styles.item1}>
           
         ADMIN PANEL
          </div>
        <div className={styles.items}>
          <div className={styles.item}>
            <PublicOutlinedIcon className={styles.icon} />
            English
          </div>
          <div className={styles.item}>
            <DarkModeOutlinedIcon className={styles.icon} />
          </div>
          <div className={styles.item}>
            <FullscreenExitOutlinedIcon className={styles.icon} />
          </div>
          <div className={styles.item}>
            <NotificationsNoneOutlinedIcon className={styles.icon} />
            <div className={styles.counter}>1</div>
          </div>
          <div className={styles.item}>
            <ChatBubbleOutlineOutlinedIcon className={styles.icon} />
            <div className={styles.counter}>2</div>
          </div>
          <div className={styles.item}>
            <SegmentOutlinedIcon className={styles.icon} />
          </div>
          <div className={styles.item}>
            <img src="/BUSS3.png"alt="avatar" className={styles.avatar} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
