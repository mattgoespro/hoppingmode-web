import dotenv from "dotenv";
import generateBanner from "figlet";
import { RestApiServer } from "./app/controllers/rest-controller";
import { environment } from "./environments/environment";

// Init process variables
delete process.env.GITHUB_API_PAT;
dotenv.config();

const githubApiPat = process.env.GITHUB_API_PAT as unknown as string;

if (githubApiPat == null) {
  console.log("WARN: Requests will be sent without authorization.");
}

RestApiServer({
  githubRestApiTarget: environment.githubRestApiTarget,
  githubGraphqlApiTarget: environment.githubGraphqlApiTarget,
  githubApiLogin: environment.githubApiLogin,
  githubApiPat,
}).listen(3000, () => {
  console.log(
    generateBanner.textSync("Server    started   ...", {
      font: "Standard",
      whitespaceBreak: true,
    })
  );
});
