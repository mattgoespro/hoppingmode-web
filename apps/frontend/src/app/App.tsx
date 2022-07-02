import SvgIcon from '@mui/material/SvgIcon';
import { BrowserRouter, Link, Outlet, Route, Routes } from 'react-router-dom';
import './App.scss';
import GithubLogo from '../assets/svg/github-logo.svg';
import LinkedInLogo from '../assets/svg/linkedin-logo.svg';
import CvDownloadIcon from '../assets/svg/cv.svg';
import { Alert, Tooltip } from '@mui/material';
import { StrictMode } from 'react';
import About from './components/about/About';
import Home from './components/home/Home';
import React from 'react';
import { Subscription } from 'rxjs';
import ErrorNotificationService, {
  ErrorNotification
} from './services/alert-notification/AlertNotification.service';
import ProjectListComponent from './components/project-list/ProjectList';

interface AppState {
  notifySubscription: Subscription;
  notifications: ErrorNotification[];
}

class App extends React.Component<unknown, AppState> {
  constructor(props: unknown) {
    super(props);

    this.state = {
      notifications: [],
      notifySubscription: null
    };
  }

  componentDidMount() {
    this.setState({
      notifySubscription: ErrorNotificationService.notify.subscribe(
        (notifications) => {
          this.setState({
            notifications
          });
        }
      )
    });
  }

  getErrorAlerts() {
    return this.state.notifications.map((notification, index) => {
      return (
        <Alert
          key={index}
          className="notification"
          severity="error"
          variant="standard"
          onClose={() => ErrorNotificationService.remove(notification)}
        >
          Error: {notification.message}
        </Alert>
      );
    });
  }

  getNavBar() {
    return (
      <nav>
        <div className="nav-left">
          <div className="nav-left">
            <Link className="nav-link" to="/home">
              Home
            </Link>
            <Link className="nav-link" to="/projects">
              Projects
            </Link>
            <Link className="nav-link" to="/about">
              About
            </Link>
          </div>
        </div>
        <div className="icons">
          <Tooltip title="Download CV">
            <a href="https://github.com/mattgoespro/public-resources/raw/master/docs/MattYoungCurriculumVitae.pdf">
              <SvgIcon className="cv-icon">{<CvDownloadIcon />}</SvgIcon>
            </a>
          </Tooltip>
          <Tooltip title="LinkedIn">
            <a
              href="https://www.linkedin.com/in/matt-young-691b48189/"
              target="tab"
            >
              <SvgIcon className="linkedin-icon">{<LinkedInLogo />}</SvgIcon>
            </a>
          </Tooltip>
          <Tooltip title="GitHub">
            <a href="https://github.com/mattgoespro" target="tab">
              <SvgIcon className="github-icon">{<GithubLogo />}</SvgIcon>
            </a>
          </Tooltip>
        </div>
      </nav>
    );
  }

  render() {
    return (
      <div className="app">
        {this.getNavBar()}

        <div className="content-outlet-wrapper">
          <div className="notification-stack">{this.getErrorAlerts()}</div>
          <Outlet />
        </div>
      </div>
    );
  }
}

export default function AppRoutes() {
  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="home" element={<Home />} />
            <Route path="projects" element={<ProjectListComponent />}></Route>
            <Route path="about" element={<About />} />
            <Route path="*" />
          </Route>
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
}
