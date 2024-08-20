import DashboardIcon from "@mui/icons-material/Dashboard";
import DirectionsBusOutlinedIcon from '@mui/icons-material/DirectionsBusOutlined';
import NaturePeopleOutlinedIcon from '@mui/icons-material/NaturePeopleOutlined';
import NotificationAddOutlinedIcon from '@mui/icons-material/NotificationAddOutlined';
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined';
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import styles from './sidebar.module.css'; // Import CSS module
import Link from 'next/link';
// Import Image component from next/image

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
   
      <hr />
      <div className={styles.center}>
        <ul>
          <p className={styles.title}>Main</p>
          <li>
            <Link href="/dashboard" legacyBehavior>
              <a className={styles.link}>
                <DashboardIcon className={styles.icon} />
                <span>Dashboard</span>
              </a>
            </Link>
          </li>
          <p className={styles.title}>Lists</p>
          <li>
            <Link href="/addRoute" legacyBehavior>
              <a className={styles.link}>
                <DirectionsBusOutlinedIcon className={styles.icon} />
                <span>add bus</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/stations" legacyBehavior>
              <a className={styles.link}>
                <NaturePeopleOutlinedIcon className={styles.icon} />
                <span>add stations</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/notification" legacyBehavior>
              <a className={styles.link}>
                <NotificationAddOutlinedIcon className={styles.icon} />
                <span>add notifications</span>
              </a>
            </Link>
          </li>
          <p className={styles.title}>Useful</p>
          <li>
            <Link href="/stats" legacyBehavior>
              <a className={styles.link}>
                <LeaderboardIcon className={styles.icon} />
                <span>stats</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/issues" legacyBehavior>
              <a className={styles.link}>
                <ReportOutlinedIcon className={styles.icon} />
                <span>issues</span>
              </a>
            </Link>
          </li>
          <p className={styles.title}>Service</p>
          <li>
            <Link href="/system-health" legacyBehavior>
              <a className={styles.link}>
                <SettingsSuggestOutlinedIcon className={styles.icon} />
                <span>system health</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/settings" legacyBehavior>
              <a className={styles.link}>
                <SettingsOutlinedIcon className={styles.icon} />
                <span>settings</span>
              </a>
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.bottom}>
        <div className={styles.colorOptions}></div>
        <div className={styles.colorOptions}></div>
      </div>
    </div>
  );
};

export default Sidebar;
