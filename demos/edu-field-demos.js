function updateDocument(){
	// Set the "Explore all demos" button URL
	navURL = "https://simdemo.azureedge.net/edu/fieldportal/alldemos.html";
	navButton = document.querySelector("div[data-name='Controls'] a[aria-label='Explore all demos']");
	if (!navButton) {navButton = document.querySelector("a[aria-label='Explore all demos']")};
	if (navURL && navButton) {
		navButton.setAttribute("href", navURL);
		navButton.setAttribute("target", "_top");
	};
};

this.regale.interactivePreview = true;
document.addEventListener('DOMContentLoaded', function(){updateDocument();});
window.addEventListener('hashchange', function() {updateDocument();});