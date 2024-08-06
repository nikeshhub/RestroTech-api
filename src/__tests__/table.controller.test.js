import request from "supertest";
import { app } from "../..";
import { Table } from "../Models/model";

jest.mock("../Models/model");

jest.mock(
  "../Middlewares/isAuthenticated.js",
  () => (req, res, next) => next()
);

describe("Table Endpoints", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("POST /table creates a table successfully", async () => {
    Table.findOne.mockResolvedValue(null);
    Table.create.mockResolvedValue({
      number: 1,
      capacity: 4,
      restaurantId: "123",
    });

    const response = await request(app)
      .post("/table")
      .send({
        number: 1,
        capacity: 4,
      })
      .set("Authorization", "Bearer token");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Table created successfully");
    expect(response.body.data).toEqual({
      number: 1,
      capacity: 4,
      restaurantId: "123",
    });
  });

  test("POST /table handles table creation with existing table", async () => {
    Table.findOne.mockResolvedValue({
      number: 1,
      capacity: 4,
      restaurantId: "123",
    });

    const response = await request(app)
      .post("/table")
      .send({
        number: 1,
        capacity: 4,
      })
      .set("Authorization", "Bearer token");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Table already exists");
  });

  test("GET /table fetches restaurant tables successfully", async () => {
    Table.find.mockResolvedValue([
      { number: 1, capacity: 4, restaurantId: "123" },
      { number: 2, capacity: 2, restaurantId: "123" },
    ]);

    const response = await request(app)
      .get("/table")
      .set("Authorization", "Bearer token");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Table fetched successfully!!");
    expect(response.body.data).toEqual([
      { number: 1, capacity: 4, restaurantId: "123" },
      { number: 2, capacity: 2, restaurantId: "123" },
    ]);
  });

  test("GET /table handles error fetching restaurant tables", async () => {
    Table.find.mockRejectedValue(new Error("Database error"));

    const response = await request(app)
      .get("/table")
      .set("Authorization", "Bearer token");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Database error");
  });
});
