import app from "../../app";
import sinon from "sinon";
import request from "supertest";
import books_query from "../../queries/books_query/books_query";
import book_shelf_query from "../../queries/book_shelf_query/book_shelf_query";
import Custom_error from "../../utils/errors/custom_errors";

describe("/books test", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should return books list", async () => {
    sinon.stub(books_query, "get_books_query").resolves();
    const response = await request(app).get("/books");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("success");
  });

  it("should give an error", async () => {
    sinon.stub(books_query, "get_books_query").throwsException();

    const response = await request(app).get("/books");

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("something went wrong");
  });
});

describe("/books/filter test", () => {
  afterEach(() => {
    sinon.restore();
  });
  it("should return books based on query params", async () => {
    sinon.stub(books_query, "get_books_query_by_filters").resolves([
      {
        book_id: 1002,
        title: "Fire and Blood",
        author: "George R R Martin",
        description:
          "Fire & Blood is a fantasy book by American writer George R. R. Martin and illustrated by Doug Wheatley. It tells the history of House Targaryen, the dynasty that ruled the Seven Kingdoms of Westeros in the backstory of his series A Song of Ice and Fire.",
        published_year: 2018,
        category: "FANTASY",
        ratings: 5,
        quantity: 5,
        book_cover: "https://m.media-amazon.com/images/I/919slSnW1IL.jpg",
      },
    ]);
    const response = await request(app).get(
      "/books/filter?title=Fire&category=FANTASY$ratings=5"
    );
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("success");
  });

  it("should throw an error", async () => {
    sinon.stub(books_query, "get_books_query_by_filters").throwsException();

    const response = await request(app).get("/books/filter");

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("something went wrong");
  });
});

describe("/books/search test", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should return books based on query", async () => {
    sinon.stub(books_query, "get_books_query_by_search").resolves([
      {
        book_id: 1002,
        title: "Fire and Blood",
        author: "George R R Martin",
        description:
          "Fire & Blood is a fantasy book by American writer George R. R. Martin and illustrated by Doug Wheatley. It tells the history of House Targaryen, the dynasty that ruled the Seven Kingdoms of Westeros in the backstory of his series A Song of Ice and Fire.",
        published_year: 2018,
        category: "FANTASY",
        ratings: 5,
        quantity: 5,
        book_cover: "https://m.media-amazon.com/images/I/919slSnW1IL.jpg",
      },
    ]);
    const response = await request(app).get("/books/search?q=blood");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("success");
  });

  it("should throw an error", async () => {
    sinon.stub(books_query, "get_books_query_by_search").throwsException();
    const response = await request(app).get("/books/search");
    expect(response.status).toBe(500);
    expect(response.body.message).toBe("something went wrong");
  });
});

