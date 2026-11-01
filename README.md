# CliniGuard AI — Clinical Trial Risk Monitor

**Track:** AI  
**Problem Statement:** P1 — Clinical Trial Risk Monitor & Protocol Deviation Detector  
**Team:** [YOUR TEAM NAME]

## Problem
Clinical trials involve thousands of patient visits across many sites. Protocol deviations such as missed visits, incorrect dosing, and prohibited co-medications can remain hidden until an audit. This creates regulatory, cost, and patient-safety risk.

## Solution
CliniGuard AI is a lightweight clinical-trial monitoring dashboard that compares visit records with a protocol specification, detects and classifies deviations, scores site risk using leading indicators, and generates CAPA-ready recommendations.

The MVP is designed for **synthetic/demo data only** and does not make medical decisions.

## Key Features
1. Protocol-aware deviation detection: missed visit, dose variance, banned co-medication and other rule violations.
2. Severity classification: Major / Minor / Administrative.
3. Site risk score based on deviation frequency, severity and recent trends.
4. CAPA-ready report generation.
5. Interactive Streamlit dashboard with filters and downloadable CSV/JSON reports.
6. IBM Bob-assisted engineering workflow documented in `docs/bob-integration.md`.

## Tech Stack
- Python 3.11+
- Streamlit
- Pandas
- Plotly
- PyYAML
- IBM Bob for AI-assisted software engineering and repository workflow

## Quick Start
```bash
cd src
python -m venv .venv
# Windows:
.venv\Scripts\activate
# macOS/Linux:
# source .venv/bin/activate
pip install -r requirements.txt
streamlit run app.py
```

Open the local URL shown by Streamlit.

## Demo
- Video: `demo/demo-video-link.txt`
- Live demo: `demo/live-demo-url.txt`
- Screenshots: `demo/screenshots/`

## Data
The included data is synthetic and contains no real patient information.

## Known Limitations
- The MVP uses deterministic protocol rules rather than a validated clinical ML model.
- Risk scores are decision-support indicators, not regulatory determinations.
- Real deployments would require validated data pipelines, audit trails, access control, privacy/security controls and clinical/regulatory validation.

## What We're Most Proud Of
The strongest part of this MVP is the end-to-end path from protocol rules → deviation detection → site-level risk → actionable CAPA recommendations, with explainable reasons for every flagged record.
