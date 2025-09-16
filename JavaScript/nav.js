// Reusable Navbar Injection and Active-State Management
// Injects a single shared navbar (desktop + mobile offcanvas) into the page

(function () {
	function getBaseHref(pathname) {
		// For GitHub Pages user sites, absolute paths "/..." work.
		// Keep absolute links used in the project for consistency.
		return "/";
	}

	function buildNavbarHtml() {
		const base = getBaseHref(window.location.pathname);
		return (
			`<nav class="navbar navbar-expand-lg navbar-light bg-light border-1 border-bottom fixed-top shadow-sm">
				<div class="container-fluid px-4 py-1">
					<a class="navbar-brand" href="${base}index.html">Millets Gyan</a>
					<button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNav" aria-controls="offcanvasNav">
						<span class="navbar-toggler-icon"></span>
					</button>
					<div class="collapse navbar-collapse justify-content-end" id="navbarNav">
						<ul class="navbar-nav gap-3">
							<li class="nav-item">
								<a class="nav-link" data-nav-id="home" href="${base}index.html#home">Home</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" data-nav-id="about" href="${base}index.html#about">About Me</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" data-nav-id="aboutauthor" href="${base}pages/aboutauthors.html">About Author</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" data-nav-id="recipes" href="${base}pages/recipes.html">Recipes</a>
							</li>
							<li class="nav-item">
								<a class="nav-link btn btn-primary text-light px-4 rounded-5 shadow-sm" data-nav-id="contact" href="${base}index.html#contact">Contact</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>

			<div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNav" aria-labelledby="offcanvasNavLabel">
				<div class="offcanvas-header">
					<h5 class="offcanvas-title" id="offcanvasNavLabel">Menu</h5>
					<button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
				</div>
				<div class="offcanvas-body">
					<ul class="navbar-nav">
						<li class="nav-item">
							<a class="nav-link" data-nav-id="home" href="${base}index.html#home">Home</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" data-nav-id="about" href="${base}index.html#about">About Me</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" data-nav-id="aboutauthor" href="${base}pages/aboutauthors.html">About Author</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" data-nav-id="recipes" href="${base}pages/recipes.html">Recipes</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" data-nav-id="contact" href="${base}index.html#contact">Contact</a>
						</li>
					</ul>
				</div>
			</div>`
		);
	}

	function setActiveState() {
		const pathnameRaw = window.location.pathname.replace(/\\+/g, "/");
		const pathname = pathnameRaw || "";
		const pathLower = pathname.toLowerCase();
		const hash = window.location.hash;
		const links = document.querySelectorAll(".navbar .nav-link, .offcanvas .nav-link");

		// Determine target id based on URL
		let activeId = "";
		if (
			pathLower.endsWith("/pages/recipes.html") ||
			pathLower.includes("/pages/recipes/") ||
			pathLower.includes("pages/recipes/")
		) {
			activeId = "recipes";
		} else if (pathLower.endsWith("/pages/aboutauthors.html") || pathLower.endsWith("pages/aboutauthors.html")) {
			activeId = "aboutauthor";
		} else if (pathLower.endsWith("/index.html") || pathname === "/" || pathLower.endsWith("index.html")) {
			if (hash === "#about") activeId = "about";
			else if (hash === "#contact") activeId = "contact";
			else activeId = "home";
		} else {
			// Fallback: highlight based on first segment
			if (pathname.includes("/pages/")) activeId = pathname.split("/").pop()?.split(".")[0] || "";
		}

		links.forEach(function (link) {
			const id = link.getAttribute("data-nav-id");
			if (!id) return;
			const listItem = link.closest("li");
			if (id === activeId) {
				link.classList.add("active");
				link.setAttribute("aria-current", "page");
				if (listItem) listItem.classList.add("active");
			} else {
				link.classList.remove("active");
				link.removeAttribute("aria-current");
				if (listItem) listItem.classList.remove("active");
			}
		});
	}

	function initNavbar() {
		// Avoid duplicate injection
		if (document.getElementById("offcanvasNav")) {
			setActiveState();
			return;
		}

		const wrapper = document.createElement("div");
		wrapper.innerHTML = buildNavbarHtml();
		document.body.insertBefore(wrapper, document.body.firstChild);

		// Apply top margin to first section/main to avoid overlap with fixed-top navbar
		const firstSection = document.querySelector("main, section");
		if (firstSection && !firstSection.style.marginTop) {
			firstSection.style.marginTop = "80px";
		}

		setActiveState();

		window.addEventListener("hashchange", setActiveState);
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", initNavbar);
	} else {
		initNavbar();
	}
})();


