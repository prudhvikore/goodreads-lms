import app from "../../app";
import sinon from "sinon";
import request from "supertest";
import book_shelf_query from "../../queries/book_shelf_query/book_shelf_query";
import books_query from "../../queries/books_query/books_query";

describe("/book_shelf test", () => {
  afterEach(() => {
    sinon.restore();
  });
  it("should throw error: something went wrong", async () => {
    sinon.stub(book_shelf_query, "get_book_shelf_query").rejects();
    const response = await request(app)
      .get("/bookshelf")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMDEsInVzZXJuYW1lIjoicHJ1ZGh2aSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY3MDI1NjI3M30.a23LnYdHRVOlT3vMOCoMgC_LNA7coAhRAr7YRQ3-a5w"
      );
    expect(response.status).toBe(500);
    expect(response.body.message).toBe("something went wrong");
  });
  it("should get book_shelf", async () => {
    sinon.stub(book_shelf_query, "get_book_shelf_query").resolves();
    const response = await request(app)
      .get("/bookshelf")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMDEsInVzZXJuYW1lIjoicHJ1ZGh2aSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY3MDI1NjI3M30.a23LnYdHRVOlT3vMOCoMgC_LNA7coAhRAr7YRQ3-a5w"
      );
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("success");
  });
  it("should get book_shelf", async () => {
    sinon.stub(book_shelf_query, "get_book_shelf_query").resolves();
    const response = await request(app).get("/bookshelf");
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("JWT token is missing");
  });
  it("should get book_shelf", async () => {
    sinon.stub(book_shelf_query, "get_book_shelf_query").resolves();
    const response = await request(app)
      .get("/bookshelf")
      .set("Authorization", "Bearer vMOCoMgC_LNA7coAhRAr7YRQ3-a5w");
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid JWT Token");
  });
});

