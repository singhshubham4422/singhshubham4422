(() => {
  const config = window.PORTFOLIO || {};
  const isSet = (value) => typeof value === "string" && value.trim() !== "" && !value.includes("YOUR_");

  const username = isSet(config.githubUsername) ? config.githubUsername.trim() : "";
  if (username) {
    const profileUrl = `https://github.com/${encodeURIComponent(username)}`;
    document.querySelectorAll("[data-github-link]").forEach((link) => {
      link.href = profileUrl;
    });
  }

  const emailLink = document.querySelector("[data-email-link]");
  if (emailLink && isSet(config.email)) {
    emailLink.href = `mailto:${config.email.trim()}`;
    emailLink.textContent = `${config.email.trim()} ↗`;
    emailLink.hidden = false;
  }

  const linkedinLink = document.querySelector("[data-linkedin-link]");
  if (linkedinLink && isSet(config.linkedinUrl)) {
    linkedinLink.href = config.linkedinUrl.trim();
    linkedinLink.rel = "noreferrer";
    linkedinLink.hidden = false;
  }

  const phoneLink = document.querySelector("[data-phone-link]");
  if (phoneLink && isSet(config.phone)) {
    phoneLink.href = `tel:${config.phone.replace(/[^\d+]/g, "")}`;
    phoneLink.textContent = config.phone.trim();
    phoneLink.hidden = false;
  }

  const location = document.querySelector("[data-location]");
  if (location && isSet(config.location)) {
    location.textContent = `Based in ${config.location.trim()}`;
    location.hidden = false;
  }

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
