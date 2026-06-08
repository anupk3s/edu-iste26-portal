function updateDocument(){
	// Set the "Explore all demos" button URL
	navURL = "https://simdemo.azureedge.net/edu/fieldportal/alldemos.html";
	navURListe = "https://thankful-beach-00ba97010.6.azurestaticapps.net/alldemos.html";
	navButton = document.querySelector("div[data-name='Controls'] a[aria-label='Explore all demos']");
	cidValue = getCidFromUrl();
	if (!navButton) {navButton = document.querySelector("a[aria-label='Explore all demos']")};
	if (navURL && navButton) {
		if (cidValue = "edu-iste25") {navButton.setAttribute("href", navURListe)}
		else {navButton.setAttribute("href", navURL)}
		navButton.setAttribute("target", "_top");
	};
};

function getCidFromUrl() {
	const url = window.location.href;
	const urlObj = new URL(url);

	//Get the value of the correlation ID parameter
	const cid = urlObj.searchParams.get("cid");
	return cid ? cid : null;
}

this.regale.interactivePreview = true;
document.addEventListener('DOMContentLoaded', function(){updateDocument();});
window.addEventListener('hashchange', function() {updateDocument();});