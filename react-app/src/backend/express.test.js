// TODO npm i vitest supertest jsdom @vitest/ui

import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import { app, conn } from "./express.cjs";

describe("Test Vitest", () => {
  // Creates a suite of tests, allowing for grouping and hierarchical organization of tests.

    it("tests if 2+3=5", () => {
        // Defines a test case with a given name and test function.
        
        expect(2 + 3).toBe(5);
        
        const floating = 0.1 + 0.2;
        const delta = 0.0001;
        console.log(floating); // 0.30000000000000004
        expect(floating).toBeGreaterThanOrEqual(0.3);
        expect(floating).toBeLessThanOrEqual(0.3 + delta);
        // expect(2+3).toBe(6); // AssertionError: expected 5 to be 6
        // Checks that a value is what you expect. It calls Object.is to compare values. Don't use toBe with floating-point numbers.
    });
});

describe("Imports", () => {
    it("validates imports existence", () => {
        expect(app).not.toBeNull();
        expect(conn).not.toBeNull();
    });
});

describe("Mueslis Endpoints", () => {
    beforeEach(() => {
        // Registers a callback function to be executed before each test within the current suite.
        
        vi.restoreAllMocks();
        /* Calls .mockRestore() on every mocked function.
                This will empty .mock state, restore all original mock implementations, and restore original descriptors of spied-on objects.
                This is useful for inter-test cleanup and/or removing mocks created by vi.spyOn(...). */
    });

    it("GET /mueslis returns mueslis list", async () => {
        const res = await request(app).get("/mueslis");
        expect(res.status).toBe(200);
    });

    it("POST /mueslis creates with valid data", async () => {
        vi.spyOn(conn, "query").mockImplementation((sql, values, callback) => {
            callback(null, { id: 1 }, []);
        });
      
        const res = await request(app)
            .post("/mueslis")
            .send({ name: "Test", price: 1000 });
        expect(res.status).toBe(201);
        // expect(+res.body.id).toBe(1); // +undefined => NaN
    });

    it("POST /mueslis rejects invalid data", async () => {
        let res = await request(app).post("/mueslis").send("test");
        expect(res.status).toBe(500);
      
        res = await request(app).post("/mueslis").send({ name: "", price: NaN });
        expect(res.status).toBe(300);
    });

    it("PATCH /mueslis updates fields", async () => {
        vi.spyOn(conn, "query").mockImplementation((sql, values, callback) => {
            expect(sql).toContain("UPDATE muesli SET");
            expect(sql).toContain("name = ?");
            expect(sql).toContain("price = ?");
            expect(sql).toContain("WHERE id = ?");
            
            expect(values).toEqual(["NewName", 123, 1]);
            
            callback(null, { affectedRows: 1, changedRows: 1 }, []);
        });
      
        const res = await request(app)
            .patch("/mueslis")
            .send({ id: 1, name: "NewName", price: 123 });
      
        expect(res.status).toBe(200);
        expect(res.body.updatedId).toBe(1);
        expect(res.body.newName).toBe("NewName");
        expect(res.body.newPrice).toBe(123);
        expect(res.body.affectedRows).toBe(1);
    });

    it("PATCH /mueslis handles invalid price", async () => {
        vi.spyOn(conn, "query").mockImplementation((sql, values, callback) => {
            expect(sql).toContain("UPDATE muesli SET");
            expect(sql).toContain("name = ?");
            expect(sql).not.toContain("price = ?");
            expect(sql).toContain("WHERE id = ?");
            
            expect(values).toEqual(["OnlyName", 1]);
            callback(null, { affectedRows: 1, changedRows: 1 }, []);
        });
      
        const res = await request(app)
            .patch("/mueslis")
            .send({ id: 1, name: "OnlyName", price: -10 });
      
        expect(res.status).toBe(200);
        expect(res.body.updatedId).toBe(1);
        expect(res.body.newName).toBe("OnlyName");
      
        expect(res.body.newPrice).toBeNull();
    });

  it("DELETE /mueslis/:id deletes existing item and returns deleted object", async () => {
    const deletedRow = { id: 5, name: "Choco", price: 999 };

    vi.spyOn(conn, "query").mockImplementation((sql, values, callback) => {
        if (sql.startsWith("SELECT")) {
            expect(values).toEqual(["5"]);
            return callback(null, [deletedRow], []);
        }
        if (sql.startsWith("DELETE")) {
            expect(values).toEqual(["5"]);
            return callback(null, { affectedRows: 1 }, []);
        }
        callback(new Error("Unexpected SQL in test"));
    });

    const res = await request(app).delete("/mueslis/5");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ deleted: deletedRow });
  });

    it("DELETE /mueslis/:id returns 404 when item not found", async () => {
        vi.spyOn(conn, "query").mockImplementation((sql, values, callback) => {
            if (sql.startsWith("SELECT")) {
              return callback(null, [], []);
            }
            callback(new Error("DELETE should not be called when not found"));
        });
      
        const res = await request(app).delete("/mueslis/123");
      
        expect(res.status).toBe(404);
        expect(res.body).toEqual({ error: "Not found" });
    });

    it("DELETE /mueslis/:id returns 500 when SELECT fails", async () => {
        vi.spyOn(conn, "query").mockImplementation((sql, values, callback) => {
            if (sql.startsWith("SELECT")) {
              return callback(new Error("DB select error"), null, null);
            }
            callback(new Error("DELETE should not be called when SELECT fails"));
        });

      const res = await request(app).delete("/mueslis/5");

      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("err");
    });

    it("DELETE /mueslis/:id returns 500 when DELETE fails", async () => {
      const deletedRow = { id: 5, name: "Choco", price: 999 };
    
      vi.spyOn(conn, "query").mockImplementation((sql, values, callback) => {
        if (sql.startsWith("SELECT")) {
          return callback(null, [deletedRow], []);
        }
        if (sql.startsWith("DELETE")) {
          return callback(new Error("DB delete error"), null, null);
        }
        callback(new Error("Unexpected SQL in test"));
      });
    
      const res = await request(app).delete("/mueslis/5");
    
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("err2");
    });
});
