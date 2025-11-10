import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
  await orchestrator.deleteAllEmails();
});

describe("Use case: Registration Flow (all successfull)", () => {
    test("Create user account", async () => {
      const createUserResponse = await fetch(
        "http://localhost:3000/api/v1/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: "RegistrationFlow",
            email: "registration.flow@curso.dev",
            password: "password123"
          })
        }
      );

      expect(createUserResponse.status).toBe(201);

      const createUserResponseBody = await createUserResponse.json();

      expect(createUserResponseBody).toEqual({
        id: createUserResponseBody.id,
        username: "RegistrationFlow",
        email: "registration.flow@curso.dev",
        password: createUserResponseBody.password,
        features: ["read:activation_token"],
        created_at: createUserResponseBody.created_at,
        updated_at: createUserResponseBody.updated_at,
      });
    });
  });