from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/login")
async def login(request: Request):
    body = await request.body()
    print("[backend] /login received method=", request.method)
    print("[backend] headers=", dict(request.headers))
    try:
        print("[backend] body=", body.decode('utf-8'))
    except Exception:
        print("[backend] body (raw)=", body)
    return {"access_token": "access_token", "username": "xxxx", "avatar": "avatar"}


@app.post("/logout")
async def logout(request: Request):
    print("[backend] /logout received method=", request.method)
    return {"message": "Logout endpoint"}


@app.get("/user/info")
async def user_info(request: Request):
    print("[backend] /user/info received method=", request.method)
    return {"message": "User info endpoint"}
