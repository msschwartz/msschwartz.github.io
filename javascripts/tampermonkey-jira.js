// ==UserScript==
// @name         Jira Title Change for TrackingTime
// @description  Change the title in jira to be something useable in Tracking Time (Don't forget to add your custom domains in Tracking Time extension).
// @namespace    https://msschwartz.github.io
// @version      1.1
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
            // const ticketName = ttc.attributes['data-task_name'].value;
            const title = document.querySelector('[data-test-id="issue.views.issue-base.foundation.summary.heading"]') || document.querySelector("#summary-val");
            if (ticketId && title && title.innerHTML.indexOf(ticketId) === -1) {
                lastTtc = ttc;
                title.innerHTML = `${ticketId} | ${title.innerHTML}`;
            }
        }
    });

    observer.observe(body, { subtree: true, childList: true });
})();