describe("/books create test", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should post data", async () => {
    sinon.stub(books_query, "create_book").resolves({
      book_id: 1016,
      title: "Harry Potter and the Phsopher's Stone",
      author: "J. K. Rowling",
      description:
        "Harry Potter is a series ofven fantasy novels written by British author J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry.",
      published_year: 1997,
      category: "FANTASY",
      ratings: 5,
      quantity: 4,
      book_cover:
        "https://m.media-amazon.com/images/I/51PcUAhn15L._SX498_BO1,204,203,200_.jpg",
    });
    const response = await request(app)
      .post("/books")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMDEsInVzZXJuYW1lIjoicHJ1ZGh2aSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY3MDI1NjI3M30.a23LnYdHRVOlT3vMOCoMgC_LNA7coAhRAr7YRQ3-a5w"
      )
      .send({
        book_id: 1016,
        title: "Harry Potter and the Phsopher's Stone",
        author: "J. K. Rowling",
        description:
          "Harry Potter is a series ofven fantasy novels written by British author J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry.",
        published_year: 1997,
        category: "FANTASY",
        ratings: 5,
        quantity: 4,
        book_cover:
          "https://m.media-amazon.com/images/I/51PcUAhn15L._SX498_BO1,204,203,200_.jpg",
      });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("success");
  });

  it("should throw an error bad request", async () => {
    sinon.stub(books_query, "create_book").resolves({});
    const response = await request(app)
      .post("/books")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMDEsInVzZXJuYW1lIjoicHJ1ZGh2aSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY3MDI1NjI3M30.a23LnYdHRVOlT3vMOCoMgC_LNA7coAhRAr7YRQ3-a5w"
      )
      .send({
        book_id: 1016,
        title: "Harry Potter and the Phsopher's Stone",
      });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("enter all details");
  });

  it("should throw an error book not created", async () => {
    sinon.stub(books_query, "create_book").resolves(undefined);
    const response = await request(app)
      .post("/books")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMDEsInVzZXJuYW1lIjoicHJ1ZGh2aSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY3MDI1NjI3M30.a23LnYdHRVOlT3vMOCoMgC_LNA7coAhRAr7YRQ3-a5w"
      )
      .send({
        book_id: 1016,
        title: "Harry Potter and the Phsopher's Stone",
        author: "J. K. Rowling",
        description:
          "Harry Potter is a series ofven fantasy novels written by British author J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry.",
        published_year: 1997,
        category: "FANTASY",
        ratings: 5,
        quantity: 4,
        book_cover:
          "https://m.media-amazon.com/images/I/51PcUAhn15L._SX498_BO1,204,203,200_.jpg",
      });
    expect(response.status).toBe(500);
    expect(response.body.message).toBe("failed to create book");
  });

  it("should throw an error not authorized to create book", async () => {
    sinon.stub(books_query, "create_book").resolves({
      book_id: 1016,
      title: "Harry Potter and the Phsopher's Stone",
      author: "J. K. Rowling",
      description:
        "Harry Potter is a series ofven fantasy novels written by British author J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry.",
      published_year: 1997,
      category: "FANTASY",
      ratings: 5,
      quantity: 4,
      book_cover:
        "https://m.media-amazon.com/images/I/51PcUAhn15L._SX498_BO1,204,203,200_.jpg",
    });
    const response = await request(app)
      .post("/books")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMDQsInVzZXJuYW1lIjoiY2hyeXMiLCJyb2xlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NzAyNjE3MzJ9.ejcVtP_pYwc-UMb-a09vBEf14kTRXCtAJnPInsFv_e4"
      )
      .send({
        book_id: 1016,
        title: "Harry Potter and the Phsopher's Stone",
        author: "J. K. Rowling",
        description:
          "Harry Potter is a series ofven fantasy novels written by British author J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry.",
        published_year: 1997,
        category: "FANTASY",
        ratings: 5,
        quantity: 4,
        book_cover:
          "https://m.media-amazon.com/images/I/51PcUAhn15L._SX498_BO1,204,203,200_.jpg",
      });
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Not authorized to create a book");
  });

  it("should throw an error something went wrong", async () => {
    sinon.stub(books_query, "create_book").throwsException();
    const response = await request(app)
      .post("/books")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMDEsInVzZXJuYW1lIjoicHJ1ZGh2aSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY3MDI1NjI3M30.a23LnYdHRVOlT3vMOCoMgC_LNA7coAhRAr7YRQ3-a5w"
      )
      .send({
        book_id: 1013,
        title: "Harry Potter and the Phsopher's Stone",
        author: "J. K. Rowling",
        description:
          "Harry Potter is a series ofven fantasy novels written by British author J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry.",
        published_year: 1997,
        category: "FANTASY",
        ratings: 5,
        quantity: 4,
        book_cover:
          "https://m.media-amazon.com/images/I/51PcUAhn15L._SX498_BO1,204,203,200_.jpg",
      });
    expect(response.status).toBe(500);
    expect(response.body.message).toBe("something went wrong");
  });

  it("should throw an error invalid jwtoken", async () => {
    sinon.stub(books_query, "create_book").resolves({
      book_id: 1016,
      title: "Harry Potter and the Phsopher's Stone",
      author: "J. K. Rowling",
      description:
        "Harry Potter is a series ofven fantasy novels written by British author J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry.",
      published_year: 1997,
      category: "FANTASY",
      ratings: 5,
      quantity: 4,
      book_cover:
        "https://m.media-amazon.com/images/I/51PcUAhn15L._SX498_BO1,204,203,200_.jpg",
    });
    const response = await request(app)
      .post("/books")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInRcCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMDEsInVzZXJuYW1lIjoicHJ1ZGh2aSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY3MDI1NjI3M30.a23LnYdHRVOlT3vMOCoMgC_LNA7coAhRAr7YRQ3-a5w"
      )
      .send({
        book_id: 1016,
        title: "Harry Potter and the Phsopher's Stone",
        author: "J. K. Rowling",
        description:
          "Harry Potter is a series ofven fantasy novels written by British author J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry.",
        published_year: 1997,
        category: "FANTASY",
        ratings: 5,
        quantity: 4,
        book_cover:
          "https://m.media-amazon.com/images/I/51PcUAhn15L._SX498_BO1,204,203,200_.jpg",
      });
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid JWT Token");
  });

  it("should throw an error saying: JWtoken is missing ", async () => {
    sinon.stub(books_query, "create_book").resolves({
      book_id: 1016,
      title: "Harry Potter and the Phsopher's Stone",
      author: "J. K. Rowling",
      description:
        "Harry Potter is a series ofven fantasy novels written by British author J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry.",
      published_year: 1997,
      category: "FANTASY",
      ratings: 5,
      quantity: 4,
      book_cover:
        "https://m.media-amazon.com/images/I/51PcUAhn15L._SX498_BO1,204,203,200_.jpg",
    });
    const response = await request(app).post("/books").send({
      book_id: 1016,
      title: "Harry Potter and the Phsopher's Stone",
      author: "J. K. Rowling",
      description:
        "Harry Potter is a series ofven fantasy novels written by British author J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry.",
      published_year: 1997,
      category: "FANTASY",
      ratings: 5,
      quantity: 4,
      book_cover:
        "https://m.media-amazon.com/images/I/51PcUAhn15L._SX498_BO1,204,203,200_.jpg",
    });
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("JWT token is missing");
  });
});

