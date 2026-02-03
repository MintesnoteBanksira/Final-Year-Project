## Deploy on Streamlit Community Cloud

1. Push this repo to GitHub.
2. Go to https://share.streamlit.io and sign in.
3. Click **New app** and select your repo/branch.
4. Set **Main file path** to `streamlit_app.py`.
5. Click **Deploy**.

If deployment fails due to dependencies:
- Re-run with a clean build on the app settings page.
- Ensure `requirements.txt` is committed at the repo root.

Notes:
- The app expects `best.pt` at the repo root or in `web/best.pt`.
- Large model files may need Git LFS if they exceed GitHub limits.
