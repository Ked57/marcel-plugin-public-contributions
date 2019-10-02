const Koa = require("koa");
const pMemoize = require("p-memoize");
const fetch = require("node-fetch");
const app = new Koa();

const TTL = process.env.TTL || 1000;
const githubEndpoint =
  process.env.GITHUB_ENDPOINT || "https://api.github.com/graphql";
const GITHUB_OAUTH = process.env.GITHUB_OAUTH || "";

const generateQuery = cursor => `query getOpenedPRsForOrganization($login: String! ${
  cursor ? "$cursor: String!" : ""
}) {
    organization(login: $login) {
      membersWithRole(first: 100 ${cursor ? "after: $cursor" : ""}) {
        nodes {
            name
          login
          avatarUrl
          pullRequests(states: OPEN, before: "2019-10-31", after: "2019-10-01") {
            totalCount
          }
        }
         pageInfo {
            endCursor
            hasNextPage
          }
      }
    }
  }`;
const generateVariables = (login, cursor) => `variables {
    "login": ${login}${
  cursor
    ? `,
        "cursor": ${cursor}`
    : ""
}
  }
  `;

const fetchGithub = async organization => {
  let hasNextPage = true;
  let cursor;
  const res = {};
  while (hasNextPage) {
    console.log(generateQuery(organization, cursor));
    const response = await fetch(githubEndpoint, {
      method: "POST",
      body: {
        query: generateQuery(cursor),
        variables: generateVariables(organization, cursor)
      },
      headers: { Authorization: `Bearer ${GITHUB_OAUTH}` }
    });
    const result = await response.json();
    // hasNextPage = result.organization.membersWithRoles.pageInfo.hasNextPage;
    // cursor = result.organization.membersWithRoles.pageInfo.cursor;
    hasNextPage = false;
    Object.assign(res, { ...res, ...result });
  }
  console.log(res);
  return res;
};

const memFetchGithub = pMemoize(fetchGithub, { maxAge: TTL });

app.use(async ctx => {
  ctx.body = await memFetchGithub("Zenika");
});

app.listen(3000);
