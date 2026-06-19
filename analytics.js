// Azure Application Insights — replace the connection string with your own
const AI_CONNECTION_STRING = 'InstrumentationKey=3c2c3d51-1af3-4956-923e-a18c73350774;IngestionEndpoint=https://centralus-2.in.applicationinsights.azure.com/;LiveEndpoint=https://centralus.livediagnostics.monitor.azure.com/;ApplicationId=a06f70c3-5dad-425b-8038-91fd964e33fd';

!(function (cfg) {
    var S, u, e;
    function n(i) {
        t[i] = function () { var n = arguments; t.queue.push(function () { t[i].apply(t, n) }) }
    }
    var t = { initialize: true, queue: [], sv: '8', version: 2, config: cfg };
    cfg.src = 'https://js.monitor.azure.com/scripts/b/ai.3.gbl.min.js';
    S = document; u = window; e = 'script';
    var r = S.createElement(e);
    r.async = true; r.src = cfg.src;
    var o = S.getElementsByTagName(e)[0];
    o.parentNode.insertBefore(r, o);
    ['trackEvent', 'trackPageView', 'trackException', 'trackTrace'].forEach(n);
    u.appInsights = u.appInsights || t;
    t.queue.push(function () {
        u.appInsights.config = cfg;
    });
}({
    connectionString: AI_CONNECTION_STRING,
    enableAutoRouteTracking: true
}));

function trackEvent(name, properties) {
    if (window.appInsights && typeof window.appInsights.trackEvent === 'function') {
        window.appInsights.trackEvent({ name: name }, properties || {});
    }
}
