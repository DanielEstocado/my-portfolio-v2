// Every endpoint path the app calls, grouped by domain, screens import from here, never a raw string.
// Add a group per domain as it's built, e.g.:
// POSTS: { INDEX: "/posts", STORE: "/posts" },
const Api = {
  GITHUB: {
    // A public service that reads a profile's contribution calendar, no login or key needed.
    CONTRIBUTIONS: (username: string) =>
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
  },
};

export default Api;
