import { cn, formatDate } from "@/lib/utils";

describe("cn function", () => {
  test("combines classes with twMerge", () => {
    expect(cn("text-red-500", "bg-blue-500")).toBe("text-red-500 bg-blue-500");
    expect(cn("p-4 p-8")).toBe("p-8");
    expect(cn("text-red-500", { "bg-blue-500": true, rounded: false })).toBe(
      "text-red-500 bg-blue-500",
    );
  });
});

describe("formatDate function", () => {
  test("formats date correctly for en-US locale", () => {
    const testDate = "2023-01-15T12:00:00Z";
    const formatted = formatDate(testDate);
    expect(formatted).toBe("January 15, 2023");
  });

  test("handles different date formats", () => {
    const dates = [
      "2023/06/30",
      "2023-06-30",
      new Date(2023, 5, 30).toISOString(),
    ];

    dates.forEach((date) => {
      const formatted = formatDate(date);
      expect(formatted).toBe("June 30, 2023");
    });
  });
});
