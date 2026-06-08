class EduNavigation extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
    <div class="top-navigation">
        <ol>
            <li data="index.html"><a href="./index.html">Home</a></li>
            <li data="secure.html"><a href="secure.html">Protect with Confidence</a></li>
            <li data="ai.html"><a href="ai.html">Reimagine Your School<br/><span>from the classroom to the staffroom</span></a></li>
            <li data="accelerate.html"><a href="accelerate.html">Empower Your Students</a></li>           
            <li data="alldemos.html"><a href="./alldemos.html">All Demos</a></li>
        </ol>
    </div>
        `
    }
}

class EduDemoPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <!-- Modal popup: demo card -->
        <div id="demoModal" class="modal">
            <div class="modal-content">
                <a class="close" title="Close" href=""><i class="fa fa-times" aria-hidden="true"></i></a>
                <div id="demoDetails">
                    Please select a demo item.
                </div>
            </div>
        </div>
        `
    }
}

class EduImageModal extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <!-- Modal popup: image card -->
        <div id="imageModal" class="modal">
            <div class="modal-content">
                <a class="close" title="Close" href=""><i class="fa fa-times" aria-hidden="true"></i></a>
                <div id="imageDetails">
                    Image placeholder.
                </div>
            </div>
        </div>
        `
    }
}

class EduFilter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
    <div id="filter-panel">
        <div class="filter-header">
            <span>Filters</span>
            <div id="clear-filters" onclick="clearFilters();">Clear filters</div>
        </div>
        <hr />
        
        <div class="filter-title filter-pillar">Value Areas</div>
        <form id="pillar-form" class="filter-pillar">
            <label>
                <input type="radio" name="pillar" value="" checked>All
            </label><br>
            <label>
                <input type="radio" name="pillar" value="Empower Students">Empower Students
            </label><br>
            <label>
                <input type="radio" name="pillar" value="Reimagine Your School">Reimagine Your School
            </label><br>
            <label>
                <input type="radio" name="pillar" value="Protect with Confidence">Protect with Confidence
            </label><br>
        </form>

        <div class="filter-title">Products/Features</div>
        <form id="product-form">
            <label><input type="radio" name="product" value="" checked>All</label><br>
            <label><input type="radio" name="product" value="Copilot Notebook">Copilot Notebook</label><br></label>
            <label><input type="radio" name="product" value="Learning Activities">Learning Activities</label><br></label>
            <label><input type="radio" name="product" value="Learning Tools Interoperability (LTI)">Learning Tools Interoperability (LTI)</label><br></label>
            <label><input type="radio" name="product" value="Lesson Plans">Lesson Plans</label><br></label>
            <label><input type="radio" name="product" value="Math Progress">Math Progress</label><br></label>
            <label><input type="radio" name="product" value="Microsoft 365 Copilot">Microsoft 365 Copilot</label><br></label>
            <label><input type="radio" name="product" value="Microsoft 365 Copilot Chat">Microsoft 365 Copilot Chat</label><br></label>
            <label><input type="radio" name="product" value="Microsoft 365 Education">Microsoft 365 Education</label><br></label>
            <label><input type="radio" name="product" value="Microsoft Clipchamp">Microsoft Clipchamp</label><br></label>
            <label><input type="radio" name="product" value="Microsoft Copilot agent">Microsoft Copilot agent</label><br></label>
            <label><input type="radio" name="product" value="Microsoft Defender">Microsoft Defender</label><br></label>
            <label><input type="radio" name="product" value="Microsoft Forms">Microsoft Forms</label><br></label>
            <label><input type="radio" name="product" value="Microsoft Intune">Microsoft Intune</label><br></label>
            <label><input type="radio" name="product" value="Microsoft OneDrive">Microsoft OneDrive</label><br></label>
            <label><input type="radio" name="product" value="Microsoft Outlook">Microsoft Outlook</label><br></label>
            <label><input type="radio" name="product" value="Microsoft PowerPoint">Microsoft PowerPoint</label><br></label>
            <label><input type="radio" name="product" value="Microsoft Reading Coach">Microsoft Reading Coach</label><br></label>
            <label><input type="radio" name="product" value="Microsoft Reflect">Microsoft Reflect</label><br></label>
            <label><input type="radio" name="product" value="Microsoft Teams">Microsoft Teams</label><br></label>
            <label><input type="radio" name="product" value="Microsoft Word">Microsoft Word</label><br></label>
            <label><input type="radio" name="product" value="Reading Progress">Reading Progress</label><br></label>
            <label><input type="radio" name="product" value="Search Coach">Search Coach</label><br></label>
            <label><input type="radio" name="product" value="Search Progress">Search Progress</label><br></label>
            <label><input type="radio" name="product" value="Security Copilot">Security Copilot</label><br></label>
            <label><input type="radio" name="product" value="Speaker Coach">Speaker Coach</label><br></label>
            <label><input type="radio" name="product" value="Speaker Progress">Speaker Progress</label><br></label>
            <label><input type="radio" name="product" value="Standards">Standards</label><br></label>
        </form>

        <div class="filter-title" style="display:none;">Audience</div>
        <form id="audience-form" style="display:none;">
            <label>
                <input type="radio" name="audience" value="" checked>All
            </label><br>
            <label>
                <input type="radio" name="audience" value="Students">Students
            </label><br>
            <label>
                <input type="radio" name="audience" value="Instructors">Instructors
            </label><br>
            <label>
                <input type="radio" name="audience" value="Administrators">Administrators
            </label>
        </form>
        
        <div class="filter-title" style="display:none;">Languages</div>
        <form id="language-form" style="display:none;">
            <label>
                <input type="radio" name="language" value="" checked>All
            </label><br>
            <label>
                <input type="radio" name="language" value="English">English
            </label><br>
            <label>
                <input type="radio" name="language" value="Spanish">Spanish
            </label>
        </form>
    </div>
        `
    }
}

customElements.define('app-navigation', EduNavigation);
customElements.define('app-filter-panel', EduFilter);
customElements.define('app-demo-page', EduDemoPage);
customElements.define('app-image-modal', EduImageModal);

//Highlight current nav item based on page URL
nav = document.querySelector(".top-navigation");
path = document.location.pathname;
file = path.substring(path.lastIndexOf("/")+1,path.length)
if(nav) {
    el = document.querySelector("[data='" + file + "']");
    el.setAttribute("class","selected");
}
