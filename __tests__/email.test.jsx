import { sendEmail } from "@/lib/email";

jest.mock("resend", () => {
  const mockSend = jest.fn().mockResolvedValue({
    data: { id: "mock-email-id" },
    error: null,
  });

  return {
    Resend: jest.fn().mockImplementation(() => ({
      emails: {
        send: mockSend,
      },
    })),
  };
});

describe("sendEmail function", () => {
  test("validates input data correctly", async () => {
    // Test with invalid email
    const invalidData = {
      name: "",
      email: "invalid-email",
      message: "",
    };

    const result = await sendEmail(invalidData);
    expect(result).toHaveProperty("error");
  });

  test("sends email successfully with valid data", async () => {
    const validData = {
      name: "Test User",
      email: "test@example.com",
      message: "This is a test message",
    };

    // Reset mock before test
    const mockSend = require("resend").Resend().emails.send;
    mockSend.mockClear();

    const result = await sendEmail(validData);
    expect(result).toEqual({ success: true });

    // Verify that send was called with correct parameters
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        from: "lorenzopalaia.com <contact@lorenzopalaia.com>",
        to: expect.any(String),
        replyTo: [validData.email],
        subject: `New message from ${validData.name}!`,
      }),
    );
  });
});
