const deviations = [

    {
        id: "DEV-1027",
        site: "SITE-004",
        subject: "SUBJ-014",
        type: "Missed Visit",
        date: "14 Sep 2026",
        severity: "Major",
        status: "Open"
    },

    {
        id: "DEV-1026",
        site: "SITE-002",
        subject: "SUBJ-031",
        type: "Dose Variance",
        date: "14 Sep 2026",
        severity: "Major",
        status: "Open"
    },

    {
        id: "DEV-1025",
        site: "SITE-009",
        subject: "SUBJ-008",
        type: "Prohibited Medication",
        date: "13 Sep 2026",
        severity: "Major",
        status: "Under Review"
    },

    {
        id: "DEV-1024",
        site: "SITE-004",
        subject: "SUBJ-021",
        type: "Visit Schedule Variance",
        date: "13 Sep 2026",
        severity: "Minor",
        status: "Open"
    },

    {
        id: "DEV-1023",
        site: "SITE-007",
        subject: "SUBJ-006",
        type: "Dose Variance",
        date: "12 Sep 2026",
        severity: "Minor",
        status: "Resolved"
    },

    {
        id: "DEV-1022",
        site: "SITE-004",
        subject: "SUBJ-032",
        type: "Missed Visit",
        date: "12 Sep 2026",
        severity: "Major",
        status: "Open"
    },

    {
        id: "DEV-1021",
        site: "SITE-001",
        subject: "SUBJ-019",
        type: "Documentation Issue",
        date: "11 Sep 2026",
        severity: "Administrative",
        status: "Resolved"
    },

    {
        id: "DEV-1020",
        site: "SITE-009",
        subject: "SUBJ-024",
        type: "Dose Variance",
        date: "11 Sep 2026",
        severity: "Major",
        status: "Under Review"
    },

    {
        id: "DEV-1019",
        site: "SITE-002",
        subject: "SUBJ-017",
        type: "Missed Visit",
        date: "10 Sep 2026",
        severity: "Major",
        status: "Open"
    },

    {
        id: "DEV-1018",
        site: "SITE-007",
        subject: "SUBJ-029",
        type: "Visit Schedule Variance",
        date: "09 Sep 2026",
        severity: "Minor",
        status: "Resolved"
    },

    {
        id: "DEV-1017",
        site: "SITE-004",
        subject: "SUBJ-011",
        type: "Prohibited Medication",
        date: "09 Sep 2026",
        severity: "Major",
        status: "Open"
    },

    {
        id: "DEV-1016",
        site: "SITE-001",
        subject: "SUBJ-004",
        type: "Documentation Issue",
        date: "08 Sep 2026",
        severity: "Administrative",
        status: "Resolved"
    }

];


/* ================= LOGIN ================= */

document
    .getElementById("loginForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (!email || !password) {
            showToast("Please enter email and password.");
            return;
        }

        login();

    });


function demoLogin() {

    document.getElementById("email").value =
        "monitor@clinigard.ai";

    document.getElementById("password").value =
        "demo123";

    login();

}


function login() {

    document
        .getElementById("loginPage")
        .classList.add("hidden");

    document
        .getElementById("app")
        .classList.remove("hidden");

    renderRecentTable();
    renderDeviationTable();

    setTimeout(() => {
        createCharts();
    }, 100);

    showToast("Welcome to CliniGuard AI");

}


function logout() {

    document
        .getElementById("app")
        .classList.add("hidden");

    document
        .getElementById("loginPage")
        .classList.remove("hidden");

    showToast("Logged out successfully.");

}


/* ================= PASSWORD ================= */

function togglePassword() {

    const password =
        document.getElementById("password");

    password.type =
        password.type === "password"
            ? "text"
            : "password";

}


/* ================= NAVIGATION ================= */

