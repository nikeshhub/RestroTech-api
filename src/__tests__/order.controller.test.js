import request from "supertest";
import { app } from "../../index.js";
import { Menu, Order, Table } from "../Models/model.js";

jest.mock("../Models/model.js");

jest.mock(
  "../Middlewares/isAuthenticated.js",
  () => (req, res, next) => next()
);

describe("Order API Endpoints", () => {
  let mockOrder, mockMenu, mockTable;

  beforeEach(() => {
    mockOrder = {
      _id: "order1",
      items: [{ menuItem: "menu1", quantity: 2 }],
      tableNumber: "table1",
      restaurantId: "restaurant1",
      totalPrice: 20,
    };

    mockMenu = {
      _id: "menu1",
      name: "Test Menu",
      price: 10,
    };

    mockTable = {
      _id: "table1",
      number: 1,
      status: "available",
      restaurantId: "restaurant1",
    };
  });

  test("POST /order creates an order", async () => {
    Table.findOne.mockResolvedValue(mockTable);
    Menu.find.mockResolvedValue([mockMenu]);
    Order.create.mockResolvedValue(mockOrder);

    const response = await request(app)
      .post("/order")
      .send({
        items: [{ menuItem: mockMenu._id, quantity: 2 }],
        tableNumber: mockTable.number,
      })
      .set("Authorization", "Bearer testtoken");

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Order created successfully");
    expect(response.body.data).toMatchObject(mockOrder);
  });
});
