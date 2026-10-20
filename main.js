(() => {
  const config = window.PORTFOLIO || {};
  const username = String(config.githubUsername || "").trim();
  const validUsername = Boolean(username && username !== "YOUR_GITHUB_USERNAME");
  const fallback = (value, replacement) => value && !String(value).includes("YOUR_") ? value : replacement;
  const profileUrl = validUsername ? `https://github.com/${encodeURIComponent(username)}` : "";

  document.querySelectorAll("[data-name]").forEach((node) => {
    node.textContent = fallback(config.name, "Your Name");
  });
  document.querySelectorAll(".wordmark-icon").forEach((node) => {
    node.replaceChildren(document.createTextNode(fallback(config.initials, "Y")));
    const period = document.createElement("span");
    period.textContent = ".";
    node.append(period);
  });
  document.querySelectorAll("[data-specialty]").forEach((node) => {
    node.textContent = fallback(config.specialty, "Engineer · Designer · Curious human");
  });
  document.querySelectorAll("[data-currently]").forEach((node) => {
    node.textContent = [fallback(config.currently, "Building what’s next"), config.location].filter(Boolean).join(" · ");
  });

  const emailLink = document.querySelector("[data-email-link]");
  if (config.email && !config.email.includes("example.com")) {
    emailLink.href = `mailto:${config.email}`;
  } else if (profileUrl) {
    emailLink.href = profileUrl;
    emailLink.textContent = "View GitHub profile ↗";
    emailLink.setAttribute("aria-label", "View GitHub profile");
  } else {
    emailLink.hidden = true;
  }

  const linkedinLink = document.querySelector("[data-linkedin-link]");
  if (config.linkedinUrl && !config.linkedinUrl.includes("YOUR_")) {
    linkedinLink.href = config.linkedinUrl;
    linkedinLink.target = "_blank";
    linkedinLink.rel = "noreferrer";
  } else {
    linkedinLink.hidden = true;
  }

  document.getElementById("year").textContent = new Date().getFullYear();

  const interests = document.querySelector("[data-interests]");
  interests.replaceChildren(...(config.interests || []).map((item) => {
    const tag = document.createElement("span");
    tag.textContent = item;
    return tag;
  }));

  document.querySelectorAll("[data-github-link]").forEach((link) => {
    if (profileUrl) link.href = profileUrl;
  });

  const grid = document.getElementById("project-grid");
  const note = document.getElementById("project-note");
  const showMessage = (kicker, title, description, symbol = "—") => {
    const card = document.createElement("article");
    card.className = "project-card setup-card";
    const number = document.createElement("span");
    number.className = "project-number mono";
    number.textContent = symbol;
    const content = document.createElement("div");
    const label = document.createElement("p");
    label.className = "project-kicker mono";
    label.textContent = kicker;
    const heading = document.createElement("h3");
    heading.textContent = title;
    const body = document.createElement("p");
    body.textContent = description;
    content.append(label, heading, body);
    card.append(number, content);
    grid.replaceChildren(card);
  };

  if (!validUsername) {
    showMessage("ONE QUICK SETUP", "Your projects, here", "Add your GitHub username in site-config.js and your public repositories will fill this space.", "01");
    note.textContent = "Set up your profile once; the project list refreshes from GitHub on every visit.";
    return;
  }

  const featured = (config.featuredRepos || []).map((name) => String(name).toLowerCase());
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 10000);

  fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=100&type=owner`, {
    headers: { Accept: "application/vnd.github+json" },
    signal: controller.signal
  })
    .then((response) => {
      if (!response.ok) throw new Error("GitHub profile could not be loaded.");
      return response.json();
    })
    .then((repos) => {
      const visible = repos.filter((repo) => !repo.fork && !repo.archived);
      visible.sort((a, b) => {
        const ai = featured.indexOf(a.name.toLowerCase());
        const bi = featured.indexOf(b.name.toLowerCase());
        if (ai !== -1 || bi !== -1) return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
        return new Date(b.updated_at) - new Date(a.updated_at);
      });

      const selected = visible.slice(0, 6);
      if (!selected.length) {
        showMessage("PROJECTS COMING SOON", "Good things take a little time", "Public repositories will show up here as you publish them.");
        return;
      }

      grid.replaceChildren(...selected.map((repo, index) => {
        const card = document.createElement("a");
        card.className = "project-card";
        card.href = repo.html_url;
        card.target = "_blank";
        card.rel = "noreferrer";

        const number = document.createElement("span");
        number.className = "project-number mono";
        number.textContent = String(index + 1).padStart(2, "0");

        const copy = document.createElement("div");
        copy.className = "project-copy";
        const kicker = document.createElement("p");
        kicker.className = "project-kicker mono";
        kicker.textContent = [repo.language, repo.stargazers_count ? `${repo.stargazers_count} ★` : "OPEN SOURCE"].filter(Boolean).join(" / ");
        const title = document.createElement("h3");
        title.textContent = repo.name.replaceAll("-", " ");
        const description = document.createElement("p");
        description.textContent = repo.description || "A project in progress. Explore the repository to see more.";
        const meta = document.createElement("div");
        meta.className = "project-meta mono";
        if (repo.language) {
          const language = document.createElement("span");
          language.textContent = repo.language;
          meta.append(language);
        }
        const updated = document.createElement("span");
        updated.textContent = `UPDATED ${new Date(repo.updated_at).toLocaleDateString(undefined, { month: "short", year: "numeric" }).toUpperCase()}`;
        meta.append(updated);
        copy.append(kicker, title, description, meta);

        const arrow = document.createElement("span");
        arrow.className = "project-arrow";
        arrow.setAttribute("aria-hidden", "true");
        arrow.textContent = "↗";
        card.append(number, copy, arrow);
        return card;
      }));
      note.textContent = "Showing up to six recent public projects. Updated automatically from GitHub.";
    })
    .catch(() => {
      showMessage("PROJECTS UNAVAILABLE", "GitHub couldn’t be reached", "Please try again in a little while.", "!");
      note.textContent = "The project list refreshes automatically when you visit.";
    })
    .finally(() => window.clearTimeout(timeout));
})();
