// ==UserScript==
// @name         Jira Title Change for TrackingTime
// @description  Change the title in jira to be something useable in TrackingTime (Don't forget to add your custom domains in TrackingTime extension).
// @namespace    https://msschwartz.github.io
// @version      1.3
// @author       Michael Schwartz
// @match        https://*.atlassian.net/*
// @match        https://jira.dm.nfl.com/*
// @grant        none
// @noframes     true
// ==/UserScript==
(function () {
    "use strict";
    var MutationObserver =
        window.MutationObserver ||
        window.WebKitMutationObserver ||
        window.MozMutationObserver;

    let lastTtc = false;

    const body = document.querySelector("body");

    const observer = new MutationObserver(mutations => {
        const ttc = document.querySelector(".ttC");
        if (ttc && ttc !== lastTtc) {
            const ticketId = ttc.attributes['data-task_domain_id'].value;
            const title = document.querySelector('[data-test-id="issue.views.issue-base.foundation.summary.heading"]') || document.querySelector("#summary-val");
            if (ticketId && title && title.innerHTML.indexOf(ticketId) === -1) {
                lastTtc = ttc;
                title.innerHTML = `${ticketId} | ${title.innerHTML}`;
            }
        }
    });

    observer.observe(body, { subtree: true, childList: true });
})();
