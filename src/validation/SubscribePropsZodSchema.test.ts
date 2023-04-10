import { SubscribePropsZodSchema } from "./SubscribePropsZodSchema"

describe("InsertEmailPropsZodSchema", () => {
  it.each([
    [
      {
        ip: "192.168.1.1",
        email: "test@mail.com",
      },
    ],
  ])("should parse", (input) => {
    expect(() => {
      SubscribePropsZodSchema.parse(input)
    }).not.toThrow()
  })

  it.each([
    [
      {
        ip: "192.168.1",
        email: "test@mail.com",
      },
    ],
    [
      {
        ip: "192.168.1.1",
        email: "@mail.com",
      },
    ],
  ])("should not parse", (input) => {
    expect(() => {
      SubscribePropsZodSchema.parse(input)
    }).toThrow()
  })
})
