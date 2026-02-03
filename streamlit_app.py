from pathlib import Path

import numpy as np
from PIL import Image
import streamlit as st
from ultralytics import YOLO


APP_DIR = Path(__file__).resolve().parent
MODEL_PATHS = [
    APP_DIR / "best.pt",
    APP_DIR / "web" / "best.pt",
]


def load_model() -> YOLO:
    for candidate in MODEL_PATHS:
        if candidate.exists():
            return YOLO(str(candidate))
    raise FileNotFoundError(
        "best.pt not found. Place it at repo root or in web/best.pt."
    )


@st.cache_resource
def get_model() -> YOLO:
    return load_model()


st.set_page_config(page_title="Coffee Cherry Detection", layout="centered")
st.title("Coffee Cherry Detection")
st.write("Upload an image to run detection with `best.pt`.")

uploaded = st.file_uploader("Choose an image", type=["jpg", "jpeg", "png", "webp"])

if uploaded:
    image = Image.open(uploaded).convert("RGB")
    st.image(image, caption="Input", use_container_width=True)

    model = get_model()
    results = model.predict(
        source=np.array(image), imgsz=320, conf=0.25, verbose=False
    )

    annotated = results[0].plot()
    st.image(annotated, caption="Detections", use_container_width=True)

    if results[0].boxes is not None and results[0].boxes.cls is not None:
        class_ids = results[0].boxes.cls.tolist()
        names = results[0].names
        counts = {}
        for class_id in class_ids:
            label = names.get(int(class_id), str(int(class_id)))
            counts[label] = counts.get(label, 0) + 1
        if counts:
            st.subheader("Counts")
            st.json(counts)
        else:
            st.info("No detections found.")
    else:
        st.info("No detections found.")
