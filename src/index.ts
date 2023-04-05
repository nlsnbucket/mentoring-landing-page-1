import { DefaultModuleFactory } from "./ModuleFactory/DefaultFactory"

const server = DefaultModuleFactory.create().setup()

server.server.listen(3000, () => {
  console.log("server started")
})
