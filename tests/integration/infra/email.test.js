import email from "infra/email.js";

describe("infra/email.js", () => {
  test("send()", async () => {
    await email.send({
      from: "PedroAssis <pedroa@gmail.com>",
      to: "pedro@curso.dev",
      subject: "Subject test",
      text: "Body test.",
    });
  });
});