function showPage(pageId, clickedButton = null) {

    document
        .querySelectorAll(".page")
        .forEach(page => {

            page.classList.remove("active-page");

        });


    const selectedPage =
        document.getElementById(pageId);

    if (selectedPage) {

        selectedPage.classList.add("active-page");

    }


    document
        .querySelectorAll(".nav-item")
        .forEach(button => {

            button.classList.remove("active");

        });


    if (clickedButton) {

        clickedButton.classList.add("active");

    } else {

        const button =
            document.querySelector(
                `.nav-item[onclick*="'${pageId}'"]`
            );

        if (button) {
            button.classList.add("active");
        }

    }


    const titles = {

        dashboard: "Dashboard",
        deviations: "Protocol Deviations",
        sites: "Site Risk",
        reports: "Reports",
        protocol: "Protocol",
        about: "About Project"

    };

    document.getElementById("topTitle").textContent =
        titles[pageId] || "Dashboard";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* ================= MOBILE SIDEBAR ================= */

function toggleSidebar() {

    document
        .querySelector(".sidebar")
        .classList.toggle("open");

}


/* ================= TABLE ================= */

function getSeverityBadge(severity) {

    if (severity === "Major") {

        return `<span class="badge major">MAJOR</span>`;

    }

    if (severity === "Minor") {

        return `<span class="badge warning">MINOR</span>`;

    }

    return `<span class="badge blue">ADMIN</span>`;

}


function getStatusBadge(status) {

    if (status === "Open") {

        return `<span class="badge major">OPEN</span>`;

    }

    if (status === "Under Review") {

        return `<span class="badge warning">REVIEW</span>`;

    }

    return `<span class="badge success">RESOLVED</span>`;

}


function renderRecentTable() {

    const table =
        document.getElementById("recentTable");

    table.innerHTML = "";

    deviations.slice(0, 6).forEach(item => {

        const row =
            document.createElement("tr");

        row.innerHTML = `

            <td>
                <strong>${item.id}</strong>
            </td>

            <td>${item.site}</td>

            <td>${item.subject}</td>

            <td>${item.type}</td>

            <td>${item.date}</td>

            <td>
                ${getSeverityBadge(item.severity)}
            </td>

            <td>
                ${getStatusBadge(item.status)}
            </td>

        `;

        table.appendChild(row);

    });

}


function renderDeviationTable(data = deviations) {

    const table =
        document.getElementById("deviationTable");

    table.innerHTML = "";

    data.forEach(item => {

        const row =
            document.createElement("tr");

        row.innerHTML = `

            <td>
                <strong>${item.id}</strong>
            </td>

            <td>${item.site}</td>

            <td>${item.subject}</td>

            <td>${item.type}</td>

            <td>${item.date}</td>

            <td>
                ${getSeverityBadge(item.severity)}
            </td>

            <td>

                <button
                    class="action-btn"
                    onclick="viewDeviation('${item.id}')"
                >
                    View
                </button>

            </td>

        `;

        table.appendChild(row);

    });


    document.getElementById("deviationCount").textContent =
        `Showing ${data.length} deviations`;

}


/* ================= SEARCH / FILTER ================= */

function filterDeviations() {

    const search =
        document
            .getElementById("searchDeviation")
            .value
            .toLowerCase();

    const severity =
        document
            .getElementById("severityFilter")
            .value;


    const filtered =
        deviations.filter(item => {

            const matchesSearch =
                item.id.toLowerCase().includes(search) ||
                item.site.toLowerCase().includes(search) ||
                item.subject.toLowerCase().includes(search) ||
                item.type.toLowerCase().includes(search);

            const matchesSeverity =
                severity === "all" ||
                item.severity === severity;

            return matchesSearch && matchesSeverity;

        });


    renderDeviationTable(filtered);

}


/* ================= DEVIATION DETAILS ================= */

function viewDeviation(id) {

    const item =
        deviations.find(
            deviation => deviation.id === id
        );

    if (!item) return;

    document.getElementById("modalSite").textContent =
        item.site;

    document.querySelector(".modal-score strong").textContent =
        item.severity === "Major" ? "88" : "42";

    document.querySelector(".modal-score span").textContent =
        `${item.severity.toUpperCase()} DEVIATION`;

    document.querySelector(".modal-content h3").textContent =
        item.type;

    document.querySelector(".modal-content > p").textContent =
        `AI analysis detected a ${item.type.toLowerCase()} for ${item.subject} at ${item.site}. The record should be reviewed against the approved protocol and source documentation.`;

    document
        .getElementById("modal")
        .classList.remove("hidden");

}


function closeModal() {

    document
        .getElementById("modal")
        .classList.add("hidden");

}


function showSiteDetails(site) {

    document.getElementById("modalSite").textContent =
        site;

    document
        .getElementById("modal")
        .classList.remove("hidden");

}


/* ================= AI SCAN ================= */

function runScan() {

    showToast("✦ AI scan started...");

    setTimeout(() => {

        showToast(
            "AI scan complete — 3 new deviations detected."
        );

    }, 1800);

}


/* ================= CHARTS ================= */

let trendChart;
let riskChart;


function createCharts() {

    const trendCanvas =
        document.getElementById("trendChart");

    if (!trendCanvas) return;


    if (trendChart) {
        trendChart.destroy();
    }


    trendChart =
        new Chart(
            trendCanvas,
            {

                type: "line",

                data: {

                    labels: [
                        "Aug 16",
                        "Aug 20",
                        "Aug 24",
                        "Aug 28",
                        "Sep 1",
                        "Sep 5",
                        "Sep 9",
                        "Sep 14"
                    ],

                    datasets: [

                        {
                            label: "Major",
                            data: [4, 6, 5, 8, 7, 9, 11, 13],
                            borderColor: "#ef4444",
                            backgroundColor: "rgba(239,68,68,.08)",
                            fill: true,
                            tension: .4
                        },

                        {
                            label: "Minor",
                            data: [8, 9, 11, 10, 13, 12, 14, 16],
                            borderColor: "#f59e0b",
                            backgroundColor: "rgba(245,158,11,.05)",
                            fill: true,
                            tension: .4
                        }

                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    plugins: {

                        legend: {
                            position: "bottom",
                            labels: {
                                boxWidth: 8,
                                font: {
                                    size: 9
                                }
                            }
                        }

                    },

                    scales: {

                        y: {
                            beginAtZero: true,
                            grid: {
                                color: "#f1f5f9"
                            }
                        },

                        x: {
                            grid: {
                                display: false
                            }
                        }

                    }

                }

            }

        );


    const riskCanvas =
        document.getElementById("riskChart");

    if (!riskCanvas) return;


    if (riskChart) {
        riskChart.destroy();
    }


    riskChart =
        new Chart(
            riskCanvas,
            {

                type: "doughnut",

                data: {

                    labels: [
                        "High Risk",
                        "Medium Risk",
                        "Low Risk"
                    ],

                    datasets: [

                        {
                            data: [4, 5, 3],
                            backgroundColor: [
                                "#ef4444",
                                "#f59e0b",
                                "#22c55e"
                            ],
                            borderWidth: 0
                        }

                    ]

                },

                options: {

                    cutout: "72%",

                    plugins: {

                        legend: {
                            display: false
                        }

                    }

                }

            }

        );

}


/* ================= CHART FILTER ================= */

function updateChart() {

    const value =
        document.getElementById("trendFilter").value;

    showToast(
        `Showing ${value.toLowerCase()} data`
    );

}


/* ================= RISK ================= */

function refreshRisk() {

    showToast("Refreshing AI risk analysis...");

    setTimeout(() => {

        showToast("Risk analysis updated.");

    }, 1200);

}


/* ================= REPORT ================= */

function generateReport() {

    showPage("reports");

    showToast(
        "CAPA report generated successfully."
    );

}


function downloadReport() {

    const report =
        document.getElementById("reportContent").innerText;

    const blob =
        new Blob(
            [report],
            {
                type: "text/plain"
            }
        );

    const url =
        URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    link.href = url;

    link.download =
        "CliniGuard_CAPA_Report.txt";

    link.click();

    URL.revokeObjectURL(url);

    showToast("CAPA report downloaded.");

}


/* ================= EXPORT ================= */

function exportData() {

    let csv =
        "ID,Site,Subject,Deviation,Date,Severity,Status\n";

    deviations.forEach(item => {

        csv +=
            `${item.id},${item.site},${item.subject},"${item.type}",${item.date},${item.severity},${item.status}\n`;

    });


    const blob =
        new Blob(
            [csv],
            {
                type: "text/csv"
            }
        );

    const url =
        URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    link.href = url;

    link.download =
        "CliniGuard_Deviations.csv";

    link.click();

    URL.revokeObjectURL(url);

    showToast("Deviation data exported.");

}


/* ================= PROTOCOL ================= */

function saveProtocol() {

    showToast(
        "Protocol rules saved locally for this demo."
    );

}


/* ================= NOTIFICATIONS ================= */

function showNotifications() {

    showToast(
        "3 new high-priority deviations require review."
    );

}


/* ================= TOAST ================= */

let toastTimer;

function showToast(message) {

    const toast =
        document.getElementById("toast");

    toast.querySelector("p").textContent =
        message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 3000);

}


/* ================= INITIALIZATION ================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "CliniGuard AI Frontend loaded."
        );

    }
);