describe("/books/:book_id update test", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should update book_data", async () => {
    sinon.stub(books_query, "update_book").resolves({
      book_id: 1001,
      title: "The Subtle art of not giving a f*ck",
      author: "Mark Manson",
      description:
        'The Subtle Art of Not Giving a F*ck argues that individuals should seek to find meaning through what they find to be important and only engage in values that they can control. Values that are not under a persons control, are, according to the book, "bad values".',
      published_year: 2016,
      category: "SELF HELP",
      ratings: 4,
      quantity: 6,
      book_cover: "https://m.media-amazon.com/images/I/71t4GuxLCuL.jpg",
    });
    const response = await request(app)
      .put("/books/1001")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMDEsInVzZXJuYW1lIjoicHJ1ZGh2aSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY3MDI1NjI3M30.a23LnYdHRVOlT3vMOCoMgC_LNA7coAhRAr7YRQ3-a5w"
      )
      .send({ author: "Mark Manson" });
    expect(response.status).toBe(200);
  });

  it("should throw error JWT token is missing", async () => {
    sinon.stub(books_query, "update_book").resolves({
      book_id: 1001,
      title: "The Subtle art of not giving a f*ck",
      author: "Mark Manson",
      description:
        'The Subtle Art of Not Giving a F*ck argues that individuals should seek to find meaning through what they find to be important and only engage in values that they can control. Values that are not under a persons control, are, according to the book, "bad values".',
      published_year: 2016,
      category: "SELF HELP",
      ratings: 4,
      quantity: 6,
      book_cover: "https://m.media-amazon.com/images/I/71t4GuxLCuL.jpg",
    });
    const response = await request(app)
      .put("/books/1001")
      .send({ author: "Mark Manson" });
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("JWT token is missing");
  });

  it("should throw an error invalid JWToken", async () => {
    sinon.stub(books_query, "update_book").resolves({
      book_id: 1001,
      title: "The Subtle art of not giving a f*ck",
      author: "Mark Manson",
      description:
        'The Subtle Art of Not Giving a F*ck argues that individuals should seek to find meaning through what they find to be important and only engage in values that they can control. Values that are not under a persons control, are, according to the book, "bad values".',
      published_year: 2016,
      category: "SELF HELP",
      ratings: 4,
      quantity: 6,
      book_cover: "https://m.media-amazon.com/images/I/71t4GuxLCuL.jpg",
    });
    const response = await request(app)
      .put("/books/1001")
      .send({ author: "Mark Manson" })
      .set("Authorization", "Bearer eyJhb");
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid JWT Token");
  });

  it("should throw an error unauthorized access", async () => {
    sinon.stub(books_query, "update_book").resolves({
      book_id: 1001,
      title: "The Subtle art of not giving a f*ck",
      author: "Mark Manson",
      description:
        'The Subtle Art of Not Giving a F*ck argues that individuals should seek to find meaning through what they find to be important and only engage in values that they can control. Values that are not under a persons control, are, according to the book, "bad values".',
      published_year: 2016,
      category: "SELF HELP",
      ratings: 4,
      quantity: 6,
      book_cover: "https://m.media-amazon.com/images/I/71t4GuxLCuL.jpg",
    });
    const response = await request(app)
      .put("/books/1001")
      .send({ author: "Mark Manson" })
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMDQsInVzZXJuYW1lIjoiY2hyeXMiLCJyb2xlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NzAzMTQwMDZ9.FN7mAm0a5N6J7KK-GKAOQ3K2MO6KbvYxKHe73q1GLOU"
      );
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Not authorized to update book details");
  });

  it("should throw an failed to update book", async () => {
    sinon.stub(books_query, "update_book").resolves(undefined);
    const response = await request(app)
      .put("/books/1001")
      .send({ author: "Mark Manson" })
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMDEsInVzZXJuYW1lIjoicHJ1ZGh2aSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY3MDI1NjI3M30.a23LnYdHRVOlT3vMOCoMgC_LNA7coAhRAr7YRQ3-a5w"
      );
    expect(response.status).toBe(500);
    expect(response.body.message).toBe("failed to update book");
  });

  it("should throw an error something went wrong internally!!", async () => {
    sinon.stub(books_query, "update_book").rejects();
    const response = await request(app)
      .put("/books/1001")
      .send({ author: "Mark Manson" })
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMDEsInVzZXJuYW1lIjoicHJ1ZGh2aSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY3MDI1NjI3M30.a23LnYdHRVOlT3vMOCoMgC_LNA7coAhRAr7YRQ3-a5w"
      );
    expect(response.status).toBe(500);
    expect(response.body.message).toBe("something went wrong");
  });
});

