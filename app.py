from __future__ import annotations
import sys
from pathlib import Path
sys.path.append(str(Path(__file__).parent))

import streamlit as st
import pandas as pd
import plotly.express as px

from data_generator import make_demo_data
from engine import detect_deviations, score_sites
from reports import build_capa_report

st.set_page_config(page_title="CliniGuard AI", page_icon="🧬", layout="wide")

@st.cache_data
def load():
    raw = make_demo_data()
    return detect_deviations(raw)

df = load()
sites = score_sites(df)

st.title("🧬 CliniGuard AI")
st.caption("Clinical Trial Risk Monitor & Protocol Deviation Detector — synthetic demo")

with st.sidebar:
    st.header("Monitoring Filters")
    site_filter = st.multiselect("Site", sorted(df.site_id.unique()), default=sorted(df.site_id.unique()))
    severity_filter = st.multiselect("Severity", ["Major", "Minor", "Administrative"], default=["Major", "Minor", "Administrative"])

view = df[df.site_id.isin(site_filter) & df.severity.isin(severity_filter)].copy()
flagged = view[view.deviation_types != ""]

c1, c2, c3, c4 = st.columns(4)
c1.metric("Records reviewed", len(view))
c2.metric("Flagged records", len(flagged))
c3.metric("Major deviations", int((view.severity == "Major").sum()))
c4.metric("High-risk sites", int((sites.risk_level == "High").sum()))

st.subheader("Site Risk Overview")
st.dataframe(sites, use_container_width=True, hide_index=True)

fig = px.bar(sites, x="site_id", y="risk_score", color="risk_level",
             title="Explainable Site Risk Score", range_y=[0,100])
st.plotly_chart(fig, use_container_width=True)

st.subheader("Protocol Deviations")
if flagged.empty:
    st.success("No deviations match the selected filters.")
else:
    st.dataframe(flagged[[
        "visit_id","site_id","subject_id","visit_date",
        "deviation_types","severity","reason"
    ]].sort_values("visit_date", ascending=False), use_container_width=True, hide_index=True)

st.subheader("CAPA-ready Site Report")
selected_site = st.selectbox("Select a site", sites.site_id.tolist())
row = sites[sites.site_id == selected_site].iloc[0]
report = build_capa_report(selected_site, row, df)
st.code(report, language="json")
st.download_button(
    "Download CAPA report",
    data=report,
    file_name=f"{selected_site}_capa_report.json",
    mime="application/json"
)

st.info("Demo safety note: this application uses synthetic records and deterministic rules. It is not a validated clinical or regulatory system.")
