from __future__ import annotations
import pandas as pd

BANNED_MEDICATIONS = {"Warfarin", "Rifampicin", "St John's Wort"}

def detect_deviations(df: pd.DataFrame) -> pd.DataFrame:
    out = df.copy()
    out["deviation_types"] = ""
    out["severity"] = "Administrative"
    out["reason"] = ""

    for idx, r in out.iterrows():
        issues = []
        severities = []

        if r["actual_visit"] == 0:
            issues.append("Missed visit")
            severities.append("Major")
        elif r["actual_visit"] != r["planned_visit"]:
            issues.append("Visit schedule variance")
            severities.append("Minor")

        if r["actual_dose_mg"] != r["expected_dose_mg"]:
            issues.append("Dose variance")
            severities.append("Major" if abs(r["actual_dose_mg"] - r["expected_dose_mg"]) >= 50 else "Minor")

        if r["concomitant_medication"] in BANNED_MEDICATIONS:
            issues.append("Prohibited co-medication")
            severities.append("Major")

        if issues:
            out.at[idx, "deviation_types"] = "; ".join(issues)
            rank = {"Major": 3, "Minor": 2, "Administrative": 1}
            out.at[idx, "severity"] = max(severities, key=lambda x: rank[x])
            out.at[idx, "reason"] = " | ".join(issues)
        else:
            out.at[idx, "reason"] = "No protocol deviation detected"

    return out

def score_sites(deviations: pd.DataFrame) -> pd.DataFrame:
    scored = []
    for site, g in deviations.groupby("site_id"):
        total = len(g)
        major = int((g["severity"] == "Major").sum())
        minor = int((g["severity"] == "Minor").sum())
        deviation_rate = round((g["deviation_types"] != "").mean() * 100, 1)
        score = min(100, round(deviation_rate * 0.55 + major / max(total,1) * 100 * 0.35 + minor / max(total,1) * 100 * 0.10))
        level = "High" if score >= 60 else "Medium" if score >= 30 else "Low"
        scored.append({
            "site_id": site,
            "risk_score": score,
            "risk_level": level,
            "deviation_rate_pct": deviation_rate,
            "major_deviations": major,
            "minor_deviations": minor,
            "records_reviewed": total,
        })
    return pd.DataFrame(scored).sort_values("risk_score", ascending=False)

def recommend_capa(site_row: pd.Series) -> list[str]:
    actions = []
    if site_row["major_deviations"] > 0:
        actions.append("Perform targeted source-data review for major deviations.")
    if site_row["deviation_rate_pct"] >= 30:
        actions.append("Schedule site retraining on protocol adherence and visit procedures.")
    if site_row["minor_deviations"] >= 5:
        actions.append("Review recurring administrative/process deviations and update site checklist.")
    if not actions:
        actions.append("Continue routine monitoring and trend review.")
    return actions
