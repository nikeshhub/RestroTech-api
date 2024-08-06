import request from "supertest";
import { app } from "../..";
import { Menu } from "../Models/model";
import upload from "../Middlewares/upload";

jest.mock("../Models/model");

jest.mock(
  "../Middlewares/isAuthenticated.js",
  () => (req, res, next) => next()
);

jest.mock("../Middlewares/upload.js", () => ({
  single: () => (req, res, next) => {
    req.file = {};
    next();
  },
}));

describe("Menu API Endpoints", () => {
  let mockMenu;

  beforeEach(() => {
    mockMenu = {
      _id: "1",
      name: "Test Menu",
      description: "Test Description",
      price: 10,
      category: "Test Category",
      restaurantId: "123",
      estimatedTime: "30 mins",
      photo: "localhost:8000/1718128286797chowmein.jpeg",
    };
  });

  test("POST /menu creates a menu item", async () => {
    const mockFileBuffer = Buffer.from("test file content");

    Menu.create.mockResolvedValue(mockMenu);

    const response = await request(app)
      .post("/menu")
      .set("Authorization", "Bearer testtoken")
      .field("name", mockMenu.name)
      .field("description", mockMenu.description)
      .field("price", mockMenu.price)
      .field("category", mockMenu.category)
      .field("estimatedTime", mockMenu.estimatedTime)
      .attach("file", mockFileBuffer, "test.jpg");

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toMatchObject(mockMenu);
  });

  test("GET /menu fetches the restaurant menu", async () => {
    Menu.find.mockResolvedValue([mockMenu]);
    const response = await request(app)
      .get("/menu")
      .set("Authorization", "Bearer testtoken");

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toEqual([mockMenu]);
  });

  test("GET /menu/:id fetches a specific menu item", async () => {
    Menu.findById.mockResolvedValue(mockMenu);
    const response = await request(app).get(`/menu/${mockMenu._id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toMatchObject(mockMenu);
  });

  test("PUT /menu/:id updates a menu item", async () => {
    const updatedMenu = { ...mockMenu, name: "Updated Name" };

    Menu.findByIdAndUpdate.mockResolvedValue(updatedMenu);

    const mockFileBuffer = Buffer.from("updated file content");

    const response = await request(app)
      .put(`/menu/${mockMenu._id}`)
      .set("Authorization", "Bearer testtoken")
      .field("name", "Updated Name")
      .field("description", mockMenu.description)
      .field("price", mockMenu.price)
      .field("category", mockMenu.category)
      .field("estimatedTime", mockMenu.estimatedTime)
      .attach("file", mockFileBuffer, "updated.jpg");

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.name).toBe("Updated Name");
    expect(response.body.data).toMatchObject(updatedMenu);
  });

  test("DELETE /menu/:id deletes a menu item", async () => {
    Menu.findByIdAndDelete.mockResolvedValue(mockMenu);
    const response = await request(app).delete(`/menu/${mockMenu._id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toMatchObject(mockMenu);
  });
});
