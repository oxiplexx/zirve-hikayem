"""
Vercel entry point for Zirve Hikayem backend
"""
import os
import sys
from pathlib import Path

# Add the backend directory to Python path
backend_dir = Path(__file__).parent
sys.path.insert(0, str(backend_dir))

# Import the FastAPI app
from server import app

# Vercel handler
def handler(event, context):
    """Vercel serverless function handler"""
    return app

# For local development
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0", 
        port=int(os.environ.get("PORT", 8000)),
        reload=True
    )