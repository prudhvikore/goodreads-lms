import app from "../../app";
import sinon from "sinon";
import request from "supertest";
import userQueries from "../../queries/user_query/user_queries";

describe("/login test", () => {
  afterEach(() => {
    sinon.restore();
  });
  it("should fail on invalid username", async () => {
    const response: request.Response = await request(app)
      .post("/login")
      .send({});
    expect(response.status).toBe(400);
  });
  it("should get a response", async () => {
    sinon.stub(userQueries, "get_user_query").resolves({
      id: 101,
      username: "prudhvi",
      email: "prudhvi@gmail.com",
      password: "$2b$10$GCAGKSKQWdPfspiPWKwNTO3GdKg.PL2iSd8bI.dmV4cP497ar39Re",
      role: "ADMIN",
    });
    const response = await request(app)
      .post("/login")
      .send({ username: "prudhvi", password: "prudhvi" });
    expect(response.status).toBe(200);
  });
  it("should give jwt object",async()=> {
    sinon.stub(userQueries,"get_user_query").resolves({
      id: 101,
      username: "prudhvi",
      email: "prudhvi@gmail.com",
      password: "$2b$10$GCAGKSKQWdPfspiPWKwNTO3GdKg.PL2iSd8bI.dmV4cP497ar39Re",
      role: "ADMIN",
    });
    const response=await request(app).post("/login").send({username:"prudhvi",password:"abcdef"});
    expect(response.status).toBe(401)
  })
  it("should throw 404 error", async () => {
    sinon.stub(userQueries, "get_user_query").resolves(undefined);
    const response = await request(app)
      .post("/login")
      .send({ username: "abcd", password: "acbc" });
    expect(response.status).toBe(404);
  });
  it("should throw 500 error", async () => {
    sinon.stub(userQueries, "get_user_query").rejects({});
    const response = await request(app)
      .post("/login")
      .send({ username: "abcd", password: "abcdefghh" });
    expect(response.status).toBe(500);
  });
});
