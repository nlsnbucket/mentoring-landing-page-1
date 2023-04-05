import { InsertEmailPropsZodSchema} from "./InsertEmailPropsZodSchema"

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
      InsertEmailPropsZodSchema.parse(input)
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
      InsertEmailPropsZodSchema.parse(input)
    }).toThrow()
  })
})
