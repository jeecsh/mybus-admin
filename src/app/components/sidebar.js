import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import DirectionsBusOutlinedIcon from '@mui/icons-material/DirectionsBusOutlined';
import NotificationAddOutlinedIcon from '@mui/icons-material/NotificationAddOutlined';
import styles from './sidebar.module.css'; // Import CSS module
import NaturePeopleOutlinedIcon from '@mui/icons-material/NaturePeopleOutlined';
import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.top}>
        <span className={styles.logo}>mybus Admin</span>
      </div>
      <hr />
      <div className={styles.center}>
        <ul>
          <p className={styles.title}>Main</p>
          <li>
            <DashboardIcon className={styles.icon} />
            <span>Dashboard</span>
          </li>
          <p className={styles.title}>Lists</p>
       
           
            <li>
            <DirectionsBusOutlinedIcon className={styles.icon} />
            <span>add bus</span>
          </li>
            <li>
            <NaturePeopleOutlinedIcon className={styles.icon} />
            <span>add stations</span>
          </li>
          <li>
            <NotificationAddOutlinedIcon  className={styles.icon} />
            <span>add notifications</span>
          </li>
          <p className={styles.title}>Useful</p>
          <li>
            <LeaderboardIcon className={styles.icon} />
            <span>stats</span>
          </li>
          <li>
            <ReportOutlinedIcon className={styles.icon} />
            <span>issues</span>
          </li>
      
          <p className={styles.title}>Service</p>
          <li>
            <SettingsSuggestOutlinedIcon className={styles.icon} />
            <span>system health</span>
          </li>
      
          <li>
            <SettingsOutlinedIcon className={styles.icon} />
            <span>settings</span>
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
