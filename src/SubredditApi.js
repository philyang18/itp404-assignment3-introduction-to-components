export async function getResults(subreddit) {
	try {
    let response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
    let results = await response.json();
    return results.data.children;
  }
  catch {
    return 0;
  }
}
