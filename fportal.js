async function fetchDemos() {
    const response = await fetch('demodata.json');
    const demos = await response.json();
    return demos;
}

function displayDemos(demos) {
    const demosContainer = document.getElementById('demo-container');
    demosContainer.innerHTML = '';
    if(demos.length === 0) {
        demosContainer.innerHTML = "<p class='no-match'>No matching demos found.</p>"
    }
    //sort demos by Featured, Hero, ID
    demos.sort((a,b) => a.ID - b.ID);

    demos.forEach(demo => {
        const demoDiv = document.createElement('div');
        demoDiv.className = 'demo-card';
        demoDiv.innerHTML = `
            <div class="demo-thumbnail" style="background-image:url('./thumbnails/${demo.Thumbnail}')"></div>
            <div class="demo-metadata">
                <h3  onclick = "searchDemoItem('${demo.DemoShortTitle}')">${demo.DemoTitle}</h3>
                <p class="demo-products" style ="display:none;">
                    ${demo.Leading == "Yes" ? `<span><i class="fa fa-certificate" aria-hidden="true"></i> Leading demo </span>` : ''}
                    ${demo.Hero == "Yes" ? `<span><i class="fa fa-star" aria-hidden="true"></i> Hero demo</span>` : ''}
                </p>
                <p class="demo-desc" title="${demo.Summary}">${demo.Summary}</p>
                <div class="more-link" onclick = "searchDemoItem('${demo.DemoShortTitle}')">
                    <div class="more-arrow"></div>
                    <span>See demo</span>
                </div>
            </div>
        `;
        demosContainer.appendChild(demoDiv);
    });
}

function displayImageInModal(imageSrc, altText) {
    var imageDiv = document.getElementById("imageModal");
    if (imageDiv) {imageDiv.style.display = "block";}
    var imageDetails = document.getElementById("imageDetails");
    if (imageDetails) {imageDetails.innerHTML = `<img src='${imageSrc}' alt='${altText}''/>`;}
}

function searchDemoItem(demoId) {
    //Set query string parameter, then find it based on selected demo Id
    const url = new URL(window.location.href);
    url.searchParams.set('did', demoId);
    window.history.pushState({}, '', url);
    getDemoItem(demoId);
}

function getDemoItem(demoId) {
    //Find the container to show the demo data
    var demoDiv = document.getElementById("demoDetails");
    var filteredDemo = "";

    //Get the selected demo data (products) and render into the modal div
    fetch('demodata.json')
    .then(response => response.json())
    .then(products => {
        filteredDemo = products.filter(product => product.DemoShortTitle === demoId);
        demoDiv.innerHTML =  filteredDemo.map(product => `
            <div class='demo-left'>
                <h2>${product.DemoTitle}</h2>
                <div class='demo-summary'>${product.Summary}</div>
                <div><b>Value area:</b> ${product.Pillar}</div>
                <div><b>Products/features:</b> ${product.Products ? product.Products.join(', ') : ''}</div>
                ${product.Personas ? `<div class='demo-personas'><b>Value by persona:</b> ${product.Personas.map(persona => `<p>${persona}</p>`).join('')}</div>` : ''}
            </div>
            <div class='demo-right'>
                <div class='thumbnail'>
                    ${product.Thumbnail ? `<img alt='Thumbnail' src='./thumbnails/${product.Thumbnail}'></img>` : '<img alt="Thumbnail" src="./images/thumbnails/thumbnail.png"></img>'}
                </div>
                <div class='demo-links'>
                    ${product.VideoURL ? `<a class='video-link' href='#' onclick="renderVideo('${product.VideoURL}', '${product.VideoReferenceInRegale}'); return false;"> <i class="fa fa-play" aria-hidden="true"></i> Demo video<br/><i class="fa fa-clock-o"></i> ${product.VideoDuration ? product.VideoDuration : '2 min'} </a>` : ''} 
                    ${product.ClickthroughURL ? `<a target='_top' class='demo-link' href='${product.ClickthroughURL}'> <i class="fa fa-mouse-pointer" aria-hidden="true"></i> Interactive demo<br/><i class="fa fa-clock-o"></i> ${product.Duration}</a>` : ''}
                    ${product.RedirectURL ? `<a target='_blank' class='redirect-link' href='${product.RedirectURL}'> <i class="fa fa-external-link" aria-hidden="true"></i> ${product.RedirectLabel}</a>` : ''}
                    ${product.LiveURL ? `<a target='_blank' class='live-link' href='${product.LiveURL}'> <i class="fa fa-external-link" aria-hidden="true"></i> Live demo</a>` : ''}
                </div>
            </div>
            `).join('');
        });

    //show the modal pop-up
    modal.style.display = "block";
}

