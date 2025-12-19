#!/bin/bash
cd ml_backend
python -m uvicorn api:app --host 0.0.0.0 --port 8000 --reload
