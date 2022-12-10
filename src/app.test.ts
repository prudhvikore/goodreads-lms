import app from "./app"
import request from "supertest"


describe("testing invalid route",()=> {
    it("should give error on invalid route",async()=> {
        const res=await request(app).get("/abcd")
        expect(res.status).toBe(404)
    })
    it("should give 200 as status",async()=> {
        const response=await request(app).get("/")
        expect (response.status).toBe(200)
    })
})