function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function getDemoItemFromUrl() {
    const demoId = getQueryParameter('did');
    if (demoId) {
        getDemoItem(demoId);
    }
}
function renderVideo(location, referenceUrl) {
    videoRoot = location.substr(0, location.lastIndexOf("/"));
    videoName = videoRoot.split("/")[videoRoot.split("/").length-1];
    videoLink = videoRoot + "/" + videoName;
    videoSrc = location;
	videoPlayerStyle = "<link href='" + videoLink + "_embed.css' rel='stylesheet' type='text/css'>" +
    "<div class='close-video' title='Close video' onclick='closeVideo()'><i class='fa fa-times' aria-hidden='true'></i></div><div class='smart-player-embed-container'><iframe class='smart-player-embed-iframe' id='embeddedSmartPlayerInstance' src='" + 
	videoLink + "_player.html?embedIFrameId=embeddedSmartPlayerInstance' scrolling='no' frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div></div>";
	videoPlaceholder = document.getElementById("videoModal");
	videoPlaceholder.innerHTML = videoPlayerStyle;
    const container = document.getElementById('videoModal');
    container.style.display = 'grid';
    //Render reference page in Regale for tracking purposes
    renderRegaleRef(referenceUrl);
}

function renderRegaleRef(content) {
    const iframe = document.createElement('iframe');
    iframe.srcdoc = content;
    regaleVideoRef.appendChild(iframe);
}

function closeVideo() {
    container = document.getElementById("videoModal");
    if (container) {
        container.style.display = "none";
        container.innerHTML = "";
    }
}

function filterDemos(demos, product, pillar, language) {
    return demos.filter(demo => {
        const productMatch = product === '' || demo.Products.includes(product);
        const pillarMatch = pillar === '' || demo.Pillar === pillar;
        const languageMatch = language === '' || demo.Languages.includes(language);
        return productMatch && pillarMatch && languageMatch;
    });
}

async function handleFilterChange() {
    const product = document.querySelector('input[name="product"]:checked').value;
    const pillar = document.querySelector('input[name="pillar"]:checked').value;
    const language = document.querySelector('input[name="language"]:checked').value;
    const demos = await fetchDemos();
    const filteredDemos = filterDemos(demos, product, pillar, language);
    displayDemos(filteredDemos);
}

function clearFilters(skipForm) {
    filterForms = document.getElementsByTagName("form");
    for(i=0; i < filterForms.length; i++) {
        if(skipForm && filterForms[i].id == skipForm)
        {
            // skip
        } else
        filterForms[i].getElementsByTagName("input")[0].checked = true;
    }
    handleFilterChange();
}

function setPillarFilter(pillarName) {
    pillarForm = document.getElementById("pillar-form");
    inputs = pillarForm.getElementsByTagName("input");
    for (i=0; i < inputs.length; i++) {
        if(inputs[i].value == pillarName) {
            inputs[i].setAttribute("checked", "true");
            handleFilterChange();
        }
    }
}

function resetQueryStringParams() {
    const url = new URL(window.location.href);
    url.search = '';
    window.history.pushState({}, '', url);
}

document.getElementById('product-form').addEventListener('change', handleFilterChange);
document.getElementById('pillar-form').addEventListener('change', handleFilterChange);
document.getElementById('language-form').addEventListener('change', handleFilterChange);

// Initial load
fetchDemos().then(demos => {
    displayDemos(demos);
});

// Modal popup logic
var modal = document.getElementById("demoModal");
var regaleVideoRef = document.getElementById("regaleVideoRef");
var spanClose = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal, and reset any query strings
spanClose.onclick = function () {
    modal.style.display = "none";
    regaleVideoRef.innerHTML = "";
    resetQueryStringParams();
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        resetQueryStringParams();
    }
};

// Initialize pillar category title toggle functionality
function initializePillarToggle() {
    const titles = document.querySelectorAll('.pillar-category-title');
    titles.forEach(title => {
        title.addEventListener('click', function() {
            this.classList.toggle('collapsed');
            const content = this.nextElementSibling;
            if (content && content.classList.contains('pillar-content')) {
                content.classList.toggle('hidden');
            }
        });
    });
}