describe("/bookshelf/return test", () => {
  afterEach(() => {
    sinon.restore();
  });
  it("should update return status", async () => {
    sinon.stub(book_shelf_query, "update_rental_status").resolves({
      rental_id: 9,
      book_id: 1014,
      user_id: 101,
      rented_on: "2022-12-08T10:39:55.384Z",
      rental_expiry: "2022-12-15T10:39:55.382Z",
      rental_status: "WITH USER",
    });
    sinon.stub(books_query, "update_book_quantity").resolves({ quntity: 6 });
    const response = await request(app)
      .post("/bookshelf/return/9")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMDEsInVzZXJuYW1lIjoicHJ1ZGh2aSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY3MDI1NjI3M30.a23LnYdHRVOlT3vMOCoMgC_LNA7coAhRAr7YRQ3-a5w"
      );
    expect(response.status).toBe(200);
  });
  it("should throw error code 500", async () => {
    sinon.stub(book_shelf_query, "update_rental_status").resolves(undefined);
    const response = await request(app)
      .post("/bookshelf/return/9")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMDEsInVzZXJuYW1lIjoicHJ1ZGh2aSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY3MDI1NjI3M30.a23LnYdHRVOlT3vMOCoMgC_LNA7coAhRAr7YRQ3-a5w"
      );
    expect(response.status).toBe(500);
  });
  it("should update message success", async () => {
    sinon.stub(book_shelf_query, "update_rental_status").resolves({
      rental_id: 9,
      book_id: 1014,
      user_id: 101,
      rented_on: "2022-12-08T10:39:55.384Z",
      rental_expiry: "2022-12-15T10:39:55.382Z",
      rental_status: "WITH USER",
    });
    sinon.stub(books_query, "update_book_quantity").resolves({ quntity: 6 });
    const response = await request(app)
      .post("/bookshelf/return/9")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMDEsInVzZXJuYW1lIjoicHJ1ZGh2aSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY3MDI1NjI3M30.a23LnYdHRVOlT3vMOCoMgC_LNA7coAhRAr7YRQ3-a5w"
      );
    expect(response.body.message).toBe("success");
  });
  it("should throw error book already returned", async () => {
    sinon.stub(book_shelf_query, "update_rental_status").resolves({
      rental_id: 13,
      book_id: 1014,
      user_id: 101,
      rented_on: "2022-12-08T10:39:55.384Z",
      rental_expiry: "2022-12-15T10:39:55.382Z",
      rental_status: "RETURNED",
    });
    sinon.stub(books_query, "update_book_quantity").resolves({ quntity: 6 });
    const response = await request(app)
      .post("/bookshelf/return/13")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMDEsInVzZXJuYW1lIjoicHJ1ZGh2aSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY3MDI1NjI3M30.a23LnYdHRVOlT3vMOCoMgC_LNA7coAhRAr7YRQ3-a5w"
      );
    expect(response.status).toBe(406);
    expect(response.body.message).toBe("Not Acceptable, Book already returned");
  });
  it("should throw error return not updated", async () => {
    sinon.stub(book_shelf_query, "update_rental_status").resolves(undefined);
    const response = await request(app)
      .post("/bookshelf/return/9")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMDEsInVzZXJuYW1lIjoicHJ1ZGh2aSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY3MDI1NjI3M30.a23LnYdHRVOlT3vMOCoMgC_LNA7coAhRAr7YRQ3-a5w"
      );
    expect(response.body.message).toBe("return not updated");
  });
  it("should throw error book already returned", async () => {
    sinon.stub(book_shelf_query, "update_rental_status").resolves({
      rental_id: 13,
      book_id: 1014,
      user_id: 101,
      rented_on: "2022-12-08T10:39:55.384Z",
      rental_expiry: "2022-12-15T10:39:55.382Z",
      rental_status: "RETURNED",
    });
    sinon.stub(books_query, "update_book_quantity").resolves(undefined);
    const response = await request(app)
      .post("/bookshelf/return/9")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMDEsInVzZXJuYW1lIjoicHJ1ZGh2aSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY3MDI1NjI3M30.a23LnYdHRVOlT3vMOCoMgC_LNA7coAhRAr7YRQ3-a5w"
      );
    expect(response.status).toBe(500);
    expect(response.body.message).toBe(
      "book quantity not updated, please contact Admin"
    );
  });
  it("should throw error Book should be returned by the user who rented", async () => {
    sinon.stub(book_shelf_query, "validate_rental").resolves({
      rental_id: 9,
      book_id: 1014,
      user_id: 104,
      rented_on: "2022-12-08T10:39:55.384Z",
      rental_expiry: "2022-12-15T10:39:55.382Z",
      rental_status: "WITH USER",
    });
    sinon.stub(books_query, "update_book_quantity").resolves({ quntity: 6 });
    const response = await request(app)
      .post("/bookshelf/return/1")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMDEsInVzZXJuYW1lIjoicHJ1ZGh2aSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY3MDMyNjQyM30.lCUB2iZudPmKyXbS_NpHeASJxwEYOJhdk7gaamnw3wk"
      );
    expect(response.status).toBe(401);
    expect(response.body.message).toBe(
      "Book should be returned by the user who rented"
    );
  });
  it("should throw error book already returned", async () => {
    sinon.stub(books_query, "update_book_quantity").rejects(undefined);
    const response = await request(app)
      .post("/bookshelf/return/1234")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMDEsInVzZXJuYW1lIjoicHJ1ZGh2aSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY3MDI1NjI3M30.a23LnYdHRVOlT3vMOCoMgC_LNA7coAhRAr7YRQ3-a5w"
      );
    expect(response.status).toBe(500);
    expect(response.body.message).toBe("something went wrong");
  });
  it("should throw error invalid jwt token", async () => {
    sinon.stub(books_query, "update_book_quantity").rejects(undefined);
    const response = await request(app)
      .post("/bookshelf/return/1234")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMDEsInVzZXJuYW1lIjoicHJ1ZGh2aSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY3MDI1NjI3M30.a23LnYdHRVOlT3vMOCoMgC_LNA7coAhRAr7YRQ3-a5w"
      );
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid JWT Token");
  });
});
