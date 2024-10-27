export const isPRaccepted = async (prURL) => {
    // returns boolean if PR is accepted or not
    // https://docs.github.com/en/rest/pulls/pulls?apiVersion=2022-11-28#check-if-a-pull-request-has-been-merged
    const { repoOwner, repoName, prNumber } = parsePRUrl(prURL);
    const githubResponse = await axios.get(`https://api.github.com/repos/${repoOwner}/${repoName}/pulls/${prNumber}/merge`, {
        headers: {
            Authorization: `token ${process.env.GITHUB_TOKEN}`, // what token??
        },
    });

    if (githubResponse === 204) {
        return true;
    }
    else return false;
}

export const findSubmitter = async (prURL) => {
    // returns username of submitter 
    // https://docs.github.com/en/rest/pulls/pulls?apiVersion=2022-11-28#get-a-pull-request
    const { repoOwner, repoName, prNumber } = parsePRUrl(prURL);
    const githubResponse = await axios.get(`https://api.github.com/repos/${repoOwner}/${repoName}/pulls/${prNumber}/merge`, {
        headers: {
            Authorization: `token ${process.env.GITHUB_TOKEN}`, // what token??
        },
    });

    return githubResponse.data.user.login;
}