describe("/rent/:book_id test", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should successfully create a rental", async () => {
    sinon
      .stub(books_query, "get_book_quantity_by_id")
      .resolves({ quantity: 6 });
    sinon.stub(book_shelf_query, "create_rental").resolves({
      rental_id: 12,
      book_id: 1013,
      user_id: 105,
      rented_on: "2022-12-07T12:09:47.369Z",
      rental_expiry: "2022-12-14T12:09:47.365Z",
      rental_status: "WITH USER",
    });
    sinon.stub(books_query, "update_book_quantity").resolves({
      book_id: 1013,
      title: "Shadow and Bone",
      author: "Leigh Bardugo",
      description:
        "Shadow and Bone is a young adult fantasy adventure and debut novel written by Israeli-American author Leigh Bardugo. It was published by Macmillan",
      published_year: 2012,
      category: "FANTASY",
      ratings: 4,
      quantity: 5,
      book_cover: "https://m.media-amazon.com/images/I/51d4-s4yuzL.jpg",
    });
    const response = await request(app)
      .post("/books/rent/1013")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMDEsInVzZXJuYW1lIjoicHJ1ZGh2aSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY3MDI1NjI3M30.a23LnYdHRVOlT3vMOCoMgC_LNA7coAhRAr7YRQ3-a5w"
      );
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("success");
  });

  it("should throw error Invalid Book ID", async () => {
    sinon.stub(books_query, "get_book_quantity_by_id").resolves(undefined);
    const response = await request(app)
      .post("/books/rent/1013")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMDEsInVzZXJuYW1lIjoicHJ1ZGh2aSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY3MDI1NjI3M30.a23LnYdHRVOlT3vMOCoMgC_LNA7coAhRAr7YRQ3-a5w"
      );
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Invalid Book ID");
  });

  it("should throw error Out of Stock", async () => {
    sinon
      .stub(books_query, "get_book_quantity_by_id")
      .resolves({ quantity: 0 });
    const response = await request(app)
      .post("/books/rent/1013")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMDEsInVzZXJuYW1lIjoicHJ1ZGh2aSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY3MDI1NjI3M30.a23LnYdHRVOlT3vMOCoMgC_LNA7coAhRAr7YRQ3-a5w"
      );
    expect(response.status).toBe(307);
    expect(response.body.message).toBe("sorry!!, book is out of stock");
  });

  it("should throw error something went wrong", async () => {
    sinon.stub(books_query, "get_book_quantity_by_id").rejects({ quantity: 0 });
    const response = await request(app)
      .post("/books/rent/1013")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMDEsInVzZXJuYW1lIjoicHJ1ZGh2aSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY3MDI1NjI3M30.a23LnYdHRVOlT3vMOCoMgC_LNA7coAhRAr7YRQ3-a5w"
      );
    expect(response.status).toBe(500);
    expect(response.body.message).toBe("something went wrong");
  });

  it("should successfully create a rental", async () => {
    sinon
      .stub(books_query, "get_book_quantity_by_id")
      .resolves({ quantity: 6 });
    sinon.stub(book_shelf_query, "create_rental").resolves(undefined);
    const response = await request(app)
      .post("/books/rent/1013")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMDEsInVzZXJuYW1lIjoicHJ1ZGh2aSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY3MDI1NjI3M30.a23LnYdHRVOlT3vMOCoMgC_LNA7coAhRAr7YRQ3-a5w"
      );
    expect(response.status).toBe(500);
    expect(response.body.message).toBe("failed to rent book");
  });

  it("should successfully create a rental", async () => {
    sinon
      .stub(books_query, "get_book_quantity_by_id")
      .resolves({ quantity: 6 });
    sinon.stub(book_shelf_query, "create_rental").resolves({
      rental_id: 12,
      book_id: 1013,
      user_id: 105,
      rented_on: "2022-12-07T12:09:47.369Z",
      rental_expiry: "2022-12-14T12:09:47.365Z",
      rental_status: "WITH USER",
    });
    sinon.stub(books_query, "update_book_quantity").resolves(undefined);
    const response = await request(app)
      .post("/books/rent/1013")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMDEsInVzZXJuYW1lIjoicHJ1ZGh2aSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY3MDI1NjI3M30.a23LnYdHRVOlT3vMOCoMgC_LNA7coAhRAr7YRQ3-a5w"
      );
    expect(response.status).toBe(500);
    expect(response.body.message).toBe(
      "failed to update book, Please reach out to admin"
    );
  });
});
