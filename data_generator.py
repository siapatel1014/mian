from __future__ import annotations
import random
from datetime import date, timedelta
import pandas as pd

def make_demo_data(n: int = 160, seed: int = 42) -> pd.DataFrame:
    random.seed(seed)
    sites = ["SITE-001", "SITE-002", "SITE-003", "SITE-004", "SITE-005"]
    subjects = [f"SUBJ-{i:03d}" for i in range(1, 41)]
    banned = ["Warfarin", "Rifampicin", "St John's Wort"]
    rows = []
    start = date.today() - timedelta(days=120)

    for i in range(n):
        visit_date = start + timedelta(days=random.randint(0, 119))
        site = random.choice(sites)
        subject = random.choice(subjects)
        planned = random.choice([1, 2, 3, 4])
        actual = planned if random.random() > 0.12 else random.choice([0, 1, 3, 5])
        expected_dose = 100
        actual_dose = expected_dose if random.random() > 0.10 else random.choice([50, 75, 125, 150])
        medication = random.choice(["None", "Paracetamol", "Warfarin", "Rifampicin", "Vitamin D", "St John's Wort"])
        source = random.choice(["EDC", "Site Upload", "ePRO"])

        rows.append({
            "visit_id": f"VIS-{i+1:04d}",
            "site_id": site,
            "subject_id": subject,
            "visit_date": visit_date.isoformat(),
            "planned_visit": planned,
            "actual_visit": actual,
            "expected_dose_mg": expected_dose,
            "actual_dose_mg": actual_dose,
            "concomitant_medication": medication,
            "data_source": source,
        })
    return pd.DataFrame(rows)
