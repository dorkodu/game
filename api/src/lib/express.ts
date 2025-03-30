import cookieParser from "cookie-parser"
import _express from "express"

export const express = _express()
express.set("trust proxy", true)
express.disable("x-powered-by")
express.use(_express.json())
express.use(cookieParser())
