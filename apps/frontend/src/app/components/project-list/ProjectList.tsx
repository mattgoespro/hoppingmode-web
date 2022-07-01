import GithubProject from './project/Project';
import axios from 'axios';
import './ProjectList.scss';
import AlertNotificationService from '../../services/alert-notification/AlertNotification.service';
import React from 'react';
import { ApiRepositoryResponseDTO } from '@hoppingmode-web/api-interfaces';
import { Spinner } from '../shared/spinner/Spinner';

interface ProjectListComponentState {
  pinnedProjects?: ApiRepositoryResponseDTO[];
  unpinnedProjects?: ApiRepositoryResponseDTO[];
  loading?: boolean;
}

export default class ProjectListComponent extends React.Component<
  {},
  ProjectListComponentState
> {
  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  private noProjectsToShow = (
    <div className="no-projects-to-show">No projects to show.</div>
  );

  private getProjectListTemplate(
    projects: ApiRepositoryResponseDTO[],
    cssClass: string,
    pinned?: boolean
  ) {
    return (
      <div className={cssClass}>
        {projects.map((project, index) => {
          const indexStyle = {};
          indexStyle[`--${pinned ? 'pinned' : 'unpinned'}ProjectIndex`] = index;
          return (
            <div
              key={project.name}
              className={'project' + (pinned ? ' pinned' : '')}
              style={indexStyle as React.CSSProperties}
            >
              <GithubProject
                key={project.name}
                repo={project}
                pinned={pinned}
              />
            </div>
          );
        })}
      </div>
    );
  }

  private getProjectList() {
    return (
      <div className="projects">
        <div className="pinned-projects-wrapper">
          {this.getProjectListTemplate(
            this.state.pinnedProjects,
            'pinned-projects',
            true
          )}
        </div>
        {this.getProjectListTemplate(
          this.state.unpinnedProjects,
          'unpinned-projects'
        )}
      </div>
    );
  }

  async componentDidMount() {
    this.state = {
      loading: true,
      pinnedProjects: [],
      unpinnedProjects: []
    };
    try {
      const unpinnedProjects = (
        await axios.get<ApiRepositoryResponseDTO[]>('/api/repos')
      ).data;
      const pinnedProjects = (
        await axios.get<ApiRepositoryResponseDTO[]>('/api/repos/pinned')
      ).data;
      this.setState({
        pinnedProjects,
        unpinnedProjects,
        loading: false
      });
    } catch (err) {
      this.setState({
        loading: false
      });
      AlertNotificationService.log({
        status: err.response.status,
        statusText: err.response.statusText
      });
    }
  }

  private hasProjects() {
    if (
      this.state.pinnedProjects == null ||
      this.state.unpinnedProjects == null
    ) {
      return false;
    }
    return (
      this.state.pinnedProjects.length + this.state.unpinnedProjects.length > 0
    );
  }

  render(): React.ReactNode {
    return (
      <div
        style={{
          position: 'relative'
        }}
      >
        {this.state.loading && <Spinner loading={true} foreground={true} />}
        <div className="page-header-wrapper">
          <h1 className="page-header">
            These are the <span>Projects</span> I have worked on
          </h1>
          <h2 className="page-header-subtext">
            among other unicorn-level ones...
          </h2>
        </div>
        <div className="project-list-wrapper">
          {/* {projectsError && (
            noProjectsToShow
          )} */}
          {this.hasProjects() && this.getProjectList()}
        </div>
      </div>
    );
  }
}

// export default function ProjectList() {
//   const [githubRepos, setGithubRepos] = useState<ApiRepositoryResponseDTO[]>(
//     []
//   );
//   const [githubPinnedRepos, setGithubPinnedRepos] = useState<
//     ApiRepositoryResponseDTO[]
//   >([]);
//   const [loading, setLoading] = useState(false);
//   const [projectsError, setProjectsError] = useState(false);
//   const [pinnedProjectsError, setPinnedProjectsError] = useState(false);

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get<ApiRepositoryResponseDTO[]>('/api/repos')
//       .then((resp) => {
//         setGithubRepos(resp.data);
//         setLoading(false);
//         setProjectsError(false);
//       })
//       .catch((err: GithubApiRestErrorResponse) => {
//         setLoading(false);
//         setProjectsError(true);
//         AlertNotificationService.log({
//           status: err.response.status,
//           statusText: err.response.statusText
//         });
//       });
//     axios
//       .get<ApiRepositoryResponseDTO[]>('/api/repos/pinned')
//       .then((resp) => {
//         setGithubPinnedRepos(resp.data);
//         setLoading(false);
//         setPinnedProjectsError(false);
//       })
//       .catch((err: GithubApiRestErrorResponse) => {
//         setLoading(false);
//         setPinnedProjectsError(true);
//         AlertNotificationService.log({
//           status: err.response.status,
//           statusText: err.response.statusText
//         });
//       });
//   }, []);

//   return (
//     <div>
//       <div className="page-header-wrapper">
//         <h1 className="page-header">
//           These are the <span>Projects</span> I have worked on
//         </h1>
//         <h2 className="page-header-subtext">
//           among other unicorn-level ones...
//         </h2>
//         {pinnedProjectsError && (
//           <div className="no-pinned-projects-to-show">
//             Well, this is embarrassing. There are no pinned projects to display.
//           </div>
//         )}
//       </div>
//       <div className="project-list-wrapper">
//         {loading && getSpinner(true)}
//         {projectsError && (
//           <div className="no-projects-to-show">No projects to show.</div>
//         )}
//         {githubRepos.length > 0 && projects(githubRepos)}
//       </div>
//     </div>
//   );
// }
