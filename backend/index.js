const Koa = require("koa");
const cors = require("@koa/cors");
const pMemoize = require("p-memoize");
const fetch = require("node-fetch");
const { gql } = require("apollo-boost");
const { default: ApolloClient } = require("apollo-boost");
const app = new Koa();

const TTL = process.env.TTL || 1000;
const GITHUB_OAUTH = process.env.GITHUB_OAUTH || "";
const PORT = Number(process.env.port) || 8080;

const client = new ApolloClient({
  uri: `https://api.github.com/graphql?access_token=${GITHUB_OAUTH}`,
  fetch
});

const fetchGithub = async organization => {
  const res = [];
  let pageInfo;
  do {
    const result = await client.query({
      query: gql`
        query getOpenedPRsForOrganization($login: String!, $cursor: String) {
          organization(login: $login) {
            membersWithRole(first: 50, after: $cursor) {
              nodes {
                name
                login
                avatarUrl
                pullRequests(states: [OPEN, CLOSED, MERGED], last: 25) {
                  nodes {
                    createdAt
                    title
                    repository {
                      name
                      isPrivate
                    }
                  }
                }
              }
              pageInfo {
                endCursor
                hasNextPage
              }
            }
          }
        }
      `,
      variables: {
        login: organization,
        cursor: pageInfo && pageInfo.endCursor ? pageInfo.endCursor : undefined
      }
    });
    res.push(...result.data.organization.membersWithRole.nodes);
    pageInfo = result.data.organization.membersWithRole.pageInfo;
  } while (pageInfo.hasNextPage);
  return res;
};

const computeGithubData = data =>
  data
    .map(row => ({
      name: row.name,
      login: row.login,
      avatarUrl: row.avatarUrl,
      pullRequests: row.pullRequests.nodes.filter(pr => {
        const createDate = new Date(Date.parse(pr.createdAt));
        const currentDate = new Date(Date.now());
        return (
          !pr.isPrivate &&
          createDate.getMonth() === currentDate.getMonth() &&
          createDate.getFullYear() === currentDate.getFullYear()
        );
      })
    }))
    .map(row => ({
      ...row,
      count: row.pullRequests.length
    }))
    .filter(row => {
      return row.pullRequests.length >= 1;
    })
    .sort((row1, row2) => row2.count - row1.count);

const fetchAndComputeGithubData = async organization =>
  computeGithubData(await fetchGithub(organization));

const memFetchGithub = pMemoize(fetchAndComputeGithubData, { maxAge: TTL });

app.use(cors());

app.use(async ctx => {
  ctx.body = await memFetchGithub("Zenika");
});

setInterval(async () => {
  await memFetchGithub("Zenika");
  console.log("Refreshed cache");
}, TTL);
memFetchGithub("Zenika");
console.log("Refreshing cache");

const server = app.listen(PORT);

console.log(`Server started on port ${server.address().port}`);
