import dotenv from 'dotenv';
import generateBanner from 'figlet';
import path from 'path';
import { RestApiServer } from './app/controllers/rest-controller.service';
import { environment } from './environments/environment';

// Init process variables
delete process.env.GITHUB_API_PAT;

dotenv.config({
  path: path.resolve(__dirname, '../../../.env')
});

const githubApiPat = process.env.GITHUB_API_PAT;

if (githubApiPat == null) {
  console.log('WARN: Requests will be sent without authorization headers.');
}

RestApiServer({
  githubRestApiTarget: environment.githubRestApiTarget,
  githubGraphqlApiTarget: environment.githubGraphqlApiTarget,
  githubApiLogin: environment.githubApiLogin,
  githubApiPat: githubApiPat
}).listen(3000, () => {
  console.log(
    generateBanner.textSync('Server    started   ...', {
      font: 'Standard',
      whitespaceBreak: true
    })
  );
  console.log('\nListening on port 3000...');
});
