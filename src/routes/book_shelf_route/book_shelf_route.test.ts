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
    sinon
      .stub(book_shelf_query, "get_book_shelf_query")
      .rejects({ message: "something went wrong" });
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

  it("should throw error invalid jwt token", async () => {
    sinon.stub(books_query, "update_book_quantity").resolves(undefined);
    const response = await request(app)
      .put("/bookshelf/return/1234")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMDEsInVzZXJuYW1lIjoicHJ1ZGh2aSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY3MDI1NjI3M30.a23LnYdHRVOlT3vMOCoMgC_LNA7coAhRAr7YRQ3-a5w"
      );
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid JWT Token");
  });

  it("should update return status", async () => {
    sinon.stub(book_shelf_query, "validate_rental").resolves({
      rental_id: 9,
      book_id: 1014,
      user_id: 101,
      rented_on: "2022-12-07T11:30:19.174Z",
      rental_expiry: "2022-12-14T11:30:19.172Z",
      rental_status: "WITH USER",
    });
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
      .put("/bookshelf/return/9")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMDEsInVzZXJuYW1lIjoicHJ1ZGh2aSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY3MDI1NjI3M30.a23LnYdHRVOlT3vMOCoMgC_LNA7coAhRAr7YRQ3-a5w"
      );
    expect(response.status).toBe(200);
  });

  it("should update message success", async () => {
    sinon.stub(book_shelf_query, "validate_rental").resolves({
      rental_id: 9,
      book_id: 1014,
      user_id: 101,
      rented_on: "2022-12-07T11:30:19.174Z",
      rental_expiry: "2022-12-14T11:30:19.172Z",
      rental_status: "WITH USER",
    });
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
      .put("/bookshelf/return/9")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMDEsInVzZXJuYW1lIjoicHJ1ZGh2aSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY3MDI1NjI3M30.a23LnYdHRVOlT3vMOCoMgC_LNA7coAhRAr7YRQ3-a5w"
      );
    expect(response.body.message).toBe("success");
  });

  it("should throw error book already returned", async () => {
    sinon.stub(book_shelf_query, "validate_rental").resolves({
      rental_id: 15,
      book_id: 1014,
      user_id: 101,
      rented_on: "2022-12-08T10:39:55.384Z",
      rental_expiry: "2022-12-15T10:39:55.382Z",
      rental_status: "RETURNED",
    });

    const response = await request(app)
      .put("/bookshelf/return/15")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMDEsInVzZXJuYW1lIjoicHJ1ZGh2aSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY3MDI1NjI3M30.a23LnYdHRVOlT3vMOCoMgC_LNA7coAhRAr7YRQ3-a5w"
      );
    expect(response.status).toBe(406);
    expect(response.body.message).toBe("Not Acceptable, Book already returned");
  });

  it("should throw error", async () => {
    sinon.stub(book_shelf_query, "validate_rental").throwsException();
    sinon.stub(book_shelf_query, "update_rental_status").throwsException();
    sinon.stub(books_query, "update_book_quantity").throwsException();
    const response = await request(app)
      .put("/bookshelf/return/9")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMDEsInVzZXJuYW1lIjoicHJ1ZGh2aSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY3MDI1NjI3M30.a23LnYdHRVOlT3vMOCoMgC_LNA7coAhRAr7YRQ3-a5w"
      );
    expect(response.status).toBe(500);
  });

  it("should throw error Book should be returned by the user who rented", async () => {
    sinon.stub(book_shelf_query, "validate_rental").resolves({
      rental_id: 9,
      book_id: 1014,
      user_id: 101,
      rented_on: "2022-12-08T10:39:55.384Z",
      rental_expiry: "2022-12-15T10:39:55.382Z",
      rental_status: "WITH USER",
    });
    const response = await request(app)
      .put("/bookshelf/return/9")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMDYsInVzZXJuYW1lIjoidGF5bG9yIiwicm9sZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjcwNzQxOTE2fQ.QpJzUNqi4HPLiyb0N8jKj1hVO7DyOVDWJ9zrRoLBLGo"
      );

    expect(response.status).toBe(401);
    expect(response.body.message).toBe(
      "Book should be returned by the user who rented"
    );
  });

  it("should throw error Invalid rental id", async () => {
    sinon.stub(book_shelf_query, "validate_rental").resolves(undefined);
    const response = await request(app)
      .put("/bookshelf/return/1234")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMDEsInVzZXJuYW1lIjoicHJ1ZGh2aSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY3MDI1NjI3M30.a23LnYdHRVOlT3vMOCoMgC_LNA7coAhRAr7YRQ3-a5w"
      );
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("rental id not found")
  });
});
