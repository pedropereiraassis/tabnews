import email from "infra/email.js";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("infra/email.js", () => {
  test("send()", async () => {
    await orchestrator.deleteAllEmails();

    await email.send({
      from: "PedroAssis <pedroa@gmail.com>",
      to: "pedro@curso.dev",
      subject: "Subject test",
      text: "Body test.",
    });

    await email.send({
      from: "PedroAssis <pedroa@gmail.com>",
      to: "pedro@curso.dev",
      subject: "Last email sent",
      text: "Last email body.",
    });

    const lastEmail = await orchestrator.getLastEmail();

    expect(lastEmail.sender).toBe("<pedroa@gmail.com>");
    expect(lastEmail.recipients[0]).toBe("<pedro@curso.dev>");
    expect(lastEmail.subject).toBe("Last email sent");
    expect(lastEmail.text).toBe("Last email body.\n");
  });
});
